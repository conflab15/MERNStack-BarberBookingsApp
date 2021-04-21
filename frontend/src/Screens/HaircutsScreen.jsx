import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Haircut from '../Components/Haircut'
import { useDispatch, useSelector } from 'react-redux'
import { listHaircuts } from '../actions/haircutActions'

import Message from '../Components/Message'
import Loader from '../Components/Loader'

const HaircutsScreen = () => {

    const dispatch = useDispatch()

    const haircutList = useSelector(state => state.haircutList)
    const { loading, error, haircuts } = haircutList

    useEffect(() => {

        dispatch(listHaircuts())

    }, [dispatch])

    return (
        <div>
            <h2>Haircuts</h2>
            {loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) : (

                <Row>
                    {haircuts.map(haircut => (
                        <Col sm={12} md={6} lg={4}>
                            <Haircut haircut={haircut} />
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    )
}

export default HaircutsScreen
