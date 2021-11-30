import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import axios from 'axios'

// Create Hash Password
const createHash = require('create-hash')

const getHashedPassword = (password) => {
    const sha256 = createHash('sha256')
    const hash = sha256.update(password).digest('base64');
    return hash;
}

export default function Register() {

    let history = useHistory();

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const sendData = async () => {
        await axios.post(process.env.REACT_APP_URL + "/api/users/register",
            {
                "username": this.state.userName,
                "email": this.state.email,
                "password": getHashedPassword(this.state.password)
            })
    }

    // Account created upon all fields filled and meet criteria
    const createAccount = () => {
        let error = ""
        if (username.length < 8) {
            error = error + "Please enter a username with at least 8 characters.\n"
        }

        if (!email.includes("@") || !email.includes(".")) {
            error = error + "Please enter a valid email address.\n"
        }

        if (password.length < 8) {
            error = error + "Please enter a longer password.\n"
        }

        if (password != confirmPassword) {
            error = error + "Password and confirm password do not match"
        }

        if (error == "") {
            sendData()
            alert("Account Succesfully Created!")
            history.push("/login")
        } else {
            alert(error)
        }
    }

    return <React.Fragment>
        <div className="container">
            <h1>Create Account</h1>
            <div>
                <div>
                    <label className="form-label ">User Name:</label>
                    <input type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label className="form-label">Email:</label>
                    <input type="text"
                        className="form-control"
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
                <div>
                    <label className="form-label">Password:</label>
                    <input type="password"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
            </div>

            <button className="btn btn-primary mx-2"
                onClick={() => createAccount()}>Create New Account</button>

            <button className="btn btn-danger">
                <Link to="/login" className="link-style" >Cancel</Link>
            </button>
        </div>
    </React.Fragment>

}