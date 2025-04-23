import { useAuthStore } from "@/store/authStore";
import { Card } from "../molecules/card/Card";
import SearchInput from "../molecules/searchinput/SearchInput";
import CardsContainer from "../organisms/cardsContainer/CardsContainer";
import Navbar from "../organisms/navbar/Navbar";
import { useEffect, useState } from "react";
import Loading from "../molecules/loading/Loading";

type User = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    status: string;
};

const Dashboard = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const accessToken = useAuthStore((state) => state.accessToken);

    // Fetch users from API
    const fetchUsers = async (query = "") => {
        try {
            setLoading(true);
            setError("");
            const url = query ? `/api/users?search=${encodeURIComponent(query)}` : "/api/users";
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Failed to fetch users");
            }

            const data = await response.json();
            setUsers(data.result.data.users);
        } catch (err) {
            setError(err as string);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    // Debounce search query
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (accessToken) {
                fetchUsers(searchQuery);
            }
        }, 500); // 500ms delay

        return () => clearTimeout(delayDebounce);
    }, [searchQuery, accessToken]);

    // Initial fetch
    useEffect(() => {
        if (accessToken) {
            fetchUsers();
        }
    }, [accessToken]);

    // Update search query on input change
    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <div>
            <Navbar />
            <SearchInput onSearch={handleSearch} />
            {!loading && !error && users.length === 0 && (
                <p className="no-users-msg">No users found.</p>
            )}
            {loading ? <Loading /> :
                <CardsContainer>
                    {users.map((user) => (
                        <Card
                            key={user.id}
                            email={user.email}
                            name={`${user.firstName} ${user.lastName ? " " + user.lastName : ""}`}
                            dob={user.dateOfBirth}
                            initial={`${user.firstName[0]}${user.lastName ? user.lastName[0] : ""}`}
                            status={user.status}
                        />
                    ))}
                </CardsContainer>
            }
        </div>
    );
}

export default Dashboard;
