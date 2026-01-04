import React, { useState } from "react";
import ToolLayout from "../components/ToolLayout";
import "./PhishingDetection.css";

function PhishingDetection() {
const [activeTab, setActiveTab] = useState("url"); // "url" or "email"
const [urlInput, setUrlInput] = useState("");
const [emailHeader, setEmailHeader] = useState("");
const [emailBody, setEmailBody] = useState("");
const [loading, setLoading] = useState(false);
const [result, setResult] = useState(null);

const fakeUrlResult = {
verdict: "Likely Safe",
riskColor: "green",
domainName: "example.com",
domainAge: "5 years",
registeredOn: "2019-06-01",
expiresOn: "2030-06-01",
registrar: "Example Registrar",
country: "US",
ipAddress: "93.184.216.34",
isp: "Example ISP",
sslStatus: "Valid",
sslExpiry: "2026-01-01",
};

const fakeEmailResult = {
verdict: "Suspicious",
riskColor: "yellow",
fromAddress: "support@paypai.com",
displayName: "PayPal Support",
originIp: "185.22.33.44",
originCountry: "RU",
spf: "Fail",
dkim: "None",
dmarc: "Fail",
suspiciousLinks: 2,
};

const handleScan = (e) => {
e.preventDefault();
setLoading(true);
setResult(null);

setTimeout(() => {
  if (activeTab === "url") {
    setResult({ type: "url", data: fakeUrlResult });
  } else {
    setResult({ type: "email", data: fakeEmailResult });
  }
  setLoading(false);
}, 1200);
};

return (
<ToolLayout title="Phishing Detection" description="Analyze suspicious URLs and emails to detect phishing indicators and generate a detailed security summary." >
<div className="phish-tabs">
<button
className={
activeTab === "url" ? "phish-tab phish-tab-active" : "phish-tab"
}
onClick={() => setActiveTab("url")}
>
URL Analysis
</button>
<button
className={
activeTab === "email" ? "phish-tab phish-tab-active" : "phish-tab"
}
onClick={() => setActiveTab("email")}
>
Email Analysis
</button>
</div>


  <form className="phish-form" onSubmit={handleScan}>
    {activeTab === "url" ? (
      <div className="phish-field-group">
        <label>
          <span>Suspicious URL</span>
          <input
            type="text"
            placeholder="https://example-login.com/verify"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
          />
        </label>
      </div>
    ) : (
      <>
        <label>
          <span>Email header (optional)</span>
          <textarea
            placeholder="Paste full email header here for deeper analysis..."
            value={emailHeader}
            onChange={(e) => setEmailHeader(e.target.value)}
          />
        </label>
        <label>
          <span>Email body / content</span>
          <textarea
            placeholder="Paste the content of the suspicious email..."
            value={emailBody}
            onChange={(e) => setEmailBody(e.target.value)}
          />
        </label>
      </>
    )}

    <div className="phish-actions">
      <button type="submit" className="phish-scan-btn" disabled={loading}>
        {loading ? "Analyzing..." : "Scan for Phishing"}
      </button>
    </div>
  </form>

  {result && (
    <div className="phish-result">
      <div className="phish-result-header">
        <div>
          <span className="phish-result-title">Analysis Result</span>
          <div className="phish-score-line">
            <span className="phish-score-label">Risk Score:</span>
            <span className="phish-score-value">
              {result.type === "url" ? "18 / 100 (Low)" : "62 / 100 (Medium)"}
            </span>
          </div>
        </div>

        <span
          className={
            "phish-verdict-badge " +
            (result.data.riskColor === "green"
              ? "phish-safe"
              : result.data.riskColor === "yellow"
              ? "phish-warning"
              : "phish-danger")
          }
        >
          {result.data.verdict}
        </span>
      </div>

      {result.type === "url" ? (
        <table className="phish-table">
          <tbody>
            <tr>
              <th>Domain Name</th>
              <td className="phish-good">{result.data.domainName}</td>
            </tr>
            <tr>
              <th>Domain Age</th>
              <td className="phish-good">{result.data.domainAge}</td>
            </tr>
            <tr>
              <th>Registered On</th>
              <td>{result.data.registeredOn}</td>
            </tr>
            <tr>
              <th>Expiry Date</th>
              <td className="phish-warn">{result.data.expiresOn}</td>
            </tr>
            <tr>
              <th>Registrar</th>
              <td>{result.data.registrar}</td>
            </tr>
            <tr>
              <th>Country</th>
              <td className="phish-good">{result.data.country}</td>
            </tr>
            <tr>
              <th>IP Address</th>
              <td>{result.data.ipAddress}</td>
            </tr>
            <tr>
              <th>ISP</th>
              <td>{result.data.isp}</td>
            </tr>
            <tr>
              <th>SSL Status</th>
              <td className="phish-good">{result.data.sslStatus}</td>
            </tr>
            <tr>
              <th>SSL Expiry</th>
              <td className="phish-warn">{result.data.sslExpiry}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <table className="phish-table">
          <tbody>
            <tr>
              <th>From Address</th>
              <td className="phish-bad">{result.data.fromAddress}</td>
            </tr>
            <tr>
              <th>Display Name</th>
              <td className="phish-warn">{result.data.displayName}</td>
            </tr>
            <tr>
              <th>Origin IP</th>
              <td className="phish-bad">{result.data.originIp}</td>
            </tr>
            <tr>
              <th>Origin Country</th>
              <td className="phish-warn">{result.data.originCountry}</td>
            </tr>
            <tr>
              <th>SPF</th>
              <td className="phish-bad">{result.data.spf}</td>
            </tr>
            <tr>
              <th>DKIM</th>
              <td className="phish-bad">{result.data.dkim}</td>
            </tr>
            <tr>
              <th>DMARC</th>
              <td className="phish-bad">{result.data.dmarc}</td>
            </tr>
            <tr>
              <th>Suspicious Links</th>
              <td className="phish-warn">{result.data.suspiciousLinks}</td>
            </tr>
          </tbody>
        </table>
      )}

      <div className="phish-footer-actions">
        <button className="phish-download-btn" type="button">
          ⬇ Download PDF Report
        </button>
      </div>
    </div>
  )}
</ToolLayout>
);
}

export default PhishingDetection;