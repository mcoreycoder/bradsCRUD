import React from 'react';
import { Link } from "react-router-dom"



function Home() {
  return (
    <div className="App">
     <p>Home</p>
     <Link to="/cats">Cats</Link>
     <br/>
     <Link to="/form">Form</Link>
    </div>
  );
}

export default Home;
