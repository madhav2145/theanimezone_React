import React from 'react';
// import Comments from './Components/comments';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {isLoggedIn} from './Login.jsx'; 

// var test1 = isLoggedIn;


// function test() {
//     console.log(test1);
// }

const Home = () => {
    return (
        <div>
            <h1>Welcome to the Anime Zone!</h1>
            <p>Watch your favorite anime shows here.</p>
            {/* <button onClick={test}>login</button> */}
            
            {/* <Route path='/comments' element={<Comments/>}/> */}
        </div>
       
    );
   
};



export default Home;
