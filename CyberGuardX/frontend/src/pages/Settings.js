import React from "react";
import AppShell from "../components/AppShell";
import {
  UserCircleIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  ClockIcon,
  CogIcon
} from "@heroicons/react/24/outline";

function Settings() {
  const user = {
    name: "Kishore Kumar",
    role: "Admin",
    email: "kishore@cyberguardx.com",
    totalScans: 47,
    lastLogin: "2024-01-15 14:30",
    joinedDate: "2023-06-15",
    permissions: ["Full Access", "User Management", "System Config"],
    preferences: {
      theme: "Dark",
      notifications: true,
      autoExport: false
    }
  };

  return (
    <AppShell pageTitle="Settings">
      <div className="w-full space-y-6">
        {/* User Profile Card */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center space-x-6 mb-6">
            <UserCircleIcon className="w-24 h-24 text-slate-400" />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2">{user.name}</h2>
              <p className="text-slate-400 mb-2">{user.email}</p>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                user.role === 'Admin' 
                  ? 'bg-red-900 text-red-300' 
                  : 'bg-blue-900 text-blue-300'
              }`}>
                {user.role}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Account Information */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <UserCircleIcon className="w-5 h-5" />
              <span>Account Information</span>
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Full Name</label>
                <p className="text-white">{user.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Email Address</label>
                <p className="text-white">{user.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Role</label>
                <p className="text-white">{user.role}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Member Since</label>
                <p className="text-white">{user.joinedDate}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Last Login</label>
                <p className="text-white">{user.lastLogin}</p>
              </div>
            </div>
          </div>

          {/* Activity Statistics */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <ChartBarIcon className="w-5 h-5" />
              <span>Activity Statistics</span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <ChartBarIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Total Scans</p>
                    <p className="text-slate-400 text-sm">All time</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-white">{user.totalScans}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <ShieldCheckIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Active Sessions</p>
                    <p className="text-slate-400 text-sm">Current</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center">
                    <ClockIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Session Duration</p>
                    <p className="text-slate-400 text-sm">Today</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-white">2h 45m</span>
              </div>
            </div>
          </div>

          {/* Permissions */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <ShieldCheckIcon className="w-5 h-5" />
              <span>Permissions</span>
            </h3>
            <div className="space-y-2">
              {user.permissions.map((permission, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 bg-slate-700 rounded">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white">{permission}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <CogIcon className="w-5 h-5" />
              <span>Preferences</span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Theme</span>
                <span className="text-white">{user.preferences.theme}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Email Notifications</span>
                <div className={`w-12 h-6 rounded-full p-1 transition-colors ${
                  user.preferences.notifications ? 'bg-blue-600' : 'bg-slate-600'
                }`}>
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    user.preferences.notifications ? 'translate-x-6' : 'translate-x-0'
                  }`}></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Auto Export Reports</span>
                <div className={`w-12 h-6 rounded-full p-1 transition-colors ${
                  user.preferences.autoExport ? 'bg-blue-600' : 'bg-slate-600'
                }`}>
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    user.preferences.autoExport ? 'translate-x-6' : 'translate-x-0'
                  }`}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

export default Settings;