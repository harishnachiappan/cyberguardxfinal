const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'API request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Authentication
  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  // Scans
  async createScan(scanData) {
    return this.request('/scans/create', {
      method: 'POST',
      body: JSON.stringify(scanData),
    });
  }

  async getScan(scanId) {
    return this.request(`/scans/${scanId}`);
  }

  async startScan(scanId, module) {
    return this.request(`/scans/${scanId}/start`, {
      method: 'POST',
      body: JSON.stringify({ module }),
    });
  }

  async updateScanStatus(scanId, status, results = null) {
    return this.request(`/scans/${scanId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, results }),
    });
  }

  async getUserScans(userId) {
    return this.request(`/scans/user/${userId}`);
  }

  async analyzeTarget(targetUrl) {
    return this.request('/scans/analyze-target', {
      method: 'POST',
      body: JSON.stringify({ targetUrl }),
    });
  }

  // Reports
  async generateReport(scanId, userId) {
    return this.request('/reports/generate', {
      method: 'POST',
      body: JSON.stringify({ scanId, userId }),
    });
  }

  async getReport(reportId) {
    return this.request(`/reports/${reportId}`);
  }

  async getUserReports(userId) {
    return this.request(`/reports/user/${userId}`);
  }

  async getDashboardStats(userId) {
    return this.request(`/reports/stats/${userId}`);
  }

  async exportReport(reportId) {
    return this.request(`/reports/${reportId}/export`);
  }
}

const apiService = new ApiService();
export default apiService;