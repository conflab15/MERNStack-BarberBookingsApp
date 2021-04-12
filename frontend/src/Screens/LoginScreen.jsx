import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-bootstrap-router'
import { Form, Button, Row, Col, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { login } from '../actions/customerActions'
import Loader from '../Components/Loader'

const LoginScreen = ({ location, history }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const customerLogin = useSelector(state => state.customerLogin)
    const { loading, error, customerInfo } = customerLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (customerInfo && !customerInfo.message){
             history.push('/')
        }
    }, [history, customerInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h1 className='py-3'>Sign In</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    
                </Form.Group>
            </Form>
        </FormContainer>
    )
}

export default LoginScreen
