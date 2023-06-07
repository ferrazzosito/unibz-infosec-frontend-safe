
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { BuyButton, ConfirmationButton, DeleteButton } from '../components/Buttons';
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { authContext } from '../hooks/useUser';

const ContentProductCard = ({type, name, price, vendorName, vendorId, description, isVendor = false}) => {
    
    const navigate = useNavigate();
    const redirectVendorPage = () => navigate(`/vendor?id=${vendorId}`);

    return(
    <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {type}
        </Typography>
        <Typography variant="h5" component="div">
            {name}
        </Typography>
        <Typography variant="h5" sx={{ mb: 1.5 }} color="text.secondary">
            {price} €
        </Typography>
        {
            isVendor ? 
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    by vendor {vendorName}
                </Typography>
            :
            <span onClick = {() => redirectVendorPage()} style={{textDecorationLine : "underline", cursor: "pointer"}}>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    by vendor {vendorName}
                </Typography>
            </span>
        }
        <Typography variant="body2">
            {description}
        <br />
        </Typography>
    </CardContent>
)}

const UnsafeContentProductCard = ({type, name, price, vendorName, vendorId, description}) => {
    
    const navigate = useNavigate();
    const redirectVendorPage = () => navigate(`/vendor?id=${vendorId}`);
    return (
    <CardContent>
        <div color="text.secondary" gutterBottom dangerouslySetInnerHTML={{__html: type}}/>
        <div dangerouslySetInnerHTML={{__html: name}}/>
        <div sx={{ mb: 1.5 }} color="text.secondary" dangerouslySetInnerHTML={{__html: price + " €"}}/>
        <div sx={{ mb: 1.5 }} color="text.secondary" onClick = {() => redirectVendorPage()} style={{textDecorationLine : "underline", cursor: "pointer"}} >
            by vendor {vendorName}
        </div>
        <div variant="body2" dangerouslySetInnerHTML={{__html: description}}/>
        <br />
    </CardContent>)
}
const BasicProductCard = ({type, name, price, vendorId, description}) => {
    // <ContentProductCard type={type} name = {name} price ={price} description={description }/>
    
    const {findUser} = useContext(authContext);    
    
    const [vendor, setVendor] = React.useState({});
    
    // findUser(vendorId)
    // .then(response => setVendor(response));

    React.useEffect(
        () => {
            findUser(vendorId)
            .then(resp => setVendor(resp))
            .catch((e) => {console.log(e); setVendor({})});
        }, [vendorId]
    )

    return (
        <Card sx={{ minWidth: 275 }}>
            <ContentProductCard type={type} 
                name = {name} 
                price ={price} 
                vendorName={vendor.email}  
                vendorId={vendorId} 
                description={description } 
                isVendor={vendor.role === "VENDOR"}/>
        </Card>
    )

}

const BuyerProductCard = ({id, type, name, price, vendorId, description, buyFunction}) => {

    const navigate = useNavigate();
    const redirect = () => navigate(`/product?id=${id}`);
    const {findUser} = useContext(authContext);    
    
    const [vendor, setVendor] = React.useState({});
    
    // findUser(vendorId)
    // .then(response => setVendor(response));

    React.useEffect(
        () => {
            findUser(vendorId)
            .then(resp => setVendor(resp))
            .catch((e) => {console.log(e); setVendor({})});
        }, []
    )


    // setVendor(getVendorDetails());
        // <ContentProductCard type={type} name = {name} price ={price} description={description }/>
    return (
        <Card sx={{ minWidth: 275 }}>
            <UnsafeContentProductCard type={type} name = {name} price ={price} vendorName={vendor.email} vendorId = {vendorId} description={description }/>
            <CardActions>
                <div style={{margin: "auto"}}>
                    <Button size="small" style={{marginRight: 10}} onClick={() => redirect()}>See Reviews</Button>
                    <BuyButton alreadyOwned={false}  buyFunction={buyFunction} />
                </div>
            </CardActions>
        </Card>
    )

}

const VendorProductCard = ({id, type, name, price,vendorName, description, deleteFunction}) => {

    const navigate = useNavigate();
    const redirect = () => navigate(`/product?id=${id}`);

    return (
        <Card sx={{ minWidth: 275 }}>
            <ContentProductCard type={type} name = {name} price ={price} vendorName={vendorName} description={description } isVendor={true} />
            <CardActions >
                <div style={{margin: "auto"}}>
                    <Button size="small" style={{marginRight: 10}} onClick={() => redirect()}>See Reviews</Button>
                    <DeleteButton onClick={() => deleteFunction(id)}/>
                </div>
            </CardActions>
        </Card>
    )
}

const ReviewCard = ({rating, title, description, writer, answer}) => {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <div style= {{fontSize: 14}} dangerouslySetInnerHTML={{__html: rating}}/>
                <div style= {{fontSize: 19, fontWeight: "bold" }} dangerouslySetInnerHTML={{__html: title}}/>
                
                <div style= {{fontSize: 14}} dangerouslySetInnerHTML={{__html: "Written by " + writer}}/>
                <div style= {{fontSize: 14}} dangerouslySetInnerHTML={{__html: description}}/>
                {/* {answer ? <div style={{marginTop: 10}}> */}
                    {answer}
                    {/* <div/> : <></>} */}
            </CardContent>
        </Card>
    )
}

const OrderCard = ({basicProductCard, buyer, date, role, approved, idProd, idOrder, approveOrderFunction}) => {

    const navigate = useNavigate();
    const reviewRedirect = () => navigate(`/product?id=${idProd}`);

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                {
                    role === "customer" ?
                        (approved === true ?
                        <Typography sx={{ mb: 1.5 }} color="green"> Approved by vendor </Typography>    
                        :            
                        <Typography sx={{ mb: 1.5 }} color="red"> Not yet approved by vendor </Typography>)
                    :
                        (approved === true ? 
                        <Typography sx={{ mb: 1.5 }} color="green"> Already Approved </Typography> 
                        :
                        <ConfirmationButton title="Approve Order" onClick= {() => approveOrderFunction(idOrder)} />
                        )

                }
                {basicProductCard}
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    bought by {buyer} 
                    {/* on {date} */}
                </Typography>
                <div style={{margin: "auto"}}>
                    <Button size="small" style={{marginRight: 10}} onClick={() => reviewRedirect()}>See Reviews</Button>
                </div>
            </CardContent>
        </Card>
    )
}


const BalanceCard = ({amount}) => {

    return (
        <Typography variant="h4"  gutterBottom>
            Your Current Balance: {amount} €
        </Typography>
    )

}

const ChatRequestCard = ({customerId, chatId, openChat}) => {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    {customerId}
                </Typography>
                <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
                    {chatId}
                </Typography>
                <div style={{margin: "auto"}}>
                    <Button size="small" style={{marginRight: 10}} onClick={openChat}>Open chat</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export {BasicProductCard, ReviewCard, BuyerProductCard, VendorProductCard, OrderCard, BalanceCard, ChatRequestCard}