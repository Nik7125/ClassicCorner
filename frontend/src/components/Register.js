import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

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

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/register/', formData)
            .then((response) => {
                alert('User registered successfully');
                navigate('/login');
            })
            .catch((error) => {
                alert('Error: ' + error.response.data.error);
            });
    };

    return (
        <div>
            <Navbar/>
            <div className="flex w-full relative" style={{ backgroundImage: "url('02.jpg')", backgroundSize: 'cover', height:"calc(100vh - 47px)"}}>
                <div className='w-6/12 h-full flex items-center justify-center p-10'>
                    <img src='Vintage-Objects-PNG-Photo.png' alt="typewriter" className='w-10/12'/>
                </div>
                <div className='w-6/12 h-full pe-8 py-8'>
                    <form onSubmit={handleSubmit}>
                        <fieldset className="border border-black p-5 pt-3 rounded-md">
                            <legend className="text-lg">&nbsp;Register&nbsp;</legend>
                            <input name="username" placeholder="Username" onChange={handleChange} className="block border border-black rounded-md bg-transparent p-1 ps-3 my-2 w-full" required />
                            <input name="email" type="email" placeholder="Email" onChange={handleChange} className="block border border-black rounded-md bg-transparent p-1 ps-3 my-2 w-full" required />
                            <input name="first_name" placeholder="First Name" onChange={handleChange} className="block border border-black rounded-md bg-transparent p-1 ps-3 my-2 w-full" required />
                            <input name="last_name" placeholder="Last Name" onChange={handleChange} className="block border border-black rounded-md bg-transparent p-1 ps-3 my-2 w-full" required />
                            <input name="password" type="password" placeholder="Password" onChange={handleChange} className="block border border-black rounded-md bg-transparent p-1 ps-3 my-2 w-full" required />
                            <input name="confirm_password" type="password" placeholder="Confirm Password" onChange={handleChange} className="block border border-black rounded-md bg-transparent p-1 ps-3 my-2 w-full" required />
                            <input type="checkbox" name="terms_agreed" onChange={handleChange} className="mr-2" required />
                            <label>
                                I agree to the <span style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => setShowModal(true)}>Terms and Conditions</span>
                            </label>
                            <br/>
                            <button type="submit" className="bg-transparent border border-black px-3 py-2 mt-3 rounded hover:shadow-[2.5px_2.5px_1px_black] duration-300">Register</button>
                        </fieldset>
                    </form>
                </div>
            </div>
            
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
