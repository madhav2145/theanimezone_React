import logo from './logo.svg';
import React from 'react';
import AboutUs from './Components/AboutUs'; 
import Contact from './Components/Contact';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Login from './Components/login';
import Signup from './Components/signup';
import Search from './Components/Search';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className='App'>
      <>
        <Router>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/about' element={<AboutUs/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/search' element={<Search/>}/>
          </Routes>
        </Router>
      </>
    </div>
  );
}

export default App;
