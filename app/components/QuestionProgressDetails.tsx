'use client';

import React, { useState, useEffect } from 'react';

const QuestionProgressDetails: React.FC = () => {
  const [questionsAnsweredCount, setQuestionsAnsweredCount] = useState<number>(0);

  useEffect(() => {
    const handleProgressUpdate = (event: CustomEvent<{ questionsAnsweredCount: number }>) => {
      console.log('Received progress update:', event.detail);
      setQuestionsAnsweredCount(event.detail.questionsAnsweredCount);
    };

    window.addEventListener('questionProgressUpdated', handleProgressUpdate as EventListener);

    return () => {
      window.removeEventListener('questionProgressUpdated', handleProgressUpdate as EventListener);
    };
  }, []);

  return (
    <div>
      {questionsAnsweredCount === 0 ? (
        <div className="text-center text-gray-900 text-sm py-4">
          No questions answered yet. Start the self-assessment to track your progress.
        </div>
      ) : (
        <div className="pl-4 border-l-2 border-blue-300">
          <span className="text-gray-900 font-medium">
            Progress: {questionsAnsweredCount} / 5 questions answered
          </span>
        </div>
      )}
    </div>
  );
};

export default QuestionProgressDetails;
