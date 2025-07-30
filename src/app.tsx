import { useEffect, useState } from "react";
import { JobApplication, type ApplicationStatus, StatusOptions } from "./types/JobApplication";
import './app.css';
import ApplicationForm from "./components/ApplicationForm";
import ApplicationList from "./components/ApplicationList";
import { loadApplications, saveApplications } from "./utils/localStorage";

const App = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);

  const addApplication = (job: JobApplication) => {
    setApplications(prev => [...prev, job]);
  };
  
  useEffect(() => {
    const stored = loadApplications();
    setApplications(stored);
  }, []);

  useEffect(() => {
    saveApplications(applications);
  }, [applications])

  return (
    <div>
      <h1>Job Application Tracker</h1>

      <ApplicationForm onAdd={addApplication} />

      <ApplicationList applications={applications} />
    </div>
  );
};

export default App;