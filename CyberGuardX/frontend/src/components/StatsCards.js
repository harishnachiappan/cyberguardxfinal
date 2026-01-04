import React from "react";
import "./StatsCards.css";

function StatsCards() {
const stats = [
{ label: "Total Scans", value: 0 },
{ label: "Phishing Scans", value: 0 },
{ label: "Port Scans", value: 0 },
{ label: "Vulnerabilities Found", value: 0 },
];

return (
<div className="stats-grid">
{stats.map((item) => (
<div key={item.label} className="stat-card">
<div className="stat-value">{item.value}</div>
<div className="stat-label">{item.label}</div>
</div>
))}
</div>
);
}

export default StatsCards;

