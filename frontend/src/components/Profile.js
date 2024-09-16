import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

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

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
          try {
            await axios.delete(`http://127.0.0.1:8000/api/items/${id}/delete/`);
            setItems(items.filter(item => item.id !== id));  // Remove the deleted item from the state
          } catch (error) {
            console.error("Failed to delete item:", error);
          }
        }
      };

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
                    <Link to={`/update-item/${item.id}`}>Update</Link>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
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
