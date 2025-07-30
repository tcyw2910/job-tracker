import { JobApplication } from "../types/JobApplication";
import ApplicationCard from "./ApplicationCard";

interface Props {
    applications: JobApplication[]; // applications is expected to be an array of JobApplicatino objects
}

const ApplicationList = ({ applications }: Props) => ( //Receive the applications array as a prop
    <div>
        {applications.map(app => (
            <ApplicationCard key={app.id} application={app} />
        ))}
    </div>
);

export default ApplicationList;