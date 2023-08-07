import React, { useEffect, useState } from "react";
import "./JobContainer.css";
import JobBox from "./JobBox";
import useJobContext from "../../hooks/useJobContext";
import NoResultsFound from "./NoResultsFound";
import axios from "axios";

const JobContainer = () => {
  const [ load, loading ] = useState();

  const [jobListings, setJobListings] = useState([]);

  const loadData=()=>{
    axios.get('http://localhost:4000/Getjob')
      .then(response => {
        setJobListings(response.data.JobList);
        console.log(response.data.JobList)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  
  useEffect(  () => {
    loadData()
  }, []);

  return (
    <div>
      { jobListings.length > 0 ? (
        <div className="jobContainer">
          {
            jobListings.map((job) => (
            <JobBox key={job._id} job={job} />
          ))}
        </div>
      ):<><h1>Nothong{jobListings.length}</h1></> }
    </div>
  );
};

export default JobContainer;
