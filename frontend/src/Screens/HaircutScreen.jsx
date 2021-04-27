import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { haircutItemDetails } from '../actions/haircutActions'

import Loader from '../Components/Loader'
import Message from '../Components/Message'

const HaircutScreen = ({ match }) => {

    const dispatch = useDispatch()

    const haircutDetails = useSelector(state => state.haircutDetails)
    const { loading, error, haircut } = haircutDetails

    useEffect(() => {
        dispatch(haircutItemDetails(match.params.id))
    }, [dispatch, match])

    return (
        <div className='pt-3'>
            
            {loading ? <Loader /> : error ? (<Message variant='danger'>{error}</Message>) : (
                <Container>
                    <Card id='title'>
                        <Card.Img variant='top' src={haircut.imageUrl} alt={haircut.name} />
                        <Card.Body>
                            <Card.Title>{haircut.name}</Card.Title>
                            <Card.Text>
                                <strong>Category: </strong>{haircut.category}
                            </Card.Text>
                            <Link to='/haircut' className='btn btn-dark py-3 rounded'>Back to Haircuts</Link>
                        </Card.Body>
                    </Card>
                </Container>

            )}
        </div>
    )
}

export default HaircutScreen
