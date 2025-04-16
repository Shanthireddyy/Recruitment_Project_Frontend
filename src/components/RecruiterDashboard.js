import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

const RecruiterDashboard = () => {
  const navigate = useNavigate();

  return (
    <Container className="text-center mt-5">
      <h2>Recruiter Dashboard</h2>
      <Button variant="primary" className="m-3" onClick={() => navigate('/add-posting')}>
        Add Posting
      </Button>
      <Button variant="success" className="m-3" onClick={() => navigate('/view-applications')}>
        View Applications
      </Button>
    </Container>
  );
};

export default RecruiterDashboard;