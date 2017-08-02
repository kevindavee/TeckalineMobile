import firebase from 'firebase';
import { ToastAndroid } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { UPDATE_PASSWORD, PASSWORD_CHANGE, CHANGE_PASSWORD_FAIL,
         CHANGE_PASSWORD_SUCCESS, CONFIRM_PASSWORD_CHANGE, PASSWORD_INITIAL_SCREEN } from './types';

export const initialPasswordScreen = () => {
    return {
        type: PASSWORD_INITIAL_SCREEN
    };
};

export const passwordChange = (text) => {
    return {
        type: PASSWORD_CHANGE,
        payload: text
    };
};

export const confirmPasswordChange = (text) => {
    return {
        type: CONFIRM_PASSWORD_CHANGE,
        payload: text
    };
};

export const updatePassword = (password) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        dispatch({ type: UPDATE_PASSWORD });

        currentUser.updatePassword(password)
            .then(() => {
                dispatch({ type: CHANGE_PASSWORD_SUCCESS });
                Actions.pop();
                ToastAndroid.show('Password berhasil di ubah !', ToastAndroid.SHORT);
            })
            .catch((error) => {
                dispatch({ type: CHANGE_PASSWORD_FAIL });
                ToastAndroid.show(error, ToastAndroid.SHORT);                
            });
    };
};
