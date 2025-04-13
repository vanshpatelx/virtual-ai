import { DemoConfig, ParameterLocation, SelectedTool } from "@/lib/types";

function getSystemPrompt() {
  let sysPrompt: string;
  sysPrompt = `
  Tech Assessment & Career Guidance System Configuration

  Agent Role  
  Name: TechStack Career Guide

  Context: Interactive self-assessment and job guidance agent for tech professionals

  Current time: ${new Date()}

  Supported Tech Stacks and related
  JavaScript / TypeScript  
  Python  
  Golang  
  Rust  
  DevOps (Docker, Kubernetes, Terraform)  
  Frontend (React, Next.js, Vue)  
  Backend (Node.js, FastAPI, Spring Boot)  
  AI/ML (LLMs, PyTorch, TensorFlow)

  Conversation Flow  
  Greeting in 3 words → Tech Stack Selection → Ask 5 Assessment Questions → Score Evaluation → Show Strengths/Weaknesses → Career Tips → Job Finder Tool → Job Selection → Detailed Job Tips

  Tool Usage Rules  
  You must call these tools when appropriate:

  "updateTechStack" as soon as the user selects a tech stack.
  "updateQuestionProgress" after each question is answered (track how many of 5 are done).
  "updateQuestionAndScore" after each question is answered track all question with eveluation.
  "generateTips" after the score is calculated.
  "findJobs" after tips are shown and the user confirms interest in job roles.
  "getJobDetails" after the user selects a job.

  Do not emit text during tool calls.

  Response Guidelines  
  1. Conversational Format  
  Use an informal, mentor-style tone.  
  Engage the user in friendly banter when asking questions.  
  Keep responses concise (1-2 sentences per message).  
  Use empathy when suggesting improvements.

  2. Self-Assessment Scoring  
  Ask 5 skill-level questions per selected tech stack. have to ask real question of that tech stacks. 
  Rate answers by internally from 0-4 (low), 4-7 (mid), 8-10 (high).  
  Compute a final score out of 10.  

  Output:  
  - Score summary  
  - 3 strengths  
  - 3 improvement tips

  3. Job Search & Tips  
  After tips, ask if they want relevant job roles.  
  On confirmation, use "findJobs" to display job titles (max 5).  
  When user picks one, use "getJobDetails":  
  - Show job description  
  - Provide 2-3 personalized prep tips

  Standard Responses  
  Off-topic: “Hey, let's stay focused on helping your career grow!”  
  Thanks: “Happy to help. Let's keep building!”  
  No response: “Take your time—ready when you are.”  

  Error Handling  
  Incomplete answers: “No worries, can you try rephrasing that one?”  
  Tool failures: “Hmm, something broke while fetching that. Mind trying again?”  
  Invalid tech stack: “Oops, I don't know that stack yet. Wanna pick from the list I support?”

  State Management  
  Remember and update:

  - Selected tech stack ("updateTechStack")
  - Number of questions answered ("updateQuestionProgress")
  - All 5 question responses
  - All question with evaluation ("updateQuestionAndScore")
  - Generated tips ("generateTips")
  - Job choices and selected job ("findJobs", "getJobDetails")

  `;

  sysPrompt = sysPrompt.replace(/"/g, '\"')
    .replace(/\n/g, '\n');

  return sysPrompt;
}

const selectedTools: SelectedTool[] = [
  {
    temporaryTool: {
      modelToolName: "updateTechStack",
      description: "Update the selected tech stack. Call this when the user chooses or talks about a tech stack.",
      dynamicParameters: [
        {
          name: "techName",
          location: ParameterLocation.BODY,
          schema: {
            type: "string",
            description: "The name of the selected tech stack (e.g., ReactJS, Node.js, etc.)"
          },
          required: true
        }
      ],
      client: {}
    }
  },
  {
    temporaryTool: {
      modelToolName: "updateQuestionProgress",
      description: "Update the number of questions the user has answered. Call this after each question is completed.",
      dynamicParameters: [
        {
          name: "questionsAnsweredCount",
          location: ParameterLocation.BODY,
          schema: {
            type: "number",
            minimum: 0,
            maximum: 5,
            description: "The number of self-assessment questions the user has answered so far."
          },
          required: true
        }
      ],
      client: {}
    }
  },
  {
    temporaryTool: {
      modelToolName: "updateQuestionAndScore",
      description: "Update question progress and evaluation score after each question is answered.",
      dynamicParameters: [
        {
          name: "questionId",
          location: ParameterLocation.BODY,
          schema: {
            type: "string",
            description: "The unique ID or number of the question"
          },
          required: true
        },
        {
          name: "answer",
          location: ParameterLocation.BODY,
          schema: {
            type: "string",
            description: "The user's answer to the question"
          },
          required: true
        },
        {
          name: "evaluationScore",
          location: ParameterLocation.BODY,
          schema: {
            type: "number",
            minimum: 0,
            maximum: 10,
            description: "Evaluation score for the answer (0-10)"
          },
          required: true
        }
      ],
      client: {}
    }
  },
  {
    temporaryTool: {
      modelToolName: "generateTips",
      description: "Generate and display a summary, strengths, and improvement tips after the score is calculated.",
      dynamicParameters: [
        {
          name: "summary",
          location: ParameterLocation.BODY,
          schema: {
            type: "string",
            description: "A brief summary of the overall performance"
          },
          required: true
        },
        {
          name: "strengths",
          location: ParameterLocation.BODY,
          schema: {
            type: "array",
            items: {
              type: "string",
              description: "One identified strength"
            },
            description: "List of 3 strengths based on the assessment"
          },
          required: true
        },
        {
          name: "improvementTips",
          location: ParameterLocation.BODY,
          schema: {
            type: "array",
            items: {
              type: "string",
              description: "One tip for improvement"
            },
            description: "List of 3 tips to improve performance"
          },
          required: true
        }
      ],
      client: {}
    }
  },
  {
    temporaryTool: {
      modelToolName: "selectJob",
      description: "Filter jobs based on the user's selected skills or tech stack.",
      dynamicParameters: [
        {
          name: "skills",
          location: ParameterLocation.BODY,
          schema: {
            type: "array",
            items: {
              type: "string",
              description: "A skill (e.g., Node.js, React, etc.), we only send Node or React or always like this format"
            },
            description: "List of relevant skills to filter jobs"
          },
          required: true
        }
      ],
      client: {}
    }
  },
  {
    temporaryTool: {
      modelToolName: "chooseSpecificJob",
      description: "Select a specific job by ID to get summary, interview, and resume tips.",
      dynamicParameters: [
        {
          name: "jobId",
          location: ParameterLocation.BODY,
          schema: {
            type: "string",
            description: "The ID of the selected job"
          },
          required: true
        }
      ],
      client: {}
    }
  }

];

export const demoConfig: DemoConfig = {
  title: "TechStack Career Guide",
  overview: "This agent helps users assess their tech skills and discover relevant job roles with personalized guidance.",
  callConfig: {
    systemPrompt: getSystemPrompt(),
    model: "fixie-ai/ultravox-70B",
    languageHint: "en",
    selectedTools: selectedTools,
    voice: "terrence",
    temperature: 0.4
  }
};


export default demoConfig;