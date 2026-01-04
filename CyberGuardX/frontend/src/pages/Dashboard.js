import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import {
  GlobeAltIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  PlayIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  DocumentTextIcon,
  ServerIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  ArrowTrendingUpIcon
} from "@heroicons/react/24/outline";

function Dashboard() {
  const [targetUrl, setTargetUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestedScans, setSuggestedScans] = useState([]);
  const [currentScanId, setCurrentScanId] = useState(null);
  const [targetInfo, setTargetInfo] = useState(null);
  const navigate = useNavigate();

  const [userStats, setUserStats] = useState({
    totalScans: 0,
    totalVulnerabilities: 0,
    criticalCount: 0,
    highCount: 0,
    mediumCount: 0,
    lowCount: 0
  });
  const [recentScans, setRecentScans] = useState([]);

  const owaspTop10 = [
    { name: "Broken Access Control", count: 23, percentage: 35 },
    { name: "Cryptographic Failures", count: 18, percentage: 28 },
    { name: "Injection", count: 15, percentage: 23 },
    { name: "Insecure Design", count: 9, percentage: 14 }
  ];

  useEffect(() => {
    // Load user-specific data
    const loadUserData = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');
        
        if (authToken && userData) {
          const user = JSON.parse(userData);
          
          // Fetch user's scans
          const scansResponse = await fetch(`/api/scans/user/${user.id}`, {
            headers: { 'Authorization': `Bearer ${authToken}` }
          });
          
          if (scansResponse.ok) {
            const userScans = await scansResponse.json();
            setRecentScans(userScans.slice(0, 6)); // Show last 6 scans
            
            // Calculate stats from user's actual scans
            const stats = {
              totalScans: userScans.length,
              totalVulnerabilities: userScans.reduce((sum, scan) => sum + ((scan.vulnerabilities && scan.vulnerabilities.length) || 0), 0),
              criticalCount: 0,
              highCount: 0,
              mediumCount: 0,
              lowCount: 0
            };
            
            // Count vulnerabilities by severity
            userScans.forEach(scan => {
              if (scan.vulnerabilities && Array.isArray(scan.vulnerabilities)) {
                scan.vulnerabilities.forEach(vuln => {
                  switch(vuln.severity) {
                    case 'Critical': stats.criticalCount++; break;
                    case 'High': stats.highCount++; break;
                    case 'Medium': stats.mediumCount++; break;
                    case 'Low': stats.lowCount++; break;
                  }
                });
              }
            });
            
            setUserStats(stats);
          }
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        // Keep default empty stats for new users
      }
    };
    
    loadUserData();
    
    // Load any existing target scan data for display
    const targetScan = localStorage.getItem('targetScan');
    if (targetScan) {
      const data = JSON.parse(targetScan);
      setCurrentScanId(data.scanId);
      setTargetInfo(data.targetInfo);
      setSuggestedScans(data.suggestedScans);
      setTargetUrl(data.targetUrl);
    }
  }, []);

  const handleAnalyzeAndSuggest = async () => {
    if (!targetUrl) return;
    
    // Validate URL format
    try {
      new URL(targetUrl);
    } catch (error) {
      alert('Please enter a valid URL (e.g., https://example.com)');
      return;
    }
    
    setIsAnalyzing(true);
    
    // Simulate backend analysis
    setTimeout(() => {
      const scanId = `CGX-${Date.now().toString().slice(-5)}`;
      
      const targetInfoData = {
        domain: targetUrl.replace(/^https?:\/\//, '').replace(/\/$/, ''),
        ip: "192.168.1.100",
        server: "Apache/2.4.41 (Ubuntu)",
        ssl: targetUrl.startsWith('https'),
        country: "United States",
        responseTime: "245ms"
      };
      
      const suggestedScansData = [
        { id: "sql-injection", name: "SQL Injection Scanner", priority: "High", category: "OWASP A03", description: "Tests for SQL injection vulnerabilities", status: "Pending" },
        { id: "xss", name: "Cross-Site Scripting Scanner", priority: "High", category: "OWASP A03", description: "Detects XSS vulnerabilities", status: "Pending" },
        { id: "csrf", name: "CSRF Protection Scanner", priority: "Medium", category: "OWASP A01", description: "Verifies CSRF tokens", status: "Pending" },
        { id: "access-control", name: "Access Control Scanner", priority: "High", category: "OWASP A01", description: "Tests authorization issues", status: "Pending" },
        { id: "jwt", name: "JWT Security Scanner", priority: "Medium", category: "Token Security", description: "Analyzes JWT implementation", status: "Pending" },
        { id: "session", name: "Session Security Scanner", priority: "Medium", category: "OWASP A07", description: "Tests session management", status: "Pending" }
      ];
      
      // Store in localStorage for persistence
      localStorage.setItem('targetScan', JSON.stringify({
        scanId,
        targetUrl,
        targetInfo: targetInfoData,
        suggestedScans: suggestedScansData
      }));
      
      setIsAnalyzing(false);
      
      // Navigate to dedicated Target Analysis page
      navigate(`/target-scan/${scanId}`);
    }, 2000);
  };

  const startScan = (moduleId) => {
    // Navigate to view the target scan page instead of starting scan directly
    navigate(`/target-scan/${currentScanId}`);
  };

  const updateScanStatus = (moduleId, status) => {
    // This function is no longer needed as status updates happen on TargetScanPage
    console.log(`Scan ${moduleId} status updated to ${status}`);
  };

  const viewReport = (scanId) => {
    navigate(`/report/${scanId}`);
  };

  // Remove global function exposure since it's handled by TargetScanPage
  // window.updateScanStatus = updateScanStatus;

  return (
    <AppShell pageTitle="Dashboard">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Scans</p>
              <p className="text-3xl font-bold text-white">{userStats.totalScans}</p>
            </div>
            <ChartBarIcon className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Vulnerabilities</p>
              <p className="text-3xl font-bold text-white">{userStats.totalVulnerabilities}</p>
            </div>
            <ExclamationTriangleIcon className="w-8 h-8 text-red-400" />
          </div>
        </div>
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Critical Issues</p>
              <p className="text-3xl font-bold text-red-400">{userStats.criticalCount}</p>
            </div>
            <div className="flex space-x-1">
              <div className="w-2 h-8 bg-red-500 rounded"></div>
              <div className="w-2 h-6 bg-orange-500 rounded"></div>
              <div className="w-2 h-4 bg-yellow-500 rounded"></div>
              <div className="w-2 h-2 bg-blue-500 rounded"></div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Open Issues</p>
              <p className="text-3xl font-bold text-orange-400">{userStats.highCount}</p>
            </div>
            <ShieldCheckIcon className="w-8 h-8 text-orange-400" />
          </div>
        </div>
      </div>

      {/* Current Scan Progress - Show if exists but redirect to target scan page */}
      {suggestedScans.length > 0 && (
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-white">Active Target Analysis</h2>
              <p className="text-slate-400">Target: {targetInfo?.domain} (Scan ID: {currentScanId})</p>
            </div>
            <button
              onClick={() => navigate(`/target-scan/${currentScanId}`)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition font-medium"
            >
              Continue Analysis
            </button>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-2">
              {suggestedScans.filter(s => s.status === 'Completed').length}/{suggestedScans.length}
            </div>
            <div className="text-slate-400 text-sm">Scans Completed</div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Target Analysis Card */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">Start Security Analysis</h2>
            <p className="text-slate-300 mb-6">
              Enter your target URL to begin guided security scanning
            </p>
            
            <div className="flex space-x-4 mb-4">
              <input
                type="url"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                placeholder="https://example.com"
                className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
              />
              <button
                onClick={handleAnalyzeAndSuggest}
                disabled={!targetUrl || isAnalyzing}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white px-6 py-3 rounded-lg transition font-medium flex items-center space-x-2"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <GlobeAltIcon className="w-5 h-5" />
                    <span>Analyze & Start Scans</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="text-center">
              <p className="text-blue-400 hover:text-blue-300 text-sm transition cursor-pointer"
                 onClick={() => navigate('/target-analysis')}>
                Advanced Target Analysis (Optional) →
              </p>
            </div>
          </div>

          {/* OWASP Top 10 Distribution */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">OWASP Top 10 Distribution</h3>
            <div className="space-y-4">
              {owaspTop10.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white text-sm">{item.name}</span>
                      <span className="text-slate-400 text-sm">{item.count} issues</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full" 
                        style={{width: `${item.percentage}%`}}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Scans */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Recent Scans</h3>
            <ArrowTrendingUpIcon className="w-5 h-5 text-blue-400" />
          </div>
          <div className="space-y-3">
              {recentScans.length > 0 ? recentScans.map((scan) => (
                <div key={scan.id || scan._id} className="p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition cursor-pointer"
                     onClick={() => viewReport(scan.id || scan._id)}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {scan.status === "Completed" && <CheckCircleIcon className="w-4 h-4 text-green-400" />}
                      {scan.status === "Running" && <ClockIcon className="w-4 h-4 text-yellow-400 animate-pulse" />}
                      {scan.status === "Failed" && <XCircleIcon className="w-4 h-4 text-red-400" />}
                      <span className="text-white font-medium text-sm">{scan.targetUrl || scan.target}</span>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      scan.status === "completed" || scan.status === "Completed" ? "bg-green-900 text-green-300" :
                      scan.status === "running" || scan.status === "Running" ? "bg-yellow-900 text-yellow-300" :
                      "bg-red-900 text-red-300"
                    }`}>
                      {scan.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">{scan.scanId || scan.id}</span>
                    <span className="text-slate-400">{new Date(scan.createdAt || scan.date).toLocaleDateString()}</span>
                  </div>
                  {(scan.vulnerabilities && scan.vulnerabilities.length > 0) && (
                    <div className="mt-2">
                      <span className="bg-red-900 text-red-300 px-2 py-1 rounded text-xs">
                        {scan.vulnerabilities.length} issues
                      </span>
                    </div>
                  )}
                </div>
              )) : (
                <div className="text-center py-8 text-slate-400">
                  <p>No scans yet</p>
                  <p className="text-sm mt-1">Start your first security scan above</p>
                </div>
              )}}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-700">
            <button
              onClick={() => navigate('/reports')}
              className="w-full text-blue-400 hover:text-blue-300 text-sm transition flex items-center justify-center space-x-1"
            >
              <span>View All Reports</span>
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

export default Dashboard;