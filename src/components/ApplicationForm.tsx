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
        <div className="bg-white/30 backdrop-blud-md border border-white/40 rounded-lg shadow-lg p-3 max-w-5xl mx-auto">
            <form onSubmit={handleSubmit} className="grid sm:grid-cols-1 md:grid-cols-7 gap-6">
                <div>
                    <label>
                        Company:
                        <input 
                            name="company" 
                            value={form.company} 
                            placeholder="Company" 
                            onChange={handleChange} 
                            aria-describedby="company-error"
                            className="input-fields ml-"
                        >
                        </input>
                    </label>
                    {formErrors.company && <p id="company-error" className="error-message">{formErrors.company}</p>}
                </div>
                <div>
                    <label>
                        Position:
                        <input 
                            name="position" 
                            value={form.position} 
                            placeholder="Position" 
                            onChange={handleChange} 
                            aria-describedby="position-error"
                            className="input-fields"
                        >
                        </input>
                    </label>
                    {formErrors.position && <p id="position-error" className="error-message">{formErrors.position}</p>}
                </div>
                <div>
                    <label>
                        Location:
                        <input 
                            name="location" 
                            value={form.location} 
                            placeholder="Location" 
                            onChange={handleChange} 
                            aria-describedby="location-error"
                            className="input-fields"
                        >
                        </input>
                    </label>
                    {formErrors.location && <p id="location-error" className="error-message">{formErrors.location}</p>}
                </div>
                <div>
                    <label>
                        Status:
                        <select 
                            name="status" 
                            value={form.status} 
                            onChange={handleChange}
                            className="input-fields"
                        >
                            {StatusOptions.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Date:
                        <input 
                            type="date" 
                            name="date" 
                            value={form.date} 
                            onChange={handleChange} 
                            aria-describedby="date-error" 
                            className="input-fields"
                        />
                    </label>
                    {formErrors.date && <p id="date-error" className="error-message">{formErrors.date}</p>}
                </div>

                <div className={`flex justify-center`}>
                    <button 
                        type="submit" 
                        className="bg-green-600 rounded-lg w-[70px] text-white hover:bg-green-700"
                    >
                        {editingApplication ? "Update" : "Add"}
                    </button>  
                </div>
                 

                {/* Optional cancel button when editing */}
                {editingApplication && (
                    <div className={`flex justify-center`}>
                        <button 
                            type="button" 
                            onClick={onCancelEdit}
                            className="bg-gray-600 text-white rounded-lg w-[70px] hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                    </div>
                
                )}
            </form>
        </div>
        
    );
};

export default ApplicationForm;