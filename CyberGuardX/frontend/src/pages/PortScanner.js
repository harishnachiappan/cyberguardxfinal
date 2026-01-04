import React, { useState } from "react";
import ToolLayout from "../components/ToolLayout";
import "./PortScanner.css";

function PortScanner() {
const [target, setTarget] = useState("");
const [mode, setMode] = useState("common"); // "common" | "custom"
const [customRange, setCustomRange] = useState("1-1024");
const [loading, setLoading] = useState(false);
const [progress, setProgress] = useState(0);
const [result, setResult] = useState(null);

const fakeResult = {
totalPorts: 20,
open: 4,
closed: 12,
filtered: 4,
ports: [
{ port: 22, service: "SSH", status: "open", risk: "high" },
{ port: 80, service: "HTTP", status: "open", risk: "medium" },
{ port: 443, service: "HTTPS", status: "open", risk: "low" },
{ port: 3389, service: "RDP", status: "open", risk: "high" },
{ port: 21, service: "FTP", status: "closed", risk: "medium" },
{ port: 23, service: "Telnet", status: "closed", risk: "high" },
],
};

const handleScan = (e) => {
e.preventDefault();
if (!target.trim()) return;

setLoading(true);
setResult(null);
setProgress(0);

let p = 0;
const interval = setInterval(() => {
  p = Math.min(p + 15, 100);
  setProgress(p);
  if (p === 100) {
    clearInterval(interval);
    setResult(fakeResult);
    setLoading(false);
  }
}, 300);
};

const rangeLabel = mode === "common" ? "Common ports (top 1000)" : `Custom range: ${customRange}`;

return (
<ToolLayout title="Online Port Scanner" description="Scan a host for open, closed, and filtered ports to understand exposed network services and potential risks." >
<form className="port-form" onSubmit={handleScan}>
<label className="port-field">
<span>Target (IP or domain)</span>
<input
type="text"
placeholder="scanme.example.com or 192.168.1.10"
value={target}
onChange={(e) => setTarget(e.target.value)}
/>
</label>
    <div className="port-field">
      <span>Port Range</span>
      <div className="port-radio-group">
        <label>
          <input
            type="radio"
            name="mode"
            value="common"
            checked={mode === "common"}
            onChange={() => setMode("common")}
          />
          <span>Common ports</span>
        </label>
        <label>
          <input
            type="radio"
            name="mode"
            value="custom"
            checked={mode === "custom"}
            onChange={() => setMode("custom")}
          />
          <span>Custom range</span>
        </label>
      </div>

      {mode === "custom" && (
        <input
          type="text"
          className="port-range-input"
          placeholder="e.g., 1-1024 or 20-25,80,443"
          value={customRange}
          onChange={(e) => setCustomRange(e.target.value)}
        />
      )}
    </div>

    <p className="port-note">
      Use this scanner only on hosts you own or are authorized to test. Some
      firewalls may block or rate-limit scan traffic.
    </p>

    <div className="port-actions">
      <button type="submit" className="port-scan-btn" disabled={loading}>
        {loading ? "Scanning ports..." : "Start Port Scan"}
      </button>
    </div>
  </form>

  {(loading || result) && (
    <div className="port-result">
      {loading && (
        <div className="port-progress-line">
          <span>Scan Progress</span>
          <div className="port-progress-bar">
            <div
              className="port-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="port-progress-percent">{progress}%</span>
        </div>
      )}

      {result && (
        <>
          <div className="port-summary">
            <div className="port-summary-left">
              <div className="port-summary-title">Scan Summary</div>
              <div className="port-summary-target">
                Target: <strong>{target}</strong>
              </div>
              <div className="port-summary-range">{rangeLabel}</div>
            </div>

            <div className="port-summary-right">
              <div className="port-count port-count-open">
                <span className="port-count-label">Open</span>
                <span className="port-count-value">{result.open}</span>
              </div>
              <div className="port-count port-count-closed">
                <span className="port-count-label">Closed</span>
                <span className="port-count-value">{result.closed}</span>
              </div>
              <div className="port-count port-count-filtered">
                <span className="port-count-label">Filtered</span>
                <span className="port-count-value">{result.filtered}</span>
              </div>
              <div className="port-count port-count-total">
                <span className="port-count-label">Total</span>
                <span className="port-count-value">
                  {result.totalPorts}
                </span>
              </div>
            </div>
          </div>

          <div className="port-issues">
            <div className="port-issues-header">
              <h3>Port Details</h3>
              <button className="port-download-btn" type="button">
                ⬇ Download Port Scan PDF
              </button>
            </div>

            <table className="port-table">
              <thead>
                <tr>
                  <th>Port</th>
                  <th>Service</th>
                  <th>Status</th>
                  <th>Risk</th>
                </tr>
              </thead>
              <tbody>
                {result.ports.map((p, idx) => (
                  <tr key={idx}>
                    <td>{p.port}</td>
                    <td>{p.service}</td>
                    <td
                      className={
                        p.status === "open"
                          ? "port-status port-open"
                          : p.status === "filtered"
                          ? "port-status port-filtered"
                          : "port-status port-closed"
                      }
                    >
                      {p.status}
                    </td>
                    <td
                      className={
                        p.risk === "high"
                          ? "port-risk port-risk-high"
                          : p.risk === "medium"
                          ? "port-risk port-risk-medium"
                          : "port-risk port-risk-low"
                      }
                    >
                      {p.risk === "high"
                        ? "High (harden or restrict)"
                        : p.risk === "medium"
                        ? "Medium (review config)"
                        : "Low"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )}
</ToolLayout>
);
}

export default PortScanner;