import React, { useState, useEffect } from "react";
import "../css/Cart.css"

import axios from "axios";

import authorizationHeader from "../services/authorization-header";

export default function Cart() {

    const [cart, setCart] = useState([]);
    const [user, setUser] = useState("");

    // Get Cart Contents if user is logged in
    const getCart = async () => {
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
            } else {
                // If nothing in local storage cart
                setCart(cartData)
            }
        } else if (localStorage.getItem("cart")) {
            let localCart = JSON.parse(localStorage.getItem("cart"))
            setCart(localCart)
        } else {
            // create an empty cart
            localStorage.setItem("cart", JSON.stringify([]));
        }
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        if (user) {
            setUser(user.id)
        }

        getCart()
    }, [])

    // Add one quantity to item
    const updateCartAdd = async (index, puzzle_id) => {

        cart[index].quantity += 1;
        const updateCart = [...cart];
        setCart(updateCart);

        const quantity = cart[index].quantity

        // Logged in User
        if (localStorage.getItem("user")) {
            await axios.post(process.env.REACT_APP_URL + "/api/cart/quantity/update",
                {
                    "puzzle_id": puzzle_id,
                    "newQuantity": quantity
                }
                , { headers: authorizationHeader() })
        } else {
            // Not logged in
            localStorage.removeItem("cart")
            localStorage.setItem("cart", JSON.stringify(updateCart));
        }
    }

    // Minus one quantity from item
    const updateCartMinus = async (index, puzzle_id) => {

        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
            const updateCart = [...cart];
            setCart(updateCart);

            const quantity = cart[index].quantity

            //Logged in user
            if (localStorage.getItem("user")) {
                await axios.post(process.env.REACT_APP_URL + "/api/cart/quantity/update",
                    {
                        "puzzle_id": puzzle_id,
                        "newQuantity": quantity
                    }
                    , { headers: authorizationHeader() })
            } else {
                // Not logged in
                localStorage.removeItem("cart")
                localStorage.setItem("cart", JSON.stringify(updateCart));
            }
        }
    }

    // Remove item from cart
    const removeFromCart = async (index, puzzle_id) => {

        cart.splice(index, 1)

        // Logged in user
        if (localStorage.getItem("user")) {
            await axios.post(process.env.REACT_APP_URL + "/api/cart/remove",
                {
                    "puzzle_id": puzzle_id
                }
                , { headers: authorizationHeader() })
                .then(() => getCart())
        } else {
            // Not logged in
            localStorage.removeItem("cart")
            localStorage.setItem("cart", JSON.stringify(cart));
            getCart()
        }
    }

    return <React.Fragment>
        {cart == ""
            ?
            <div className="container">
                <h1>Cart</h1>
                <div>Your Cart is Empty!</div>
                <div>Click <span><a href="/listings">here</a></span> to view all puzzles!</div>
            </div>
            :
            <div className="container">
                <h1>Cart</h1>
                <div className="row">
                    {cart.map(content =>
                        <div className="mt-2 mb-2" key={content.id}>
                            <div className="card" role="button" >
                                <img className="cart-img" src={content.Puzzle.image} alt={content.Puzzle.title} width="200" />
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
                                            onClick={() => removeFromCart(cart.indexOf(content), content.Puzzle.id)}>Remove</button>
                                    </div>
                                    <div>
                                        Sub-Total: ${((content.quantity * content.Puzzle.cost) / 100).toFixed(2)}
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    {/* Checkout to Stripe */}
                    {localStorage.getItem("user") ?
                        <form action={process.env.REACT_APP_URL + "/api/checkout/create-checkout-session"} method="POST">
                            <div style={{ visibility: 'hidden' }} >
                                <input name="userId" id="userId" value={user} />
                            </div>
                            <button type="submit" className="btn btn-success" id="checkout-btn">
                                Checkout
                            </button>
                        </form>
                        : <button className="btn btn-danger">
                            Login to checkout
                        </button>
                    }
                </div>
            </div>
        }

    </React.Fragment>

}