import React, { useEffect, useState } from 'react'
import FormContainer from '../Components/FormContainer'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, FormControl } from 'react-bootstrap'

//Imports for registration functionality
import { useDispatch, useSelector } from 'react-redux'
import { register, logout } from '../actions/customerActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message'


const RegisterScreen = ({ history }) => {

    const [forename, setForename] = useState('')
    const [surname, setSurname] = useState('')
    const [addressline1, setAddressLine1] = useState('')
    const [addressline2, setAddressLine2] = useState('')
    const [town, setTown] = useState('')
    const [postcode, setPostcode] = useState('')
    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const customerRegister = useSelector(state => state.customerRegister)
    const { loading, error, customerInfo } = customerRegister

    useEffect(() => {
        if (customerInfo) {
            history.push('/account')
        }
    }, [history, customerInfo])

    const submitHandler = (e) => {

        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Error: Passwords do not match!')
        } else {
            dispatch(register(forename, surname, addressline1, addressline2, town, postcode, email, password, confirmPassword))
        }

    }

    return (
        <div>
            <FormContainer>
                <h1 className='py-3'>Register!</h1>
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                {message && <Message variant='info'>{message}</Message>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='forename'>
                        <Form.Label>Forename</Form.Label>
                        <FormControl
                        type='forename'
                        placeholder='Enter your forename...'
                        value={forename}
                        onChange={(e) => setName(e.target.value)}
                        ></FormControl>
                    </Form.Group>
                    <Form.Group controlId='surname'>
                        <Form.Label>Surname</Form.Label>
                        <FormControl
                        type='surname'
                        placeholder='Enter your surname...'
                        value={surname}
                        onChange={(e) => setName(e.target.value)}
                        ></FormControl>
                    </Form.Group>
                    <Form.Group controlID='addressline1'>
                        <Form.Label>Address Line 1</Form.Label>
                        <FormControl
                        type='addressline1'
                        placeholder='Enter the first line of your address...'
                        value={addressline1}
                        onChange={(e) => setName(e.target.value)}
                        ></FormControl>
                    </Form.Group>
                    <Form.Group controlId='addressline2'>
                        <Form.Label>Address Line 2</Form.Label>
                        <FormControl
                        type='addressline2'
                        placeholder='Enter the second line of your address...'
                        value={addressline2}
                        onChange={(e) => setName(e.target.value)}
                        ></FormControl>
                    </Form.Group>
                    <Form.Group controlId='town'>
                        <Form.Label>Town</Form.Label>
                        <FormControl
                        type='town'
                        placeholder='Enter the town of your address...'
                        value={town}
                        onChange={(e) => setName(e.target.value)}
                        ></FormControl>
                    </Form.Group>
                    <Form.Group controlId='postcode'>
                        <Form.Label>Post Code</Form.Label>
                        <FormControl
                        type='postcode'
                        placeholder='Enter the post code of your address...'
                        value={postcode}
                        onChange={(e) => setName(e.target.value)}
                        ></FormControl>
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <FormControl
                        type='email'
                        placeholder='Enter your email address...'
                        value={email}
                        onChange={(e) => setName(e.target.value)}
                        ></FormControl>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <FormControl
                        type='password'
                        placeholder='Enter your password...'
                        value={password}
                        onChange={(e) => setName(e.target.value)}
                        ></FormControl>
                    </Form.Group>
                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <FormControl
                        type='confirmPassword'
                        placeholder='Enter your password again...'
                        value={confirmPassword}
                        onChange={(e) => setName(e.target.value)}
                        ></FormControl>
                    </Form.Group>
                    <Button
                        type='submit'
                        variant='primary'
                        className='btn btn-block btn-success rounded'
                    >Register</Button>
                </Form>
                <Row className='py-3'>
                    <Col>
                        Have an account? <Link to="/login">Sign in!</Link>
                    </Col>
                </Row>
            </FormContainer>
        </div>
    )
}

export default RegisterScreen
