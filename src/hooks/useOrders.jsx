import { useState, useEffect } from 'react';
import {client as axios} from '../utils/axios';
import jwt_decode from "jwt-decode";

export function useOrders (token) {

    //I should do an if so that if the role is vendor, in products there's only vendor products, otherwise, all products
    //as well as setProducts for clients should be disabled
    const [orders, setOrders] = useState([]);

    async function get() {

      let url = "/v1/orders/";
      const role = jwt_decode(token).role;

      if(role === "customer")
        url += "mine";

      if(role === "vendor")
        url += "sold";

        
        try {
          const { data } = await axios.get(url, { withCredentials: true});
          
          
          if(!data.error) {
            setOrders(data); 
          }

      } catch (e) {
          console.log("Error: " + e.message);

          setOrders([]);  
      }

    }

  function getOrders() {
    get()
  }

  useEffect( () => getOrders(), []);

    async function post(idProduct, idUser) {

      let data = {
        "productId": idProduct,
        "clientId": idUser
      };
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:8080/v1/orders/create',
        withCredentials: true,
        headers: { 
          'Content-Type': 'application/json'
        },  
        data : JSON.stringify(data)
      };

      return await axios.request(config)
      .then(response => JSON.stringify(response.data))
      .catch(e => {throw new Error("Insufficient money")})
    }

    async function makeAnOrder(idProduct) {
      return await post(idProduct)
    }

    async function approveOrder(idOrder) {
     
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `http://localhost:8080/v1/orders/${idOrder}/approve`,
        withCredentials: true,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : JSON.stringify({})
      };

      return await axios.request(config)
        .then(response => { getOrders(); return JSON.stringify(response.data)})
        .catch(e => {throw new Error("Error while approving the order: " + e.message)})

    }
    
    return {orders, makeAnOrder, approveOrder};
}
