import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const Profile = () => {
    const currentUser = localStorage.getItem("currentUser");
    const [profile, setProfile] = useState(null); // Initialize as null

    const [items, setItems] = useState([])
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.post("http://127.0.0.1:8000/api/profile/", {
                    username: currentUser,  // Pass the username
                });
                setProfile(response.data.profile);
                setItems(response.data.items);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };
        fetchProfile();
    }, [currentUser]);

    return (
        <div>
            <Navbar/>
            <h1>Profile</h1>
            {profile ? (
                <div>
                    <p>Username : {profile.username}</p>
                    <p>Email : {profile.email}</p>
                    <p>First Name : {profile.first_name}</p>
                    <p>Last Name : {profile.last_name}</p>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}

            <h2>Your Items</h2>
            {items.length > 0 ? (
            <div>
                {items.map((item) => (
                    <div key={item.id}>
                    {console.log(item.image)}
                    <h2>{item.name}</h2>
                    {item.image && <img src={`http://127.0.0.1:8000${item.image}`} alt={item.name} width="200" />}
                    <p>Year : {item.year_of_manufacturing}</p>
                    <p>Description : {item.description}</p>
                    <p>Price : ${item.price}</p>
                    <p>Category : {item.category}</p>
                    </div>
                ))}
            </div>
                  ) : (
                <p>No items found.</p>
            )}


        </div>
    );
};

export default Profile;
