// 'use client';

// import React, { useEffect, useState } from 'react';

// type ProgressEntry = {
//   questionId: string;
//   answer: string;
//   evaluationScore: number;
// };

// const QuestionProgressTracker: React.FC = () => {
//   const [progress, setProgress] = useState<ProgressEntry[]>([]);

//   useEffect(() => {
//     const handleProgressUpdate = (event: CustomEvent<ProgressEntry>) => {
//       console.log('Question progress updated:', event.detail);
//       setProgress(prev => {
//         const existing = prev.find(p => p.questionId === event.detail.questionId);
//         if (existing) {
//           return prev.map(p =>
//             p.questionId === event.detail.questionId ? event.detail : p
//           );
//         }
//         return [...prev, event.detail];
//       });
//     };

//     window.addEventListener('questionAndScoreUpdated', handleProgressUpdate as EventListener);

//     return () => {
//       window.removeEventListener('questionAndScoreUpdated', handleProgressUpdate as EventListener);
//     };
//   }, []);

//   return (
//     <div className="space-y-4">
//       <h3 className="text-lg font-semibold text-gray-900">Progress</h3>
//       {progress.map((entry, index) => (
//         <div key={index} className="border-l-2 pl-4 border-gray-300">
//           <p className="text-sm text-gray-800">
//             <strong>Q{entry.questionId}:</strong> {entry.answer}
//           </p>
//           <p className="text-sm text-gray-600">Score: {entry.evaluationScore} / 10</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default QuestionProgressTracker;


'use client';

import React, { useEffect, useState } from 'react';

type ProgressEntry = {
  questionId: string;
  answer: string;
  evaluationScore: number;
};

const QuestionProgressTracker: React.FC = () => {
  const [progress, setProgress] = useState<ProgressEntry[]>([]);

  useEffect(() => {
    const handleProgressUpdate = (event: CustomEvent<ProgressEntry>) => {
      console.log('Question progress updated:', event.detail);
      setProgress(prev => {
        const existing = prev.find(p => p.questionId === event.detail.questionId);
        if (existing) {
          return prev.map(p =>
            p.questionId === event.detail.questionId ? event.detail : p
          );
        }
        return [...prev, event.detail];
      });
    };

    window.addEventListener('questionAndScoreUpdated', handleProgressUpdate as EventListener);

    return () => {
      window.removeEventListener('questionAndScoreUpdated', handleProgressUpdate as EventListener);
    };
  }, []);

  const totalScore = progress.reduce((sum, entry) => sum + entry.evaluationScore, 0);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Progress</h3>
      <p className="text-md font-medium text-blue-700">Total Score: {totalScore}</p>
      {progress.map((entry, index) => (
        <div key={index} className="border-l-2 pl-4 border-gray-300">
          <p className="text-sm text-gray-800">
            <strong>Q{entry.questionId}:</strong> {entry.answer}
          </p>
          <p className="text-sm text-gray-600">Score: {entry.evaluationScore} / 10</p>
        </div>
      ))}
    </div>
  );
};

export default QuestionProgressTracker;
