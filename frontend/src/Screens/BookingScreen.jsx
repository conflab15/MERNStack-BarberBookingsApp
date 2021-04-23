import React, { useEffect, useState } from 'react'
import { Row, Col, Container, Form, FormControl, Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../Components/FormContainer'

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

import Message from '../Components/Message'
import Loader from '../Components/Loader'

const BookingScreen = () => {

    const [value, onChange] = useState(new Date())
    const [style, setStyle] = useState('')
    const [price, setPrice] = useState(15)
    const [name, setName] = useState('')
    const [bookingDate, setbookingDate] = useState('')
    const [bookingTime, setbookingTime] = useState('')

    const slotTimes = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']

    const dispatch = useDispatch()

    useEffect(() => {

        //Login Functionality here

    }, [dispatch])

    const submitHandler = () => {
        
        setbookingDate(value)
        console.log(name, price, bookingTime, bookingDate, style)

        //Dispatch here!

    }

    return (
        <Container>
            <h1>Book an Appointment!</h1>

            <FormContainer>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <FormControl
                        type='name'
                        placeholder='Enter name...'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></FormControl>
                </Form.Group>
                <Form.Group controlId='style'>
                    <Form.Label>Style</Form.Label>
                    <FormControl
                        type='style'
                        placeholder='Enter Style...'
                        value={style}
                        onChange={(e) => setStyle(e.target.value)}
                    ></FormControl>
                </Form.Group>
                <Form.Group controlId='price'>
                    <Form.Label>Booking Price: £</Form.Label>
                    <FormControl
                        type='disabled'
                        placeholder={price}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    ></FormControl>
                </Form.Group>

                <DatePicker
                    className="w-100 py-3"
                    value={value}
                    onChange={onChange}
                    minDate={new Date()}
                />

                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>Available Time Slots:</th>
                        </tr>
                    </thead>
                    <tbody>
                        {slotTimes.map((time) => {
                            <tr key={time}>
                                <td><Button variant='success'
                                className='btn btn-rounded btn-block my-2'
                                onClick={() => setbookingTime(time)}
                                >{time}</Button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </Table>

                <Button
                variant='warning'
                className='btn btn-block my-4 rounded'
                onClick={submitHandler}
                >
                    Book Appointment
                </Button>

            </FormContainer>
        </Container>
    )
}

export default BookingScreen
