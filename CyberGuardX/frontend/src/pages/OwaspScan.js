import React, { useState } from "react";
import ToolLayout from "../components/ToolLayout";
import "./OwaspScan.css";

function OwaspScan() {
const [scanType, setScanType] = useState("passive"); // "passive" | "active"
const [url, setUrl] = useState("");
const [loading, setLoading] = useState(false);
const [progress, setProgress] = useState({ spider: 0, active: 0 });
const [result, setResult] = useState(null);

// fake result data for UI
const fakeResult = {
overallRisk: "Medium Risk",
overallRiskColor: "orange", // "red" | "orange" | "green"
high: 2,
medium: 6,
low: 9,
info: 4,
owaspImpacted: [
"A01 Broken Access Control",
"A02 Cryptographic Failures",
"A03 Injection",
"A05 Security Misconfiguration",
],
issues: [
{
risk: "High",
name: "Reflected Cross-Site Scripting (XSS)",
owasp: "A03 Injection",
count: 5,
},
{
risk: "Medium",
name: "Missing X-Frame-Options Header",
owasp: "A05 Security Misconfiguration",
count: 12,
},
{
risk: "Medium",
name: "Sensitive Data over HTTP",
owasp: "A02 Cryptographic Failures",
count: 3,
},
{
risk: "Low",
name: "Server Banner Disclosure",
owasp: "A05 Security Misconfiguration",
count: 8,
},
],
};

const handleStartScan = (e) => {
e.preventDefault();
if (!url.trim()) return;

setLoading(true);
setResult(null);
setProgress({ spider: 0, active: 0 });

// fake progress animation
let spider = 0;
let active = 0;

const interval = setInterval(() => {
  spider = Math.min(spider + 20, 100);
  if (scanType === "active" && spider === 100) {
    active = Math.min(active + 20, 100);
  }
  setProgress({ spider, active });

  if (scanType === "passive" && spider === 100) {
    clearInterval(interval);
    setResult(fakeResult);
    setLoading(false);
  } else if (scanType === "active" && active === 100) {
    clearInterval(interval);
    setResult(fakeResult);
    setLoading(false);
  }
}, 400);
};

return (
<ToolLayout title="OWASP ZAP Web Scan" description="Scan your web application for OWASP Top 10 vulnerabilities using OWASP ZAP and review a detailed security report." >
<form className="zap-form" onSubmit={handleStartScan}>
<label className="zap-field">
<span>Target URL</span>
<input
type="text"
placeholder="https://your-application.com"
value={url}
onChange={(e) => setUrl(e.target.value)}
/>
</label>

    <div className="zap-field">
      <span>Scan Type</span>
      <div className="zap-radio-group">
        <label>
          <input
            type="radio"
            name="scanType"
            value="passive"
            checked={scanType === "passive"}
            onChange={() => setScanType("passive")}
          />
          <span>Passive Scan (safe, faster)</span>
        </label>
        <label>
          <input
            type="radio"
            name="scanType"
            value="active"
            checked={scanType === "active"}
            onChange={() => setScanType("active")}
          />
          <span>Active Scan (deeper, slower)</span>
        </label>
      </div>
    </div>

    <p className="zap-note">
      Only scan applications you own or are explicitly authorized to test.
      Active scans can send a large number of requests.
    </p>

    <div className="zap-actions">
      <button type="submit" className="zap-scan-btn" disabled={loading}>
        {loading ? "Running Scan..." : "Start ZAP Scan"}
      </button>
    </div>
  </form>

  {(loading || result) && (
    <div className="zap-result">
      {loading && (
        <div className="zap-progress">
          <div className="zap-progress-line">
            <span>Spider Progress</span>
            <div className="zap-progress-bar">
              <div
                className="zap-progress-fill"
                style={{ width: `${progress.spider}%` }}
              />
            </div>
            <span className="zap-progress-percent">
              {progress.spider}%
            </span>
          </div>

          {scanType === "active" && (
            <div className="zap-progress-line">
              <span>Active Scan Progress</span>
              <div className="zap-progress-bar">
                <div
                  className="zap-progress-fill zap-progress-active"
                  style={{ width: `${progress.active}%` }}
                />
              </div>
              <span className="zap-progress-percent">
                {progress.active}%
              </span>
            </div>
          )}
        </div>
      )}

      {result && (
        <>
          <div className="zap-summary">
            <div className="zap-summary-left">
              <div className="zap-risk-title">Overall Risk</div>
              <div
                className={
                  "zap-risk-badge " +
                  (result.overallRiskColor === "red"
                    ? "zap-risk-high"
                    : result.overallRiskColor === "orange"
                    ? "zap-risk-medium"
                    : "zap-risk-low")
                }
              >
                {result.overallRisk}
              </div>
              <div className="zap-owasp-line">
                <span className="zap-owasp-label">
                  OWASP Top 10 impacted:
                </span>
                <div className="zap-owasp-tags">
                  {result.owaspImpacted.map((tag) => (
                    <span key={tag} className="zap-owasp-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="zap-summary-right">
              <div className="zap-count zap-count-high">
                <span className="zap-count-label">High</span>
                <span className="zap-count-value">{result.high}</span>
              </div>
              <div className="zap-count zap-count-medium">
                <span className="zap-count-label">Medium</span>
                <span className="zap-count-value">{result.medium}</span>
              </div>
              <div className="zap-count zap-count-low">
                <span className="zap-count-label">Low</span>
                <span className="zap-count-value">{result.low}</span>
              </div>
              <div className="zap-count zap-count-info">
                <span className="zap-count-label">Info</span>
                <span className="zap-count-value">{result.info}</span>
              </div>
            </div>
          </div>

          <div className="zap-issues">
            <div className="zap-issues-header">
              <h3>Top Issues</h3>
              <button className="zap-download-btn" type="button">
                ⬇ Download ZAP PDF Report
              </button>
            </div>

            <table className="zap-table">
              <thead>
                <tr>
                  <th>Risk</th>
                  <th>Issue</th>
                  <th>OWASP Category</th>
                  <th>Affected URLs</th>
                </tr>
              </thead>
              <tbody>
                {result.issues.map((issue, idx) => (
                  <tr key={idx}>
                    <td
                      className={
                        issue.risk === "High"
                          ? "zap-risk-cell zap-risk-high-text"
                          : issue.risk === "Medium"
                          ? "zap-risk-cell zap-risk-medium-text"
                          : "zap-risk-cell zap-risk-low-text"
                      }
                    >
                      {issue.risk}
                    </td>
                    <td>{issue.name}</td>
                    <td className="zap-owasp-cell">{issue.owasp}</td>
                    <td>{issue.count}</td>
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

export default OwaspScan;