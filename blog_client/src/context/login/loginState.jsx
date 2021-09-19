import React, { useReducer } from 'react';

import loginReducer from './loginReducer';
import loginContext from './loginContext';

import { LOGIN, LOGOUT, GET_AUTH_USER, SET_LOADING, INVALID_CRED } from '../../types';

const LoginState = props => {
    
    const initialState = {
        auth: false,
        current_user: null,
        loading: true,
        alert: {
            msg: '',
            display: false
        }
    }

    const [ state, dispatch ] = useReducer(loginReducer, initialState);

    const login = async (credenciales) => {
    
        try {
            
            const api_url = `${process.env.REACT_APP_SERVER_URL}/api/auth/login`;

            const responseLogin = await fetch(api_url, { method: 'POST',
                                                        headers: {'Content-Type': 'application/json'},
                                                        body: JSON.stringify(credenciales) });

            const resultLogin = await responseLogin.json();
         
            if(resultLogin?.status === 204 || resultLogin?.status === 401){

    
                dispatch({
                    type: INVALID_CRED,
                    payload: {msg: "Credenciales inválidas!", display: true}
                });

            }else{
               
                dispatch({
                    type: LOGIN,
                    payload: resultLogin
                });
            }

            
            
        } catch (error) {
            console.log(error);
        }
    }

    const logout = async () => {

        const token = sessionStorage.getItem('token');

        try {
            
            const api_url = `${process.env.REACT_APP_SERVER_URL}/api/auth/logout`;

            const responseLogout = await fetch(api_url, { method: 'GET',
                                                        headers: {
                                                            'Authorization': `Bearer ${token}`,
                                                            'Content-Type': 'application/json'}});
            const resultLogout = await responseLogout.json();

            if(resultLogout.status === 200){
                dispatch({
                    type: LOGOUT
                });
            }

        } catch (error) {
            console.log(error);
        }

    }

    const getAuthUser = async () => {

        const token = sessionStorage.getItem('token');

        if(token){

            try {

                const api_url = `${process.env.REACT_APP_SERVER_URL}/api/auth/me`;

            
                const responseAuthUser = await fetch(api_url, { method: 'GET',
                                                                headers: {
                                                                    'Authorization': `Bearer ${token}`,
                                                                    'Content-Type': 'application/json'}});
                const resultAuthUser = await responseAuthUser.json();

                console.log(resultAuthUser);
            
                dispatch({
                    type: GET_AUTH_USER,
                    payload: resultAuthUser
                });
                
            } catch (error) {
                console.log(error)
            }
            
        }else{
            dispatch({
                type: SET_LOADING
            });
        }
        


    }

    const resetAlert = () => {


        dispatch({
            type: INVALID_CRED,
            payload: {msg: "", display: false}
        });

    }
    
    return (
        <loginContext.Provider
            value={{
                auth: state.auth,
                current_user: state.current_user,
                loading: state.loading,
                alert: state.alert,
                login: login,
                logout: logout,
                getAuthUser: getAuthUser,
                resetAlert: resetAlert
            }}
        >
            {props.children}
        </loginContext.Provider>
    );
}

export default LoginState;