import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import authorizationHeader from "./services/authorization-header";
import "./css/ProductListing.css"

import ProductContext from './ProductContext';

export default function ProductListing() {

    const [searchDropdown, setSearchDropDown] = useState(false)
    const [searchKeyword, setSearchKeyword] = useState("")
    const [searchDifficultyLevel, setSearchDifficultyLevel] = useState([])
    const [searchSize, setSearchSize] = useState([])
    const [searchTag, setSearchTag] = useState([])
    const [searchMinPrice, setSearchMinPrice] = useState("")
    const [searchMaxPrice, setSearchMaxPrice] = useState("")
    const [searchTheme, setSearchTheme] = useState("")
    const [themes, setThemes] = useState([])
    const [difficultyLevels, setDifficultyLevels] = useState([])
    const [sizes, setSizes] = useState([])
    const [tags, setTags] = useState([])
    const [ageGroups, setAgeGroups] = useState([])
    const [searchAgeGroup, setSearchAgeGroup] = useState([])

    // Get Themes Table
    const getThemes = async () => {
        let theme = await axios.get(process.env.REACT_APP_URL + "/api/listings/get_themes")
        setThemes(theme.data)
    }

    // Get Themes Table
    const getLevels = async () => {
        let level = await axios.get(process.env.REACT_APP_URL + "/api/listings/get_difficulty_levels")
        setDifficultyLevels(level.data)
    }

    // Get Size Table
    const getSizes = async () => {
        let size = await axios.get(process.env.REACT_APP_URL + "/api/listings/get_sizes")
        setSizes(size.data)
    }

    // Get Tags Table
    const getTags = async () => {
        let tags = await axios.get(process.env.REACT_APP_URL + "/api/listings/get_tags")
        setTags(tags.data)
    }

    // Get Age Group Table
    const getAges = async () => {
        let ageGroup = await axios.get(process.env.REACT_APP_URL + "/api/listings/get_age_groups")
        setAgeGroups(ageGroup.data)
    }

    // Use Effect (Component Did Mount)
    useEffect(() => {
        getThemes()
        getLevels()
        getSizes()
        getTags()
        getAges()
    }, [])

    // Use Product Context
    let context = useContext(ProductContext);

    // Set props to Product Provider 
    let searchProducts = () => {
        context.getSearch(searchKeyword, searchDifficultyLevel, searchSize, searchTag, searchMinPrice, searchMaxPrice, searchTheme, searchAgeGroup)
    }

    // Quick Add to Cart (Get Route)
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

    // Update form fields for checkboxes 2 way binding (Difficulty Level)
    let updateDifficultyCheckboxes = (event) => {
        let arrayToModify = searchDifficultyLevel;

        if (arrayToModify.includes(parseInt(event.target.value))) {
            let indexToRemove = arrayToModify.indexOf(parseInt(event.target.value));
            let cloned = [...arrayToModify.slice(0, indexToRemove),
            ...arrayToModify.slice(indexToRemove + 1)];

            setSearchDifficultyLevel(cloned)

        } else {
            // clone the array
            let cloned = [...arrayToModify, parseInt(event.target.value)];
            setSearchDifficultyLevel(cloned)
        }
    }

    // Update form fields for checkboxes 2 way binding (Size)
    let updateSizeCheckboxes = (event) => {
        let arrayToModify = searchSize;

        if (arrayToModify.includes(parseInt(event.target.value))) {
            let indexToRemove = arrayToModify.indexOf(parseInt(event.target.value));
            let cloned = [...arrayToModify.slice(0, indexToRemove),
            ...arrayToModify.slice(indexToRemove + 1)];

            setSearchSize(cloned)

        } else {
            // clone the array
            let cloned = [...arrayToModify, parseInt(event.target.value)];
            setSearchSize(cloned)
        }
    }

    // Update form fields for checkboxes 2 way binding (Tags)
    let updateTagCheckboxes = (event) => {
        let arrayToModify = searchTag;

        if (arrayToModify.includes(parseInt(event.target.value))) {
            let indexToRemove = arrayToModify.indexOf(parseInt(event.target.value));
            let cloned = [...arrayToModify.slice(0, indexToRemove),
            ...arrayToModify.slice(indexToRemove + 1)];

            setSearchTag(cloned)

        } else {
            // clone the array
            let cloned = [...arrayToModify, parseInt(event.target.value)];
            setSearchTag(cloned)
        }
    }

    // Update form fields for checkboxes 2 way binding (Themes)
    let updateThemeCheckboxes = (event) => {
        let arrayToModify = searchTheme;

        if (arrayToModify.includes(parseInt(event.target.value))) {
            let indexToRemove = arrayToModify.indexOf(parseInt(event.target.value));
            let cloned = [...arrayToModify.slice(0, indexToRemove),
            ...arrayToModify.slice(indexToRemove + 1)];

            setSearchTheme(cloned)

        } else {
            // clone the array
            let cloned = [...arrayToModify, parseInt(event.target.value)];
            setSearchTheme(cloned)
        }
    }

    // Update form fields for checkboxes 2 way binding (Age Group)
    let updateAgeGroupCheckboxes = (event) => {
        let arrayToModify = searchAgeGroup;

        if (arrayToModify.includes(parseInt(event.target.value))) {
            let indexToRemove = arrayToModify.indexOf(parseInt(event.target.value));
            let cloned = [...arrayToModify.slice(0, indexToRemove),
            ...arrayToModify.slice(indexToRemove + 1)];

            setSearchAgeGroup(cloned)

        } else {
            // clone the array
            let cloned = [...arrayToModify, parseInt(event.target.value)];
            setSearchAgeGroup(cloned)
        }
    }

    // Toggle Search Accordion
    const toggleAccordion = () => {
        if (searchDropdown == false) {
            setSearchDropDown(true)
        } else {
            setSearchDropDown(false)
        }
    }
    return <React.Fragment>
        {/* Search Box */}
        <div id="searchbox" className="container">
            <div role="button" onClick={() => toggleAccordion()}><h3>Search and Filter</h3></div>

            {/* Search Dropdown when toggled to true */}
            {searchDropdown ?
                <div>
                    {/* Keyword Search */}
                    <div className="search-div">
                        <label className="form-label search-label">Keyword Search</label>
                        <input type="text" className="form-control" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
                    </div>

                    {/* Search by Difficulty Level (Checkboxes) */}
                    <div className="search-div">
                        <div><label className="form-label search-label">Difficulty Level</label></div>
                        {difficultyLevels.map(level =>
                            <div className="form-check-inline">
                                <input className="form-check-input" type="checkbox" value={parseInt(level[0])}
                                    checked={searchDifficultyLevel.includes(parseInt(level[0]))}
                                    onChange={updateDifficultyCheckboxes} />
                                <label className="form-check-label"> {level[1]} </label>
                            </div>
                        )}
                    </div>

                    {/* Search by Size - Pieces (Checkboxes) */}
                    <div className="search-div">
                        <div><label className="form-label search-label">Size</label></div>
                        {sizes.map(size =>
                            <div className="form-check-inline">
                                <input className="form-check-input" type="checkbox" value={parseInt(size[0])}
                                    checked={searchSize.includes(parseInt(size[0]))}
                                    onChange={updateSizeCheckboxes} />
                                <label className="form-check-label"> {size[1]} </label>
                            </div>
                        )}
                    </div>

                    {/* Search by Tags (Checkboxes) */}
                    <div className="search-div">
                        <div><label className="form-label search-label">Tags</label></div>
                        {tags.map(tag =>
                            <div className="form-check-inline">
                                <input className="form-check-input" type="checkbox" value={parseInt(tag[0])}
                                    checked={searchTag.includes(parseInt(tag[0]))}
                                    onChange={updateTagCheckboxes} />
                                <label className="form-check-label"> {tag[1]} </label>
                            </div>
                        )}
                    </div>

                    {/* Search by Price */}
                    <div className="search-div">
                        <div><label className="form-label search-label">Price</label></div>
                        <div id="price-search-div">
                            <div>
                                <label className="form-label">Min</label>
                                <input type="number" className="form-control" value={searchMinPrice} onChange={(e) => setSearchMinPrice(e.target.value)} />
                            </div>
                            <div>
                                <label className="form-label">Max</label>
                                <input type="text" className="form-control" value={searchMaxPrice} onChange={(e) => setSearchMaxPrice(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    {/* Search by Themes (Checkboxes) */}
                    <div className="search-div">
                        <div><label className="form-label search-label">Themes</label></div>
                        {themes.map(theme =>
                            <div className="form-check-inline">
                                <input className="form-check-input" type="checkbox" value={parseInt(theme[0])}
                                    checked={searchTheme.includes(parseInt(theme[0]))}
                                    onChange={updateThemeCheckboxes} />
                                <label className="form-check-label"> {theme[1]} </label>
                            </div>
                        )}
                    </div>

                    {/* Search by Age Group (Checkboxes) */}
                    <div className="search-div">
                        <div><label className="form-label search-label">Age Groups</label></div>
                        {ageGroups.map(age =>
                            <div className="form-check-inline">
                                <input className="form-check-input" type="checkbox" value={parseInt(age[0])}
                                    checked={searchAgeGroup.includes(parseInt(age[0]))}
                                    onChange={updateAgeGroupCheckboxes} />
                                <label className="form-check-label"> {age[1]} </label>
                            </div>
                        )}
                    </div>

                    {/* Search Button */}
                    <button className="btn btn-danger btn-sm" onClick={() => searchProducts()}>Search</button>
                </div>
                : null}
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