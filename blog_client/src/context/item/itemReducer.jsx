import { ALL_ITEMS, NEW_ITEM, DEL_ITEM, EDIT_ITEM, ITEMS_CAT } from '../../types';

const itemReducer = (state, action) => {
    switch(action.type) {

        case ALL_ITEMS:
            return {
                ...state,
                items: action.payload
            }

        case NEW_ITEM:
            return {
                ...state,
                items: [...state.items, action.payload]
            }

        case EDIT_ITEM:
            state.items.splice(action.payload.rowIndex, 1, action.payload.item);
            return {
                ...state,
                items: state.items
            }

        case DEL_ITEM:
            state.items.splice(action.payload, 1)
            return {
                ...state,
                items: state.items
            }

        case ITEMS_CAT:
            return {
                ...state,
                items: action.payload
            }

        default:
            return 'Tipo desconocido';
    }
}

export default itemReducer;