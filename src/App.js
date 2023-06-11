import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Button  from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";

import Navigation from "./Nav";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Footer from "./Footer";
import GPS from "./components/GPS";
import Dashboard from "./components/Dashboard";
import Logout from "./components/Logout";
import EmergencyContact from "./components/EmergencyContact";
import Journey from "./components/Journey";
import Dating from "./components/Dating";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header className="Nav">
          <Navigation />
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dating" element={<Dating />} />
            <Route path="/gps" element={<GPS />} />
            <Route path="/emergency" element={<EmergencyContact />} />
            <Route path="/journey" element={<Journey />} />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
