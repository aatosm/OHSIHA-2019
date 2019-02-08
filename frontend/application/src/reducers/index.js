import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import citiesReducer from './citiesReducer';
import favoritesReducer from './favoritesReducer';

export default combineReducers({
   errors: errorReducer,
   auth: authReducer,
   cities: citiesReducer,
   favorites: favoritesReducer
});