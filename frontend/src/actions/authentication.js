import axios from 'axios';
import {GET_ERRORS, SET_CURRENT_USER, NETWORK_ERROR} from './types';
import setAuthToken from '../setAuthToken';
import jwtDecode from 'jwt-decode';

// const host = 'http://localhost:8000'

export const registerUser = (user, history) => (dispatch) => {
  axios.post('/api/users/register', user)
    .then((res) => history.push('/login'))
    .catch((err) => {
      dispatch({
        type: NETWORK_ERROR,
        payload: 'WeatherBUDDY cannot connect to the server.'
      });
    });
};

export const loginUser = (user) => (dispatch) => {
  axios.post('/api/users/login', user)
    .then((res) => {
      const {token} = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwtDecode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) => {
      dispatch({
        type: NETWORK_ERROR,
        payload: 'WeatherBUDDY cannot connect to the server.'
      });
    });
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = (history) => (dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  history.push('/login');
};
