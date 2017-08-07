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
                            <Text style={{ textAlign: 'center', paddingTop: 15, paddingBottom: 15, fontWeight: 'bold' }}>Reward Program Teckaline Indonesia</Text>
                            <Text style={{ fontSize: 13, paddingBottom: 15 }}>
                                Reward Program Teckaline Indonesia adalah marketing program yang disediakan khusus bagi
                                para consultant yang menggunakan Teckaline dalam spesifikasi yang mereka buat, atau para person in contact
                                kontraktor/owner yang memilih Teckaline sebagai equivalent, sebagai apresiasi Teckaline Indonesia kepada user-nya.
                            </Text>
                            <Text style={{ fontSize: 13, paddingBottom: 15 }}>
                                {
                                    'Cara mengikuti program ini adalah dengan mengisi nama project, yang memenuhi sudah syarat dan ketentuan yang berlaku. '
                                }
                            </Text>
                            <Text style={{ fontSize: 13, paddingBottom: 15 }}>
                                {`Syarat dan Ketentuan:\n
1. Program ini hanya berlaku untuk konsultan yang menggunakan Teckaline sebagai spesifikasi yang mereka buat\n
2. Program ini berlaku untuk Kontraktor / Owner yang memilih Teckaline sebagai equivalent\n
3. Reward program dapat di reimburse setelah menjadi SPK/Kontrak\n
4. Konsultan / Kontraktor / Owner harus mengisi dengan project yang real dan bukan fiktif, ataupun mencantumkan project yang tidak sesuai dengan syarat mengikuti program ini\n
5. Pengguna aplikasi yang melakukan spam pada form ini, akan langsung kami blacklist dan kami banned/non-aktif account nya\n
6. Program ini tidak berlaku untuk karyawan Teckaline Indonesia`
                                }
                            </Text>
                            <Text style={{ fontSize: 13, paddingBottom: 15 }}>
                                {
                                    'Untuk informasi atau pun pertanyaan lebih lanjut, bisa hubungi ke whatsapp 0811990342'
                                }
                            </Text>
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
