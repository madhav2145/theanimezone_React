import React from 'react';
import AboutUs from './Components/AboutUs'; 
import Contact from './Components/Contact';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Login from './Components/login';
import Signup from './Components/signup';
import Search from './Components/Search';
import Content from './Components/Content';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {


  return (
    <div className='App'>
      <>
      <Navbar />
        <Router>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/about' element={<AboutUs/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/search' element={<Search/>}/>
            <Route path='/:romaji/content' element={<Content/>}/>
          </Routes>
        </Router>
        <Footer />
      </>
    </div>
  );
 }

export default App;
