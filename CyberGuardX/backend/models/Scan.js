const mongoose = require('mongoose');

const vulnerabilitySchema = new mongoose.Schema({
  severity: {
    type: String,
    enum: ['Critical', 'High', 'Medium', 'Low', 'Info'],
    required: true
  },
  type: {
    type: String,
    required: true
  },
  location: String,
  description: String,
  impact: String,
  recommendation: String,
  cwe: String,
  cvss: Number,
  evidence: String
});

const scanSchema = new mongoose.Schema({
  scanId: {
    type: String,
    required: true,
    unique: true
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
    enum: [
      'sql-injection',
      'xss',
      'csrf',
      'access-control',
      'jwt',
      'session',
      'ssrf',
      'network-vapt',
      'full-scan'
    ],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'running', 'completed', 'failed', 'cancelled'],
    default: 'pending'
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  results: {
    duration: Number,
    requestCount: Number,
    responseCount: Number,
    errorCount: Number,
    metadata: mongoose.Schema.Types.Mixed
  },
  vulnerabilities: [vulnerabilitySchema],
  targetInfo: {
    domain: String,
    ip: String,
    server: String,
    ssl: Boolean,
    country: String,
    responseTime: String,
    technologies: [String],
    ports: [Number]
  },
  configuration: {
    depth: { type: Number, default: 3 },
    timeout: { type: Number, default: 30000 },
    userAgent: String,
    headers: mongoose.Schema.Types.Mixed,
    cookies: mongoose.Schema.Types.Mixed
  },
  startedAt: Date,
  completedAt: Date,
  errorMessage: String
}, {
  timestamps: true
});

// Indexes for better performance
scanSchema.index({ scanId: 1 });
scanSchema.index({ userId: 1, createdAt: -1 });
scanSchema.index({ status: 1 });
scanSchema.index({ targetUrl: 1 });

module.exports = mongoose.model('Scan', scanSchema);