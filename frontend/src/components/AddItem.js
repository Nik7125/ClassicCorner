import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddItem = () => {
  const [item, setItem] = useState({
    name: "",
    year_of_manufacturing: "",
    description: "",
    price: "",
    category: "",
    stock: ""
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", item.name);
    formData.append("year_of_manufacturing", item.year_of_manufacturing);
    formData.append("description", item.description);
    formData.append("price", item.price);
    formData.append("category", item.category);
    formData.append("owner", localStorage.getItem("currentUser"))
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/items/add/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Item added successfully!");
      navigate("/")
    } catch (error) {
      console.error(error);
    }
  };

  const categories = [
    "Furniture",
    "Clothing",
    "Antiques",
    "Vinyl Records",
    "Cameras",
    "Books",
    "Art",
    "Collectibles",
    "Home Decor",
    "Toys & Games",
    "Jewelry",
    "Retro Tech",
    "Accessories"
  ];

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Item Name"
        value={item.name}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="year_of_manufacturing"
        placeholder="Year of Manufacturing"
        value={item.year_of_manufacturing}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={item.description}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={item.price}
        onChange={handleChange}
        required
      />
      {/* <input
        type="text"
        name="category"
        placeholder="Category"
        value={item.category}
        onChange={handleChange}
      /> */}
      <select
        name="category"
        value={item.category}
        onChange={handleChange}
        required
      >
        <option value="" disabled>Select a Category</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleImageChange}
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItem;
