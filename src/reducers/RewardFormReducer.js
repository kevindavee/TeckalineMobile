import { PROJECT_INPUT_CHANGE, PROJECT_SUBMIT, PROJECT_SUBMIT_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
    project: '',
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PROJECT_INPUT_CHANGE:
            return { ...state, project: action.payload };
        case PROJECT_SUBMIT:
            return { ...state, loading: true };
        case PROJECT_SUBMIT_SUCCESS:
            return { INITIAL_STATE };
        default:
            return state;
    }
};
