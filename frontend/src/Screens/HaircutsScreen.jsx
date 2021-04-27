import React, { useEffect } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import Haircut from '../Components/Haircut'
import { useDispatch, useSelector } from 'react-redux'
import { listHaircuts } from '../actions/haircutActions'

import Message from '../Components/Message'
import Loader from '../Components/Loader'

import fade from '../images/fade.jpg'

const HaircutsScreen = () => {

    const dispatch = useDispatch()

    const haircutList = useSelector(state => state.haircutList)
    const { loading, error, haircuts } = haircutList

    useEffect(() => {

        dispatch(listHaircuts())

    }, [dispatch])

    return (
        <div>
            <Container id='title'>
                <h1 className='py-5 my-5'>Haircuts</h1>
            </Container>
            

            {loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) : (

                <Row>
                    {haircuts.map(haircut => 
                        <Col sm={12} md={6} lg={4}>
                            <Haircut haircut={haircut} />
                        </Col>
                    )}
                </Row>
            )}
        </div>
    )
}

export default HaircutsScreen
