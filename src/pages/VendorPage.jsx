import { Button, Grid } from "@mui/material";
import { BalanceCard, BasicProductCard, BuyerProductCard, VendorProductCard } from "../fragments/ProductCards";
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
import { OrderCard } from "../fragments/ProductCards";
import { useReviews } from "../hooks/useReviews";
import { TopUpMoneyForm } from "../fragments/Forms";
import { useSearchParams } from "react-router-dom";
import {Typography} from "@mui/material";
import { Widget, toggleInputDisabled, addResponseMessage, toggleWidget} from 'react-chat-widget';
import { openChatSession } from "../util/chat";

import 'react-chat-widget/lib/styles.css';
import { useChat } from "../hooks/useChat";



const VendorPage = () => {

    const [chatId, setChatId] = useState(0);
    
    const {user, logUser, registerUser, logout, findUser} = useContext(authContext);     
    
    const {orders} = useOrders(user.accessToken);
    const {reviews} = useReviews(user.accessToken);

    const navigate = useNavigate();
    const redirect = () => navigate("/");
    
    
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get("id");

    const [vendor, setVendor] = useState({});

    useEffect(
        () => {
            findUser(id)
            .then(resp => setVendor(resp));
        }, []
    )   
        
    const {requestChat} = useChat(user.accessToken);

    const manageArrivingMessages = (ws, text) => {
        addResponseMessage(text);
    }

    const closeByVendor = () => {
        setChatId(undefined);
        toggleInputDisabled();
        toggleWidget();
    }

    const [functionsManageChat, setFunctionsManageChat] = useState();

    const openChat = (handleToggle) => {
        toggleInputDisabled();

        requestChat(vendor.id)
            .then(chatIdResp => {
                setChatId(chatIdResp);
                const [sendMsg, closeChat] = openChatSession(
                    chatIdResp, 
                    false,
                    () => {}, 
                    (ws) => toggleInputDisabled(), 
                    manageArrivingMessages,
                    () => closeByVendor(), 
                    () => {throw new Error("error while communicating")}
                );

                console.log("qui no")

                if (sendMsg) {
                    console.log("we");
                }
                setFunctionsManageChat( [sendMsg, closeChat] );
            }
        );

        handleToggle();
    }
    
    const getCustomLauncher = (handleToggle) => (
        <ConfirmationButton title="LIVE CHAT WITH THIS VENDOR" onClick={() => {
            if (functionsManageChat) {
                handleToggle();
                setFunctionsManageChat();
                const [sendMsg, closeChat] = functionsManageChat;
                closeChat();
            } else {
                openChat(handleToggle);
            }
        }}/>
    )
        
    const handleNewUserMessage = (newMessage) => {
        // console.log(`New message incoming! ${newMessage}`);
        // Now send the message throught the backend API
        const [sendMsg, closeChat] = functionsManageChat;

        sendMsg(newMessage);

        // console.log(chatId);
    };
        
        return (
            <Grid container justifyContent="center" >

            <Widget 
            //se non vanno prova a passare le cose come prop qui
                launcher={handleToggle => getCustomLauncher(handleToggle)} 
                handleNewUserMessage={handleNewUserMessage}
                
                />

            <Grid item xs={12}>
                <Title text="Vendor Page" />
            </Grid>

            <Grid item xs={12}>
                <Typography variant="h4"  >
                    Email: {vendor.email} 
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5"  >
                    Or click in the bottom right corner to live chat with this vendor
                </Typography>
            </Grid>
            

            <Grid item container xs={12} justifyContent="center">
                <Grid item xs={7}>
                    <ConfirmationButton title={"Homepage"} onClick={() => { 
                        redirect()
                    }} />
                </Grid>
            </Grid>
            
        </Grid>
    )

}

export default VendorPage;