import axios from 'axios';
import { GET_CITIES, GET_FAVORITES,  ADD_FAVORITES } from './types';

export const getCities = () => dispatch => {
    axios.get('/api/cities')
        .then(result => dispatch(setCities(result)));
}

export const getFavorites = (id) => dispatch => {
    axios.get('/api/users/'+id+'/cities')
        .then(result => dispatch(setFavorites(result)));
}

export const addToFavorites = (id, city) => dispatch => {
    axios.post('/api/users/'+id+'/add', {city: city.city, country: city.country})
        .then(result => dispatch(add(result)));
}

export const setCities = result => {
    return {   
        type: GET_CITIES,
        payload: result
    }
}

export const setFavorites = result => {
    return {   
        type: GET_FAVORITES,
        payload: result
    }
}

export const add = result => {
    return {   
        type: ADD_FAVORITES,
        payload: result
    }
}
