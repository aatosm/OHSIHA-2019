import {GET_FAVORITES, ADD_FAVORITES, REMOVE_FAVORITE} from '../actions/types';

const initialState = {};

export default function(state = initialState, action ) {
  switch (action.type) {
  case GET_FAVORITES:
    return action.payload.data;
  case ADD_FAVORITES:
    return action.payload.data;
  case REMOVE_FAVORITE:
    return action.payload.data;
  default:
    return state;
  }
}
