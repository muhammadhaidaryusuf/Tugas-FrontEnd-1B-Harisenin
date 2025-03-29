import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);

  const handleLogout = () => {
    // Navigasi tanpa API
    window.location.href = "/";
  };

  return (
    <nav className="bg-[#181A1C] text-white px-9 py-2">
      <div className="flex justify-between items-center px-4">
        <div className="flex items-center gap-8">
          <Link to="/Dashboard">
            <img src="/img/logo.png" alt="Logo" className="h-4 w-auto sm:h-10" />
          </Link>
          <div className="flex items-center gap-2 sm:gap-8">
            <Link to="/series" className="hover:text-gray-300 sm:text-sm text-[8px]">
              Series
            </Link>
            <Link to="/film" className="hover:text-gray-300 sm:text-sm text-[8px]">
              Film
            </Link>
            <Link to="/MyList" className="hover:text-gray-300 sm:text-sm text-[8px]">
              Daftar Saya
            </Link>
          </div>
        </div>
        <div className="relative">
          <button onClick={toggleDropdown} className="flex items-center space-x-2">
            <img src="/img/user.png" alt="User" className="h-4 w-4 sm:h-8 sm:w-8 rounded-full" />
            <i className="fa-solid fa-angle-down" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#181A1C] rounded-md shadow-sm z-10">
              <Link to="/profile" onClick={closeDropdown} className="block px-4 py-2 text-[8px] sm:text-sm hover:bg-[#484a4d]">
                <i className="mr-2 fa-solid fa-user"></i>Profil Saya
              </Link>
              <Link to="/premium" onClick={closeDropdown} className="block px-4 py-2 text-[8px] sm:text-sm hover:bg-[#484a4d]">
                <i className="mr-2 fa-solid fa-star"></i>Ubah Premium
              </Link>
              <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-[8px] sm:text-sm hover:bg-[#484a4d]">
                <i className="mr-4 fa-solid fa-arrow-right-from-bracket" />
                Keluar
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
