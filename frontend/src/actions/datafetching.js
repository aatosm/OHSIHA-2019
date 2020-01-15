import axios from 'axios';
import {GET_CITIES,
  GET_FAVORITES,
  CURRENT_DATA,
  FORECAST_DATA} from './types';


export const getCities = () => (dispatch) => {
  axios.get('/api/cities')
    .then((result) => dispatch(setCities(result.data)));
};

export const setCities = (result) => {
  return {
    type: GET_CITIES,
    payload: result
  };
};


export const getFavorites = (id) => (dispatch) => {
  axios.get('/api/users/'+id+'/cities')
    .then((result) => dispatch(setFavorites(result.data)));
};

export const setFavorites = (result) => {
  return {
    type: GET_FAVORITES,
    payload: result
  };
};


export const addToFavorites = (id, city) => (dispatch) => {
  axios.post('/api/users/'+id+'/add', {name: city.name, country: city.country})
    .then((result) => getFavorites(id)(dispatch));
};


export const removeFromFavorites = (id, city) => (dispatch) => {
  axios.post('/api/users/'+id+'/remove', {cityId: city.id})
    .then((result) => getFavorites(id)(dispatch));
};


export const getCurrent = (city) => (dispatch) => {
  axios.get('/api/cities/'+city+'/current')
    .then((result) => dispatch(setCurrent(result)));
};


export const setCurrent = (result) => {
  return {
    type: CURRENT_DATA,
    payload: result
  };
};


export const getForecast = (city) => (dispatch) => {
  axios.get('/api/cities/'+city+'/forecast')
    .then((result) => dispatch(setForecast(result)));
};


export const setForecast = (result) => {
  return {
    type: FORECAST_DATA,
    payload: result
  };
};

