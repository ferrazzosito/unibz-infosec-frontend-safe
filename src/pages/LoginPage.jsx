import { Grid } from "@mui/material";
import { SignInForm } from "../fragments/Forms";
import { Title } from "../components/Typography";

const LoginPage = () => { 

    return(
        //cambia che sta a 12 ma cambia lo stile
        <Grid container justifyContent="center" >
            <Grid item xs={8}>
                <Title text="Log in" />
                <SignInForm />
                <span>New Here? Sign up as a vendor or sign up as a client</span>
            </Grid>
        </Grid>
    )

}

export default LoginPage;