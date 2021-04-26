import React from 'react'
import { Jumbotron, Container, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import bgImage from '../images/barberimg.jpg'

const LandingScreen = () => {
    return (
        <div>
            <Container id='title'>
                <h1 className="py-5 mt-5">kaye the barber</h1>
            </Container>

            <Container className='pt-4 pb-1' id='title'>
                <Jumbotron style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }}>
                    <h1 id='white'>Kaye the Barber</h1>
                    <br></br>
                    <br></br>
                    <p id='white'>
                        Barber based in Taunton, Somerset!
                </p>
                <br></br>
                <br></br>
                    <p>
                        <LinkContainer to='/reviews'>
                            <Button variant="primary">Check out some reviews!</Button>
                        </LinkContainer>
                    </p>
                </Jumbotron>
            </Container>

            <Container id='title'>
                <LinkContainer to='/makebooking'>
                    <h1 className="py-5 mt-5">Make a Booking</h1>
                </LinkContainer>
            </Container>
        </div>
    )
}

export default LandingScreen
