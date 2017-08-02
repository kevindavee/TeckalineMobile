import axios from 'axios';
import { CATEGORIES_FETCH_SUCCESS } from './types';

export const categoriesFetch = () => {
    return (dispatch) => {
        axios.get('http://infosystem.teckalineindonesia.com/api/CategoriesData')
            .then((response) => {
                dispatch({ type: CATEGORIES_FETCH_SUCCESS, payload: response.data });
            });
    };
};
