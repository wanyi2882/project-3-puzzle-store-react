import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import authorizationHeader from "./services/authorization-header";

import ProductContext from './ProductContext';
import UserContext from './UserContext';

export default function ProductListing() {

    const [user, setUser] = useState([]);

    let context = useContext(ProductContext);
    let userContext = useContext(UserContext);

    // Mount User Data
    useEffect(() => {
        const userData = userContext.getUser()
        setUser(userData)
    })

    // Add to Cart (Get Route)
    let addToCart = async (puzzleId) => {

        if (user.id) {
            await axios.get(process.env.REACT_APP_URL + "/api/cart/add/"
                + "?puzzle_id=" + puzzleId,
                { headers: authorizationHeader() }
            )
        } else {
            alert("Please login to add to cart")
        }
    };

    return <React.Fragment>
        <div className="container">
            <div className="row">
                {context.getProducts().map(listings =>
                    <div className="col-12 col-sm-6 col-lg-4 mt-2 mb-2" key={listings.id}>
                        <div className="card card-listing"
                            role="button"
                            key={listings.id}>
                            <img className="card-img-top card-image"
                                src={listings.image} />
                            <div className="card-body">
                                <h6 className="card-title">{listings.title}</h6>
                                <span>${(listings.cost / 100).toFixed(2)}</span>
                            </div>
                            <button className="btn btn-danger" onClick={() => addToCart(listings.id)}>Quick Add to Cart</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </React.Fragment>
}