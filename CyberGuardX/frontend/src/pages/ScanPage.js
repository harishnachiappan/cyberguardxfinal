import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import {
  PlayIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  DocumentArrowDownIcon,
  EyeIcon,
  GlobeAltIcon,
  ServerIcon
} from "@heroicons/react/24/outline";

function ScanPage() {
  const { scanId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [scanContext, setScanContext] = useState(null);
  const [suggestedModules, setSuggestedModules] = useState([]);
  const [runningModule, setRunningModule] = useState(null);

  useEffect(() => {
    // Get data from navigation state or simulate loading
    const stateData = location.state;
    
    setTimeout(() => {
      setScanContext({
        scanId,
        target: stateData?.target || "example.com",
        scanType: stateData?.scanType || "Quick Security Scan",
        status: "Ready",
        domainInfo: stateData?.domainInfo || {
          ip: "192.168.1.100",
          server: "nginx/1.18.0",
          technologies: ["React", "Node.js", "Express", "MongoDB"]
        },
        reconnaissance: {
          technologies: ["React", "Node.js", "Express", "MongoDB"],
          pages: ["/", "/login", "/dashboard", "/api/users"],
          forms: 3,
          apis: 8,
          headers: { "X-Powered-By": "Express", "Server": "nginx" }
        }
      });

      setSuggestedModules([
        {
          name: "access_control",
          displayName: "Access Control",
          category: "OWASP A01",
          description: "Tests for IDOR, role bypass, insecure direct object references",
          status: "Pending",
          findings: 0,
          severity: { critical: 0, high: 0, medium: 0, low: 0 }
        },
        {
          name: "xss",
          displayName: "Cross-Site Scripting",
          category: "OWASP A03",
          description: "Detects reflected, stored, and DOM-based XSS vulnerabilities",
          status: "Pending",
          findings: 0,
          severity: { critical: 0, high: 0, medium: 0, low: 0 }
        },
        {
          name: "sql_injection",
          displayName: "SQL Injection",
          category: "OWASP A03",
          description: "Tests parameters for SQL injection vulnerabilities",
          status: "Pending",
          findings: 0,
          severity: { critical: 0, high: 0, medium: 0, low: 0 }
        },
        {
          name: "csrf",
          displayName: "CSRF Protection",
          category: "OWASP A01",
          description: "Verifies CSRF tokens and SameSite cookie attributes",
          status: "Pending",
          findings: 0,
          severity: { critical: 0, high: 0, medium: 0, low: 0 }
        },
        {
          name: "session_attacks",
          displayName: "Session Security",
          category: "OWASP A07",
          description: "Tests session IDs, timeouts, and cookie security",
          status: "Pending",
          findings: 0,
          severity: { critical: 0, high: 0, medium: 0, low: 0 }
        },
        {
          name: "jwt",
          displayName: "JWT Security",
          category: "Token/API",
          description: "Analyzes JWT algorithms, expiry, and key confusion attacks",
          status: "Pending",
          findings: 0,
          severity: { critical: 0, high: 0, medium: 0, low: 0 }
        },
        {
          name: "ssrf_fileupload",
          displayName: "SSRF & File Upload",
          category: "OWASP A10",
          description: "Tests for SSRF via file uploads and URL parameters",
          status: "Pending",
          findings: 0,
          severity: { critical: 0, high: 0, medium: 0, low: 0 }
        },
        {
          name: "network_vapt",
          displayName: "Network VAPT",
          category: "Infrastructure",
          description: "Port scanning and service enumeration",
          status: "Pending",
          findings: 0,
          severity: { critical: 0, high: 0, medium: 0, low: 0 }
        }
      ]);
    }, 1500);
  }, [scanId, location.state]);

  const runModule = (moduleName) => {
    setRunningModule(moduleName);
    setSuggestedModules(prev => 
      prev.map(module => 
        module.name === moduleName 
          ? { ...module, status: "Running" }
          : module
      )
    );

    // Simulate module execution
    setTimeout(() => {
      const mockFindings = Math.floor(Math.random() * 8);
      const mockSeverity = {
        critical: Math.floor(Math.random() * 2),
        high: Math.floor(Math.random() * 3),
        medium: Math.floor(Math.random() * 4),
        low: Math.floor(Math.random() * 3)
      };

      setSuggestedModules(prev => 
        prev.map(module => 
          module.name === moduleName 
            ? { 
                ...module, 
                status: "Completed", 
                findings: mockFindings,
                severity: mockSeverity
              }
            : module
        )
      );
      setRunningModule(null);
    }, 3000 + Math.random() * 2000);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <CheckCircleIcon className="w-5 h-5 text-green-400" />;
      case "Running":
        return <ClockIcon className="w-5 h-5 text-yellow-400 animate-pulse" />;
      case "Failed":
        return <XCircleIcon className="w-5 h-5 text-red-400" />;
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-slate-500"></div>;
    }
  };

  const getStatusBadge = (status) => {
    const classes = {
      Pending: "bg-slate-700 text-slate-300",
      Running: "bg-yellow-900 text-yellow-300",
      Completed: "bg-green-900 text-green-300",
      Failed: "bg-red-900 text-red-300"
    };
    return `px-3 py-1 rounded-full text-sm ${classes[status] || classes.Pending}`;
  };

  const getTotalFindings = () => {
    return suggestedModules.reduce((total, module) => total + module.findings, 0);
  };

  const getCompletedModules = () => {
    return suggestedModules.filter(module => module.status === "Completed").length;
  };

  const viewReport = () => {
    navigate(`/report/${scanId}`);
  };

  if (!scanContext) {
    return (
      <Layout currentPage="Loading Scan">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
            <p className="text-slate-300">Analyzing target and building scan context...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout currentPage={`Scan: ${scanContext.target}`}>
      <div className="p-6">
        {/* Scan Header */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">
                Security Scan: {scanContext.target}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-slate-400">
                <span>Scan ID: {scanId}</span>
                <span>•</span>
                <span>Profile: {scanContext.scanType}</span>
                <span>•</span>
                <span>Status: Ready</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={viewReport}
                className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition"
              >
                <EyeIcon className="w-5 h-5" />
                <span>View Report</span>
              </button>
              <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
                <DocumentArrowDownIcon className="w-5 h-5" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Scan Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Target</p>
                <p className="text-xl font-bold text-white">{scanContext.target}</p>
              </div>
              <GlobeAltIcon className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Modules Completed</p>
                <p className="text-xl font-bold text-white">{getCompletedModules()}/{suggestedModules.length}</p>
              </div>
              <CheckCircleIcon className="w-8 h-8 text-green-400" />
            </div>
          </div>
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Findings</p>
                <p className="text-xl font-bold text-white">{getTotalFindings()}</p>
              </div>
              <ExclamationTriangleIcon className="w-8 h-8 text-red-400" />
            </div>
          </div>
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Server</p>
                <p className="text-lg font-bold text-white">{scanContext.domainInfo.server}</p>
              </div>
              <ServerIcon className="w-8 h-8 text-green-400" />
            </div>
          </div>
        </div>

        {/* Suggested Modules */}
        <div className="bg-slate-800 rounded-lg border border-slate-700">
          <div className="p-6 border-b border-slate-700">
            <h2 className="text-xl font-semibold text-white">Security Modules</h2>
            <p className="text-slate-400 mt-1">Run each module to build a comprehensive security report</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {suggestedModules.map((module) => (
                <div key={module.name} className="bg-slate-700 rounded-lg p-4 border border-slate-600">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(module.status)}
                      <div>
                        <div className="flex items-center space-x-3">
                          <h3 className="text-white font-medium">{module.displayName}</h3>
                          <span className="bg-blue-900 text-blue-300 px-2 py-1 rounded text-xs">
                            {module.category}
                          </span>
                          <span className={getStatusBadge(module.status)}>
                            {module.status}
                          </span>
                        </div>
                        <p className="text-slate-400 text-sm mt-1">{module.description}</p>
                        {module.findings > 0 && (
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-slate-300">{module.findings} findings:</span>
                            {module.severity.critical > 0 && (
                              <span className="bg-red-900 text-red-300 px-2 py-1 rounded text-xs">
                                {module.severity.critical} Critical
                              </span>
                            )}
                            {module.severity.high > 0 && (
                              <span className="bg-orange-900 text-orange-300 px-2 py-1 rounded text-xs">
                                {module.severity.high} High
                              </span>
                            )}
                            {module.severity.medium > 0 && (
                              <span className="bg-yellow-900 text-yellow-300 px-2 py-1 rounded text-xs">
                                {module.severity.medium} Medium
                              </span>
                            )}
                            {module.severity.low > 0 && (
                              <span className="bg-blue-900 text-blue-300 px-2 py-1 rounded text-xs">
                                {module.severity.low} Low
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {module.status === "Pending" && (
                        <button
                          onClick={() => runModule(module.name)}
                          disabled={runningModule !== null}
                          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white px-4 py-2 rounded-lg transition"
                        >
                          <PlayIcon className="w-4 h-4" />
                          <span>Start Scan</span>
                        </button>
                      )}
                      {module.status === "Running" && (
                        <div className="flex items-center space-x-2 text-yellow-400">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-400"></div>
                          <span>Running...</span>
                        </div>
                      )}
                      {module.status === "Completed" && (
                        <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition">
                          <EyeIcon className="w-4 h-4" />
                          <span>View Results</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ScanPage;