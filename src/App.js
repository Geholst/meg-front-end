import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Button  from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css"
import Nav from './Nav';
import Home from './components/Home';
import Login from './components/Login';

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
    </Routes>
  </main>   
   </BrowserRouter>
    </div>

  );
}

export default App;