import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Navigate } from 'react-router-dom';
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Login() {

    // we will use 3 hooks for setting the name, email and password of the user

    const [Email, SetEmail] = useState()
    const [Password, SetPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
    
        // Send a POST request to the server running on port 3001
        axios.post("http://localhost:3002/Login", { email: Email, password: Password })
            .then(result => {
                console.log(result.data); // Log the result if the request is successful
                // You can add logic here to handle the result, such as redirecting to a new page
                if (result.data === "Success") {
                    navigate('/Home')
                }
                
                else if (result.data ==="The password is incorrect"){
                    alert("the password is incorrect ! , please enter the correct password ")
                }
                else if (result.data === "No Record existed"){
                    alert ("the user not exist please enter valid user details ")
                }
                else{
                    console.log("Unexpected response:", result.data);
                }
            })
    
            // we have to navigate to sign page when user registered successfully
            .catch(err => {
                console.log(err); // Log any errors that occur during the request
                // You can add error handling logic here, such as displaying an error message to the user
            });
    }
    

    return (
        <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Login</h2>

                {/* when user tap on the register button it should go on the server side
        hence we will use a function after registering the user */}
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email'>
                            <strong>Email</strong>
                        </label>
                        <input
                            type='email'
                            placeholder='Enter Email'
                            autoComplete='off'
                            name='email'
                            className='form-control rounded-0'
                            onChange={(e) => {
                                SetEmail(e.target.value)
                            }}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'>
                            <strong>Password</strong>
                        </label>
                        <input
                            type='password'
                            placeholder='Enter password'
                            autoComplete='off'
                            name='password'
                            className='form-control rounded-0'
                            onChange={(e) => {
                                SetPassword(e.target.value)
                            }}
                        />
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0 border-0'>
                        Login
                    </button>
                </form>

            </div>
        </div>
    );
}

export default Login;
