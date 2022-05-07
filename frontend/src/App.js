import "./App.css";
import Register from "./Pages/Register/Register";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Books from "./Pages/Books/Books";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword/Resetpassword";
import { useDispatch, useSelector } from "react-redux";
import { isUSerLoggedin } from "./Actions/user.actions";
import AdminHome from "./Pages/Admin/AdminHome/AdminHome";
import Category from "./Pages/Admin/Category/Category";
import BooksAdmin from "./Pages/Admin/Books/Books";
import React,{useEffect} from 'react';
import CreateBook from "./Pages/Admin/Books/CreateBook";
import User from "./Pages/Admin/User/User";
import BookCat from "./Pages/Books/BookCat";
import BookDetail from "./Pages/Books/BookDetails";
import Verify from "./Pages/Verify/Verify";
import PrivateRoute from "./Components/Hook/privateRoute";
import updateBook from "./Pages/Admin/Books/UpdateBook";


function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(user)
  useEffect(() => {
    if (!user.authenticate) {
      dispatch(isUSerLoggedin());
    }
  }, []);
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/books" exact component={Books} />
        <Route path="/forgot/password" exact component={ForgotPassword} />
        <Route path="/reset/password/:token" exact component={ResetPassword} />
        <Route path="/verify/:token" exact component={Verify} />
        <Route path="/admin" exact component={AdminHome} />
        <Route path="/admin/categories" exact component={Category} />
        <Route path="/admin/books" exact component={BooksAdmin} />
        <Route path="/admin/users" exact component={User} />
        <Route path="/admin/create/books" component={CreateBook} />
        <Route path="/admin/update/books/:id" exact component={updateBook} />
        <PrivateRoute path="/books/category/:id" exact component={BookCat} />
        <PrivateRoute path="/book/details/:id" exact component={BookDetail} />
      </Switch>
    </div>
  );
}

export default App;
