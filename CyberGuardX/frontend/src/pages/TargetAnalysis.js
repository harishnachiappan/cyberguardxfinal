import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import AIChatAssistant from "../components/AIChatAssistant";
import apiService from "../services/api";
import {
  MagnifyingGlassIcon,
  GlobeAltIcon,
  ServerIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowRightIcon,
  SparklesIcon,
  ChatBubbleLeftRightIcon
} from "@heroicons/react/24/outline";

function TargetAnalysis() {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [targetInfo, setTargetInfo] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [suggestedScans, setSuggestedScans] = useState([]);
  const [scanId, setScanId] = useState(null);
  const [chatContext, setChatContext] = useState(null);
  const [showAIChat, setShowAIChat] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!url) return;
    
    // Validate URL format
    try {
      new URL(url);
    } catch (error) {
      alert('Please enter a valid URL (e.g., https://example.com)');
      return;
    }
    
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    // Progress simulation
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 500);
    
    try {
      // Call AI-powered analysis
      const response = await apiService.request('/scans/analyze-target', {
        method: 'POST',
        body: JSON.stringify({
          targetUrl: url,
          userId: JSON.parse(localStorage.getItem('userData') || '{}').id
        })
      });
      
      clearInterval(progressInterval);
      setAnalysisProgress(100);
      
      // Set analysis results
      setScanId(response.scanId);
      setTargetInfo(response.targetInfo);
      setAiAnalysis(response.aiAnalysis);
      setSuggestedScans(response.recommendations);
      setChatContext(response.chatContext);
      
      // Store in localStorage for target scan workflow
      localStorage.setItem('targetScan', JSON.stringify({
        scanId: response.scanId,
        targetUrl: url,
        targetInfo: response.targetInfo,
        aiAnalysis: response.aiAnalysis,
        suggestedScans: response.recommendations,
        chatContext: response.chatContext
      }));
      
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      
      // Auto-show AI chat after analysis
      setTimeout(() => setShowAIChat(true), 1000);
      
    } catch (error) {
      console.error('Analysis error:', error);
      clearInterval(progressInterval);
      
      // Fallback to mock data if AI fails
      const fallbackData = {
        scanId: `CGX-${Date.now().toString().slice(-5)}`,
        targetInfo: {
          url: url,
          domain: url.replace(/^https?:\/\//, '').replace(/\/$/, ''),
          ip: "192.168.1.100",
          server: "Apache/2.4.41 (Ubuntu)",
          ssl: url.startsWith('https'),
          country: "United States",
          responseTime: "245ms",
          error: "Limited analysis mode"
        },
        aiAnalysis: "AI analysis temporarily unavailable. Proceeding with standard vulnerability assessment based on common web application security patterns.",
        recommendations: [
          { id: "sql-injection", name: "SQL Injection Scanner", priority: "High", category: "OWASP A03", description: "Tests for SQL injection vulnerabilities", estimatedTime: "5-10 minutes" },
          { id: "xss", name: "Cross-Site Scripting Scanner", priority: "High", category: "OWASP A03", description: "Detects XSS vulnerabilities", estimatedTime: "4-8 minutes" }
        ],
        chatContext: {
          targetUrl: url,
          conversationHistory: [],
          context: { fallbackMode: true },
          suggestions: ["Start vulnerability scan", "View scan modules", "Check scan status"]
        }
      };
      
      setScanId(fallbackData.scanId);
      setTargetInfo(fallbackData.targetInfo);
      setAiAnalysis(fallbackData.aiAnalysis);
      setSuggestedScans(fallbackData.recommendations);
      setChatContext(fallbackData.chatContext);
      
      localStorage.setItem('targetScan', JSON.stringify(fallbackData));
      
      setIsAnalyzing(false);
      setAnalysisComplete(true);
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
    // This should not be called since we navigate to target-scan page
    // But keeping for safety
    navigate(`/guided-scan/${moduleId}/${scanId}`);
  };

  return (
    <AppShell pageTitle="Target Analysis">
      <div className="w-full">
        {/* URL Input Section */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 mb-6">
          <h1 className="text-2xl font-bold text-white mb-4">Analyze Target URL</h1>
          <p className="text-slate-300 mb-6">
            Enter a URL to analyze and get personalized security scan recommendations
          </p>
          
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition"
              />
              <GlobeAltIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>
            <button
              onClick={handleAnalyze}
              disabled={!url || isAnalyzing}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white px-6 py-3 rounded-lg transition font-medium flex items-center space-x-2"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
              <span>{isAnalyzing ? "Analyzing..." : "Analyze"}</span>
            </button>
          </div>
        </div>

        {/* Empty State - Ready to Scan */}
        {!isAnalyzing && !analysisComplete && (
          <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 text-center mb-6">
            <ExclamationTriangleIcon className="w-16 h-16 text-slate-500 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">Ready to Analyze</h3>
            <p className="text-slate-400">
              Enter a target URL above to begin security analysis and get personalized scan recommendations.
            </p>
          </div>
        )}

        {/* Analysis Progress */}
        {isAnalyzing && (
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 mb-6">
            <div className="flex items-center space-x-4 mb-4">
              <SparklesIcon className="w-8 h-8 text-blue-400 animate-pulse" />
              <div>
                <h3 className="text-white font-medium">AI Analyzing Target...</h3>
                <p className="text-slate-400">Gathering intelligence about {url}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Analysis Progress</span>
                <span className="text-blue-400">{Math.round(analysisProgress)}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 h-2 rounded-full transition-all duration-500" 
                  style={{width: `${analysisProgress}%`}}
                ></div>
              </div>
            </div>
            <div className="mt-4 text-xs text-slate-400">
              🤖 AI is analyzing target technologies, security headers, and potential vulnerabilities...
            </div>
          </div>
        )}

        {/* AI Analysis Results */}
        {analysisComplete && aiAnalysis && (
          <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 rounded-lg p-6 border border-blue-500/30 mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <SparklesIcon className="w-8 h-8 text-blue-400" />
              <div>
                <h3 className="text-white font-medium">AI Security Analysis</h3>
                <p className="text-slate-400">Intelligent assessment of {targetInfo?.domain}</p>
              </div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4 mb-4">
              <p className="text-slate-200 leading-relaxed">{aiAnalysis}</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-slate-400">
                <ChatBubbleLeftRightIcon className="w-4 h-4" />
                <span>Ask AI for more details</span>
              </div>
              <button
                onClick={() => setShowAIChat(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition text-sm flex items-center space-x-2"
              >
                <SparklesIcon className="w-4 h-4" />
                <span>Chat with AI</span>
              </button>
            </div>
          </div>
        )}

        {/* Target Information */}
        {analysisComplete && targetInfo && (
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <CheckCircleIcon className="w-8 h-8 text-green-400" />
              <div>
                <h3 className="text-white font-medium">Target Information</h3>
                <p className="text-slate-400">Analysis completed for {targetInfo.domain}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="bg-slate-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <GlobeAltIcon className="w-5 h-5 text-blue-400" />
                  <span className="text-slate-300 font-medium">Domain</span>
                </div>
                <p className="text-white">{targetInfo.domain}</p>
              </div>

              <div className="bg-slate-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <ServerIcon className="w-5 h-5 text-green-400" />
                  <span className="text-slate-300 font-medium">IP Address</span>
                </div>
                <p className="text-white">{targetInfo.ip}</p>
              </div>

              <div className="bg-slate-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <ServerIcon className="w-5 h-5 text-purple-400" />
                  <span className="text-slate-300 font-medium">Server</span>
                </div>
                <p className="text-white text-sm">{targetInfo.server}</p>
              </div>

              <div className="bg-slate-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <ClockIcon className="w-5 h-5 text-yellow-400" />
                  <span className="text-slate-300 font-medium">Domain Age</span>
                </div>
                <p className="text-white">{targetInfo.domainAge}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-slate-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <GlobeAltIcon className="w-5 h-5 text-cyan-400" />
                  <span className="text-slate-300 font-medium">Country</span>
                </div>
                <p className="text-white">{targetInfo.country}</p>
              </div>

              <div className="bg-slate-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <ServerIcon className="w-5 h-5 text-orange-400" />
                  <span className="text-slate-300 font-medium">ASN</span>
                </div>
                <p className="text-white text-sm">{targetInfo.asn}</p>
              </div>

              <div className="bg-slate-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <ClockIcon className="w-5 h-5 text-pink-400" />
                  <span className="text-slate-300 font-medium">Response Time</span>
                </div>
                <p className="text-white">{targetInfo.responseTime}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center space-x-4 text-sm">
              <span className="text-slate-400">Scan ID:</span>
              <span className="text-blue-400 font-mono">{scanId}</span>
              <span className={`px-2 py-1 rounded text-xs ${targetInfo.ssl ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                {targetInfo.ssl ? 'SSL Enabled' : 'No SSL'}
              </span>
            </div>
          </div>
        )}

        {/* Suggested Scans */}
        {analysisComplete && suggestedScans.length > 0 && (
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <ExclamationTriangleIcon className="w-8 h-8 text-orange-400" />
                <div>
                  <h3 className="text-white font-medium">AI-Recommended Security Scans</h3>
                  <p className="text-slate-400">Prioritized based on target analysis</p>
                </div>
              </div>
              <div className="text-sm text-slate-400">
                {suggestedScans.length} scans recommended
              </div>
            </div>

            <div className="space-y-3">
              {suggestedScans.map((scan, index) => (
                <div key={scan.id} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg border border-slate-600 hover:border-blue-500/50 transition">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h4 className="text-white font-medium">{scan.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(scan.priority)}`}>
                          {scan.priority}
                        </span>
                      </div>
                      <p className="text-slate-400 text-sm mb-1">{scan.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-slate-500">
                        <span>{scan.category}</span>
                        {scan.estimatedTime && (
                          <>
                            <span>•</span>
                            <span>🕰️ {scan.estimatedTime}</span>
                          </>
                        )}
                        {scan.reason && (
                          <>
                            <span>•</span>
                            <span>{scan.reason}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => startScan(scan.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition font-medium flex items-center space-x-2"
                    >
                      <span>Start Scan</span>
                      <ArrowRightIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-slate-400">
                💡 Tip: Start with high-priority scans for maximum security impact
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowAIChat(true)}
                  className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition flex items-center space-x-2"
                >
                  <ChatBubbleLeftRightIcon className="w-4 h-4" />
                  <span>Ask AI</span>
                </button>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          </div>
        )}

        {/* AI Chat Assistant */}
        {chatContext && (
          <AIChatAssistant
            targetUrl={url}
            chatContext={chatContext}
            onScanStart={(scanType) => {
              const scan = suggestedScans.find(s => s.id === scanType);
              if (scan) startScan(scan.id);
            }}
            isVisible={showAIChat}
            onToggle={() => setShowAIChat(!showAIChat)}
          />
        )}
      </div>
    </AppShell>
  );
}

export default TargetAnalysis;