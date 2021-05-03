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
        case 'CONFIRM_BOOKING_REQUEST':
            return {loading:true}
        case 'CONFIRM_BOOKING_SUCCESS':
            return {loading:false, success:true}
        case 'CONFIRM_BOOKING_FAIL':
            return {loading: false, error: action.payload}
        case 'CONFIRM_BOOKING_RESET':
            return {}
        default:
            return state
    }
}

export const bookingCompleteReducer = (state = {}, action) => {

    switch(action.type){
        case 'COMPLETE_BOOKING_REQUEST':
            return {loading: true}
        case 'COMPLETE_BOOKING_SUCCESS':
            return {loading: false, complete:true}
        case 'COMPLETE_BOOKING_FAIL':
            return {loading: false, error: action.payload}
        case 'COMPLETE_BOOKING_RESET':
            return {}
        default:
            return state
    }
}

export const bookingDeleteReducer = (state = {}, action) => {

    switch(action.type){
        case 'DELETE_BOOKING_REQUEST':
            return {loading: true}
        case 'DELETE_BOOKING_SUCCESS':
            return {loading: false, deleted:true}
        case 'DELETE_BOOKING_FAIL':
            return {loading: false, error: action.payload}
        case 'DELETE_BOOKING_RESET':
            return {}
        default:
            return state
    }


}