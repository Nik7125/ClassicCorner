import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/token/', formData)
            .then((response) => {
                localStorage.setItem('access_token', response.data.access);
                console.log(response.data)
                alert('Login successful');
            })
            .catch((error) => {
                alert('Error: ' + error.response.data.detail);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="username" placeholder="Username" onChange={handleChange} required />
            <br/>
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            <br/>
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
