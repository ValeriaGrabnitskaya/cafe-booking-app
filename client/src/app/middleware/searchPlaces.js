import { searchPlacesSuccessAC, searchPlacesErrorAC } from "../actions/placesActions";
import isoFetch from 'isomorphic-fetch';

const searchPlacesAC = (data) => {
    return dispatch => {
        return isoFetch(`/api/places/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data),
            mode: 'cors'
        })
            .then((response) => {
                if (!response.ok) {
                    let Err = new Error("fetch error " + response.status);
                    Err.userMessage = "Ошибка связи";
                    throw Err;
                }
                else
                    return response.json();
            })
            .then((data) => {
                let configData = configPlacesOperationMode(data);
                dispatch(searchPlacesSuccessAC(configData));
            })
            .catch((error) => {
                console.error(error);
                dispatch(searchPlacesErrorAC());
            });

    }
}

function configPlacesOperationMode(places) {
    return places.map((place) => {
        place.mainPlaceInfo.operationMode = place.mainPlaceInfo.openDayFrom.id + ' - ' + place.mainPlaceInfo.openDayTo.id + ' ' +
            place.mainPlaceInfo.openTimeFrom.id + ' - ' + place.mainPlaceInfo.openTimeTo.id;
        return place;
    })
}

export { searchPlacesAC };