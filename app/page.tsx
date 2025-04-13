// 'use client';

// import React, { useState, useCallback, useEffect, useRef } from 'react';
// import { startCall, endCall } from '@/lib/callFunctions';
// import { demoConfig } from '@/app/demo-config';
// import ProductDisplay from '@/app/components/ProductDisplay';
// import OrderDetails from '@/app/components/OrderDetails';
// import QuestionProgressDetails from '@/app/components/QuestionProgressDetails';
// import QuestionProgressTracker from "@/app/components/QuestionProgressTracker";
// import { Transcript } from 'ultravox-client';
// import TechStackDetails from './components/TechStackDetails';
// import AssessmentFeedback from './components/AssessmentFeedback';

// export default function Home() {
//   const [transcripts, setTranscripts] = useState<Transcript[]>([]);
//   const [status, setStatus] = useState<string>('');
//   const [isCallActive, setIsCallActive] = useState(false);
//   const transcriptRef = useRef<HTMLDivElement>(null);

//   // Auto-scroll transcripts
//   useEffect(() => {
//     if (transcriptRef.current) {
//       transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
//     }
//   }, [transcripts]);

//   const handleStartCall = async () => {
//     try {
//       await startCall(
//         {
//           onTranscriptChange: (newTranscripts) => setTranscripts(newTranscripts || []),
//           onStatusChange: (newStatus) => setStatus(newStatus),
//           onDebugMessage: (msg) => console.log('Debug:', msg)
//         },
//         demoConfig.callConfig,
//         true
//       );
//       setIsCallActive(true);
//     } catch (error) {
//       console.error('Failed to start call:', error);
//     }
//   };

//   const handleEndCall = async () => {
//     try {
//       await endCall();
//       setIsCallActive(false);
//       setStatus('');
//       setTranscripts([]);
//     } catch (error) {
//       console.error('Failed to end call:', error);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <div className="bg-white border-b">
//         <div className="max-w-7xl mx-auto px-4">
//           <h1 className="text-xl font-semibold text-gray-900 text-center py-4">
//             No Name - Soon!
//           </h1>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 py-6">
//         <div className="flex gap-6">
//           {/* Left Section - Menu (70%) */}
//           <div className="w-[70%]">
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               {/* <ProductDisplay /> */}
//               <TechStackDetails/>
//             </div>
//           </div>

//           <div className="w-[70%]">
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               {/* <ProductDisplay /> */}
//               <QuestionProgressDetails/>
//             </div>
//           </div>

//           <div className="w-[70%]">
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               {/* <ProductDisplay /> */}
//               <QuestionProgressTracker/>
//             </div>
//           </div>


//           <div className="w-[70%]">
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               {/* <ProductDisplay /> */}
//               <AssessmentFeedback/>
//             </div>
//           </div>

//           {/* Right Section - Order & Drive-Thru (30%) */}
//           <div className="w-[30%] space-y-6">
//             {/* Order Details */}
//             {/* <div className="bg-white rounded-lg shadow-sm p-6">
//               <h2 className="text-lg font-medium text-gray-900 mb-4">Your Order</h2>
//               <OrderDetails />
//             </div> */}

//             {/* Drive-Thru Controls */}
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <h2 className="text-lg font-medium text-gray-900 mb-4">Speaker</h2>
              
//               {/* Call Controls */}
//               <div className="mb-4">
//                 {!isCallActive ? (
//                   <button
//                     onClick={handleStartCall}
//                     className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
//                   >
//                     Start Call
//                   </button>
//                 ) : (
//                   <button
//                     onClick={handleEndCall}
//                     className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
//                   >
//                     End Order
//                   </button>
//                 )}
//               </div>

