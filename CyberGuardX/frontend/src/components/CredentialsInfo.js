import React, { useState } from "react";
import {
  InformationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  UserIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";

function CredentialsInfo({ userType }) {
  const [showCredentials, setShowCredentials] = useState(false);

  const credentials = {
    admin: {
      email: "admin@cyberguardx.com",
      password: "admin123",
      name: "Administrator"
    },
    users: [
      { email: "harish@cyberguardx.com", password: "harish123", name: "Harish Nachiappan", role: "Developer" },
      { email: "thirumalai@cyberguardx.com", password: "thiru123", name: "Thirumalai", role: "Developer" },
      { email: "user@cyberguardx.com", password: "user123", name: "Test User", role: "User" }
    ]
  };

  return (
    <div className="mb-6 bg-slate-800/50 border border-slate-600/50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <InformationCircleIcon className="w-5 h-5 text-blue-400 mr-2" />
          <span className="text-sm font-medium text-slate-300">Demo Credentials</span>
        </div>
        <button
          onClick={() => setShowCredentials(!showCredentials)}
          className="flex items-center text-blue-400 hover:text-blue-300 transition text-sm"
        >
          {showCredentials ? (
            <>
              <EyeSlashIcon className="w-4 h-4 mr-1" />
              Hide
            </>
          ) : (
            <>
              <EyeIcon className="w-4 h-4 mr-1" />
              Show
            </>
          )}
        </button>
      </div>
      
      {showCredentials && (
        <div className="space-y-3">
          {userType === "admin" ? (
            <div className="bg-slate-700/50 rounded p-3">
              <div className="flex items-center mb-2">
                <ShieldCheckIcon className="w-4 h-4 text-red-400 mr-2" />
                <span className="text-sm font-medium text-white">Admin Access</span>
              </div>
              <div className="text-xs text-slate-300 space-y-1">
                <div><span className="text-slate-400">Email:</span> {credentials.admin.email}</div>
                <div><span className="text-slate-400">Password:</span> {credentials.admin.password}</div>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center mb-2">
                <UserIcon className="w-4 h-4 text-blue-400 mr-2" />
                <span className="text-sm font-medium text-white">User Accounts</span>
              </div>
              {credentials.users.map((user, index) => (
                <div key={index} className="bg-slate-700/50 rounded p-2">
                  <div className="text-xs text-slate-300 space-y-1">
                    <div className="font-medium text-white">{user.name} ({user.role})</div>
                    <div><span className="text-slate-400">Email:</span> {user.email}</div>
                    <div><span className="text-slate-400">Password:</span> {user.password}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="text-xs text-slate-400 mt-2">
            💡 Use these credentials to test the authentication system
          </div>
        </div>
      )}
    </div>
  );
}

export default CredentialsInfo;