'use client';
import { UltravoxSession, UltravoxSessionStatus, Transcript, UltravoxExperimentalMessageEvent, Role } from 'ultravox-client';
import { JoinUrlResponse, CallConfig } from '@/lib/types';
import { updateOrderTool, highlightProductTool, updateTechStackTool, updateQuestionProgressTool, updateQuestionAndScoreTool, generateTipsTool, selectJobTool, chooseSpecificJobTool} from '@/lib/clientTools';

let uvSession: UltravoxSession | null = null;
const debugMessages: Set<string> = new Set(["debug"]);

interface CallCallbacks {
  onStatusChange: (status: UltravoxSessionStatus | string | undefined) => void;
  onTranscriptChange: (transcripts: Transcript[] | undefined) => void;
  onDebugMessage?: (message: UltravoxExperimentalMessageEvent ) => void;
}

export function toggleMute(role: Role): void {

  if (uvSession) {
    // Toggle (user) Mic
    if (role == Role.USER) {
      uvSession.isMicMuted ? uvSession.unmuteMic() : uvSession.muteMic();
    } 
    // Mute (agent) Speaker
    else {
      uvSession.isSpeakerMuted ? uvSession.unmuteSpeaker() : uvSession.muteSpeaker();
    }
  } else {
    console.error('uvSession is not initialized.');
  }
}

async function createCall(callConfig: CallConfig, showDebugMessages?: boolean): Promise<JoinUrlResponse> {

  try {
    if(showDebugMessages) {
      console.log(`Using model ${callConfig.model}`);
    }

    const response = await fetch(`/api/ultravox`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...callConfig }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    const data: JoinUrlResponse = await response.json();

    if(showDebugMessages) {
      console.log(`Call created. Join URL: ${data.joinUrl}`);
    }
    
    return data;
  } catch (error) {
    console.error('Error creating call:', error);
    throw error;
  }
}

export async function startCall(callbacks: CallCallbacks, callConfig: CallConfig, showDebugMessages?: boolean): Promise<void> {
  try {
    const callData = await createCall(callConfig, showDebugMessages);
    const joinUrl = callData.joinUrl;

    if (!joinUrl) {
      console.error('Join URL is required');
      return;
    }

    console.log('Joining call:', joinUrl);

    // Start up our Ultravox Session
    uvSession = new UltravoxSession({
      onStatusChange: (status) => callbacks.onStatusChange(status),
      onTranscriptChange: (transcripts) => callbacks.onTranscriptChange(transcripts),
      onDebugMessage: (msg) => callbacks.onDebugMessage?.(msg)
    });

    // Register our tools
    uvSession.registerToolImplementation("updateOrder", updateOrderTool);
    uvSession.registerToolImplementation("highlightProduct", highlightProductTool);
    uvSession.registerToolImplementation("updateTechStack", updateTechStackTool);
    uvSession.registerToolImplementation("updateQuestionProgress", updateQuestionProgressTool);
    uvSession.registerToolImplementation("updateQuestionAndScore", updateQuestionAndScoreTool);
    uvSession.registerToolImplementation("generateTips", generateTipsTool);

// Register job-related tools
uvSession.registerToolImplementation("findJobs", selectJobTool);
uvSession.registerToolImplementation("getJobDetails", chooseSpecificJobTool);

    if(showDebugMessages) {
      console.log('uvSession created:', uvSession);
    }

    await uvSession.joinCall(joinUrl);
    console.log('Call started!');

  } catch (error) {
    console.error('Failed to start call:', error);
    throw error;
  }
}

export async function endCall(): Promise<void> {
  console.log('Call ended.');

  if (uvSession) {
    uvSession.leaveCall();
    uvSession = null;
  }

  // Dispatch a custom event when the call ends so that we can clear the order details form
  if (typeof window !== 'undefined') {
    const event = new CustomEvent('callEnded');
    window.dispatchEvent(event);
  }

}