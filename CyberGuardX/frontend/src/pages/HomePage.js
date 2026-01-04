import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheckIcon,
  BugAntIcon,
  EyeIcon,
  DocumentMagnifyingGlassIcon,
  ServerIcon,
  LockClosedIcon,
  ArrowRightIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";

function HomePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: BugAntIcon,
      title: "Vulnerability Scanning",
      description: "Comprehensive OWASP Top 10 vulnerability detection and analysis"
    },
    {
      icon: EyeIcon,
      title: "Real-time Monitoring",
      description: "Live scanning progress with detailed vulnerability reporting"
    },
    {
      icon: DocumentMagnifyingGlassIcon,
      title: "Detailed Reports",
      description: "Professional PDF reports with remediation recommendations"
    },
    {
      icon: ServerIcon,
      title: "Network Analysis",
      description: "Port scanning and network infrastructure assessment"
    },
    {
      icon: LockClosedIcon,
      title: "Security Assessment",
      description: "JWT, session management, and access control testing"
    },
    {
      icon: ShieldCheckIcon,
      title: "Compliance Ready",
      description: "OWASP-compliant security testing and documentation"
    }
  ];

  const stats = [
    { label: "Security Scans", value: "10,000+" },
    { label: "Vulnerabilities Found", value: "50,000+" },
    { label: "Reports Generated", value: "5,000+" },
    { label: "Organizations Protected", value: "500+" }
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navigation */}
      <nav className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            CyberGuardX
          </div>
          <div className="flex items-center space-x-8">
            <button
              onClick={() => navigate("/")}
              className="text-blue-400 font-medium"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/about")}
              className="text-slate-300 hover:text-white transition"
            >
              About
            </button>
            <button
              onClick={() => navigate("/auth")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition font-medium"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
            Secure Your Digital
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Infrastructure
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            CyberGuardX is a comprehensive cybersecurity platform designed for vulnerability assessment 
            and penetration testing with OWASP-centric approach and guided workflow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/auth")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg transition font-semibold text-lg flex items-center justify-center"
            >
              Start Security Scan
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </button>
            <button
              onClick={() => navigate("/about")}
              className="border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white px-8 py-4 rounded-lg transition font-semibold text-lg"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">{stat.value}</div>
                <div className="text-slate-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Powerful Security Features</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Comprehensive security testing tools designed to identify and assess vulnerabilities 
              in your web applications and infrastructure.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-blue-500/50 transition">
                <feature.icon className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-900/50 to-cyan-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Secure Your Applications?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Start your comprehensive security assessment today with CyberGuardX's 
            advanced vulnerability scanning platform.
          </p>
          <button
            onClick={() => navigate("/auth")}
            className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-100 transition inline-flex items-center"
          >
            Get Started Now
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            CyberGuardX
          </div>
          <p className="text-slate-300 mb-4">
            Comprehensive cybersecurity platform for vulnerability assessment and penetration testing.
          </p>
          <p className="text-slate-400 text-sm">
            Developed by Harish Nachiappan and Thirumalai
          </p>
          <div className="border-t border-slate-700 mt-8 pt-8 text-slate-400">
            <p>&copy; 2024 CyberGuardX. All rights reserved. Built for cybersecurity education and authorized testing.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;