import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { Container, Content, Form, Item, Input,
         Button, Text, Label, Spinner, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { registerFullNameChange, registerEmailChange, 
         registerPasswordChange, registerCompanyChange, registerUser } from '../../actions';
import styles from '../styles';

class RegisterForm extends Component {
    
    onFullNameChange(text) {
        this.props.registerFullNameChange(text);
    }

    onEmailChange(text) {
        this.props.registerEmailChange(text);
    }

    onPasswordChange(text) {
        this.props.registerPasswordChange(text);
    }

    onCompanyChange(text) {
        this.props.registerCompanyChange(text);
    }

    onRegister() {
        const { email, password, fullName, company } = this.props;

        this.props.registerUser({ email, password, company, fullName });
    }

    renderTextBox(propTarget, text, content) {
        if (propTarget === undefined) {
            return (
                <Item>
                    <Label style={styles.inputLabelStyle}>{text}</Label>                    
                    {content}
                </Item>
            );
        }

        return (
            <Item success={!propTarget} error={propTarget}>
                <Label style={styles.inputLabelStyle}>{text}</Label>                
                {content}
                {this.renderIcon(!propTarget)}
            </Item>
        );
    }

    renderIcon(success) {
        if (success) {
            return <Icon name='checkmark-circle' />;
        }

        return <Icon name='close-circle' />;        
    }

    renderButton() {
        if (this.props.loading) {
            return (
                <Spinner color='#d9534f' />
            );
        }

        return (
            <View>
                <Button block danger style={styles.buttonStyle} onPress={this.onRegister.bind(this)}>
                    <Text>Daftar Baru</Text>
                </Button>
                <Button block transparent style={styles.buttonStyle} onPress={() => Actions.pop()}>
                    <Text style={{ color: '#d9534f' }}>Saya sudah punya akun</Text>
                </Button>
            </View>
            
        );
    }

    render() {
        const email = (
                <Input 
                    placeholder="example@email.com" 
                    autoCapitalize="words"
                    style={{ flex: 2 }}
                    onChangeText={this.onEmailChange.bind(this)}
                    value={this.props.email}
                />
        );
        
        const fullName = (
            <Input 
                placeholder="Nama Lengkap" 
                autoCapitalize="words"
                style={{ flex: 2 }}
                onChangeText={this.onFullNameChange.bind(this)}
                value={this.props.fullName}
            />
        );

        const password = (
            <Input 
                placeholder="Password"
                secureTextEntry 
                style={{ flex: 2 }}
                onChangeText={this.onPasswordChange.bind(this)}
                value={this.props.password}                           
            />
        );

        const company = (
            <Input 
                placeholder="PT. Perusahaan" 
                autoCapitalize="none"
                style={{ flex: 2 }}
                onChangeText={this.onCompanyChange.bind(this)}
                value={this.props.company}
            />
        );

        return (
            <Container style={styles.authFormStyle}>
                <Content>
                    <Form>
                        <Image 
                            source={require('../../content/images/logo.png')} 
                            style={styles.imageStyle}
                        />
                        {this.renderTextBox(this.props.fullNameError, 'Nama Lengkap', fullName)}
                        {this.renderTextBox(this.props.emailError, 'Email', email)}
                        {this.renderTextBox(this.props.companyError, 'Nama Perusahaan', company)}
                        {this.renderTextBox(this.props.passwordError, 'Password', password)}
                        {this.renderButton()}
                    </Form>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = ({ register }) => {
    const { email, password, fullName, company, error, 
            loading, emailError, fullNameError, companyError, passwordError } = register;

    return { email, 
            password, 
            fullName, 
            company, 
            error, 
            loading, 
            emailError, 
            fullNameError, 
            companyError, 
            passwordError };
};

export default connect(mapStateToProps, 
                        { registerCompanyChange, 
                          registerEmailChange,
                          registerPasswordChange, 
                          registerFullNameChange,
                          registerUser })(RegisterForm);
