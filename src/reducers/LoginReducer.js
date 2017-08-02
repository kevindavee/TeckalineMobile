import { LOGIN_EMAIL_CHANGE, LOGIN_PASSWORD_CHANGE,
         LOGIN_USER, LOGIN_USER_FAIL, LOGIN_USER_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
    email: '',
    password: '',
    user: null,
    error: '',
    loading: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_EMAIL_CHANGE:
            return { ...state, email: action.payload };
        case LOGIN_PASSWORD_CHANGE:
            return { ...state, password: action.payload };
        case LOGIN_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, user: action.payload };
        case LOGIN_USER_FAIL:
            return { ...state, loading: false };
        case LOGIN_USER:
            return { ...state, loading: true, error: '' };
        default:
            return state;
    }
};
