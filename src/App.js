import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/Register';
import RecruiterLogin from './components/RecruiterLogin';
import CandidateLogin from './components/CandidateLogin';
import RecruiterDashboard from './components/RecruiterDashboard';
import CandidateDashboard from './components/CandidateDashboard';
import AddPosting from './components/AddPosting';
import ViewApplications from './components/ViewApplications';
import { UserProvider } from './components/UserContext';
import { JobProvider } from './components/JobContext';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <JobProvider>
    <UserProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Welcome to Recruitment App</h1>} />
        <Route path="/register" element={<Register />} />
        <Route path="/recruiter-login" element={<RecruiterLogin />} />
        <Route path="/candidate-login" element={<CandidateLogin />} />
        <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
        <Route path="/candidate-dashboard" element={<CandidateDashboard />} />
        <Route path="/add-posting" element={<AddPosting />} />
        <Route path="/view-applications" element={<ViewApplications />} />
      
      </Routes>
    </Router>
    </UserProvider>
    </JobProvider>
  );
}

export default App;
