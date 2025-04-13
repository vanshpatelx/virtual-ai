// 'use client';

// import React, { useEffect, useState } from 'react';
// import { BadgeCheck } from 'lucide-react';
// import clsx from 'clsx';

// interface Job {
//     id: string;
//     title: string;
//     company: string;
//     skills: string[];
//     location: string;
//     link: string;
// }

// const SelectedJobs: React.FC = () => {
//     const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
//     const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

//     useEffect(() => {
//         const handleFilteredJobs = (event: CustomEvent<{ skills: string[] }>) => {
//             const { skills } = event.detail;

//             const allJobs: Job[] = [
//                 {
//                     id: '1',
//                     title: 'Node Developer/Backend Developer',
//                     company: 'Accel Fintech Pvt Ltd',
//                     location: 'Gandhinagar, Gujarat',
//                     skills: ['Node', 'Backend Development', 'SQL'],
//                     link: 'https://in.indeed.com/job/node-js-developer-backend-developer-gandhinagar-gujarat'
//                 },
//                 {
//                     id: '2',
//                     title: 'React (Frontend Developer)',
//                     company: 'BITNET Infotech',
//                     location: 'Rajkot, Gujarat',
//                     skills: ['React', 'JavaScript', 'ES6'],
//                     link: 'https://in.indeed.com/job/react-js-frontend-developer-rajkot-gujarat'
//                 },
//                 {
//                     id: '3',
//                     title: 'React Developer',
//                     company: 'Dasinfomedia',
//                     location: 'Ahmedabad, Gujarat',
//                     skills: ['React', 'JavaScript', 'Web Development'],
//                     link: 'https://in.indeed.com/job/react-js-developer-ahmedabad-gujarat'
//                 },
//                 {
//                     id: '4',
//                     title: 'Node Developer',
//                     company: 'Webcreta Technologies',
//                     location: 'Gota, Ahmedabad, Gujarat',
//                     skills: ['Node', 'NestJS', 'Backend Development'],
//                     link: 'https://in.indeed.com/job/node-js-developer-gota-ahmedabad-gujarat'
//                 },
//                 {
//                     id: '5',
//                     title: 'React Developer',
//                     company: 'Amar Infotech',
//                     location: 'Ahmedabad, Gujarat',
//                     skills: ['React', 'Redux', 'Frontend Development'],
//                     link: 'https://in.indeed.com/job/react-js-developer-ahmedabad-gujarat'
//                 },
//                 {
//                     id: '6',
//                     title: 'Node Developer',
//                     company: 'Dasinfomedia',
//                     location: 'Ahmedabad, Gujarat',
//                     skills: ['Node', 'Full Stack Development', 'Backend Development'],
//                     link: 'https://in.indeed.com/job/node-js-developer-ahmedabad-gujarat'
//                 },
//                 {
//                     id: '7',
//                     title: 'Senior Node Developer',
//                     company: 'Accrete Infosolution Technologies LLP',
//                     location: 'Gandhinagar, Gujarat',
//                     skills: ['Node', 'Backend Development', 'API Development'],
//                     link: 'https://in.indeed.com/job/senior-node-js-developer-gandhinagar-gujarat'
//                 },
//                 {
//                     id: '8',
//                     title: 'API Developer (Node)',
//                     company: 'Harvesting India Pvt Ltd',
//                     location: 'Thaltej, Ahmedabad, Gujarat',
//                     skills: ['Node', 'API Development', 'Backend Development'],
//                     link: 'https://in.indeed.com/job/api-developer-node-js-thaltej-ahmedabad-gujarat'
//                 },
//                 {
//                     id: '9',
//                     title: 'React Developer',
//                     company: 'Rayvat Outsourcing',
//                     location: 'Gandhinagar, Gujarat',
//                     skills: ['React', 'Frontend Development', 'JavaScript'],
//                     link: 'https://in.indeed.com/job/react-js-developer-gandhinagar-gujarat'
//                 },
//                 {
//                     id: '10',
//                     title: 'React Developer',
//                     company: 'Dentaweb Services',
//                     location: 'Ahmedabad, Gujarat',
//                     skills: ['React', 'UI Development', 'JavaScript'],
//                     link: 'https://in.indeed.com/job/react-js-developer-ahmedabad-gujarat'
//                 },
//                 {
//                     id: '11',
//                     title: 'React Developer',
//                     company: 'Codoinner Solution',
//                     location: 'Surat, Gujarat',
//                     skills: ['React', 'Node', 'Nest.js'],
//                     link: 'https://in.indeed.com/job/react-js-developer-surat-gujarat'
//                 },
//                 {
//                     id: '12',
//                     title: 'React + Next.js Developer',
//                     company: 'Intelivita',
//                     location: 'Science City, Ahmedabad, Gujarat',
//                     skills: ['React', 'Next.js', 'Frontend Development'],
//                     link: 'https://in.indeed.com/job/react-js-next-js-developer-science-city-ahmedabad-gujarat'
//                 },
//                 {
//                     id: '13',
//                     title: 'PHP | Node | React Developer',
//                     company: 'Logistic Infotech',
//                     location: 'Gujarat',
//                     skills: ['PHP', 'Node', 'React'],
//                     link: 'https://in.indeed.com/job/php-node-js-react-js-developer-gujarat'
//                 },
//                 {
//                     id: '14',
//                     title: 'React / Node Developer',
//                     company: 'Wings Tech Solutions',
//                     location: 'Rajkot, Gujarat',
//                     skills: ['React', 'Node', 'Web Development'],
//                     link: 'https://in.indeed.com/job/react-js-node-js-developer-rajkot-gujarat'
//                 },
//                 {
//                     id: '15',
//                     title: 'Node Developer',
//                     company: 'Arccus Inc',
//                     location: 'Rajkot, Gujarat',
//                     skills: ['Node', 'JavaScript', 'Backend Development'],
//                     link: 'https://in.indeed.com/job/node-js-developer-rajkot-gujarat'
//                 },
//                 {
//                     id: '16',
//                     title: 'React Developer',
//                     company: 'OmTec Web',
//                     location: 'Surat, Gujarat',
//                     skills: ['React', 'JavaScript', 'Frontend Development'],
//                     link: 'https://www.glassdoor.com/Job/gujarat-reactjs-developer-jobs-SRCH_IL.0,7_IS4938_KO8,25.htm'
//                 },
//                 {
//                     id: '17',
//                     title: 'React Developer',
//                     company: 'Yiion Systems',
//                     location: 'Mehsana, Gujarat',
//                     skills: ['React', 'Frontend Development', 'JavaScript'],
//                     link: 'https://www.glassdoor.com/Job/gujarat-reactjs-developer-jobs-SRCH_IL.0,7_IS4938_KO8,25.htm'
//                 },
//                 {
//                     id: '18',
//                     title: 'React Developer',
//                     company: 'Zithas Technologies',
//                     location: 'Gujarat',
//                     skills: ['React', 'Frontend Development', 'JavaScript'],
//                     link: 'https://www.glassdoor.com/Job/gujarat-reactjs-developer-jobs-SRCH_IL.0,7_IS4938_KO8,25.htm'
//                 }
//             ];
//             const filtered = allJobs.filter((job) =>
//                 job.skills.some((skill) => skills.includes(skill))
//             );

