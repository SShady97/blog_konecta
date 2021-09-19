import React, { useReducer } from 'react';

import adminReducer from './adminReducer';
import adminContext from './adminContext';

import { ALL_USERS } from '../../types';

const AdminState = props => {
    
    const initialState = {
        users: []
    }

    const [ state, dispatch ] = useReducer(userReducer, initialState);

    const getAllUsers = async (table) => {

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
    
    return (
        <userContext.Provider
            value={{
                users: state.users,
                getAllUsers: getAllUsers
            }}
        >
            {props.children}
        </userContext.Provider>
    );
}

export default UserState;