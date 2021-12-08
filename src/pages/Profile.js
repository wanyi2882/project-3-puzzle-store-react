import React, { useState, useEffect } from "react";
import Moment from 'react-moment';
import axios from 'axios'
import authorizationHeader from "../services/authorization-header";

export default function Profile() {

  const [user, setUser] = useState([]);
  const [userOrders, setUserOrders] = useState([])

  // Retrieving profile of user 
  // If Authorization Request Header retrieve from local store through auth-header

  const getProfile = async () => {
    const response = await axios.get(process.env.REACT_APP_URL + "/api/users/profile", { headers: authorizationHeader() })
    const userData = response.data
    setUser(userData)
  };

  const getOrders = async () => {
    const response = await axios.get(process.env.REACT_APP_URL + "/api/orders", { headers: authorizationHeader() })
    const orders = response.data
    setUserOrders(orders)
  }

  useEffect(() => {
    getProfile()
    getOrders()
  }, [])

  return <React.Fragment>
    <div className="container">
      <div>
        <h3> {user.username} Profile </h3>
        <p> Id: {user.id} </p>
        <p> Email: {user.email} </p>
      </div>
      <div>
        <h3> Transactions </h3>
        {userOrders.map(order =>
          <div className="mt-2 mb-2" key={order.id}>
            <div className="card card-listing" role="button" >
              <div className="card-body">
                <h6 className="card-title">Order No.: {order.id}</h6>
                <span>Order Date: <Moment>{order.create_datetime}</Moment></span> <br />
                <span>Total amount: ${(order.total_cost / 100).toFixed(2)}</span> <br />
                <span>Sent to: {order.shipping_address}</span> <br />
                <span>Status: {order.OrderStatus.status}</span>
                <div>
                <button className="btn btn-primary"> More Details </button>
              </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  </React.Fragment>

};