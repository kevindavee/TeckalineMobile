import React from 'react';
import { Button, Text, Right } from 'native-base';

const TextButton = (props) => {
    return (
        <Right>
            <Button transparent onPress={props.buttonPress()}>
                <Text>{props.buttonText}</Text>
            </Button>
        </Right>
    );    
};

export { TextButton };
