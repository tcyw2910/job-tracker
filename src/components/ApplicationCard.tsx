import { JobApplication } from "../types/JobApplication";

const ApplicationCard = ({ 
    application, 
    onDelete,
    onEdit, 
}: { 
    application: JobApplication;
    onDelete: () => void;
    onEdit: () => void;
}) => (
    <div>
        <h3>{application.company}</h3>
        <p>{application.position}</p>
        <p>{application.location}</p>
        <p>{application.date}</p>
        <button type="button" onClick={onEdit}>Edit</button>
        <button type="button" onClick={onDelete}>Delete</button>
    </div>
    
);

export default ApplicationCard;