//               {/* Conversation */}
//               <div>
//                 <h3 className="text-sm font-medium text-gray-900 mb-2">Conversation</h3>
//                 <div 
//                   ref={transcriptRef}
//                   className="h-48 overflow-y-auto bg-gray-50 rounded-lg p-3 space-y-2"
//                 >
//                   {transcripts.length === 0 ? (
//                     <p className="text-gray-900 text-sm text-center">
//                       Start your prep by clicking the button above!
//                     </p>
//                   ) : (
//                     transcripts.map((transcript, index) => (
//                       <div 
//                         key={index} 
//                         className={`text-sm ${
//                           transcript.speaker === 'agent' 
//                             ? 'text-blue-700' 
//                             : 'text-gray-900'
//                         }`}
//                       >
//                         <span className="text-xs font-medium text-gray-700">
//                           {transcript.speaker === 'agent' ? 'Dr. Donut:' : 'You:'}
//                         </span>
//                         <span className="ml-2">{transcript.text}</span>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { startCall, endCall } from '@/lib/callFunctions';
import { demoConfig } from '@/app/demo-config';
import TechStackDetails from './components/TechStackDetails';
import QuestionProgressDetails from './components/QuestionProgressDetails';
import QuestionProgressTracker from './components/QuestionProgressTracker';
import AssessmentFeedback from './components/AssessmentFeedback';
import { Transcript } from 'ultravox-client';
import { PhoneCall, PhoneOff } from 'lucide-react';
import SelectedJobs from './components/selectedJobs';
import JobDetails from './components/JobDetails';

export default function Home() {
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [status, setStatus] = useState('');
  const [isCallActive, setIsCallActive] = useState(false);
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcripts]);

  const handleStartCall = async () => {
    try {
      await startCall(
        {
          onTranscriptChange: (newTranscripts) => setTranscripts(newTranscripts || []),
          onStatusChange: (newStatus) => setStatus(newStatus),
          onDebugMessage: (msg) => console.log('Debug:', msg),
        },
        demoConfig.callConfig,
        true
      );
      setIsCallActive(true);
    } catch (error) {
      console.error('Failed to start call:', error);
    }
  };

  const handleEndCall = async () => {
    try {
      await endCall();
      setIsCallActive(false);
      setStatus('');
      setTranscripts([]);
    } catch (error) {
      console.error('Failed to end call:', error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900">No Name - Soon!</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Content */}
        <div className="space-y-6 lg:col-span-2">
          <Card><TechStackDetails /></Card>
          <Card><QuestionProgressDetails /></Card>
          <Card><QuestionProgressTracker /></Card>
          <Card><AssessmentFeedback /></Card>
          <Card><SelectedJobs /></Card>
          <Card><JobDetails /></Card>

        </div>

        {/* Right Panel */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Speaker</h2>

            {/* Call Controls */}
            {!isCallActive ? (
              <button
                onClick={handleStartCall}
                className="w-full flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                <PhoneCall className="w-5 h-5" />
                Start Call
              </button>
            ) : (
              <button
                onClick={handleEndCall}
                className="w-full flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                <PhoneOff className="w-5 h-5" />
                End Order
              </button>
            )}
          </Card>

          <Card>
            <h3 className="text-sm font-medium text-gray-900 mb-2">Conversation</h3>
            <div
              ref={transcriptRef}
              className="h-64 overflow-y-auto bg-gray-50 rounded-lg p-3 space-y-2 border"
            >
              {transcripts.length === 0 ? (
                <p className="text-gray-500 text-sm text-center">
                  Start your prep by clicking the button above!
                </p>
              ) : (
                transcripts.map((transcript, index) => (
                  <div
                    key={index}
                    className={`text-sm ${
                      transcript.speaker === 'agent'
                        ? 'text-blue-700'
                        : 'text-gray-900'
                    }`}
                  >
                    <span className="text-xs font-semibold text-gray-700">
                      {transcript.speaker === 'agent' ? 'Dr. Donut:' : 'You:'}
                    </span>
                    <span className="ml-2">{transcript.text}</span>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}

// Reusable Card Component
const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white rounded-2xl shadow p-6">{children}</div>
);
