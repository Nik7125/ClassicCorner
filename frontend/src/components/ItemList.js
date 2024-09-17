import { useEffect, useState } from "react";
import axios from "axios";
import "./ItemList.css";

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
      <div className="shell">
          <div className="grid grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.id}>
            <div className="wsk-cp-product">
              <div className="wsk-cp-img">
                <img src={`${item.image}`} alt={item.name} className="img-responsive" />
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
                  <div className="wcf-right"><p>By <span>{item.owner}</span></p></div>
                  {/* <div className="wcf-right"><a href="#" className="buy-btn"><i className="zmdi zmdi-shopping-basket"></i></a></div> */}
                </div>
              </div>
            </div>
            </div>
          ))}
          </div>
      </div>

      <h1>Item List</h1>
      {items.map((item) => (
        <div key={item.id}>
          <p>Year : {item.year_of_manufacturing}</p>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
