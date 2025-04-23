import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/store/themeStore";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

const NavItems = () => {
    const theme = useThemeStore((state) => state.theme);
    const toggleTheme = useThemeStore((state) => state.toggleTheme);
    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout);

    return (
        <>
            <button className="create-btn" onClick={() => navigate("/dashboard/new")}>
                Create User
            </button>
            <button className="logout-btn" onClick={() => {
                logout();
                navigate("/login");
            }}>
                Logout
            </button>
            <button className="moon-container group" onClick={toggleTheme}>
                {theme === "dark" ? (
                    <Sun size={22} className="text-yellow-400" />
                ) : (
                    <Moon size={22} className="text-gray-800" />
                )}
            </button>
        </>
    );
};

export default NavItems;
