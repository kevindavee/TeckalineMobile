import { ToastAndroid } from 'react-native';
import { PROFILE_FULLNAME_CHANGE, PROFILE_COMPANY_CHANGE,
         INITIAL_PROFILE, FETCH_PROFILE, PROFILE_CHANGES_SUCCESS,
         PROFILE_SAVE_CHANGES, PROFILE_CHANGES_FAIL } from '../actions/types';

const INITIAL_STATE = {
    fullName: '',
    company: '',
    email: '',
    loading: false,
    loadingSubmit: false,
    uid: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_PROFILE:
            return { ...state, loading: true };
        case INITIAL_PROFILE:
            const { fullName, company, email, uid } = action.payload;
            return { ...state, loading: false, fullName, company, email, uid };
        case PROFILE_FULLNAME_CHANGE:
            return { ...state, fullName: action.payload };
        case PROFILE_COMPANY_CHANGE:
            return { ...state, company: action.payload };
        case PROFILE_SAVE_CHANGES:
            return { ...state, loadingSubmit: true };
        case PROFILE_CHANGES_SUCCESS:
            ToastAndroid.show('Your profile has been updated !', ToastAndroid.SHORT);
            return { ...state, loadingSubmit: false };
        case PROFILE_CHANGES_FAIL:
            ToastAndroid.show('Unable to update profile !', ToastAndroid.SHORT);
            return { ...state, loadingSubmit: false };
        default:
            return state;
    }
};
