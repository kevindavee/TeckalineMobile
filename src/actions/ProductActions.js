import axios from 'axios';
import { PRODUCT_FETCH_SUCCESS } from './types';

export const productsFetch = (categoryId) => {
    return (dispatch) => {
        axios.get(`http://infosystem.teckalineindonesia.com/api/ProductData/${categoryId}`)
            .then((response) => {
                dispatch({ type: PRODUCT_FETCH_SUCCESS, payload: response.data });
            });
    };
};
