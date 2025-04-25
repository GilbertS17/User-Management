import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Navbar from "../organisms/navbar/Navbar";
import SearchInput from "../molecules/searchinput/SearchInput";
import CardsContainer from "../organisms/cardsContainer/CardsContainer";
import { Card } from "../molecules/card/Card";
import Loading from "../molecules/loading/Loading";
import { useLocation, useNavigate } from "react-router-dom";
import { ConfirmationModal } from "../molecules/confirmationModal/confirmationModal";
import { toast } from "react-toastify";

type User = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    status: string;
};

const useDebounce = (value: string, delay: number) => {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const timeout = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(timeout);
    }, [value, delay]);
    return debounced;
};

const Dashboard = () => {
    const accessToken = useAuthStore((state) => state.accessToken);
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearch = useDebounce(searchQuery, 400);
    const location = useLocation();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<string | null>(null);
    const queryClient = useQueryClient();

    // Update the search query based on the query parameter in the URL
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get("q");
        if (query) {
            setSearchQuery(query);
        }
    }, [location.search]);

    // Fetch users based on the search query
    const { data: users = [], isLoading, isError, error, refetch } = useQuery<User[], Error>({
        queryKey: ["users", debouncedSearch, accessToken],
        queryFn: async () => {
            const url = debouncedSearch
                ? `/api/users?search=${encodeURIComponent(debouncedSearch)}`
                : "/api/users";

            // Fetching data from the API
            const res = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Failed to fetch users");
            }
            const data = await res.json();
            return data.result.data.users || [];
        },
        enabled: !!accessToken,
    });

    useEffect(() => {
        refetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    // Handle search input and update the URL
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query.trim() === "") {
            navigate("/dashboard", { replace: true });
        } else {
            navigate(`/dashboard?q=${encodeURIComponent(query)}`, { replace: true });
        }
    };

    const deleteMutation = useMutation({
        mutationFn: async (userId: string) => {
            const res = await fetch(`/api/users/${userId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!res.ok) {
                const json = await res.json();
                throw new Error(json.message || "Failed to delete user");
            }
            return userId;
        },
        onMutate: async (userId) => {
            await queryClient.cancelQueries({ queryKey: ['users', debouncedSearch, accessToken] });
            const previousUsers = queryClient.getQueryData(['users', debouncedSearch, accessToken]);

            queryClient.setQueryData(['users', debouncedSearch, accessToken],
                (old: User[] | undefined) => old?.filter(user => user.id !== userId) || []);

            return { previousUsers };
        },
        onError: (err, userId, context) => {
            if (context?.previousUsers) {
                queryClient.setQueryData(['users', debouncedSearch, accessToken], context.previousUsers);
            }
            toast.error(err.message);
        },
        onSuccess: () => {
            toast.success("User deleted successfully");
        },
        onSettled: () => {
            setTimeout(() => {
                queryClient.invalidateQueries({
                    queryKey: ['users', debouncedSearch, accessToken],
                    exact: true
                });
            }, 400);
        }
    });

    const handleDeleteClick = (userId: string) => {
        setUserToDelete(userId);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (userToDelete) {
            try {
                deleteMutation.mutateAsync(userToDelete);
            } finally {
                setIsModalOpen(false);
                setUserToDelete(null);
            }
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setUserToDelete(null);
    };


    return (
        <div>
            <Navbar showNavItems={true} />
            <SearchInput onSearch={handleSearch} />
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                title="Delete User"
                message="Are you sure you want to delete this user? This action cannot be undone."
            />
            {isLoading && <Loading />}
            {isError && <p className="text-red-500">Error: {error?.message}</p>}
            {!isLoading && !isError && (
                <CardsContainer>
                    {users.length === 0 ? (
                        <p className="text-center text-gray-500">No users found</p>
                    ) : (
                        users.map((user) => (
                            <Card
                                key={user.id}
                                email={user.email}
                                name={`${user.firstName} ${user.lastName || ""}`}
                                dob={user.dateOfBirth}
                                initial={`${user.firstName[0]}${user.lastName?.[0] || ""}`}
                                status={user.status}
                                onEdit={() => navigate(`/dashboard/edit/${user.id}`)}
                                onDelete={() => handleDeleteClick(user.id)}
                            />
                        ))
                    )}
                </CardsContainer>
            )}
        </div>
    );
};

export default Dashboard;