//             setFilteredJobs(filtered);
//         };

//         window.addEventListener('filteredJobs', handleFilteredJobs as EventListener);

//         return () => {
//             window.removeEventListener('filteredJobs', handleFilteredJobs as EventListener);
//         };
//     }, []);

//     const handleSelectJob = (jobId: string) => {
//         setSelectedJobId(jobId);

//         const event = new CustomEvent('selectedJobDetails', {
//             detail: { jobId }
//         });
//         window.dispatchEvent(event);
//     };

//     return (
//         <div className="space-y-3 mt-4">
//             {filteredJobs.length === 0 ? (
//                 <div className="text-gray-500 text-sm">No jobs match your selected skills.</div>
//             ) : (
//                 filteredJobs.map((job) => (
//                     <div
//                         key={job.id}
//                         onClick={() => handleSelectJob(job.id)}
//                         className={clsx(
//                             'cursor-pointer border p-4 rounded-lg transition-all',
//                             selectedJobId === job.id
//                                 ? 'bg-blue-50 border-blue-500 shadow-sm'
//                                 : 'hover:bg-gray-50'
//                         )}
//                     >
//                         <div className="flex justify-between items-center">
//                             <div>
//                                 <div className="text-base font-semibold">{job.title}</div>
//                                 <div className="text-sm text-gray-500">{job.company}</div>
//                                 <div className="flex flex-wrap gap-1 mt-1">
//                                     {job.skills.map((skill) => (
//                                         <span key={skill} className="text-xs bg-gray-100 px-2 py-1 rounded">
//                                             {skill}
//                                         </span>
//                                     ))}
//                                 </div>
//                             </div>
//                             {selectedJobId === job.id && <BadgeCheck className="text-blue-500 w-5 h-5" />}
//                         </div>
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// };

