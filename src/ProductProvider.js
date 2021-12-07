import React, { useState, useEffect } from "react";
import axios from "axios"
import ProductContext from "./ProductContext";

require('dotenv').config()

export default function ProductProvider(props) {

    const [products, setProducts] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("")
    const [searchDifficultyLevel, setSearchDifficultyLevel] = useState([])
    const [searchSize, setSearchSize] = useState([])
    const [searchTag, setSearchTag] = useState([])
    const [searchMinPrice, setSearchMinPrice] = useState("")
    const [searchMaxPrice, setSearchMaxPrice] = useState("")
    const [searchTheme, setSearchTheme] = useState([])
    const [searchAge, setSearchAge] = useState([])

    // Use Effect To fetch all Products
    useEffect(() => {
        const listings = async () => {
            const response = await axios.get(process.env.REACT_APP_URL + "/api/listings"
            + "?keyword=" + searchKeyword
            + "&"
            + "difficulty_level=" + searchDifficultyLevel
            + "&"
            + "size=" + searchSize
            + "&"
            + "tags=" + searchTag
            + "&"
            + "min_cost=" + searchMinPrice
            + "&"
            + "max_cost=" + searchMaxPrice
            + "&"
            + "theme=" + searchTheme
            + "&"
            + "age_group=" + searchAge)

            const data = response.data
            setProducts(data)
        }
        listings()
    }, [searchKeyword, searchDifficultyLevel, searchSize, searchTag, searchMinPrice, searchMaxPrice, searchTheme, searchAge])

    const context = {
        getProducts: () => {
            return products
        },
        getSearch: (searchKeywordProp, searchDifficultyLevelProp, searchSizeProp, searchTagProp, searchMinPriceProp, searchMaxPriceProp, 
                    searchThemeProp, searchAgeProp) => {
            setSearchKeyword(searchKeywordProp)
            setSearchDifficultyLevel(searchDifficultyLevelProp)
            setSearchSize(searchSizeProp)
            setSearchTag(searchTagProp)
            setSearchMinPrice(searchMinPriceProp)
            setSearchMaxPrice(searchMaxPriceProp)
            setSearchTheme(searchThemeProp)
            setSearchAge(searchAgeProp)
        }
    }

    return <ProductContext.Provider value={context}>
        {props.children}
    </ProductContext.Provider>
}