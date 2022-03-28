import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';


import {
  selectAuthenticated,
  performLogout,
  setIsAuthenticated
} from '../../slices/Auth/authSlice';

import './App.css';

import Brand from '../Brand/Brand';
import Search from '../Search/Search';
import Navigation from '../Navigation/Navigation';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';
import ProductsList from '../ProductsList/ProductsList';
import Product from '../Product/Product';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

const App = () => {

  // generate a navigation alias for redirecting around routes
  const navigate = useNavigate();

  // Alias the dispatch 
  const dispatch = useDispatch();

  // Are we authenticated
  const authenticated = useSelector(selectAuthenticated);

  let authToken = JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    authToken = JSON.parse(localStorage.getItem('token'));
  }, [authenticated]);

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

          <Navigation authenticated={authenticated} handleLogout={handleUserLogout}/>

        </nav>

      </header>

      <main id="app-main">

        <Routes>

          <Route path="/"></Route>
          <Route path="/products" element={<ProductsList />}></Route>
          <Route path="/products/:product_id" element={<Product />}></Route>
          <Route path="/profile" element={
            <ProtectedRoute token={authToken}>
              <h1>User Profile</h1>
            </ProtectedRoute>
          }></Route>
          <Route path="/login" element={<Login token={authToken} />}></Route>
          <Route path="/logout"></Route>
          <Route path="/register" element={<Registration />}></Route>
          <Route path="/cart" element={
            <ProtectedRoute token={authToken}>
              <h1>User Cart</h1>
            </ProtectedRoute>
          }></Route>

        </Routes>

      </main>

    </div>
  );
}

export default App;
