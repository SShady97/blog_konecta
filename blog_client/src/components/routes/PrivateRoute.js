import React, { useContext, useEffect } from 'react'

import { Route, Redirect } from 'react-router-dom';
import loginContext from '../../context/login/loginContext';

const PrivateRoute = ({ name, component: Component, ...props }) => {
    
    const logContext = useContext(loginContext);
    
    const { auth, loading, getAuthUser, current_user } = logContext;

    useEffect(() => {
        getAuthUser();
    }, []);

    return (
        
        <Route { ...props } render={ props => !auth && !loading ? (
                <Redirect to="/login" />
            ) : current_user 
                
                ?
                    current_user.admin 

                    ?

                        (<Component { ...props } />)

                    : name === 'admin'
                        ?
                            <Redirect to="/" />
                        :
                            (<Component { ...props } />)
                    
                :
                    null
            }
        />
    );
}

export default PrivateRoute;