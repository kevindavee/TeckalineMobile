import firebase from 'firebase';
import { PROFILE_FULLNAME_CHANGE, PROFILE_COMPANY_CHANGE,
         INITIAL_PROFILE, FETCH_PROFILE, PROFILE_SAVE_CHANGES,
         PROFILE_CHANGES_SUCCESS, PROFILE_CHANGES_FAIL, PROFILE_PHONE_NUMBER_CHANGE } from './types';

export const initialProfile = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        dispatch({ type: FETCH_PROFILE });
        firebase.database().ref(`/profiles/${currentUser.uid}`)
            .on('value', snapshot => {
                const { fullName, company, phoneNumber } = snapshot.val();
                const payload = { email: currentUser.email, fullName, company, phoneNumber };
                dispatch({ type: INITIAL_PROFILE, payload });
            });
    };
};

export const profileFullNameChange = (text) => {
    return {
        type: PROFILE_FULLNAME_CHANGE,
        payload: text
    };
};

export const profileCompanyChange = (text) => {
    return {
        type: PROFILE_COMPANY_CHANGE,
        payload: text
    };
};

export const profilePhoneNumberChange = (number) => {
    return {
        type: PROFILE_PHONE_NUMBER_CHANGE,
        payload: number
    };
};

export const profileSaveChanges = ({ fullName, company, phoneNumber }) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        dispatch({ type: PROFILE_SAVE_CHANGES });

        firebase.database().ref(`/profiles/${currentUser.uid}`)
            .update({ fullName, company, phoneNumber })
            .then(() => {
                dispatch({ type: PROFILE_CHANGES_SUCCESS });
            })
            .catch(() => {
                dispatch({ type: PROFILE_CHANGES_FAIL });
            });
    };
};
