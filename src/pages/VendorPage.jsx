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
import { useSearchParams } from "react-router-dom";
import {Typography} from "@mui/material";

const VendorPage = () => {

    const {user, logUser, registerUser, logout, findUser} = useContext(authContext);     

    const {orders} = useOrders(user.accessToken);
    const {reviews} = useReviews(user.accessToken);

    const navigate = useNavigate();
    const redirect = () => navigate("/");
    
    
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get("id");

    const [vendor, setVendor] = useState({});

    useEffect(
        () => {
            findUser(id)
            .then(resp => setVendor(resp));
        }, []
    )


    return (
        <Grid container justifyContent="center" >
            <Grid item xs={12}>
                <Title text="Vendor Page" />
            </Grid>

            <Typography variant="h4"  >
                Email: {vendor.email}
            </Typography>
            
            <Grid item container xs={12} justifyContent="center">
                <Grid item xs={7}>
                    <ConfirmationButton title={"Homepage"} onClick={() => { 
                        redirect()
                    }} />
                </Grid>
            </Grid>
            
        </Grid>
    )

}

export default VendorPage;