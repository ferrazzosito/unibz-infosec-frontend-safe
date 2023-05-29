import { useState, useEffect } from 'react';
import {client as axios} from '../utils/axios'

export function useProducts (token) {

    const [products, setProducts] = useState([]);

    // async function post({startupId, type}) {

    //   return axios.post('/v1/places/create', {
    //       startupId: startupId,
    //       type: type
    //   }).then(response => {

    //     getPlaces();
    //     return response;

    //   })
    // }

    // function setPlace(place) {
    //   return post(place);
    // }


    async function get() {

        // if(token !== null && token !== undefined && token !== "") {
            const { data } = await axios.get('/v1/products/getAll', { headers: {"Authorization" : `Bearer ${token}`} });
            setProducts(data);  
        // } else 
        //     throw new Error("")
    }

    function getProducts() {
      get()
    }

    useEffect(getProducts, []);
    
    return [products];
}
