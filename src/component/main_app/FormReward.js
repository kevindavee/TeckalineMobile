import React, { Component } from 'react';
import { DrawerLayoutAndroid, LayoutAnimation, NativeModules, ToastAndroid } from 'react-native';
import { Container, Form, Input, Item, Content, Button, Text, Spinner } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { CustomHeader, MyDrawer } from '../commons/';
import { DRAWER_MENU, TEXT_BUTTON } from '../commons/ButtonConst';
import { projectInputChange, projectSubmit } from '../../actions';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && 
UIManager.setLayoutAnimationEnabledExperimental(true);

class FormReward extends Component {
    componentWillMount() {
        LayoutAnimation.easeInEaseOut();
    }

    onProjectChange(text) {
        this.props.projectInputChange(text);
    }

    onProjectSubmit() {
        const { project } = this.props;

        if (project === '') {
            ToastAndroid.show('Isi form dengan benar !', ToastAndroid.SHORT);
        } else {
            this.props.projectSubmit({ project });
        }
    }

    buttonPress() {
        Actions.history();
    }

    openDrawer() {
        this.refs['.DRAWER'].openDrawer();
    }

    renderButton() {
        if (this.props.loading) {
            return (
                <Button block danger style={{ marginTop: 10 }}>
                    <Spinner color='white' />
                </Button>
            );
        }

        return (
            <Button block danger style={{ marginTop: 10 }} onPress={this.onProjectSubmit.bind(this)}>
                <Text>Submit</Text>
            </Button>
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
                        headerText="Rewards" 
                        leftButton={DRAWER_MENU}
                        drawerOpen={() => this.openDrawer.bind(this)}
                        rightButton={TEXT_BUTTON}
                        buttonText="History"
                        buttonPress={() => this.buttonPress.bind(this)}
                    />
                    <Content>
                        <Form style={{ paddingLeft: 15, paddingRight: 15 }}>
                            <Item last>
                                <Input
                                    placeholder="Masukan nama project disini" 
                                    autoCapitalize='sentences'
                                    onChangeText={this.onProjectChange.bind(this)}
                                    value={this.props.project}
                                />
                            </Item>
                            {this.renderButton()}
                        </Form>
                    </Content>
                </Container>

            </DrawerLayoutAndroid>
        );
    }   
}

const mapStateToProps = ({ rewardsForm }) => {
    const { project, loading } = rewardsForm;

    return { project, loading };
};

export default connect(mapStateToProps, { projectInputChange, projectSubmit })(FormReward);
