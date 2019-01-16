import axios from 'axios';
import { GET_CITIES } from './types';

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
