import { Grid } from "@mui/material";
import { BasicProductCard, BuyerProductCard, VendorProductCard } from "../fragments/ProductCards";
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

const VendorProfilePage = () => {

    const {user, logUser, registerUser, logout} = useContext(authContext);     

    const {orders, approveOrder} = useOrders(user.accessToken);
    // const {reviews} = useReviews(user.accessToken);

    const navigate = useNavigate();
    const redirect = () => navigate("/");
    
    

    return (
        <Grid container justifyContent="center" >
            <Grid item xs={12}>
                <Title text="Your Sellings" />
            </Grid>
            <Grid item container xs={12} justifyContent="center" spacing={7}>
                <Grid item container xs={12} justifyContent="center"> 
                    {

                        orders.length !== 0 ?       
                    
                        orders.map((ord) => {
                            
                            console.log(JSON.stringify(ord));

                            return (
                                <Grid item xs={7}>
                                    <OrderCard
                                        basicProductCard={ 
                                            <BasicProductCard 
                                                // type="vulnerability" 
                                                name={ord.product.name}
                                                price={ord.product.cost}
                                                vendorId={user.payload.id}
                                                // escription="lorem ipsum lorem ipsum lorem ipsum" 
                                            />}
                                        buyer={ord.customer.email}
                                            // date="10/20/2024"
                                        idProd = {ord.productId}
                                        idOrder = {ord.id}
                                        approveOrderFunction={approveOrder}
                                    />
                                </Grid>
                            )})

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

export default VendorProfilePage;