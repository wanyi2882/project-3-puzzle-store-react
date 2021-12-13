import React, { useState, useEffect } from "react";
import axios from "axios"
import UserContext from "../UserContext";
import authorizationHeader from "../services/authorization-header";

require('dotenv').config()

export default function UserProvider(props) {

  const [user, setUser] = useState([]);

  const getProfile = async () => {
    const response = await axios.get(process.env.REACT_APP_URL + "/api/users/profile", { headers: authorizationHeader() })
    const userData = response.data
    console.log(response.data)
    setUser(userData)
  };

  useEffect(() => {
    // Retrieving profile of user 
    // If Authorization Request Header retrieve from local store through auth-header
    
    getProfile()
  }, [])

  const context = {
    getUser: () => {
      console.log(user)
      return getProfile()

    }
  }

  return <UserContext.Provider value={context}>
    {props.children}
  </UserContext.Provider>
}