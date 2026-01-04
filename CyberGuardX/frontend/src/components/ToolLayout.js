import React from "react";
import "./ToolLayout.css";

function ToolLayout({ title, description, children }) {
return (
<div className="tool-root">
<div className="tool-header">
<h2 className="tool-title">{title}</h2>
<p className="tool-desc">{description}</p>
</div>
<div className="tool-body">{children}</div>
</div>
);
}

export default ToolLayout;