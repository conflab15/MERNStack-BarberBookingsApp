export const bookingListReducer = (state = {allbookings: []}, action) =>{

    switch(action.type){
        case 'BOOKING_LIST_REQUEST':
            return {loading:true, allbookings:[]}
        case 'BOOKING_LIST_SUCCESS':
            return {loading:false, allbookings: action.payload}
        case 'BOOKING_LIST_FAIL':
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const personalBookingsReducer = (state = {bookings: []}, action) =>{

    switch(action.type){
        case 'PERSONAL_BOOKING_LIST_REQUEST':
            return {loading:true, bookings:[]}
        case 'PERSONAL_BOOKING_LIST_SUCCESS':
            return {loading:false, bookings: action.payload}
        case 'PERSONAL_BOOKING_LIST_FAIL':
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const createBookingReducer = (state = {booking: {}}, action) =>{

    switch(action.type){
        case 'CREATE_BOOKING_REQUEST':
            return {loading:true, booking:{}}
        case 'CREATE_BOOKING_SUCCESS':
            return {loading:false, booking: action.payload}
        case 'CREATE_BOOKING_FAIL':
            return {loading: false, error: action.payload}
        default:
            return state
    }
}


export const bookingByDayReducer = (state = {bookings: []}, action) =>{

    switch(action.type){
        case 'BOOKING_DAY_LIST_REQUEST':
            return {loading:true, bookings:[]}
        case 'BOOKING_DAY_LIST_SUCCESS':
            return {loading:false, bookings: action.payload}
        case 'BOOKING_DAY_LIST_FAIL':
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const bookingConfirmReducer = (state = {}, action) =>{

    switch(action.type){
        case 'CREATE_BOOKING_REQUEST':
            return {loading:true}
        case 'CREATE_BOOKING_SUCCESS':
            return {loading:false, success:true}
        case 'CREATE_BOOKING_FAIL':
            return {loading: false, error: action.payload}
        case 'CREATE_BOOKING_RESET':
            return {}
        default:
            return state
    }
}