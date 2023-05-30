import { Grid } from "@mui/material";
import { SignInForm } from "../fragments/Forms";
import { Title } from "../components/Typography";
import { useNavigate } from "react-router";
import { useUser } from "../hooks/useUser";
import { useContext, useEffect } from "react";
import AuthConsumer from "../hooks/useUser";

const LoginPage = () => { 

    const navigate = useNavigate();

    const redirect = () => navigate("/");

    const {user, logUser, registerUser, logout} = AuthConsumer();    

    useEffect( () => {
        console.log(JSON.stringify(user))
        console.log(JSON.stringify(user && user.accessToken))
  
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