import { searchAvailableTablesSuccessAC, searchAvailableTablesErrorAC } from "../actions/placesActions";
import isoFetch from 'isomorphic-fetch';

const searchAvailableTablesAC = (data) => {
    return dispatch => {
        return isoFetch(`/api/places/get-available-tables`, {
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
                dispatch(searchAvailableTablesSuccessAC(data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(searchAvailableTablesErrorAC());
            });

    }
}


export { searchAvailableTablesAC };