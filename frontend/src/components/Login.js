import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/token/', formData)
            .then((response) => {
                localStorage.setItem('access_token', response.data.access);
                console.log(response.data)
                localStorage.setItem("logged", true);
                localStorage.setItem("currentUser", formData.username);
                alert('Login successful');
                navigate('/');
            })
            .catch((error) => {
                alert('Error: ' + error.response.data.detail);
        });
    };

    return (
        <div>
            <Navbar/>

            <div className="flex w-full relative" style={{ backgroundImage: "url('02.jpg')", backgroundSize: 'cover', height:"calc(100vh - 47px)"}}>
                <div className='w-6/12 h-full flex items-center justify-center p-10'>
                    <img src='04.png' alt="typewriter" className='w-9/12'/>
                </div>
                <div className='w-6/12 h-full pe-8 py-[93px]'>
                    <form onSubmit={handleSubmit}>
                        <fieldset className="border border-black p-5 pt-3 rounded-md">
                            <legend className="text-lg">&nbsp;Login&nbsp;</legend>
                            <input name="username" placeholder="Username" onChange={handleChange} className="block border border-black rounded-md bg-transparent p-1 ps-3 my-2 w-full" required />
                            <br/>
                            <input name="password" type="password" placeholder="Password" onChange={handleChange} className="block border border-black rounded-md bg-transparent p-1 ps-3 my-2 w-full" required />
                            <br/>
                            <button type="submit" className="bg-transparent border border-black px-5 py-2 mt-3 rounded hover:shadow-[2.5px_2.5px_1px_black] duration-300">Login</button>
                            <br/>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
