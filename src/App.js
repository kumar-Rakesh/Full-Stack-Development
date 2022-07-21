import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import React from "react"

import Navbar from "./components/navbar";
import EditExercise from "./components/editExercise";
import CreateExercise from "./components/createExercise";
import CreateUser from "./components/createUser";
import ExercisesList from "./components/exercisesList";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Routes>
          <Route path="/" exact element={<ExercisesList />}></Route>
          <Route path="/edit/:id" element={<EditExercise />}></Route>
          <Route path="/create" element={<CreateExercise />}></Route>
          <Route path="/user" element={<CreateUser />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App
