import { validate } from 'email-validator';
import { REGISTER_COMPANY_CHANGE, REGISTER_EMAIL_CHANGE, 
         REGISTER_FULLNAME_CHANGE, REGISTER_PASSWORD_CHANGE,
         REGISTER_USER, REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types';
import { PasswordValidator } from '../component/commons/PasswordValidator';

const INITIAL_STATE = {
    email: '',
    password: '',
    fullName: '',
    company: '',
    user: null,
    error: '',
    loading: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REGISTER_COMPANY_CHANGE:
            if (action.payload === '') {
                return { ...state, company: action.payload, companyError: true };                
            }
            return { ...state, company: action.payload, companyError: false };
        case REGISTER_EMAIL_CHANGE:
            if (!validate(action.payload)) {
                return { ...state, email: action.payload, emailError: true };
            }
            return { ...state, email: action.payload, emailError: false };
        case REGISTER_FULLNAME_CHANGE:
            if (action.payload === '') {
                return { ...state, fullName: action.payload, fullNameError: true };                
            }
            return { ...state, fullName: action.payload, fullNameError: false };
        case REGISTER_PASSWORD_CHANGE:
            if (!PasswordValidator(action.payload)) {
                return { ...state, password: action.payload, passwordError: true };
            }
            
            return { ...state, password: action.payload, passwordError: false };
        case REGISTER_USER:
            return { ...state, loading: true, error: '' };
        case REGISTER_SUCCESS:
            return { ...INITIAL_STATE };
        case REGISTER_FAIL:
            return { ...state, loading: false };
        default:
            return state;
    }
};
