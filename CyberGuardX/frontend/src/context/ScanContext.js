import React, { createContext, useContext, useState, useCallback } from 'react';

const ScanContext = createContext();

export const useScan = () => {
  const context = useContext(ScanContext);
  if (!context) {
    throw new Error('useScan must be used within a ScanProvider');
  }
  return context;
};

export const ScanProvider = ({ children }) => {
  const [scanState, setScanState] = useState({
    scanId: null,
    targetUrl: '',
    targetInfo: null,
    suggestedScans: [],
    isGuidedFlow: false
  });

  const initializeGuidedScan = useCallback((url, scanId, targetInfo, suggestedScans) => {
    setScanState({
      scanId,
      targetUrl: url,
      targetInfo,
      suggestedScans: suggestedScans.map(scan => ({ ...scan, status: 'Pending' })),
      isGuidedFlow: true
    });
  }, []);

  const updateScanStatus = useCallback((moduleId, status) => {
    setScanState(prev => ({
      ...prev,
      suggestedScans: prev.suggestedScans.map(scan =>
        scan.id === moduleId ? { ...scan, status } : scan
      )
    }));
  }, []);

  const clearScanState = useCallback(() => {
    setScanState({
      scanId: null,
      targetUrl: '',
      targetInfo: null,
      suggestedScans: [],
      isGuidedFlow: false
    });
  }, []);

  return (
    <ScanContext.Provider value={{
      scanState,
      initializeGuidedScan,
      updateScanStatus,
      clearScanState
    }}>
      {children}
    </ScanContext.Provider>
  );
};