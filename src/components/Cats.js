import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Cats() {
  const [cats, setCats] = useState([]);
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000")
      .then(response => response.json())
      .then(cats => setCats(cats));
  }, []);

  const handleForm = async (e, id) => {
    const cat = await fetch("http://localhost:4000/" + id).then(response =>
      response.json()
    );

    setName(cat.name);
    setBreed(cat.breed);
    setEmail(cat.email);
  };

  const handleEdit = async (e, id) => {
    e.preventDefault();
    const update = JSON.stringify({ name, breed, email });
    await fetch("http://localhost:4000/" + id, {
      method: "PUT",
      body: update,
      headers: {
        "Content-Type": "application/json"
      }
    });
  };
  const handleDelete = async id => {
    await fetch("http://localhost:4000/" + id, {
      method: "DELETE"
    });
  };

  console.log(cats, name, breed);

  return (
    <div className="App">
      <p>hi from cats</p>
      <Link to="/form">Form</Link>
      <br />
      <Link to="/">Home</Link>
      <br />
      {cats.map((cat, index) => (
        <div className="border" key={index}>
          <h1> {cat.name}</h1>
          <h4> {cat.breed}</h4>
          <p> {cat.email}</p>

          <button
            type="button"
            class="btn btn-success"
            data-toggle="modal"
            data-target="#exampleModal"
            onClick={e => handleForm(e, cat._id)}
          >
            Edit
          </button>

          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Edit Kitty
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <form onSubmit={e => handleEdit(e, cat._id)}>
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
            </div>
          </div>
          <button
            type="button"
            class="btn btn-danger"
            onClick={e => handleDelete(cat._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Cats;
