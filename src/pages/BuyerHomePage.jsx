import { Grid } from "@mui/material";
import { BasicProductCard, BuyerProductCard, VendorProductCard } from "../fragments/ProductCards";
import { Title } from "../components/Typography";

const BuyerHomePage = () => {

    return (
        <Grid container justifyContent="center" >
            <Grid item xs={12}>
                <Title text="Home Page" />
            </Grid>
            <Grid item container xs={12} justifyContent="center">
                <Grid item container xs={9} spacing={7} justifyContent="center" >
                    <Grid item xs={3}>
                        <BuyerProductCard type="vulnerability" price="15$" name="Salt in Passwords" description="lorem ipsum lorem ipsum lorem ipsum" />
                    </Grid>
                    <Grid item xs={3}>
                        <BuyerProductCard type="vulnerability" price="15$" name="Salt in Passwords" description="lorem ipsum lorem ipsum lorem ipsum" />
                    </Grid>
                    <Grid item xs={3}>
                        <BuyerProductCard type="vulnerability" price="15$" name="Salt in Passwords" description="lorem ipsum lorem ipsum lorem ipsum" />
                    </Grid>
                    <Grid item xs={3}>
                        <BasicProductCard type="vulnerability" price="15$" name="Salt in Passwords" description="lorem ipsum lorem ipsum lorem ipsum" />
                    </Grid>
                    <Grid item xs={3}>
                        <VendorProductCard type="vulnerability" price="15$" name="Salt in Passwords" description="lorem ipsum lorem ipsum lorem ipsum" />
                    </Grid>
                    <Grid item xs={3}>
                        <VendorProductCard type="vulnerability" price="15$" name="Salt in Passwords" description="lorem ipsum lorem ipsum lorem ipsum" />
                    </Grid>
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