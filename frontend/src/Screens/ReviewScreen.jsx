import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Review from '../Components/Review'

import { useDispatch, useSelector } from 'react-redux'
import { listReviews } from '../actions/reviewActions'

import Loader from '../Components/Loader'
import Message from '../Components/Message'

const ReviewScreen = () => {

    const dispatch = useDispatch()

    const reviewList = useSelector(state => state.reviewList)
    const { loading, error, reviews } = reviewList

    useEffect(() => {

        dispatch(listReviews())

    }, [dispatch])

    return (
        <div>
            <Container id='title'>
                <h1 className="py-5 mt-5">Reviews</h1>
            </Container>
            

            {loading ? (<Loader/>) : error ? (<Message variant='danger'>{error}</Message>) : (

            <Row>
                {reviews.map(review => (
                    <Col sm={12} md={6} lg={4}>
                        <Review review={review} />
                    </Col>
                ))}
            </Row>

            )}
        </div>
    )
}

export default ReviewScreen
