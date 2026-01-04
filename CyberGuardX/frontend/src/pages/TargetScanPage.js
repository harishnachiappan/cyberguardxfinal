import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import {
  GlobeAltIcon,
  ServerIcon,
  PlayIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowLeftIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from "@heroicons/react/24/outline";

function TargetScanPage() {
  const { scanId } = useParams();
  const navigate = useNavigate();
  const [targetScanData, setTargetScanData] = useState(null);

  useEffect(() => {
    // Load target scan data from localStorage
    const targetScan = localStorage.getItem('targetScan');
    if (targetScan) {
      const data = JSON.parse(targetScan);
      if (data.scanId === scanId) {
        setTargetScanData(data);
      } else {
        // Scan ID doesn't match, redirect to dashboard
        navigate('/dashboard');
      }
    } else {
      // No target scan data, redirect to dashboard
      navigate('/dashboard');
    }
  }, [scanId, navigate]);

  const updateScanStatus = (moduleId, status) => {
    if (targetScanData) {
      const updatedScans = targetScanData.suggestedScans.map(scan =>
        scan.id === moduleId ? { ...scan, status } : scan
      );
      
      const updatedData = {
        ...targetScanData,
        suggestedScans: updatedScans
      };
      
      setTargetScanData(updatedData);
      localStorage.setItem('targetScan', JSON.stringify(updatedData));
    }
  };

  const startGuidedScan = (moduleId) => {
    // Navigate to guided scan for this module
    navigate(`/guided-scan/${moduleId}/${scanId}`);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-900 text-red-300';
      case 'Medium': return 'bg-yellow-900 text-yellow-300';
      case 'Low': return 'bg-blue-900 text-blue-300';
      default: return 'bg-slate-700 text-slate-300';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-900 text-green-300';
      case 'Running': return 'bg-yellow-900 text-yellow-300';
      default: return 'bg-slate-700 text-slate-300';
    }
  };

  // Expose updateScanStatus globally for GuidedScanModule to use
  window.updateTargetScanStatus = updateScanStatus;

  if (!targetScanData) {
    return (
      <AppShell pageTitle="Loading Target Analysis">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
            <p className="text-slate-300">Loading target analysis...</p>
          </div>
        </div>
      </AppShell>
    );
  }

  const completedScans = targetScanData.suggestedScans.filter(s => s.status === 'Completed').length;
  const totalScans = targetScanData.suggestedScans.length;

  return (
    <AppShell pageTitle={`Target Analysis - ${targetScanData.targetInfo.domain}`}>
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center space-x-2 text-slate-400 hover:text-white transition"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Target Information */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <GlobeAltIcon className="w-8 h-8 text-blue-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">Target Analysis</h1>
            <p className="text-slate-400">Scan ID: {scanId}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-700 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <GlobeAltIcon className="w-5 h-5 text-blue-400" />
              <span className="text-slate-300 font-medium">Domain</span>
            </div>
            <p className="text-white">{targetScanData.targetInfo.domain}</p>
          </div>

          <div className="bg-slate-700 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <ServerIcon className="w-5 h-5 text-green-400" />
              <span className="text-slate-300 font-medium">IP Address</span>
            </div>
            <p className="text-white">{targetScanData.targetInfo.ip}</p>
          </div>

          <div className="bg-slate-700 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <ServerIcon className="w-5 h-5 text-purple-400" />
              <span className="text-slate-300 font-medium">Server</span>
            </div>
            <p className="text-white text-sm">{targetScanData.targetInfo.server}</p>
          </div>

          <div className="bg-slate-700 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <ExclamationTriangleIcon className="w-5 h-5 text-yellow-400" />
              <span className="text-slate-300 font-medium">SSL Status</span>
            </div>
            <span className={`px-2 py-1 rounded text-xs ${
              targetScanData.targetInfo.ssl ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
            }`}>
              {targetScanData.targetInfo.ssl ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Scan Progress</h2>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">
              {completedScans}/{totalScans}
            </div>
            <div className="text-slate-400 text-sm">Completed</div>
          </div>
        </div>
        
        <div className="w-full bg-slate-700 rounded-full h-3">
          <div 
            className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
            style={{width: `${totalScans > 0 ? (completedScans / totalScans) * 100 : 0}%`}}
          ></div>
        </div>
      </div>

      {/* Suggested Scan List */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <div className="flex items-center space-x-3 mb-6">
          <ExclamationTriangleIcon className="w-8 h-8 text-orange-400" />
          <div>
            <h2 className="text-xl font-semibold text-white">Suggested Security Scans</h2>
            <p className="text-slate-400">Run scans in sequence for comprehensive analysis</p>
          </div>
        </div>

        <div className="space-y-3">
          {targetScanData.suggestedScans.map((scan, index) => (
            <div key={scan.id} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg border border-slate-600">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-600 text-white text-sm font-medium">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-white font-medium">{scan.name}</h3>
                  <p className="text-slate-400 text-sm">{scan.description}</p>
                  <span className="text-slate-500 text-xs">{scan.category}</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-xs ${getPriorityColor(scan.priority)}`}>
                  {scan.priority}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(scan.status)}`}>
                  {scan.status}
                </span>
                
                {scan.status === 'Pending' && (
                  <button
                    onClick={() => startGuidedScan(scan.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition font-medium flex items-center space-x-2"
                  >
                    <PlayIcon className="w-4 h-4" />
                    <span>Start</span>
                  </button>
                )}
                
                {scan.status === 'Running' && (
                  <button
                    onClick={() => startGuidedScan(scan.id)}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition font-medium flex items-center space-x-2"
                  >
                    <ClockIcon className="w-4 h-4" />
                    <span>Continue</span>
                  </button>
                )}
                
                {scan.status === 'Completed' && (
                  <button
                    onClick={() => navigate(`/report/${scanId}-${scan.id}`)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition font-medium flex items-center space-x-2"
                  >
                    <CheckCircleIcon className="w-4 h-4" />
                    <span>View Report</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {completedScans === totalScans && totalScans > 0 && (
          <div className="mt-6 p-4 bg-green-900/20 border border-green-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <CheckCircleIcon className="w-6 h-6 text-green-400" />
              <div>
                <h3 className="text-green-400 font-medium">All Scans Completed!</h3>
                <p className="text-slate-300 text-sm">Your target analysis is complete. Review the reports for detailed findings.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

export default TargetScanPage;