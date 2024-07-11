import React, { useState } from "react";
import '../styles.css';
const { fetch } = require('whatwg-fetch');

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    function handleEmail(event) {
        setUsername(event.target.value)
    }

    function handlePassword(event) {
        setPassword(event.target.value)
    }
    async function handleLogin(event) {
        event.preventDefault();
       if (!username || !password) {
        alert('Please enter both username and password.');
        return;
    }
        try {
            const userdata = {
                'username': username,
                'password': password
            };
            const response =  await fetch('http://127.0.0.1:5000/api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
                body: JSON.stringify( userdata ),

            });
            const result = await response.json();
            if (response.ok) {
                localStorage.setItem('token', result.message.token);
                setMessage('Login successful!');
                 window.location.replace('/dashboard')
            } else {
                if (result.Error.password) {
                    setMessage(`Login failed: ${result.Error.password}`);
                } else if(result.Error.details){
                    setMessage(`Login failed: ${result.Error.details}`);
                }}
                
            }catch (error) {
            setMessage(`An error occurred: ${error.message}`);
        }
    };

    return (
        <div className="base_fullHeight base_flexCenter base_flexColumn layout_gap40 layout_container">
            <p className="msg">{message}</p>
            <form className="form" onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">username</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={username} onChange={handleEmail}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={handlePassword}/>
                </div>
                   <button type="submit" className="btn btn-primary" >Login</button>
            </form> 
            <div>
                <a href="/register">OR register</a>
            </div>
            
        </div>
    );
}

export default Login;