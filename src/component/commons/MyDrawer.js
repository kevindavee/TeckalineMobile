import React, { Component } from 'react';
import { Container, Content, List, CardItem,
         Left, Icon, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';

class MyDrawer extends Component {
    render() {
        const { containerStyle } = styles;        
        return (
            <Container style={containerStyle}>
               <Content>
                    <List>
                    <CardItem icon button onPress={() => Actions.product()}>
                        <Left>
                            <Icon name="bulb" />
                            <Text>      Products</Text>                            
                        </Left>
                    </CardItem>
                    <CardItem icon button onPress={() => Actions.reward()}>
                        <Left>
                            <Icon name="star" />
                            <Text>      Rewards</Text>
                        </Left>
                    </CardItem>
                    <CardItem icon button onPress={() => Actions.profile()}>
                        <Left>
                            <Icon name="contact" />
                            <Text>      Profile</Text>
                        </Left>
                    </CardItem>
                   </List> 
               </Content>
            </Container>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: '#fff'
    },
};

export { MyDrawer };
