import { useState, useEffect } from 'react';
import {client as axios} from '../utils/axios'

export function useReviews (token) {

    //I should do an if so that if the role is vendor, in products there's only vendor products, otherwise, all products
    //as well as setProducts for clients should be disabled
    const [reviews, setReviews] = useState([]);


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
        headers: { 
          'Content-Type': 'application/json',
          "Authorization" : `Bearer ${token}`
        },
        data : JSON.stringify(data)
      };

      return axios.request(config)
      .then(response => JSON.stringify(response.data))
      .catch(e => {throw new Error("Error while creating the review: " + e.message)})
    }

    function createAReview({title, description, stars, replyFromReviewId, productId, authorId}) {
      return post({title, description, stars, replyFromReviewId, productId, authorId})
        .then(() => getReviews());
    }

    async function get() {

        const { data } = await axios.get('/v1/reviews/getAll', { headers: {"Authorization" : `Bearer ${token}`} });

        if(!data.error) {
            setReviews(data); 
        }

    }

    function getReviews() {
      get()
    }

    useEffect(getReviews, []);
    
    return {reviews, createAReview};
}