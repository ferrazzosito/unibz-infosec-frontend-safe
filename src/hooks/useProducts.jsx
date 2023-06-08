import { useState, useEffect } from 'react';
import {client as axios} from '../utils/axios';
import jwt_decode from "jwt-decode";


export function useProducts (token) {

    //I should do an if so that if the role is vendor, in products there's only vendor products, otherwise, all products
    //as well as setProducts for clients should be disabled
    const [products, setProducts] = useState([]);

    const [myProducts, setMyProducts] = useState([]);


    async function post({name, cost}) {

      let data = {
        "name": name,
        "cost": +cost,
        "vendorId" : 1
      };
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:8080/v1/products/create',
        withCredentials: true,
        headers: { 
          'Content-Type': 'application/json'
         
        },
        data : JSON.stringify(data)
      };

      return axios.request(config)
      .then(response => JSON.stringify(response.data))
      .catch(e => {throw new Error("Error while posting the product: " + e.message)})
    }

    function addProduct(product) {
      return post(product).then(() => getProducts());
    }

    async function deleteMethod(id) {

        return await axios.get(`/v1/products/delete/${id}`, { withCredentials: true })
        .then(response => JSON.stringify(response.data))
        .catch(e => {throw new Error("Error while deleting the product " + id + ": " + e.message)})
      }

    function deleteProduct(id) {
        return deleteMethod(id).then(() => getProducts());
    }
    


    async function get() {

      let url = "/v1/products/";
      const role = jwt_decode(token).role;

      if(role === "vendor")
        url += "mine";

      if(role === "customer")
        url += "getAll";

        try {
            const { data } = await axios.get(url, { withCredentials: true });

            if(!data.error) {
                setProducts(data); 
                setMyProducts(data); 
            }

        } catch (e) {
            console.log("Error: " + e.message);

            setProducts([]); 
            setMyProducts([]); 
        }

    }

    function getProducts() {
      get()
    }

    useEffect(getProducts, []);

    async function getAProduct(id) {

        return await axios.get(`/v1/products/${id}`, { withCredentials: true});
    }

    async function postSearchQuery({query}) {
      return axios.post('/v1/products/search',  {
              query: query
          },
          { withCredentials: true })
          .then(message => message)
          .catch((e) => {throw new Error(e.message)});
    }

    async function getProduct(id) {
        return getAProduct(id)
        .then(({data}) => data)
        .catch((e) => {throw new Error(e.message)});
    }
    
    return {products, myProducts, addProduct, deleteProduct, getProduct, postSearchQuery};
}
