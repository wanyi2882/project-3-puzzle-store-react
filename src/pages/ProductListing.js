import React, { useContext, useState, useEffect } from 'react';
import FlashMessage from 'react-flash-message'

import axios from 'axios';
import authorizationHeader from "../services/authorization-header";
import "../css/ProductListing.css"

import { HiChevronDoubleDown, HiChevronDoubleUp } from "react-icons/hi";
import { FaSearchPlus, FaSearchMinus } from "react-icons/fa"

import ProductContext from '../ProductContext';

export default function ProductListing() {

    const [cart, setCart] = useState([]);
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
    const [displayFlash, setDisplayFlash] = useState(false)

    // Get Themes Table
    const getThemes = async () => {
        let theme = await axios.get(process.env.REACT_APP_URL + "/api/listings/get_themes")
        setThemes(theme.data)
    }

    // Get Levels Table
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

    // Get cart from local storage for non logged in users OR if logged in, get cart from 
    const getLocalCart = async () => {

        // User is logged in, get cart from DB
        if (localStorage.getItem("user")) {
            const response = await axios.get(process.env.REACT_APP_URL + "/api/cart", { headers: authorizationHeader() })
            const cartData = response.data

            // Check if local storage has any cart
            // If exist to combine with cartData
            if (localStorage.getItem("cart")) {
                // Get local cart from local storage
                let localCart = JSON.parse(localStorage.getItem("cart"))

                // 1. Merge both arrays
                // 2. Use Reducer function
                const clonedCartArray = Object.values([...cartData, ...localCart].reduce((previousValue, currentValue) => {
                    // 3. Puzzle Id not the same
                    if (!previousValue[currentValue.Puzzle.id]) {
                        previousValue[currentValue.Puzzle.id] = currentValue;
                    } else {
                        // 4. Puzzle ID same so add up the quantity together
                        previousValue[currentValue.Puzzle.id].quantity += currentValue.quantity;
                    }
                    return previousValue;
                }, {}));
                setCart(clonedCartArray)
                localStorage.removeItem("cart")

                clonedCartArray.map(async eachItem => {
                    // If there is already more than 1 item in the cart, we update the cart
                    if (eachItem.quantity > 1) {
                        await axios.post(process.env.REACT_APP_URL + "/api/cart/quantity/update",
                            {
                                "puzzle_id": eachItem.Puzzle.id,
                                "newQuantity": eachItem.quantity
                            }
                            , { headers: authorizationHeader() })
                    } else if (eachItem.quantity == 1) {
                        // If only one item in cart
                        await axios.get(process.env.REACT_APP_URL + "/api/cart/add"
                            + "?puzzle_id=" + eachItem.Puzzle.id,
                            { headers: authorizationHeader() }
                        )
                    }
                })
            }
            else {
                // If nothing in local storage cart
                setCart(cartData)
            }
        }

        // If local storage has a cart
        else if (localStorage.getItem("cart")) {
            let localCart = JSON.parse(localStorage.getItem("cart"))
            setCart(localCart)
        } else {
            // create an empty cart
            localStorage.setItem("cart", JSON.stringify([]));
        }
    }
    
    // Use Effect (Component Did Mount)
    useEffect(() => {
        getThemes()
        getLevels()
        getSizes()
        getTags()
        getAges()
        getLocalCart()

        setInterval(() => {
            setDisplayFlash(false)
        }, 5000)

    }, [])

    // Use Product Context
    let context = useContext(ProductContext);

    // Set props to Product Provider 
    let searchProducts = () => {
        context.getSearch(searchKeyword, searchDifficultyLevel, searchSize, searchTag, searchMinPrice, searchMaxPrice, searchTheme, searchAgeGroup)
    }

    // Reset Search
    let resetSearch = () => {
        setSearchKeyword("")
        setSearchDifficultyLevel([])
        setSearchSize([])
        setSearchTag([])
        setSearchMinPrice("")
        setSearchMaxPrice("")
        setSearchTheme("")
        setSearchAgeGroup([])

        context.getSearch("", [], [], [], "", "", "", [])

    }

    // Quick Add to Cart (Get Route)
    let addToCart = async (puzzleId, puzzle) => {

        try {
            // User is logged in, get user id from localStorage
            const localUser = JSON.parse(localStorage.getItem("user"))
            if (localUser) {
                await axios.get(process.env.REACT_APP_URL + "/api/cart/add"
                    + "?puzzle_id=" + puzzleId,
                    { headers: authorizationHeader() }
                ).then(() =>
                    setDisplayFlash(true)
                )
            } else {
                // Get cart array and Clone cart array
                let cloneOfLocalCart = cart

                // If puzzle exist in clone array
                if (cloneOfLocalCart.map(item => item.Puzzle.id).includes(puzzle.id)) {

                    // Find the puzzle item
                    let puzzleToUpdate = cloneOfLocalCart.find(item => item.Puzzle.id == puzzle.id)

                    // Get the current quantity of the puzzle item
                    let puzzleQuantityToUpdate = puzzleToUpdate.quantity

                    // Get index of puzzle to update inside clone array
                    let indexToUpdate = cloneOfLocalCart.indexOf(puzzleToUpdate)

                    // Splice and remove puzzle from index and replace with updated puzzle object with new quantity
                    cloneOfLocalCart.splice(indexToUpdate, 1, {
                        "Puzzle": puzzle,
                        "quantity": puzzleQuantityToUpdate + 1
                    })

                    setCart(cloneOfLocalCart)
                    localStorage.setItem("cart", JSON.stringify(cloneOfLocalCart))
                    setDisplayFlash(true)

                } else {
                    // If puzzle does not exist, add new puzzle object to array
                    let clone = [...cloneOfLocalCart, {
                        "Puzzle": puzzle,
                        "quantity": 1
                    }]

                    // set cloned array to the local storage cart
                    setCart(clone)
                    localStorage.setItem("cart", JSON.stringify(clone))
                    setDisplayFlash(true)
                }
            }
        } catch {
            alert("An error has occured please try again.")
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
        {displayFlash ?
            <div id="addItemFlashMessage">
                <FlashMessage duration={5000} persistOnHover={true}>
                    <p>Item Has been added to Cart!</p>
                </FlashMessage>
            </div>
            :
            null}

        {/* Search Box */}
        <div id="listings" className="container">
            <div id="searchbox-div-button" role="button" onClick={() => toggleAccordion()}>
                Search &nbsp;
                {searchDropdown ? <FaSearchMinus />
                    : <FaSearchPlus />
                }
            </div>

            {/* Search Dropdown when toggled to true */}
            {searchDropdown ?
                <div className="row">
                    {/* Keyword Search */}
                    <div className="search-div col-12 col-lg-6">
                        <label className="form-label search-label">Keyword Search</label>
                        <input type="text" className="form-control" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
                    </div>

                    {/* Search by Difficulty Level (Checkboxes) */}
                    <div className="search-div col-12 col-lg-6">
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
                    <div className="search-div col-12 col-lg-6">
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
                    <div className="search-div col-12 col-lg-6">
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
                    <div className="search-div col-12 col-lg-6">
                        <div><label className="form-label search-label">Price</label></div>
                        <div id="price-search-div">
                            <div id="price-search-div-1">
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
                    <div className="search-div col-12 col-lg-6">
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
                    <div className="search-div col-12 col-lg-6">
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
                    <button id="searchButton" className="btn btn-danger btn-sm" onClick={() => searchProducts()}>Search</button>
                    <button id="resetSearchButton" className="btn btn-success btn-sm" onClick={() => resetSearch()}>Reset</button>

                </div>
                : null}
        </div>

        {/* Display all Listings */}
        <div id="display-listings" className="container">
        <h1>View All Puzzles</h1>
            <div className="row">
                {context.getProducts().map(listings =>
                    <div className="col-12 col-sm-6 col-lg-4 mt-2 mb-2" key={listings.id}>
                        <div className="card card-listing" role="button">
                            <div onClick={() => modalDisplay(listings)}>
                                <img className="card-img-top card-image" src={listings.image} />
                                <div className="card-body">
                                    <h6 className="card-title">{listings.title}</h6>
                                    <span>${(listings.cost / 100).toFixed(2)}</span>
                                </div>
                            </div>
                            <button className="btn btn-danger" onClick={() => addToCart(listings.id, listings)}>Quick Add to Cart</button>
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