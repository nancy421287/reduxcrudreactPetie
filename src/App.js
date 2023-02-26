import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddPet from "./components/AddPet";
import Pet from "./components/Pet";
import PetsList from "./components/PetsList";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/pets" className="navbar-brand">
         ismaCodes
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/pets"} className="nav-link">
              Petie´s
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<PetsList/>} />
          <Route path="/pets" element={<PetsList/>} />
          <Route path="/add" element={<AddPet/>} />
          <Route path="/pets/:id" element={<Pet/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
