import _ from 'lodash';
import firebase from 'firebase';
import { PROFILE_FULLNAME_CHANGE, PROFILE_COMPANY_CHANGE,
         INITIAL_PROFILE, FETCH_PROFILE, PROFILE_SAVE_CHANGES,
         PROFILE_CHANGES_SUCCESS, PROFILE_CHANGES_FAIL } from './types';

export const initialProfile = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        dispatch({ type: FETCH_PROFILE });
        firebase.database().ref('/profiles/').orderByChild('uid').equalTo(currentUser.uid)
            .on('value', snapshot => {
                const email = currentUser.email;
                const profile = _.map(snapshot.val(), (val, uid) => {
                    return { ...val, uid };
                });
                const fullName = profile[0].fullName;
                const company = profile[0].company;
                const uid = profile[0].uid;
                const payload = { email, fullName, company, uid };
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

export const profileSaveChanges = ({ fullName, company, uid }) => {
    return (dispatch) => {
        dispatch({ type: PROFILE_SAVE_CHANGES });

        firebase.database().ref(`/profiles/${uid}/`)
            .update({ fullName, company })
            .then(() => {
                dispatch({ type: PROFILE_CHANGES_SUCCESS });
            })
            .catch(() => {
                dispatch({ type: PROFILE_CHANGES_FAIL });
            });
    };
};
