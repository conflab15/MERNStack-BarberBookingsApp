import React from 'react'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'

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
                        <ListGroup.Item>Cras justo odio</ListGroup.Item>
                        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Footer
