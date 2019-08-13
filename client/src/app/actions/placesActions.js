import actionTypes from "../constants/actionTypes";

export const searchPlacesErrorAC = function () {
    return {
        type: actionTypes.SEARCH_PLACES_ERROR,
    };
}

export const searchPlacesSuccessAC = function (places) {
    return {
        type: actionTypes.SEARCH_PLACES_SUCCESS,
        places: places,
    };
}

export const getPlaceByIdErrorAC = function () {
    return {
        type: actionTypes.GET_PLACE_BY_ID_ERROR,
    };
}

export const getPlaceByIdSuccessAC = function (place) {
    return {
        type: actionTypes.GET_PLACE_BY_ID_SUCCESS,
        place: place,
    };
}

export const searchAvailableTablesErrorAC = function () {
    return {
        type: actionTypes.SEARCH_AVAILABLE_TABLES_ERROR,
    };
}

export const searchAvailableTablesSuccessAC = function (updateData) {
    return {
        type: actionTypes.SEARCH_AVAILABLE_TABLES_SUCCESS,
        updateData: updateData,
    };
}

export const bookTableErrorAC = function () {
    return {
        type: actionTypes.BOOK_TABLE_ERROR,
    };
}

export const bookTableSuccessAC = function (info) {
    return {
        type: actionTypes.BOOK_TABLE_SUCCESS,
        info: info,
    };
}

export const addCommentErrorAC = function () {
    return {
        type: actionTypes.ADD_COMMENT_ERROR,
    };
}

export const  addCommentSuccessAC = function (updatedData) {
    return {
        type: actionTypes.ADD_COMMENT_SUCCESS,
        places: updatedData.places,
        place: updatedData.place
    };
}

export const  saveSearchFormAC = function (searchForm) {
    return {
        type: actionTypes.SAVE_SEARCH_FORM,
        searchForm: searchForm
    };
}

