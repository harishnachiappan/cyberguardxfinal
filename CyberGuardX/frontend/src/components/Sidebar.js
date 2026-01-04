import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  ChartBarIcon,
  DocumentTextIcon,
  UserCircleIcon,
  BugAntIcon,
  ShieldExclamationIcon,
  KeyIcon,
  LockClosedIcon,
  GlobeAltIcon,
  ServerIcon,
  ExclamationTriangleIcon,
  CogIcon
} from "@heroicons/react/24/outline";

function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const mainMenuItems = [
    { name: "Dashboard", path: "/dashboard", icon: HomeIcon },
    { name: "Target Analysis", path: "/target-analysis", icon: MagnifyingGlassIcon },
    { name: "Comprehensive Scanner", path: "/comprehensive-scanner", icon: ExclamationTriangleIcon },
    { name: "Reports", path: "/reports", icon: DocumentTextIcon }
  ];

  const settingsItem = { name: "Settings", path: "/settings", icon: UserCircleIcon };

  const scanModules = [
    { name: "SQL Injection", path: "/scan/sql-injection", icon: BugAntIcon, category: "A03" },
    { name: "XSS", path: "/scan/xss", icon: ShieldExclamationIcon, category: "A03" },
    { name: "CSRF", path: "/scan/csrf", icon: LockClosedIcon, category: "A01" },
    { name: "Access Control", path: "/scan/access-control", icon: LockClosedIcon, category: "A01" },
    { name: "JWT Security", path: "/scan/jwt", icon: KeyIcon, category: "Token" },
    { name: "Session Security", path: "/scan/session", icon: KeyIcon, category: "A07" },
    { name: "SSRF", path: "/scan/ssrf", icon: GlobeAltIcon, category: "A10" },
    { name: "Network VAPT", path: "/scan/network-vapt", icon: ServerIcon, category: "Infra" },
    { name: "Security Config", path: "/scan/security-config", icon: CogIcon, category: "A05" }
  ];

  const handleItemClick = (path) => {
    navigate(path);
    
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  const isActive = (path) => {
    if (path.startsWith('/scan/')) {
      return location.pathname.includes(path.split('/')[2]);
    }
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-slate-800 border-r border-slate-700 z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Main Navigation */}
          <div className="p-4">
            <nav className="space-y-1">
              {mainMenuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleItemClick(item.path)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive(item.path)
                        ? "bg-blue-600 text-white"
                        : "text-slate-300 hover:text-white hover:bg-slate-700"
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Scan Modules */}
          <div className="px-4 pb-4">
            <h3 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Individual Scan Modules
            </h3>
            <p className="px-3 text-xs text-slate-500 mb-3">
              Each module requires URL input
            </p>
            <nav className="space-y-1">
              {scanModules.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleItemClick(item.path)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors group ${
                      isActive(item.path)
                        ? "bg-blue-600 text-white"
                        : "text-slate-300 hover:text-white hover:bg-slate-700"
                    }`}
                    title={`Individual ${item.name} scan - requires URL input`}
                  >
                    <div className="flex items-center">
                      <Icon className="w-4 h-4 mr-3" />
                      <span>{item.name}</span>
                    </div>
                    <span className="text-xs bg-slate-600 group-hover:bg-slate-500 px-2 py-1 rounded">
                      {item.category}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Footer with Settings */}
          <div className="mt-auto p-4 border-t border-slate-700">
            <button
              onClick={() => handleItemClick(settingsItem.path)}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors mb-4 ${
                isActive(settingsItem.path)
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:text-white hover:bg-slate-700"
              }`}
            >
              <UserCircleIcon className="w-5 h-5 mr-3" />
              {settingsItem.name}
            </button>
            <div className="text-xs text-slate-500 text-center">
              CyberGuardX v1.0
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;