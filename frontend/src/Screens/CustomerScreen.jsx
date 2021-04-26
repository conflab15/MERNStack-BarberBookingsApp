import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, FormControl, Container, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader'
import { getCustomerDetails, customerLogin, logout } from '../actions/customerActions'
import { listBookings, personalBookingList, confirmBooking } from '../actions/bookingActions'

const CustomerScreen = ({ history }) => {

    const [forename, setForename] = useState('')
    const [surname, setSurname] = useState('')
    const [addressline1, setAddressLine1] = useState('')
    const [addressline2, setAddressLine2] = useState('')
    const [town, setTown] = useState('')
    const [postcode, setPostcode] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')

    const dispatch = useDispatch()

    const customerLogin = useSelector(state => state.customerLogin)
    const { customerInfo } = customerLogin

    const customerDetails = useSelector(state => state.customerDetails)
    const { loading, error, customer } = customerDetails

    const personalBookings = useSelector(state => state.personalBookings)
    const { bookingLoading, bookingError, bookings } = personalBookings

    const bookingList = useSelector(state => state.bookingList)
    const { allLoading, allError, allBookings } = bookingList

    const confirmNewBooking = useSelector(state => state.confirmBooking)
    const { success } = confirmNewBooking

    useEffect(() => {

        if (!customerInfo || error) {
            history.push('/login')
        }

        if (!customer || !customer.forename && customer.surname) {
            dispatch(getCustomerDetails('profile'))
        }
        else {
            setForename(customer.forename)
            setSurname(customer.surname)
            setAddressLine1(customer.AddressLine1)
            setAddressLine2(customer.AddressLine2)
            setTown(customer.town)
            setPostcode(customer.Postcode)
            setEmail(customer.Email)
            setMobile(customer.mobile)
        }

        if (customer) {
            dispatch(getCustomerDetails('profile'))
            dispatch(personalBookingList())
        }

        if (success) {
            dispatch(listBookings())
        }
    }, [dispatch, history, success])

    const ConfirmBooking = (booking) => {
        console.log(booking)
        dispatch(confirmBooking(booking))
    }

    return (
        <div>
            <Container>

                <Container id="title">
                    <h1 className="py-5 mt-5">My Account</h1>
                </Container>
                
                {loading && <Loader />}

                <Row>
                    <Col id="title">
                        <p><b>Customer: </b>{forename} {surname}</p>
                        <p><b>Email: </b>{email}</p>
                        <p><b>Mobile: </b>{mobile}</p>
                    </Col>
                </Row>
            </Container>

            
        </div>
    )
}

export default CustomerScreen
