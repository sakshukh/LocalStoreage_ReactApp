import { FETCH_USER_ERROR, FETCH_USER_REQUEST, FETCH_USER_SUCCESS } from "./userType";
import axios from 'axios'

function fetchUserRequest() {
    return { type: FETCH_USER_REQUEST }
}

function fetchUserSuccess(user) {
    return {
        type: FETCH_USER_SUCCESS,
        payload: user
    }
}

function fetchUserError(error) {
    return {
        type: FETCH_USER_ERROR,
        payload: error
    }
}


export const fetchUsers = (page) => {
    return async (dispatch) => {
        dispatch(fetchUserRequest())
        await axios.get(`https://reqres.in/api/users?page=${page}`)
            .then(response => {
                const user = response.data
                dispatch(fetchUserSuccess(user))
            })
            .catch((error) => {
                const errorMsg = error.message
                dispatch(fetchUserError(errorMsg))
            })
    }
}

