import { TYPES } from '../types';

const initialState = {
    openModal: false,
    loading: false
}

export const uiReducer = (state = initialState, action) => {

    switch (action.type) {
        case TYPES.uiShowLoading:
            return {
                ...state,
                loading: true
            };

        case TYPES.uiHideLoading:
            return {
                ...state,
                loading: false
            }

        case TYPES.uiOpenModal:
            return {
                ...state,
                openModal: true
            }
        case TYPES.uiCloseModal:
            return {
                ...state,
                openModal: false
            }
        default:
            return state;
    }
}