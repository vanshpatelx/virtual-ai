// 'use client';

// import React, { useState, useEffect } from 'react';

// const TechStackDetails: React.FC = () => {
//   const [techName, setTechName] = useState<string | null>(null);

//   useEffect(() => {
//     const handleTechUpdate = (event: CustomEvent<string>) => {
//       console.log('Received tech name:', event.detail);
//       setTechName(event.detail);
//     };

//     const handleClear = () => {
//       setTechName(null);
//     };

//     window.addEventListener('techStackUpdated', handleTechUpdate as EventListener);
//     window.addEventListener('techStackCleared', handleClear as EventListener);

//     return () => {
//       window.removeEventListener('techStackUpdated', handleTechUpdate as EventListener);
//       window.removeEventListener('techStackCleared', handleClear as EventListener);
//     };
//   }, []);

//   return (
//     <div>
//       {!techName ? (
//         <div className="text-center text-gray-900 text-sm py-4">
//           No tech stack selected. Dispatch an update to see it here.
//         </div>
//       ) : (
//         <div className="pl-4 border-l-2 border-gray-200">
//           <span className="text-gray-900 font-medium">{techName}</span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TechStackDetails;

'use client';

import React, { useState, useEffect } from 'react';
import { MonitorSmartphone, Info } from 'lucide-react';

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
    <div className="bg-gray-50 rounded-lg p-4 shadow-sm transition-all duration-300">
      {!techName ? (
        <div className="text-center text-gray-500 text-sm flex flex-col items-center gap-2 py-4">
          <Info className="w-5 h-5 text-gray-400" />
          <span>No tech stack selected. Dispatch an update to see it here.</span>
        </div>
      ) : (
        <div className="flex items-center gap-3 text-gray-900 animate-fadeIn">
          <MonitorSmartphone className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-base">{techName}</span>
        </div>
      )}
    </div>
  );
};

export default TechStackDetails;
