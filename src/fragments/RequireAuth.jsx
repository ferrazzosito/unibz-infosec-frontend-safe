import { useUser } from "../hooks/useUser";
import { Navigate } from "react-router";
import AuthConsumer from "../hooks/useUser";
import { useEffect } from "react";
import { useContext } from "react";
import { authContext } from "../hooks/useUser";


export default function RequireAuth({ children }) {
   
    const {user, logUser, registerUser, logout, reload} = useContext(authContext);    
    
    // reload();

    // useEffect( () => {
    //     console.log(user)
    //     // console.log(JSON.stringify(user && user.accessToken))  
    // }, [])

    // console.log(JSON.stringify(user))
    // console.log(JSON.stringify(user && user.accessToken))
  
    return (user && user.accessToken) ? children : <Navigate to="/login" replace />;
  }