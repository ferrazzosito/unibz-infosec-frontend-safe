import { Grid } from "@mui/material";
import { SignInForm } from "../fragments/Forms";
import { Title } from "../components/Typography";
import { useNavigate } from "react-router";
import { authContext, useUser } from "../hooks/useUser";
import { useContext, useEffect } from "react";

const LoginPage = () => { 

    const navigate = useNavigate();

    const redirect = (role) => role === "customer" ? navigate("/") : (role === "vendor" ? navigate("/selling") : navigate("/login"));

    const {user, logUser, registerUser, logout} = useContext(authContext);   
    
    // reload();

    useEffect( () => {
        
        if(user && user.accessToken)
            redirect(user.payload.role);
        
    }, [])

    //cambia che sta a 12 ma cambia lo stile
    return(
        <Grid container justifyContent="center" >
            <Grid item xs={8}>
                <Title text="Log in" />
                <SignInForm onSubmitForm = {logUser} redirect = {redirect} />
                <span>New Here? &nbsp;
                    <span 
                        style={{textDecorationLine : "underline", cursor: "pointer"}} 
                        onClick={() => navigate("/sign-up")}
                    > 
                        Sign up as a vendor or sign up as a client
                    </span> 
                </span>
            </Grid>
        </Grid>
    )

}

export default LoginPage;