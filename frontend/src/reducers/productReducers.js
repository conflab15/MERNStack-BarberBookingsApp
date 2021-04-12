export const haircutListReducer = (state = {haircuts: []}, action) =>{

    switch(action.type){
        case 'HAIRCUT_LIST_REQUEST':
            return {loading:true, haircuts:[]}
        case 'HAIRCUT_LIST_SUCCESS':
            return {loading:false, haircuts: action.payload}
        case 'HAIRCUT_LIST_FAIL':
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const haircutDetailsReducer = (state = {haircut: {}}, action) =>{

    switch(action.type){
        case 'HAIRCUT_REQUEST':
            return {loading:true, ...state}
        case 'HAIRCUT_SUCCESS':
            return {loading:false, haircut: action.payload}
        case 'HAIRCUT_FAIL':
            return {loading: false, error: action.payload}
        default:
            return state
    }
}