import { useEffect, useState } from "react";
import { JobApplication, type ApplicationStatus, StatusOptions } from "./types/JobApplication";
import './app.css';
import ApplicationForm from "./components/ApplicationForm";
import ApplicationList from "./components/ApplicationList";
import { loadApplications, saveApplications } from "./utils/localStorage";

const App = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [editingApplication, setEditingApplication] = useState<JobApplication | null>(null);

  const addApplication = (job: JobApplication) => {
    setApplications(prev => [...prev, job]);
  };

  const handleDelete = (id: string) => {
    setApplications(prev => prev.filter(app => app.id !== id));
  }

  const handleEdit = (id: string) => {
    const appToEdit = applications.find(app => app.id === id); // Look for an id match 
    if (appToEdit) {
      setEditingApplication(appToEdit); // set found application as editingApplication state
    }
  }

  const handleUpdate = (updatedJob: JobApplication) => {
    // If the current app matches the one being edited, replace it; otherwise, keep it
    setApplications(prev => prev.map(app => (app.id === updatedJob.id ? updatedJob : app))
    );
    setEditingApplication(null); // Exit editing mode after update
  }

  const handleCancelEdit = () => {
    setEditingApplication(null); // Stop editing and clear the form
  }
  
  // Load applications
  useEffect(() => {
    const stored = loadApplications();
    setApplications(stored);
  }, []); // [] dependency array i.e. run the code once when the component first mounts

  // Save applications when application state changes
  useEffect(() => {
    saveApplications(applications);
  }, [applications])

  return (
    <div className="min-h-screen bg-green-300 flex justify-center items-start pt-10">
      <div className="max-w-5xl w-full bg-red-300 shadow-lg rounded-lg p-6">
        <h1 className="text-3xl text-center mb-4">Job Application Tracker</h1>

        <ApplicationForm 
          onAdd={addApplication} 
          editingApplication={editingApplication}
          onUpdate={handleUpdate}
          onCancelEdit={handleCancelEdit}
        />

        <ApplicationList 
          applications={applications} 
          onDelete={handleDelete} 
          onEdit={handleEdit}
        />
      </div>
    </div>
    
  );
};

export default App;