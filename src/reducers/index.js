import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import CategoriesReducer from './CategoriesReducer';
import ProductReducer from './ProductReducer';
import RewardFormReducer from './RewardFormReducer';
import ProjectHistoryReducer from './ProjectHistoryReducer';
import RegisterReducer from './RegisterReducer';
import ProfileReducer from './ProfileReducer';
import ChangePasswordReducer from './ChangePasswordReducer';

export default combineReducers({
    login: LoginReducer,
    register: RegisterReducer,
    categories: CategoriesReducer,
    products: ProductReducer,
    rewardsForm: RewardFormReducer,
    projectHistory: ProjectHistoryReducer,
    profile: ProfileReducer,
    changePassword: ChangePasswordReducer 
});
