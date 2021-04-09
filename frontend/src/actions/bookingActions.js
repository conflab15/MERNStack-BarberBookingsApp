import axios from 'axios'

export const bookingDetails = (id) => async (dispatch) => {
    
    try {
        dispatch({type: 'BOOKING_REQUEST'})

        const {data} = await axios.get(`/api/bookings/${id}`)

        dispatch({type: 'BOOKING_SUCCESS', payload: data})
    }
    catch(error){
        dispatch({
            type: 'BOOKING_FAIL',
            payload: error.message
        })
    }
}