
import React from 'react';
import logo from '../assets/theanimezonelogo.png';
function Footer() {
  return (
    <footer className='border-t-2 border-red-600 h-[8.5rem] bg-gradient-to-t from-red-700 via-slate-700 to-gray-900 relative'>
      <div className=' w-[25%] absolute bottom-6 left-20 text-4xl' >
        <img src={logo} className='h-[6rem]'/>
      </div>
      <ul className=' w-[50%] absolute bottom-8 right-[10rem] grid grid-cols-8 grid-rows-3 grid-flow-col gap-x-[15rem] pl-5 text-blue-300' >
        <li className=' text-lg'><a href="/">API</a></li>
        <li className=' text-lg'><a href="/">Recommendations</a></li>
        <li className=' text-lg'><a href="/">Discord</a></li>
        <li className=' text-lg'><a href="/">Twitter</a></li>
        <li className=' text-lg'><a href="/">Facebook</a></li>
        <li className=' text-lg'><a href="/">GitHub</a></li>
        <li className=' text-lg'><a href="/">contact</a></li>
        <li className=' text-lg '><a href="/">AboutUs</a></li>
        </ul>   
          </footer>
    
  );
}


export default Footer;
