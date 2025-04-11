import { useAuthStore } from "@/store/authStore";
import { Card } from "../molecules/card/Card";
import SearchInput from "../molecules/searchinput/SearchInput";
import CardsContainer from "../organisms/cardsContainer/CardsContainer";
import Navbar from "../organisms/navbar/Navbar";
import { useEffect, useState } from "react";

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
    const accessToken = useAuthStore((state) => state.accessToken);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("/api/users", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
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
            }
        };

        if (accessToken) {
            fetchUsers();
        }
    }, [accessToken]);

    useEffect(() => {
        console.log("Fetched users:", users);
    }, [users]);

    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <Navbar />
            <SearchInput />
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
        </>
    );
}

export default Dashboard;