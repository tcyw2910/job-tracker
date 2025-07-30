import { JobApplication } from "../types/JobApplication";

const ApplicationCard = ({ application }: { application: JobApplication}) => (
    <div>
        <h3>{application.company}</h3>
        <p>{application.position}</p>
        <p>{application.location}</p>
        <p>{application.date}</p>
    </div>
);

export default ApplicationCard;