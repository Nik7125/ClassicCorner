import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';  // Your home page component
import AddItem from './components/AddItem';
import Profile from './components/Profile';
import UpdateItem from './components/UpdateItem';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/add-item" element={<AddItem />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/update-item/:id" element={<UpdateItem />} />
            </Routes>
        </Router>
    );
};

export default App;
