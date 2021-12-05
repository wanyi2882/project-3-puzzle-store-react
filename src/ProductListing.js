import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import authorizationHeader from "./services/authorization-header";

import ProductContext from './ProductContext';

export default function ProductListing(props) {

    const [searchKeyword, setSearchKeyword] = useState(props.searchKeywordProp)

    let context = useContext(ProductContext);

    // Add to Cart (Get Route)
    let addToCart = async (puzzleId) => {

        try {
            await axios.get(process.env.REACT_APP_URL + "/api/cart/add"
                + "?puzzle_id=" + puzzleId,
                { headers: authorizationHeader() }
            ).then(() => alert("Item Added to cart"))
        } catch {
            alert("Please login to add to cart")
        }
    };

    let searchProducts = (searchKeyword) => {
        context.getSearchKeyword(searchKeyword)
    }

    return <React.Fragment>

        <div id="searchbox" className="container">
            {/* Keyword Search */}
            <div className="search-div">
                <label className="form-label search-label">Keyword Search</label>
                <input type="text"
                    className="form-control"
                    name="searchKeyword"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)} />
            </div>
            <button className="btn btn-danger btn-sm" onClick={() => searchProducts(searchKeyword)}>Search</button>
        </div>

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