import { Grid } from "@mui/material";
import { BasicProductCard, BuyerProductCard, OrderCard, VendorProductCard } from "../fragments/ProductCards";
import { Title } from "../components/Typography";
import { ProductForm } from "../fragments/Forms";
import { useUser } from "../hooks/useUser";
// import AuthConsumer from "../hooks/useUser";
import { ConfirmationButton } from "../components/Buttons";
import { useContext } from "react";
import { authContext } from "../hooks/useUser";
import { useEffect } from "react";
import { useProducts } from "../hooks/useProducts";
import { useNavigate } from "react-router";

const VendorHomePage = ({value}) => {

    const {user, logUser, registerUser, logout} = useContext(authContext);    
    // reload();

    // useEffect( () => {
    //     console.log(user)
    //     // console.log(JSON.stringify(user && user.accessToken))  
    // }, [])

    const {products, myProducts, addProduct, deleteProduct} = useProducts(user.accessToken);

    const navigate = useNavigate();
    const redirect = () => navigate("/my-profile-vendor");

    return (
        <Grid container justifyContent="center" >
            <Grid item xs={12}>
                <Title text="Home Page" />
            </Grid>
            <Grid item container xs={12} justifyContent="center"> 
                <Grid item xs={7}>
                    <ProductForm  onSubmitForm={addProduct}/>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Title text="Your Products" />
            </Grid>
            <Grid item container xs={9} spacing={7} justifyContent="center" >
                {
                    myProducts.length !== 0 ?    
                    myProducts.map((prod) => (
                        <Grid item xs={3}>
                            <VendorProductCard /*type={prod.type}*/ 
                                id={prod.id}
                                price={prod.cost} 
                                name={prod.name} 
                                description={prod.description}
                                deleteFunction={deleteProduct}
                            />
                        </Grid>
                    ))

                    : <h1 style={{marginTop: "70px"}}>No Products To Display</h1>
                }
            </Grid>
            {/* <Grid item xs={12}>
                <Title text="Your Sellings" />
            </Grid> */}
            {/* <Grid item container xs={12} justifyContent="center" spacing={7}>
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
            </Grid> */}
            <Grid item container xs={12} justifyContent="center">
                <Grid item xs={7}>
                    <ConfirmationButton title={"My Account"} onClick={() => { 
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

export default VendorHomePage;