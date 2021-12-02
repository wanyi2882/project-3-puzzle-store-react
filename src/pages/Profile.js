import React, { useState, useEffect } from "react";
import axios from 'axios'
import authorizationHeader from "../services/authorization-header";

export default function Profile() {

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

  return <React.Fragment>
    <div className="container">
      <h3>
        {user.username} Profile
      </h3>
      <p>
        Id: {user.id}
      </p>
      <p>
        Email: {user.email}
      </p>
    </div>
  </React.Fragment>

};