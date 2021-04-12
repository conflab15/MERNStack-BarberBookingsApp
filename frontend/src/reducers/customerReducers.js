export const customerLoginReducer = (state = {}, action)=>{
    switch(action.type){
       case 'CUSTOMER_LOGIN_REQUEST':
           return {loading:true}
       case 'CUSTOMER_LOGIN_SUCCESS':
           return {loading:false, customerInfo: action.payload}
       case 'CUSTOMER_LOGIN_FAIL':
           return {loading: false, error: action.payload}
       case 'CUSTOMER_LOGOUT':
           return {}
       default:
           return state
   }
}

export const customerDetailsReducer = (state = {customer:{}}, action)=>{
    switch(action.type){
       case 'CUSTOMER_DETAILS_REQUEST':
           return {loading:true}
       case 'CUSTOMER_DETAILS_SUCCESS':
           return {loading:false, customer: action.payload}
       case 'CUSTOMER_DETAILS_FAIL':
           return {loading: false, error: action.payload}
       case 'CUSTOMER_DETAILS_RESET':
           return {
               customer:{}
           }
       default:
           return state
   }
}


export const customerRegisterReducer = (state = {}, action)=>{
    switch(action.type){
       case 'CUSTOMER_REGISTER_REQUEST':
           return {loading:true}
       case 'CUSTOMER_REGISTER_SUCCESS':
           return {loading:false, customerInfo: action.payload}
       case 'CUSTOMER_REGISTER_FAIL':
           return {loading: false, error: action.payload}
       default:
           return state
   }
}