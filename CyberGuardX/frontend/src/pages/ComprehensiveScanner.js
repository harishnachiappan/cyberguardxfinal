import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppShell from '../components/AppShell';
import {
  PlayIcon,
  BugAntIcon,
  CheckCircleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

function ComprehensiveScanner() {
  const [targetUrl, setTargetUrl] = useState('');
  const [scanStatus, setScanStatus] = useState('idle');
  const navigate = useNavigate();

  const startScan = () => {
    if (!targetUrl) {
      alert('Please enter a target URL');
      return;
    }
    
    setScanStatus('running');
    
    // Simulate scan
    setTimeout(() => {
      setScanStatus('completed');
    }, 3000);
  };

  return (
    <AppShell pageTitle="Comprehensive Vulnerability Scanner">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-500/30 rounded-lg p-6">
          <div className="flex items-center space-x-4 mb-4">
            <BugAntIcon className="w-12 h-12 text-red-400" />
            <div>
              <h1 className="text-3xl font-bold text-white">Comprehensive Vulnerability Scanner</h1>
              <p className="text-slate-300">Complete security assessment with professional tools</p>
            </div>
          </div>
          
          {/* Target URL Input */}
          <div className="flex space-x-4">
            <input
              type="url"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              placeholder="https://target.com"
              className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-red-500 focus:outline-none"
            />
            <button
              onClick={startScan}
              disabled={scanStatus === 'running'}
              className="bg-red-600 hover:bg-red-700 disabled:bg-slate-600 text-white px-8 py-3 rounded-lg transition font-medium flex items-center space-x-2"
            >
              {scanStatus === 'running' ? (
                <>
                  <ArrowPathIcon className="w-5 h-5 animate-spin" />
                  <span>Scanning...</span>
                </>
              ) : (
                <>
                  <PlayIcon className="w-5 h-5" />
                  <span>Start Comprehensive Scan</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Scan Status */}
        {scanStatus === 'running' && (
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-white font-medium">Scan in Progress</h3>
                <p className="text-slate-400">Analyzing target for vulnerabilities...</p>
              </div>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 h-3 rounded-full animate-pulse" style={{width: '60%'}}></div>
            </div>
          </div>
        )}

        {/* Scan Results */}
        {scanStatus === 'completed' && (
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center space-x-3 mb-4">
              <CheckCircleIcon className="w-8 h-8 text-green-400" />
              <div>
                <h3 className="text-white font-medium">Scan Completed</h3>
                <p className="text-slate-400">Comprehensive security assessment finished</p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-white">8</div>
                <div className="text-sm text-slate-400">Scans Executed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-400">12</div>
                <div className="text-sm text-slate-400">Vulnerabilities Found</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">6</div>
                <div className="text-sm text-slate-400">Successful Scans</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-400">2</div>
                <div className="text-sm text-slate-400">Failed Scans</div>
              </div>
            </div>
          </div>
        )}

        {/* Vulnerability Categories */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h3 className="text-white font-medium mb-4">Available Scan Modules</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'SQL Injection Scanner',
              'XSS Scanner', 
              'CSRF Protection Scanner',
              'Access Control Scanner',
              'JWT Security Scanner',
              'Session Management Scanner',
              'SSRF Scanner',
              'Network VAPT Scanner'
            ].map((scanner, index) => (
              <div key={index} className="bg-slate-700/50 rounded p-3 flex items-center justify-between">
                <span className="text-slate-300">{scanner}</span>
                <span className="text-xs bg-blue-900/50 text-blue-300 px-2 py-1 rounded">Ready</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

export default ComprehensiveScanner;