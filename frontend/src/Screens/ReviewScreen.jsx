import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'
import Review from '../Components/Review'

const ReviewScreen = () => {

    const [reviews, setReviews] = useState([])

    useEffect(() => {
        console.log("Fetching Reviews Actioned!")
        const FetchReviews = async () => {
            const { data } = await axios.get('/api/reviews')

            setReviews(data)
        }
        FetchReviews()
    }, [])

    return (
        <div>
            <h2>Reviews of Kaye the Barber</h2>
            <Row>
                {reviews.map(review => (
                    <Col sm={12} md={6} lg={4}>
                        <Review review={review} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default ReviewScreen
