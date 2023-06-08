
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

// const ContentProductCard = ({type, name, price, vendorName, vendorId, description, isVendor = false}) => {
    
//     const navigate = useNavigate();
//     const redirectVendorPage = () => navigate(`/vendor?id=${vendorId}`);

//     return(
//     <CardContent>
//         <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//             {type}
//         </Typography>
//         <Typography variant="h5" component="div">
//             {name}
//         </Typography>
//         <Typography variant="h5" sx={{ mb: 1.5 }} color="text.secondary">
//             {price} €
//         </Typography>
//         {
//             isVendor ? 
//                 <Typography sx={{ mb: 1.5 }} color="text.secondary">
//                     by vendor {vendorName}
//                 </Typography>
//             :
//             <span onClick = {() => redirectVendorPage()} style={{textDecorationLine : "underline", cursor: "pointer"}}>
//                 <Typography sx={{ mb: 1.5 }} color="text.secondary">
//                     by vendor {vendorName}
//                 </Typography>
//             </span>
//         }
//         <Typography variant="body2">
//             {description}
//         <br />
//         </Typography>
//     </CardContent>
// )}

/**
 * Component that represents the content of the product card.
 * React has a built-in XSS sanification so we call unsafe those components in which we use special React functions to avoid its built-in sanification
 * and to show that even being unsafe, the sanification is done in backend, as we did in the lab
 * 
 * @param type is the type of the product
 * @param name name of the product
 * @param price price of the product
 * @param vendorName email/name shown of the seller
 * @param vendorId id of the seller
 * @param description description of the product
 * @param isVendor says whether the product card has to be seen by a vendor
 */
const UnsafeContentProductCard = ({type, name, price, vendorName, vendorId, description, isVendor = false}) => {
    
    const navigate = useNavigate();
    const redirectVendorPage = () => navigate(`/vendor?id=${vendorId}`);
    return (
    <CardContent>
        <div color="text.secondary" gutterBottom dangerouslySetInnerHTML={{__html: type}}/>
        <div dangerouslySetInnerHTML={{__html: name}}/>
        <div sx={{ mb: 1.5 }} color="text.secondary" dangerouslySetInnerHTML={{__html: price + " €"}}/>
        {
            isVendor ? 
                <div sx={{ mb: 1.5 }} color="text.secondary" >
                    by vendor {vendorName}
                </div>
            :
                <div sx={{ mb: 1.5 }} color="text.secondary" onClick = {() => redirectVendorPage()} style={{textDecorationLine : "underline", cursor: "pointer"}} >
                    by vendor {vendorName}
                </div>
        }
        
        <div variant="body2" dangerouslySetInnerHTML={{__html: description}}/>
        <br />
    </CardContent>)
}

/**
 * Component that represents a product in its simplest form.
 * 
 * @param type is the type of the product
 * @param name name of the product
 * @param price price of the product
 * @param vendorId id of the seller
 * @param description description of the product
 */
const BasicProductCard = ({type, name, price, vendorId, description}) => {
    
    const {findUser} = useContext(authContext);    
    
    const [vendor, setVendor] = React.useState({});
    

    React.useEffect(
        () => {
            findUser(vendorId)
            .then(resp => setVendor(resp))
            .catch((e) => {console.log(e); setVendor({})});
        }, [vendorId]
    )

    return (
        <Card sx={{ minWidth: 275 }}>
            <UnsafeContentProductCard type={type} 
                name = {name} 
                price ={price} 
                vendorName={vendor.email}  
                vendorId={vendorId} 
                description={description } 
                isVendor={vendor.role === "VENDOR"}/>
        </Card>
    )

}

/**
 * Component that represents the buyable product card, with the possibility to see the reviews.
 * 
 * @param id id of the product
 * @param type is the type of the product
 * @param name name of the product
 * @param price price of the product
 * @param vendorId id of the seller
 * @param description description of the product
 * @param buyFunction function to be able to buy the product
 */
const BuyerProductCard = ({id, type, name, price, vendorId, description, buyFunction}) => {

    const navigate = useNavigate();
    const redirect = () => navigate(`/product?id=${id}`);
    const {findUser} = useContext(authContext);    
    
    const [vendor, setVendor] = React.useState({});

    React.useEffect(
        () => {
            findUser(vendorId)
            .then(resp => setVendor(resp))
            .catch((e) => {console.log(e); setVendor({})});
        }, []
    )

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

/**
 * Component that represents the product card from the perspective of the seller.
 * 
 * @param id id of the product
 * @param type is the type of the product
 * @param name name of the product
 * @param price price of the product
 * @param vendorId id of the seller
 * @param vendorName email/name shown of the seller
 * @param description description of the product
 * @param deleteFunction function to be able to delete the product
 */
const VendorProductCard = ({id, type, name, price,vendorName, description, deleteFunction}) => {

    const navigate = useNavigate();
    const redirect = () => navigate(`/product?id=${id}`);

    return (
        <Card sx={{ minWidth: 275 }}>
            <UnsafeContentProductCard type={type} name = {name} price ={price} vendorName={vendorName} description={description } isVendor={true} />
            <CardActions >
                <div style={{margin: "auto"}}>
                    <Button size="small" style={{marginRight: 10}} onClick={() => redirect()}>See Reviews</Button>
                    <DeleteButton onClick={() => deleteFunction(id)}/>
                </div>
            </CardActions>
        </Card>
    )
}

/**
 * Component that represents the review of a produt
 * 
 * @param rating rating of that product
 * @param title title of the review
 * @param description description of the review
 * @param writer name/email shown of the author of the review
 * @param answer review component representing the reply to this review
 */
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

/**
 * Component that represents the order card 
 * 
 * @param basicProductCard component of the product card, which the order is referring to
 * @param buyer name/email shown of the buyer
 * @param role role of the viewer of the card
 * @param approved says whether the order has been approved by the seller
 * @param idProd id of the product, which the order is referring to
 * @param idOrder id of the order itself
 * @param approveOrderFunction function that allows the vendor to approve the order
 */
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

/**
 * Component that represents balance of the user
 * 
 * @param amount amount of money the user has
 */
const BalanceCard = ({amount}) => {

    return (
        <Typography variant="h4"  gutterBottom>
            Your Current Balance: {amount} €
        </Typography>
    )

}

/**
 * Component that represents the chat request from the perspective of the vendor
 * 
 * @param customerId id of the customer who requested the chat
 * @param chatId id of the chat, generated at the request
 * @param openChat function to open the chat
 * @param disabled indicates whether the button to open this chat should be disableds
 */
const ChatRequestCard = ({customerId, chatId, openChat, disabled}) => {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    from  {customerId}
                </Typography>
                <div style={{margin: "auto"}}>
                    <Button size="small" style={{marginRight: 10}} onClick={openChat} disabled={disabled}>Open chat</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export {BasicProductCard, ReviewCard, BuyerProductCard, VendorProductCard, OrderCard, BalanceCard, ChatRequestCard}