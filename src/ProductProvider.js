import React, { useState, useEffect } from "react";
import axios from "axios"
import ProductContext from "./ProductContext";

require('dotenv').config()

export default function ProductProvider(props) {

    const [products, setProducts] = useState('');


    useEffect( () => {

        const listings = async () => {
            const response = await axios.get(process.env.REACT_APP_URL + "/api/listings")
            const data = response.data
            setProducts(data)
        }

        listings()
    }, [])


    const context = {
        getProducts: () => {
            return products
        }
    }

    return <ProductContext.Provider value={context}>
        {props.children}
    </ProductContext.Provider>
}