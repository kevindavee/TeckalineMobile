import React, { Component } from 'react';
import { ListItem, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { PRODUCT_LIST } from '../../config/RouteConst';

class CustomListItem extends Component {
    onRowPress() {
        if (this.props.obj.route === PRODUCT_LIST) {
            Actions.productlist({ category: this.props.obj.category });
        }
    }

    render() {
        const name = this.props.obj.category.Categories;
        return (
            <ListItem onPress={this.onRowPress.bind(this)}>
                <Text>{name}</Text>                    
            </ListItem>
        );
    }
}

export { CustomListItem };
