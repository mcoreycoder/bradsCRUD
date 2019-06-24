import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Cats() {
  const [cats, setCats] = useState([]);
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");

  const fetchAll = () => {
    fetch("http://localhost:4000")
      .then(response => response.json())
      .then(cats => setCats(cats));
  }

  useEffect(() => {
    fetchAll()
  }, []);

  const handleForm = (cat) => {
    // const cat = await fetch("http://localhost:4000/" + id).then(response =>
    //   response.json()
    // );
    // this fetch above is not needed since we can pass in the whole cat object
    console.log("I am batMan handleForm")
    setName(cat.name);
    setBreed(cat.breed);
    setEmail(cat.email);
    setId(cat._id);
  };

  const handleEdit = async (e, id) => {
    e.preventDefault();

    console.log("I am batMan handleEdit")
    const update = JSON.stringify({ name, breed, email });
    console.log("update:", update)
    console.log("id:", id)

    await fetch("http://localhost:4000/" + id, {
      method: "PUT",
      body: update,
      headers: {
        "Content-Type": "application/json"
      }
    });
    fetchAll()
    document.querySelector('.close').click();

  };

  const handleDelete = async id => {
    console.log("I am batMan handleDelete")
    await fetch("http://localhost:4000/" + id, {
      method: "DELETE"
    });
    //added fetch below to refresh data 
    fetchAll()
  };

  // console.log(cats, name, breed);

  return (
    <div className="App">
      <p>hi from cats</p>
      <Link to="/form">Form</Link>
      <br />
      <Link to="/">Home</Link>
      <br />
      {cats.map((cat) =>
        <div className="border" key={cat._id}>
          <h1> {cat.name}</h1>
          <h4> {cat.breed}</h4>
          <p> {cat.email}</p>
          <p> {cat._id}</p>

          <button
            type="button"
            className="btn btn-success"
            data-toggle="modal"
            data-target="#exampleModal"
            onClick={e => handleForm(cat)}
          >
            Edit
          </button>

          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Edit Kitty
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <form onSubmit={e => handleEdit(e, id)}>
                  <div className="form-group">
                    <label htmlFor="exampleInputName">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputName"
                      placeholder="Name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputBreed">Breed</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputBreed"
                      placeholder="Breed"
                      value={breed}
                      onChange={e => setBreed(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleInputEmail">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail"
                      placeholder="Email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                  <p>ID: {id}</p>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    //data-dismiss="modal" // adding this line closes modal but causes onSubmit to break
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-danger"
            onClick={e => handleDelete(cat._id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default Cats;
