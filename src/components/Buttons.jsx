import { Button } from "@mui/material"

const ConfirmationButton = ({title, onClick}) => (
    <Button 
        variant="contained"
        onClick={onClick}
        fullWidth
    >{title}</Button>
)

export {ConfirmationButton};