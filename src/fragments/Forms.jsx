import { EmailField, NumericField, OptionsSelector, PasswordField, StringField, TextArea } from '../components/FormComponents';
import { useState } from 'react';
import { ConfirmationButton } from '../components/Buttons';
import { Grid, Item } from '@mui/material';
import {Card, CardContent,Typography} from '@mui/material';
import { useReviews } from '../hooks/useReviews';

/**
 * Form for signing up
 * 
 * @param onSubmitForm function to execute for form submission
 * @param redirect function to execute after form submission - where the user has to be redirected
 */
const SignUpForm = ({onSubmitForm, redirect}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    return (
        <Grid container rowSpacing={2} columnSpacing={2}  justifyContent="center">
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

/**
 * Form for signing in
 * 
 * @param onSubmitForm function to execute for form submission
 * @param redirect function to execute after form submission - where the user has to be redirected
 */
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

/**
 * Form for publishing a review
 * 
 * @param header headline of the form giving info on what the user is filling
 * @param isReply says whether this form has to be a reply - meeaning that when it has to submit the form this information will be transmitted with the review id, which it is referring to
 * @param replyFromReviewId optional id of the review, which this review is being a reply to
 * @param onSubmitForm function to specify what to do when the form is submitted
 */
const ReviewForm = ({header, isReply, replyFromReviewId, onSubmitForm}) => {

    const [stars, setStars] = useState(1);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const setCheckStars = (val) => {
        if(+val < 1)
            setStars(1);
        else if (+val > 5)
            setStars(5);
        else
            setStars(val);
    }


    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {header}
                </Typography>
                <Grid container rowSpacing={2} columnSpacing={2}  justifyContent="center">
                    {
                        isReply ?  <></> :
                        <Grid item xs={6}>
                            <NumericField number={stars} 
                                setNumber={setCheckStars} 
                                title={"Stars ★★★★★"} 
                                inputProps={{ inputMode: 'numeric',  pattern: "d*",  min: 1, max: 5}}  
                                defaultValue = {1}
                            />
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

/**
 * Form for creating a new product
 * 
 * @param onSubmitForm function to specify what to do when the form is submitted
 */
const ProductForm = ({onSubmitForm}) => {

    const [type, setType] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [cost, setCost] = useState(1);

    const setCheckCost = (val) => {
        if(+val < 1)
            setCost(1);
        else
            setCost(val);
    }

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Create a Product
                </Typography>
                <Grid container rowSpacing={2} columnSpacing={2}  justifyContent="center">
                    <Grid item container xs={12} justifyContent="center">
                        <Grid item xs={6}>
                            <StringField string={name} setString={setName} title={"Name"}  />
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} justifyContent="center">
                        <Grid item xs={6}>
                            <NumericField number={cost} 
                                setNumber={setCheckCost} 
                                title={"Price (€)"} 
                                inputProps={{ inputMode: 'numeric',  pattern: "d*",  min: 1, max: 5}}  
                                defaultValue = {1}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={7}>
                        <ConfirmationButton title={"Add"} onClick={() => onSubmitForm({name, cost})} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

/**
 * Form for topping up the balance of the user
 * 
 * @param onSubmitForm function to specify what to do when the form is submitted
 */
const TopUpMoneyForm = ({onSubmitForm}) => {
    const [money, setMoney] = useState(1);

    const setCheckMoney = (val) => {
        if(+val < 1)
            setMoney(1);
        else
            setMoney(val);
    }

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Top Up Money
                </Typography>
                <Grid container rowSpacing={2} columnSpacing={2}  justifyContent="center">
                    <Grid item xs={12}>
                        <NumericField number={money} 
                            setNumber={setCheckMoney} 
                            title={"Amount (€)"} 
                            inputProps={{ inputMode: 'numeric',  pattern: "d*",  min: 1}}  
                            defaultValue = {1}
                        />
                    </Grid>
                    <Grid item xs={7}>
                        <ConfirmationButton title={"Top Up"} onClick={() => onSubmitForm({money})} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export {SignUpForm, SignInForm, ReviewForm, ProductForm, TopUpMoneyForm};