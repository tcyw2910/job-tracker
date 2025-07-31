import { JobApplication, type ApplicationStatus, StatusOptions } from "../types/JobApplication";
import { v4 as uuidv4 } from "uuid"
import { useState, useEffect } from "react";

interface Props {
    // Function: (Parameter Name: Parameter Type) => return nothing
    onAdd: (job: JobApplication) => void;
    editingApplication: JobApplication | null;
    onUpdate: (updatedJob: JobApplication) => void; // to handle updates
    onCancelEdit: () => void;
}

const ApplicationForm = ({ onAdd, editingApplication, onUpdate, onCancelEdit }: Props) => {
    type FormState = Omit<JobApplication, "id">; // Omit<Type, Keys>

    const initialState: FormState = {
        company: "",
        position: "",
        location: "",
        status: StatusOptions[0],
        date: new Date().toISOString().split("T")[0],
    };

    const [form, setForm] = useState<FormState>(initialState);

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    // Handle form submit: add or update depending on editingApplication
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Stop page reload

        const errors = validateForm(form);
        setFormErrors(errors);

        // Check if there are any errors
        const hasErrors = Object.values(errors).some(errorMsg => errorMsg !== "");

        if (hasErrors) {
            return; // Stop form submission if errors found
        }

        if (editingApplication) {
            // Update existing app
            onUpdate({ id: editingApplication.id, ...form });
        } else {
            const newApplication: JobApplication = {
                id: uuidv4(),
                ...form,
            };
            onAdd(newApplication) // Call parent handler - tell the parent about it
            
            // Reset form fields after submission
            setForm(initialState);
        }
    };

    const [formErrors, setFormErrors] = useState({
        company: "",
        position: "",
        location: "",
        date: "",
    });

    const validateForm = (formInput: FormState) => {
        const errors = {
            company: "",
            position: "",
            location: "",
            date: "",
        };

        if (!formInput.company.trim()) {
            errors.company = "Company is required";
        }
        if (!formInput.position.trim()) {
            errors.position = "Position is required";
        }
        if (!formInput.location.trim()) {
            errors.location = "Location is required";
        }
        if (!formInput.date.trim()) {
            errors.date = "Date is required";
        }

        return errors;
    }

    // Sync form when editingApplication changes
    useEffect(() => {
        if (editingApplication) {
            // Fill form with editingApplication data
            const {id, ...rest } = editingApplication; // exclude id because form doesn't hold it
            setForm(rest);
        } else {
            // Reset form when not editing
            setForm(initialState);
        }
    }, [editingApplication]);
    

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Company:
                <input name="company" value={form.company} placeholder="Company" onChange={handleChange} aria-describedby="company-error"></input>
            </label>
            {formErrors.company && <p id="company-error">{formErrors.company}</p>}
            
            <label>
                Position:
                <input name="position" value={form.position} placeholder="Position" onChange={handleChange} aria-describedby="position-error"></input>
            </label>
            {formErrors.position && <p id="position-error">{formErrors.position}</p>}

            <label>
                Location:
                <input name="location" value={form.location} placeholder="Location" onChange={handleChange} aria-describedby="location-error"></input>
            </label>
            {formErrors.location && <p id="location-error">{formErrors.location}</p>}

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
                <input type="date" name="date" value={form.date} onChange={handleChange} aria-describedby="date-error" />
            </label>
            {formErrors.date && <p id="date-error">{formErrors.date}</p>}
            

            <button type="submit">{editingApplication ? "Update" : "Add"}</button>

            {/* Optional cancel button when editing */}
            {editingApplication && (
                <button type="button" onClick={onCancelEdit}>Cancel</button>
            )}
        </form>
    );
};

export default ApplicationForm;