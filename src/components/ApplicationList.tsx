import { JobApplication } from "../types/JobApplication";
import ApplicationCard from "./ApplicationCard";

interface Props {
    applications: JobApplication[]; // applications is expected to be an array of JobApplicatino objects
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
}

const ApplicationList = ({ applications, onDelete, onEdit }: Props) => ( //Receive the applications array as a prop
    
    // <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-4 gap-5">
            {applications.map(app => (
                <ApplicationCard 
                    key={app.id} 
                    application={app} 
                    onDelete={() => onDelete(app.id)}
                    onEdit={() => onEdit(app.id)}
                />
            ))}
        </div>
    // </div>
    
);

export default ApplicationList;