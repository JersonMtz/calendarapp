import { TYPES } from '../types';

const initialState = {
    events: [],
    active: null
}

export const calendarReducer = (state = initialState, action) => {

    switch (action.type) {
        
        case TYPES.calendarEventLoad:
            return {
                ...state,
                events: [...action.payload]
            }

        case TYPES.calendarEventActive:
            return {
                ...state,
                active: action.payload
            }
        
        case TYPES.calendarEventAdd:
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
            }

        case TYPES.calendarEventUpdate:
            return {
                events: state.events
                    .map(evt => evt.id === action.payload.id ? action.payload : evt),
                active: null
            }

        case TYPES.calendarEventDelete:
            return {
                events: state.events
                .filter(evt => evt.id !== state.active.id),
                active: null
            }
        
        case TYPES.calendarActiveClear:
            return {
                ...state,
                active: null
            }
        case TYPES.calendarResetEvents:
            return {...initialState }
            
        default:
            return state;
    }
}