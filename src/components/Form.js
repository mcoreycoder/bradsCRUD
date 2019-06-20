import React, {useState} from "react";
import { Link } from "react-router-dom";

function Form() {

    const [name, setName] = useState("");
    const [breed, setBreed] = useState("");
    const [email, setEmail] = useState("");


   const handleSubmit = async (e) => {
    e.preventDefault()
    const data = JSON.stringify({name,breed,email})
    await fetch("http://localhost:4000" , {
        method: "POST",
        body: data ,
        headers: {
            'Content-Type': 'application/json',
        }
    })
   }
   

    console.log(name, breed, email)
    return (
       
    <div className="App">
      <Link to="/cats">Cats</Link>
      <br />
      <Link to="/">Home</Link>
      <br />
      <p>Form</p>
      <form onSubmit={e => handleSubmit(e,)}>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Name"
            value={name}
           onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Breed</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Breed"
            value={breed}
            onChange={e => setBreed(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Email</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
