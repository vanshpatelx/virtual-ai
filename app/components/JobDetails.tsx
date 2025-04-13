'use client';

import React, { useEffect, useState } from 'react';
import { ClipboardCheck } from 'lucide-react';

const JobDetails: React.FC = () => {
  const [jobId, setJobId] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [interviewTips, setInterviewTips] = useState<string[]>([]);
  const [resumeTips, setResumeTips] = useState<string[]>([]);

  useEffect(() => {
    const handleSelectedJob = (event: CustomEvent<{ jobId: string }>) => {
      const { jobId } = event.detail;
      setJobId(jobId);

      // Simulated logic – replace with API in real scenario
      setSummary(`This role focuses on ${jobId === '1' ? 'Node.js backend development' : 'fullstack delivery using modern tools'}.`);
      setInterviewTips([
        'Review core concepts in Node.js/React.',
        'Prepare for system design rounds.',
        'Practice explaining your past project experience.'
      ]);
      setResumeTips([
        'Highlight relevant stack (e.g., Node.js, React).',
        'Quantify impact (e.g., performance, cost savings).',
        'Tailor keywords to match job description.'
      ]);
    };

    window.addEventListener('selectedJobDetails', handleSelectedJob as EventListener);

    return () => {
      window.removeEventListener('selectedJobDetails', handleSelectedJob as EventListener);
    };
  }, []);

  if (!jobId) {
    return (
      <div className="text-gray-400 text-sm text-center py-4">
        <ClipboardCheck className="mx-auto mb-2 w-5 h-5" />
        Select a job to view its details and preparation tips.
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      <div>
        <h3 className="text-base font-semibold">Job Summary</h3>
        <p className="text-sm text-gray-700">{summary}</p>
      </div>
      <div>
        <h3 className="text-base font-semibold">Interview Tips</h3>
        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
          {interviewTips.map((tip, idx) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-base font-semibold">Resume Tips</h3>
        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
          {resumeTips.map((tip, idx) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JobDetails;
