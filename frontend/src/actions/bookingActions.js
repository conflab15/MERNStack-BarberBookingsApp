import axios from 'axios'

export const listBookings = () => async (dispatch, getState) => {

    try {
        dispatch({type: 'BOOKING_LIST_REQUEST'})

        const {customerLogin: {customerInfo}} = getState()

        const config = {
                headers:{
                    Authorization: customerInfo.token
                }
            }

        const {data} = await axios.get('/api/bookings', config)

        dispatch({type: 'BOOKING_LIST_SUCCESS', payload: data})
    }
    catch(error){
        dispatch({
            type: 'BOOKING_LIST_FAIL',
            payload: error.message
        })
    }
}

export const personalBookingList = () => async (dispatch, getState) => {
    
    try {
        dispatch({type: 'PERSONAL_BOOKING_LIST_REQUEST'})

        const {customerLogin: {customerInfo}} = getState()

        const config = {
            headers: {
                Authorization: customerInfo.token
            }
        }

        const {data} = await axios.get('/api/bookings/personalbookings', config)

        dispatch({type: 'PERSONAL_BOOKING_LIST_SUCCESS', payload: data})
    }
    catch(error){
        //Pass an error message to the state
        dispatch({
            type: 'PERSONAL_BOOKING_LIST_FAIL',
            payload: error.message
        })

    }
}

export const createNewBooking = (style, bookingTime, bookingDate, price) => async (dispatch, getState) =>{

    try{
        dispatch({type: 'CREATING_BOOKING_REQUEST'})

        const {customerLogin:{customerInfo}} = getState() //Retrieving the active customer

        const config = {
            headers:{
                Authorization: customerInfo.token //Token to authorize the session through JWT
            }
        }
        
        //Fetching data from the API, not all booking data is here because it is auto assigned as false for some properties...
        const {data} = await axios.post('/api/bookings/create',{style, bookingTime, bookingDate, price}, config)

        //The response from this action is being populated into a payload
        dispatch({type: 'CREATING_BOOKING_SUCCESS', payload: data})
    }
    catch(error){
        //Sending an error message
        dispatch({
            type: 'CREATING_BOOKING_FAIL',
            payload: error.message
        })
    }
}

export const confirmBooking = (booking) => async (dispatch, getState) =>{

    try{
        dispatch({type: 'CONFIRM_BOOKING_REQUEST'})

        const {customerLogin:{customerInfo}} = getState()

        const config = {
            headers:{
                Authorization: customerInfo.token
            }
        }

        const {data} = await axios.put(`/api/bookings/${booking._id}`,{booking}, config)

        dispatch({type: 'CONFIRM_BOOKING_SUCCESS', payload: data})
    }
    catch(error){
        dispatch({
            type: 'CONFIRM_BOOKING_FAIL',
            payload: error.message
        })
    }
}

export const completeBooking = (booking) => async (dispatch, getState) => {

    try {
        dispatch({type: 'COMPLETE_BOOKING_REQUEST'})

        const {customerLogin:{customerInfo}} = getState()

        const config = {
            headers:{
                Authorization: customerInfo.token
            }
        }

        const {data} = await axios.put(`/api/bookings/complete/${booking._id}`, {booking}, config)

        dispatch({type: 'COMPLETE_BOOKING_SUCCESS', payload: data})
    }
    catch(error){
        dispatch({
            type: 'COMPLETE_BOOKING_FAIL',
            payload: error.message
        })
    }

}

export const deleteBooking = (booking) => async (dispatch, getState) => { 

    try {
        dispatch({type: 'DELETE_BOOKING_REQUEST'})

        const {customerLogin:{customerInfo}} = getState()

        const config = {
            headers:{
                Authorization: customerInfo.token
            }
        }
        const {data} = await axios.delete(`/api/booking/delete/${booking._id}`, {booking}, config)

        dispatch({type: 'DELETE_BOOKING_SUCCESS', payload: data})

        }

    catch(error){
        
        dispatch({
            type: 'DELETE_BOOKING_FAIL',
            payload: error.message
        })
    }
}

export const bookingByDay = (date) => async (dispatch, getState) =>{

    try{
        dispatch({type: 'BOOKING_DAY_LIST_REQUEST'})

        const {customerLogin:{customerInfo}} = getState()

        const config = {
            headers:{
                Authorization: customerInfo.token
            }
        }

        const {data} = await axios.get(`/api/bookings/day/${date}`, config)

        dispatch({type: 'BOOKING_DAY_LIST_SUCCESS', payload: data})
    }
    catch(error){
        dispatch({
            type: 'BOOKING_DAY_LIST_FAIL',
            payload: error.message
        })
    }

}