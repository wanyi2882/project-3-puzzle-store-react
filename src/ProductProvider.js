import React, { useState, useEffect } from "react";
import axios from "axios"
import ProductContext from "./ProductContext";

require('dotenv').config()

export default function ProductProvider(props) {

    const [products, setProducts] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("")

    useEffect(() => {
        const listings = async () => {
            const response = await axios.get(process.env.REACT_APP_URL + "/api/listings"
            + "?title=" + searchKeyword)

            const data = response.data
            setProducts(data)
        }
        listings()
    }, [searchKeyword])

    const context = {
        getProducts: () => {
            return products
        },
        getSearchKeyword: (searchKeywordProp) => {
            setSearchKeyword(searchKeywordProp)
        }
    }

    return <ProductContext.Provider value={context}>
        {props.children}
    </ProductContext.Provider>
}