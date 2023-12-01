// Signup.js

import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginSuccess } from '../actions/authactions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const onChangeUsername = (e) => {
    setFormData({
      ...formData,
      username: e.target.value,
    });
  };

  const onChangeFirstName = (e) => {
    setFormData({
      ...formData,
      firstName: e.target.value,
    });
  };

  const onChangeLastName = (e) => {
    setFormData({
      ...formData,
      lastName: e.target.value,
    });
  };

  const onChangeEmail = (e) => {
    setFormData({
      ...formData,
      email: e.target.value,
    });
  };

  const onChangePassword = (e) => {
    setFormData({
      ...formData,
      password: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const user = {
      username: formData.username,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      hash: formData.password,
    };

    axios
      .post("http://localhost:5000/api/users/register", user)
      .then((res) => {
        const authData = {
          username: formData.username,
          password: formData.password,
        };
        axios
          .post("http://localhost:5000/api/users/login", authData)
          .then((res) => {
            sessionStorage.setItem("jwt-token", res.headers["auth-header"]);
            dispatch(loginSuccess(res.headers["auth-header"]));
            toast.success('You have Signed Up and Logged In', { autoClose: 5000 });
            setFormData({
              username: "",
              firstName: "",
              lastName: "",
              email: "",
              password: "",
            });
            navigate('/'); 
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          const errorMessage = err.response.data.message;
          if (errorMessage.includes("Username")) {
            toast.error(errorMessage, { autoClose: 5000 });
          } else if (errorMessage.includes("Email")) {
            toast.error(errorMessage, { autoClose: 5000 });
          } else {
            console.log(err);
          }
        } else {
          console.log(err);
        }
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h3 className="text-3xl font-bold mb-4 text-gray-800">Sign Up</h3>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="text-gray-800 block mb-1">Username</label>
            <input
              type="text"
              required
              value={formData.username}
              onChange={onChangeUsername}
              placeholder="Enter your username"
              className="form-input"
            />
          </div>

          <div className="grid grid-rows-2 gap-4">
            <div>
              <label className="text-gray-800 block mb-1">First Name</label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={onChangeFirstName}
                placeholder="Enter your first name"
                className="form-input"
              />
            </div>

            <div>
              <label className="text-gray-800 block mb-1">Last Name</label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={onChangeLastName}
                placeholder="Enter your last name"
                className="form-input"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-gray-800 block mb-1">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={onChangeEmail}
              placeholder="Enter your email"
              className="form-input"
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-800 block mb-1">Password</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={onChangePassword}
              minLength="8"
              placeholder="Enter your password"
              className="form-input"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
    
  );
}
