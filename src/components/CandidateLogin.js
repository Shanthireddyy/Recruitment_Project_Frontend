import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from './UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const CandidateLogin = () => {
  const [credentials, setCredentials] = useState({ userName: '', password: '' });
  const { setUserId } = useUserContext();
  const navigate = useNavigate();

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('https://localhost:7235/api/Auth/login', credentials);
      
      if (res.data.role === 'candidate') {
        setUserId(res.data.userId);     
        
        navigate('/candidate-dashboard');
      } else {
        alert("Not a candidate account.");
      }
    } catch (err) {
      console.error(err);
      alert("Candidate Login failed.");
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center text-primary mb-4">Candidate Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              className="form-control"
              name="userName"
              placeholder="Username"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Login as Candidate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CandidateLogin;
