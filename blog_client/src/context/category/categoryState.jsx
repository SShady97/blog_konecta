import React, { useReducer } from 'react';

import categoryReducer from './categoryReducer';
import categoryContext from './categoryContext';

import { ALL_CATEGORIES, NEW_CATEGORY, DEL_CATEGORY, EDIT_CATEGORY, ITEMS_CAT } from '../../types';

const CategoryState = props => {
    
    const initialState = {
        categories: [],
    }

    const [ state, dispatch ] = useReducer(categoryReducer, initialState);

    const getAllCategories = async () => {

        const token = sessionStorage.getItem('token');

        try {
            
            const api_url = `${process.env.REACT_APP_SERVER_URL}/api/categories`;

            const responseGetCategories = await fetch(api_url, { method: 'GET',
                                                        headers: {
                                                            'Authorization': `Bearer ${token}`,
                                                            'Content-Type': 'application/json'}});
            const resultGetCategories = await responseGetCategories.json();

            dispatch({
                type: ALL_CATEGORIES,
                payload: resultGetCategories
            });

        } catch (error) {
            console.log(error);
        }
    }

    const createCategory = async (data_category) => {

        const token = sessionStorage.getItem('token');

        try {
            
            const api_url = `${process.env.REACT_APP_SERVER_URL}/api/categories/new`;

            const responseNewCategory = await fetch(api_url, { method: 'POST',
                                                        headers: {
                                                            'Authorization': `Bearer ${token}`,
                                                            'Content-Type': 'application/json'},
                                                        body: JSON.stringify(data_category) });

            const resultNewCategory = await responseNewCategory.json();

            dispatch({
                type: NEW_CATEGORY,
                payload: resultNewCategory.category
            });
            
        } catch (error) {
            console.log(error);
        }
    }

    const editCategory = async (data_category, rowIndex) => {

        const token = sessionStorage.getItem('token');

        try {
            
            const api_url = `${process.env.REACT_APP_SERVER_URL}/api/categories/update`;

            const responseUpdCategory = await fetch(api_url, { method: 'PUT',
                                                        headers: {
                                                            'Authorization': `Bearer ${token}`,
                                                            'Content-Type': 'application/json'},
                                                        body: JSON.stringify(data_category) });

            const resultUpdCategory = await responseUpdCategory.json();
         
            dispatch({
                type: EDIT_CATEGORY,
                payload: {category: resultUpdCategory.category, rowIndex: rowIndex}
            });
            
        } catch (error) {
            console.log(error);
        }
    }
    
    const deleteCategory = async (id, data_index) => {

        const token = sessionStorage.getItem('token');

        try {
            
            const api_url = `${process.env.REACT_APP_SERVER_URL}/api/categories/delete/${id}`;

            const responseDelCategory = await fetch(api_url, { method: 'DELETE',
                                                        headers: {
                                                            'Authorization': `Bearer ${token}`,
                                                            'Content-Type': 'application/json'}});
            const resultDelCategory = await responseDelCategory.json();

            dispatch({
                type: DEL_CATEGORY,
                payload: data_index
            });

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <categoryContext.Provider
            value={{
                categories: state.categories,
                getAllCategories: getAllCategories,
                deleteCategory: deleteCategory,
                createCategory: createCategory,
                editCategory: editCategory
            }}
        >
            {props.children}
        </categoryContext.Provider>
    );
}

export default CategoryState;