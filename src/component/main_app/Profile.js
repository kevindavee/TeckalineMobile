import React, { Component } from 'react';
import { NativeModules, LayoutAnimation, DrawerLayoutAndroid } from 'react-native';
import { Container, Content, Form, Item, Input, Button, Text, Label,
         Spinner, View } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { CustomHeader, MyDrawer } from '../commons';
import { DRAWER_MENU } from '../commons/ButtonConst';
import { profileFullNameChange, profileCompanyChange, initialProfile,
         profileSaveChanges } from '../../actions';
import styles from '../styles';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && 
UIManager.setLayoutAnimationEnabledExperimental(true);

class Profile extends Component {
    state = { signOutLoading: false };

    componentWillMount() {
        LayoutAnimation.linear();
        this.props.initialProfile();
    }

    onFullNameChange(text) {
        this.props.profileFullNameChange(text);
    }

    onCompanyChange(text) {
        this.props.profileCompanyChange(text);
    }

    onChangeProfile() {
        const { fullName, company, uid } = this.props;
        this.props.profileSaveChanges({ fullName, company, uid });
    }

    onLogOut() {
        this.setState({ signOutLoading: true });

        firebase.auth().signOut()
            .then(() => {
                Actions.auth();                
            });
    }

    openDrawer() {
        this.refs['.DRAWER'].openDrawer();
    }

    logOutSpinner() {
        if (this.state.signOutLoading) {
            return <Spinner color='white' />;
        }

            return <Text>Keluar</Text>;
    }

    renderContent() {
        if (this.props.loading) {
            return <Spinner color='#d9534f' />;
        }

        return (
            <Form style={styles.mainAppFormStyle}>
                <Item disabled>
                    <Label style={styles.inputLabelStyle}>Email</Label>
                    <Input
                        disabled
                        style={{ flex: 2 }}
                        placeholder={this.props.email}
                    />
                </Item>
                <Item>
                    <Label style={styles.inputLabelStyle}>Nama Lengkap</Label>
                    <Input 
                        placeholder="Nama Lengkap" 
                        autoCapitalize="words"
                        style={{ flex: 2 }}
                        onChangeText={this.onFullNameChange.bind(this)}
                        value={this.props.fullName}
                    />
                </Item>
                <Item last>
                    <Label style={styles.inputLabelStyle}>Nama Kantor</Label>
                    <Input 
                        placeholder="Nama Kantor" 
                        autoCapitalize="none"
                        style={{ flex: 2 }}
                        onChangeText={this.onCompanyChange.bind(this)}
                        value={this.props.company}
                    />
                </Item>
                {this.renderButton()}
            </Form>
        );
    }

    renderButton() {
        if (this.props.loadingSubmit) {
            return (
                <Spinner color='#d9534f' />
            );
        }

        return (
            <View>
                <Button block danger style={styles.buttonStyle} onPress={this.onChangeProfile.bind(this)}>
                    <Text>Simpan Perubahan</Text>
                </Button>
                <Button block danger style={styles.buttonStyle} onPress={() => Actions.changepassword()}>
                    <Text>Ganti Password</Text>
                </Button>
                <Button block danger style={styles.buttonStyle} onPress={this.onLogOut.bind(this)}>
                    {this.logOutSpinner()}
                </Button>
            </View>
            
        );
    }

    render() {
        const navigationView = (<MyDrawer />);

        return (
            <DrawerLayoutAndroid
                drawerWidth={300}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => navigationView}
                ref={'.DRAWER'}
            >
                <Container>
                    <CustomHeader 
                            headerText="Profile" 
                            leftButton={DRAWER_MENU}
                            drawerOpen={() => this.openDrawer.bind(this)}
                    />
                    <Content>
                        {this.renderContent()}
                    </Content>
                </Container>
            </DrawerLayoutAndroid>
        );
    }
}

const mapStateToProps = ({ profile }) => {
    const { fullName, company, loading, email, loadingSubmit, uid } = profile;

    return { fullName, company, loading, email, loadingSubmit, uid };
};

export default connect(mapStateToProps, 
                    { profileCompanyChange, 
                      profileFullNameChange,
                      initialProfile,
                      profileSaveChanges })(Profile);
