import _ from 'lodash';
import firebase from 'firebase';
import { PROJECT_LIST_FETCH_SUCCESS, PROJECT_LIST_VALIDATING,
         PROJECT_LIST_VALIDATED } from './types';

export const projectListFetch = () => {    
    return (dispatch) => {        
        firebase.database().ref('/projects/')
            .on('value', snapshot => {
                const projects = _.map(snapshot.val(), (val, projectId) => {
                    return { ...val, projectId };
                });

                _.remove(projects, (item) => {
                    if ('isValid' in item) {
                        return item;
                    }
                });

                dispatch({ type: PROJECT_LIST_FETCH_SUCCESS, payload: projects });
            });
    };
};

export const projectListValidating = (isValid, id) => {
    return (dispatch) => {
        dispatch({ type: PROJECT_LIST_VALIDATING });
        
        firebase.database().ref(`/projects/${id}/`)
            .update({ isValid })
            .then(() => {
                projectValidated(dispatch);
            });
    };
};

const projectValidated = (dispatch) => {
    dispatch({ type: PROJECT_LIST_VALIDATED });
};

