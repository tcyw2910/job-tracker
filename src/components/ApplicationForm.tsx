import { JobApplication, type ApplicationStatus, StatusOptions } from "../types/JobApplication";
import { v4 as uuidv4 } from "uuid"
import { useState } from "react";

interface Props {
    // Function: (Parameter Name: Parameter Type) => return nothing
    onAdd: (job: JobApplication) => void;
}

const ApplicationForm = ({ onAdd }: Props) => {
    type FormState = Omit<JobApplication, "id">; // Omit<Type, Keys>

    const initialState: FormState = {
        company: "",
        position: "",
        location: "",
        status: StatusOptions[0],
        date: new Date().toISOString().split("T")[0],
    };

    const [form, setForm] = useState<FormState>(initialState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Stop page reload

        const newApplication: JobApplication = {
            id: uuidv4(),
            ...form,
        };
        onAdd(newApplication) // Call parent handler - tell the parent about it
        
        // Reset form fields after submission
        setForm(initialState);

        console.log("Submitted", newApplication);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Company:
                <input name="company" value={form.company} placeholder="Company" onChange={handleChange} required></input>
            </label>
            
            <label>
                Position:
                <input name="position" value={form.position} placeholder="Position" onChange={handleChange} required></input>
            </label>

            <label>
                Location:
                <input name="location" value={form.location} placeholder="Location" onChange={handleChange} required></input>
            </label>

            <label>
                Status:
                <select name="status" value={form.status} onChange={handleChange}>
                    {StatusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
            </label>

            <label>
                Date:
                <input type="date" name="date" value={form.date} onChange={handleChange}/>
            </label>
            

            <button type="submit">Add</button>
        </form>
    );
};

export default ApplicationForm;