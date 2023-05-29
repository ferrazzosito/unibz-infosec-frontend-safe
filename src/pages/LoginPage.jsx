import { Grid } from "@mui/material";
import { SignInForm } from "../fragments/Forms";
import { Title } from "../components/Typography";
import { useNavigate } from "react-router";

const LoginPage = ({user, logUser}) => { 

    const navigate = useNavigate();

    const redirect = () => navigate("/");

    return(
        //cambia che sta a 12 ma cambia lo stile
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