
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { useState } from "react";
import { TextareaAutosize } from '@mui/base';
import InputAdornment from '@mui/material/InputAdornment';
import Search from '@mui/icons-material/Search'; 

const StringField = ({string, setString, title}) => (
    <TextField 
        fullWidth
        variant="outlined"
        label={title} 
        onChange={(e) => setString(e.target.value)}
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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
            error={!isValidPassword(password)} 
            type="password"
        />
    );
}

const TextArea = ({text, setText, placeholder}) => {

    //TODO: validation

    return (
        <TextareaAutosize
        onChange={(e) => setText(e.target.value)}
            placeholder={placeholder}
            style={{minWidth: "100%",minHeight: "10%"}}
        />
    )

}

const NumericField = ({number, setNumber, title, inputProps}) => {

    const isFieldValid = (fieldVal) => (fieldVal !== '' && !isNaN(fieldVal) && fieldVal !== null)

    return (
        <TextField id="filled-basic" 
            onChange = {(val) => setNumber(+val.target.value)} 
            label={title}
            variant="outlined" 
            type="number" 
            value={number}
            error = { !isFieldValid(number) }
            InputLabelProps={{ shrink: true }} 
            inputProps={inputProps}
            fullWidth
        />

    )

}

const SearchField =  ({query, setQuery}) => {

    return (
        <TextField
            id="input-with-icon-textfield"
            label="Search"
            InputProps={{
            startAdornment: (
                    <InputAdornment position="end">
                        <Search />
                    </InputAdornment>
                ),
            }}
            onChange={(e) => setQuery(e.target.value)}
            style={{width: "100%"}}
            variant="standard"
        />
    )
}

const OptionsSelector = ({fieldTitle, options, selectedOption, setSelectedOption}) => {
    const isFieldValid = (fieldVal) => (fieldVal !== undefined && fieldVal !== null && fieldVal !== "");
    
    return (
        <FormControl fullWidth error = { !isFieldValid(selectedOption)}>
            <InputLabel>{fieldTitle}</InputLabel>
            <Select
                id="options-selector"
                variant="outlined"
                value={selectedOption}
                label={fieldTitle}
                onChange={(e) => setSelectedOption(e.target.value)}
            >
                {
                    options.map(option => 
                        <MenuItem value={option}>{option}</MenuItem>
                    )
                }
            </Select>
        </FormControl>
    )
}

export {EmailField, PasswordField, StringField, TextArea, NumericField, SearchField, OptionsSelector};