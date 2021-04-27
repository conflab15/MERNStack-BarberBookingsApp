import React, { useEffect, useState } from 'react'
import { Row, Col, Container, Form, FormControl, Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../Components/FormContainer'
import Message from '../Components/Message'
import Loader from '../Components/Loader'

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

import { bookingByDay, createNewBooking } from '../actions/bookingActions'

const BookingScreen = () => {

    const [value, onChange] = useState(new Date())
    const [style, setStyle] = useState('')
    const [price, setPrice] = useState(15)
    const [name, setName] = useState('')
    const [bookingDate, setbookingDate] = useState('')
    const [bookingTime, setbookingTime] = useState('')

    //const slotTimes = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']

    const dispatch = useDispatch()

    const existingDayBooking = useSelector(state => state.existingDayBooking)
    const {loading, error, allBookings } = existingDayBooking

    useEffect(() => {

        if (value){
            let day = ("0" + value.getDate()).slice(-2)
            let month = ("0" + value.getMonth()+1).slice(-2)
            let date = `${value.getFullYear()}-${month}-${day}`
            
            setbookingDate(date);
            dispatch(bookingByDay(date))
        }

    }, [dispatch])

    const submitHandler = () => {
        
        setbookingDate(value)
        console.log(name, price, bookingTime, bookingDate, style)

        //Dispatch here!

    }

    return (
        <Container>
            <Container id='title'>
                <h1 className='py-5 mt-5'>Book an Appointment!</h1>
            </Container>
            
            <Container id='title'>
                <FormContainer>
                    <Form.Group controlId='name'>
                        <Form.Label className='large'>Name</Form.Label>
                        <FormControl
                            size='lg'
                            type='name'
                            placeholder='Enter name...'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></FormControl>
                    </Form.Group>
                    <Form.Group controlId='style'>
                        <Form.Label className='large'>Style of haircut?</Form.Label>
                        <FormControl
                            size='lg'
                            type='style'
                            placeholder='Enter Style...'
                            value={style}
                            onChange={(e) => setStyle(e.target.value)}
                        ></FormControl>
                    </Form.Group>
                    <Form.Group controlId='price' className='pb-1'>
                        <Form.Label className='large'>Booking Price: £</Form.Label>
                        <FormControl
                            size='lg'
                            type='number'
                            placeholder={price}
                            disabled
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        ></FormControl>
                    </Form.Group>

                    <DatePicker
                        className="w-100 py-3 pb-2"
                        value={value}
                        onChange={onChange}
                        minDate={new Date()}
                    />

                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th className='large' id='white'>Available Time Slots:</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allBookings.map((time) => {
                                <tr key={time}>
                                    <td><Button 
                                    variant='success'
                                    className='btn btn-rounded btn-block my-2'
                                    onClick={() => setbookingTime(time)}
                                    >
                                        {time}
                                    </Button>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </Table>

                    <Button
                    size='lg'
                    variant='success'
                    className='btn btn-block my-4 rounded'
                    onClick={submitHandler}
                    >
                        Book Appointment
                    </Button>

                </FormContainer>
            </Container>
        </Container>

    )
                    }

export default BookingScreen
