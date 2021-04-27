import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, FormControl, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { login } from '../actions/customerActions'
import Loader from '../Components/Loader'
import FormContainer from '../Components/FormContainer'

const LoginScreen = ({ location, history }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const customerLogin = useSelector(state => state.customerLogin)
    const { loading, error, customerInfo } = customerLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (customerInfo && !customerInfo.message) {
            history.push('/')
        }
    }, [history, customerInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <div>
            <Container id='title'>
                <h1 className='py-5 mt-5'>Sign In</h1>
            </Container>

            <Container id='signInForm'>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <FormControl
                            type='email'
                            placeholder='Please enter your email...'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></FormControl>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <FormControl
                            type='password'
                            placeholder='Please enter your password...'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></FormControl>
                    </Form.Group>
                    <Button
                        size='lg'
                        type='submit'
                        variant='primary'
                    >Sign In</Button>
                    {loading && <Loader />}
                </Form>
                <Row className='py-3'>
                    <Col>
                        Are you a new client? <Link to={redirect ? `/register?redirect=$redirect` : '/register'}>Sign up here!</Link>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default LoginScreen
