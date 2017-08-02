import React, { Component } from 'react';
import { Header, Left, Body, Title, Right } from 'native-base';
import { DrawerMenu, Back, TextButton } from './buttons/';
import { DRAWER_MENU, BACK_BUTTON, TEXT_BUTTON } from './ButtonConst';

class CustomHeader extends Component {
    renderLeftButton() {
        if (this.props.leftButton === DRAWER_MENU) {
            return <DrawerMenu drawerOpen={this.props.drawerOpen.bind(this)} />;
        } else if (this.props.leftButton === BACK_BUTTON) {
            return <Back />;
        }

        return <Left />;
    }

    renderRightButton() {
        if (this.props.rightButton === TEXT_BUTTON) {
            return <TextButton buttonText={this.props.buttonText} buttonPress={this.props.buttonPress.bind(this)} />;
        }

        return <Right />;
    }

    render() {
        return (
            <Header style={{ backgroundColor: '#d9534f' }} androidStatusBarColor='#ba4844'>
                {this.renderLeftButton()}
                <Body>
                    <Title>{this.props.headerText}</Title>
                </Body>
                 {this.renderRightButton()} 
            </Header>
        );
    }
}

export { CustomHeader };
