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
import { ErrorAlert } from "../components/Alerts";

const VendorProfilePage = () => {

    const {user, logUser, registerUser, logout} = useContext(authContext);     

    const {orders, approveOrder} = useOrders(user.accessToken);

    const navigate = useNavigate();
    const redirect = () => navigate("/");

    const [errorAlert, setErrorAlert] = useState();

    useEffect(() => {

        setErrorAlert();
        
    }, [orders])    
    

    return (
        <Grid container justifyContent="center" >
            <Grid item xs={12}>
                <Title text="Your Sellings" />
            </Grid>
            {
                errorAlert ?
                    <ErrorAlert message={errorAlert} />
                : <></>
            }
            <Grid item container xs={12} justifyContent="center" spacing={7}>
                <Grid item container xs={12} justifyContent="center"> 
                    {

                        orders.length !== 0 ?       
                    
                        orders.map((ord) => {

                            return (
                                <Grid item xs={7}>
                                    <OrderCard
                                        basicProductCard={ 
                                            <BasicProductCard 
                                                name={ord.product.name}
                                                price={ord.product.cost}
                                                vendorId={user.payload.id}
                                            />}
                                        buyer={ord.customer.email}
                                        idProd = {ord.productId}
                                        idOrder = {ord.id}
                                        approveOrderFunction={(id) => approveOrder(id).catch((e) => setErrorAlert("The customer doesn't have enough money"))}
                                        approved={ord.approved}
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