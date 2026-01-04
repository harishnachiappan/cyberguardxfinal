import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import ScanModule from "./pages/ScanModule";
import GuidedScanModule from "./pages/GuidedScanModule";
import TargetScanPage from "./pages/TargetScanPage";
import ReportPage from "./pages/ReportPage";
import TargetAnalysis from "./pages/TargetAnalysis";
import Reports from "./pages/Reports";
import ComprehensiveScanner from "./pages/ComprehensiveScanner";

function App() {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/auth" element={<AuthPage />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/comprehensive-scanner" element={<ComprehensiveScanner />} />
        
        {/* Target Analysis Route (Phase 1) */}
        <Route path="/target-scan/:scanId" element={<TargetScanPage />} />
        <Route path="/target-analysis" element={<TargetAnalysis />} />
        
        {/* Guided Scan Module Routes (Phase 1) */}
        <Route path="/guided-scan/:module/:scanId" element={<GuidedScanModule />} />
        
        {/* Individual Scan Module Routes (Phase 2) */}
        <Route path="/scan/:module" element={<ScanModule />} />
        
        {/* Report Routes */}
        <Route path="/report/:scanId" element={<ReportPage />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </div>
  );
}

export default App;