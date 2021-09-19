import React from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home/Home";
import Admin from "./components/Admin/Admin";
import ItemInfo from "./components/Home/ItemInfo";
import LoginState from './context/login/loginState';
import UserState from "./context/user/userState";
import CategoryState from "./context/category/categoryState";
import ItemState from "./context/item/itemState";
import PrivateRoute from "./components/routes/PrivateRoute";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

function App() {

    return (
        
        <ItemState>
        <CategoryState>
        <UserState>
        <LoginState>
            <Router>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <PrivateRoute exact path="/" component={Home} name='home' />
                    <PrivateRoute exact path="/admin" component={Admin} name='admin' />
                    <PrivateRoute path="/item/:slug" component={ItemInfo} name='info' />
                </Switch>
            </Router>
        </LoginState>
        </UserState>
        </CategoryState>
        </ItemState>
    );
}

export default App;
