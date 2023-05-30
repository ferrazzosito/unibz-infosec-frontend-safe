import { Grid } from "@mui/material";
import { SignUpForm } from "../fragments/Forms";
import { Title } from "../components/Typography";
import { useNavigate } from "react-router";
import { useUser } from "../hooks/useUser";

const RegistrationPage = () => { 
    
    const navigate = useNavigate();

    const redirect = () => navigate("/login");

    const {user, logUser, registerUser, logout} = useUser();

    return(
        <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={8}>
                <Title text="Sign Up" />
                <SignUpForm onSubmitForm = {registerUser} redirect = {redirect} />
                <span>Already have an account? &nbsp;
                    <span 
                        style={{textDecorationLine : "underline", cursor: "pointer"}} 
                        onClick={() => navigate("/login")}
                    > 
                         Sign In!
                    </span> 
                </span>
            </Grid>
        </Grid>
    )

}

export default RegistrationPage;