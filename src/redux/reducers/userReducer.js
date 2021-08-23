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
    users: [],
    user: {},
    error: ``
};
let updatedData = [];
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
                users: action.payload,
                error: ``
            };
        case FETCH_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                users: [],
                user: {},
                error: action.payload
            };
        case USER_DELETE:
            console.log(action.payload);
            return {
                ...state,
                loading: false,
                users: deleteUser(state, action.payload),
                error: ``
            };
        case USER_EDIT:
            return {
                ...state,
                loading: false,
                users: editUser(state, action.payload),
                error: ``
            };
        default:
            return state;
    }


}

const editUser = (state, { id, login }) => {
    return updatedData = state.users.map((singleUser) => {
        if (singleUser.id === id) {
            return { ...singleUser, login: login }
        }
        return singleUser;
    })
}

const deleteUser = (state, id) => {
    return updatedData = state.users.filter((user) => {
        return user.id !== id;
    })
}