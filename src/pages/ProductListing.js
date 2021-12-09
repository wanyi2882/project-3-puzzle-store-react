import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import authorizationHeader from "../services/authorization-header";
import "../css/ProductListing.css"

import { HiChevronDoubleDown } from "react-icons/hi";
import { HiChevronDoubleUp } from "react-icons/hi";
import { FaSearchPlus } from "react-icons/fa"

import ProductContext from '../ProductContext';

export default function ProductListing() {

    const [modalBox, setModalBox] = useState(false)
    const [modalBoxContent, setModalBoxContent] = useState({})
    const [searchDropdown, setSearchDropDown] = useState(false)
    const [specificationAccordion, setSpecificationAccordion] = useState(false)
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

    // Toggle Modal
    const modalDisplay = (listings) => {
        if (modalBox == false) {
            setModalBoxContent(listings)
            setModalBox(true)
        } else {
            setModalBoxContent({})
            setModalBox(false)
            setSpecificationAccordion(false)
        }
    }

    // Toggle Accordion in Modal Box
    const displaySpecificationAccordion = () => {
        if (specificationAccordion) {
            setSpecificationAccordion(false)
        } else {
            setSpecificationAccordion(true)
        }
    }

    return <React.Fragment>
        {/* Search Box */}
        <div id="searchbox" className="container">
            <div id="searchbox-div-button" role="button" onClick={() => toggleAccordion()}>
                Search <FaSearchPlus /> &nbsp; &nbsp;
            </div>

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
                        <div className="card card-listing" role="button" key={listings.id}>
                            <div onClick={() => modalDisplay(listings)}>
                                <img className="card-img-top card-image" src={listings.image} />
                                <div className="card-body">
                                    <h6 className="card-title">{listings.title}</h6>
                                    <span>${(listings.cost / 100).toFixed(2)}</span>
                                </div>
                            </div>
                            <button className="btn btn-danger" onClick={() => addToCart(listings.id)}>Quick Add to Cart</button>
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* Display Modal Box */}
        {modalBox ?
            <div className="modal" tabIndex="-1" role="dialog"
                style={{
                    display: "block",
                    backgroundColor: "rgba(0.5, 0.5, 0.5, 0.5)"
                }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{modalBoxContent.title} </h5>
                            <button type="button" className="close btn btn-secondary" data-dismiss="modal" aria-label="Close"
                                onClick={() => modalDisplay()}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container">
                                <div className="row">
                                    <div>
                                        <img src={modalBoxContent.image} id="modal-image" />
                                    </div>
                                    <div>
                                        <hr />
                                        <span id="cost-span">Price: ${((modalBoxContent.cost) / 100).toFixed(2)}</span>
                                        <hr />
                                        <span>{modalBoxContent.description}</span>
                                        < hr />
                                        <span id="pieces-span">{modalBoxContent.Size.pieces} Pieces</span>
                                        <hr />
                                        <div>
                                            <div role="button"
                                                onClick={() => displaySpecificationAccordion()}>
                                                {specificationAccordion ?
                                                    <span className="specification-heading">Puzzle Specifications <HiChevronDoubleUp /></span> :
                                                    <span className="specification-heading">Puzzle Specifications <HiChevronDoubleDown /></span>}
                                            </div>
                                            {specificationAccordion ?
                                                <div>
                                                    <div>
                                                        <span className="specification-subheading">Dimensions: </span>
                                                        length {modalBoxContent.length}cm x breadth {modalBoxContent.breadth}cm
                                                    </div>
                                                    <div>
                                                        <span className="specification-subheading">Theme: </span>{modalBoxContent.Theme.name}
                                                    </div>
                                                    <div>
                                                        <span className="specification-subheading">Brand: </span>{modalBoxContent.brand}
                                                    </div>
                                                    <div>
                                                        <span className="specification-subheading">Material: </span>{modalBoxContent.Material.type}
                                                    </div>
                                                    <div>
                                                        <span className="specification-subheading">Frame Choice(s): </span>
                                                        {modalBoxContent.Frame.map(each => each.material).join(", ")}
                                                    </div>
                                                </div>
                                                : null}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-danger" onClick={() => addToCart(modalBoxContent.id)}>Add to Cart</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => modalDisplay()}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            : null}
    </React.Fragment>
}