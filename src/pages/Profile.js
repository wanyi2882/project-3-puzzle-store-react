import React, { useState, useContext } from "react";
import AuthService from "../services/auth.service";
import UserContext from "../UserContext"; 

export default function Profile() {
  const currentLoginUser = AuthService.getCurrentUser();

  let context = useContext(UserContext);

  let user = context.getUser()


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