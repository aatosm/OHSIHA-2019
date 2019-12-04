import {GET_ERRORS, NETWORK_ERROR} from '../actions/types';

const initialState = {};

export default function(state = initialState, action ) {
  switch (action.type) {
  case NETWORK_ERROR:
    return {message: action.payload};
  case GET_ERRORS:
    return action.payload;
  default:
    return state;
  }
}
