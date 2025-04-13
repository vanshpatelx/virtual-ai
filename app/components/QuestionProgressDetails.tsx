// 'use client';

// import React, { useState, useEffect } from 'react';

// const QuestionProgressDetails: React.FC = () => {
//   const [questionsAnsweredCount, setQuestionsAnsweredCount] = useState<number>(0);

//   useEffect(() => {
//     const handleProgressUpdate = (event: CustomEvent<{ questionsAnsweredCount: number }>) => {
//       console.log('Received progress update:', event.detail);
//       setQuestionsAnsweredCount(event.detail.questionsAnsweredCount);
//     };

//     window.addEventListener('questionProgressUpdated', handleProgressUpdate as EventListener);

//     return () => {
//       window.removeEventListener('questionProgressUpdated', handleProgressUpdate as EventListener);
//     };
//   }, []);

//   return (
//     <div>
//       {questionsAnsweredCount === 0 ? (
//         <div className="text-center text-gray-900 text-sm py-4">
//           No questions answered yet. Start the self-assessment to track your progress.
//         </div>
//       ) : (
//         <div className="pl-4 border-l-2 border-blue-300">
//           <span className="text-gray-900 font-medium">
//             Progress: {questionsAnsweredCount} / 5 questions answered
//           </span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuestionProgressDetails;


'use client';

import React, { useState, useEffect } from 'react';

const TOTAL_QUESTIONS = 5;

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

  const percentage = (questionsAnsweredCount / TOTAL_QUESTIONS) * 100;

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm animate-fadeIn space-y-3">
      <h3 className="text-lg font-semibold text-gray-900">Your Progress</h3>

      {questionsAnsweredCount === 0 ? (
        <p className="text-sm text-gray-600 text-center">
          No questions answered yet. Start the self-assessment to track your progress.
        </p>
      ) : (
        <>
          <p className="text-sm text-gray-800">
            <strong>{questionsAnsweredCount}</strong> out of <strong>{TOTAL_QUESTIONS}</strong> questions answered
          </p>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default QuestionProgressDetails;
