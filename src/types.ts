export type TradeType = 
  | 'smarthome' 
  | 'drywall' 
  | 'plumbing' 
  | 'electrical' 
  | 'decking' 
  | 'crawlspace' 
  | 'gutters';

export type CampaignType = 'ai_can' | 'ai_cant';

export type ModelType = 'gemini-3.5-flash' | 'gemini-2.5-flash' | 'veo-3.1-lite-generate-001';

export type PipelineStepStatus = 'idle' | 'running' | 'completed' | 'failed';

export interface TTSVoiceoverSpec {
  voiceId: string;
  speed: number;
  pitch: number;
  textScript: string;
  scriptureHook: string;
  ctaText: string;
  durationEstimateSec: number;
}

export interface VeoPromptPayload {
  model: string;
  aspectRatio: '9:16';
  resolution: '8k' | '4k' | '1080p';
  framerate: 60 | 30;
  stylePreset: 'photorealistic' | 'hyper-real-surrealist-comedy';
  prompt: string;
  negativePrompt: string;
}

export interface PublishingMetadata {
  platforms: ('tiktok' | 'youtube_shorts' | 'ig_reels' | 'fb_reels')[];
  title: string;
  caption: string;
  hashtags: string[];
  targetLocation: 'Athens & Atlanta, GA';
  brandUrl: 'shomerepair.com';
}

export interface AgentResponse {
  agentName: string;
  executionTimeMs: number;
  orchestratorDecision: string;
  veoPayload: VeoPromptPayload;
  ttsSpec: TTSVoiceoverSpec;
  metadata: PublishingMetadata;
}

export interface VideoJob {
  id: string;
  createdAt: string;
  trade: TradeType;
  campaign: CampaignType;
  status: 'draft' | 'processing' | 'rendered' | 'queued';
  pipelineStep: number;
  agentResponse?: AgentResponse;
}
