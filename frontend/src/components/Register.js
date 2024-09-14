import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

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

    const [showModal, setShowModal] = useState(false);

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
        <div>
            <Navbar/>
            <form onSubmit={handleSubmit}>
                <input name="username" placeholder="Username" onChange={handleChange} required />
                <br/>
                <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
                <br/>
                <input name="first_name" placeholder="First Name" onChange={handleChange} required />
                <br/>
                <input name="last_name" placeholder="Last Name" onChange={handleChange} required />
                <br/>
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
                <br/>
                <input name="confirm_password" type="password" placeholder="Confirm Password" onChange={handleChange} required />
                <br/>
                <input type="checkbox" name="terms_agreed" onChange={handleChange} required />
                <label>
                    I agree to the <span style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => setShowModal(true)}>Terms and Conditions</span>
                </label>
                <br/>
                <button type="submit">Register</button>
            </form>

            {/* Terms and Conditions Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', zIndex: 1000
                }}>
                    <h2>Terms and Conditions</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius, sapien et luctus dapibus, orci felis bibendum nulla,
                        ac bibendum turpis urna in quam. Donec non lorem ut ipsum pellentesque faucibus. Vivamus euismod ligula sed malesuada ultricies.
                        Donec ut velit sem. Morbi gravida vehicula erat, in pharetra orci varius at.
                    </p>
                    <button onClick={() => setShowModal(false)} style={{ marginTop: '20px' }}>Close</button>
                </div>
            )}

            {/* Modal Overlay */}
            {showModal && <div style={{
                position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999
            }} onClick={() => setShowModal(false)}></div>}
        </div>
    );
};

export default Register;
