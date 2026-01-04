import React from 'react';

const CyberGlobe = () => {
  return (
    <div className="relative w-80 h-80 mx-auto">
      {/* Central rotating globe */}
      <div className="absolute inset-12 rounded-full bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 border-2 border-blue-500/40 animate-spin overflow-hidden" style={{animationDuration: '30s'}}>
        {/* Globe grid lines */}
        <div className="absolute inset-0 rounded-full">
          <div className="absolute top-1/2 left-0 w-full h-px bg-blue-400/30 transform -translate-y-1/2"></div>
          <div className="absolute top-0 left-1/2 w-px h-full bg-blue-400/30 transform -translate-x-1/2"></div>
          <div className="absolute top-1/4 left-0 w-full h-px bg-blue-400/20 transform -translate-y-1/2 rounded-full"></div>
          <div className="absolute top-3/4 left-0 w-full h-px bg-blue-400/20 transform -translate-y-1/2 rounded-full"></div>
        </div>
        
        {/* Country/continent shapes */}
        <div className="absolute top-8 left-12 w-6 h-4 bg-cyan-400/60 rounded-sm transform rotate-12"></div>
        <div className="absolute top-16 right-8 w-4 h-6 bg-blue-400/60 rounded-sm transform -rotate-6"></div>
        <div className="absolute bottom-12 left-8 w-8 h-3 bg-cyan-400/60 rounded-sm transform rotate-3"></div>
        <div className="absolute bottom-8 right-12 w-5 h-4 bg-blue-400/60 rounded-sm transform -rotate-12"></div>
        <div className="absolute top-1/2 left-6 w-3 h-5 bg-cyan-400/60 rounded-sm transform -translate-y-1/2 rotate-45"></div>
      </div>
      
      {/* Orbiting shield - orbit 1 */}
      <div className="absolute inset-0 animate-spin" style={{animationDuration: '8s'}}>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Orbiting shield - orbit 2 */}
      <div className="absolute inset-4 animate-spin" style={{animationDuration: '12s', animationDirection: 'reverse'}}>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2">
          <div className="w-6 h-6 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Orbiting shield - orbit 3 */}
      <div className="absolute inset-8 animate-spin" style={{animationDuration: '15s'}}>
        <div className="absolute top-1/2 right-0 transform translate-x-2 -translate-y-1/2">
          <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-md flex items-center justify-center shadow-lg">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CyberGlobe;