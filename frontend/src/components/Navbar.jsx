import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [openMenu, setOpenMenu] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setToken('false');
    localStorage.removeItem('token');
  };

  return (
    <div className="flex items-center justify-between text-sm py-1 border-b border-b-gray-400">

      {/* Logo - left */}
      <img
        onClick={() => navigate('/')}
        src={assets.medi_cure}
        alt="MediCure Logo"
        className="w-32 cursor-pointer"
      />

      {/* Navigation - center */}
      <ul className="hidden md:flex flex-1 justify-center items-center gap-8 font-medium">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 relative leading-none after:content-[''] after:block after:h-[2px] after:bg-blue-600 after:w-3/5 after:mx-auto after:mt-1"
                : "hover:text-blue-600 leading-none"
            }
               >
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/doctors"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 relative leading-none after:content-[''] after:block after:h-[2px] after:bg-blue-600 after:w-3/5 after:mx-auto after:mt-1"
                : "hover:text-blue-600 leading-none"
            }
          >
            ALL DOCTORS
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 relative leading-none after:content-[''] after:block after:h-[2px] after:bg-blue-600 after:w-3/5 after:mx-auto after:mt-1"
                : "hover:text-blue-600 leading-none"
            }
          >
            ABOUT
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 relative leading-none after:content-[''] after:block after:h-[2px] after:bg-blue-600 after:w-3/5 after:mx-auto after:mt-1"
                : "hover:text-blue-600 leading-none"
            }
          >
            CONTACT
          </NavLink>
        </li>
      </ul>

      {/* Right side - profile or button */}
      <div className="flex items-center gap-4 relative">
        {token && userData ? (
 <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <img
              className="w-8 h-8 rounded-full object-cover"
              src={userData.image}
              alt="Profile"
            />
            <img
              className="w-3 h-3"
              src={assets.dropdown_icon}
              alt="Dropdown"
            />

            {openMenu && (
              <div className="absolute top-full right-0 mt-1 w-40 bg-white shadow-md rounded-md p-2">
                <p
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    navigate('/my-profile');
                    setOpenMenu(false);
                  }}
                >
                  My Profile
                </p>
                <p
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    navigate('/my-appointments');
                    setOpenMenu(false);
                  }}
                >
                  My Appointments
                </p>
                <p
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    logout();
                    setOpenMenu(false);
                    navigate('/login');
                  }}
                >
                  Logout
                </p>
                  </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create account
          </button>
        )}

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt="Menu"
        />

        {/* Mobile Menu */}
        <div
          className={`${
            showMenu ? 'fixed w-full' : 'h-0 w-0'
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img className="w-36" src={assets.medilogo} alt="Logo" />
            <img
              className="w-7"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt="Close"
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to="/">
              <p className="px-4 py-2 rounded inline-block">Home</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/doctors">
              <p className="px-4 py-2 rounded inline-block">ALL DOCTORS</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about">
              <p className="px-4 py-2 rounded inline-block">ABOUT</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact">
              <p className="px-4 py-2 rounded inline-block">CONTACT</p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;


