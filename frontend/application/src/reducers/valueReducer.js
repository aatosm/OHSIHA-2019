import { CURRENT_DATA } from '../actions/types';

const initialState = {};

export default function(state = initialState, action ) {
    switch(action.type) {
        case CURRENT_DATA:
            return action.payload.data;
        default: 
            return state;
    }
}