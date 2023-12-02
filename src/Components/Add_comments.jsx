import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function AddComment(props) {
  const navigate = useNavigate();
  const { romaji } = useParams();

  const [state, setState] = useState({
    content: '',
  });

  const onChangeContent = (e) => {
    setState({
      content: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const comment = {
      content: state.content,
    };

    const jwt = sessionStorage.getItem('jwt-token');
    if (jwt === null) {
      toast.error('Login to add a comment', {
        autoClose: 5000,
        onClick: () => {
          navigate('/login');
        },
      });
    } else {
      const headers = {
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          'auth-header': jwt,
        },
      };

      try {
        const res = await axios.post(`http://localhost:5000/api/comments/add/${romaji}`, comment, headers);

        const json = { type: 'comment' };
        json.data = res.data;
        console.log(json);
        props.actions.send(JSON.stringify(json));

        toast.success('Comment added successfully!', { autoClose: 5000 });
        setState({ content: '' });
      } catch (err) {
        console.error(err);

        toast.error('Failed adding comment, please try again!', { autoClose: 5000 });
        setState({ content: '' });
      }
    }
  };

  return (
    <div>
      <ToastContainer />

      <h3 className="text-lg font-bold mb-4">Add a Comment</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <textarea
            rows="5"
            required
            className="w-[100%] p-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={state.content}
            placeholder="Type a comment"
            onChange={onChangeContent}
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Post Comment
          </button>
        </div>
      </form>
    </div>
  );
}
