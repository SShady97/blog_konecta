import React, { useReducer } from 'react';

import itemReducer from './itemReducer';
import itemContext from './itemContext';

import { ALL_ITEMS, NEW_ITEM, DEL_ITEM, EDIT_ITEM, ITEMS_CAT } from '../../types';

const ItemState = props => {
    
    const initialState = {
        items: [],
    }

    const [ state, dispatch ] = useReducer(itemReducer, initialState);

    const getAllItems = async () => {

        const token = sessionStorage.getItem('token');

        try {
            
            const api_url = `${process.env.REACT_APP_SERVER_URL}/api/items`;

            const responseGetItems = await fetch(api_url, { method: 'GET',
                                                        headers: {
                                                            'Authorization': `Bearer ${token}`,
                                                            'Content-Type': 'application/json'}});
            const resultGetItems = await responseGetItems.json();

            console.log(resultGetItems);

            dispatch({
                type: ALL_ITEMS,
                payload: resultGetItems
            });

        } catch (error) {
            console.log(error);
        }
    }

    const createItem = async (data_item) => {

        const token = sessionStorage.getItem('token');

        try {
            
            const api_url = `${process.env.REACT_APP_SERVER_URL}/api/items/new`;

            const responseNewItem = await fetch(api_url, { method: 'POST',
                                                        headers: {
                                                            'Authorization': `Bearer ${token}`,
                                                            'Content-Type': 'application/json'},
                                                        body: JSON.stringify(data_item) });

            const resultNewItem = await responseNewItem.json();
         
            console.log(resultNewItem);

            if(resultNewItem.status === 201){
                getAllItems();
            };
            
        } catch (error) {
            console.log(error);
        }
    }

    const editItem = async (data_item, rowIndex) => {

        const token = sessionStorage.getItem('token');

        console.log(data_item)

        try {
            
            const api_url = `${process.env.REACT_APP_SERVER_URL}/api/items/update`;

            const responseUpdItem = await fetch(api_url, { method: 'PUT',
                                                        headers: {
                                                            'Authorization': `Bearer ${token}`,
                                                            'Content-Type': 'application/json'},
                                                        body: JSON.stringify(data_item) });

            const resultUpdItem = await responseUpdItem.json();

            console.log(resultUpdItem)
         
            if(resultUpdItem.status === 200){
                dispatch({
                    type: EDIT_ITEM,
                    payload: {item: data_item, rowIndex: rowIndex}
                });
            }
 
        } catch (error) {
            console.log(error);
        }
    }
    
    const deleteItem = async (id, data_index) => {

        const token = sessionStorage.getItem('token');

        try {
            
            const api_url = `${process.env.REACT_APP_SERVER_URL}/api/items/delete/${id}`;

            const responseDelItem = await fetch(api_url, { method: 'DELETE',
                                                        headers: {
                                                            'Authorization': `Bearer ${token}`,
                                                            'Content-Type': 'application/json'}});
            const resultDelItem = await responseDelItem.json();

            console.log(resultDelItem);

            dispatch({
                type: DEL_ITEM,
                payload: data_index
            });

        } catch (error) {
            console.log(error);
        }

    }

    const itemsByCat = async (category_id) => {

        const token = sessionStorage.getItem('token');

        try {
            
            const api_url = `${process.env.REACT_APP_SERVER_URL}/api/itemsCat/${category_id}`;

            const responseitemsCat = await fetch(api_url, { method: 'GET',
                                                        headers: {
                                                            'Authorization': `Bearer ${token}`,
                                                            'Content-Type': 'application/json'}});
            const resultItemsCat = await responseitemsCat.json();

            console.log(resultItemsCat);

            dispatch({
                type: ITEMS_CAT,
                payload: resultItemsCat.items
            });

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <itemContext.Provider
            value={{
                items: state.items,
                getAllItems: getAllItems,
                deleteItem: deleteItem,
                createItem: createItem,
                editItem: editItem,
                itemsByCat: itemsByCat
            }}
        >
            {props.children}
        </itemContext.Provider>
    );
}

export default ItemState;
