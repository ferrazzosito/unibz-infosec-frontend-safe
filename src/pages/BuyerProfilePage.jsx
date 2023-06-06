import { Grid } from "@mui/material";
import { BalanceCard, BasicProductCard, BuyerProductCard, VendorProductCard } from "../fragments/ProductCards";
import { Title } from "../components/Typography";
import { SearchField, UnsafeStringField } from "../components/FormComponents";
import { useEffect, useState } from "react";
import {SearchBar, UnsafeSearchBar} from "../fragments/SearchBar";
import { useNavigate } from "react-router";
import { useProducts } from "../hooks/useProducts";
import { useUser } from "../hooks/useUser";
import AuthConsumer from "../hooks/useUser";
import { ConfirmationButton } from "../components/Buttons";
import { useContext } from "react";
import { authContext } from "../hooks/useUser";
import { useOrders } from "../hooks/useOrders";
import { OrderCard } from "../fragments/ProductCards";
import { useReviews } from "../hooks/useReviews";
import { TopUpMoneyForm } from "../fragments/Forms";

const ProdCard = ({prodName, prodPrice, vendorId}) =>{

    // const [vendorId, setVendorId] = useState(1);

    // useEffect(
    //     () => {
    //         getProduct(prodId)
    //         .then (resp => {
    //             // console.log(JSON.stringify(resp))
    //             setVendorId(resp.vendorId)});
    //     }, []
    // )

    // console.log(vendorId);

    return (<BasicProductCard 
        // type="vulnerability" 
        name={prodName}
        price = {prodPrice}
        vendorId={vendorId}
        // escription="lorem ipsum lorem ipsum lorem ipsum" 
    />)
}

const BuyerProfilePage = () => {

    const {user, logUser, registerUser, logout} = useContext(authContext);     

    const {orders} = useOrders(user.accessToken);
    const {getProduct} = useProducts(user.accessToken);

    const navigate = useNavigate();
    const redirect = () => navigate("/");
    

    return (
    
        <Grid container justifyContent="center" >
            <Grid item xs={12}>
                <Title text="Profile Page" />
            </Grid>
            <Grid container xs={12} justifyContent="center">
                <BalanceCard amount={10}/> 
            </Grid>
            <Grid  container xs={12} justifyContent="center">
                <TopUpMoneyForm onSubmitForm={() => {}}/> 
            </Grid>
            <Grid item xs={12}>
                <Title text="Your past orders" />
            </Grid>
            <Grid item container xs={12} justifyContent="center" spacing={7}>
                <Grid item container xs={12} justifyContent="center"> 
                    {

                        orders.length !== 0 ?
                    
                        orders.map((ord) => (
                            <Grid item xs={7}>
                                <OrderCard
                                    basicProductCard={  <ProdCard prodName = {ord.product.name} 
                                                            prodPrice = {ord.product.cost} 
                                                            vendorId = {ord.product.vendorId}
                                                            />  
                                        }
                                    buyer="you"
                                    role={user.payload.role}
                                    approved={ord.approved}
                                        // date="10/20/2024"
                                    idProd = {ord.productId}
                                />
                            </Grid>
                        ))

                        : <h1 style={{marginTop: "10px"}}>No Orders To Display</h1>
                    
                    }
                    
                </Grid>
            </Grid>
        
            <Grid item container xs={12} justifyContent="center">
                <Grid item xs={7}>
                    <ConfirmationButton title={"Homepage"} onClick={() => { 
                        redirect()
                    }} />
                </Grid>
            </Grid>
            <Grid item container xs={12} justifyContent="center">
                <Grid item xs={7}>
                    <ConfirmationButton title={"Logout"} onClick={() => { 
                        logout()
                    }} />
                </Grid>
            </Grid>
            
        </Grid>
    )

}

export default BuyerProfilePage;