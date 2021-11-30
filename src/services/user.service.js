import React, { useState, useEffect } from "react";
import axios from "axios";
import authorizationHeader from "./authorization-header";
import UserContext from "../UserContext"

require('dotenv').config()

export default function UserService(props) {

  const [user, setUser] = useState([]);

  useEffect(() => {
    // Retrieving profile of user 
    // If Authorization Request Header retrieve from local store through auth-header
    const getProfile = async () => {
      const response = await axios.get(process.env.REACT_APP_URL + "/api/users/profile", { headers: authorizationHeader() })
      const userData = response.data
      setUser(userData)
    };
    getProfile()
  }, [])

  const context = {
    getUser: () => {
      return user
    }
  }

  return <UserContext.Provider value={context}>
    {props.children}
  </UserContext.Provider>





};