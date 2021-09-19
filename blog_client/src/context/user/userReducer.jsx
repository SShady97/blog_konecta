import { ALL_USERS, NEW_USER, DEL_USER, EDIT_USER, ALERT_EMAIL } from '../../types';

const userReducer = (state, action) => {
    switch(action.type) {

        case ALL_USERS:
            return {
                ...state,
                users: action.payload
            }

        case NEW_USER:
            return {
                ...state,
                users: [...state.users, action.payload]
            }

        case EDIT_USER:
            state.users.splice(action.payload.rowIndex, 1, action.payload.user);
            return {
                ...state,
                users: state.users
            }

        case DEL_USER:
            state.users.splice(action.payload, 1)
            return {
                ...state,
                users: state.users
            }

        case ALERT_EMAIL:
            return {
                ...state,
                alert: action.payload
            }

        default:
            return 'Tipo desconocido';
    }
}

export default userReducer;