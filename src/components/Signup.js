import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles.css';



const SignUp = () => {


    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password1, setPassword1] = useState('')
    const [message, setMessage] = useState('')



    function handleUsername(event) {
        setUsername(event.target.value)
    }
    function handleEmail(event) {
        setEmail(event.target.value)
    }

    function handlePassword(event) {
        setPassword(event.target.value)
    }

    function handlePassword1(event) {
        setPassword1(event.target.value)
    }

    async function handleSignup(event) {
        event.preventDefault();
        if (password1 !== password) {
            alert('password doesnt match')
        }
        else if (!email || !password || !password1 || !username) {
            alert('Please enter all fields.');
            return;
        }
        try {
                const userdetails = {
                    'username': username,
                    'password': password,
                    'email_address': email
                }

                const resp = await fetch('http://127.0.0.1:5000/api/v1/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userdetails)

                });
            const result = await resp.json();
            if (resp.ok) {
                if (result.message.success) {
                setMessage(result.message.success);
                window.location.replace('/login');
            }
                
            }
             else {
                if (result.error) {
                    if (result.error.details) {
                        setMessage(`Login failed: ${result.error.details}`);
                    } else if (result.error.username) {
                        setMessage(`Login failed: ${result.error.username}`);
                    } else if (result.error.email) {
                        setMessage(`Login failed: ${result.error.email}`);
                    }
                } else {
                    setMessage(`Registration failed with unknown error`);
                }
            }
            }
             catch (error) {
                setMessage(`An error occurred: ${error.message}`);
        }
        setEmail('')
        setPassword('')
        setPassword1('')
        setUsername('')
        
};

 
    return (
        <div className="base_fullHeight base_flexCenter base_flexColumn layout_gap40">
            <p>{message}</p>
            <form className="form" onSubmit={handleSignup}>
                <div className="form-group">
                    <label htmlFor="exampleInputText">Username</label>
                    <input type="text" className="form-control" id="exampleInputText"  placeholder="Enter Username" value={username} onChange={handleUsername}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={handleEmail}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword" placeholder="Password" value={password} onChange={handlePassword} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword">confirm password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={password1} onChange={handlePassword1} />
                </div>
                   <button type="submit" className="btn btn-primary">Submit</button>
            </form> 
            <div>
                 <a href="/login"> OR login</a>
            </div>
            
        </div>
    );
}

export default SignUp;





