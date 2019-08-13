import { placesDropdownSuccessAC, placesDropdownErrorAC } from "../actions/dictionaryActions";
import isoFetch from 'isomorphic-fetch';

const getPlacesForDropdownAC = (data) => {
    return dispatch => {
        return isoFetch(`/api/places/get-places-for-dictionary`, {
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
                dispatch(placesDropdownSuccessAC(data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(placesDropdownErrorAC());
            });
    }
}

export { getPlacesForDropdownAC };