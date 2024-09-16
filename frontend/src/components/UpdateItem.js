import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState({
    name: "",
    year_of_manufacturing: "",
    description: "",
    price: "",
    category: "",
    stock: ""
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
        const response = await axios.get(`http://127.0.0.1:8000/api/items/${id}/`);
      setItem(response.data);
    };
    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", item.name);
    formData.append("year_of_manufacturing", item.year_of_manufacturing);
    formData.append("description", item.description);
    formData.append("price", item.price);
    formData.append("category", item.category);
    formData.append("stock", item.stock);
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.patch(`http://127.0.0.1:8000/api/items/${id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Item updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error(error);
    }
  };

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
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={item.category}
        onChange={handleChange}
      />
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleImageChange}
      />
      <button type="submit">Update Item</button>
    </form>
  );
};

export default UpdateItem;
