import React, { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext";

export default function Profile() {

  let context = useContext(UserContext);

  const [user, setUser] = useState([]);

  useEffect(() => {
    const userData = context.getUser()
    setUser(userData)
  })

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