import {FORECAST_DATA} from '../actions/types';

const initialState = {};

export default function(state = initialState, action ) {
  switch (action.type) {
  case FORECAST_DATA:
    return action.payload.data;
  default:
    return state;
  }
}
