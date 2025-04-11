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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message);
            setUsers([]); // clear users if there's an error
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch when accessToken is available
    useEffect(() => {
        if (accessToken) {
            fetchUsers();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken]);

    // Handle search input
    const handleSearch = (query: string) => {
        if (accessToken) {
            fetchUsers(query);
        }
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