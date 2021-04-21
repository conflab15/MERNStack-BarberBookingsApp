import React from 'react'
import { Jumbotron, Container, Row, Col, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'



const LandingScreen = () => {
    return (
        <div>
            <Container>
                <Jumbotron>
                    <h1>Kaye the Barber</h1>
                    <p>
                        Barber based in Taunton, Somerset!
                </p>
                    <p>
                        <LinkContainer to='/reviews'>
                            <Button variant="primary">Check out some reviews!</Button>
                        </LinkContainer>
                    </p>
                </Jumbotron>
            </Container>
        </div>
    )
}

export default LandingScreen
