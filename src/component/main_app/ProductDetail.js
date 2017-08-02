import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Content, Card, CardItem, Text } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { CustomHeader } from '../commons';
import { BACK_BUTTON } from '../commons/ButtonConst';

class ProductDetail extends Component {
    product = this.props.product;

    generateColorsString(colors) {
        let colorsString = '';

        colorsString = colors.map((value) => {
            return `${colorsString}${value}\n`;
        });

        return colorsString;
    }

    renderArmatureOnlyText() {
        if (!this.product.isLightSourceIntegrated) {
            return <Text style={{ fontWeight: 'normal', fontSize: 12 }}>Armature Only</Text>;
        }
    }

    renderSpecificationText(key, value) {
        let thisValue = value;

        if (value === ' ') {
            thisValue = ' ';
        } else if (value === null || value === undefined || value < 1) {
            thisValue = '-';
        }

        return (
            <Row>
                <Col size={5}>
                    <Text>{key}</Text>
                </Col>
                <Col size={1}>
                    <Text>:</Text>
                </Col>
                <Col size={7}>
                    <Text>{thisValue}</Text>
                </Col>
            </Row>
        );
    }

    render() {
        return (
            <Container>
                <CustomHeader headerText={this.product.ProductName} leftButton={BACK_BUTTON} />
                <Content>
                    <Card>
                        <CardItem>
                            <Image 
                                source={{ uri: this.product.UrlPicture }} 
                                style={{ flex: 1, height: 200, backgroundColor: '#dbdde0' }}
                                resizeMode="contain" 
                            />
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                            <Text style={{ fontWeight: 'bold' }}>
                                {`${this.product.ProductName}\n`}
                                {this.renderArmatureOnlyText()}
                            </Text>
                        </CardItem>
                        <CardItem>
                            <Grid>
                                {this.renderSpecificationText('Categories', this.product.Categories)}
                                {this.renderSpecificationText('Light Source', this.product.LightSource)}  
                                {this.renderSpecificationText('Watt', this.product.Watt)}
                                {this.renderSpecificationText('IP', this.product.IP)}  
                                {this.renderSpecificationText('Colors', this.generateColorsString(this.product.Colors))}
                                {this.renderSpecificationText('Details', ' ')}
                            </Grid>
                        </CardItem>
                        <CardItem>
                            <Text>{this.product.Description}</Text>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}

export default ProductDetail;
