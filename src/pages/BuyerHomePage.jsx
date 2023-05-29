import { Grid } from "@mui/material";
import { BasicProductCard, BuyerProductCard, VendorProductCard } from "../fragments/ProductCards";
import { Title } from "../components/Typography";
import { SearchField } from "../components/FormComponents";
import { useEffect, useState } from "react";
import SearchBar from "../fragments/SearchBar";
import { useNavigate } from "react-router";
import useAuthentication from "../hooks/useAuthentication";
import { useProducts } from "../hooks/useProducts";

const BuyerHomePage = ({user}) => {

    useAuthentication(user);    

    const [query, setQuery] = useState("");

    const [products] = useProducts(user.accessToken);

    // const products = [{type: "vulnerability", price: "15$", name: "Salt in Passwords", description: "lorem ipsum lorem ipsum lorem ipsum"},
    //                     {type: "vulnerability", price: "15$", name: "Salt in Passwords", description: "lorem ipsum lorem ipsum lorem ipsum"},  
    //                     {type: "vulnerability", price: "15$", name: "Salt in Passwords", description: "lorem ipsum lorem ipsum lorem ipsum"},
    //                     {type: "vulnerability", price: "15$", name: "Salt in Passwords", description: "lorem ipsum lorem ipsum lorem ipsum"},
    //                     {type: "vulnerability", price: "15$", name: "Salt in Passwords", description: "lorem ipsum lorem ipsum lorem ipsum"},
    //                     {type: "vulnerability", price: "15$", name: "Salt in Passwords", description: "lorem ipsum lorem ipsum lorem ipsum"},  
    //                 ]

    //Do better the match stuff
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
        </Grid>
    )

}

export default BuyerHomePage;