'use client';

import React, { useEffect, useState } from 'react';

type TipsPayload = {
  summary: string;
  strengths: string[];
  improvementTips: string[];
};

const AssessmentFeedback: React.FC = () => {
  const [feedback, setFeedback] = useState<TipsPayload | null>(null);

  useEffect(() => {
    const handleTipsGenerated = (event: CustomEvent<TipsPayload>) => {
      console.log("Received assessment tips:", event.detail);
      setFeedback(event.detail);
    };

    window.addEventListener('assessmentTipsGenerated', handleTipsGenerated as EventListener);

    return () => {
      window.removeEventListener('assessmentTipsGenerated', handleTipsGenerated as EventListener);
    };
  }, []);

  if (!feedback) {
    return (
      <div className="text-sm text-center text-gray-500 py-4">
        Feedback will appear here once the score is calculated.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Assessment Summary</h3>
      <p className="text-gray-700">{feedback.summary}</p>

      <div>
        <h4 className="text-md font-semibold text-green-700">💪 Strengths</h4>
        <ul className="list-disc list-inside text-gray-800">
          {feedback.strengths.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-md font-semibold text-red-600">📌 Improvement Tips</h4>
        <ul className="list-disc list-inside text-gray-800">
          {feedback.improvementTips.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AssessmentFeedback;
