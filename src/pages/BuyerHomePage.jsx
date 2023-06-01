import { Grid } from "@mui/material";
import { BasicProductCard, BuyerProductCard, VendorProductCard } from "../fragments/ProductCards";
import { Title } from "../components/Typography";
import { SearchField } from "../components/FormComponents";
import { useEffect, useState } from "react";
import SearchBar from "../fragments/SearchBar";
import { useNavigate } from "react-router";
import { useProducts } from "../hooks/useProducts";
import { useUser } from "../hooks/useUser";
import AuthConsumer from "../hooks/useUser";
import { ConfirmationButton } from "../components/Buttons";
import { useContext } from "react";
import { authContext } from "../hooks/useUser";

const BuyerHomePage = () => {

    const [query, setQuery] = useState("");

    const {user, logUser, registerUser, logout} = useContext(authContext);     

    const {products} = useProducts(user.accessToken);

    const navigate = useNavigate();
    const redirect = () => navigate("/selling");

    //TODO: should this be done through a backend call, to retrieve fewer objects?
    const queriedProducts = () => products.filter((prod) => (prod.name.indexOf(query) >= 0));

    const usedProducts = queriedProducts();

    return (
        <Grid container justifyContent="center" >
            <Grid item xs={12}>
                <Title text="Home Page" />
            </Grid>
            <Grid item xs={12}>
                <SearchBar query={query} setQuery={setQuery} />
            </Grid>
            <Grid item container xs={12} justifyContent="center">
                <Grid item container xs={9} spacing={7} justifyContent="center" >
                    {usedProducts.map((prod) => (
                        <Grid item xs={3}>
                            <BuyerProductCard /*type={prod.type}*/ 
                                price={prod.cost} 
                                name={prod.name} 
                                description={prod.description}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
            <Grid item container xs={12} >
                <Grid item container xs={9} >
                    <Grid item xs ={12} >

                    </Grid>
                </Grid>
            </Grid>
            <Grid item container xs={12} justifyContent="center">
                <Grid item xs={7}>
                    <ConfirmationButton title={"Logout"} onClick={() => { 
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

export default BuyerHomePage;