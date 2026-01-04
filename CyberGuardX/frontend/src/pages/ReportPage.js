import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import {
  FunnelIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ChartBarIcon,
  ArrowLeftIcon
} from "@heroicons/react/24/outline";

function ReportPage() {
  const { scanId } = useParams();
  const navigate = useNavigate();
  const [reportData, setReportData] = useState(null);
  const [filterSeverity, setFilterSeverity] = useState("All");
  const [filterModule, setFilterModule] = useState("All");

  useEffect(() => {
    // Simulate loading report data
    setTimeout(() => {
      setReportData({
        scanId,
        target: "example.com",
        completedAt: new Date().toISOString(),
        duration: "5m 32s",
        profile: "Full OWASP Audit",
        summary: {
          totalFindings: 23,
          critical: 2,
          high: 7,
          medium: 9,
          low: 5,
          riskScore: 8.2
        },
        owaspDistribution: {
          A01: 5, A02: 1, A03: 8, A04: 0, A05: 3,
          A06: 2, A07: 2, A08: 0, A09: 1, A10: 1
        },
        findings: [
          {
            id: 1,
            module: "xss",
            moduleName: "Cross-Site Scripting",
            owaspCategory: "A03",
            severity: "Critical",
            title: "Stored XSS in User Profile",
            description: "User input in the profile description field is not properly sanitized, allowing stored XSS attacks.",
            endpoint: "/api/profile/update",
            method: "POST",
            evidence: {
              request: "POST /api/profile/update\nContent-Type: application/json\n\n{\"description\":\"<script>alert('XSS')</script>\"}",
              response: "HTTP/1.1 200 OK\n{\"success\":true,\"message\":\"Profile updated\"}",
              payload: "<script>alert('XSS')</script>"
            },
            recommendation: "Implement proper input validation and output encoding. Use Content Security Policy (CSP) headers.",
            cwe: "CWE-79",
            cvss: 8.8
          },
          {
            id: 2,
            module: "sql_injection",
            moduleName: "SQL Injection",
            owaspCategory: "A03",
            severity: "High",
            title: "SQL Injection in Login Form",
            description: "The login endpoint is vulnerable to SQL injection attacks through the username parameter.",
            endpoint: "/api/auth/login",
            method: "POST",
            evidence: {
              request: "POST /api/auth/login\n{\"username\":\"admin' OR '1'='1\",\"password\":\"test\"}",
              response: "HTTP/1.1 200 OK\n{\"token\":\"jwt_token_here\"}",
              payload: "admin' OR '1'='1"
            },
            recommendation: "Use parameterized queries or prepared statements. Implement proper input validation.",
            cwe: "CWE-89",
            cvss: 7.5
          },
          {
            id: 3,
            module: "access_control",
            moduleName: "Access Control",
            owaspCategory: "A01",
            severity: "High",
            title: "Insecure Direct Object Reference",
            description: "Users can access other users' data by manipulating the user ID parameter.",
            endpoint: "/api/users/{id}",
            method: "GET",
            evidence: {
              request: "GET /api/users/123\nAuthorization: Bearer user_token",
              response: "HTTP/1.1 200 OK\n{\"id\":123,\"email\":\"admin@example.com\"}",
              payload: "Modified user ID from 456 to 123"
            },
            recommendation: "Implement proper authorization checks. Validate user permissions before data access.",
            cwe: "CWE-639",
            cvss: 7.1
          }
        ]
      });
    }, 1000);
  }, [scanId]);

  const getSeverityColor = (severity) => {
    const colors = {
      Critical: "text-red-400 bg-red-900",
      High: "text-orange-400 bg-orange-900",
      Medium: "text-yellow-400 bg-yellow-900",
      Low: "text-blue-400 bg-blue-900",
      Info: "text-slate-400 bg-slate-700"
    };
    return colors[severity] || colors.Info;
  };

  const getOwaspName = (category) => {
    const names = {
      A01: "Broken Access Control",
      A02: "Cryptographic Failures",
      A03: "Injection",
      A04: "Insecure Design",
      A05: "Security Misconfiguration",
      A06: "Vulnerable Components",
      A07: "Authentication Failures",
      A08: "Data Integrity Failures",
      A09: "Logging Failures",
      A10: "SSRF"
    };
    return names[category] || category;
  };

  const filteredFindings = reportData?.findings.filter(finding => {
    const severityMatch = filterSeverity === "All" || finding.severity === filterSeverity;
    const moduleMatch = filterModule === "All" || finding.module === filterModule;
    return severityMatch && moduleMatch;
  }) || [];

  const uniqueModules = [...new Set(reportData?.findings.map(f => f.moduleName) || [])];

  if (!reportData) {
    return (
      <AppShell pageTitle="Loading Report">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
            <p className="text-slate-300">Loading security report...</p>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell 
      pageTitle={`Report: ${reportData.target}`}
      scanId={scanId}
      onExportPdf={() => console.log('Export PDF')}
    >
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/reports')}
          className="flex items-center space-x-2 text-slate-400 hover:text-white transition"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Back to Reports</span>
        </button>
      </div>

      <div className="w-full space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Risk Score</p>
              <p className="text-3xl font-bold text-red-400">{reportData.summary.riskScore}/10</p>
            </div>
            <ExclamationTriangleIcon className="w-8 h-8 text-red-400" />
          </div>
        </div>
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="text-center">
            <p className="text-slate-400 text-sm">Critical</p>
            <p className="text-2xl font-bold text-red-400">{reportData.summary.critical}</p>
          </div>
        </div>
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="text-center">
            <p className="text-slate-400 text-sm">High</p>
            <p className="text-2xl font-bold text-orange-400">{reportData.summary.high}</p>
          </div>
        </div>
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="text-center">
            <p className="text-slate-400 text-sm">Medium</p>
            <p className="text-2xl font-bold text-yellow-400">{reportData.summary.medium}</p>
          </div>
        </div>
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="text-center">
            <p className="text-slate-400 text-sm">Low</p>
            <p className="text-2xl font-bold text-blue-400">{reportData.summary.low}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* OWASP Top 10 Distribution */}
        <div className="lg:col-span-2 bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
            <ChartBarIcon className="w-6 h-6" />
            <span>OWASP Top 10 Distribution</span>
          </h2>
          <div className="space-y-3">
            {Object.entries(reportData.owaspDistribution).map(([category, count]) => (
              <div key={category} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-blue-400 font-mono text-sm w-8">{category}</span>
                  <span className="text-slate-300 text-sm">{getOwaspName(category)}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(count / Math.max(...Object.values(reportData.owaspDistribution))) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-white text-sm w-6">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scan Details */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h2 className="text-xl font-semibold text-white mb-4">Scan Details</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-400">Target</span>
              <span className="text-white">{reportData.target}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Profile</span>
              <span className="text-white">{reportData.profile}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Duration</span>
              <span className="text-white">{reportData.duration}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Total Findings</span>
              <span className="text-white">{reportData.summary.totalFindings}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Scan ID</span>
              <span className="text-white font-mono text-sm">{scanId}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Findings Table */}
      <div className="bg-slate-800 rounded-lg border border-slate-700">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Security Findings</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FunnelIcon className="w-5 h-5 text-slate-400" />
                <select
                  value={filterSeverity}
                  onChange={(e) => setFilterSeverity(e.target.value)}
                  className="bg-slate-700 border border-slate-600 rounded px-3 py-1 text-white text-sm"
                >
                  <option>All</option>
                  <option>Critical</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
              <select
                value={filterModule}
                onChange={(e) => setFilterModule(e.target.value)}
                className="bg-slate-700 border border-slate-600 rounded px-3 py-1 text-white text-sm"
              >
                <option>All</option>
                {uniqueModules.map(module => (
                  <option key={module}>{module}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {filteredFindings.map((finding) => (
              <div key={finding.id} className="bg-slate-700 rounded-lg p-4 border border-slate-600">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-4">
                    <div className="flex flex-col items-center space-y-2">
                      <span className={`px-3 py-1 rounded-full text-sm ${getSeverityColor(finding.severity)}`}>
                        {finding.severity}
                      </span>
                      <span className="bg-blue-900 text-blue-300 px-2 py-1 rounded text-xs">
                        {finding.owaspCategory}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium text-lg">{finding.title}</h3>
                      <p className="text-slate-400 text-sm mt-1">{finding.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm">
                        <span className="text-slate-300">
                          <span className="text-slate-500">Module:</span> {finding.moduleName}
                        </span>
                        <span className="text-slate-300">
                          <span className="text-slate-500">Endpoint:</span> {finding.endpoint}
                        </span>
                        <span className="text-slate-300">
                          <span className="text-slate-500">CVSS:</span> {finding.cvss}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h4 className="text-white font-medium mb-2">Evidence</h4>
                    <div className="bg-slate-800 rounded p-3">
                      <pre className="text-slate-300 text-xs overflow-x-auto">
                        {finding.evidence.request}
                      </pre>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">Recommendation</h4>
                    <div className="bg-slate-800 rounded p-3">
                      <p className="text-slate-300 text-sm">{finding.recommendation}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs">
                          {finding.cwe}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredFindings.length === 0 && (
            <div className="text-center py-12">
              <InformationCircleIcon className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400">No findings match the selected filters.</p>
            </div>
          )}
        </div>
      </div>
      </div>
    </AppShell>
  );
}

export default ReportPage;