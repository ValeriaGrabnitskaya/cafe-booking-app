import { getPlaceByIdSuccessAC, getPlaceByIdErrorAC } from "../actions/placesActions";
import isoFetch from 'isomorphic-fetch';

const searchPlaceByIdAC = (data) => {
    return dispatch => {
        return isoFetch(`/api/places/get-by-id`, {
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
                let configData = configPlaceOperationMode(data);
                dispatch(getPlaceByIdSuccessAC(configData));
            })
            .catch((error) => {
                console.error(error);
                dispatch(getPlaceByIdErrorAC());
            });

    }
}

function configPlaceOperationMode(place) {
    let operationMode = place.mainPlaceInfo.openDayFrom.id + ' - ' + place.mainPlaceInfo.openDayTo.id + ' ' +
        place.mainPlaceInfo.openTimeFrom.id + ' - ' + place.mainPlaceInfo.openTimeTo.id;
    place['mainPlaceInfo']['operationMode'] = operationMode;
    return place
}

export { searchPlaceByIdAC };