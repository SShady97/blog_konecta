import { ALERT } from '../../types';

const adminReducer = (state, action) => {
    switch(action.type) {

        case ALERT:
            return {
                ...state,
                users: action.payload
            }

        default:
            return 'Tipo desconocido';
    }
}

export default adminReducer;