import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';


import {
  selectAuthenticated,
  performLogout,
  setIsAuthenticated
} from '../../slices/Auth/authSlice';

import { 
  loadCart,
  selectHasUpdated
} from '../../slices/Cart/cartSlice';

import { getAuth } from '../../utils/auth';

import './App.css';

import Brand from '../Brand/Brand';
import Search from '../Search/Search';
import Navigation from '../Navigation/Navigation';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';
import ProductsList from '../ProductsList/ProductsList';
import Product from '../Product/Product';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Cart from '../Cart/Cart';
import Checkout from '../Checkout/Checkout';
import CheckoutSuccess from '../CheckoutSuccess/CheckoutSuccess';
import CheckoutCancel from '../CheckoutCancel/CheckoutCancel';
import Profile from '../Profile/Profile';
import Orders from '../Orders/Orders';
import Order from '../Order/Order';

const App = () => {

  // Get the authentication information
  const { auth, user, token } = getAuth();

  // generate a navigation alias for redirecting around routes
  const navigate = useNavigate();

  // Alias the dispatch 
  const dispatch = useDispatch();

  // Are we authenticated
  const authenticated = useSelector(selectAuthenticated);

  // Has the cart been updated
  const cartUpdated = useSelector(selectHasUpdated);

  let authToken = JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    authToken = JSON.parse(localStorage.getItem('token'));
  }, [authenticated]);

  // Update the state with the cart contents for the logged in user
    useEffect(() => {
      /**
       * Only run if we have an auth token setup
       */
      if(user?.cart){
        dispatch(loadCart({
            cart_id: user?.cart,
            token: token
        }));
      }
    }, [dispatch, token, user?.cart, cartUpdated]);

  // Handle hamburger click
  const handleHamburgerClick = () => {

    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".navmenu");

    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");

  }

  // Handles logout of the user
  const handleUserLogout = (e) => {

    dispatch(performLogout({}));
    dispatch(setIsAuthenticated(false));
    navigate('/login');

  };

  return (
    <div name="app-container">
      
      <header className="app-header">

        <nav className="navbar-grid">

          <span
          onClick={handleHamburgerClick}>

            <div className="hamburger">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>

          </span>

          <Brand appName={process.env.REACT_APP_NAME}/>

          <Search />

          <Navigation handleLogout={handleUserLogout}/>

        </nav>

      </header>

      <main id="app-main">

        <Routes>

          <Route path="/"></Route>
          <Route path="/products" element={<ProductsList />}></Route>
          <Route path="/products/:product_id" element={<Product />}></Route>
          <Route path="/profile" element={
            <ProtectedRoute token={authToken}>
              <Profile />
            </ProtectedRoute>
          }></Route>
          <Route path="/login" element={<Login token={authToken} />}></Route>
          <Route path="/logout"></Route>
          <Route path="/register" element={<Registration />}></Route>
          <Route path="/cart" element={
            <ProtectedRoute token={authToken}>
              <Cart />
            </ProtectedRoute>
          }></Route>
          <Route path="/checkout" element={
            <ProtectedRoute token={authToken}>
              <Checkout />
            </ProtectedRoute>
          }></Route>
          <Route path="/orders/:filter" element={
            <ProtectedRoute token={authToken}>
              <Orders />
            </ProtectedRoute>
          }></Route>
          <Route path="/order/:id" element={
            <ProtectedRoute token={authToken}>
              <Order />
            </ProtectedRoute>
          }></Route>
          <Route path="/success" element={<CheckoutSuccess />}/>
          <Route path="/cancel" element={<CheckoutCancel />}/>

        </Routes>

      </main>

    </div>
  );
}

export default App;
