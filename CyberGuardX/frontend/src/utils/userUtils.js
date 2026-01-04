// Utility function to clear old user data and reset localStorage
export const clearUserData = () => {
  // Clear all CyberGuardX related localStorage items
  localStorage.removeItem('authToken');
  localStorage.removeItem('userData');
  localStorage.removeItem('targetScan');
  localStorage.removeItem('scanResults');
  
  console.log('User data cleared successfully');
};

// Function to set new user data
export const setUserData = (userData) => {
  localStorage.setItem('userData', JSON.stringify(userData));
  localStorage.setItem('authToken', 'mock-jwt-token-' + Date.now());
};

// Function to get current user data
export const getUserData = () => {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
};

// Call this function in browser console to clear old data
window.clearCyberGuardXData = clearUserData;