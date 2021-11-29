import React, { useState } from 'react'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import ProductListing from "./ProductListing"
import Register from "./pages/Register"
import Landing from "./pages/Landing"
import Login from "./pages/Login"

import ProductProvider from "./ProductProvider";
import UserProvider from './UserProvider'

import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"


function App() {

  // Set state for navDropdown
  const [navDropdown, setNavDropdown] = useState(false)

  // Toggle Collapsed Nav Hamburger
  let toggleNav = () => {
    if (navDropdown == false) {
      setNavDropdown(true)
    } else {
      setNavDropdown(false)
    }
  }

  return <React.Fragment>
    <Router>

      {/* Nav Bar when screen size more than 576px */}
      <nav id="expand-nav" className="container-fluid">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link to="/" className="link-style" >
              <button className="nav-link">Home</button>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/listings" className="link-style" >
              <button className="nav-link">Listings</button>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="link-style" >
              <button className="nav-link">Register</button>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="link-style" >
              <button className="nav-link">Login</button>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Nav Bar when screen size less than 576px */}
      <nav id="collapsed-navbar" className="navbar navbar-light">
        <div className="container-fluid">
          <div className="navbar-brand"
            role="button">Logo</div>
          <button className="navbar-toggler"
            type="button"
            onClick={() => toggleNav()}>
            <span className="navbar-toggler-icon"></span>
          </button>

          {navDropdown ?
            <div className="offcanvas offcanvas-end"
              tabindex="-1">

              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasNavbarLabel"></h5>
                <button type="button"
                  className="btn-close text-reset"
                  onClick={() => toggleNav()}></button>
              </div>

              <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1">
                  <li className="nav-item">
                    <Link to='/' className="nav-link" onClick={() => toggleNav()}>Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link to='/listings' className="nav-link" onClick={() => toggleNav()}>Listings</Link>
                  </li>
                  <li className="nav-item">
                    <Link to='/register' className="nav-link" onClick={() => toggleNav()}>Register</Link>
                  </li>
                  <li className="nav-item">
                    <Link to='/login' className="nav-link" onClick={() => toggleNav()}>Login</Link>
                  </li>
                </ul>
              </div>
            </div>
            : null
          }
        </div>
      </nav>
      <UserProvider>
        <ProductProvider>
          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route exact path="/listings">
              <ProductListing />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
          </Switch>
        </ProductProvider>
      </UserProvider>
    </Router>
  </React.Fragment>
}

export default App;
