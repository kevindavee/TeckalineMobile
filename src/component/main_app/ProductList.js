import _ from 'lodash';
import React, { Component } from 'react';
import { Image, ScrollView, RefreshControl } from 'react-native';
import { Container, Content, Card, CardItem, 
         Text, Left, Right, List, Icon, Body } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { productsFetch } from '../../actions/';
import { CustomHeader } from '../commons/CustomHeader';
import { BACK_BUTTON } from '../commons/ButtonConst';

class ProductList extends Component {
    componentWillMount() {
        this.props.productsFetch(this.props.category.CategoriesId);
    }

    onRefresh() {
        this.props.productsFetch(this.props.category.CategoriesId);
    }

    renderContent() {
        if (!this.props.loading) {
            return (
                <List 
                    dataArray={this.props.products} 
                    renderRow={this.renderRow}

                />
            ); 
        }
    }

    renderRow(product) {
        return (
            <Card>
                <CardItem button onPress={() => Actions.productdetail({ product })}>
                    <Image 
                        source={{ uri: product.UrlPicture }} 
                        style={{ flex: 1, height: 200, backgroundColor: '#dbdde0' }}
                        resizeMode="contain" 
                    />
                </CardItem>
                <CardItem button onPress={() => Actions.productdetail({ product })}>
                    <Left>
                        <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{product.ProductName}</Text>
                    </Left>
                    <Body />
                    <Right>
                        <Icon name="md-arrow-dropright-circle" />
                    </Right>
                </CardItem>
            </Card>
        );
    }

    render() {
        return (
            <Container>
                <CustomHeader 
                    headerText={this.props.category.Categories} 
                    leftButton={BACK_BUTTON}
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
        );
    }
}

const mapStateToProps = state => {
    const products = _.map(state.products.Products);
    const loading = state.products.loading;

    return { products, loading };
};

export default connect(mapStateToProps, { productsFetch })(ProductList);
