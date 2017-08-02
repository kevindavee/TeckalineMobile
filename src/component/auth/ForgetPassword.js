import React, { Component } from 'react';
import { Image, View, ToastAndroid } from 'react-native';
import { Container, Content, Form, Item, Input,
         Button, Text, Spinner, Label } from 'native-base';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import styles from '../styles';

class ForgetPassword extends Component {
    state = { email: '', loading: false };

    onEmailChange(text) {
        this.setState({ email: text });
    }

    onResetPassword() {
        this.setState({ loading: true });

        const auth = firebase.auth();
        const emailAddress = this.state.email;

        auth.sendPasswordResetEmail(emailAddress).then(() => {
            this.setState({ email: '', loading: false });
            ToastAndroid.show('Email berhasil di kirim ! Silahkan cek inbox anda', ToastAndroid.SHORT);
        }).catch(() => {
            this.setState({ loading: false });
            ToastAndroid.show('Tidak bisa mengirimkan email', ToastAndroid.SHORT);
        });
    }

    renderButton() {
        if (this.props.loading) {
            return (
                <Spinner color='#d9534f' />
            );
        }

        return (
            <View>
                <Button block danger style={styles.buttonStyle} onPress={this.onResetPassword.bind(this)}>
                    <Text>Kirim Link Reset password</Text>
                </Button>
                <Button block transparent danger style={styles.buttonStyle} onPress={() => Actions.pop()}>
                    <Text>Login</Text>
                </Button>
            </View>
            
        );
    }
    render() {
        return (
            <Container style={styles.authFormStyle}>
                <Content>
                    <Form>
                        <Image 
                            source={require('../../content/images/logo.png')} 
                            style={styles.imageStyle}
                        />
                        <Item>
                            <Label style={styles.inputLabelStyle}>Email</Label>
                            <Input
                                disabled={this.props.loading}
                                placeholder="example@email.com" 
                                autoCapitalize="none"
                                style={{ flex: 2 }}
                                onChangeText={this.onEmailChange.bind(this)}
                                value={this.props.email}
                            />
                        </Item>
                        {this.renderButton()}
                    </Form>
                </Content>
            </Container>
        );
    }
}

export default ForgetPassword;
