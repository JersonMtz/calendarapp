import { TYPES } from '../types';

const initialState = null;

export const authReducer = (state = initialState, action) => {
    switch(action.type) {

        case TYPES.authStartLogin:
            return { 
                uid: action.payload.uid,
                name: action.payload.name
            }

        case TYPES.authStartLogout:
            return initialState

        default:
            return state;
    }
}