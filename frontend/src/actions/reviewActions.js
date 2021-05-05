import axios from 'axios'

//Actions define how states and the API work together, and the information that needs to be passed two and from... 
//Normally, request States are talking to and from the API, and when that call either succeeds or fails, the SUCCESS or FAIL state is returned with a message as a payload...
//Exporting a list of Haircuts
export const listReviews = () => async (dispatch) => {

    try {
        //Executing the reducer to update states. This one activates a product list request.
        dispatch({type: 'REVIEWS_LIST_REQUEST'})

        //Here we are retrieving the data from the API
        const {data} = await axios.get('api/reviews')

        //Here we are populating the response of the dispatch to a payload
        dispatch({type: 'REVIEWS_LIST_SUCCESS', payload: data})
    }
    catch(error){
        //Error message if the dispatch failed
        dispatch({
            type: 'REVIEWS_LIST_FAIL',
            payload: error.message
        })
    }
}