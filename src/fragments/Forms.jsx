import { EmailField, NumericField, OptionsSelector, PasswordField, StringField, TextArea } from '../components/FormComponents';
import { useState } from 'react';
import { ConfirmationButton } from '../components/Buttons';
import { Grid, Item } from '@mui/material';
import {Card, CardContent,Typography} from '@mui/material';
import { useReviews } from '../hooks/useReviews';

const SignUpForm = ({onSubmitForm, redirect}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    // const [name, setName] = useState("");
    // const [lastName, setLastName] = useState("");

    return (
        <Grid container rowSpacing={2} columnSpacing={2}  justifyContent="center">
            {/* <Grid item xs={6}>
                <StringField string={name} setString={setName} title={"Name"} />
            </Grid>
            <Grid item xs={6}>
               <StringField string={lastName} setString={setLastName} title={"Last Name"} />
            </Grid> */}
            <Grid item xs={12}>
                <EmailField email = {email} setEmail={setEmail}/>
            </Grid>
            <Grid item xs={12}>
                <OptionsSelector fieldTitle={"Account Type"} 
                        options = {["customer", "vendor"]}
                        selectedOption = {role}
                        setSelectedOption={setRole} />
            </Grid>
            <Grid item xs={12}>
                <PasswordField password = {password} setPassword={setPassword}/>
            </Grid>
            <Grid item xs={7}>
                <ConfirmationButton title={"Sign Up"} onClick={() => {
                    console.log(role)
                    onSubmitForm({email, role, password})   
                    .then(response => redirect())
                    }} 
                />
            </Grid>
        </Grid>
    )
}

const SignInForm = ({onSubmitForm, redirect}) => {

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
                <ConfirmationButton title={"Sign In"} onClick={() => { 
                    onSubmitForm(email, password)
                    .then( (user) => redirect(user.payload.role))
                }} />
            </Grid>
        </Grid>
    )
}

const ReviewForm = ({header, isReply, replyFromReviewId, onSubmitForm}) => {

    const [stars, setStars] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {header}
                </Typography>
                <Grid container rowSpacing={2} columnSpacing={2}  justifyContent="center">
                    {
                        isReply ?  <></> :
                        <Grid item xs={12}>
                            <StringField string={stars} setString={setStars} title={"Stars"}  />
                        </Grid>
                    }
                    <Grid item xs={12}>
                        <StringField string={title} setString={setTitle} title={"Title"}  />
                    </Grid>
                    <Grid item xs={12}>
                        <TextArea text={description} setText={setDescription} placeholder={"Insert the description of your review.."}  />
                    </Grid>
                    <Grid item xs={7}>
                        <ConfirmationButton title={"Publish"} onClick={() => onSubmitForm({title, description, stars, replyFromReviewId})} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )

}

const ProductForm = ({onSubmitForm}) => {

    const [type, setType] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [cost, setCost] = useState(0);

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Create a Product
                </Typography>
                <Grid container rowSpacing={2} columnSpacing={2}  justifyContent="center">
                    {/* <Grid item xs={6}>
                        <StringField string={type} setString={setType} title={"Type"}  />
                    </Grid> */}
                    <Grid item xs={12}>
                        <StringField string={name} setString={setName} title={"Name"}  />
                    </Grid>
                    <Grid item xs={12}>
                        <StringField string={cost} setString={(e) => setCost(+e)} title= "Price" />
                    </Grid>
                    {/* <Grid item xs={12}>
                        <TextArea text={description} setText={setDescription} placeholder={"Insert the description of your product.."}  />
                    </Grid> */}
                    <Grid item xs={7}>
                        <ConfirmationButton title={"Add"} onClick={() => onSubmitForm({name, cost})} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export {SignUpForm, SignInForm, ReviewForm, ProductForm};