import { Moon, Sun, Menu, X } from "lucide-react";
import { useThemeStore } from "@/store/themeStore";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";

const Navbar = () => {
    const theme = useThemeStore((state) => state.theme);
    const toggleTheme = useThemeStore((state) => state.toggleTheme);
    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const toggleMenu = () => setIsMenuOpen(prev => !prev);

    return (
        <div className="nav-container dark:bg-gray-800 px-4 py-3 flex items-center justify-between">
            <h1 className="title text-xl font-bold text-gray-900 dark:text-white">User Management</h1>

            {/* Hamburger Icon - visible only on small screens */}
            <button className="md:hidden text-white" onClick={toggleMenu}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Menu Items */}
            <div
                className={`flex flex-col md:flex-row md:items-center gap-2 md:gap-4 transition-all duration-300 
                ${isMenuOpen ? "block" : "hidden"} md:flex`}
            >
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
