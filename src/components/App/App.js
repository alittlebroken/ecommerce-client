import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';


import {
  selectAuthenticated,
  selectToken,
  performLogout,
  setIsAuthenticated
} from '../../slices/Auth/authSlice';

// Search related methods
import { 
  performSearch,
  selectSearchResults,
  selectSearchTerms
} from '../../slices/Search/searchSlice';

import './App.css';

import Brand from '../Brand/Brand';
import Search from '../Search/Search';
import Navigation from '../Navigation/Navigation';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';
import ProductsList from '../ProductsList/ProductsList';

const App = () => {

  // generate a navigation alias for redirecting around routes
  const navigate = useNavigate();

  // Alias the dispatch 
  const dispatch = useDispatch();

  // Are we authenticated
  const authenticated = useSelector(selectAuthenticated);

  let authToken = JSON.parse(localStorage.getItem('token'));

  // Get search terms and serarch results
  const searchTerm = useSelector(selectSearchTerms);
  const searchResults = useSelector(selectSearchResults);

  useEffect(() => {
    authToken = JSON.parse(localStorage.getItem('token'));
  }, [authenticated]);

  // Get a list of products each time the a new search term is set
  useEffect(() => {

    // Dispatch the perform search action
    dispatch(performSearch({
      searchTerms: searchTerm
    }))

  }, [searchTerm]);

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
          <Route path="/products" element={<ProductsList searchTerm={searchTerm} searchResults={searchResults} />}></Route>
          <Route path="/product"></Route>
          <Route path="/profile"></Route>
          <Route path="/login" element={<Login token={authToken} />}></Route>
          <Route path="/logout"></Route>
          <Route path="/register" element={<Registration />}></Route>
          <Route path="/cart"></Route>

        </Routes>

      </main>

    </div>
  );
}

export default App;
