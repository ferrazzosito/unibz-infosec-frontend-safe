import { Button } from "@mui/material"

const ConfirmationButton = ({title, onClick}) => (
    <Button 
        variant="contained"
        onClick={onClick}
        fullWidth
    >{title}</Button>
)

const BuyButton = ({alreadyOwned}) => (
    <>
        {
            alreadyOwned ?
            <Button size="medium" variant="outlined" color="secondary" disabled>Already Owned</Button>
            :
            <Button size="medium" variant="contained">Buy Now</Button>
        }
    </>
)

const DeleteButton = () => (<Button size="medium" variant="contained" color="error">Delete</Button>)

export {ConfirmationButton, BuyButton, DeleteButton};