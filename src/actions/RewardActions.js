import firebase from 'firebase';
import { Alert } from 'react-native';
import { PROJECT_INPUT_CHANGE, PROJECT_SUBMIT, PROJECT_SUBMIT_SUCCESS, 
         PROJECT_FETCH_SUCCESS } from './types';

export const projectInputChange = (text) => {
    return {
        type: PROJECT_INPUT_CHANGE,
        payload: text
    };
};

export const projectSubmit = ({ project }) => {
    console.log('project submitted');
    const { currentUser } = firebase.auth();
    const currentDate = new Date().toLocaleDateString();        

    return (dispatch) => {
        dispatch({ type: PROJECT_SUBMIT });

        firebase.database().ref(`/profiles/${currentUser.uid}/`)
            .on('value', snapshot => {
                const { fullName, company } = snapshot.val();
                firebase.database().ref().child('projects')
                .push({ project, date: currentDate, uid: currentUser.uid, fullName, company })
                .then(() => {
                    dispatch({ type: PROJECT_SUBMIT_SUCCESS });
                    Alert.alert('Berhasil', 'Project anda berhasil di daftar kan !');
                });
            });
    };
};

export const projectHistoryFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref().child('projects')
            .orderByChild('uid').equalTo(currentUser.uid)
            .on('value', snapshot => {
                dispatch({ type: PROJECT_FETCH_SUCCESS, payload: snapshot.val() });
            });
    };
};
