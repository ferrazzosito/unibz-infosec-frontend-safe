
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function useAuthentication (user) {

    const navigate = useNavigate();

    useEffect(() => 
        {
            if(!user || !user.accessToken){
                navigate('/login')
                // console.log(JSON.stringify(user))
                }
        }
    , []);
}
