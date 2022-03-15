import { Routes, Route, Link, useNavigate } from 'react-router-dom';

import './App.css';

import Brand from '../Brand/Brand';
import Search from '../Search/Search';
import Navigation from '../Navigation/Navigation';

const App = () => {

  let authToken = JSON.parse(localStorage.getItem('token'));

  // Handle hamburger click
  const handleHamburgerClick = () => {

    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".navmenu");

    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");

  }

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

          <Navigation authenticated={authToken} />

        </nav>

      </header>

      <main id="app-main">

        <Routes>

          <Route path="/"></Route>
          <Route path="/products" element="Products"></Route>
          <Route path="/product"></Route>
          <Route path="/profile"></Route>
          <Route path="/login"></Route>
          <Route path="/logout"></Route>
          <Route path="/register"></Route>
          <Route path="/cart"></Route>

        </Routes>

      </main>

    </div>
  );
}

export default App;
