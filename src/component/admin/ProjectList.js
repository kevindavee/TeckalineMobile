import React, { Component } from 'react';
import { DrawerLayoutAndroid, ScrollView, RefreshControl, Alert } from 'react-native';
import { Container, List, Content, Button, Text, ListItem } from 'native-base';
import Swipeable from 'react-native-swipeable';
import { connect } from 'react-redux';
import { CustomHeader, MyDrawer } from '../commons/';
import { projectListFetch, projectListValidating } from '../../actions';
import { DRAWER_MENU } from '../commons/ButtonConst';


class ProjectList extends Component {    
    componentWillMount() {
        this.props.projectListFetch();
    }

    onRefresh() {
        this.props.projectListFetch();
    }

    openDrawer() {
        this.refs['.DRAWER'].openDrawer();
    }

    renderContent() {
        if (!this.props.loading) {
            return (
                <List 
                    dataArray={this.props.project} 
                    renderRow={this.renderRow.bind(this)}
                />
            ); 
        }
    }

    renderRow(project) {
        const rightButtons = [
        <Button 
            full 
            light 
            style={{ alignItems: 'flex-start', flexDirection: 'column', flex: 1 }} 
            onPress={() => 
                Alert.alert('Info', `Project: ${project.project} \nTanggal: ${project.date} \nNama: ${project.fullName} \nPerusahaan: ${project.company}`)
            }
        >
            <Text>Info</Text>
        </Button>,
        <Button 
            full 
            success 
            style={{ alignItems: 'flex-start', flexDirection: 'column', flex: 1 }}
            onPress={() => 
                Alert.alert(
                    'Validate',
                    'Apakah project ini valid ?',
                    [
                        { text: 'Ya', onPress: () => this.props.projectListValidating(true, project.projectId) },
                        { text: 'Tidak', onPress: () => this.props.projectListValidating(false, project.projectId) },
                        { text: 'Kembali' }
                    ]
                )
            }
        
        >
            <Text>Validate</Text>
        </Button>
        ];
        
        return (
            <Swipeable 
                rightButtons={rightButtons}
                rightButtonWidth={125}

            >
                <ListItem>
                    <Text>{project.project}</Text>
                </ListItem>
            </Swipeable>
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
                        headerText="Project List"
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

const mapStateToProps = ({ projectList }) => {
    const project = projectList.projects;
    const loading = projectList.loading;
    
    return { project, loading };
};

export default connect(mapStateToProps, { projectListFetch, projectListValidating })(ProjectList);
