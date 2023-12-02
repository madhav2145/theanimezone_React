// Navbar.js
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import title from '../assets/theanimezone.png';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/authactions';


function Navbar() {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  
  
  const handleLogout = () => {
    // Perform logout logic, e.g., clear session
    sessionStorage.removeItem("jwt-token");
    dispatch(logout());
    // Redirect to the home page or any other appropriate page after logout
    navigate('/');
  };

  return (
    <nav className='h-[5rem] w-full border-b-2 border-red-600 bg-gradient-to-r from-gray-700 via-gray-900 to-black relative '>
      <div className='w-[25%] absolute bottom-2 left-5 text-4xl'>
        <Link to='/'>
          <button>
            <img src={title} className='h-[4rem]' alt='Logo' />
          </button>
        </Link>
      </div>

      <ul className='w-[65%] absolute bottom-5 right-5 grid grid-cols-6 grid-flow-row'>
        <li className='text-2xl text-red-600'>
          <Link to="/">Home</Link>
        </li>
        <li className='text-2xl text-red-600'>
          <Link to="/search">Search</Link>
        </li>
        <li className='text-2xl text-red-600'>
          <Link to="/about">About</Link>
        </li>
        <li className='text-2xl text-red-600'>
          <Link to="/contact">Contact</Link>
        </li>
        <li className='text-2xl text-red-600'>
          <Link to="/Kimetsu%20no%20Yaiba/comments">comments</Link>
        </li>

        {isLoggedIn ? (
          <>
            <li className='text-2xl text-red-600'>
              <Link to="/profile">Profile</Link>
            </li>
            <li className='text-2xl text-red-600'>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li className='text-2xl text-red-600'>
              <Link to="/login">Login</Link>
            </li>
            <li className='text-2xl text-red-600'>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
  
}

export default Navbar;

