import React from "react";
import logo from "../assets/logo192.png";
import amv from "../assets/Gang_Torture_Dance.mp4"
const AboutUs = () => {
  return (
    <div className="box-border h-screen w-full bg-gradient-to-r from-gray-700 via-gray-900 to-black p-5 relative space-y-5">
      <div className="h-full w-1/2 border border-red-600 rounded-xl bg-slate-300 relative">
        <div className="h-full w-[full] rounded-xl bg-gradient-to-t from-red-700 via-slate-800 to-gray-900">
          <h5 className="text-center text-7xl pt-[4rem] text-red-600 ">THEANIMEZONE</h5>
          <p className="text-white">
            Your go-to destination for discovering and tracking your favorite
            anime series and movies.
          </p>
          <video src={amv} autoPlay loop muted className="h-[75%] w-[95%] pl-10" />
        </div>
      </div>
      <div className="h-[46%] w-[48%] border border-red-600 rounded-xl bg-gradient-to-t from-red-700 via-slate-800 to-gray-900 absolute top-0 right-5 text-white ">
        <h1 className="text-left ml-5 mt-5 mr-[60%] p-2 text-2xl border border-red-600 rounded-xl text-red-600 ">
          Key Features
        </h1>
        <ul className="list-disc list-inside">
          <li className="text-left p-2 pl-5">
            Our website features a vast database of anime series and movies,
            ensuring you can find information on almost any title you're
            interested in.
          </li>
          <li className="text-left p-2 pl-5">
            Share your thoughts on your favorite (or not-so-favorite) anime
            titles. Read reviews from other users to discover hidden gems or
            avoid disappointments.
          </li>
          <li className="text-left p-2 pl-5">
            Create and manage your own anime lists – whether it's a "Plan to
            Watch" list, a list of favorites, or a history of what you've
            watched.
          </li>
          <li className="text-left p-2 pl-5">
            Join discussions, forums, and interact with fellow anime fans. Our
            community is a welcoming space for sharing recommendations,
            theories, and more.
          </li>
        </ul>
      </div>
      <div className="h-[46%] w-[48%] border border-red-600 rounded-xl bg-gradient-to-t from-red-700 via-slate-800 to-gray-900 absolute bottom-5 right-5 ">
        <h1 className="text-left ml-5 mt-5 mr-[60%] p-2 text-2xl rounded-xl text-red-600">
          Team Members
        </h1>
        <div className="grid grid-cols-3 text-white">
          <div className="border border-red-600 container">
            <img
              src={logo}
              alt="Your Alt Text"
              className="h-[12rem] w-[14rem]  pl-6 pt-3 "
            />
            <h1>madhur</h1>
            <p>iiitl student</p>
          </div>
          <div className="border border-red-600">
            <img
              src={logo}
              alt="Your Alt Text"
              className="h-[12rem] w-[14rem]  pl-6 pt-3 "
            />
            <h1>madhur</h1>
            <p>iiitl student</p>
          </div>
          <div className="border border-red-600">
            <img
              src={logo}
              alt="Your Alt Text"
              className="h-[12rem] w-[14rem]  pl-6 pt-3 "
            />
            <h1>madhur</h1>
            <p>iiitl student</p>
          </div>
        </div>
      </div>
    </div>

    
  );
};

export default AboutUs;