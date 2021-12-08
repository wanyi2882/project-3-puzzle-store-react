import React, { useState, useEffect } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

import ProductListing from "./pages/ProductListing";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Restricted from "./pages/Restricted"
import Cart from "./pages/Cart"
import CheckoutSuccess from './pages/CheckoutSuccess';

import ProductProvider from "./ProductProvider";
import AuthService from "./services/auth.service";
import UserProvider from './services/user.service';

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {

  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setCurrentUser(true)
    }
  })

  // Login
  const login = (email, password) => {
    AuthService.login(email, password).then(
      action1, action2
    )
  }

  const action1 = () => {
    alert("Login Success")
    setCurrentUser(true)
  }

  const action2 = () => {
    alert("Please check login email/username.")
  }

  // Logout
  const logOut = () => {
    let user = JSON.parse(localStorage.getItem("user"))
    let refreshToken = user.refreshToken
    AuthService.logout(refreshToken);

    setCurrentUser(false);

    alert("you have successfully logout!")
  };

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
          <Link to="/" className="link-style" ><li id="navbar-expand-logo" role="button"></li></Link>

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
          {!currentUser
            ? <li className="nav-item">
              <Link to="/register" className="link-style" >
                <button className="nav-link">Register</button>
              </Link>
            </li>
            : null}
          {currentUser
            ? <li className="nav-item">
              <Link to="/cart" className="link-style" >
                <button className="nav-link">Cart</button>
              </Link>
            </li>
            : null}
          {currentUser
            ? <li className="nav-item">
              <Link to="/profile" className="link-style" >
                <button className="nav-link">Profile</button>
              </Link>
            </li>
            : null}
          <li className="nav-item">
            <Link to="/login" className="link-style" >
              {currentUser
                ? <button className="nav-link" onClick={() => logOut()}>Logout</button>
                : <button className="nav-link">Login</button>}
            </Link>
          </li>
        </ul>
      </nav>

      {/* Nav Bar when screen size less than 576px */}
      <nav id="collapsed-navbar" className="navbar navbar-light">
        <div className="container-fluid">
          <Link to="/"><div className="navbar-brand" role="button"></div></Link>
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
                  {!currentUser
                    ? <li className="nav-item">
                      <Link to='/register' className="nav-link" onClick={() => toggleNav()}>Register</Link>
                    </li>
                    :
                    null}
                  {currentUser
                    ? <li className="nav-item">
                      <Link to='/cart' className="nav-link" onClick={() => toggleNav()}>Cart</Link>
                    </li>
                    :
                    null}
                  {currentUser
                    ? <li className="nav-item">
                      <Link to='/profile' className="nav-link" onClick={() => toggleNav()}>Profile</Link>
                    </li>
                    :
                    null}
                  <li className="nav-item">
                    {currentUser
                      ? <Link to='/login' className="nav-link" onClick={() => logOut()}>Logout</Link>
                      : <Link to='/login' className="nav-link" onClick={() => toggleNav()}>Login</Link>}
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
            <Route exact path="/restricted">
              <Restricted />
            </Route>
            <Route exact path="/login">
              {currentUser ? <Redirect to="/profile" /> : <Login login={login} />}
            </Route>
            <Route exact path="/profile">
              {currentUser ? <Profile /> : <Restricted />}
            </Route>
            <Route exact path="/cart">
              {currentUser ? <Cart /> : <Restricted />}
            </Route>
            <Route exact path="/checkout/success">
              {currentUser ? <CheckoutSuccess /> : <Restricted />}
            </Route>
          </Switch>
        </ProductProvider>
      </UserProvider>
    </Router>
  </React.Fragment>
}

export default App;
