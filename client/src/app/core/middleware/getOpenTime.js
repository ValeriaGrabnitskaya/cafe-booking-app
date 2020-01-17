import { openTimeSuccessAC, openTimeErrorAC } from "../actions/dictionaryActions";
import isoFetch from 'isomorphic-fetch';

const getOpenTimeAC = (dispatch) => {
    return function () {
        isoFetch(`/api/get-open-time`, {
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
                dispatch(openTimeSuccessAC(data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(openTimeErrorAC());
            })
            ;
    }

}

export { getOpenTimeAC };