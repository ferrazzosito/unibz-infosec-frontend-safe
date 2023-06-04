import { Grid } from "@mui/material";
import { BasicProductCard, ReviewCard } from "../fragments/ProductCards";
import { Title } from "../components/Typography";
import { ReviewForm } from "../fragments/Forms";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../hooks/useUser";
import { useReviews } from "../hooks/useReviews";

const Review = ({id, title, description, stars, author, replyFromReviewId}) =>  {

    const {user, logUser, registerUser, logout} = useContext(authContext);    

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
                                replyFromReviewId === 0 ?
                                    user.payload.role === "vendor" ? 
                                        <ReviewForm header="Answer to client's review" replyFromReviewId={id} isReply={true}/> 
                                        : <></>
                                    :
                                <></>
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


    const {user} = useContext(authContext);    
    const {getProduct} = useProducts(user.accessToken);

    const [product, setProduct] = useState({});

    const {reviews, createAReview} = useReviews(user.accessToken);

    const authorId = user.payload.id;
    const productId = id;

    useEffect(() => {

        getProduct(id)
        .then((result) => setProduct(result))
        .catch(e => setProduct({}));
        
    }, [])

    return (
        <Grid container justifyContent="center" spacing={7} >
            <Grid item xs={12}>
                <Title text="Product" />
            </Grid>
            <Grid item container xs={9} spacing={7} justifyContent="center" >
                <Grid item xs={3}>
                    <BasicProductCard type="" name={product.name} description="" price={product.cost} />
                </Grid>
            </Grid>
            {
                user.payload.role === "customer" ?
                <ReviewForm header="Add a review to this product" replyFromReviewId={0} onSubmitForm={(review) => createAReview({...review, productId, authorId})} />
                : <></>
            }
            
            {
                reviews.map((review) => (
                    <Review 
                        id = {review.id}
                        title = {review.title}
                        description = {review.description}
                        stars={review.stars}
                        author={review.author}
                        replyFromReviewId = {review.replyFromReviewId}
                    />
                ))
            }

            {/* <Review />
            <Review /> */}
        </Grid>
    )

}


export default ProductPage;