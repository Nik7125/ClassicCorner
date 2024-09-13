import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirm_password: '',
        first_name: '',
        last_name: '',
        terms_agreed: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/register/', formData)
            .then((response) => {
                alert('User registered successfully');
            })
            .catch((error) => {
                alert('Error: ' + error.response.data.error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="first_name" placeholder="First Name" onChange={handleChange} required />
            <input name="last_name" placeholder="Last Name" onChange={handleChange} required />
            <input name="username" placeholder="Username" onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            <input name="confirm_password" type="password" placeholder="Confirm Password" onChange={handleChange} required />
            <label>
                <input type="checkbox" name="terms_agreed" onChange={handleChange} required />
                I agree to the Terms and Conditions
            </label>
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
