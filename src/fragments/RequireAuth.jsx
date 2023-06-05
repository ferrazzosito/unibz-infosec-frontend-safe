import { useUser } from "../hooks/useUser";
import { Navigate } from "react-router";
import AuthConsumer from "../hooks/useUser";
import { useEffect } from "react";
import { useContext } from "react";
import { authContext } from "../hooks/useUser";

const authRequire = (user) => {
    return user && user.accessToken;
}


export default function RequireAuth({ children }) {
   
    const {user, logUser, registerUser, logout, reload} = useContext(authContext);    
  
    return authRequire(user) ? children : <Navigate to="/login" replace />;
}

export function RequireCustomerAuth({ children }) {
   
    const {user, logUser, registerUser, logout, reload} = useContext(authContext);    
  
    return (authRequire(user)) ? ((user.payload.role === "customer") ? children : <Navigate to="/selling" replace /> ) : <Navigate to="/login" replace />;
}

export function RequireVendorAuth({ children }) {
   
    const {user, logUser, registerUser, logout, reload} = useContext(authContext);    
    
    return (authRequire(user)) ? ((user.payload.role === "vendor") ? children : <Navigate to="/" replace /> ) : <Navigate to="/login" replace />;
}