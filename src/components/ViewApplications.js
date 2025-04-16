import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col, Modal, Form } from 'react-bootstrap';

const ViewApplications = () => {
  const [jobs, setJobs] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const fetchJobs = async () => {
    const res = await axios.get('https://localhost:7235/api/jobposting');
    setJobs(res.data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const deleteJob = async (id) => {
    await axios.delete(`https://localhost:7235/api/jobposting/${id}`);
    fetchJobs();
  };

  const handleEditClick = (job) => {
    setSelectedJob(job);
    setEditModal(true);
  };

  const handleEditChange = (e) => {
    setSelectedJob({ ...selectedJob, [e.target.name]: e.target.value });
  };

  const saveEdit = async () => {
    await axios.put(`https://localhost:7235/api/jobposting/${selectedJob.id}`, selectedJob);
    setEditModal(false);
    fetchJobs();
  };

  return (
    <Container className="mt-5">
      <h3>Job Postings</h3>
      <Row>
        {jobs.map((job) => (
          <Col md={4} className="mb-4" key={job.id}>
            <Card>
              <Card.Body>
                <Card.Title>{job.title}</Card.Title>
                <Card.Text>
                  <strong>Location:</strong> {job.location}<br />
                  <strong>Salary:</strong> ${job.salary}<br />
                  <strong>Department:</strong> {job.department}<br />
                  <strong>Type:</strong> {job.jobType}<br />
                  <strong>Deadline:</strong> {job.deadline.substring(0, 10)}<br />
                  <strong>Status:</strong> {job.status}
                </Card.Text>
                <Button variant="warning" className="me-2" onClick={() => handleEditClick(job)}>Edit</Button>
                <Button variant="danger" onClick={() => deleteJob(job.id)}>Delete</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={editModal} onHide={() => setEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Job Posting</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedJob && (
            <Form>
              {['title', 'description', 'location', 'salary', 'department', 'jobType', 'deadline'].map((field) => (
                <Form.Group className="mb-3" key={field}>
                  <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
                  <Form.Control type="text" name={field} value={selectedJob[field]} onChange={handleEditChange} />
                </Form.Group>
              ))}
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditModal(false)}>Close</Button>
          <Button variant="primary" onClick={saveEdit}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ViewApplications;
