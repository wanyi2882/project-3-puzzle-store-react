import ProductContext from "./ProductContext.js"
import ProductListing from "./ProductListing"

import React from 'react'
import axios from 'axios'

import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import Landing from './pages/Landing'

class App extends React.Component {

  // Testing URL
  url = 'https://3000-rose-ferret-ivegk1sh.ws-prod-ws-us19.gitpod.io/api'

  state = {
    'products': [

    ],
    'navDropdown': false
  }

  fetchData = async () => {
    let response = await axios.get(this.url + "/listings")

    let array = response.data

    console.log(array)

    this.setState({
      'products': array,
      'isLoaded': true
    })
  }

  componentDidMount() {
    this.fetchData()
  }

  // Toggle Collapsed Nav Hamburger
  toggleNav = () => {
    if (this.state.navDropdown == false) {
      this.setState({
        navDropdown: true
      })
    } else {
      this.setState({
        navDropdown: false
      })
    }
  }

  render() {
    const context = {
      // make sure the products function is an array
      // the purpose of the function is to retrieve
      products: () => {
        return this.state.products;
      }
    }

    return <ProductContext.Provider value={context}>
      <React.Fragment>
        <Router>
          {/* Nav Bar when screen size more than 576px */}
          <nav id="expand-nav" className="container-fluid">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <Link to="/">
                  <button className="nav-link">Home</button>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/listings">
                  <button className="nav-link">Listings</button>
                </Link>
              </li>
              <li className="nav-item">
                <button className="nav-link">Login</button>
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
                onClick={() => { this.toggleNav() }}>
                <span className="navbar-toggler-icon"></span>
              </button>

              {this.state.navDropdown ?
                <div className="offcanvas offcanvas-end"
                  tabindex="-1">

                  <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasNavbarLabel"></h5>
                    <button type="button"
                      className="btn-close text-reset"
                      onClick={() => { this.toggleNav() }}></button>
                  </div>

                  <div className="offcanvas-body">
                    <ul className="navbar-nav justify-content-end flex-grow-1">
                      <li className="nav-item">
                        <Link to='/' className="nav-link" onClick={() => { this.toggleNav() }}>Home</Link>
                      </li>
                      <li className="nav-item">
                        <Link to='/listings' className="nav-link" onClick={() => { this.toggleNav() }}>Listings</Link>
                      </li>
                      <li className="nav-item">
                        <div className="nav-link">Florists Login</div>
                      </li>
                    </ul>
                  </div>
                </div>
                : null
              }
            </div>
          </nav>

          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route exact path="/listings">
              <ProductListing />
            </Route>
            <Route exact path="/product/:productId">
              <Landing />
            </Route>
          </Switch>
        </Router>
      </React.Fragment>
    </ProductContext.Provider>
  }
}

export default App;
