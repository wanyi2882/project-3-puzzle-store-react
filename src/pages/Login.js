import React, { useState } from 'react'
import "../css/Login.css"

// Create Hash Password
const createHash = require('create-hash')

const getHashedPassword = (password) => {
    const sha256 = createHash('sha256')
    const hash = sha256.update(password).digest('base64');
    return hash;
}

export default function Login({login}) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // Login
    const onsubmit = () => {
        login(email, getHashedPassword(password))
    }

    return <React.Fragment>
        <div className="container">
            <h1>Login</h1>
            <div>
                <div>
                    <label className="form-label login-label">Email:</label>
                    <input type="text"
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label className="form-label login-label">Password:</label>
                    <input type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
            </div>

            <button id="login-btn" className="btn mx-2 mt-2"
                onClick={() => onsubmit()}>Login</button>
        </div>
    </React.Fragment>
}