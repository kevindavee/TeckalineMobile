import _ from 'lodash';
import React, { Component } from 'react';
import { ScrollView, RefreshControl, DrawerLayoutAndroid,
         NativeModules, LayoutAnimation } from 'react-native';
import { Container, Content, List } from 'native-base';
import { connect } from 'react-redux';
import { categoriesFetch } from '../../actions';
import { CustomListItem, CustomHeader, MyDrawer } from '../commons/';
import { PRODUCT_LIST } from '../../config/RouteConst';
import { DRAWER_MENU } from '../commons/ButtonConst';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && 
UIManager.setLayoutAnimationEnabledExperimental(true);

class CategoryList extends Component {
    componentWillMount() {
        LayoutAnimation.easeInEaseOut();
        this.props.categoriesFetch();
    }

    onRefresh() {
        this.props.categoriesFetch();
    }

    openDrawer() {
        this.refs['.DRAWER'].openDrawer();
    }

    renderContent() {
        if (!this.props.loading) {
            return (
                <List 
                    dataArray={this.props.categories} 
                    renderRow={this.renderRow}
                />
            ); 
        }
    }

    renderRow(category) {
        const route = PRODUCT_LIST;
        const obj = { route, category };

        return (
            <CustomListItem obj={obj} />
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
                        headerText="Products" 
                        leftButton={DRAWER_MENU}
                        drawerOpen={() => this.openDrawer.bind(this)}
                    />
                    <ScrollView
                        refreshControl={
                            <RefreshControl 
                                refreshing={this.props.loading}
                                onRefresh={this.onRefresh.bind(this)}
                                colors={['#d9534f']}
                            />
                        }
                    >
                        <Content>
                            {this.renderContent()}
                        </Content>
                    </ScrollView>
                </Container>
            </DrawerLayoutAndroid>
        );
    }
}

const mapStateToProps = state => {
    const categories = _.map(state.categories.Categories);
    const loading = state.categories.loading;

    return { categories, loading };
};

export default connect(mapStateToProps, { categoriesFetch })(CategoryList);
