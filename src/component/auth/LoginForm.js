import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { Container, Content, Form, Item, Input,
         Button, Text, Label, Spinner } from 'native-base';
import * as Animatable from 'react-native-animatable';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { loginEmailChange, loginPasswordChange, loginUser } from '../../actions';
import styles from '../styles';

class LoginForm extends Component {
    onEmailChange(text) {
        this.props.loginEmailChange(text);
    }

    onPasswordChange(text) {
        this.props.loginPasswordChange(text);
    }

    onLogin() {
        const { email, password } = this.props;

        this.props.loginUser({ email, password });
    }

    renderButton() {
        if (this.props.loading) {
            return (
                <Spinner color='#d9534f' />
            );
        }

        return (
            <View>
                <Button block danger style={styles.buttonStyle} onPress={this.onLogin.bind(this)}>
                    <Text>Masuk</Text>
                </Button>
                <Grid>
                    <Row>
                        <Col>
                            <Button block transparent style={styles.buttonStyle} onPress={() => Actions.register()}>
                                <Text style={{ color: '#d9534f' }}>Daftar Baru</Text>
                            </Button>
                        </Col>
                        <Col>
                            <Button block transparent style={styles.buttonStyle} onPress={() => Actions.forgetpassword()}>
                                <Text style={{ color: '#d9534f' }}>Lupa Password</Text>
                            </Button>
                        </Col>
                    </Row>
                </Grid>
            </View>
            
        );
    }

    render() {
        return (
            <Container style={styles.authFormStyle}>
                <Content>
                    <Animatable.View animation="fadeInUp"> 
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
                        <Item last>
                            <Label style={styles.inputLabelStyle}>Password</Label>                            
                            <Input
                                disabled={this.props.loading}
                                placeholder="Password"
                                secureTextEntry 
                                style={{ flex: 2 }}
                                onChangeText={this.onPasswordChange.bind(this)}
                                value={this.props.password}                           
                            />
                        </Item>
                        {this.renderButton()}
                    </Form>
                    </Animatable.View> 
                </Content>
            </Container>            
        );
    }
}

const mapStateToProps = ({ login }) => {
    const { email, password, error, loading } = login;

    return { email, password, error, loading };
};

export default connect(mapStateToProps, 
                       { loginEmailChange, loginPasswordChange, loginUser }
                      )(LoginForm);
