import React from 'react'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Footer = () => {
    return (
        <>
            <Container fluid>
                <Row>
                    <Col>
                        <p className="py-3">Kaye the Barber - Copyright 2021</p>
                    </Col>
                    <Col>
                    <ListGroup>
                        <LinkContainer to='/haircut'>
                            <ListGroup.Item>Haircuts</ListGroup.Item>
                        </LinkContainer>
                        <LinkContainer to='/reviews'>
                            <ListGroup.Item>Reviews</ListGroup.Item>
                        </LinkContainer>
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Footer
