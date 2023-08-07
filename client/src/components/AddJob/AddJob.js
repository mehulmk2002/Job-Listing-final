import React, { useState } from "react";
import "./AddJob.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import BASEURL from "../../constants/baseurl";
import useJobContext from "../../hooks/useJobContext";

const AddJob = () => {
  const [companyName, setCompanyName] = useState("");
  const [addLogoURL, setAddLogoURL] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [monthlySalary, setMonthlySalary] = useState("");
  const [jobType, setJobType] = useState("");
  const [remoteOnsite, setRemoteOnsite] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [aboutCompany, setAboutCompany] = useState("");
  const [information, setInformation] = useState("hrll");
  const [skillRequired, setSkillsRequired] = useState("");

  const { loggedIn } = useJobContext();
  
  const navigate = useNavigate();
  let skillsRequired 
  const handleSubmit = (e) => {
    e.preventDefault();
    // skillsRequired = skillRequired.split(',');
    
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
      information,
      skillRequired,
    };

    axios
      .post(`http://localhost:4000/Addjob`, postData)
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
        setInformation("");
        setSkillsRequired([]);

        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        console.error("Job posting failed", error);
      });
    console.log(postData);
  };

  const handleJobTypeChange = (e) => {
    setJobType(e.target.value);
  };

  const handleRemoteOnsiteChange = (e) => {
    setRemoteOnsite(e.target.value);
  };

  const cancelAddJob = () => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(",").map((skill) => skill);
    setSkillsRequired(skills);
  };



  return (
    <div className="add__job">
      <div className="add__job__left">
        <h1>Add job description</h1>
        <form className="job__form" onSubmit={handleSubmit}>
          <div className="job__input">
            <label htmlFor="companyName">Company Name</label>
            <div className="input_box">
            <input
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            </div>
          </div>
          <div className="job__input">
            <label htmlFor="addLogoURL">Logo URL</label>
            <div className="input_box">
            <input
              type="text"
              placeholder="Logo URL"
              value={addLogoURL}
              onChange={(e) => setAddLogoURL(e.target.value)}
            />
          </div>
          </div>
          <div className="job__input">
            <label htmlFor="jobPosition">Job Position</label>
            <div className="input_box">
            <input
              type="text"
              placeholder="Job Position"
              value={jobPosition}
              onChange={(e) => setJobPosition(e.target.value)}
            />
            </div>
          </div>
          <div className="job__input">
            <label htmlFor="monthlySalary">Monthly Salary</label>
            <div className="input_box">
            <input
              type="number"
              placeholder="Monthly Salary"
              value={monthlySalary}
              onChange={(e) => setMonthlySalary(e.target.value)}
            />
            </div>
          </div>
          <div className="job__input">
            <label htmlFor="jobType">Job Type</label>
            <div className="input_box">
            <select value={jobType} onChange={handleJobTypeChange}>
              <option value="">Select Job Type</option>
              <option value="Internship">Internship</option>
              <option value="Full Time">Full Time</option>
            </select>
            </div>
          </div>
          <div className="job__input">
            <label htmlFor="remoteOnsite">Remote/Onsite</label>
            <div className="input_box">
            <select value={remoteOnsite} onChange={handleRemoteOnsiteChange}>
              <option value="">Select Remote/Onsite</option>
              <option value="Remote">Remote</option>
              <option value="In Office">In Office</option>
            </select>
            </div>
            </div>
         

          <div className="job__input">
            <label htmlFor="jobLocation">Job Location</label>
            <div className="input_box">
            <input
              type="text"
              placeholder="Job Location"
              value={jobLocation}
              onChange={(e) => setJobLocation(e.target.value)}
           
            />
            </div>
          </div>

          <div className="job__input">
            <label htmlFor="jobDescription">Job Description</label>
            <div className="input_box">
            <textarea
              placeholder="Job Description"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            ></textarea>  </div>
          </div>
          <div className="job__input">
            <label htmlFor="aboutComapany">About Company</label>
            <div className="input_box">
            <textarea rows="4" cols="50"
              placeholder="About Company"
              value={aboutCompany}
              onChange={(e) => setAboutCompany(e.target.value)}
            ></textarea>
          </div>  </div>
          <div className="job__input">
            <label htmlFor="skillsRequired">Skills Required</label>
            <div className="input_box">
            <input
              type="text"
              placeholder="Skills Required"
              value={skillsRequired}
              onChange={handleSkillsChange}
            />
          </div>  </div>
          <div className="job__buttons">
            <button className="cancel__addJob" onClick={cancelAddJob}>
              Cancel
            </button>
            <button type="submit" className="add__job__button">
              + Add Job
            </button>
          </div>
        </form>
      </div>
      <div className="add__job__right">
        <h1>Recruiters add Job details here</h1>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddJob;
