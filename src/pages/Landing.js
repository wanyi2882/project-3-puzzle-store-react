import React from 'react'
import { Link } from 'react-scroll'

import { BsArrowDownCircle } from "react-icons/bs";

import "../css/Landing.css"
import ProductListing from './ProductListing';

export default function Landing() {

    return (
        <React.Fragment>
            <div id="landing-banner">
                <div id="welcome-div">
                    <h1>SHOP PUZZLES</h1>
                </div>
                <div id="down-arrow-to-searchbox">
                <Link to="listings" spy={true} smooth={true}>
                    <BsArrowDownCircle/>
                </Link>                    
                </div>
            </div>

            {/* On Click of Scoll Down Icon, page goes down to diplay the product listing */}
            <div id="listings" className="container">
                {ProductListing()}
            </div>

        </React.Fragment >
    )
}