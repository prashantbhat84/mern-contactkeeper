import React ,{useReducer} from 'react';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import {REGISTER_SUCCESS,
REGISTER_FAIL,
LOGIN_SUCCESS,
LOGIN_FAIL,
USER_LOADED,
AUTH_ERROR,
CLEAR_ERRORS,
LOGOUT
} from '../types';

const AuthState=(props)=>{


    const initialstate={
        token:localStorage.getItem('token'),
        isAuthenticated:null,
        loading:true,
        error:null,
        user:null
    }
    const [state,dispatch]= useReducer(AuthReducer,initialstate);

    //Load User- check which user is logged in

    //Register User

    //Login User

    //Logout

    //Clear Errors
    


return (<AuthContext.Provider value={
    {
        token:state.token,
        isAuthenticated:state.isAuthenticated,
        loading:state.loading,
        error:state.error,
        user:state.user,

    }
}>{props.children}</AuthContext.Provider>);
}
export default AuthState;

