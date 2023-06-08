import { useUser } from "../hooks/useUser";
import { Navigate } from "react-router";
import AuthConsumer from "../hooks/useUser";
import { useEffect } from "react";
import { useContext } from "react";
import { authContext } from "../hooks/useUser";

const authRequire = (user) => {
    return user && user.accessToken;
}

/**
 * This component ensures the user is authenticated. If this is the case, the component wrapped in RequireAuth is shown 
 * to them, otherwise they get redirected to /login page
 */
export default function RequireAuth({ children }) {
   
    const {user, logUser, registerUser, logout, reload} = useContext(authContext);    
  
    return authRequire(user) ? children : <Navigate to="/login" replace />;
}

/**
 * This component ensures the user is authenticated as a customer. If this is the case, the component wrapped 
 * in RequireCustomerAuth is shown to them, otherwise they get redirected to /login page
 */
export function RequireCustomerAuth({ children }) {
   
    const {user, logUser, registerUser, logout, reload} = useContext(authContext);    
  
    return (authRequire(user)) ? ((user.payload.role === "customer") ? children : <Navigate to="/selling" replace /> ) : <Navigate to="/login" replace />;
}

/**
 * This component ensures the user is authenticated as a vendor. If this is the case, the component wrapped 
 * in RequireVendorAuth is shown to them, otherwise they get redirected to /login page
 */
export function RequireVendorAuth({ children }) {
   
    const {user, logUser, registerUser, logout, reload} = useContext(authContext);    
    
    return (authRequire(user)) ? ((user.payload.role === "vendor") ? children : <Navigate to="/" replace /> ) : <Navigate to="/login" replace />;
}