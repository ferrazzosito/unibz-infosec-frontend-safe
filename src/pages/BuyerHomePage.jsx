import { Grid } from "@mui/material";
import { BasicProductCard } from "../fragments/ProductCards";
import { Title } from "../components/Typography";

const BuyerHomePage = () => {

    return (
        <Grid container justifyContent="center" >
            <Grid item xs={12}>
                <Title text="Home Page" />
            </Grid>
            <Grid item container xs={9} spacing={7} justifyContent="center" >
                <Grid item xs={3}>
                    <BasicProductCard type="vulnerability" name="Salt in Passwords" description="lorem ipsum lorem ipsum lorem ipsum" />
                </Grid>
                <Grid item xs={3}>
                    <BasicProductCard type="vulnerability" name="Salt in Passwords" description="lorem ipsum lorem ipsum lorem ipsum" />
                </Grid>
                <Grid item xs={3}>
                    <BasicProductCard type="vulnerability" name="Salt in Passwords" description="lorem ipsum lorem ipsum lorem ipsum" />
                </Grid>
                <Grid item xs={3}>
                    <BasicProductCard type="vulnerability" name="Salt in Passwords" description="lorem ipsum lorem ipsum lorem ipsum" />
                </Grid>
                <Grid item xs={3}>
                    <BasicProductCard type="vulnerability" name="Salt in Passwords" description="lorem ipsum lorem ipsum lorem ipsum" />
                </Grid>
                <Grid item xs={3}>
                    <BasicProductCard type="vulnerability" name="Salt in Passwords" description="lorem ipsum lorem ipsum lorem ipsum" />
                </Grid>
            </Grid>
        </Grid>
    )

}

export default BuyerHomePage;