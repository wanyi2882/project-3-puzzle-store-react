import React from 'react'

import { useHistory } from 'react-router-dom'

export default function Restricted() {

    let history = useHistory();

    const returnToLogin = () => {
      history.push("/login");
    }
    return (
        <React.Fragment>
            <h1>Access Denied</h1>
            <p>You have entered a restricted page.</p>
            <p>Please <span style={{color: "red"}} role="button" onClick={() => returnToLogin()}>login</span>.</p>
        </React.Fragment>
    )
}