import firebase from 'firebase';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { REGISTER_COMPANY_CHANGE, REGISTER_EMAIL_CHANGE, 
         REGISTER_FULLNAME_CHANGE, REGISTER_PASSWORD_CHANGE, 
         REGISTER_USER, REGISTER_SUCCESS, REGISTER_FAIL } from './types';

export const registerFullNameChange = (text) => {
    return {
        type: REGISTER_FULLNAME_CHANGE,
        payload: text
    };
};

export const registerEmailChange = (text) => {
    return {
        type: REGISTER_EMAIL_CHANGE,
        payload: text
    };
};

export const registerPasswordChange = (text) => {
    return {
        type: REGISTER_PASSWORD_CHANGE,
        payload: text
    };
};

export const registerCompanyChange = (text) => {
    return {
        type: REGISTER_COMPANY_CHANGE,
        payload: text
    };
};

export const registerUser = ({ email, password, company, fullName }) => {
    return (dispatch) => {
        dispatch({ type: REGISTER_USER });

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                const dbRoot = firebase.database().ref();
                dbRoot.child(`/profiles/${user.uid}`)
                    .set({ fullName, company })
                    .then(() => {
                        Alert.alert('Success', 'Berhasil mendaftar ! Silahkan cek email anda untuk email verifikasi');
                        const { currentUser } = firebase.auth();
                        currentUser.sendEmailVerification();
                        firebase.auth().signOut();
                        registerSuccess(dispatch);
                    });
            })
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    Alert.alert('Error', 'Tidak dapat mendaftar dengan email ini. Email telah terpakai');
                } else {
                    Alert.alert('Error', 'Error ! Tidak bisa mendaftarkan !');
                }
                dispatch({ type: REGISTER_FAIL });
            });
    };
};

const registerSuccess = (dispatch) => {
    dispatch({
        type: REGISTER_SUCCESS,
    });

    Actions.pop();
};
