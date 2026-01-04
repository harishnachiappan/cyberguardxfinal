import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearUserData } from "../utils/userUtils";
import {
  ShieldCheckIcon,
  Bars3Icon,
  ChevronDownIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  SunIcon,
  MoonIcon
} from "@heroicons/react/24/outline";

function TopNavbar({ onToggleSidebar, theme, onToggleTheme }) {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Get user data from localStorage and API
  useEffect(() => {
    const loadUserData = async () => {
      const userData = localStorage.getItem('userData');
      const authToken = localStorage.getItem('authToken');
      
      if (userData && authToken) {
        try {
          // Verify token and get fresh user data
          const response = await fetch('/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
          });
          
          if (response.ok) {
            const freshUserData = await response.json();
            setUser({
              name: freshUserData.username || freshUserData.profile?.firstName || "User",
              role: freshUserData.role === 'admin' ? 'Admin' : 'User',
              email: freshUserData.email,
              totalScans: freshUserData.totalScans || 0,
              lastLogin: freshUserData.lastLogin ? new Date(freshUserData.lastLogin).toLocaleString() : new Date().toLocaleString()
            });
          } else {
            // Token invalid, use stored data as fallback
            const parsedUser = JSON.parse(userData);
            setUser({
              name: parsedUser.name || "User",
              role: parsedUser.role === 'admin' ? 'Admin' : 'User',
              email: parsedUser.email,
              totalScans: 0,
              lastLogin: new Date().toLocaleString()
            });
          }
        } catch (error) {
          // Use stored data as fallback
          const parsedUser = JSON.parse(userData);
          setUser({
            name: parsedUser.name || "User",
            role: parsedUser.role === 'admin' ? 'Admin' : 'User', 
            email: parsedUser.email,
            totalScans: 0,
            lastLogin: new Date().toLocaleString()
          });
        }
      } else {
        // No user data, redirect to auth
        navigate('/auth');
      }
    };
    
    loadUserData();
  }, [navigate]);

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
    // Clear user data from localStorage
    clearUserData();
    navigate("/auth");
  };

  if (!user) {
    return null; // Loading state
  }

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
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition"
          >
            {theme === 'dark' ? (
              <SunIcon className="w-5 h-5" />
            ) : (
              <MoonIcon className="w-5 h-5" />
            )}
          </button>

          {/* User Role Badge */}
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            user.role === 'Admin' 
              ? 'bg-red-900 text-red-300' 
              : 'bg-blue-900 text-blue-300'
          }`}>
            {user.role}
          </span>

          {/* User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center space-x-2 p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition"
            >
              <span className="font-medium">{user.name.split(' ')[0]}</span>
              <ChevronDownIcon className={`w-4 h-4 transition-transform ${showUserDropdown ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-72 bg-slate-800 border border-slate-700 rounded-lg shadow-xl py-2 animate-in slide-in-from-top-2 duration-200">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-slate-700">
                  <div className="flex items-center space-x-3">
                    <UserCircleIcon className="w-12 h-12 text-slate-400" />
                    <div className="flex-1">
                      <div className="font-medium text-white">{user.name}</div>
                      <div className="text-sm text-slate-400">{user.email}</div>
                      <div className={`text-xs px-2 py-1 rounded mt-1 inline-block ${
                        user.role === 'Admin' 
                          ? 'bg-red-900 text-red-300' 
                          : 'bg-blue-900 text-blue-300'
                      }`}>
                        {user.role}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="px-4 py-3 border-b border-slate-700">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-slate-400">Total Scans</div>
                      <div className="text-white font-medium">{user.totalScans}</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Last Login</div>
                      <div className="text-white font-medium">{user.lastLogin}</div>
                    </div>
                  </div>
                </div>

                {/* Logout */}
                <div className="pt-2">
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

export default TopNavbar;