import React, { useEffect } from 'react'
import FormImpl from 'react-bootstrap/esm/Form'
import { Link } from 'react-router-dom'
import { Row, Col, Image, Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap'

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
        <div>
            <Link to='/haircut' className='btn btn-dark py-3'>Back to Haircuts</Link>

            {loading ? <Loader /> : error ? (<Message variant='danger'>{error}</Message>) : (
                <Row>
                    <Col md={6}>
                        <Image className='py-2 w-100' src={haircut.imageUrl} alt={haircut.name} variant='flush' />
                    </Col>
                    <Col md={3}>
                        <ListGroup>
                            <ListGroupItem>
                                <h2>{haircut.name}</h2>
                            </ListGroupItem>
                            <ListGroupItem>
                                <h2>{haircut.price}</h2>
                            </ListGroupItem>
                            <ListGroupItem>
                                <h2><strong>Category:</strong>{haircut.category}</h2>
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col><strong>£{haircut.price}</strong></Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Button
                                        className='btn-block'
                                        type='btn'
                                    >Book Haircut!</Button>
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}
        </div>
    )
}

export default HaircutScreen
