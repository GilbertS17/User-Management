import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/store/themeStore"; // adjust path if needed
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

const Navbar = () => {
    const theme = useThemeStore((state) => state.theme);
    const toggleTheme = useThemeStore((state) => state.toggleTheme);
    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout);


    const handleLogout = () => {
        logout();
        // Redirect to login page
        navigate("/login");
    };

    return (
        <div className="nav-container dark:bg-gray-800">
            <h1 className="title">User Management</h1>
            <div>
                <button className="create-btn">Create User</button>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
                <button className="moon-container group" onClick={toggleTheme}>
                    {theme === "dark" ? (
                        <Sun size={22} className="text-yellow-400" />
                    ) : (
                        <Moon size={22} className="text-gray-800" />
                    )}
                </button>
            </div>
        </div>
    );
};

export default Navbar;
