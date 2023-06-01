import { useState, useEffect } from 'react';
import {client as axios} from '../utils/axios'

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

    function addProduct(product) {
      return post(product).then(() => getProducts());
    }

    async function deleteMethod(id) {

        return await axios.get(`/v1/products/delete/${id}`, { headers: {"Authorization" : `Bearer ${token}`} })
        .then(response => JSON.stringify(response.data))
        .catch(e => {throw new Error("Error while deleting the product " + id + ": " + e.message)})
      }

    function deleteProduct(id) {
        return deleteMethod(id).then(() => getProducts());
    }
    


    async function get() {

        try {
            const { data } = await axios.get('/v1/products/getAll', { headers: {"Authorization" : `Bearer ${token}`} });

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
    
    return {products, myProducts, addProduct, deleteProduct};
}
