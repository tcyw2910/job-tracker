import { JobApplication } from "../types/JobApplication";

export const loadApplications = (): JobApplication[] => {
    const data = localStorage.getItem("applications");
    return data ? JSON.parse(data) : [];
};

export const saveApplications = (apps: JobApplication[]) => {
    localStorage.setItem("applications", JSON.stringify(apps));
};
