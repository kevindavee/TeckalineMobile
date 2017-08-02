import React, { Component } from 'react';
import { ToastAndroid } from 'react-native';
import { Container, Content, Form, Input, Item, Spinner, Button,
         View, Text, Icon } from 'native-base';
import { connect } from 'react-redux';
import { CustomHeader } from '../commons';
import { BACK_BUTTON } from '../commons/ButtonConst';
import { passwordChange, confirmPasswordChange, initialPasswordScreen, updatePassword } from '../../actions';
import styles from '../styles';

class ChangePassword extends Component {
    componentWillMount() {
        this.props.initialPasswordScreen();
    }

    onPasswordChange(text) {
        this.props.passwordChange(text);
    }

    onConfirmPasswordChange(text) {
        this.props.confirmPasswordChange(text);
    }

    onSubmitChange() {
        if (this.props.password === '' && this.props.confirmPassword === '') {
            ToastAndroid.show('Password harus 8 karakter, minimal 1 huruf kapital dan 1 angka', ToastAndroid.SHORT);   
        } else if (this.props.passwordError) {
            ToastAndroid.show('Password harus 8 karakter, minimal 1 huruf kapital dan 1 angka', ToastAndroid.SHORT);               
        } else if (this.props.confirmPasswordError) {
            ToastAndroid.show('Konfirmasi password tidak sesuai dengan password', ToastAndroid.SHORT);               
        } else if (!this.props.confirmPasswordError && this.props.confirmPassword === '') {
            ToastAndroid.show('Isi konfirmasi password !', ToastAndroid.SHORT);
        }

        const password = this.props.password;
        this.props.updatePassword(password);
    }

    renderIcon(success) {
        if (success) {
            return <Icon name='checkmark-circle' />;
        }

        return <Icon name='close-circle' />;        
    }

    renderTextBox(propTarget, content) {
        if (propTarget === undefined) {
            return (
                <Item>
                    {content}
                </Item>
            );
        }
        console.log('render this');
        return (
            <Item success={!propTarget} error={propTarget}>
                {content}
                {this.renderIcon(!propTarget)}
            </Item>
        );
    }

    renderButton() {
        console.log('render this');
        if (this.props.loading) {
            return (
                <View>
                    <Button block danger style={styles.buttonStyle} onPress={this.onSubmitChange.bind(this)}>
                        <Spinner color='white' />
                    </Button>
                </View>
            );
        }

        return (
            <View>
                <Button block danger style={styles.buttonStyle} onPress={this.onSubmitChange.bind(this)}>
                    <Text>Ubah Password</Text>
                </Button>
            </View>
            
        );
    }

    render() {
        const password = (
            <Input 
                placeholder="Password Baru"
                secureTextEntry 
                autoCapitalize="none"
                style={{ flex: 1 }}
                onChangeText={this.onPasswordChange.bind(this)}
                value={this.props.password}
            />
        );

        const confirmPassword = (
            <Input 
                placeholder="Ulangi Password"
                secureTextEntry 
                autoCapitalize="none"
                style={{ flex: 1 }}
                onChangeText={this.onConfirmPasswordChange.bind(this)}
                value={this.props.confirmPassword}
            />
        );

        return (
            <Container>
                <CustomHeader
                    headerText="Password"
                    leftButton={BACK_BUTTON}
                />
                <Content>
                    <Form style={styles.mainAppFormStyle}>
                        {this.renderTextBox(this.props.passwordError, password)}
                        {this.renderTextBox(this.props.confirmPasswordError, confirmPassword)}
                        {this.renderButton()}
                    </Form>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = ({ changePassword }) => {
    console.log(changePassword);
    const { password, confirmPassword, passwordError, confirmPasswordError, loading } = changePassword;

    return { password, confirmPassword, passwordError, confirmPasswordError, loading };
};

export default connect(mapStateToProps, 
                    { passwordChange, 
                      confirmPasswordChange, 
                      initialPasswordScreen,
                      updatePassword })(ChangePassword);
