import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Navbar from "../organisms/navbar/Navbar";
import InputField from "../molecules/inputfield/InputField";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  status: string;
};

const AddUser: React.FC = () => {
  const {
    register,
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      dob: "",
      status: "Active",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("User Data Submitted:", data);
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              label="First Name"
              type="text"
              name="firstName"
              register={register}
              required
            />
            <InputField
              label="Last Name (Optional)"
              type="text"
              name="lastName"
              register={register}
            />
            <InputField
              label="Email"
              type="email"
              name="email"
              register={register}
              required
            />
            <InputField
              label="Date of Birth"
              type="date"
              name="dob"
              register={register}
            />

            <div className="mb-6">
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                {...register("status")}
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
