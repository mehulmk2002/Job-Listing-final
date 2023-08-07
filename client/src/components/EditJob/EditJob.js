import React, { useEffect, useState } from "react";
import "./EditJob.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import BASEURL from "../../constants/baseurl";

const EditJob = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("id", id);
  const [companyName, setCompanyName] = useState("");
  const [addLogoURL, setAddLogoURL] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [monthlySalary, setMonthlySalary] = useState("");
  const [jobType, setJobType] = useState("");
  const [remoteOnsite, setRemoteOnsite] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [aboutCompany, setAboutCompany] = useState("");
  const [skillsRequired, setSkillsRequired] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/Getjob/${id}`)
      .then((response) => {
        console.log("response", response.data.jobListing);
        setCompanyName(response.data.jobListing.companyName);
        setAddLogoURL(response.data.jobListing.addLogoURL);
        setJobPosition(response.data.jobListing.jobPosition);
        setMonthlySalary(response.data.jobListing.monthlySalary);
        setJobType(response.data.jobListing.jobType);
        setRemoteOnsite(response.data.jobListing.remoteOnsite);
        setJobLocation(response.data.jobListing.jobLocation);
        setJobDescription(response.data.jobListing.jobDescription);
        setAboutCompany(response.data.jobListing.aboutCompany);
        setSkillsRequired(response.data.jobListing.skillsRequired);
      })
      .catch((error) => {
        navigate("/login");
      });
  }, [id, navigate]);

  const handleJobTypeChange = (e) => {
    setJobType(e.target.value);
  };

  const handleRemoteOnsiteChange = (e) => {
    setRemoteOnsite(e.target.value);
  };

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(",").map((skill) => skill);
    setSkillsRequired(skills);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare the data to be sent in the POST request
    const postData = {
      companyName,
      addLogoURL,
      jobPosition,
      monthlySalary,
      jobType,
      remoteOnsite,
      jobLocation,
      jobDescription,
      aboutCompany,
      skillsRequired: skillsRequired.map((skill) => skill.trim()),
    };

    // Send the POST request
    axios
      .patch(`http://localhost:4000/UpdateJob/${id}`, postData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log("Job posting successful", response);
        setAboutCompany("");
        setAddLogoURL("");
        setCompanyName("");
        setJobDescription("");
        setJobLocation("");
        setJobPosition("");
        setJobType("");
        setMonthlySalary("");
        setRemoteOnsite("");
        setSkillsRequired([]);

      
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          toast.error("Unauthorized Access. Redirecting to home page", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          localStorage.clear();
          setTimeout(() => {
            navigate("/");
          }, 2000);
          return;
        }

        toast.error("Job Update Failed. Redirecting to home page", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      });
  };

  const cancelUpdate = () => {
    navigate("/");
  };

  return (
    <div className="edit__job">
      <div className="edit__job__left">
        <h1>Edit Job</h1>
        <form className="job__form" onSubmit={handleSubmit}>
          <div className="job__input">
            <label htmlFor="companyName">Company Name</label>
            <input
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div className="job__input">
            <label htmlFor="addLogoURL">Logo URL</label>
            <input
              type="text"
              placeholder="Logo URL"
              value={addLogoURL}
              onChange={(e) => setAddLogoURL(e.target.value)}
            />
          </div>
          <div className="job__input">
            <label htmlFor="jobPosition">Job Position</label>
            <input
              type="text"
              placeholder="Job Position"
              value={jobPosition}
              onChange={(e) => setJobPosition(e.target.value)}
            />
          </div>
          <div className="job__input">
            <label htmlFor="monthlySalary">Monthly Salary</label>
            <input
              type="number"
              placeholder="Monthly Salary"
              value={monthlySalary}
              onChange={(e) => setMonthlySalary(e.target.value)}
            />
          </div>
          <div className="job__input">
            <label htmlFor="jobType">Job Type</label>
            <select value={jobType} onChange={handleJobTypeChange}>
              <option value="">Select Job Type</option>
              <option value="Internship">Internship</option>
              <option value="Full Time">Full Time</option>
            </select>
          </div>
          <div className="job__input">
            <label htmlFor="remoteOnsite">Remote/Onsite</label>
            <select value={remoteOnsite} onChange={handleRemoteOnsiteChange}>
              <option value="">Select Remote/Onsite</option>
              <option value="Remote">Remote</option>
              <option value="In Office">In Office</option>
            </select>
          </div>

          <div className="job__input">
            <label htmlFor="jobLocation">Job Location</label>
            <input
              type="text"
              placeholder="Job Location"
              value={jobLocation}
              onChange={(e) => setJobLocation(e.target.value)}
              disabled={remoteOnsite === "Remote"}
            />
          </div>

          <div className="job__input">
            <label htmlFor="jobDescription">Job Description</label>
            <textarea
              placeholder="Job Description"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="job__input">
            <label htmlFor="aboutComapany">About Company</label>
            <textarea
              placeholder="About Company"
              value={aboutCompany}
              onChange={(e) => setAboutCompany(e.target.value)}
            ></textarea>
          </div>
          <div className="job__input">
            <label htmlFor="skillsRequired">Skills Required</label>
            <input
              type="text"
              placeholder="Skills Required"
              value={skillsRequired}
              onChange={handleSkillsChange}
            />
          </div>
          <div className="job__buttons">
            <button onClick={cancelUpdate} className="cancel__updateJob">
              Cancel
            </button>
            <button type="submit" className="update__job__button">
              Update
            </button>
          </div>
        </form>
      </div>
      <div className="edit__job__right">
        <h1>Recruiters edit Job details here</h1>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditJob;
