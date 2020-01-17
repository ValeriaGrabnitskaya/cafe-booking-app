import actionTypes from "../constants/actionTypes";

const initState = {
    openTime: [],
    placesTypes: []
}

function dictionaryReducer(state = initState, action) {
    switch (action.type) {

        case actionTypes.OPEN_TIME_SUCCESS: {
            let newState = {
                ...state,
                openTime: action.openTime,
            };
            return newState;
        }

        case actionTypes.OPEN_TIME_ERROR: {
            let newState = {
                ...state,
                openTime: [],
            };
            return newState;
        }

        case actionTypes.PLACES_TYPES_SUCCESS: {
            let newState = {
                ...state,
                placesTypes: action.placesTypes,
            };
            return newState;
        }

        case actionTypes.PLACES_TYPES_ERROR: {
            let newState = {
                ...state,
                placesTypes: [],
            };
            return newState;
        }

        default:
            return state;
    }
}

export default dictionaryReducer;