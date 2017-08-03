import { PROJECT_LIST_FETCH_SUCCESS, PROJECT_LIST_VALIDATING, 
         PROJECT_LIST_VALIDATED } from '../actions/types';

const INITIAL_STATE = {
    projects: [],
    loading: true
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PROJECT_LIST_FETCH_SUCCESS:
            return { ...state, projects: action.payload, loading: false };
        case PROJECT_LIST_VALIDATING:
            return { ...state, loading: true };
        case PROJECT_LIST_VALIDATED:
            return { ...state, loading: false };
        default:
            return state;
    }
};
