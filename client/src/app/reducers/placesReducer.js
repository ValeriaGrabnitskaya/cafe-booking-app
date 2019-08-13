import actionTypes from "../constants/actionTypes";
import places from '../../../dataDB/places';

const initState = {
    dropdownPlaces: [],
    places: places,
    filteredPlaces: places,
    place: {},
    availableTables: [],
    bookInfo: {},
    searchForm: {
        date: null,
        timeFrom: null,
        timeTo: null,
        placeId: null,
        placeTypeId: null
    }
}

function placesReducer(state = initState, action) {
    switch (action.type) {

        case actionTypes.PLACES_DROPDOWN_SUCCESS: {
            let newState = {
                ...state,
                dropdownPlaces: action.dropdownPlaces,
            };
            return newState;
        }

        case actionTypes.PLACES_DROPDOWN_ERROR: {
            let newState = {
                ...state,
                dropdownPlaces: [],
            };
            return newState;
        }

        case actionTypes.SEARCH_PLACES_SUCCESS: {
            let newState = {
                ...state,
                filteredPlaces: action.places,
            };
            return newState;
        }

        case actionTypes.SEARCH_PLACES_ERROR: {
            let newState = {
                ...state,
                filteredPlaces: [],
            };
            return newState;
        }

        case actionTypes.GET_PLACE_BY_ID_SUCCESS: {
            let newState = {
                ...state,
                place: action.place,
            };
            return newState;
        }

        case actionTypes.GET_PLACE_BY_ID_ERROR: {
            let newState = {
                ...state,
                place: {},
            };
            return newState;
        }

        case actionTypes.SEARCH_AVAILABLE_TABLES_SUCCESS: {
            let newState = {
                ...state,
                place: action.updateData.place,
                availableTables: action.updateData.places
            };
            return newState;
        }

        case actionTypes.SEARCH_AVAILABLE_TABLES_ERROR: {
            let newState = {
                ...state,
                availableTables: [],
            };
            return newState;
        }

        case actionTypes.BOOK_TABLE_SUCCESS: {
            let newState = {
                ...state,
                bookInfo: action.info.bookInfo,
                places: action.info.places
            };
            return newState;
        }

        case actionTypes.BOOK_TABLE_ERROR: {
            let newState = {
                ...state,
                bookInfo: {},
            };
            return newState;
        }

        case actionTypes.ADD_COMMENT_SUCCESS: {
            let newState = {
                ...state,
                places: action.places,
                place: action.place
            };
            return newState;
        }

        case actionTypes.ADD_COMMENT_ERROR: {
            let newState = {
                ...state
            };
            return newState;
        }

        case actionTypes.SAVE_SEARCH_FORM: {
            let newState = {
                ...state,
                searchForm: action.searchForm
            };
            return newState;
        }

        default:
            return state;
    }
}

export default placesReducer;