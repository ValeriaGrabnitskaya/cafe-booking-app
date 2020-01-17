import { addCommentErrorAC, addCommentSuccessAC } from "../actions/placesActions";
import isoFetch from 'isomorphic-fetch';

const addCommentAC = (data) => {
    return dispatch => {
        return isoFetch(`/api/places/add-comment`, {
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
                dispatch(addCommentSuccessAC(data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addCommentErrorAC());
            });

    }
}

export { addCommentAC };