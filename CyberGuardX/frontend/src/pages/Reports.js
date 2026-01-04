import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import {
  DocumentTextIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  FunnelIcon
} from "@heroicons/react/24/outline";

function Reports() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  const reports = [
    {
      id: "RPT-12345",
      scanId: "CGX-12345",
      target: "example.com",
      scanType: "Full Security Scan",
      status: "Completed",
      vulnerabilities: 12,
      critical: 2,
      high: 4,
      medium: 4,
      low: 2,
      date: "2024-01-15",
      time: "14:30",
      duration: "45 min"
    },
    {
      id: "RPT-12346",
      scanId: "CGX-12346",
      target: "testsite.org",
      scanType: "SQL Injection Scan",
      status: "Completed",
      vulnerabilities: 3,
      critical: 0,
      high: 1,
      medium: 2,
      low: 0,
      date: "2024-01-15",
      time: "12:15",
      duration: "12 min"
    },
    {
      id: "RPT-12347",
      scanId: "CGX-12347",
      target: "demo.app",
      scanType: "XSS Scan",
      status: "Failed",
      vulnerabilities: 0,
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
      date: "2024-01-14",
      time: "16:45",
      duration: "N/A"
    },
    {
      id: "RPT-12348",
      scanId: "CGX-12348",
      target: "secure.net",
      scanType: "Access Control Scan",
      status: "Completed",
      vulnerabilities: 7,
      critical: 1,
      high: 2,
      medium: 3,
      low: 1,
      date: "2024-01-14",
      time: "10:20",
      duration: "28 min"
    },
    {
      id: "RPT-12349",
      scanId: "CGX-12349",
      target: "webapp.io",
      scanType: "CSRF Scan",
      status: "Completed",
      vulnerabilities: 2,
      critical: 0,
      high: 0,
      medium: 1,
      low: 1,
      date: "2024-01-13",
      time: "09:30",
      duration: "15 min"
    },
    {
      id: "RPT-12350",
      scanId: "CGX-12350",
      target: "api.service.com",
      scanType: "JWT Security Scan",
      status: "Processing",
      vulnerabilities: 0,
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
      date: "2024-01-15",
      time: "15:45",
      duration: "Running..."
    }
  ];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.scanType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || report.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <CheckCircleIcon className="w-5 h-5 text-green-400" />;
      case "Processing":
        return <ClockIcon className="w-5 h-5 text-yellow-400 animate-pulse" />;
      case "Failed":
        return <XCircleIcon className="w-5 h-5 text-red-400" />;
      default:
        return <ClockIcon className="w-5 h-5 text-slate-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-900 text-green-300";
      case "Processing":
        return "bg-yellow-900 text-yellow-300";
      case "Failed":
        return "bg-red-900 text-red-300";
      default:
        return "bg-slate-700 text-slate-300";
    }
  };

  const getSeverityColor = (severity, count) => {
    if (count === 0) return "text-slate-500";
    switch (severity) {
      case "critical":
        return "text-red-400";
      case "high":
        return "text-orange-400";
      case "medium":
        return "text-yellow-400";
      case "low":
        return "text-blue-400";
      default:
        return "text-slate-400";
    }
  };

  const viewReport = (reportId) => {
    navigate(`/report/${reportId}`);
  };

  const downloadReport = async (reportId, target) => {
    try {
      console.log(`Downloading report ${reportId} for ${target}`);
      
      // Call backend to download PDF
      const response = await fetch(`http://localhost:5000/api/reports/${reportId}/download`);
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `CyberGuardX-Report-${reportId}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        alert(`Report ${reportId} downloaded successfully!`);
      } else {
        throw new Error('Download failed');
      }
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download report. Please try again.');
    }
  };

  return (
    <AppShell pageTitle="Security Reports">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Security Reports</h1>
            <p className="text-slate-400">View and download your security scan reports</p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-slate-400">
            <DocumentTextIcon className="w-5 h-5" />
            <span>{filteredReports.length} reports</span>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search reports..."
                className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FunnelIcon className="w-4 h-4 text-slate-400" />
                <span className="text-slate-400 text-sm">Status:</span>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 focus:outline-none transition"
              >
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="processing">Processing</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {filteredReports.length > 0 ? (
            filteredReports.map((report) => (
              <div key={report.id} className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-slate-600 transition">
                <div className="flex items-start justify-between">
                  {/* Left Side - Report Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      {getStatusIcon(report.status)}
                      <div>
                        <h3 className="text-white font-semibold">{report.target}</h3>
                        <p className="text-slate-400 text-sm">{report.scanType}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-slate-400 text-xs">Report ID</p>
                        <p className="text-white font-mono text-sm">{report.id}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs">Scan ID</p>
                        <p className="text-white font-mono text-sm">{report.scanId}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CalendarIcon className="w-4 h-4 text-slate-400" />
                        <div>
                          <p className="text-slate-400 text-xs">Date</p>
                          <p className="text-white text-sm">{report.date}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs">Duration</p>
                        <p className="text-white text-sm">{report.duration}</p>
                      </div>
                    </div>

                    {/* Vulnerability Summary */}
                    {report.status === "Completed" && report.vulnerabilities > 0 && (
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="flex items-center space-x-2">
                          <ExclamationTriangleIcon className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-400">Vulnerabilities:</span>
                          <span className="text-white font-medium">{report.vulnerabilities}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className={`${getSeverityColor("critical", report.critical)}`}>
                            Critical: {report.critical}
                          </span>
                          <span className={`${getSeverityColor("high", report.high)}`}>
                            High: {report.high}
                          </span>
                          <span className={`${getSeverityColor("medium", report.medium)}`}>
                            Medium: {report.medium}
                          </span>
                          <span className={`${getSeverityColor("low", report.low)}`}>
                            Low: {report.low}
                          </span>
                        </div>
                      </div>
                    )}

                    {report.status === "Completed" && report.vulnerabilities === 0 && (
                      <div className="flex items-center space-x-2 text-sm">
                        <CheckCircleIcon className="w-4 h-4 text-green-400" />
                        <span className="text-green-400">No vulnerabilities found</span>
                      </div>
                    )}
                  </div>

                  {/* Right Side - Actions */}
                  <div className="flex items-center space-x-3 ml-6">
                    {report.status === "Completed" && (
                      <>
                        <button
                          onClick={() => viewReport(report.id)}
                          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition text-sm"
                        >
                          <EyeIcon className="w-4 h-4" />
                          <span>View</span>
                        </button>
                        <button
                          onClick={() => downloadReport(report.id, report.target)}
                          className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition text-sm"
                        >
                          <ArrowDownTrayIcon className="w-4 h-4" />
                          <span>Download</span>
                        </button>
                      </>
                    )}
                    {report.status === "Processing" && (
                      <div className="text-yellow-400 text-sm">Processing...</div>
                    )}
                    {report.status === "Failed" && (
                      <div className="text-red-400 text-sm">Scan Failed</div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-slate-800 rounded-lg p-12 border border-slate-700 text-center">
              <DocumentTextIcon className="w-16 h-16 text-slate-500 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">No Reports Found</h3>
              <p className="text-slate-400">
                {searchTerm || statusFilter !== "all" 
                  ? "No reports match your current filters." 
                  : "You haven't generated any reports yet."}
              </p>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}

export default Reports;