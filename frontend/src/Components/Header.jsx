import React from 'react'
import { Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/customerActions'
import { useDispatch, useSelector } from 'react-redux'

const Header = ({match, history}) => {

    const dispatch = useDispatch()

    const customerLogin = useSelector(state => state.customerLogin)
    const { customerInfo } = customerLogin
    const logoutHandler = () => {
        console.log('Logging out customer!')
        dispatch(logout())
    }

    return (
        <>
            <Navbar bg="dark" expand="lg" variant="dark" fixed="top">
                <LinkContainer to='/'>
                    <Navbar.Brand>Kaye the Barber</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">

                    <LinkContainer to='/haircut'>
                        <Nav.Link className='nav-item'>Haircuts</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/reviews'>
                        <Nav.Link className='nav-item' >Reviews</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/login'>
                        <Nav.Link className='nav-item'>My Account</Nav.Link>
                    </LinkContainer>
                    </Nav>

                    {customerInfo && <LinkContainer to='/'><Button className='btn btn-primary mx-3' onClick={logoutHandler}>Logout</Button></LinkContainer>}

                </Navbar.Collapse>
            </Navbar>
            <h1 className="py-5 mt-5">Kaye the Barber</h1>
        </>
    )
}

export default Header