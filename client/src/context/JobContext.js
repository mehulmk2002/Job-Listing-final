import { createContext, useState } from "react";

const JobContext = createContext({
  loggedIn: false,
  setLoggedIn: () => {},
  loading: false,
  setLoading: () => {},
});

const Provider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [jobListings, setJobListings] = useState([]);
  const [jobId, setJobId] = useState("");
  const [loading, setLoading] = useState(false);

  const valueToShare = {
    loggedIn,
    setLoggedIn,
    jobListings,
    setJobListings,
    jobId,
    setJobId,
    loading,
    setLoading,
  };

  return (
    <JobContext.Provider value={valueToShare}>{children}</JobContext.Provider>
  );
};

export { Provider };

export default JobContext;
