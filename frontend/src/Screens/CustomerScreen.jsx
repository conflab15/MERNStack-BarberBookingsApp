import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, FormControl, Container, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { getCustomerDetails, customerLogin, logout } from '../actions/customerActions'
import { listBookings, personalBookingList, confirmBooking, completeBooking } from '../actions/bookingActions'

const CustomerScreen = ({ history }) => {

    const [forename, setForename] = useState('')
    const [surname, setSurname] = useState('')
    const [addressline1, setAddressLine1] = useState('')
    const [addressline2, setAddressLine2] = useState('')
    const [town, setTown] = useState('')
    const [postcode, setPostcode] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [isAdmin, setAdmin] = useState(false)

    const dispatch = useDispatch()

    //Get Customer Login Selector and State
    const customerLogin = useSelector(state => state.customerLogin)
    const { customerInfo } = customerLogin

    //Get Customer Details from useState
    const customerDetails = useSelector(state => state.customerDetails)
    const { loading, error, customer } = customerDetails

    //Get the Customers Bookings from useState
    const personalBookings = useSelector(state => state.personalBookings)
    const { bookingLoading, bookingError, bookings } = personalBookings

    //ADMIN useState : Gets ALL BOOKINGS from the db
    const bookingList = useSelector(state => state.bookingList)
    const { allLoading, allError, allbookings } = bookingList

    //ADMIN useState : Allows Admins to confirm a booking....
    const confirmNewBooking = useSelector(state => state.confirmBooking)
    const { success } = confirmNewBooking

    //ADMIN useState : Allows Admins to complete a booking....
    const completeNewBooking = useSelector(state => state.completeBooking)
    const { complete } = completeNewBooking

    useEffect(() => {

        if (!customerInfo || error) {
            history.push('/login')
        }

        if (!customer || !customer.forename) {
            dispatch(getCustomerDetails('profile'))
        }
        else {
            setForename(customer.forename)
            setSurname(customer.surname)
            setAddressLine1(customer.addressline1)
            setAddressLine2(customer.addressline2)
            setTown(customer.town)
            setPostcode(customer.postcode)
            setEmail(customer.email)
            setMobile(customer.mobile)
            setAdmin(customer.isAdmin)
        }

        if (customer) {
            if(customer.isAdmin) {
                dispatch(getCustomerDetails('profile'))
                dispatch(listBookings())
                setAdmin(true)
            }
            else {
                dispatch(getCustomerDetails('profile'))
                dispatch(personalBookingList())
                setAdmin(customer.isAdmin)
            }
        }

        if (success) {
            dispatch(listBookings())
        }

        if (complete) {
            dispatch(listBookings())
        }

    }, [dispatch, history, success, complete])

    //ADMIN USE: confirms the booking by changing it's boolean value through a reducer...
    const ConfirmBooking = (booking) => {
        console.log(booking)
        dispatch(confirmBooking(booking))
    }

    const CompleteBooking = (booking) => {
        console.log(booking)
        dispatch(completeBooking(booking))
    }

    return (
        <div>
            <Container>

                <Container id="title">
                    <h1 className="py-5 mt-5">My Account</h1>
                </Container>
                
                {loading && <Loader />}
                {error && <Message variant='danger'>{error}</Message>}

                <Row>
                    <Col id="title">
                        <p><b>Customer: </b>{forename} {surname}</p>
                        <p><b>Address: </b></p>
                        <p>{addressline1}</p>
                        <p>{addressline2}</p>
                        <p>{town}</p>
                        <p>{postcode}</p>
                        <p><b>Email: </b>{email}</p>
                        <p><b>Mobile: </b>{mobile}</p>
                    </Col>
                </Row>
            </Container>

            {!isAdmin ? (
                <Container>
                    <Container id="title">
                        <h1 className="py-5 mt-5">My Bookings</h1>
                    </Container>

                    {bookingLoading && <Loader />}
                    {bookingError && <Message variant='danger'>{bookingError}</Message>}

                    <Table striped bordered hover responsive className='table-lg' id='bookingTable'>
                        <thead>
                            <tr>
                                <th>Booking Ref</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Haircut Style</th>
                                <th>Price</th>
                                <th>Confirmed?</th>
                                <th>Paid?</th>
                                <th>Completed?</th>
                            </tr>
                        </thead>
                        {bookings && 
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking._id}>
                                    <td>{booking._id.slice(-5)}</td>
                                    <td>{booking.bookingDate}</td>
                                    <td>{booking.bookingTime}</td>
                                    <td>{booking.style}</td>
                                    <td>{booking.price}</td>
                                    <td>{booking.isConfirmed ? <p>YES</p> : <p>NO</p>}</td>
                                    <td>{booking.isPaid ? <p>YES</p> : <p>NO</p>}</td>
                                    <td>{booking.isComplete ? <p>YES</p> : <p>NO</p>}</td>
                                </tr>
                            ))}
                        </tbody>
                        }
                    </Table>
                </Container>
            ) : (
                <Container>
                    <h1>ADMIN DASHBOARD: ALL BOOKINGS</h1>
                    {allLoading && <Loader />}
                    {allError && <Message variant="danger">{allError}</Message>}

                    <Table striped borderd hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>Booking Ref</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Style</th>
                                <th>Price</th>
                                <th>Confirmed</th>
                                <th>Paid</th>
                                <th>Complete</th>
                                <th>Confirm?</th>
                                <th>Paid?</th>
                                <th>Complete?</th>
                            </tr>
                        </thead>
                        {allbookings && 
                        <tbody>
                            {allbookings.map((booking) => (
                                <tr key={booking._id}>
                                    <td>{booking._id.slice(-5)}</td>
                                    <td>{booking.bookingDate}</td>
                                    <td>{booking.bookingTime}</td>
                                    <td>{booking.style}</td>
                                    <td>{booking.price}</td>
                                    <td>{booking.isConfirmed ? <p>YES</p> : <p>NO</p>}</td>
                                    <td>{booking.isPaid ? <p>YES</p> : <p>NO</p>}</td>
                                    <td>{booking.isComplete ? <p>YES</p> : <p>NO</p>}</td>
                                    <td><Button onClick={() => ConfirmBooking(booking)} className="btn btn-block btn-success">Confirm?</Button></td>
                                    <td><Button onClick="" className="btn btn-block btn-primary">Paid?</Button></td>
                                    <td><Button onClick={() => CompleteBooking(booking)} className="btn btn-block btn-danger">Complete?</Button></td>
                                </tr>
                            ))}
                        </tbody>
                        }
                    </Table>
                </Container>
            )} 
        </div>
    )
}

export default CustomerScreen
