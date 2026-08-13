import React, { useState } from 'react';
import { TradeType, CampaignType, ModelType, AgentResponse } from './types';
import { orchestrateVideoProduction } from './services/geminiService';
import {
  IconWrench,
  IconZap,
  IconShield,
  IconVideo,
  IconSparkles,
  IconAlertTriangle,
  IconCheckCircle,
  IconShare2
} from './components/Icons';

export default function App() {
  const [selectedTrade, setSelectedTrade] = useState<TradeType>('plumbing');
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignType>('ai_cant');
  const [activeModel, setActiveModel] = useState<ModelType>('gemini-3.5-flash');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [stepMessage, setStepMessage] = useState<string>('Ready for production trigger');
  const [queueCount, setQueueCount] = useState<number>(4);
  const [agentResult, setAgentResult] = useState<AgentResponse | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [copiedEmbed, setCopiedEmbed] = useState<boolean>(false);

  const tradesList: { id: TradeType; label: string; icon: React.ReactNode }[] = [
    { id: 'smarthome', label: 'Smart Automation', icon: <IconSparkles /> },
    { id: 'drywall', label: 'Drywall Repair', icon: <IconWrench /> },
    { id: 'plumbing', label: 'Plumbing', icon: <IconWrench /> },
    { id: 'electrical', label: 'Electrical', icon: <IconZap /> },
    { id: 'decking', label: 'Decking & Framing', icon: <IconShield /> },
    { id: 'crawlspace', label: 'Crawlspace', icon: <IconShield /> },
    { id: 'gutters', label: 'Gutters & Roof', icon: <IconWrench /> }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    setAgentResult(null);
    setIsPlaying(false);

    try {
      const response = await orchestrateVideoProduction(
        selectedTrade,
        selectedCampaign,
        (step, msg) => {
          setCurrentStep(step);
          setStepMessage(msg);
        }
      );
      setAgentResult(response);
      setCurrentStep(5);
      setStepMessage('Video Generation Payload Ready!');
    } catch (err) {
      console.error(err);
      setStepMessage('Error executing agent pipeline.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSendToQueue = () => {
    if (!agentResult) return;
    setQueueCount((prev) => prev + 1);
    alert(`Successfully sent job to queue: viral_video_production_machine/queue/job_${Date.now()}.json`);
  };

  const handleCopyEmbed = () => {
    const embedCode = `<iframe src="https://shomerepair.com/embed/v/${Date.now()}" width="360" height="640" frameborder="0" allow="autoplay; encrypted-media"></iframe>`;
    navigator.clipboard.writeText(embedCode);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col">
      {/* 1. TOP NAVIGATION BAR */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-4">
          <div className="bg-gradient-to-tr from-sky-500 to-emerald-400 p-2 rounded-xl text-slate-950 font-black flex items-center space-x-2 shadow-lg shadow-sky-500/20">
            <IconVideo />
            <span className="tracking-tight text-lg">HandyAI</span>
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-100">Smart Home Repair Video Maker</h1>
            <p className="text-xs text-slate-400">Athens & Atlanta, GA • shomerepair.com</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 bg-slate-800/80 border border-slate-700/60 rounded-lg px-3 py-1.5 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-300 font-medium">GCP Project:</span>
            <code className="bg-slate-900 text-sky-400 px-1.5 py-0.5 rounded border border-slate-800 font-mono">avatar-builder-504308</code>
          </div>

          <select
            value={activeModel}
            onChange={(e) => setActiveModel(e.target.value as ModelType)}
            className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="gemini-3.5-flash">Root: Gemini 3.5 Flash</option>
            <option value="gemini-2.5-flash">Sub-Agents: Gemini 2.5 Flash</option>
            <option value="veo-3.1-lite-generate-001">Video: Veo 3.1 Lite</option>
          </select>

          <div className="bg-slate-800 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs flex items-center space-x-2">
            <span className="text-slate-400">Queue:</span>
            <span className="bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full font-bold">{queueCount} active</span>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">

        {/* 2. CAMPAIGN & TRADE SELECTOR */}
        <section className="bg-slate-800/50 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm space-y-4 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Campaign Direction</h2>
              <p className="text-xs text-slate-400">Choose between automated smart living vs physical trade realities</p>
            </div>

            <div className="flex p-1 bg-slate-900 rounded-xl border border-slate-800 w-full md:w-auto">
              <button
                onClick={() => setSelectedCampaign('ai_can')}
                className={`flex-1 md:flex-none px-5 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
                  selectedCampaign === 'ai_can'
                    ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <IconSparkles />
                <span>AI CAN (Smart Automation)</span>
              </button>
              <button
                onClick={() => setSelectedCampaign('ai_cant')}
                className={`flex-1 md:flex-none px-5 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
                  selectedCampaign === 'ai_cant'
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <IconAlertTriangle />
                <span>AI CAN'T (Trade Fail Comedy)</span>
              </button>
            </div>
          </div>

          <hr className="border-slate-800" />

          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Select Trade Category</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
              {tradesList.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTrade(t.id)}
                  className={`p-3 rounded-xl border text-xs font-medium flex flex-col items-center justify-center space-y-2 transition-all ${
                    selectedTrade === t.id
                      ? selectedCampaign === 'ai_can'
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300'
                        : 'bg-amber-500/10 border-amber-500 text-amber-300'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className={selectedTrade === t.id ? (selectedCampaign === 'ai_can' ? 'text-emerald-400' : 'text-amber-400') : 'text-slate-500'}>
                    {t.icon}
                  </div>
                  <span className="text-center">{t.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 3. LIVE MULTI-AGENT PIPELINE VISUALIZER */}
        <section className="bg-slate-800/40 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Multi-Agent Studio Workflow Pipeline</h2>
            <span className="text-xs font-mono text-sky-400">{stepMessage}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {[
              { step: 1, title: '1. Orchestrator', agent: 'Gemini 3.5 Flash' },
              { step: 2, title: '2. Sub-Agent Dispatch', agent: selectedCampaign === 'ai_can' ? 'AI-CAN-Writer' : 'AI-CANT-Writer' },
              { step: 3, title: '3. Veo Prompt Build', agent: 'veo-3.1-lite-generate' },
              { step: 4, title: '4. Audio & Scripture', agent: 'gTTS Neural Synth' },
              { step: 5, title: '5. Render & Export', agent: '9:16 Video Engine' }
            ].map((item) => {
              const isActive = currentStep === item.step;
              const isDone = currentStep > item.step;
              return (
                <div
                  key={item.step}
                  className={`p-3 rounded-xl border transition-all ${
                    isActive
                      ? 'bg-sky-500/10 border-sky-500 text-sky-300 animate-pulse'
                      : isDone
                      ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-300'
                      : 'bg-slate-900/40 border-slate-800/60 text-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-semibold mb-1">
                    <span>{item.title}</span>
                    {isDone && <IconCheckCircle />}
                  </div>
                  <p className="text-[10px] opacity-80">{item.agent}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. SCRIPT & VISUAL PROMPT STUDIO + VIDEO PREVIEW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* DUAL-PANEL SCRIPT & PROMPT STUDIO */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-slate-800/50 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-200">Veo 3.1 Prompt & Voiceover Payload</h3>
                {agentResult && (
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full font-mono border border-emerald-500/30">
                    Execution Time: {agentResult.executionTimeMs}ms
                  </span>
                )}
              </div>

              {agentResult ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Left: Veo Prompt */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sky-400 font-bold">Google Veo 3.1 Spec</span>
                      <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px]">9:16 • 8k • 60fps</span>
                    </div>
                    <div>
                      <p className="text-slate-400 mb-1">Visual Prompt:</p>
                      <p className="text-slate-200 leading-relaxed bg-slate-900 p-2.5 rounded border border-slate-800 font-mono">
                        {agentResult.veoPayload.prompt}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-400 mb-1">Negative Prompt:</p>
                      <p className="text-slate-400 bg-slate-900 p-2 rounded border border-slate-800/60 font-mono text-[10px]">
                        {agentResult.veoPayload.negativePrompt}
                      </p>
                    </div>
                  </div>

                  {/* Right: Audio Script & Scripture Hook */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                    <span className="font-mono text-amber-400 font-bold">Voiceover Script & Scripture</span>
                    <div>
                      <p className="text-slate-400 mb-1">Voiceover Narrative:</p>
                      <p className="text-slate-200 leading-relaxed bg-slate-900 p-2.5 rounded border border-slate-800">
                        "{agentResult.ttsSpec.textScript}"
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-400 mb-1">Scripture Hook:</p>
                      <p className="text-emerald-400 font-medium bg-slate-900 p-2.5 rounded border border-slate-800 italic">
                        {agentResult.ttsSpec.scriptureHook}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-400 mb-1">Local CTA:</p>
                      <p className="text-sky-300 font-medium bg-slate-900 p-2 rounded border border-slate-800 text-[11px]">
                        {agentResult.ttsSpec.ctaText}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-950/60 border border-dashed border-slate-800 rounded-xl p-12 text-center text-slate-500">
                  <IconSparkles />
                  <p className="mt-2 text-xs">Click "Generate New Video" to trigger the multi-agent orchestration pipeline.</p>
                </div>
              )}
            </div>
          </div>

          {/* 5. VIDEO PREVIEW & PLAYER */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="w-full max-w-[280px] bg-slate-950 rounded-3xl border-4 border-slate-800 shadow-2xl overflow-hidden relative aspect-[9/16] flex flex-col justify-between p-4">
              {/* Overlay Top */}
              <div className="z-10 flex items-center justify-between">
                <span className="bg-slate-900/80 backdrop-blur-md text-[10px] text-slate-300 px-2 py-1 rounded-full font-bold">
                  {selectedCampaign === 'ai_can' ? '✨ AI CAN' : '⚠️ AI CAN\'T'}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">shomerepair.com</span>
              </div>

              {/* Simulation Content */}
              <div className="my-auto text-center space-y-3 z-10">
                {agentResult ? (
                  <div className="space-y-2">
                    <div className="w-16 h-16 rounded-full bg-sky-500/20 border border-sky-400 mx-auto flex items-center justify-center text-sky-300 animate-pulse">
                      <IconVideo />
                    </div>
                    <p className="text-xs font-bold text-slate-200 capitalize">{selectedTrade} Simulation</p>
                    <p className="text-[10px] text-slate-400 px-2 italic">
                      "{agentResult.ttsSpec.scriptureHook}"
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-slate-600">Video Preview Standby</p>
                )}
              </div>

              {/* Bottom Outro Bumper Preview */}
              <div className="z-10 bg-slate-900/90 backdrop-blur-md rounded-xl p-2.5 border border-slate-800 text-center space-y-1">
                <p className="text-[9px] text-slate-400 uppercase font-semibold">3D Bumper Outro</p>
                <p className="text-[10px] font-mono text-sky-400 font-bold">3d-CrossBulb.mp4</p>
                <div className="flex items-center justify-center space-x-1 text-slate-400 pt-1">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-200 text-[10px]"
                  >
                    {isPlaying ? 'Pause Waveform' : 'Play Audio & Outro'}
                  </button>
                </div>
              </div>

              {/* Animated Waveform indicator */}
              {isPlaying && (
                <div className="absolute inset-x-0 bottom-16 flex items-end justify-center space-x-1 h-8 px-8 opacity-60">
                  <div className="w-1 bg-sky-400 h-full animate-bounce"></div>
                  <div className="w-1 bg-emerald-400 h-2/3 animate-bounce delay-100"></div>
                  <div className="w-1 bg-amber-400 h-4/5 animate-bounce delay-150"></div>
                  <div className="w-1 bg-sky-400 h-1/2 animate-bounce delay-200"></div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* 6. ACTION BAR */}
        <section className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md shadow-2xl">
          <div className="flex items-center space-x-3">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className={`px-6 py-3 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all shadow-lg ${
                isGenerating
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-sky-500 to-emerald-400 text-slate-950 hover:brightness-110 shadow-sky-500/20'
              }`}
            >
              <IconSparkles />
              <span>{isGenerating ? 'Orchestrating Agents...' : 'Generate New Video'}</span>
            </button>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={handleSendToQueue}
              disabled={!agentResult}
              className="flex-1 sm:flex-none px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-xs font-semibold text-slate-200 hover:bg-slate-800 disabled:opacity-50 transition-all flex items-center justify-center space-x-2"
            >
              <IconZap />
              <span>Send to Production Queue</span>
            </button>

            <button
              onClick={handleCopyEmbed}
              disabled={!agentResult}
              className="flex-1 sm:flex-none px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-xs font-semibold text-slate-200 hover:bg-slate-800 disabled:opacity-50 transition-all flex items-center justify-center space-x-2"
            >
              <IconShare2 />
              <span>{copiedEmbed ? 'Embed Code Copied!' : 'Copy Website Embed'}</span>
            </button>
          </div>
        </section>

      </main>
    </div>
  );
}
