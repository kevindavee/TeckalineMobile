import firebase from 'firebase';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { LOGIN_EMAIL_CHANGE, LOGIN_PASSWORD_CHANGE,
         LOGIN_USER, LOGIN_USER_FAIL, LOGIN_USER_SUCCESS } from './types';


export const loginEmailChange = (text) => {
    return {
        type: LOGIN_EMAIL_CHANGE,
        payload: text
    };
};

export const loginPasswordChange = (text) => {
    return {
        type: LOGIN_PASSWORD_CHANGE,
        payload: text
    };
};

export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                if (user.emailVerified) {
                    loginUserSuccess(dispatch, user);
                } else {
                    Alert.alert('Warning', 
                                'Anda harus melakukan verifikasi email untuk masuk. Apakah anda perlu dikirim kan ulang email verifikasi ?',
                                [
                                    { text: 'Kirim ulang', onPress: () => user.sendEmailVerification() },
                                    { text: 'Tidak' }
                                ]);

                    firebase.auth().signOut();
                    loginUserFail(dispatch);
                }  
            })
            .catch(() => {
                Alert.alert('Authentication Failed', 'Email dan password anda salah! Silahkan mencoba lagi');                
                loginUserFail(dispatch);
            });
    };
};

const loginUserFail = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
    if (user.emailVerified) {
        Actions.product();
    } else {
        Actions.confirmemail();
    }
};
