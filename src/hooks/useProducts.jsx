import { useState, useEffect } from 'react';
import {client as axios} from '../utils/axios';
import jwt_decode from "jwt-decode";

/**
 * This custom hook handles everything that concerns the products
 */
export function useProducts (token) {

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
        headers: { 
          'Content-Type': 'application/json',
          "Authorization" : `Bearer ${token}`
        },
        data : JSON.stringify(data)
      };

      return axios.request(config)
      .then(response => JSON.stringify(response.data))
      .catch(e => {throw new Error("Error while posting the product: " + e.message)})
    }

    /**
     * It adds a new product, defined from the attributes in the product object, which at the moment are
     * 
     * @param name name of the product
     * @param cost price of the product
     */
    async function addProduct(product) {
      return await post(product).then(() => getProducts());
    }

    async function deleteMethod(id) {

        return await axios.get(`/v1/products/delete/${id}`, { headers: {"Authorization" : `Bearer ${token}`} })
        .then(response => JSON.stringify(response.data))
        .catch(e => {throw new Error("Error while deleting the product " + id + ": " + e.message)})
      }

    /**
     * It deletes a product from its id
     */
    async function deleteProduct(id) {
        return await deleteMethod(id).then(() => getProducts());
    }
    


    async function get() {

      let url = "/v1/products/";
      const role = jwt_decode(token).role;

      if(role === "vendor")
        url += "mine";

      if(role === "customer")
        url += "getAll";

        try {
            const { data } = await axios.get(url, { headers: {"Authorization" : `Bearer ${token}`} });

            if(!data.error) {
                setMyProducts(data); 
            }

        } catch (e) {
            console.log("Error: " + e.message);

            setMyProducts([]); 
        }

    }

    /**
     * It retrieves the products, either those of the vendor or all of them in case is the customer asking them
     */
    function getProducts() {
      get()
    }

    useEffect(getProducts, []);

    async function getAProduct(id) {

        return await axios.get(`/v1/products/${id}`, { headers: {"Authorization" : `Bearer ${token}`} });
    }

    /**
     * It retrieves the products, either those of the vendor or all of them in case is the customer asking them,
     *  but following the query asked
     */
    async function postSearchQuery({query}) {

      let url = "/v1/products/";
      const role = jwt_decode(token).role;

      if(role === "vendor")
        url += "mine/";

      if(role === "customer")
        url += "";

      return axios.post(url + 'search',  {
              query: query
          },
          { 
              headers: {"Authorization" : `Bearer ${token}`} 
          })
          .then(message => message)
          .catch((e) => {throw new Error(e.message)});
    }

    /**
     * It retrieves a specific product from its id
     */
    async function getProduct(id) {
        return getAProduct(id)
        .then(({data}) => data)
        .catch((e) => {throw new Error(e.message)});
    }
    
    return {myProducts, addProduct, deleteProduct, getProduct, postSearchQuery};
}
