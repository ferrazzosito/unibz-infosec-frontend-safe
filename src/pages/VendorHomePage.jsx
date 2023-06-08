import { Grid, List } from "@mui/material";
import { Widget, toggleInputDisabled, addResponseMessage, toggleWidget } from 'react-chat-widget';
import { BasicProductCard, BuyerProductCard, OrderCard, VendorProductCard, ChatRequestCard } from "../fragments/ProductCards";
import { Title } from "../components/Typography";
import { ProductForm } from "../fragments/Forms";
import { useUser } from "../hooks/useUser";
// import AuthConsumer from "../hooks/useUser";
import { ConfirmationButton } from "../components/Buttons";
import { useContext, useState } from "react";
import { authContext } from "../hooks/useUser";
import { useEffect } from "react";
import { useProducts } from "../hooks/useProducts";
import { useNavigate } from "react-router";
import { useChat } from "../hooks/useChat";
import { openChatSession } from "../util/chat";
import { createRef } from "react";
import { UnsafeSearchBar } from "../fragments/SearchBar";
import { ErrorAlert } from "../components/Alerts";

const VendorHomePage = ({value}) => {

    const {user, logUser, registerUser, logout} = useContext(authContext);    
    const {addProduct, deleteProduct, postSearchQuery} = useProducts(user.accessToken);

    const [errorAlert, setErrorAlert] = useState();
    
    const {chatRequests} = useChat(user.accessToken, "vendor");
    const [functionsManageChat, setFunctionsManageChat] = useState();

    const navigate = useNavigate();
    const redirect = () => navigate("/my-profile-vendor");

    const openChat = (chatId) => {
        toggleInputDisabled();
        const [sendMsg, closeChat] = openChatSession(
            chatId, 
            true,
            () => {}, 
            (ws) => toggleInputDisabled(), 
            (ws, text) => {
                console.log(text);
                addResponseMessage(text);
            },
            () => {
                toggleInputDisabled();
                toggleWidget();
            }, 
            () => {
                throw new Error("error while communicating")
            }
        );
        setFunctionsManageChat([ sendMsg, closeChat ]);
    };


    const handleChatInput = (message) => {
        const [sendMsg, closeChat] = functionsManageChat;
        sendMsg(message);
    };

    const [query, setQuery] = useState("");
    const [qresponse, setQresponse] = useState({data: {query: "", results : []} });

    const performSearch = async () => {
        setErrorAlert();
        try {
          const response = await postSearchQuery({ query });
          setQresponse(response);
          console.log('Search results:', JSON.stringify(response));
        } catch (error) {
          console.log('Error:', error);
        }
      }; 

    useEffect(() => {
          performSearch();
      }, [query]);

    return (
        <Grid container justifyContent="center" >
            <Widget 
                handleNewUserMessage={handleChatInput} />
            <Grid item xs={12}>
                <Title text="Home Page" />
            </Grid>
            <Grid item container xs={12} justifyContent="center"> 
                <Grid item xs={7}>
                    <ProductForm  onSubmitForm={(product) => addProduct(product).then(() => performSearch())}/>
                </Grid>
            </Grid>
            <Grid item xs={12} marginTop={8}>
                <Title text="Your Products" />
            </Grid>
            <Grid item xs={12}>
                <UnsafeSearchBar query={qresponse.data.query} setQuery={setQuery}/>
            </Grid>
            {
                errorAlert ?
                    <ErrorAlert message={errorAlert} />
                : <></>
            }
            <Grid item container xs={9} spacing={7} justifyContent="center" >
                {

                        qresponse.data.results.length !== 0 ?

                        qresponse.data.results.map((prod) => (
                        <Grid item xs={3}>
                            <VendorProductCard /*type={prod.type}*/ 
                                id={prod.id}
                                price={prod.cost} 
                                name={prod.name} 
                                vendorName = {user.payload.sub}
                                description={prod.description}
                                deleteFunction={(id) => deleteProduct(id).then(() => performSearch()).catch((e) => setErrorAlert("A Product that is involved in some actions, like an order or reviews, cannot be deleted"))}
                            />
                        </Grid>
                    ))

                    : <h1 style={{marginTop: "70px"}}>No Products To Display</h1>
                }
            </Grid>

            <Grid item xs={12} marginTop={8}>
                <Title text="Your chat requests" />
            </Grid>
            <Grid item container xs={9} spacing={7} justifyContent="center">
            {

                chatRequests.length !== 0 ? 

                    chatRequests.map((request) => (
                            <Grid item xs={3}>
                                <ChatRequestCard
                                    chatId={request.chatId}
                                    customerId={request.customer.email}
                                    openChat={() => {
                                        toggleWidget();
                                        openChat(request.chatId);
                                    }}
                                    
                                />
                            </Grid>
                        ))

                : <h1 style={{marginTop: "40px"}}>No Chat Requests Yet</h1>
                
            }
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

export default VendorHomePage;