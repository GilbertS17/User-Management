// components/pages/AddUser.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../organisms/navbar/Navbar";
import InputField from "../molecules/inputfield/InputField";
import { userSchema, UserInput } from "../../../schemas/userSchema";
import { useQueryClient } from "@tanstack/react-query";


export const AddUser: React.FC = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm<UserInput>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            dateOfBirth: "",
            status: "active",
        },
    });

    const watchedFirstName = watch("firstName");
    const watchedEmail = watch("email");

    const isFormValid = watchedFirstName.trim() !== "" && watchedEmail.trim() !== "";

    const mutation = useMutation({
        mutationFn: async (data: UserInput) => {
            const stored = localStorage.getItem("auth-storage");

            let token = "";
            if (stored) {
                try {
                    const parsed = JSON.parse(stored);
                    token = parsed?.state?.accessToken || "";
                } catch (err) {
                    console.error("Failed to parse auth-storage:", err);
                }
            }

            if (!token) throw new Error("No token found. Please log in again.");

            const res = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Failed to create user");
            }

            return res.json();
        },
        onSuccess: () => {
            toast.success("User created successfully!");
            queryClient.invalidateQueries({
                predicate: query =>
                    query.queryKey[0] === "users"
            });
            navigate("/dashboard");
        },
        onError: (error) => {
            toast.error(error.message || "Failed to create user");
        },
    });


    const onSubmit = (data: UserInput) => {
        mutation.mutate(data);
    };

    return (
        <div>
            <Navbar showNavItems={false} />
            <div className="add-user-form">
                <div className="add-inner-container">
                    <h2 className="add-title">
                        Add New User
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <InputField
                            label="First Name"
                            type="text"
                            name="firstName"
                            register={register}
                            error={errors.firstName?.message}
                            required
                        />
                        <InputField
                            label="Last Name (Optional)"
                            type="text"
                            name="lastName"
                            register={register}
                            error={errors.lastName?.message}
                        />
                        <InputField
                            label="Email"
                            type="email"
                            name="email"
                            register={register}
                            error={errors.email?.message}
                            required
                        />
                        <InputField
                            label="Date of Birth"
                            type="date"
                            name="dateOfBirth"
                            register={register}
                            error={errors.dateOfBirth?.message}
                        />

                        <div className="mb-6">
                            <label className="status-label">
                                Status
                            </label>
                            <select
                                {...register("status")}
                                className="select-input"
                            >
                                <option value="active">Active</option>
                                <option value="locked">Locked</option>
                            </select>
                            {errors.status && (
                                <p className="text-sm text-red-500 mt-1">{errors.status.message}</p>
                            )}
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="add-submit-button"
                                disabled={mutation.isPending || !isFormValid}
                            >
                                {mutation.isPending ? "Submitting..." : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddUser;
