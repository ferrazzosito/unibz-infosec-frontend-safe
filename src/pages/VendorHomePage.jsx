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

const VendorHomePage = ({value}) => {

    const {user, logUser, registerUser, logout} = useContext(authContext);    
    const {products, myProducts, addProduct, deleteProduct} = useProducts(user.accessToken);
    
    const {chatRequests} = useChat(user.accessToken, "vendor");
    const [functionsManageChat, setFunctionsManageChat] = useState();

    const navigate = useNavigate();
    const redirect = () => navigate("/my-profile-vendor");

    const openChat = (chatId) => {
        toggleInputDisabled();
        const [sendMsg, closeChat] = openChatSession(
            chatId, 
            false,
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

    const getCustomLauncher = (handleToggle) => (
        <ConfirmationButton title="CHAT WITH CUSTOMER" onClick={() => {
            if (functionsManageChat) {
                handleToggle();
                setFunctionsManageChat();
                const [sendMsg, closeChat] = functionsManageChat;
                closeChat();
            }
        }}/>
    );

    const handleChatInput = (message) => {
        const [sendMsg, closeChat] = functionsManageChat;
        sendMsg(message);
    };

    return (
        <Grid container justifyContent="center" >
            <Widget 
                handleNewUserMessage={handleChatInput} />
            <Grid item xs={12}>
                <Title text="Home Page" />
            </Grid>
            <Grid item container xs={12} justifyContent="center"> 
                <Grid item xs={7}>
                    <ProductForm  onSubmitForm={addProduct}/>
                </Grid>
            </Grid>
            <Grid item xs={12} marginTop={8}>
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

            <Grid item xs={12} marginTop={8}>
                <Title text="Your chat requests" />
            </Grid>
            <Grid item container xs={9} spacing={7} justifyContent="center">
            {
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