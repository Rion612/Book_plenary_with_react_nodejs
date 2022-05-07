import { bookConstants } from '../Actions/constants';


const initialState = {
    message :"",
    error :null,
    loading : false,
    books : []
}


export default (state= initialState,action)=>{
    switch(action.type){
        case bookConstants.GET_BOOK_LIST_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case bookConstants.GET_BOOK_LIST_SUCCESS:
            state = {
                ...state,
                loading: false,
                books : action.payload.books
            }
            break;
        case bookConstants.GET_BOOK_LIST_FAILURE:
            state = {
                ...state,
                error: true,
                message: action.payload.message,
            }
            break;
    }
    return state;
}