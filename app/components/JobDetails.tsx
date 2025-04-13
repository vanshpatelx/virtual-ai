// 'use client';

// import React, { useEffect, useState } from 'react';
// import { ClipboardCheck } from 'lucide-react';

// const JobDetails: React.FC = () => {
//   const [jobId, setJobId] = useState<string | null>(null);
//   const [summary, setSummary] = useState<string | null>(null);
//   const [interviewTips, setInterviewTips] = useState<string[]>([]);
//   const [resumeTips, setResumeTips] = useState<string[]>([]);

//   useEffect(() => {
//     const handleSelectedJob = (event: CustomEvent<{ jobId: string }>) => {
//       const { jobId } = event.detail;
//       setJobId(jobId);

//       // Simulated logic – replace with API in real scenario
//       setSummary(`This role focuses on ${jobId === '1' ? 'Node.js backend development' : 'fullstack delivery using modern tools'}.`);
//       setInterviewTips([
//         'Review core concepts in Node.js/React.',
//         'Prepare for system design rounds.',
//         'Practice explaining your past project experience.'
//       ]);
//       setResumeTips([
//         'Highlight relevant stack (e.g., Node.js, React).',
//         'Quantify impact (e.g., performance, cost savings).',
//         'Tailor keywords to match job description.'
//       ]);
//     };

//     window.addEventListener('selectedJobDetails', handleSelectedJob as EventListener);

//     return () => {
//       window.removeEventListener('selectedJobDetails', handleSelectedJob as EventListener);
//     };
//   }, []);

//   if (!jobId) {
//     return (
//       <div className="text-gray-400 text-sm text-center py-4">
//         <ClipboardCheck className="mx-auto mb-2 w-5 h-5" />
//         Select a job to view its details and preparation tips.
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
//       <div>
//         <h3 className="text-base font-semibold">Job Summary</h3>
//         <p className="text-sm text-gray-700">{summary}</p>
//       </div>
//       <div>
//         <h3 className="text-base font-semibold">Interview Tips</h3>
//         <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
//           {interviewTips.map((tip, idx) => (
//             <li key={idx}>{tip}</li>
//           ))}
//         </ul>
//       </div>
//       <div>
//         <h3 className="text-base font-semibold">Resume Tips</h3>
//         <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
//           {resumeTips.map((tip, idx) => (
//             <li key={idx}>{tip}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default JobDetails;


// 'use client';

// import React, { useEffect, useState } from 'react';

// type JobDetailsPayload = {
//   summary: string;
//   interviewTips: string[];
//   resumeTips: string[];
// };

// const JobDetails: React.FC = () => {
//   const [jobDetails, setJobDetails] = useState<JobDetailsPayload | null>(null);

//   useEffect(() => {
//     const handleJobDetails = (event: CustomEvent<JobDetailsPayload>) => {
//       console.log("Received job details:", event.detail);
//       setJobDetails(event.detail);
//     };

//     window.addEventListener('jobDetailsGenerated', handleJobDetails as EventListener);

//     return () => {
//       window.removeEventListener('jobDetailsGenerated', handleJobDetails as EventListener);
//     };
//   }, []);

//   if (!jobDetails) {
//     return (
//       <div className="bg-white rounded-lg p-4 shadow-sm text-sm text-center text-gray-500 animate-fadeIn">
//         Job details will appear here once the job is selected.
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-lg p-4 shadow-sm space-y-6 animate-fadeIn">
//       <h3 className="text-lg font-semibold text-gray-900">📋 Job Summary</h3>
//       <p className="text-gray-700 text-sm">{jobDetails.summary}</p>

//       <div>
//         <h4 className="text-md font-semibold text-green-700 mb-1">💼 Interview Tips</h4>
//         <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
//           {jobDetails.interviewTips.map((item, idx) => (
//             <li key={idx}>{item}</li>
//           ))}
//         </ul>
//       </div>

//       <div>
//         <h4 className="text-md font-semibold text-red-600 mb-1">📑 Resume Tips</h4>
//         <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
//           {jobDetails.resumeTips.map((item, idx) => (
//             <li key={idx}>{item}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default JobDetails;


// 'use client';

// import React, { useEffect, useState } from 'react';
// import { ClipboardList, Lightbulb, FileText } from 'lucide-react';

// type JobDetailsPayload = {
//   summary: string;
//   interviewTips: string[];
//   resumeTips: string[];
// };

