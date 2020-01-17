import actionTypes from "../constants/actionTypes";

export const openTimeErrorAC = function () {
    return {
        type: actionTypes.OPEN_TIME_ERROR,
    };
}

export const openTimeSuccessAC = function (openTime) {
    return {
        type: actionTypes.OPEN_TIME_SUCCESS,
        openTime: openTime,
    };
}

export const placesDropdownErrorAC = function () {
    return {
        type: actionTypes.PLACES_DROPDOWN_ERROR,
    };
}

export const placesDropdownSuccessAC = function (dropdownPlaces) {
    return {
        type: actionTypes.PLACES_DROPDOWN_SUCCESS,
        dropdownPlaces: dropdownPlaces,
    };
}

export const placesTypesErrorAC = function () {
    return {
        type: actionTypes.PLACES_TYPES_ERROR,
    };
}

export const placesTypesSuccessAC = function (placesTypes) {
    return {
        type: actionTypes.PLACES_TYPES_SUCCESS,
        placesTypes: placesTypes,
    };
}