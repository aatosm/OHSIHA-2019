import axios from 'axios';
import { GET_CURRENCIES, GET_FAVORITES,  ADD_FAVORITES } from './types';


export const getCurrencies = () => dispatch => {
    axios.get('/api/currencies')
        .then(result => dispatch(setCurrencies(result)));
}

export const setCurrencies = result => {
    return {   
        type: GET_CURRENCIES,
        payload: result
    }
}


export const getFavorites = (id) => dispatch => {
    axios.get('/api/users/'+id+'/currencies')
        .then(result => dispatch(setFavorites(result)));
}

export const setFavorites = result => {
    return {   
        type: GET_FAVORITES,
        payload: result
    }
}


export const addToFavorites = (id, currency) => dispatch => {
    axios.post('/api/users/'+id+'/add', {short: currency.short, full: currency.full})
        .then(result => dispatch(add(result)));
}

export const add = result => {
    return {   
        type: ADD_FAVORITES,
        payload: result
    }
}


/*export const getLatestData = () => dispatch => {
    axios.post('/api/users/'+id+'/add', {name: city.name})
        .then(result => dispatch(add(result)));
}

export const add = result => {
    return {   
        type: ADD_FAVORITES,
        payload: result
    }
}*/