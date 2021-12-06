import React, { useState, useEffect } from "react";

import axios from "axios";

import authorizationHeader from "../services/authorization-header";

export default function Cart() {

    const [cart, setCart] = useState([]);
    const [user, setUser] = useState([])

    useEffect(() => {
        getCart()
    }, [])

    useEffect(() => {
        getProfile()
    }, [])

    // Retrieving profile of user 
    // If Authorization Request Header retrieve from local store through auth-header
    const getProfile = async () => {
        const response = await axios.get(process.env.REACT_APP_URL + "/api/users/profile", { headers: authorizationHeader() })
        const userData = response.data
        setUser(userData)
    }

    // Get Cart Contents
    const getCart = async () => {
        const response = await axios.get(process.env.REACT_APP_URL + "/api/cart", { headers: authorizationHeader() })
        const cartData = response.data
        setCart(cartData)
    };

    // Add one quantity to item
    const updateCartAdd = async (index, puzzle_id) => {

        cart[index].quantity += 1;
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

    // Minus one quantity from item
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

    // Remove item from cart
    const removeFromCart = async (puzzle_id) => {

        await axios.post(process.env.REACT_APP_URL + "/api/cart/remove",
            {
                "puzzle_id": puzzle_id
            }
            , { headers: authorizationHeader() })
            .then(() => getCart())

    }

    return <React.Fragment>
            <div className="container">
                <h1>Cart</h1>
                <div className="row">
                    {cart.map(content =>
                        <div className="mt-2 mb-2" key={content.id}>
                            <div className="card card-listing" role="button" >
                                <img src={content.Puzzle.image} alt={content.Puzzle.title} width="200" />
                                <div className="card-body">
                                    <h6 className="card-title">{content.Puzzle.title}</h6>
                                    <span>${(content.Puzzle.cost / 100).toFixed(2)}</span>
                                    <div>Quantity:
                                        <button className="btn btn-primary btn-sm mx-1"
                                            onClick={() => updateCartMinus(cart.indexOf(content), content.Puzzle.id)}>-</button>
                                        <input type="text" value={content.quantity} style={{ width: "50px" }}
                                        />
                                        <button className="btn btn-primary btn-sm mx-1"
                                            onClick={() => updateCartAdd(cart.indexOf(content), content.Puzzle.id)}>+</button>
                                        <button className="btn btn-danger btn-sm mx-1"
                                            onClick={() => removeFromCart(content.Puzzle.id)}>Remove</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    {/* <button className="btn btn-success btn-sm"
                        onClick={() => checkout()}>Checkout</button> */}
                    <form action={process.env.REACT_APP_URL + "/api/checkout/create-checkout-session"} method="POST">
                        <div style={{ visibility: 'hidden' }} >
                            <input name="userId" id="userId" value={user.id} />
                        </div>
                        <button type="submit">
                            Checkout
                        </button>
                    </form>
                </div>
            </div>
        </React.Fragment>

}