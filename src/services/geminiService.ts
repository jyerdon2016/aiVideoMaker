import { TradeType, CampaignType, AgentResponse } from '../types';

const SCRIPTURE_HOOKS = {
  proverbs: "Proverbs 16:3 - 'Commit to the LORD whatever you do, and he will establish your plans.'",
  hebrews: "Hebrews 3:4 - 'For every house is built by someone, but God is the builder of everything.'"
};

const SURREAL_GLITCHES: Record<TradeType, string> = {
  drywall: "Painter sprouting a 3rd arm while drywall sheet melts into warm cheddar cheese and drips onto hardwood floors.",
  plumbing: "Heavy pipe wrench warping into cooked spaghetti under a sink while water floats upward in zero gravity.",
  electrical: "Breaker box wiring looping infinitely into glowing noodle chaos with friendly sparks writing binary code.",
  decking: "Wooden support posts bending like flexible rubber pool noodles as a deck sways in slow motion.",
  crawlspace: "Crawlspace vapor barrier expanding into a bouncy castle inside a misty Georgia basement.",
  gutters: "Gutter downspout dispensing infinite multicolored marbles instead of rainwater during a thunderstorm.",
  smarthome: "Motorized shades smoothly gliding as ambient bath warmers turn on, controlled by a sleek glass touch panel."
};

export async function orchestrateVideoProduction(
  trade: TradeType,
  campaign: CampaignType,
  onStepChange?: (step: number, label: string) => void
): Promise<AgentResponse> {
  // Step 1: Root Orchestrator
  if (onStepChange) onStepChange(1, "Root Orchestrator (Gemini 3.5 Flash) classifying request...");
  await new Promise((r) => setTimeout(r, 600));

  // Step 2: Sub-Agent Dispatch
  const subAgentName = campaign === 'ai_can' ? 'AI-CAN-Scriptwriter' : 'AI-CANT-Scriptwriter';
  if (onStepChange) onStepChange(2, `Sub-Agent (${subAgentName} - Gemini 2.5 Flash) generating prompt...`);
  await new Promise((r) => setTimeout(r, 800));

  // Step 3: Veo Prompt Assembly
  if (onStepChange) onStepChange(3, "Assembling Google Veo 3.1 (veo-3.1-lite-generate-001) 9:16 Payload...");
  await new Promise((r) => setTimeout(r, 700));

  // Step 4: Audio Synth
  if (onStepChange) onStepChange(4, "Synthesizing gTTS Audio Track & Scripture Hook...");
  await new Promise((r) => setTimeout(r, 500));

  // Step 5: Finalizing Render Spec
  if (onStepChange) onStepChange(5, "Finalizing Multi-Platform Render Spec & Local CTA...");
  await new Promise((r) => setTimeout(r, 400));

  const isAiCan = campaign === 'ai_can';

  const visualPrompt = isAiCan
    ? `[9:16 Vertical, 8k Photorealistic] High-end luxury home in Athens/Atlanta, GA showing ${SURREAL_GLITCHES[trade]}. Cinematic lighting, smooth camera movement, shallow depth of field, neutral slate palette.`
    : `[9:16 Vertical, Hyper-real Surrealist Comedy] Hilarious deadpan physical trade fail. ${SURREAL_GLITCHES[trade]} Cinematic slow motion, crisp 8k resolution, photorealistic textures with ridiculous glitch physics.`;

  const voiceoverText = isAiCan
    ? `AI can automate your morning lighting, lower your motorized shades, and preheat your bath. Smart automation elevates your daily life in Athens and Atlanta.`
    : `AI can write code, compose music, and generate images... but it can't fix your leaking pipes, re-wire your 200 amp panel, or repair a collapsing deck. When physical reality breaks, software won't save you.`;

  const scripture = isAiCan ? SCRIPTURE_HOOKS.hebrews : SCRIPTURE_HOOKS.proverbs;
  const cta = "Call Joseph at Smart Home Repair (706-970-9267) or visit shomerepair.com for real tradesmanship in Athens & Atlanta!";

  return {
    agentName: subAgentName,
    executionTimeMs: 3000,
    orchestratorDecision: `Routed trade [${trade.toUpperCase()}] to agent [${subAgentName}] under GCP project avatar-builder-504308.`,
    veoPayload: {
      model: 'veo-3.1-lite-generate-001',
      aspectRatio: '9:16',
      resolution: '8k',
      framerate: 60,
      stylePreset: isAiCan ? 'photorealistic' : 'hyper-real-surrealist-comedy',
      prompt: visualPrompt,
      negativePrompt: 'blurry, low resolution, 4:3 ratio, distorted text, watermark'
    },
    ttsSpec: {
      voiceId: 'en-US-Neural2-D',
      speed: 1.05,
      pitch: -1.2,
      textScript: voiceoverText,
      scriptureHook: scripture,
      ctaText: cta,
      durationEstimateSec: 14.5
    },
    metadata: {
      platforms: ['tiktok', 'youtube_shorts', 'ig_reels', 'fb_reels'],
      title: `${isAiCan ? 'Smart Automation Magic' : 'AI Can\'t Do This!'} | Smart Home Repair`,
      caption: `${voiceoverText} ${scripture} #SmartHomeRepair #AthensGA #AtlantaGA #HandyAI #UnAutomated`,
      hashtags: ['#SmartHomeRepair', '#UnAutomated', '#TradesNotBots', '#AthensGA', '#AtlantaGA'],
      targetLocation: 'Athens & Atlanta, GA',
      brandUrl: 'shomerepair.com'
    }
  };
}
