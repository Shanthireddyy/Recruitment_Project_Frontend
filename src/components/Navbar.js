import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSignOutAlt, FaUser, FaUserTie, FaUserPlus } from 'react-icons/fa';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white px-4 shadow-sm border-bottom sticky-top">
      <Link className="navbar-brand fw-bold text-primary fs-3" to="/">
        <span className="text-dark">RecruitmentApplication</span>
      </Link>

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav align-items-center gap-2">
          {!token ? (
            <>
              <li className="nav-item">
                <Link className="nav-link text-dark fw-semibold" to="/recruiter-login">
                  <FaUserTie className="me-1" />
                  Recruiter Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark fw-semibold" to="/candidate-login">
                  <FaUser className="me-1" />
                  Candidate Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark fw-semibold" to="/register">
                  <FaUserPlus className="me-1" />
                  Register
                </Link>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <button
                className="btn btn-outline-danger d-flex align-items-center gap-2 fw-semibold"
                onClick={handleLogout}
              >
                <FaSignOutAlt />
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
