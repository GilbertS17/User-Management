import { Menu, X } from "lucide-react";
import { useState } from "react";
import NavItems from "@/Components/molecules/NavItems/NavItems";

const Navbar = ({ showNavItems = true }: { showNavItems?: boolean }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <div className="nav-container flex items-center justify-between">
      <h1 className="title text-white">User Management</h1>

      {showNavItems && (
        <button className="md:hidden text-white" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {showNavItems && (
        <div
          className={`flex flex-col md:flex-row md:items-center gap-2 md:gap-4 transition-all duration-300 
          ${isMenuOpen ? "block" : "hidden"} md:flex`}
        >
          <NavItems />
        </div>
      )}
    </div>
  );
};

export default Navbar;
