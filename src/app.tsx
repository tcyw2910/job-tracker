import { useState } from "react";
import { JobApplication, type ApplicationStatus, StatusOptions } from "./types/JobApplication";
import './app.css'
import { v4 as uuidv4} from "uuid"; // For generating unique IDs
import ApplicationForm from "./components/ApplicationForm";

const App = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);

  return (
    <div>
      <h1>Job Application Tracker</h1>

      <ApplicationForm onAdd={(newApp) => setApplications([...applications, newApp])}/>
    </div>
  );
};

export default App;