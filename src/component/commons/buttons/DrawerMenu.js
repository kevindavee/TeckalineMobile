import React from 'react';
import { Button, Icon, Left } from 'native-base';

const DrawerMenu = (props) => {
    return (
        <Left>
            <Button transparent onPress={props.drawerOpen()}>
                <Icon name='menu' />
            </Button>
        </Left>
    );    
};

export { DrawerMenu };