// export default SelectedJobs;




'use client';

import React, { useEffect, useState } from 'react';
import { BadgeCheck } from 'lucide-react';
import clsx from 'clsx';

interface Job {
    id: string;
    title: string;
    company: string;
    skills: string[];
    location: string;
    link: string;
}

const SelectedJobs: React.FC = () => {
    const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
    const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

    useEffect(() => {
        const handleFilteredJobs = (event: CustomEvent<{ skills: string[] }>) => {
            const { skills } = event.detail;

            const allJobs: Job[] = [
                {
                    id: '1',
                    title: 'Node Developer/Backend Developer',
                    company: 'Accel Fintech Pvt Ltd',
                    location: 'Gandhinagar, Gujarat',
                    skills: ['Node', 'Backend Development', 'SQL'],
                    link: 'https://in.indeed.com/job/node-js-developer-backend-developer-gandhinagar-gujarat'
                },
                {
                    id: '2',
                    title: 'React (Frontend Developer)',
                    company: 'BITNET Infotech',
                    location: 'Rajkot, Gujarat',
                    skills: ['React', 'JavaScript', 'ES6'],
                    link: 'https://in.indeed.com/job/react-js-frontend-developer-rajkot-gujarat'
                },
                {
                    id: '3',
                    title: 'React Developer',
                    company: 'Dasinfomedia',
                    location: 'Ahmedabad, Gujarat',
                    skills: ['React', 'JavaScript', 'Web Development'],
                    link: 'https://in.indeed.com/job/react-js-developer-ahmedabad-gujarat'
                },
                {
                    id: '4',
                    title: 'Node Developer',
                    company: 'Webcreta Technologies',
                    location: 'Gota, Ahmedabad, Gujarat',
                    skills: ['Node', 'NestJS', 'Backend Development'],
                    link: 'https://in.indeed.com/job/node-js-developer-gota-ahmedabad-gujarat'
                },
                {
                    id: '5',
                    title: 'React Developer',
                    company: 'Amar Infotech',
                    location: 'Ahmedabad, Gujarat',
                    skills: ['React', 'Redux', 'Frontend Development'],
                    link: 'https://in.indeed.com/job/react-js-developer-ahmedabad-gujarat'
                },
                {
                    id: '6',
                    title: 'Node Developer',
                    company: 'Dasinfomedia',
                    location: 'Ahmedabad, Gujarat',
                    skills: ['Node', 'Full Stack Development', 'Backend Development'],
                    link: 'https://in.indeed.com/job/node-js-developer-ahmedabad-gujarat'
                },
                {
                    id: '7',
                    title: 'Senior Node Developer',
                    company: 'Accrete Infosolution Technologies LLP',
                    location: 'Gandhinagar, Gujarat',
                    skills: ['Node', 'Backend Development', 'API Development'],
                    link: 'https://in.indeed.com/job/senior-node-js-developer-gandhinagar-gujarat'
                },
                {
                    id: '8',
                    title: 'API Developer (Node)',
                    company: 'Harvesting India Pvt Ltd',
                    location: 'Thaltej, Ahmedabad, Gujarat',
                    skills: ['Node', 'API Development', 'Backend Development'],
                    link: 'https://in.indeed.com/job/api-developer-node-js-thaltej-ahmedabad-gujarat'
                },
                {
                    id: '9',
                    title: 'React Developer',
                    company: 'Rayvat Outsourcing',
                    location: 'Gandhinagar, Gujarat',
                    skills: ['React', 'Frontend Development', 'JavaScript'],
                    link: 'https://in.indeed.com/job/react-js-developer-gandhinagar-gujarat'
                },
                {
                    id: '10',
                    title: 'React Developer',
                    company: 'Dentaweb Services',
                    location: 'Ahmedabad, Gujarat',
                    skills: ['React', 'UI Development', 'JavaScript'],
                    link: 'https://in.indeed.com/job/react-js-developer-ahmedabad-gujarat'
                },
                {
                    id: '11',
                    title: 'React Developer',
                    company: 'Codoinner Solution',
                    location: 'Surat, Gujarat',
                    skills: ['React', 'Node', 'Nest.js'],
                    link: 'https://in.indeed.com/job/react-js-developer-surat-gujarat'
                },
                {
                    id: '12',
                    title: 'React + Next.js Developer',
                    company: 'Intelivita',
                    location: 'Science City, Ahmedabad, Gujarat',
                    skills: ['React', 'Next.js', 'Frontend Development'],
                    link: 'https://in.indeed.com/job/react-js-next-js-developer-science-city-ahmedabad-gujarat'
                },
                {
                    id: '13',
                    title: 'PHP | Node | React Developer',
                    company: 'Logistic Infotech',
                    location: 'Gujarat',
                    skills: ['PHP', 'Node', 'React'],
                    link: 'https://in.indeed.com/job/php-node-js-react-js-developer-gujarat'
                },
                {
                    id: '14',
                    title: 'React / Node Developer',
                    company: 'Wings Tech Solutions',
                    location: 'Rajkot, Gujarat',
                    skills: ['React', 'Node', 'Web Development'],
                    link: 'https://in.indeed.com/job/react-js-node-js-developer-rajkot-gujarat'
                },
                {
                    id: '15',
                    title: 'Node Developer',
                    company: 'Arccus Inc',
                    location: 'Rajkot, Gujarat',
                    skills: ['Node', 'JavaScript', 'Backend Development'],
                    link: 'https://in.indeed.com/job/node-js-developer-rajkot-gujarat'
                },
                {
                    id: '16',
                    title: 'React Developer',
                    company: 'OmTec Web',
                    location: 'Surat, Gujarat',
                    skills: ['React', 'JavaScript', 'Frontend Development'],
                    link: 'https://www.glassdoor.com/Job/gujarat-reactjs-developer-jobs-SRCH_IL.0,7_IS4938_KO8,25.htm'
                },
                {
                    id: '17',
                    title: 'React Developer',
                    company: 'Yiion Systems',
                    location: 'Mehsana, Gujarat',
                    skills: ['React', 'Frontend Development', 'JavaScript'],
                    link: 'https://www.glassdoor.com/Job/gujarat-reactjs-developer-jobs-SRCH_IL.0,7_IS4938_KO8,25.htm'
                },
                {
                    id: '18',
                    title: 'React Developer',
                    company: 'Zithas Technologies',
                    location: 'Gujarat',
                    skills: ['React', 'Frontend Development', 'JavaScript'],
                    link: 'https://www.glassdoor.com/Job/gujarat-reactjs-developer-jobs-SRCH_IL.0,7_IS4938_KO8,25.htm'
                }
            ];
            const filtered = allJobs.filter((job) =>
                job.skills.some((skill) => skills.includes(skill))
            );

            setFilteredJobs(filtered);
        };

        window.addEventListener('filteredJobs', handleFilteredJobs as EventListener);

        return () => {
            window.removeEventListener('filteredJobs', handleFilteredJobs as EventListener);
        };
    }, []);

    const handleSelectJob = (jobId: string) => {
        setSelectedJobId(jobId);
        const event = new CustomEvent('selectedJobDetails', { detail: { jobId } });
        window.dispatchEvent(event);
    };

    return (
        <div className="space-y-4 mt-6">
            {filteredJobs.length === 0 ? (
                <div className="text-center text-gray-500 text-sm py-4">
                    No jobs match your selected skills.
                </div>
            ) : (
                filteredJobs.map((job) => {
                    const isSelected = selectedJobId === job.id;
                    return (
                        <div
                            key={job.id}
                            onClick={() => handleSelectJob(job.id)}
                            className={clsx(
                                'cursor-pointer border rounded-xl p-4 transition-all duration-300 ease-in-out',
                                isSelected
                                    ? 'bg-blue-50 border-blue-500 shadow-md scale-[1.01]'
                                    : 'hover:bg-gray-50 border-gray-200'
                            )}
                        >
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <h4 className="text-base font-semibold text-gray-900">{job.title}</h4>
                                    <p className="text-sm text-gray-600">{job.company} — <span className="italic">{job.location}</span></p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {job.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                {isSelected && <BadgeCheck className="text-blue-500 w-5 h-5 mt-1" />}
                            </div>
                            <a
                                href={job.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block text-sm text-blue-600 hover:underline mt-3"
                            >
                                View Job →
                            </a>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default SelectedJobs;
