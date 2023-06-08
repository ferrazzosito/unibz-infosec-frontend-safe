import { useState, useEffect } from 'react';
import {client as axios} from '../utils/axios'

/**
 * This custom hook handles everything that concerns the chats
 */
export function useChat (token, type = "customer") {

    const [chatRequests, setChatRequests] = useState([]);
    
    async function postChat(vendorId) {
      let data = {
        "vendorId": vendorId
      };
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:8080/v1/chats/request',
        withCredentials: true,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : JSON.stringify(data)
      };

      return axios.request(config)
      .then(response => response.data )
      .catch(e => {throw new Error("Error while creating the chat: " + e.message)})
    }

    /**
   * It requests a chat to a vendor
   * 
   * @param vendorId id of the vendor, who the customer wants to chat with
   */
    async function requestChat(vendorId) {
      return await postChat(vendorId)
        .then(resp => resp.chatId);
    }

    /**
   * It gets all the pending chat requests of this user (who has to be a vendor)
   */
    async function getChatRequests() {
      return await axios.get(`/v1/chats/requests`, {
        withCredentials: true
      }).then(res => res.data);
    }

    useEffect(() => {
      if (type === "vendor") {
        const fetchData = async () => {
          await getChatRequests().then(requests => setChatRequests(requests));
        };
    
        const interval = setInterval(fetchData, 3000); 

        fetchData();
    
        return () => {
          clearInterval(interval);
        };
      }
    }, []);
    
    return {requestChat, chatRequests, getChatRequests};
}
