import axios from 'axios';
import { GET_CITIES, 
         GET_FAVORITES,  
         ADD_FAVORITES, 
         REMOVE_FAVORITE, 
         CURRENT_DATA } from './types';


export const getCities = () => dispatch => {
    axios.get('/api/cities')
        .then(result => dispatch(setCities(result)));
}

export const setCities = result => {
    return {   
        type: GET_CITIES,
        payload: result
    }
}


export const getFavorites = (id) => dispatch => {
    axios.get('/api/users/'+id+'/cities')
        .then(result => dispatch(setFavorites(result)));
}

export const setFavorites = result => {
    return {   
        type: GET_FAVORITES,
        payload: result
    }
}


export const addToFavorites = (id, city) => dispatch => {
    axios.post('/api/users/'+id+'/add', {name: city.name, country: city.country})
        .then(result => dispatch(add(result)));
}

export const add = result => {
    return {   
        type: ADD_FAVORITES,
        payload: result
    }
}


export const removeFromFavorites = (id, city) => dispatch => {
    axios.post('/api/users/'+id+'/remove', {cityId: city.id})
        .then(result => dispatch(remove(result)));
}

export const remove = result => {
    return {   
        type: REMOVE_FAVORITE,
        payload: result
    }
}


export const getCurrent = (city) => dispatch => {
    axios.get('/api/cities/'+city+'/current')
    .then(result => dispatch(setCurrent(result)));
}

export const setCurrent = result => {
    return {   
        type: CURRENT_DATA,
        payload: result
    }
}
