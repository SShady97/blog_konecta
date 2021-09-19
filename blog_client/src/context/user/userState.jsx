import React, { useReducer } from 'react';

import userReducer from './userReducer';
import userContext from './userContext';

import { ALL_USERS, NEW_USER, DEL_USER, EDIT_USER, ALERT_EMAIL, ALERT } from '../../types';

const UserState = props => {
    
    const initialState = {
        users: [],
        alert: {
            msg: null,
            display: false,
        }
    }

    const [ state, dispatch ] = useReducer(userReducer, initialState);

    const getAllUsers = async () => {

        const token = sessionStorage.getItem('token');

        try {
            
            const api_url = `${process.env.REACT_APP_SERVER_URL}/api/users`;

            const responseGetUsers = await fetch(api_url, { method: 'GET',
                                                        headers: {
                                                            'Authorization': `Bearer ${token}`,
                                                            'Content-Type': 'application/json'}});
            const resultGetUsers = await responseGetUsers.json();

            console.log(resultGetUsers);

            dispatch({
                type: ALL_USERS,
                payload: resultGetUsers
            });

        } catch (error) {
            console.log(error);
        }
    }

    const createUser = async (data_user) => {

        const token = sessionStorage.getItem('token');

        try {
            
            const api_url = `${process.env.REACT_APP_SERVER_URL}/api/users/new`;

            const responseNewUser = await fetch(api_url, { method: 'POST',
                                                        headers: {
                                                            'Authorization': `Bearer ${token}`,
                                                            'Content-Type': 'application/json'},
                                                        body: JSON.stringify(data_user) });

            const resultNewUser = await responseNewUser.json();
         
            console.log(resultNewUser);

            if(resultNewUser.status === 400){
                dispatch({
                    type: ALERT_EMAIL,
                    payload: {msg: resultNewUser.errors.email[0], display: true}
                });
            }else{
                dispatch({
                    type: NEW_USER,
                    payload: resultNewUser.user
                });
            }
            
            
        } catch (error) {
            console.log(error);
        }
    }

    const editUser = async (data_user, rowIndex) => {

        const token = sessionStorage.getItem('token');

        try {
            
            const api_url = `${process.env.REACT_APP_SERVER_URL}/api/users/update`;

            const responseUpdUser = await fetch(api_url, { method: 'PUT',
                                                        headers: {
                                                            'Authorization': `Bearer ${token}`,
                                                            'Content-Type': 'application/json'},
                                                        body: JSON.stringify(data_user) });

            const resultUpdUser = await responseUpdUser.json();
         
            console.log(resultUpdUser);

            if(resultUpdUser.status === 400){
                dispatch({
                    type: ALERT_EMAIL,
                    payload: {msg: resultUpdUser.errors.email[0], display: true}
                });
            }else{
                dispatch({
                    type: EDIT_USER,
                    payload: {user: resultUpdUser.user, rowIndex: rowIndex}
                });
            }

        } catch (error) {
            console.log(error);
        }
    }
    
    const deleteUser = async (id, data_index) => {

        const token = sessionStorage.getItem('token');

        try {
            
            const api_url = `${process.env.REACT_APP_SERVER_URL}/api/users/delete/${id}`;

            const responseDelUser = await fetch(api_url, { method: 'DELETE',
                                                        headers: {
                                                            'Authorization': `Bearer ${token}`,
                                                            'Content-Type': 'application/json'}});
            const resultDelUser = await responseDelUser.json();

            console.log(resultDelUser);

            dispatch({
                type: DEL_USER,
                payload: data_index
            });

        } catch (error) {
            console.log(error);
        }

    }

    const hideAlert = () => {
        dispatch({
            type: ALERT_EMAIL,
            payload: {msg: null, display: false}
        });
    }
    return (
        <userContext.Provider
            value={{
                users: state.users,
                alert: state.alert,
                getAllUsers: getAllUsers,
                deleteUser: deleteUser,
                createUser: createUser,
                editUser: editUser,
                hideAlert: hideAlert
            }}
        >
            {props.children}
        </userContext.Provider>
    );
}

export default UserState;