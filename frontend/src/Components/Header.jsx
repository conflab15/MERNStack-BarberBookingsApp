import React from 'react'
import { Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <>

            <Navbar bg="dark" expand="lg" variant="dark" fixed="top">

                <Link to='/'>
                    <Navbar.Brand>Kaye the Barber</Navbar.Brand>
                </Link>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">

                        <Link to='/haircuts'>
                            <Nav.Link className='nav-item' href='/haircuts'>Haircuts</Nav.Link>
                        </Link>
                        <Link to='/reviews'>
                            <Nav.Link className='nav-item' href='/reviews'>Reviews</Nav.Link>
                        </Link>
                        <Link to='/login'>
                            <Nav.Link className='nav-item' href='/login'>My Account</Nav.Link>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <h1 className="py-5 mt-5">Kaye the Barber</h1>
        </>
    )
}

export default Header