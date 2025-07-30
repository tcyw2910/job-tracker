import { useState } from "react";
import { JobApplication, type ApplicationStatus, StatusOptions } from "./types/JobApplication";
import './app.css';
import ApplicationForm from "./components/ApplicationForm";
import ApplicationList from "./components/ApplicationList";

const App = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);

  const addApplication = (job: JobApplication) => {
    setApplications(prev => [...prev, job]);
  };
  
  return (
    <div>
      <h1>Job Application Tracker</h1>

      <ApplicationForm onAdd={addApplication} />

      <ApplicationList applications={applications} />
    </div>
  );
};

export default App;