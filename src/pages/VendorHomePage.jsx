import { Grid } from "@mui/material";
import { BasicProductCard, BuyerProductCard, OrderCard, VendorProductCard } from "../fragments/ProductCards";
import { Title } from "../components/Typography";
import { ProductForm } from "../fragments/Forms";
import { useUser } from "../hooks/useUser";
import AuthConsumer from "../hooks/useUser";
import { ConfirmationButton } from "../components/Buttons";

const VendorHomePage = () => {

    const {user, logUser, registerUser, logout} = AuthConsumer();    

    return (
        <Grid container justifyContent="center" >
            <Grid item xs={12}>
                <Title text="Home Page" />
            </Grid>
            <Grid item container xs={12} justifyContent="center"> 
                <Grid item xs={7}>
                    <ProductForm />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Title text="Your Products" />
            </Grid>
            <Grid item container xs={9} spacing={7} justifyContent="center" >
                <Grid item xs={3}>
                    <VendorProductCard type="vulnerability" name="Salt in Passwords" price="15$" description="lorem ipsum lorem ipsum lorem ipsum" />
                </Grid>
                <Grid item xs={3}>
                    <VendorProductCard type="vulnerability" name="Salt in Passwords" price="15$" description="lorem ipsum lorem ipsum lorem ipsum" />
                </Grid>
                <Grid item xs={3}>
                    <VendorProductCard type="vulnerability" name="Salt in Passwords" price="15$" description="lorem ipsum lorem ipsum lorem ipsum" />
                </Grid>
                <Grid item xs={3}>
                    <VendorProductCard type="vulnerability" name="Salt in Passwords" price="15$" description="lorem ipsum lorem ipsum lorem ipsum" />
                </Grid>
                <Grid item xs={3}>
                    <VendorProductCard type="vulnerability" name="Salt in Passwords" price="15$" description="lorem ipsum lorem ipsum lorem ipsum" />
                </Grid>
                <Grid item xs={3}>
                    <VendorProductCard type="vulnerability" name="Salt in Passwords" price="15$" description="lorem ipsum lorem ipsum lorem ipsum" />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Title text="Your Sellings" />
            </Grid>
            <Grid item container xs={12} justifyContent="center" spacing={7}>
                <Grid item container xs={12} justifyContent="center"> 
                    <Grid item xs={7}>
                        <OrderCard
                            basicProductCard={ <BasicProductCard type="vulnerability" name="Salt in Passwords" description="lorem ipsum lorem ipsum lorem ipsum" />}
                            buyer="Alessandro"
                            date="10/20/2024"
                        />
                    </Grid>
                </Grid>
                <Grid item container xs={12} justifyContent="center"> 
                    <Grid item xs={7}>
                        <OrderCard
                            basicProductCard={ <BasicProductCard type="vulnerability" name="Salt in Passwords" description="lorem ipsum lorem ipsum lorem ipsum" />}
                            buyer="Alessandro"
                            date="10/20/2024"
                        />
                    </Grid>
                </Grid>
                <Grid item container xs={12} justifyContent="center"> 
                    <Grid item xs={7}>
                        <OrderCard
                            basicProductCard={ <BasicProductCard type="vulnerability" name="Salt in Passwords" description="lorem ipsum lorem ipsum lorem ipsum" />}
                            buyer="Alessandro"
                            date="10/20/2024"
                        />
                    </Grid>
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

export default VendorHomePage;