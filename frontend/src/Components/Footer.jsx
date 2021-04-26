import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Footer = () => {
    return (
        <div>
            <Container id='footer'>
                <Row>
                    <Col>
                        <LinkContainer to='/makebooking'>
                            <Button variant='dark'>Make a booking!</Button>
                        </LinkContainer>
                    </Col>
                    <Col>
                        <LinkContainer to='/account'>
                            <Button variant='dark'>My Account</Button>
                        </LinkContainer>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Footer
