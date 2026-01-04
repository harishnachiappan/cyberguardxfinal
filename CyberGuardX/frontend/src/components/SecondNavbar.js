import React from "react";
import {
  DocumentArrowDownIcon,
  EyeIcon,
  ClipboardDocumentIcon
} from "@heroicons/react/24/outline";

function SecondNavbar({ pageTitle, scanId, onViewReport, onExportPdf }) {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-slate-700 border-b border-slate-600 h-12 flex items-center justify-between px-6">
      {/* Left Side - Page Title */}
      <div className="flex items-center space-x-2">
        <h1 className="text-white font-medium">{pageTitle}</h1>
      </div>

      {/* Right Side - Scan Actions */}
      {scanId && (
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-slate-400">Scan ID:</span>
            <button
              onClick={() => copyToClipboard(scanId)}
              className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition"
            >
              <span className="font-mono">{scanId}</span>
              <ClipboardDocumentIcon className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            {onViewReport && (
              <button
                onClick={onViewReport}
                className="flex items-center space-x-1 bg-slate-600 hover:bg-slate-500 text-white px-3 py-1 rounded text-sm transition"
              >
                <EyeIcon className="w-4 h-4" />
                <span>View Report</span>
              </button>
            )}
            
            {onExportPdf && (
              <button
                onClick={onExportPdf}
                className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition"
              >
                <DocumentArrowDownIcon className="w-4 h-4" />
                <span>Export PDF</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SecondNavbar;