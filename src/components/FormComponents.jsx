
import { TextField } from "@mui/material"
import { useState } from "react";

const StringField = ({string, setString, title}) => (
    <TextField 
        fullWidth
        variant="outlined"
        label={title} 
        onChange={setString}
        error={string == ""} 
    />
)

const EmailField = ({email, setEmail}) => {

    //TODO: check why isnt working
    const isValidEmail = (em) => (em !== "" && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(em)));
    
    return (
        <TextField 
            fullWidth
            variant="outlined"
            label="Email" 
            onChange={setEmail}
            error={!isValidEmail(email)} 
        />
    );
}

const PasswordField = ({password, setPassword}) => {

    //TODO: add regex for the pw
    const isValidPassword = (pw) => (pw !== "");

    return (
        <TextField 
            fullWidth
            variant="outlined"
            label="Password" 
            onChange={setPassword}
            error={!isValidPassword(password)} 
            type="password"
        />
    );
}

export {EmailField, PasswordField, StringField};