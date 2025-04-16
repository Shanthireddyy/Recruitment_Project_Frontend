import React, { useEffect, useState } from "react";
import { useUserContext } from './UserContext';
import { useJobContext } from "./JobContext"; 

const CandidateDashboard = () => {
  const { userId } = useUserContext();
  const [candidateInfo, setCandidateInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showApplications, setShowApplications] = useState(false);
  const [jobPostings, setJobPostings] = useState([]);
  const [selectedResumes, setSelectedResumes] = useState({});
  const [loading, setLoading] = useState(true); // Loading state for fetch requests
  const [appliedJobs, setAppliedJobs] = useState([]); 

  useEffect(() => {
    fetchCandidateInfo();
  }, [userId]);

  const fetchCandidateInfo = async () => {
    try {
      const response = await fetch(`https://localhost:7235/api/profile/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch candidate info");
      }
      const data = await response.json();
      setCandidateInfo(data);
    } catch (error) {
      console.error("Error fetching candidate info:", error);
      alert("Error fetching candidate info.");
    } finally {
      setLoading(false);
    }
  };

  const fetchJobPostings = async () => {
    try {
      const response = await fetch("https://localhost:7235/api/jobposting");
      if (!response.ok) {
        throw new Error("Failed to fetch job postings");
      }
      const data = await response.json();
      setJobPostings(data);
    } catch (error) {
      console.error("Error fetching job postings:", error);
      alert("Error fetching job postings.");
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`https://localhost:7235/api/profile/${candidateInfo.profileId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(candidateInfo),
      });

      if (response.ok) {
        alert("Profile updated successfully!");
        setIsEditing(false);
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating candidate info:", error);
      alert("Error updating candidate info.");
    }
  };

  const handleChange = (e) => {
    setCandidateInfo({ ...candidateInfo, [e.target.name]: e.target.value });
  };

  const toggleApplications = () => {
    setShowApplications((prev) => !prev);
    if (!showApplications) fetchJobPostings(); // Only fetch when opening
  };

  const handleResumeChange = (e, jobId) => {
    setSelectedResumes({ ...selectedResumes, [jobId]: e.target.files[0] });
  };

  const handleApply = async (jobId) => {
    const resume = selectedResumes[jobId];
    if (!resume) return alert("Please upload a resume before applying.");
  
    const formData = new FormData();
    formData.append("JobPostingId", jobId);
    formData.append("CandidateName", candidateInfo.fullName);
    formData.append("Email", candidateInfo.email);
    formData.append("resume", resume);
    console.log("Applying to jobId:", jobId);
    console.log("Candidate Name:", candidateInfo.fullName);
    console.log("Email:", candidateInfo.email);
    console.log("Resume File:", resume.name);

  
    // Log the formData to inspect its content
    for (let pair of formData.entries()) {
      console.log(pair[0]+ ': ' + pair[1]);
    }
  
    try {
      const response = await fetch("https://localhost:7235/api/JobApplication/apply", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        setAppliedJobs((prev) => [...prev, jobId]);
        alert("Application submitted successfully!");
      } else {
        const errorData = await response.json();
        console.error("Failed to submit application:", errorData);
        alert(`Failed to submit application. Error: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error applying to job:", error);
      alert("Something went wrong. Please try again later.");
    }
  };
  
  
  
  if (loading) {
    return <div className="text-center mt-5">Loading candidate dashboard...</div>;
  }

  if (!candidateInfo) return <div className="text-center mt-5">No candidate info available.</div>;

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-body p-5">
          <h2 className="card-title mb-4 text-primary text-center">
            👋 Welcome, {candidateInfo.fullName}
          </h2>

          {/* Personal Info */}
          <h5 className="mb-3 text-secondary">🧑 Candidate Information</h5>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Full Name:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="fullName"
                  value={candidateInfo.fullName}
                  onChange={handleChange}
                  className="form-control"
                />
              ) : (
                <p className="form-control-plaintext">{candidateInfo.fullName}</p>
              )}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Email:</label>
              <p className="form-control-plaintext">{candidateInfo.email}</p>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Phone:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={candidateInfo.phone}
                  onChange={handleChange}
                  className="form-control"
                />
              ) : (
                <p className="form-control-plaintext">{candidateInfo.phone}</p>
              )}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Skills:</label>
              {isEditing ? (
                <textarea
                  name="skills"
                  value={candidateInfo.skills}
                  onChange={handleChange}
                  className="form-control"
                  rows="3"
                  placeholder="e.g., Java, React, Python"
                />
              ) : (
                <p className="form-control-plaintext">{candidateInfo.skills}</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-end mb-3">
            {isEditing ? (
              <>
                <button onClick={handleUpdate} className="btn btn-success me-2 shadow-sm">
                  Save
                </button>
                <button onClick={() => setIsEditing(false)} className="btn btn-secondary shadow-sm">
                  Cancel
                </button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)} className="btn btn-outline-primary shadow-sm">
                Edit Profile
              </button>
            )}
          </div>

          {/* View Applications Toggle */}
          <div className="text-end">
            <button onClick={toggleApplications} className="btn btn-info shadow-sm">
              {showApplications ? "Hide Applications" : "View Applications"}
            </button>
          </div>

          {/* Applications Section */}
          {showApplications && (
            <div className="mt-4">
              <h5 className="text-secondary mb-3">📄 Job Postings</h5>
              <div className="row">
                {jobPostings.map((job) => (
                  <div className="col-md-6 mb-4" key={job.id}>
                    <div className="card h-100 shadow-sm">
                      <div className="card-body">
                        <h5 className="card-title">{job.title}</h5>
                        <p className="card-text mb-2">{job.description}</p>
                        <p className="mb-1"><strong>📍 Location:</strong> {job.location}</p>
                        <p className="mb-1"><strong>💰 Salary:</strong> {job.salary}</p>
                        <p className="mb-3"><strong>🗓️ Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}</p>

                        <div className="mb-2">
                          <label className="form-label">Upload Resume:</label>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => handleResumeChange(e, job.id)}
                            className="form-control"
                          />
                        </div>

                          <button
                          onClick={() => handleApply(job.id)}
                          className={`btn ${appliedJobs.includes(job.id) ? 'btn-outline-secondary' : 'btn-outline-success'} mt-2`}
                          disabled={appliedJobs.includes(job.id)}
                        >
                          {appliedJobs.includes(job.id) ? "Applied" : "Apply Now"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
