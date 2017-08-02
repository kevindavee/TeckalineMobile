import { PASSWORD_CHANGE, CONFIRM_PASSWORD_CHANGE, PASSWORD_INITIAL_SCREEN,
         CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAIL, UPDATE_PASSWORD } from '../actions/types';
import { PasswordValidator } from '../component/commons/PasswordValidator';

const INITIAL_STATE = {
    password: '',
    confirmPassword: '',
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PASSWORD_INITIAL_SCREEN:
            return INITIAL_STATE;
        case PASSWORD_CHANGE:
            if (!PasswordValidator(action.payload)) {
                return { ...state, password: action.payload, passwordError: true };                
            }
            return { ...state, password: action.payload, passwordError: false };
        case CONFIRM_PASSWORD_CHANGE:
            if (action.payload !== state.password || action.payload === '') {
                return { ...state, confirmPassword: action.payload, confirmPasswordError: true };
            }
            return { ...state, confirmPassword: action.payload, confirmPasswordError: false };
        case CHANGE_PASSWORD_SUCCESS:
            return { ...state, INITIAL_STATE };
        case CHANGE_PASSWORD_FAIL:
            return { ...state, loading: false };
        case UPDATE_PASSWORD: 
            return { ...state, loading: true };
        default:
            return state;
    }
};
