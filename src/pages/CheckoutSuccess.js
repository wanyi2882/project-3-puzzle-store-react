import React from "react";

export default function CheckoutSuccess() {

    return <React.Fragment>
        <div className="container">
            <div>
                <h3>Payment Successful</h3>
            </div>
            <button className="btn">
                <a href="/listings">Return to Listings</a>
            </button>
        </div>
    </React.Fragment>
}