import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheckIcon,
  AcademicCapIcon,
  LightBulbIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  HeartIcon
} from "@heroicons/react/24/outline";

function AboutPage() {
  const navigate = useNavigate();

  const features = [
    "OWASP Top 10 vulnerability scanning",
    "Two-phase scanning workflow",
    "Real-time progress monitoring",
    "Comprehensive vulnerability reports",
    "JWT and session security testing",
    "Network infrastructure assessment",
    "Professional PDF report generation",
    "User and admin role management"
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
              className="text-slate-300 hover:text-white transition"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/about")}
              className="text-blue-400 font-medium"
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
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            About
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              CyberGuardX
            </span>
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            CyberGuardX is a comprehensive cybersecurity platform designed for vulnerability assessment 
            and penetration testing with a guided workflow approach. Built with modern web technologies 
            and focused on OWASP-centric security testing methodologies.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <ShieldCheckIcon className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-slate-300">
                To provide accessible, comprehensive cybersecurity tools that help organizations 
                identify and remediate vulnerabilities in their web applications and infrastructure.
              </p>
            </div>
            <div className="text-center">
              <AcademicCapIcon className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Educational Focus</h3>
              <p className="text-slate-300">
                Built as an educational platform to demonstrate modern cybersecurity practices, 
                OWASP guidelines, and secure software development methodologies.
              </p>
            </div>
            <div className="text-center">
              <LightBulbIcon className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Innovation</h3>
              <p className="text-slate-300">
                Combining cutting-edge web technologies with proven security testing methodologies 
                to create an intuitive and powerful vulnerability assessment platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Project Overview</h2>
              <p className="text-lg text-slate-300 mb-6">
                CyberGuardX represents a modern approach to web application security testing. 
                The platform implements a two-phase scanning workflow that guides users through 
                comprehensive security assessments while providing the flexibility for targeted testing.
              </p>
              <p className="text-lg text-slate-300 mb-8">
                Built with React frontend and Express.js backend, the platform demonstrates 
                best practices in secure web development while providing practical cybersecurity 
                tools for vulnerability assessment and penetration testing.
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Key Features</h3>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-900/50 to-cyan-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <HeartIcon className="w-16 h-16 text-red-400 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-6">
            Built with Passion for Cybersecurity
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            CyberGuardX is more than just a security platform - it's a demonstration of our 
            commitment to advancing cybersecurity education and practical security testing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/auth")}
              className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-100 transition inline-flex items-center justify-center"
            >
              Try CyberGuardX
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </button>
            <button
              onClick={() => navigate("/")}
              className="border border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            CyberGuardX
          </div>
          <p className="text-slate-300 mb-2">
            Comprehensive cybersecurity platform for vulnerability assessment and penetration testing.
          </p>
          <p className="text-slate-400">
            Developed with ❤️ by <span className="text-blue-400 font-medium">Harish Nachiappan</span> and <span className="text-cyan-400 font-medium">Thirumalai</span>
          </p>
          <div className="border-t border-slate-700 mt-8 pt-8 text-slate-400">
            <p>&copy; 2024 CyberGuardX. All rights reserved. Built for cybersecurity education and authorized testing.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AboutPage;