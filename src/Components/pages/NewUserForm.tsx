import React, { useState } from "react";
import Navbar from "../organisms/navbar/Navbar";
import InputField from "../molecules/inputfield/InputField";

const AddUser: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        dob: "",
        status: "Active",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("User Data Submitted:", formData);
        // Submit logic here
    };

    return (
        <div>

            <Navbar showNavItems={false} />
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-primary-mid-dark">
                <div className="bg-white dark:bg-primary-dark shadow-lg rounded-xl p-8 w-full max-w-md">
                    <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-6">
                        Add New User
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <InputField
                            label="First Name"
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                        <InputField
                            label="Last Name (Optional)"
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                        <InputField
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <InputField
                            label="Date of Birth"
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                        />
                        <div className="mb-6">
                            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white dark:border-gray-700"
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark disabled:bg-gray-300 dark:disabled:bg-gray-700 dark:hover:bg-primary-light transition-colors"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddUser;
