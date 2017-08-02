import { PROJECT_FETCH_SUCCESS } from '../actions/types';

const INITIAL_STATE = { projects: [], loading: true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PROJECT_FETCH_SUCCESS:
            return { ...state, projects: action.payload, loading: false };
        default:
            return state;
    }
};
