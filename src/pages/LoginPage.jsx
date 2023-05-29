import { Grid } from "@mui/material";
import { SignInForm } from "../fragments/Forms";
import { Title } from "../components/Typography";
import useUser from "../hooks/useUser";

const LoginPage = () => { 

    const [user, logUser] = useUser();

    return(
        //cambia che sta a 12 ma cambia lo stile
        <Grid container justifyContent="center" >
            <Grid item xs={8}>
                <Title text="Log in" />
                <SignInForm onSubmitForm = {logUser}/>
                <span>New Here? Sign up as a vendor or sign up as a client</span>
            </Grid>
        </Grid>
    )

}

export default LoginPage;