import { Moon } from "lucide-react";

const Navbar = () => {
    return (
        <div className="nav-container">
            <h1 className="title">User Management</h1>
            <div>
                <button className="create-btn">Create User</button>
                <button className="logout-btn">Logout</button>
                <button className="moon-container group">
                    <Moon size={22} className="moon" />
                </button>
            </div>
        </div>
    );
}

export default Navbar;
