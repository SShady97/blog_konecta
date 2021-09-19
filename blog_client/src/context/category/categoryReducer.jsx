import { ALL_CATEGORIES, NEW_CATEGORY, DEL_CATEGORY, EDIT_CATEGORY } from '../../types';

const categoryReducer = (state, action) => {
    switch(action.type) {

        case ALL_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }

        case NEW_CATEGORY:
            return {
                ...state,
                categories: [...state.categories, action.payload]
            }

        case EDIT_CATEGORY:
            state.categories.splice(action.payload.rowIndex, 1, action.payload.category);
            return {
                ...state,
                categories: state.categories
            }

        case DEL_CATEGORY:
            state.categories.splice(action.payload, 1)
            return {
                ...state,
                categories: state.categories
            }

        default:
            return 'Tipo desconocido';
    }
}

export default categoryReducer;