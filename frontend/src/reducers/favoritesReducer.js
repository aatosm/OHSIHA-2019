import {GET_FAVORITES} from '../actions/types';

const initialState = [];

export default function(state = initialState, action ) {
  switch (action.type) {
  case GET_FAVORITES:
    return action.payload;
  default:
    return state;
  }
}
