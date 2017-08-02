import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { StyleProvider, Spinner } from 'native-base';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import thunk from 'redux-thunk';
import reducers from './reducers';
import Routes from './config/routes';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/material';

const store = createStore(reducers, {}, applyMiddleware(thunk));

if (module.hot) {
    module.hot.accept('./reducers', () => {
        const nextRootReducer = require('./reducers');

        store.replaceReducer(nextRootReducer);
    });
}

class App extends Component {
    state = { loggedIn: null };

    componentWillMount() {
        if (firebase.apps.length === 0) {
            const config = {
                apiKey: 'AIzaSyAD-mImAGVQyl9hXWUYMSpyjlICG81G1c4',
                authDomain: 'teckalinemobile.firebaseapp.com',
                databaseURL: 'https://teckalinemobile.firebaseio.com',
                projectId: 'teckalinemobile',
                storageBucket: 'teckalinemobile.appspot.com',
                messagingSenderId: '833826235265'
            };
            firebase.initializeApp(config);
        }

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderApp() {
        if (this.state.loggedIn !== null && this.state.emailVerified !== null) {
            return (
                <StyleProvider style={getTheme(platform)}>
                    <Provider store={store}>
                        <Routes loggedIn={this.state.loggedIn} />
                    </Provider>
                </StyleProvider>
            );
        }

        return ( 
            <Spinner color='#d9534f' />
        );
    }

    render() {
        return (
            this.renderApp()
        );
    }
}

export default App;
