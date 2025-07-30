import { useState } from "react";
import { type JobApplication, ApplicationStatus, StatusOptions } from "./types/JobApplication";
import './app.css'
import { v4 as uuidv4} from "uuid"; // For generating unique IDs

const App = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);

  return (
    <div>
      <h1>Job Application Tracker</h1>
    </div>
  );
};

export default App;