import axios from "axios";
import { baseUrl } from "../../components/shared/platform.api";
import {
    FETCH_USERS_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    USER_DELETE,
    USER_EDIT
} from "../constants/types";

const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    };
}
const fetchUsersSuccess = users => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users,
    };
}
const fetchUserSuccess = user => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: user,
    };
}
const fetchUserFailure = error => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    };
}
const editUserDetails = userDetails => {
    return {
        type: USER_EDIT,
        payload: userDetails
    };
};
const deleteUserById = id => {
    return {
        type: USER_DELETE,
        payload: id
    };
};

export const getAllUsers = () => {
    return function (dispatch) {
        dispatch(fetchUsersRequest());
        axios.get(`${baseUrl}/users`).then(res => {
            dispatch(fetchUsersSuccess(res.data))
        }).catch(error =>
            dispatch(fetchUserFailure(error.message)))
    }
};

export const getUser = (id) => {
    return function (dispatch) {
        dispatch(fetchUsersRequest());
        axios.get(`${baseUrl}/users/${id}`).then(res => {
            dispatch(fetchUserSuccess(res.data))
        }).catch(error => dispatch(fetchUserFailure(error.message)))
    }
};

export const editUser = (userDetails) => dispatch => {
    return dispatch(editUserDetails(userDetails))
};

export const deleteUser = (id) => dispatch => {
    return dispatch(deleteUserById(id))
};