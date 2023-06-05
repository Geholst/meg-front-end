import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Button  from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css"
import Nav from './Nav';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup'

function App() {
  return (
   <div className="App"> 
   <BrowserRouter>
  <header className='Nav'>
    <Nav />
  </header>

  <main> 
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  </main>   
   </BrowserRouter>
    </div>

  );
}

export default App;