import { useUser } from "../hooks/useUser";
import { Navigate } from "react-router";
import AuthConsumer from "../hooks/useUser";


export default function RequireAuth({ children }) {
   
    const {user, logUser, registerUser, logout} = AuthConsumer();    

    // console.log(JSON.stringify(user))
    // console.log(JSON.stringify(user && user.accessToken))
  
    return (user && user.accessToken) ? children : <Navigate to="/login" replace />;
  }