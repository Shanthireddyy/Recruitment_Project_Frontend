import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const RecruiterLogin = () => {
  const [credentials, setCredentials] = useState({ userName: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('https://localhost:7235/api/Auth/login', credentials);
      
      // This assumes response has role field or you can hardcode condition for recruiter
      if (res.data.role === 'recruiter') {
        localStorage.setItem('token', res.data.token);
        navigate('/recruiter-dashboard');
      } else {
        alert("Not a recruiter account.");
      }
    } catch (err) {
      console.error(err);
      alert("Recruiter Login failed.");
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center text-success mb-4">Recruiter Login</h2>
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
            <button type="submit" className="btn btn-success">
              Login as Recruiter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecruiterLogin;
