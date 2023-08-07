import React, { useEffect } from "react";
import JobSearch from "./JobSearch";
import JobContainer from "./JobContainer";
import axios from "axios";
import Navbar from '../Navbar/Navbar'

const Home = () => {



  return (
    <div><Navbar/>
    <JobSearch/>
    <JobContainer />
    </div>
  )
}

export default Home