import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import currencyReducer from './currencyReducer';
import favoritesReducer from './favoritesReducer';

export default combineReducers({
   errors: errorReducer,
   auth: authReducer,
   currencies: currencyReducer,
   favorites: favoritesReducer
});