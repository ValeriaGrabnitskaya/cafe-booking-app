import { placesTypesSuccessAC, placesTypesErrorAC } from "../actions/dictionaryActions";
import isoFetch from 'isomorphic-fetch';

const getPlacesTypesAC = (dispatch) => {
    return function () {
        isoFetch(`/api/get-places-types`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
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
                dispatch(placesTypesSuccessAC(data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(placesTypesErrorAC());
            })
            ;
    }

}

export { getPlacesTypesAC };