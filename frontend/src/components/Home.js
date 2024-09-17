import React from "react";
import Navbar  from "./Navbar.js";
import ItemList from "./ItemList.js";

function Home() {
  return (
    <div style={{ backgroundImage: "url('02.jpg')", backgroundSize: 'contain'}}>
      <Navbar/>
      <h1 style={{textAlign:"center", fontSize:"60px", color:"brown"}}>Welcome to ClassicCorner</h1>
      <ItemList />
    </div>
  );
}

export default Home;
