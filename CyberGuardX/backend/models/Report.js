const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  reportId: {
    type: String,
    required: true,
    unique: true
  },
  scanId: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  targetUrl: {
    type: String,
    required: true
  },
  scanType: {
    type: String,
    required: true
  },
  title: String,
  description: String,
  vulnerabilities: [{
    severity: String,
    type: String,
    location: String,
    description: String,
    impact: String,
    recommendation: String,
    cwe: String,
    cvss: Number,
    evidence: String
  }],
  summary: {
    totalVulnerabilities: { type: Number, default: 0 },
    severityBreakdown: {
      critical: { type: Number, default: 0 },
      high: { type: Number, default: 0 },
      medium: { type: Number, default: 0 },
      low: { type: Number, default: 0 },
      info: { type: Number, default: 0 }
    },
    riskScore: { type: Number, default: 0 },
    riskLevel: {
      type: String,
      enum: ['Critical', 'High', 'Medium', 'Low'],
      default: 'Low'
    },
    recommendations: [String],
    owaspMapping: [{
      category: String,
      count: Number,
      percentage: Number
    }]
  },
  executiveSummary: String,
  technicalDetails: String,
  remediation: [{
    priority: String,
    action: String,
    timeline: String,
    effort: String
  }],
  attachments: [{
    filename: String,
    path: String,
    type: String,
    size: Number
  }],
  status: {
    type: String,
    enum: ['draft', 'final', 'archived'],
    default: 'final'
  },
  tags: [String],
  sharedWith: [{
    userId: mongoose.Schema.Types.ObjectId,
    permission: {
      type: String,
      enum: ['read', 'write'],
      default: 'read'
    }
  }],
  exportedAt: Date,
  exportFormat: String
}, {
  timestamps: true
});

// Indexes
reportSchema.index({ reportId: 1 });
reportSchema.index({ userId: 1, createdAt: -1 });
reportSchema.index({ scanId: 1 });
reportSchema.index({ status: 1 });
reportSchema.index({ 'summary.riskLevel': 1 });

module.exports = mongoose.model('Report', reportSchema);