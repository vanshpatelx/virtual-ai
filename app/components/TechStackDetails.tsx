'use client';

import React, { useState, useEffect } from 'react';

const TechStackDetails: React.FC = () => {
  const [techName, setTechName] = useState<string | null>(null);

  useEffect(() => {
    const handleTechUpdate = (event: CustomEvent<string>) => {
      console.log('Received tech name:', event.detail);
      setTechName(event.detail);
    };

    const handleClear = () => {
      setTechName(null);
    };

    window.addEventListener('techStackUpdated', handleTechUpdate as EventListener);
    window.addEventListener('techStackCleared', handleClear as EventListener);

    return () => {
      window.removeEventListener('techStackUpdated', handleTechUpdate as EventListener);
      window.removeEventListener('techStackCleared', handleClear as EventListener);
    };
  }, []);

  return (
    <div>
      {!techName ? (
        <div className="text-center text-gray-900 text-sm py-4">
          No tech stack selected. Dispatch an update to see it here.
        </div>
      ) : (
        <div className="pl-4 border-l-2 border-gray-200">
          <span className="text-gray-900 font-medium">{techName}</span>
        </div>
      )}
    </div>
  );
};

export default TechStackDetails;
