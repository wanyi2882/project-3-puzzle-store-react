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

    useEffect(() => {
        const listings = async () => {
            const response = await axios.get(process.env.REACT_APP_URL + "/api/listings"
            + "?title=" + searchKeyword
            + "&"
            + "difficulty_level=" + searchDifficultyLevel
            + "&"
            + "size=" + searchSize
            + "&"
            + "tags=" + searchTag)

            const data = response.data
            setProducts(data)
        }
        listings()
    }, [searchKeyword, searchDifficultyLevel, searchSize, searchTag])

    const context = {
        getProducts: () => {
            return products
        },
        getSearch: (searchKeywordProp, searchDifficultyLevelProp, searchSizeProp, searchTagProp) => {
            setSearchKeyword(searchKeywordProp)
            setSearchDifficultyLevel(searchDifficultyLevelProp)
            setSearchSize(searchSizeProp)
            setSearchTag(searchTagProp)
        }
    }

    return <ProductContext.Provider value={context}>
        {props.children}
    </ProductContext.Provider>
}