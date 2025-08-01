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
    <div className="mt-6 p-3 bg-white/30 backdrop-blur-md border border-white/40 rounded-lg shadow-lg">
        <div className="flex justify-between">
            <h3 className="text-xl font-bold">{application.company}</h3>
            <p className="italic">{application.status}</p>
        </div>
        
        <p>{application.position}</p>
        <p>{application.location}</p>
        <p className="text-sm">{application.date}</p>
        

        <div className="flex gap-2 justify-end">
            <button 
                type="button" 
                onClick={onEdit}
                className="bg-yellow-400 rounded p-1 text-white hover:bg-yellow-500 transition duration-200"
            >
                Edit
                </button>
            <button 
                type="button" 
                onClick={onDelete}
                className="bg-red-500 rounded p-1 text-white hover:bg-red-600 transition duration-200"
            >
                Delete
            </button>
        </div>
        
    </div>
    
    
);

export default ApplicationCard;