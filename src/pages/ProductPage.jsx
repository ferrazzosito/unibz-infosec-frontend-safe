import { Grid } from "@mui/material";
import { BasicProductCard, ReviewCard } from "../fragments/ProductCards";
import { Title } from "../components/Typography";
import { ReviewForm } from "../fragments/Forms";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../hooks/useUser";
import { useReviews } from "../hooks/useReviews";

const Review = ({id, title, description, stars, author, replyFromReviewId, productId}) =>  {

    const {user, logUser, registerUser, logout} = useContext(authContext); 

    const authorId = user.payload.id;
    
    const {getReviewReply} = useReviews(user.accessToken);

    const {createAReview} = useReviews(user.accessToken);

    const [reply, setReply] = useState();


    const getReplyOfAReview = () => {

        getReviewReply(id)
        .then(result => {
                if(!result || result.length === 0)
                    setReply()
                else {
                    //TO CHANGE THIS IF RESULT IS NOT AN ARRAY ANYMORE
                    const [res1 ] = result;
                    setReply(res1);
                }
        })
        .catch((e) => {setReply(); console.log(e.message)});

    }

    useEffect(getReplyOfAReview, []);

    return  (
        <>
            <Grid item container xs={9} spacing={7} justifyContent="center" >
                <Grid item xs={12}>
                    <ReviewCard 
                        rating = {`${stars} stars`}
                        title = {title} 
                        writer= {author} 
                        description= {description}                        
                        answer={

                                !reply ?  

                                    user.payload.role === "vendor" ? 
                                    <ReviewForm header="Answer to client's review" 
                                        replyFromReviewId={id} 
                                        isReply={true}
                                        onSubmitForm={(review) => {createAReview({...review, productId, authorId})
                                                                .then((resp) => getReplyOfAReview())}}
                                    /> 
                                    : <></>

                                :
                                <ReviewCard 
                                    title = {reply.title} 
                                    writer= {reply.author} 
                                    description= {reply.description}              
                                />
                            }
                    />
                </Grid>
            </Grid>
        </>
    )
}



const ProductPage = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get("id");


    const {user, findUser} = useContext(authContext);    
    const {getProduct} = useProducts(user.accessToken);

    const [product, setProduct] = useState({});

    const {reviews, createAReview} = useReviews(user.accessToken);

    const authorId = user.payload.id;
    const productId = id;

    useEffect(() => {

        getProduct(id)
        .then((result) => setProduct(result))
        .catch(e => setProduct({}));
        
    }, [id])

    return (
        <Grid container justifyContent="center" spacing={7} >
            <Grid item xs={12}>
                <Title text="Product" />
            </Grid>
            <Grid item container xs={9} spacing={7} justifyContent="center" >
                <Grid item xs={3}>
                    <BasicProductCard  name={product.name}  vendorId = {product.vendorId} price={product.cost} />
                </Grid>
            </Grid>
            <Grid item container xs={12} justifyContent="center">
                <Grid item  xs={9} >
                    {
                        user.payload.role === "customer" ?
                        <ReviewForm header="Add a review to this product" replyFromReviewId={0} onSubmitForm={(review) => createAReview({...review, productId, authorId})} />
                        : <></>
                    }
                </Grid>
            </Grid>
            <Grid item container xs={12} justifyContent="center">
                
                {

                    reviews.length !== 0 ?

                        //they are filtered such that we take at first only the reviews which are not answers of other reviews
                        reviews.filter(rev => rev.replyFromReviewId === 0).map((review) => (
                            <Review 
                                id = {review.id}
                                title = {review.title}
                                description = {review.description}
                                stars={review.stars}
                                author={review.author}
                                replyFromReviewId = {review.replyFromReviewId}
                                productId = {productId}
                            />
                        ))
                    
                    : <h1 style={{marginTop: "40px"}}>No Reviews To Display</h1>
                }
            </Grid>

            {/* <Review />
            <Review /> */}
        </Grid>
    )

}


export default ProductPage;