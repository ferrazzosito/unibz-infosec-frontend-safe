import { useState, useEffect } from 'react';
import {client as axios} from '../utils/axios'

/**
 * This custom hook handles everything that concerns the reviews
 */
export function useReviews (token) {

    const [reviews, setReviews] = useState([]);

    // async function postCreateQuery({query}) {
    //   return axios.post('/v1/reviews/search',  {
    //           query: query
    //       },
    //       { 
    //           headers: {"Authorization" : `Bearer ${token}`} 
    //       })
    //       .then(message => message)
    //       .catch((e) => {throw new Error(e.message)});
    //   }

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

    /**
     * Allows to create a review
     * 
     * @param title title of the review
     * @param description description of the review
     * @param stars number of stars inserted
     * @param replyFromReviewId says the the id of the review, which this review is a reply of. If the 
     *    current review is not a reply of anything, then this id must be 0
     * @param productId id of the product, this review is referring to
     * @param authorId id of the write of the review
     */
    async function createAReview({title, description, stars, replyFromReviewId, productId, authorId}) {
      return await post({title, description, stars, replyFromReviewId, productId, authorId})
        .then(() => getReviews());
    }

    async function get() {

        try {
          const { data } = await axios.get('/v1/reviews/getAll', { headers: {"Authorization" : `Bearer ${token}`} });

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


    /**
   * It gets all the replies of a certain review
   */
  async function getReviewReply(idReview) {

    const {data} = await 
      axios.get(`/v1/reviews/${idReview}/replies`, { headers: {"Authorization" : `Bearer ${token}`} })
      .catch(e => {throw new Error("Error while getting the review reply: " + e.message)});

    return data;

  }

  /**
 * It gets all the reviews of a product
 */
  async function getProductReviews (idProd) {
    const {data} = await 
      axios.get(`/v1/products/${idProd}/reviews`, { headers: {"Authorization" : `Bearer ${token}`} })
      .catch(e => {throw new Error("Error while getting the reviews of the product: " + e.message)});

    return data;
  }
    
    return {reviews, createAReview, getReviewReply, getProductReviews};
}
