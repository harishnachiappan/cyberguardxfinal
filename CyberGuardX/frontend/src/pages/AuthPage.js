import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CyberGlobe from "../components/CyberGlobe";
import CredentialsInfo from "../components/CredentialsInfo";
import apiService from "../services/api";
import { clearUserData, setUserData } from "../utils/userUtils";

import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

function AuthPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [userType, setUserType] = useState("user");
  const [activeTab, setActiveTab] = useState("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Predefined credentials
  const credentials = {
    admin: {
      email: "admin@cyberguardx.com",
      password: "admin123",
      name: "Administrator"
    },
    users: [
      { email: "harish@cyberguardx.com", password: "harish123", name: "Harish Nachiappan", role: "developer" },
      { email: "thirumalai@cyberguardx.com", password: "thiru123", name: "Thirumalai", role: "developer" },
      { email: "user@cyberguardx.com", password: "user123", name: "Test User", role: "user" }
    ]
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!loginEmail || !loginPassword) {
      setError("Please enter email and password.");
      setLoading(false);
      return;
    }

    try {
      const response = await apiService.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          username: loginEmail,
          password: loginPassword
        })
      });

      if (response.token && response.user) {
        clearUserData();
        setUserData({
          id: response.user.id,
          name: response.user.username,
          email: response.user.email,
          role: response.user.role
        });
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!regName || !regEmail || !regPassword || !regConfirm) {
      setError("Please fill all fields.");
      setLoading(false);
      return;
    }
    if (!regEmail.includes("@")) {
      setError("Please enter a valid email.");
      setLoading(false);
      return;
    }
    if (regPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }
    if (regPassword !== regConfirm) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await apiService.request('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          username: regName,
          email: regEmail,
          password: regPassword,
          role: userType
        })
      });

      if (response.token && response.user) {
        setActiveTab("login");
        setLoginEmail(regEmail);
        setError("");
        alert("Registration successful! You can now login.");
      }
    } catch (error) {
      setError(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const navigateToHome = () => {
    navigate("/home");
  };

  const navigateToAbout = () => {
    navigate("/about");
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: 'url("assets/cyber-bg.jpg")' }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/70 to-slate-900/80"></div>

      {/* NAVBAR */}
      <nav className="relative z-50 fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            CyberGuardX
          </div>
          <div className="flex items-center space-x-8">
            <button
              onClick={navigateToHome}
              className="text-slate-300 hover:text-white transition"
            >
              Home
            </button>
            <button
              onClick={navigateToAbout}
              className="text-slate-300 hover:text-white transition"
            >
              About
            </button>
            <a
              href="#"
              className="text-slate-300 hover:text-white transition"
            >
              Services
            </a>
            <button
              onClick={() => setShowLogin(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition font-medium"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="relative z-10 pt-0 h-[calc(100vh-64px)] flex items-center">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT COLUMN */}
          <div
            className={`space-y-6 transition-all duration-700 ${
              showLogin
                ? "lg:pr-8 transform -translate-x-4 scale-95 opacity-80"
                : "transform translate-x-0 scale-100 opacity-100"
            }`}
          >
            <p className="text-blue-400 font-medium">
              Welcome to Digital Security
            </p>
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
              Unlocking the Secrets of{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Digital Safety
              </span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Comprehensive cybersecurity solutions to protect your digital
              assets. Scan, analyze, and secure your applications with our
              advanced toolkit.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowLogin(true)}
                className="bg-blue-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg transition font-semibold text-lg"
              >
                Get Started
              </button>
              <button className="border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white px-8 py-3 rounded-lg transition font-semibold text-lg">
                Learn More
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="relative flex items-center justify-end">
            {/* 3D CYBER GLOBE (react-globe.gl) */}
            <div
              className={`transition-all duration-500 ${
                showLogin
                  ? "transform -translate-x-20 scale-75 opacity-30"
                  : "transform translate-x-0 scale-100 opacity-100"
              }`}
            >
              <CyberGlobe />
            </div>

            {/* LOGIN / REGISTER POPUP */}
            {showLogin && (
              <div className="absolute inset-y-0 right-0 flex items-center justify-center">
                <div className="w-[480px] bg-slate-900/90 backdrop-blur-x border border-slate-600/50 rounded-2xl px-6 py-5 shadow-2xl transform translate-x-8 opacity-0 animate-[popup_0.5s_ease-out_forwards]">

                  {/* CLOSE BUTTON */}
                  <button
                    onClick={() => setShowLogin(false)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white hover:rotate-90 transition-all duration-300"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>

                  {/* User Type Dropdown */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Login As
                    </label>
                    <select
                      value={userType}
                      onChange={(e) => {
                        setUserType(e.target.value);
                        if (e.target.value === "admin") {
                          setActiveTab("login");
                        }
                        setError("");
                      }}
                      className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  {/* Credentials Info - Only show for demo */}
                  {process.env.NODE_ENV === 'development' && (
                    <CredentialsInfo userType={userType} />
                  )}

                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {userType === "admin" ? "Admin Login" : 
                        (activeTab === "login" ? "Welcome Back" : "Create Account")}
                    </h2>
                    <p className="text-slate-400">
                      {userType === "admin" ? "Sign in as administrator" :
                        (activeTab === "login" ? "Sign in to your account" : "Join CyberGuardX today")}
                    </p>
                  </div>

                  {/* TABS - Only show for users */}
                  {userType === "user" && (
                    <div className="flex bg-slate-800/50 rounded-lg p-0.6 mb-6">
                      <button
                        onClick={() => {
                          setActiveTab("register");
                          setError("");
                        }}
                        className={`flex-1 py-2 text-sm font-medium rounded-md transition ${
                          activeTab === "register"
                            ? "bg-blue-600 text-white"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        Register
                      </button>
                      <button
                        onClick={() => {
                          setActiveTab("login");
                          setError("");
                        }}
                        className={` flex-1 py-2 text-sm font-medium rounded-md transition ${
                          activeTab === "login"
                            ? "bg-blue-600 text-white"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        Login
                      </button>
                    </div>
                  )}

                  {/* ERROR */}
                  {error && (
                    <div className="mb-4 p-3 bg-red-900/50 border border-red-500/50 rounded-lg text-red-300 text-sm">
                      {error}
                    </div>
                  )}

                  {/* FORMS */}
                  {userType === "user" && activeTab === "register" ? (
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Full Name
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={regName}
                            onChange={(e) => setRegName(e.target.value)}
                            className="w-full bg-slate-800/50 border border-slate-600 rounded-lg pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition"
                            placeholder="Enter your full name"
                          />
                          <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Email
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            value={regEmail}
                            onChange={(e) => setRegEmail(e.target.value)}
                            className="w-full bg-slate-800/50 border border-slate-600 rounded-lg pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition"
                            placeholder="Enter your email"
                          />
                          <EnvelopeIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Password
                        </label>
                        <div className="relative">
                          <input
                            type="password"
                            value={regPassword}
                            onChange={(e) => setRegPassword(e.target.value)}
                            className="w-full bg-slate-800/50 border border-slate-600 rounded-lg pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition"
                            placeholder="Create a password"
                          />
                          <LockClosedIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <input
                            type="password"
                            value={regConfirm}
                            onChange={(e) => setRegConfirm(e.target.value)}
                            className="w-full bg-slate-800/50 border border-slate-600 rounded-lg pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition"
                            placeholder="Confirm your password"
                          />
                          <LockClosedIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        </div>
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center"
                      >
                        {loading ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Creating Account...
                          </>
                        ) : (
                          "Create Account"
                        )}
                      </button>
                      <p className="text-center text-slate-400 text-sm">
                        Already have an account?{" "}
                        <button
                          type="button"
                          onClick={() => setActiveTab("login")}
                          className="text-blue-400 hover:text-blue-300 transition"
                        >
                          Login
                        </button>
                      </p>
                    </form>
                  ) : (
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Email
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            className="w-full bg-slate-800/50 border border-slate-600 rounded-lg pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition"
                            placeholder="Enter your email"
                          />
                          <EnvelopeIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Password
                        </label>
                        <div className="relative">
                          <input
                            type="password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            className="w-full bg-slate-800/50 border border-slate-600 rounded-lg pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition"
                            placeholder="Enter your password"
                          />
                          <LockClosedIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="flex items-center space-x-2 text-slate-300">
                          <input
                            type="checkbox"
                            className="rounded border-slate-600 bg-slate-800 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm">Remember me</span>
                        </label>
                        <button
                          type="button"
                          className="text-blue-400 hover:text-blue-300 text-sm transition"
                        >
                          Forgot password?
                        </button>
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center"
                      >
                        {loading ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Signing In...
                          </>
                        ) : (
                          "Sign In"
                        )}
                      </button>
                      {userType === "user" && (
                        <p className="text-center text-slate-400 text-sm">
                          Don&apos;t have an account?{" "}
                          <button
                            type="button"
                            onClick={() => setActiveTab("register")}
                            className="text-blue-400 hover:text-blue-300 transition"
                          >
                            Register
                          </button>
                        </p>
                      )}
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
