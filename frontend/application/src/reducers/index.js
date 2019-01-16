import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import citiesReducer from './citiesReducer';

export default combineReducers({
   errors: errorReducer,
   auth: authReducer,
   cities: citiesReducer
});