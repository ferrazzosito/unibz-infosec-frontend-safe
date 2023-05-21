import { Grid } from "@mui/material";
import { BasicProductCard, ReviewCard } from "../fragments/ProductCards";
import { Title } from "../components/Typography";
import { ReviewForm } from "../fragments/Forms";

const ProductPage = () => {

    return (
        <Grid container justifyContent="center" spacing={7} >
            <Grid item xs={12}>
                <Title text="Product" />
            </Grid>
            <Grid item container xs={9} spacing={7} justifyContent="center" >
                <Grid item xs={3}>
                    <BasicProductCard type="vulnerability" name="Salt in Passwords" description="lorem ipsum lorem ipsum lorem ipsum" />
                </Grid>
            </Grid>
            <Review />
            <Review />
        </Grid>
    )

}

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

export default ProductPage;