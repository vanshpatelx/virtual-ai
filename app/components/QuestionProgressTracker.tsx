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

//   const totalScore = progress.reduce((sum, entry) => sum + entry.evaluationScore, 0);

//   return (
//     <div className="space-y-4">
//       <h3 className="text-lg font-semibold text-gray-900">Progress</h3>
//       <p className="text-md font-medium text-blue-700">Total Score: {totalScore}</p>
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
import { CircleCheck, CircleX } from 'lucide-react';

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

  // const totalScore = progress.reduce((sum, entry) => sum + entry.evaluationScore, 0);
  // const totalScore = progress.reduce((sum, entry) => sum + Number(entry.evaluationScore), 0);


  const totalScore = progress
  .map(entry => Number(entry.evaluationScore))
  .reduce((sum, score) => sum + score, 0);

  return (
    <div className="space-y-4 bg-gray-50 rounded-lg p-4 shadow-sm animate-fadeIn">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Question Progress</h3>
        <p className="text-md font-medium text-blue-700">Total Score: {totalScore}</p>
      </div>

      <div className="space-y-3">
        {progress.map((entry, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-3 bg-white shadow-sm transition-all"
          >
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-800 font-medium">
                Q{entry.questionId}
              </p>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  entry.evaluationScore >= 7
                    ? 'bg-green-100 text-green-700'
                    : entry.evaluationScore >= 4
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {entry.evaluationScore} / 10
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{entry.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionProgressTracker;
