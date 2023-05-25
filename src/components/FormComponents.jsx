
import { TextField } from "@mui/material"
import { useState } from "react";
import { TextareaAutosize } from '@mui/base';

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

const TextArea = ({text, setText, placeholder}) => {

    //TODO: validation

    return (
        <TextareaAutosize
            onChange={setText}
            placeholder={placeholder}
            style={{minWidth: "100%",minHeight: "10%"}}
        />
    )

}

const NumericField = ({number, setNumber, title}) => {

    const isFieldValid = (fieldVal) => (fieldVal !== '' && !isNaN(fieldVal) && fieldVal !== null)

    return (
        <TextField
            id="numeric-field"
            label={title}
            variant="outlined"
            onChange={setNumber}
            error = { !isFieldValid(number) }
            fullWidth
            
        />
    )
}

export {EmailField, PasswordField, StringField, TextArea, NumericField};