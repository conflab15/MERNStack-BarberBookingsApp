import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { haircutListReducer, haircutDetailsReducer } from './reducers/haircutReducers'
import {customerLoginReducer, customerDetailsReducer, customerRegisterReducer} from './reducers/customerReducers'
import { bookingByDayReducer, bookingConfirmReducer, bookingListReducer, createBookingReducer, personalBookingsReducer } from './reducers/bookingReducers'
import { reviewListReducer } from './reducers/reviewReducers'

//Use Reducers
const reducer = combineReducers({
    haircutList:haircutListReducer,
    haircutDetails:haircutDetailsReducer,
    customerLogin:customerLoginReducer,
    customerRegister:customerRegisterReducer,
    customerDetails:customerDetailsReducer,
    bookingList:bookingListReducer,
    personalBookings:personalBookingsReducer,
    confirmBooking:bookingConfirmReducer,
    existingDayBooking:bookingByDayReducer,
    createBooking:createBookingReducer,
    reviewList:reviewListReducer
})

//Setting the initial state to empty
const customerInfoFromStorage = localStorage.getItem('customerInfo')?
    JSON.parse(localStorage.getItem('customerInfo')):[]

const initialState = {
    customerLogin: {
        customerInfo: customerInfoFromStorage
    }
}

//Handling the Middleware Usage
const middleware = [thunk]

const barberShop= createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default barberShop