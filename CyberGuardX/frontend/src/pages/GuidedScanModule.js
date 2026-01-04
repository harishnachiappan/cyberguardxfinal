import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import {
  PlayIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ArrowLeftIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";

function GuidedScanModule() {
  const { module, scanId } = useParams();
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [findings, setFindings] = useState([]);
  const [targetUrl, setTargetUrl] = useState("");
  const [guidedScanData, setGuidedScanData] = useState(null);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);

  const moduleInfo = {
    'sql-injection': {
      name: 'SQL Injection Scanner',
      category: 'OWASP A03',
      description: 'Tests for SQL injection vulnerabilities in web applications',
      techniques: ['Union-based', 'Boolean-based', 'Time-based', 'Error-based']
    },
    'xss': {
      name: 'Cross-Site Scripting Scanner',
      category: 'OWASP A03',
      description: 'Detects reflected, stored, and DOM-based XSS vulnerabilities',
      techniques: ['Reflected XSS', 'Stored XSS', 'DOM XSS', 'Filter Bypass']
    },
    'csrf': {
      name: 'CSRF Protection Scanner',
      category: 'OWASP A01',
      description: 'Verifies CSRF tokens and SameSite cookie attributes',
      techniques: ['Token Validation', 'SameSite Cookies', 'Referer Checks']
    },
    'access-control': {
      name: 'Access Control Scanner',
      category: 'OWASP A01',
      description: 'Tests for broken access control and authorization issues',
      techniques: ['IDOR', 'Privilege Escalation', 'Force Browsing', 'Role Bypass']
    },
    'jwt': {
      name: 'JWT Security Scanner',
      category: 'Token Security',
      description: 'Analyzes JWT implementation for security vulnerabilities',
      techniques: ['Algorithm Confusion', 'Key Confusion', 'Token Manipulation']
    },
    'session': {
      name: 'Session Security Scanner',
      category: 'OWASP A07',
      description: 'Tests session management and cookie security',
      techniques: ['Session Fixation', 'Session Hijacking', 'Cookie Security']
    }
  };

  const currentModule = moduleInfo[module] || {
    name: 'Security Scanner',
    category: 'Security',
    description: 'Security vulnerability scanner',
    techniques: ['Vulnerability Detection']
  };

  useEffect(() => {
    // Load target scan data from localStorage
    const targetScan = localStorage.getItem('targetScan');
    if (targetScan) {
      const data = JSON.parse(targetScan);
      if (data.scanId === scanId) {
        setGuidedScanData(data);
        setTargetUrl(data.targetUrl);
        
        // Find current module index
        const moduleIndex = data.suggestedScans.findIndex(scan => scan.id === module);
        setCurrentModuleIndex(moduleIndex);
      } else {
        // Scan ID doesn't match, redirect to dashboard
        navigate('/dashboard');
      }
    } else {
      // No target scan data, redirect to dashboard
      navigate('/dashboard');
    }
  }, [module, scanId, navigate]);

  const startScan = () => {
    setIsScanning(true);
    setFindings([]);
    
    // Update status to Running
    updateScanStatus('Running');
    
    // Simulate scanning process
    setTimeout(() => {
      const mockFindings = [
        {
          id: 1,
          severity: 'High',
          title: `${currentModule.name} Vulnerability Found`,
          description: `A ${module} vulnerability was detected in the target application.`,
          endpoint: '/api/login',
          evidence: 'Payload: test OR 1=1--'
        },
        {
          id: 2,
          severity: 'Medium',
          title: 'Potential Security Issue',
          description: 'A potential security configuration issue was identified.',
          endpoint: '/admin/config',
          evidence: 'Missing security headers'
        }
      ];
      
      setFindings(mockFindings);
      setIsScanning(false);
      setScanComplete(true);
      
      // Update status to Completed
      updateScanStatus('Completed');
    }, 5000);
  };

  const updateScanStatus = (status) => {
    if (guidedScanData) {
      const updatedScans = guidedScanData.suggestedScans.map(scan =>
        scan.id === module ? { ...scan, status } : scan
      );
      
      const updatedData = {
        ...guidedScanData,
        suggestedScans: updatedScans
      };
      
      setGuidedScanData(updatedData);
      localStorage.setItem('targetScan', JSON.stringify(updatedData));
      
      // Also update via global function if available
      if (window.updateTargetScanStatus) {
        window.updateTargetScanStatus(module, status);
      }
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'bg-red-900 text-red-300';
      case 'High': return 'bg-orange-900 text-orange-300';
      case 'Medium': return 'bg-yellow-900 text-yellow-300';
      case 'Low': return 'bg-blue-900 text-blue-300';
      default: return 'bg-slate-700 text-slate-300';
    }
  };

  const backToDashboard = () => {
    navigate('/dashboard');
  };

  const continueToNext = () => {
    // Always return to target scan page after completing a scan
    navigate(`/target-scan/${scanId}`);
  };



  if (!guidedScanData) {
    return <div>Loading...</div>;
  }

  return (
    <AppShell 
      pageTitle={`Guided Scan – ${currentModule.name}`}
      scanId={scanId}>
      
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={backToDashboard}
          className="flex items-center space-x-2 text-slate-400 hover:text-white transition"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Progress Indicator */}
      <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-400 text-sm">Guided Scan Progress</span>
          <span className="text-white text-sm">
            Step {currentModuleIndex + 1} of {guidedScanData.suggestedScans.length}
          </span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
            style={{width: `${((currentModuleIndex + 1) / guidedScanData.suggestedScans.length) * 100}%`}}
          ></div>
        </div>
      </div>

      {/* Module Info */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">{currentModule.name}</h1>
            <div className="flex items-center space-x-4">
              <span className="bg-blue-900 text-blue-300 px-3 py-1 rounded-full text-sm">
                {currentModule.category}
              </span>
              <span className="text-slate-400 text-sm">
                Target: {targetUrl}
              </span>
            </div>
          </div>
          
          {!isScanning && !scanComplete && (
            <button
              onClick={startScan}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition font-medium flex items-center space-x-2"
            >
              <PlayIcon className="w-5 h-5" />
              <span>Start Scan</span>
            </button>
          )}
        </div>
        
        <p className="text-slate-300 mb-4">{currentModule.description}</p>
        
        <div>
          <h3 className="text-white font-medium mb-2">Scan Techniques:</h3>
          <div className="flex flex-wrap gap-2">
            {currentModule.techniques.map((technique, index) => (
              <span key={index} className="bg-slate-700 text-slate-300 px-3 py-1 rounded text-sm">
                {technique}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scanning Progress */}
      {isScanning && (
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 mb-6">
          <div className="flex items-center space-x-4">
            <ClockIcon className="w-8 h-8 text-yellow-400 animate-pulse" />
            <div>
              <h3 className="text-white font-medium">Scanning in Progress...</h3>
              <p className="text-slate-400">Running {currentModule.name} tests on target</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
            </div>
          </div>
        </div>
      )}

      {/* Scan Results */}
      {scanComplete && (
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center space-x-3 mb-6">
            <CheckCircleIcon className="w-8 h-8 text-green-400" />
            <div>
              <h3 className="text-white font-medium">Scan Completed</h3>
              <p className="text-slate-400">Found {findings.length} potential issues</p>
            </div>
          </div>

          {findings.length > 0 ? (
            <div className="space-y-4 mb-6">
              {findings.map((finding) => (
                <div key={finding.id} className="bg-slate-700 rounded-lg p-4 border border-slate-600">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-sm ${getSeverityColor(finding.severity)}`}>
                          {finding.severity}
                        </span>
                        <h4 className="text-white font-medium">{finding.title}</h4>
                      </div>
                      <p className="text-slate-300 text-sm mb-2">{finding.description}</p>
                      <div className="text-xs text-slate-400">
                        <span>Endpoint: {finding.endpoint}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-800 rounded p-3 mt-3">
                    <h5 className="text-white font-medium mb-1">Evidence:</h5>
                    <code className="text-slate-300 text-sm">{finding.evidence}</code>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 mb-6">
              <InformationCircleIcon className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400">No vulnerabilities found in this scan.</p>
            </div>
          )}

          <div className="flex justify-between items-center">
            <button
              onClick={backToDashboard}
              className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg transition"
            >
              Back to Dashboard
            </button>
            
            <div className="flex space-x-4">
              <button
                onClick={() => setScanComplete(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
              >
                Run Again
              </button>
              
              <button
                onClick={continueToNext}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition flex items-center space-x-2"
              >
                <span>Next</span>
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isScanning && !scanComplete && (
        <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 text-center">
          <ExclamationTriangleIcon className="w-16 h-16 text-slate-500 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">Ready to Scan</h3>
          <p className="text-slate-400 mb-6">
            Click "Start Scan" to begin {currentModule.name} testing on your target.
          </p>
        </div>
      )}
    </AppShell>
  );
}

export default GuidedScanModule;