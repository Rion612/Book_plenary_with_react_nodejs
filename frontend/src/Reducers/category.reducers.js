import { categoryConstants } from '../Actions/constants';

const initialState = {
    message :"",
    error :null,
    loading : false,
    categories : []
}


export default (state= initialState,action)=>{
    switch(action.type){
        case categoryConstants.GET_Category_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case categoryConstants.GET_Category_SUCCESS:
            state = {
                ...state,
                loading: false,
                categories : action.payload.categories
            }
            break;
        case categoryConstants.GET_Category_FAILURE:
            state = {
                ...state,
                error: true,
                message: action.payload.message,
            }
            break;
    }
    return state;
}