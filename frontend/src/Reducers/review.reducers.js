import { reviewConstant } from '../Actions/constants';


const initialState = {
    message :"",
    error :null,
    loading : false,
    reviews : []
}


export default (state= initialState,action)=>{
    switch(action.type){
        case reviewConstant.GET_REVIEWS_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case reviewConstant.GET_REVIEWS_SUCCESS:
            state = {
                ...state,
                loading: false,
                reviews : action.payload.reviews
            }
            break;
        case reviewConstant.GET_REVIEWS_FAILURE:
            state = {
                ...state,
                error: true,
                message: action.payload.message,
            }
            break;
    }
    return state;
}