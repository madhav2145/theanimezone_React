import React, { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../actions/authactions';



const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const onChangeUsername = (e) => {
    setFormData({
      ...formData,
      username: e.target.value,
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
    const authData = {
      username: formData.username,
      password: formData.password,    
    };

    axios
      .post("http://localhost:5000/api/users/login", authData)
      .then((res) => {
        const token = res.headers["auth-header"];
        sessionStorage.setItem("jwt-token", res.headers["auth-header"]);
        setFormData({ username: "", password: "" });
        toast.success('Login successful!', { autoClose: 5000 });
        navigate("/");
        dispatch(loginSuccess(token));
           
      })
      .catch((err) => {
        setFormData({ username: "", password: "" });
        toast.error(
          <span className="underline cursor-pointer" onClick={handleSignupClick}>
            Signup to Login
          </span>,
          { autoClose: 5000 }
        );
      });
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  

  return (
    <div className="container bg-slate-200 h-screen relative">
      <div className="h-1/2 w-1/2 bg-cyan-500 absolute top-[10rem] left-1/4 p-8">
        <h3 className="text-3xl font-bold mb-4 text-white">Login</h3>

        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <h1>Username</h1>
            <input
              type="text"
              required
              value={formData.username}
              onChange={onChangeUsername}
              placeholder="Enter your username"
              className="form-input"
            />
          </div>

          <div className="mb-4">
            <h1>Password</h1>
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

          <div className="mb-4 text-white text-center">
            <span
              className="underline cursor-pointer"
              onClick={handleSignupClick}
            >
              Signup to Login
            </span>
          </div>

          <div className="flex justify-center">
            <input
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              value="Login"
            />
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};


export default Login;

