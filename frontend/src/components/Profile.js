import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import "./ItemList.css";

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
            <div className="w-full p-7" style={{ backgroundImage: "url('02.jpg')", backgroundSize: 'cover'}}>
            
            <fieldset className="border border-black p-5 pt-3 rounded-md">
                <legend className="text-xl">&nbsp;Profile&nbsp;</legend>
                {profile ? (
                    <div>
                        <p>First Name : {profile.first_name}</p>
                        <p>Last Name : {profile.last_name}</p>
                        <p>Username : {profile.username}</p>
                        <p>Email : {profile.email}</p>
                    </div>
                ) : (
                    <p>Loading profile...</p>
                )}
            </fieldset>

            <br/>

            <fieldset className="border border-black p-5 pt-3 rounded-md pb-8">
                <legend className="text-xl">&nbsp;Your Items&nbsp;</legend>
            
            {items.length > 0 ? (
                    <div className="grid grid-cols-3 gap-4">
                        {items.map((item) => (
                            <div key={item.id}>
                            <div className="wsk-cp-product">
                                <div className="wsk-cp-img">
                                    <img src={`http://127.0.0.1:8000${item.image}`} alt={item.name} className="img-responsive" />
                                </div>

                                <div className="wsk-cp-text">
                                    <div className="category">
                                    <span>{item.category}</span>
                                    </div>
                                    <div className="title-product">
                                    <h3>{item.name}</h3>
                                    </div>
                                    <div className="description-prod">
                                    <p>{item.description}</p>
                                    </div>
                                    <div className="card-footer">
                                        <div className="wcf-left"><span className="price">${item.price}</span></div>
                                        <div className="wcf-right">
                                            <Link to={`/update-item/${item.id}`} className='bg-transparent border border-black px-1 py-1 rounded hover:shadow-[2.5px_2.5px_1px_black] duration-300 text-sm mr-2'>Update</Link>
                                            <button onClick={() => handleDelete(item.id)} className='bg-transparent border border-black p-[0.18rem] px-2 rounded hover:shadow-[2.5px_2.5px_1px_black] duration-300 text-sm'>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        ))}
                </div>
            ) : (
                <p>No items found.</p>
            )}
            </fieldset>

            </div>
        </div>
    );
};

export default Profile;
