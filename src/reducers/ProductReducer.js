import { PRODUCT_FETCH_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
    Products: [],
    loading: true,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PRODUCT_FETCH_SUCCESS:
            return { ...state, Products: action.payload, loading: false };
        default:
            return state;
    }
};
