import { useEffect, useState } from "react";
import axios from "axios";

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get("http://127.0.0.1:8000/api/items/");
      setItems(response.data);
    };
    fetchItems();
  }, []);

  return (
    <div>
      <h1>Item List</h1>
      {items.map((item) => (
        <div key={item.id}>
          <h2>{item.name}</h2>
          <p>Year: {item.year_of_manufacturing}</p>
          <p>Description: {item.description}</p>
          <p>Price: ${item.price}</p>
          <p>Category: {item.category}</p>
          {console.log(item.image)}
          {item.image && <img src={`${item.image}`} alt={item.name} width="200" />}
        </div>
      ))}
    </div>
  );
};

export default ItemList;
