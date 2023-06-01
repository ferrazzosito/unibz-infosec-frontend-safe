import { Grid } from "@mui/material";
import { BasicProductCard, ReviewCard } from "../fragments/ProductCards";
import { Title } from "../components/Typography";
import { ReviewForm } from "../fragments/Forms";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../hooks/useUser";

const Review = () => (
    <>
        <Grid item container xs={9} spacing={7} justifyContent="center" >
            <Grid item xs={12}>
                <ReviewCard 
                    rating = "5 stars" 
                    title = "Awesome Product" 
                    writer="Jesus Holy Christ" 
                    description="It changed my life, my workflow is now more solid and less secure exactly as I wanted it to be" 
                    
                    answer={(
                        <ReviewForm header="Answer to client's review"/>
                    )}
                />
            </Grid>
        </Grid>
    </>
)

const ProductPage = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get("id");

    console.log(id);

    const {user} = useContext(authContext);    
    const {getProduct} = useProducts(user.accessToken);

    const [product, setProduct] = useState({});

    useEffect(() => {
        getProduct(id)
        .then((result) => setProduct(result))
        .catch(e => setProduct({}));
    }, [])

    return (
        <Grid container justifyContent="center" spacing={7} >
            <Grid item xs={12}>
                <Title text="Product" />
            </Grid>
            <Grid item container xs={9} spacing={7} justifyContent="center" >
                <Grid item xs={3}>
                    <BasicProductCard type="" name={product.name} description="" price={product.cost} />
                </Grid>
            </Grid>
            <Review />
            <Review />
        </Grid>
    )

}


export default ProductPage;