// const SectionBlock: React.FC<{
//   icon: React.ReactNode;
//   title: string;
//   items?: string[];
//   content?: string;
//   color?: string;
// }> = ({ icon, title, items, content, color = 'text-gray-800' }) => (
//   <div className="space-y-2">
//     <div className={`flex items-center gap-2 font-semibold ${color}`}>
//       {icon}
//       <span className="text-base">{title}</span>
//     </div>
//     {content && <p className="text-sm text-gray-600 leading-relaxed">{content}</p>}
//     {items && (
//       <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
//         {items.map((item, idx) => (
//           <li key={idx}>{item}</li>
//         ))}
//       </ul>
//     )}
//   </div>
// );

// const JobDetails: React.FC = () => {
//   const [jobDetails, setJobDetails] = useState<JobDetailsPayload | null>(null);

//   useEffect(() => {
//     const handleJobDetails = (event: CustomEvent<JobDetailsPayload>) => {
//       console.log('Received job details:', event.detail);
//       setJobDetails(event.detail);
//     };

//     window.addEventListener('jobDetailsGenerated', handleJobDetails as EventListener);

//     return () => {
//       window.removeEventListener('jobDetailsGenerated', handleJobDetails as EventListener);
//     };
//   }, []);

//   if (!jobDetails) {
//     return (
//       <div className="bg-white/60 backdrop-blur-md border border-gray-200 rounded-xl p-6 text-center text-sm text-gray-500 shadow-md animate-fadeIn">
//         🧭 Select a job to view details and personalized tips.
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white/70 backdrop-blur-md border border-gray-100 rounded-2xl p-6 shadow-lg space-y-8 animate-fadeIn transition-all">
//       <SectionBlock
//         icon={<ClipboardList className="w-5 h-5 text-blue-600" />}
//         title="Job Summary"
//         content={jobDetails.summary}
//       />
//       <SectionBlock
//         icon={<Lightbulb className="w-5 h-5 text-green-600" />}
//         title="Interview Tips"
//         items={jobDetails.interviewTips}
//         color="text-green-700"
//       />
//       <SectionBlock
//         icon={<FileText className="w-5 h-5 text-red-600" />}
//         title="Resume Tips"
//         items={jobDetails.resumeTips}
//         color="text-red-600"
//       />
//     </div>
//   );
// };

// export default JobDetails;


'use client';

import React, { useEffect, useState } from 'react';
import { FileText, ClipboardList, Lightbulb } from 'lucide-react';

type JobDetailsPayload = {
  summary: string;
  interviewTips: string[];
  resumeTips: string[];
};

const JobDetails: React.FC = () => {
  const [jobDetails, setJobDetails] = useState<JobDetailsPayload | null>(null);

  useEffect(() => {
    const handleJobDetails = (event: CustomEvent<JobDetailsPayload>) => {
      console.log("Received job details:", event.detail);
      setJobDetails(event.detail);
    };

    window.addEventListener('jobDetailsGenerated', handleJobDetails as EventListener);

    return () => {
      window.removeEventListener('jobDetailsGenerated', handleJobDetails as EventListener);
    };
  }, []);

  if (!jobDetails) {
    return (
      <div className="bg-white border border-dashed border-gray-300 rounded-xl p-5 text-center text-sm text-gray-500 shadow-sm animate-fadeIn">
        🧭 Select a job to see tips and summary here.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-md space-y-8 animate-fadeIn">
      <div>
        <div className="flex items-center gap-2 text-gray-900 font-semibold text-lg">
          <ClipboardList className="w-5 h-5 text-blue-600" />
          Job Summary
        </div>
        <p className="mt-2 text-sm text-gray-700 leading-relaxed">{jobDetails.summary}</p>
      </div>

      <div>
        <div className="flex items-center gap-2 text-green-700 font-semibold text-md">
          <Lightbulb className="w-5 h-5" />
          Interview Tips
        </div>
        <ul className="mt-2 list-disc list-inside text-sm text-gray-800 space-y-1">
          {jobDetails.interviewTips.map((tip, idx) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
      </div>

      <div>
        <div className="flex items-center gap-2 text-red-600 font-semibold text-md">
          <FileText className="w-5 h-5" />
          Resume Tips
        </div>
        <ul className="mt-2 list-disc list-inside text-sm text-gray-800 space-y-1">
          {jobDetails.resumeTips.map((tip, idx) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JobDetails;
