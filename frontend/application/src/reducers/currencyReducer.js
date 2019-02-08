import { GET_CURRENCIES } from '../actions/types';

const initialState = {};

export default function(state = initialState, action ) {
    switch(action.type) {
        case GET_CURRENCIES:
            return action.payload.data;
        default: 
            return state;
    }
}