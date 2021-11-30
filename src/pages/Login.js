import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

require('dotenv').config()

export default function Login({login}) {

    const history = useHistory()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // Login
    const onsubmit = () => {
        login(email, password)
    }

    return <React.Fragment>
        <div className="container">
            <h1>Login</h1>
            <div>
                <div>
                    <label className="form-label">Email:</label>
                    <input type="text"
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label className="form-label">Password:</label>
                    <input type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
            </div>

            <button className="btn btn-primary mx-2"
                onClick={() => onsubmit()}>Login</button>
        </div>
    </React.Fragment>
}