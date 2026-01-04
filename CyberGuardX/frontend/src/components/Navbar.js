import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheckIcon,
  Bars3Icon,
  ChevronDownIcon,
  UserCircleIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  BellIcon
} from "@heroicons/react/24/outline";

function Navbar({ onToggleSidebar, currentPage = "Dashboard" }) {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const user = {
    name: "Kishore Kumar",
    role: "Admin",
    email: "kishore@cyberguardx.com",
    avatar: null
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-800 border-b border-slate-700 h-16">
      <div className="flex items-center justify-between h-full px-4">
        {/* Left Side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition lg:hidden"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
          
          <div className="flex items-center space-x-3">
            <ShieldCheckIcon className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              CyberGuardX
            </span>
          </div>

          {/* Page Title - Hidden on mobile */}
          <div className="hidden md:block">
            <span className="text-slate-400 mx-3">|</span>
            <span className="text-white font-medium">{currentPage}</span>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition relative">
            <BellIcon className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center space-x-3 p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition"
            >
              <div className="hidden sm:block text-right">
                <div className="text-sm font-medium text-white">{user.name}</div>
                <div className="text-xs text-slate-400">{user.role}</div>
              </div>
              
              {user.avatar ? (
                <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
              ) : (
                <UserCircleIcon className="w-8 h-8 text-slate-400" />
              )}
              
              <ChevronDownIcon className={`w-4 h-4 transition-transform ${showUserDropdown ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-lg shadow-xl py-2 animate-in slide-in-from-top-2 duration-200">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-slate-700">
                  <div className="flex items-center space-x-3">
                    <UserCircleIcon className="w-10 h-10 text-slate-400" />
                    <div>
                      <div className="font-medium text-white">{user.name}</div>
                      <div className="text-sm text-slate-400">{user.email}</div>
                      <div className="text-xs text-blue-400 bg-blue-900 px-2 py-1 rounded mt-1 inline-block">
                        {user.role}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <button className="w-full flex items-center space-x-3 px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700 transition">
                    <UserCircleIcon className="w-5 h-5" />
                    <span>Profile Settings</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700 transition">
                    <CogIcon className="w-5 h-5" />
                    <span>Preferences</span>
                  </button>
                </div>

                {/* Logout */}
                <div className="border-t border-slate-700 pt-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 transition"
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;