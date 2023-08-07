import React, { useCallback, useState } from "react";
import "./JobSearch.css";
import searchIcon from "../../assets/icons/searchIcon.png";
import useJobContext from "../../hooks/useJobContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import debounce from "lodash.debounce";
import skills from "../../constants/skillOptions";
import BASEURL from "../../constants/baseurl";

const JobSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const { loggedIn, setJobListings } = useJobContext();
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    getJobListings(searchTerm, selectedSkills);
  };

  const handleSelectChange = (e) => {
    const skill = e.target.value;
    if (skill && !selectedSkills.includes(skill)) {
      const updatedSkills = [...selectedSkills, skill];
      setSelectedSkills(updatedSkills);
      getJobListings(searchTerm, updatedSkills);
    }
  };

  const handleRemoveSkill = (skill) => {
    const updatedSkills = selectedSkills.filter((s) => s !== skill);
    setSelectedSkills(updatedSkills);
    getJobListings(searchTerm, updatedSkills);
  };

  const clearSkills = () => {
    setSelectedSkills([]);
    getJobListings(searchTerm, []);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Perform search operation with the search term and selected skills
    console.log("Search Term:", searchTerm);
    console.log("Selected Skills:", selectedSkills);
  };

  const addJobButton = () => {
    navigate("/addJob");
  };

  const getJobListings = useCallback(
    debounce((_searchTerm, _selectedSkills) => {
      axios
        .get(`${BASEURL}/jobs`, {
          params: {
            searchTerm: _searchTerm,
            skills: _selectedSkills.join(","),
          },
        })
        .then((response) => {
          setJobListings(response.data.jobListings);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    }, 200),
    []
  );

  return (
    <div className="job-search">
      <form className="search-form" onSubmit={handleSearchSubmit}>
        <div className="search-bar">
          <img src={searchIcon} alt="Search Icon" />
          <input
            type="text"
            placeholder="Type any job title"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </form>
      <div className="job__search__footer">
        <div className="select-skills">
          <select value={selectedSkills} onChange={handleSelectChange}>
            <option value="">Select Skill</option>
            {skills.map((skill, index) => {
              return <option key={index}>{skill}</option>;
            })}
          </select>
          <div className="selected-skills">
            {selectedSkills.map((skill) => (
              <div className="selected-skill" key={skill}>
                {skill}
                <button
                  className="remove-skill"
                  onClick={() => handleRemoveSkill(skill)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
          {selectedSkills.length > 0 && (
            <button className="clear__skills" onClick={clearSkills}>
              Clear
            </button>
          )}
        </div>

        {loggedIn && (
          <button className="add__job__btn" onClick={addJobButton}>
            + Add Job
          </button>
        )}
      </div>
    </div>
  );
};

export default JobSearch;
