import React, { useState } from "react";
import "./JobBox.css";
import people from "../../assets/icons/people.png";
import flag from "../../assets/icons/indianFlag.png";
import { useNavigate } from "react-router-dom";
const JobBox = ({ job }) => {
  const [ loggedIn, setJobId ] = useState(true);
  const navigate = useNavigate();

  const getJobDetails = () => {
    navigate(`/editJob/${job._id}`);
  };

  const handleViewDetails = (e) => {
    setJobId(job._id);
    navigate(`JobDetail/${job._id}`);
  };

  return (
    <div className="jobBox__container">
      <div className="job__left__component">
        <div className="company__logo">
          <img src={job.addLogoURL} alt="groupIcon" />
        </div>
        <div className="second__div">
          <span>{job.jobPosition}</span>
          <div className="second__div__text">
            <img src={people} alt="group" />
            <span>11-50 </span>
            <span>₹ {job.monthlySalary}</span>
          </div>
          <div className="second__div__footer">
            <span>{job.remoteOnsite}</span>
            <span>{job.jobType}</span>
          </div>
        </div>
        <div className="third__div">
          <img src={flag} alt="country" />
          <span>{job.jobLocation}</span>
        </div>
      </div>
      <div className="job__right__content">
        <div className="job__right__upper">
          {job.skillsRequired.map((skill, index) => {
            return (
              <span className="requiredSkills" key={index}>
                {skill}
              </span>
            );
          })}
        </div>
        <div className="job__right__lower">
          {loggedIn ? <button onClick={getJobDetails}>Edit Job</button> : null}
          <button onClick={handleViewDetails}>View Details</button>
        </div>
      </div>
    </div>
  );
};

export default JobBox;
