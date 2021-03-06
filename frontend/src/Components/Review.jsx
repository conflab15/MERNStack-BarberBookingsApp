import React from 'react'
import { Container, Card } from 'react-bootstrap'
import Star from './Star'

const Review = ({ review }) => {

    let items = []

    for (let i = 0; i < review.star_rating; i++) {
        items.push(<Star />)
    }

    return (
        <Container className="py-3">
            <Card className='text-center' id='haircutCard'>
                <Card.Header>
                   <p><b>{review.author}</b> : {review.date.slice(0,10)}</p>
                </Card.Header>
                <Card.Body>
                    <Card.Title>{review.title}</Card.Title>
                    <Card.Text>
                        <p>{review.description}</p>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    {items.map(item => (<div className="review-stars">{item}</div>))}
                </Card.Footer>
            </Card>

        </Container>
    )
}

export default Review
