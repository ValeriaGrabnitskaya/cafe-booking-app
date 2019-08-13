import { bookTableSuccessAC, bookTableErrorAC, saveBookTableInfoAC } from "../actions/placesActions";
import isoFetch from 'isomorphic-fetch';

const bookTableAC = (request) => {
    return dispatch => {
        return isoFetch(`/api/places/book-table`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(request),
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
                console.log(data)
                dispatch(bookTableSuccessAC(data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(bookTableErrorAC());
            });

    }
}

export { bookTableAC };