import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";
import BlogPost from "./components/BlogPost.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";


const isAuthenticated = false;

function ProtectedRoute({ children }) {
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />


        <Route
          path="/profile/*"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />


        <Route path="/blog/:id" element={<BlogPost />} />

      </Routes>

    </Router>
  );
}