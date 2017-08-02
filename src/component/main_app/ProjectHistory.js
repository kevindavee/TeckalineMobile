import _ from 'lodash';
import React, { Component } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { Container, Content, List, ListItem, Text, Body, Right } from 'native-base';
import { connect } from 'react-redux';
import { CustomHeader } from '../commons/';
import { BACK_BUTTON } from '../commons/ButtonConst';
import { projectHistoryFetch } from '../../actions';

class ProjectHistory extends Component {
    componentWillMount() {
        this.props.projectHistoryFetch();
    }

    onRefresh() {
        this.props.projectHistoryFetch();
    }

    renderContent() {
        if (!this.props.loading) {
            return (
                <List 
                    dataArray={this.props.projects} 
                    renderRow={this.renderRow}

                />
            ); 
        }
    }

    renderRow(project) {
        return (
            <ListItem>
                <Body>
                    <Text>{project.project}</Text>
                    <Text note>{project.date}</Text>
                </Body>
                <Right />
            </ListItem>
        );
    }

    render() {
        return (
            <Container>
                <CustomHeader headerText="History" leftButton={BACK_BUTTON} />
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
    const projects = _.map(state.projectHistory.projects, (val, uid) => {
        return { ...val, uid };
    });
    const loading = state.projectHistory.loading;

    return { projects, loading };
};

export default connect(mapStateToProps, { projectHistoryFetch })(ProjectHistory);
