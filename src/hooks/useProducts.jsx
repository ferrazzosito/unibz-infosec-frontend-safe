import { useState, useEffect } from 'react';
import {client as axios} from '../utils/axios'

export function useProducts (token) {

    //I should do an if so that if the role is vendor, in products there's only vendor products, otherwise, all products
    //as well as setProducts for clients should be disabled
    const [products, setProducts] = useState([]);

    const [myProducts, setMyProducts] = useState([]);


    async function post({name, cost}) {

    //   return axios.post('/v1/products/create', 
    //   {
    //       name: name,
    //       cost: cost,

    //   },
    //   { headers: {"Authorization" : `Bearer ${token}`} }
    //   ).then(response => {

    //     getProducts();
    //     return response;

    //   })

    console.log(cost)

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
    


    async function get() {

        // if(token !== null && token !== undefined && token !== "") {
            const { data } = await axios.get('/v1/products/getAll', { headers: {"Authorization" : `Bearer ${token}`} });
            setProducts(data); 
            setMyProducts(data); 
        // } else 
        //     throw new Error("")
    }

    function getProducts() {
      get()
    }

    useEffect(getProducts, []);
    
    return {products, myProducts, addProduct};
}
