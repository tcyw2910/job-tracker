// Dropdown list of statuses
export type ApplicationStatus = "Applied" | "Interview" | "Offer" | "Rejected";

export const StatusOptions: ApplicationStatus[] = [
    "Applied",
    "Interview",
    "Offer",
    "Rejected",
];
export interface JobApplication {
    id: string;
    company: string;
    position: string;
    location: string;
    date: string;
    status: ApplicationStatus;
}


