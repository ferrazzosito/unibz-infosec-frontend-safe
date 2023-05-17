import { EmailField, PasswordField, StringField } from '../components/FormComponents';
import { useState } from 'react';
import { ConfirmationButton } from '../components/Buttons';
import { Grid, Item } from '@mui/material';

const SignUpForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");

    return (
        <Grid container rowSpacing={2} columnSpacing={2}  justifyContent="center">
            <Grid item xs={6}>
                <StringField string={name} setString={setName} title={"Name"} />
            </Grid>
            <Grid item xs={6}>
               <StringField string={lastName} setString={setLastName} title={"Last Name"} />
            </Grid>
            <Grid item xs={12}>
                <EmailField email = {email} setEmail={setEmail}/>
            </Grid>
            <Grid item xs={12}>
                <PasswordField password = {password} setPassword={setPassword}/>
            </Grid>
            <Grid item xs={7}>
                <ConfirmationButton title={"Sign Up"} onClick={() => {}} />
            </Grid>
        </Grid>
    )
}

const SignInForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Grid container rowSpacing={2} columnSpacing={2}  justifyContent="center">
            <Grid item xs={12}>
                <EmailField email = {email} setEmail={setEmail}/>
            </Grid>
            <Grid item xs={12}>
                <PasswordField password = {password} setPassword={setPassword}/>
            </Grid>
            <Grid item xs={7}>
                <ConfirmationButton title={"Sign In"} onClick={() => {}} />
            </Grid>
        </Grid>
    )
}

export {SignUpForm, SignInForm};