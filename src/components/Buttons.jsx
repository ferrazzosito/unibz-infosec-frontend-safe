import { Button } from "@mui/material"

const ConfirmationButton = ({title, onClick}) => (
    <Button 
        variant="contained"
        onClick={onClick}
        fullWidth
    >{title}</Button>
)

const BuyButton = ({alreadyOwned, buyFunction}) => (
    <>
        {
            alreadyOwned ?
            <Button size="medium" variant="outlined" color="secondary" disabled>Already Owned</Button>
            :
            <Button size="medium" variant="contained" onClick={buyFunction}>Buy Now</Button>
        }
    </>
)

const DeleteButton = ({onClick}) => (<Button size="medium" variant="contained" color="error" onClick={onClick}>Delete</Button>)

export {ConfirmationButton, BuyButton, DeleteButton};