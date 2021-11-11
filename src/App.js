import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import AddPost from "./Post/AddPost";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import EditPost from "./Post/UpdatePost";
import SeePost from "./Post/SeePost";
import LoginAntd from "./components/Login/LoginAntd";
import RegisterAntd from "./components/Register/RegisterAntd";

function App() {
  return (
    <Router>
      {/* <Navigation /> */}
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/addpost" element={<AddPost />} />
        <Route path="/login" element={<LoginAntd />} />
        <Route path="/register" element={<RegisterAntd />} />
        <Route path="/post/:postId" element={<SeePost />} />
        <Route path="/post/:postId/edit" element={<EditPost />} />
      </Routes>
    </Router>
  );
}

export default App;
