import { combineReducers } from "redux";
import userReducers from "./user.reducers";
import categoryReducers from "./category.reducers";
import bookReducers from "./book.reducers";
import reviewReducers from "./review.reducers";

const rootReducer = combineReducers({
  user : userReducers,
  category : categoryReducers,
  book : bookReducers,
  review: reviewReducers
});
export default rootReducer;
