import React, { Component } from 'react';
import firebase from 'firebase';
import { Container, Content, List, CardItem,
         Left, Icon, Text, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from '../styles';

class MyDrawer extends Component {
    state = { isAdmin: false };

    componentWillMount() {
        const { currentUser } = firebase.auth();

        firebase.database().ref(`/admins/${currentUser.uid}`)
            .once('value', snapshot => {
                this.setState({ isAdmin: snapshot.val() });
            });
    }

    renderAdminMenu() {
        if (this.state.isAdmin) {
            return (
                <View>
                    <CardItem icon button onPress={() => Actions.projectlist()}>
                        <Left>
                            <Icon name="list" style={styles.drawerIconStyle} />
                            <Text style={styles.drawerTextStyle}>Project List</Text>
                        </Left>
                    </CardItem>
                </View>
            );
        }
    }

    render() {
        const { containerStyle } = thisStyles;        
        return (
            <Container style={containerStyle}>
               <Content>
                    <List>
                    <CardItem icon button onPress={() => Actions.product()}>
                        <Left>
                            <Icon name="bulb" style={styles.drawerIconStyle} />
                            <Text style={styles.drawerTextStyle}>Products</Text>                            
                        </Left>
                    </CardItem>
                    <CardItem icon button onPress={() => Actions.reward()}>
                        <Left>
                            <Icon name="star" style={styles.drawerIconStyle} />
                            <Text style={styles.drawerTextStyle}>Rewards</Text>
                        </Left>
                    </CardItem>
                    <CardItem icon button onPress={() => Actions.profile()}>
                        <Left>
                            <Icon name="contact" style={styles.drawerIconStyle} />
                            <Text style={styles.drawerTextStyle}>Profile</Text>
                        </Left>
                    </CardItem>
                    {this.renderAdminMenu()}
                   </List> 
               </Content>
            </Container>
        );
    }
}

const thisStyles = {
    containerStyle: {
        flex: 1,
        backgroundColor: '#fff'
    },
};

export { MyDrawer };
