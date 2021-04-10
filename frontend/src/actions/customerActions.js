import axios from 'axios'

//Login Actions
export const login = (email, password) => async(dispatch) => {
    try{
        dispatch({
            type: 'CUSTOMER_LOGIN_REQUEST'
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.post('/api/customers/login', {email, password}, config)

        dispatch({
            type: 'CUSTOMER_LOGIN_SUCCESS',
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data)) //Storing the Item within state data...
    }
    catch(error){
        dispatch({
            type: 'CUSTOMER_LOGIN_FAIL',
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}

export const getCustomerDetails = (id) => async(dispatch, getState) => {

    try {
        dispatch({
            type: 'CUSTOMER_DETAILS_REQUEST'
        })

        const {userLogin: {userInfo}} = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: userInfo.token
            }
        }

        const {data} = await axios.get(`/api/customers/${id}`, config)
        dispatch({
            type: 'CUSTOMER_DETAILS_SUCCESS',
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: 'CUSTOMER_DETAILS_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}

export const register = (forename, surname, addressline1, addressline2, town, postcode, email, password) => async(dispatch) => {
    
    try {
        dispatch({
            type: 'CUSTOMER_REGISTER_REQUEST'
        })

        const config ={
            headers:{
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post('/api/customers/', {forename, surname, addressline1, addressline2, town, postcode, email, password}, config)
        dispatch({
            type: 'CUSTOMER_REGISTER_SUCCESS',
            payload: data
        })

        dispatch({
            type: 'CUSTOMER_LOGIN_SUCCESS',
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    }
    catch(error){
        dispatch({
            type: 'CUSTOMER_REGISTER_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}

export const logout = () =>(dispatch)=>{
    localStorage.removeItem('userInfo')
    dispatch({type:'CUSTOMER_DETAILS_RESET'})
    dispatch({type: 'CUSTOMER_LOGOUT'})
}