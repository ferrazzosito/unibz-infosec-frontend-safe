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
import { ErrorAlert, SuccessAlert } from "../components/Alerts";

const BuyerHomePage = () => {

    const [query, setQuery] = useState("");
    const [qresponse, setQresponse] = useState({"data": {"query": ""}});

    const [succAlert, setSuccAlert] = useState();
    const [errorAlert, setErrorAlert] = useState();

    const {user, logUser, registerUser, logout, findUser} = useContext(authContext);     

    const {postSearchQuery} = useProducts(user.accessToken);
    
    const {products} = useProducts(user.accessToken);

    const {makeAnOrder} = useOrders(user.accessToken);

    const navigate = useNavigate();
    const redirect = () => navigate("/my-profile-buyer");
    useEffect(() => {
        const performSearch = async () => {
          try {
            const response = await postSearchQuery({ query });
            setQresponse(response);
            console.log('Search results:', response);
          } catch (error) {
            console.log('Error:', error);
          }
        };
      
        if (query !== "") {
          performSearch();
        }
      }, [query]);
    //TODO: should this be done through a backend call, to retrieve fewer objects?
    const queriedProducts = () => products.filter((prod) => (prod.name.indexOf(query) >= 0));

    const usedProducts = queriedProducts();

    return (
        <Grid container justifyContent="center" >
            <Grid item xs={12}>
                <Title text="Home Page" />
            </Grid>
            <Grid item xs={12}>
                <UnsafeSearchBar query={qresponse.data.query} setQuery={setQuery}/>
            </Grid>
            {
                succAlert ?
                    <SuccessAlert message={succAlert} />
                : <></>

            }

            {
                errorAlert ?
                    <ErrorAlert message={errorAlert} />
                : <></>
            }
            <Grid item container xs={12} justifyContent="center">
                <Grid item container xs={9} spacing={7} justifyContent="center" >
                    {
                    
                         products.length !== 0 ?

                            usedProducts.map((prod) => {
                                return (
                                <Grid item xs={3}>
                                    <BuyerProductCard /*type={prod.type}*/ 
                                        id={prod.id}
                                        price={prod.cost} 
                                        name={prod.name} 
                                        vendorId = {prod.vendorId}
                                        description={prod.description}
                                        buyFunction={() => {
                                                            setSuccAlert();
                                                            setErrorAlert();
                                                            makeAnOrder(prod.id)
                                                            .then(() => setSuccAlert("Bought the product successfully"))
                                                            .catch((e) => setErrorAlert(e.message))}
                                        }
                                    />
                                </Grid>
                            )})

                        : <h1 style={{marginTop: "100px"}}>No Products To Display</h1>

                    }

                    
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

export default BuyerHomePage;