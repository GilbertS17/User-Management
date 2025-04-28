import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Navbar from "../organisms/navbar/Navbar";
import InputField from "../molecules/inputfield/InputField";
import { userSchema, UserInput } from "../../../schemas/userSchema";

// Fetch a specific user
const fetchUser = async (id: string, token: string): Promise<UserInput> => {
    const res = await fetch(`/api/users/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const json = await res.json();

    if (!res.ok) {
        const err = json;
        throw new Error(err.message || "Failed to fetch user");
    }

    return json.result.data.user;
};

const EditUser: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const stored = localStorage.getItem("auth-storage");
    const token = stored ? JSON.parse(stored)?.state?.accessToken || "" : "";

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<UserInput>({
        resolver: zodResolver(userSchema),
    });

    const { data, isLoading, isError, error } = useQuery<UserInput, Error>({
        queryKey: ["user", id],
        queryFn: () => fetchUser(id!, token),
        enabled: !!id,
    });

    // Populate form fields with fetched data
    React.useEffect(() => {
        if (data) {
            Object.entries(data).forEach(([key, value]) => {
                setValue(key as keyof UserInput, value);
            });
        }
    }, [data, setValue]);

    // Mutation for updating user
    const mutation = useMutation({
        mutationFn: async (formData: UserInput) => {
            const res = await fetch(`/api/users/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const json = await res.json();

            if (!res.ok) {
                throw new Error(json.message || "Failed to update user");
            }

            return json.result.user;
        },
        onSuccess: () => {
            toast.success("User updated successfully!");
            queryClient.invalidateQueries({ predicate: q => q.queryKey[0] === "users" });
            navigate("/dashboard");
        },
        onError: (err: Error) => {
            toast.error(err.message);
        },
        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: ["users"] });
            navigate("/dashboard");
          },
        
    });
    
    const onSubmit = (formData: UserInput) => {
        mutation.mutate(formData);
    };

    return (
        <div>
            <Navbar showNavItems={false} />
            <div className="edit-outer-container">
                <div className="edit-inner-container">
                    <h2 className="edit-title">
                        Edit User
                    </h2>

                    {isLoading ? (
                        <p>Loading...</p>
                    ) : isError ? (
                        <p className="text-red-500">{error?.message}</p>
                    ) : (
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
                                label="Last Name"
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
                                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                                    Status
                                </label>
                                <select
                                    {...register("status")}
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white dark:border-gray-700"
                                >
                                    <option value="active">Active</option>
                                    <option value="locked">Locked</option>
                                </select>
                                {errors.status && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.status.message}
                                    </p>
                                )}
                            </div>
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark disabled:bg-gray-300 dark:disabled:bg-gray-700 dark:hover:bg-primary-light transition-colors"
                                    disabled={mutation.isPending}
                                >
                                    {mutation.isPending ? "Updating..." : "Update"}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditUser;
