import React, { useState, useEffect } from "react";
import axios from "axios";
import authorizationHeader from "../services/authorization-header";

export default function Cart() {

    const [cart, setCart] = useState([]);

    useEffect(() => {
        // Retrieving profile of user 
        // If Authorization Request Header retrieve from local store through auth-header
        const getCart = async () => {
            const response = await axios.get(process.env.REACT_APP_URL + "/api/cart", { headers: authorizationHeader() })
            const cartData = response.data
            setCart(cartData)
        };
        getCart()
    }, [])

    const updateCartAdd = (index) => {

        cart[index].quantity += 1;
        const updateCart = [...cart];
        setCart(updateCart);

    }

    const updateCartMinus = async (index, puzzle_id) => {

        cart[index].quantity -= 1;
        const updateCart = [...cart];
        setCart(updateCart);

        const quantity = cart[index].quantity

        await axios.post(process.env.REACT_APP_URL + "/api/cart/quantity/update",
        {
            "puzzle_id": puzzle_id,
            "newQuantity": quantity
        }
        , { headers: authorizationHeader() })

    }


    // console.log(cart)

    return <React.Fragment>
        <div className="container">
            <h1>Cart</h1>
            <div className="row">
                {cart.map(content =>
                    <div className="mt-2 mb-2" key={content.id}>
                        <div className="card card-listing" role="button" >
                            <img src={content.puzzle.image} alt={content.puzzle.title} width="200" />
                            <div className="card-body">
                                <h6 className="card-title">{content.puzzle.title}</h6>
                                <span>${(content.puzzle.cost / 100).toFixed(2)}</span>
                                <div>Quantity:
                                <button className="btn btn-primary btn-sm mx-1" 
                                    onClick={() => updateCartMinus(cart.indexOf(content), content.puzzle.id)}>-</button>
                                    <input type="number" value={content.quantity} style={{width: "50px"}}
                                    />
                                    <button className="btn btn-primary btn-sm mx-1" 
                                    onClick={() => updateCartAdd(cart.indexOf(content), content.puzzle.id)}>+</button>
                                </div>

                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </React.Fragment>

}