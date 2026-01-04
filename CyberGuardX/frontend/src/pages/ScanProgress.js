import React from "react";
import { useNavigate } from "react-router-dom";
import { useScan } from "../context/ScanContext";
import AppShell from "../components/AppShell";
import {
  CheckCircleIcon,
  ClockIcon,
  PlayIcon,
  ExclamationTriangleIcon,
  GlobeAltIcon,
  ServerIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";

function ScanProgress() {
  const { scanState } = useScan();
  const navigate = useNavigate();

  if (!scanState.isGuidedFlow) {
    navigate('/dashboard');
    return null;
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <CheckCircleIcon className="w-5 h-5 text-green-400" />;
      case 'Running':
        return <ClockIcon className="w-5 h-5 text-yellow-400 animate-pulse" />;
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-slate-500"></div>;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-900 text-green-300';
      case 'Running':
        return 'bg-yellow-900 text-yellow-300';
      default:
        return 'bg-slate-700 text-slate-300';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-900 text-red-300';
      case 'Medium': return 'bg-yellow-900 text-yellow-300';
      case 'Low': return 'bg-blue-900 text-blue-300';
      default: return 'bg-slate-700 text-slate-300';
    }
  };

  const startScan = (moduleId) => {
    navigate(`/scan/${moduleId}/${scanState.scanId}`);
  };

  const completedCount = scanState.suggestedScans.filter(scan => scan.status === 'Completed').length;
  const totalCount = scanState.suggestedScans.length;

  return (
    <AppShell pageTitle="Scan Progress">
      <div className="w-full space-y-6">
        {/* Progress Header */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Security Scan Progress</h1>
              <p className="text-slate-400">Target: {scanState.targetInfo?.domain}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{completedCount}/{totalCount}</div>
              <div className="text-slate-400 text-sm">Scans Completed</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-700 rounded-full h-3 mb-4">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
              style={{width: `${(completedCount / totalCount) * 100}%`}}
            ></div>
          </div>

          {/* Target Info Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <GlobeAltIcon className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-slate-400 text-sm">Domain</p>
                <p className="text-white">{scanState.targetInfo?.domain}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <ServerIcon className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-slate-400 text-sm">IP Address</p>
                <p className="text-white">{scanState.targetInfo?.ip}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-blue-600 rounded"></div>
              <div>
                <p className="text-slate-400 text-sm">Scan ID</p>
                <p className="text-white font-mono">{scanState.scanId}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scan Modules List */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h2 className="text-xl font-semibold text-white mb-6">Security Scan Modules</h2>
          
          <div className="space-y-4">
            {scanState.suggestedScans.map((scan, index) => (
              <div key={scan.id} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg border border-slate-600">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-600 text-white text-sm font-medium">
                    {index + 1}
                  </div>
                  {getStatusIcon(scan.status)}
                  <div>
                    <h3 className="text-white font-medium">{scan.name}</h3>
                    <p className="text-slate-400 text-sm">{scan.description || scan.category}</p>
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
                      onClick={() => startScan(scan.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition font-medium flex items-center space-x-2"
                    >
                      <PlayIcon className="w-4 h-4" />
                      <span>Start</span>
                    </button>
                  )}
                  
                  {scan.status === 'Running' && (
                    <button
                      onClick={() => startScan(scan.id)}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition font-medium flex items-center space-x-2"
                    >
                      <ClockIcon className="w-4 h-4" />
                      <span>Continue</span>
                    </button>
                  )}
                  
                  {scan.status === 'Completed' && (
                    <button
                      onClick={() => navigate(`/report/${scanState.scanId}-${scan.id}`)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition font-medium flex items-center space-x-2"
                    >
                      <span>View Report</span>
                      <ArrowRightIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg transition"
            >
              Back to Dashboard
            </button>
            
            {completedCount === totalCount && (
              <button
                onClick={() => navigate(`/report/${scanState.scanId}`)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition flex items-center space-x-2"
              >
                <span>View Complete Report</span>
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

export default ScanProgress;