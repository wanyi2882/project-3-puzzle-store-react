import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import authorizationHeader from "./services/authorization-header";

import ProductContext from './ProductContext';

export default function ProductListing() {

    const [searchKeyword, setSearchKeyword] = useState("")
    const [searchDifficultyLevel, setSearchDifficultyLevel] = useState([])
    const [searchSize, setSearchSize] = useState([])
    const [searchTag, setSearchTag] = useState([])

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

    let searchProducts = () => {
        context.getSearch(searchKeyword, searchDifficultyLevel, searchSize, searchTag)
    }

    // Update form fields for checkboxes 2 way binding (Difficulty Level)
    let updateDifficultyCheckboxes = (event) => {
        let arrayToModify = searchDifficultyLevel;

        if (arrayToModify.includes(event.target.value)) {
            let indexToRemove = arrayToModify.indexOf(event.target.value);
            let cloned = [...arrayToModify.slice(0, indexToRemove),
            ...arrayToModify.slice(indexToRemove + 1)];

            setSearchDifficultyLevel(cloned)

        } else {
            // clone the array
            let cloned = [...arrayToModify, event.target.value];
            setSearchDifficultyLevel(cloned)
        }
    }

    // Update form fields for checkboxes 2 way binding (Size)
    let updateSizeCheckboxes = (event) => {
        let arrayToModify = searchSize;

        if (arrayToModify.includes(event.target.value)) {
            let indexToRemove = arrayToModify.indexOf(event.target.value);
            let cloned = [...arrayToModify.slice(0, indexToRemove),
            ...arrayToModify.slice(indexToRemove + 1)];

            setSearchSize(cloned)

        } else {
            // clone the array
            let cloned = [...arrayToModify, event.target.value];
            setSearchSize(cloned)
        }
    }

    // Update form fields for checkboxes 2 way binding (Tags)
    let updateTagCheckboxes = (event) => {
        let arrayToModify = searchTag;

        if (arrayToModify.includes(event.target.value)) {
            let indexToRemove = arrayToModify.indexOf(event.target.value);
            let cloned = [...arrayToModify.slice(0, indexToRemove),
            ...arrayToModify.slice(indexToRemove + 1)];

            setSearchTag(cloned)

        } else {
            // clone the array
            let cloned = [...arrayToModify, event.target.value];
            setSearchTag(cloned)
        }
    }
    return <React.Fragment>

        <div id="searchbox" className="container">
            {/* Keyword Search */}
            <div className="search-div">
                <label className="form-label search-label">Keyword Search</label>
                <input type="text" className="form-control" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
            </div>

            {/* Search by Difficulty Level (Checkboxes) */}
            <div className="search-div">
                <div><label className="form-label search-label">Difficulty Level</label></div>
                <div className="form-check-inline">
                    <input className="form-check-input" type="checkbox" value="1" checked={searchDifficultyLevel.includes('1')}
                        onChange={updateDifficultyCheckboxes} />
                    <label className="form-check-label"> Beginner </label>
                </div>
                <div className="form-check-inline">
                    <input className="form-check-input" type="checkbox" value="2" checked={searchDifficultyLevel.includes('2')}
                        onChange={updateDifficultyCheckboxes} />
                    <label className="form-check-label" > Intermediate </label>
                </div>
                <div className="form-check-inline">
                    <input className="form-check-input" type="checkbox" value="3" checked={searchDifficultyLevel.includes('3')}
                        onChange={updateDifficultyCheckboxes} />
                    <label className="form-check-label" > Advance </label>
                </div>
                <div className="form-check-inline">
                    <input className="form-check-input" type="checkbox" value="4" checked={searchDifficultyLevel.includes('4')}
                        onChange={updateDifficultyCheckboxes} />
                    <label className="form-check-label" > Expert </label>
                </div>
            </div>

            {/* Search by Size - Pieces (Checkboxes) */}
            <div className="search-div">
                <div><label className="form-label search-label">Size</label></div>
                <div className="form-check-inline">
                    <input className="form-check-input" type="checkbox" value="1" checked={searchSize.includes('1')}
                        onChange={updateSizeCheckboxes} />
                    <label className="form-check-label"> 100 Pieces </label>
                </div>
                <div className="form-check-inline">
                    <input className="form-check-input" type="checkbox" value="3" checked={searchSize.includes('3')}
                        onChange={updateSizeCheckboxes} />
                    <label className="form-check-label" > 200 Pieces </label>
                </div>
                <div className="form-check-inline">
                    <input className="form-check-input" type="checkbox" value="4" checked={searchSize.includes('4')}
                        onChange={updateSizeCheckboxes} />
                    <label className="form-check-label" > 300 Pieces  </label>
                </div>
                <div className="form-check-inline">
                    <input className="form-check-input" type="checkbox" value="5" checked={searchSize.includes('5')}
                        onChange={updateSizeCheckboxes} />
                    <label className="form-check-label" > 500 Pieces  </label>
                </div>
                <div className="form-check-inline">
                    <input className="form-check-input" type="checkbox" value="6" checked={searchSize.includes('6')}
                        onChange={updateSizeCheckboxes} />
                    <label className="form-check-label" > 520 Pieces  </label>
                </div>                <div className="form-check-inline">
                    <input className="form-check-input" type="checkbox" value="7" checked={searchSize.includes('7')}
                        onChange={updateSizeCheckboxes} />
                    <label className="form-check-label" > 1000 Pieces  </label>
                </div>
            </div>

            {/* Search by Tags (Checkboxes) */}
            <div className="search-div">
                <div><label className="form-label search-label">Tags</label></div>
                <div className="form-check-inline">
                    <input className="form-check-input" type="checkbox" value="1" checked={searchTag.includes('1')}
                        onChange={updateTagCheckboxes} />
                    <label className="form-check-label"> Multicolour </label>
                </div>
                <div className="form-check-inline">
                    <input className="form-check-input" type="checkbox" value="2" checked={searchTag.includes('2')}
                        onChange={updateTagCheckboxes} />
                    <label className="form-check-label" > Challenging </label>
                </div>
                <div className="form-check-inline">
                    <input className="form-check-input" type="checkbox" value="3" checked={searchTag.includes('3')}
                        onChange={updateTagCheckboxes} />
                    <label className="form-check-label" > Kids Friendly </label>
                </div>
                <div className="form-check-inline">
                    <input className="form-check-input" type="checkbox" value="4" checked={searchTag.includes('4')}
                        onChange={updateTagCheckboxes} />
                    <label className="form-check-label" > Irregular Shaped </label>
                </div>
                <div className="form-check-inline">
                    <input className="form-check-input" type="checkbox" value="5" checked={searchTag.includes('5')}
                        onChange={updateTagCheckboxes} />
                    <label className="form-check-label" > Regular Shaped </label>
                </div>
            </div>


            <button className="btn btn-danger btn-sm" onClick={() => searchProducts()}>Search</button>
        </div>

        {/* Display all Listings */}
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