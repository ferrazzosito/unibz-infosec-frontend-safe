import { useState, useEffect } from 'react';
import {client as axios} from '../utils/axios'

export function useOrders (token) {

    //I should do an if so that if the role is vendor, in products there's only vendor products, otherwise, all products
    //as well as setProducts for clients should be disabled
    const [orders, setOrders] = useState([]);

    async function get() {

      try {
          const { data } = await axios.get('/v1/orders/getAll', { headers: {"Authorization" : `Bearer ${token}`} });

          if(!data.error) {
            setOrders(data); 
          }

      } catch (e) {
          console.log("Error: " + e.message);

          setOrders([]);  
      }

  }

  function getProducts() {
    get()
  }

  useEffect(getProducts, []);

    async function post(idProduct, idUser) {

      let data = {
        "productId": idProduct,
        "clientId": idUser
      };
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:8080/v1/orders/create',
        headers: { 
          'Content-Type': 'application/json',
          "Authorization" : `Bearer ${token}`
        },
        data : JSON.stringify(data)
      };

      return axios.request(config)
      .then(response => JSON.stringify(response.data))
      .catch(e => {throw new Error("Error while creating the order: " + e.message)})
    }

    function makeAnOrder(idProduct) {
      return post(idProduct);
    }
    
    return {orders, makeAnOrder};
}
