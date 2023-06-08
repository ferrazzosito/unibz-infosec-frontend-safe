import { useState, useEffect } from 'react';
import {client as axios} from '../utils/axios'

export function useReviews (token) {

    //I should do an if so that if the role is vendor, in products there's only vendor products, otherwise, all products
    //as well as setProducts for clients should be disabled
    const [reviews, setReviews] = useState([]);

    async function postCreateQuery({query}) {
      return axios.post('/v1/reviews/search',  {
              query: query
          },
          { 
              withCredentials: true
          })
          .then(message => message)
          .catch((e) => {throw new Error(e.message)});
      }

    async function post({title, description, stars, replyFromReviewId, productId, authorId}) {
      
      
      let data = {
        "title": title,
        "description": description,
        "stars": +stars,
        "datePublishing": new Date(),
        "productId": productId,
        "replyFromReviewId": replyFromReviewId,
        "author": authorId
      };

      console.log(JSON.stringify(data))
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:8080/v1/reviews/create',
        withCredentials: true,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : JSON.stringify(data)
      };

      return axios.request(config)
      .then(response => JSON.stringify(response.data))
      .catch(e => {throw new Error("Error while creating the review: " + e.message)})
    }

    async function createAReview({title, description, stars, replyFromReviewId, productId, authorId}) {
      return await post({title, description, stars, replyFromReviewId, productId, authorId})
        .then(() => getReviews());
    }

    async function get() {

        try {
          const { data } = await axios.get('/v1/reviews/getAll', { withCredentials: true });

          if(!data.error) {
              setReviews(data); 
          }

      } catch (e) {
          console.log("Error: " + e.message);

          setReviews([]); 
      }

    }

    function getReviews() {
      get()
    }

    useEffect(getReviews, []);


  async function getReviewReply(idReview) {

    const {data} = await 
      axios.get(`/v1/reviews/${idReview}/replies`, { withCredentials: true })
      .catch(e => {throw new Error("Error while getting the review reply: " + e.message)});

    return data;

  }

  async function getProductReviews (idProd) {
    const {data} = await 
      axios.get(`/v1/products/${idProd}/reviews`, { withCredentials: true })
      .catch(e => {throw new Error("Error while getting the reviews of the product: " + e.message)});

    return data;
  }
    
    return {reviews, createAReview, getReviewReply, getProductReviews};
}
