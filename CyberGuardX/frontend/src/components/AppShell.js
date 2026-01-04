import React, { useState, useEffect } from "react";
import TopNavbar from "./TopNavbar";
import Sidebar from "./Sidebar";
import SecondNavbar from "./SecondNavbar";

function AppShell({ children, pageTitle, scanId, onViewReport, onExportPdf }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900' : 'bg-gray-100'}`}>
      {/* Top Navbar */}
      <TopNavbar 
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      
      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        {/* Main Content Area */}
        <main className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "lg:ml-64" : "lg:ml-0"
        }`}>
          <div className="pt-16">
            {/* Second Navbar */}
            <SecondNavbar 
              pageTitle={pageTitle}
              scanId={scanId}
              onViewReport={onViewReport}
              onExportPdf={onExportPdf}
            />
            
            {/* Page Content */}
            <div className="p-6 w-full">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AppShell;