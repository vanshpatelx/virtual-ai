import { ClientToolImplementation } from 'ultravox-client';

// Client-implemented tool for Order Details
export const updateOrderTool: ClientToolImplementation = (parameters) => {
  const { orderDetailsData } = parameters;
  console.debug("Received order details update:", orderDetailsData);

  if (typeof window !== "undefined") {
    const event = new CustomEvent("orderDetailsUpdated", {
      detail: orderDetailsData
    });
    window.dispatchEvent(event);
  }

  return "Updated the order details.";
};
export const selectJobTool: ClientToolImplementation = (parameters) => {
  const { skills } = parameters;

  console.debug("Filtering jobs based on skills:", skills);

  if (typeof window !== "undefined") {
    const event = new CustomEvent("filteredJobs", {
      detail: { skills }
    });
    window.dispatchEvent(event);
  }

  return `Filtered jobs for skills: ${skills.join(', ')}`;
};

export const generateJobDetailsTool: ClientToolImplementation = (parameters) => {
  const { summary, interviewTips, resumeTips } = parameters;

  console.debug("Generated job details:", { summary, interviewTips, resumeTips });

  if (typeof window !== "undefined") {
    const event = new CustomEvent('jobDetailsGenerated', {
      detail: { summary, interviewTips, resumeTips }
    });
    window.dispatchEvent(event);
  }

  return "Displayed job details with interview and resume tips.";
};


// export const chooseSpecificJobTool: ClientToolImplementation = (parameters) => {
//   const { jobId } = parameters;

//   console.debug("Selected job for details:", jobId);

//   if (typeof window !== "undefined") {
//     const event = new CustomEvent("selectedJobDetails", {
//       detail: { jobId }
//     });
//     window.dispatchEvent(event);
//   }

//   return `Selected job with ID: ${jobId} and fetched summary, interview tips, and resume advice.`;
// };

export const chooseSpecificJobTool: ClientToolImplementation = (parameters) => {
  const { company, role } = parameters;

  console.debug("Selected company and role:", company, role);

  // Simulated job ID generation logic based on company and role.
  const jobId = `${company}-${role}`;

  if (typeof window !== "undefined") {
    const event = new CustomEvent("selectedJobDetails", {
      detail: { jobId }
    });
    window.dispatchEvent(event);
  }

  return `Selected job for company: ${company}, role: ${role} with ID: ${jobId} and fetched summary, interview tips, and resume advice.`;
};


export const generateTipsTool: ClientToolImplementation = (parameters) => {
  const { summary, strengths, improvementTips } = parameters;

  console.debug("Generated feedback tips:", { summary, strengths, improvementTips });

  if (typeof window !== "undefined") {
    const event = new CustomEvent("assessmentTipsGenerated", {
      detail: { summary, strengths, improvementTips }
    });
    window.dispatchEvent(event);
  }

  return "Displayed assessment feedback with strengths and improvement tips.";
};


export const updateTechStackTool: ClientToolImplementation = (parameters) => {
  const { techName } = parameters;
  console.debug("Received tech stack update:", techName);

  if (typeof window !== "undefined") {
    const event = new CustomEvent("techStackUpdated", {
      detail: techName
    });
    window.dispatchEvent(event);
  }

  return `Updated tech stack to ${techName}`;
};

export const updateQuestionProgressTool: ClientToolImplementation = (parameters) => {
  const { questionsAnsweredCount } = parameters;
  console.debug("Received question progress update:", questionsAnsweredCount);

  if (typeof window !== "undefined") {
    const event = new CustomEvent("questionProgressUpdated", {
      detail: {
        questionsAnsweredCount
      }
    });
    window.dispatchEvent(event);
  }

  return `Updated question progress to ${questionsAnsweredCount}/5`;
};

export const updateQuestionAndScoreTool: ClientToolImplementation = (parameters) => {
  const { questionId, answer, evaluationScore } = parameters;

  console.debug("Updating question and score:", { questionId, answer, evaluationScore });

  if (typeof window !== "undefined") {
    const event = new CustomEvent("questionAndScoreUpdated", {
      detail: { questionId, answer, evaluationScore }
    });
    window.dispatchEvent(event);
  }

  return `Question ${questionId} evaluated with score ${evaluationScore}`;
};

// Client-implemented tool for Product Highlighting
export const highlightProductTool: ClientToolImplementation = (parameters) => {
  const { productName, action } = parameters;
  console.debug(`Highlighting product: ${productName}, action: ${action}`);

  // Normalize the product name to match the display names
  const normalizedName = productName.toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  if (typeof window !== "undefined") {
    const event = new CustomEvent("productHighlight", {
      detail: { 
        productName: normalizedName, 
        action 
      }
    });
    window.dispatchEvent(event);
  }

  return `${action === 'show' ? 'Highlighted' : 'Unhighlighted'} ${normalizedName}`;
};
