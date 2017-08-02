import { CATEGORIES_FETCH_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
    Categories: [],
    loading: true
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CATEGORIES_FETCH_SUCCESS:
            return { ...state, Categories: action.payload, loading: false };
        default:
            return state;
    }
};
