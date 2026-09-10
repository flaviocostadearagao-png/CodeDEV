import React, { useState } from 'react';
import {
  FileText,
  Layers,
  Cpu,
  ShieldCheck,
  Zap,
  Server,
  Database,
  Terminal,
  CheckCircle2,
  Copy,
  Check,
  Download,
  Share2,
  GitBranch,
} from 'lucide-react';
import { ARCHITECTURE_SPEC } from '../data/architectureSpec';

export const ArchitectureSpecViewer: React.FC = () => {
  const [activeSectionId, setActiveSectionId] = useState(ARCHITECTURE_SPEC[0].id);
  const [copied, setCopied] = useState(false);

  const activeSection =
    ARCHITECTURE_SPEC.find((s) => s.id === activeSectionId) || ARCHITECTURE_SPEC[0];

  const handleCopyAll = () => {
    const fullMarkdown = ARCHITECTURE_SPEC.map(
      (s) => `# ${s.title}\n## ${s.subtitle}\n\n${s.summary}\n\n${s.content}\n`
    ).join('\n---\n\n');

    navigator.clipboard.writeText(fullMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            <span>Documento Técnico · Arquiteto de Software Sênior EdTech</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Especificação Técnica & Arquitetura DevDoZero
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Plano de engenharia para plataforma de ensino de programação escalável para milhares de execuções simultâneas com validação de testes automatizados e isolamento rigoroso.
          </p>
        </div>

        <button
          onClick={handleCopyAll}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/25 transition-all cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Especificação Copiada!' : 'Copiar Especificação em Markdown'}</span>
        </button>
      </div>

      {/* Main Content Layout: Sidebar Menu + Spec Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Seções do Documento
          </h3>
          <div className="space-y-2">
            {ARCHITECTURE_SPEC.map((section, idx) => {
              const isActive = section.id === activeSectionId;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSectionId(section.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all text-xs flex items-start gap-3 group ${
                    isActive
                      ? 'bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/20 text-white shadow-md'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                      isActive
                        ? 'bg-indigo-500 text-white'
                        : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'
                    }`}
                  >
                    <span className="font-bold text-xs">{idx + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white group-hover:text-cyan-400 transition-colors">
                      {section.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {section.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Architectural System Diagram Visualizer Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mt-6 space-y-3">
            <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5 uppercase">
              <Server className="w-3.5 h-3.5 text-cyan-400" />
              Topologia do Cluster em Números
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800 text-slate-400">
                <span>Capacidade de Submissão</span>
                <span className="font-bold text-cyan-400">10.000 / min</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800 text-slate-400">
                <span>Tempo Limite de Sandbox</span>
                <span className="font-bold text-emerald-400">2.5 segundos</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800 text-slate-400">
                <span>Limite de Memória / Pod</span>
                <span className="font-bold text-amber-400">128 MB</span>
              </div>
              <div className="flex justify-between py-1 text-slate-400">
                <span>Isolamento de Kernel</span>
                <span className="font-bold text-indigo-400">gVisor (runsc)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detail Panel (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          {/* Section Header */}
          <div className="border-b border-slate-800 pb-5 space-y-2">
            <span className="text-xs uppercase font-bold text-cyan-400 tracking-wider">
              {activeSection.subtitle}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {activeSection.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
              {activeSection.summary}
            </p>
          </div>

          {/* Key Points Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeSection.keyPoints.map((kp, i) => (
              <div
                key={i}
                className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 flex items-start gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-white block">{kp.label}</span>
                  <span className="text-slate-400 leading-relaxed">{kp.detail}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Markdown-rendered Technical Documentation Content */}
          <div className="prose prose-invert prose-sm max-w-none space-y-4 text-slate-200 leading-relaxed text-xs sm:text-sm">
            <div className="whitespace-pre-line font-sans leading-relaxed">
              {activeSection.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
