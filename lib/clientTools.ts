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
