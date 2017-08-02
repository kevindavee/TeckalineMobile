import React from 'react';
import { Button, Icon, Left } from 'native-base';
import { Actions } from 'react-native-router-flux';

const Back = () => {
    return (
        <Left>
            <Button transparent onPress={() => Actions.pop()}>
                <Icon name='arrow-back' />
            </Button>
        </Left>
    );    
};

export { Back };
