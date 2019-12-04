import {combineReducers} from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import cityReducer from './cityReducer';
import favoritesReducer from './favoritesReducer';
import valueReducer from './valueReducer';
import forecastReducer from './forecastReducer';

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  cities: cityReducer,
  favorites: favoritesReducer,
  values: valueReducer,
  forecast: forecastReducer
});
