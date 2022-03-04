import { Routes, Route, Link } from 'react-router-dom';

import './App.css';

import Brand from '../Brand/Brand';

function App() {
  return (
    <div id="app-container">

      <header id="app-header">

        <Brand />

        <Search />

        <ProfileIcon />

        <Cart />

      </header>
      <Categories />
      <main id="app-main">
      
      </main>
    </div>
  );
}

export default App;
