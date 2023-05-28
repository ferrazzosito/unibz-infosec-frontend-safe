import { Grid } from "@mui/material";
import { SignUpForm } from "../fragments/Forms";
import { Title } from "../components/Typography";
import useUser from "../hooks/useUser";

const RegistrationPage = () => { 
    
    const [user, logUser, registerUser] = useUser();

    return(
        <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={8}>
                <Title text="Sign Up" />
                <SignUpForm onSubmitForm = {registerUser} />
                <span>Already have an account? Sign In!</span>
            </Grid>
        </Grid>
    )

}

export default RegistrationPage;