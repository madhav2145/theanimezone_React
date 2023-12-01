
import React from 'react';
import title from '../assets/theanimezone.png';

function Navbar() {
  return (
    <nav className='h-[5rem] w-full border-b-2 border-red-600 bg-gradient-to-r from-gray-700 via-gray-900 to-black relative '>
     
      <div className='w-[25%]  absolute bottom-2 left-5 text-4xl' >
       <a href='/'> <button><img src={title} className='h-[4rem]'/></button>
       </a>
      </div>
      
      <ul className='w-[65%] absolute bottom-5 right-5 grid grid-cols-6 grid-flow-row' >
        <li className=' text-2xl text-red-600'><a href="/">Home</a></li>
        <li className=' text-2xl text-red-600'><a href="/About">About</a></li>
        <li className=' text-2xl text-red-600'><a href="/Contact">Contact</a></li>
        <li className=' text-2xl text-red-600'><a href="/Search">Search</a></li>
        <li className=' text-2xl text-red-600'><a href="/Login">login</a></li> 
        <li className=' text-2xl text-red-600'><a href="/Signup">signup</a></li>
      </ul>
      
      
    </nav>
  );
}

export default Navbar;
