import {
    FETCH_USERS_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    USER_DELETE,
    USER_EDIT
} from "../constants/types";

const initialState = {
    loading: false,
    list: [],
    user: {},
    error: ``
};
export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                error: ``
            };
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                list: action.payload,
                error: ``
            };
        case FETCH_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                list: [],
                user: {},
                error: action.payload
            };
        case USER_DELETE:
            return {
                ...state,
                loading: false,
                list: action.payload,
                error: ``
            };
        case USER_EDIT:
            return {
                ...state,
                loading: false,
                list: action.payload,
                error: ``
            };
        default:
            return state;
    }


}