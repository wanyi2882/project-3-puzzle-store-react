import React from "react";
import "../css/CheckoutSuccess.css"
export default function CheckoutSuccess() {

    return <React.Fragment>
        <div className="container">
            <div id="checkout-div">
                <h1>Payment Successful</h1>
            </div>
            <button className="btn btn-light mx-3">
                <a href="/listings">Return to Listings</a>
            </button>
        </div>
    </React.Fragment>
}