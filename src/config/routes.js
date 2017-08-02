import React from 'react';
import { Scene, Router, ActionConst } from 'react-native-router-flux';
import LoginForm from '../component/auth/LoginForm';
import RegisterForm from '../component/auth/RegisterForm';
import ForgetPassword from '../component/auth/ForgetPassword';
import CategoryList from '../component/main_app/CategoryList';
import ProductList from '../component/main_app/ProductList';
import ProductDetail from '../component/main_app/ProductDetail';
import FormReward from '../component/main_app/FormReward';
import ProjectHistory from '../component/main_app/ProjectHistory';
import Profile from '../component/main_app/Profile';
import ChangePassword from '../component/main_app/ChangePassword';

const Routes = (props) => {
    return (
        <Router>
            <Scene key="auth" initial={!props.loggedIn} hideNavBar type={ActionConst.REPLACE} loggedIn={props.loggedIn}>
                <Scene key="login" component={LoginForm} />
                <Scene key="register" component={RegisterForm} />
                <Scene key="forgetpassword" component={ForgetPassword} />
            </Scene>
            <Scene key="product" initial={props.loggedIn} hideNavBar type={ActionConst.REPLACE} >
                <Scene key="categorieslist" component={CategoryList} initial />
                <Scene key="productlist" component={ProductList} />
                <Scene key="productdetail" component={ProductDetail} />
            </Scene>
            <Scene key="reward" hideNavBar type={ActionConst.RESET}>
                <Scene key="formreward" component={FormReward} />
                <Scene key="history" component={ProjectHistory} />
            </Scene>
            <Scene key="profile" hideNavBar type={ActionConst.RESET}>
                <Scene key="changeprofile" component={Profile} />
                <Scene key="changepassword" component={ChangePassword} />
            </Scene>    
            
        </Router>
    );
};

export default Routes;
