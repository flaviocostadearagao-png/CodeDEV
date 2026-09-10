import React, { useState, useEffect } from 'react';
import {
  Play,
  CheckCircle2,
  XCircle,
  Clock,
  Terminal,
  Cpu,
  ChevronRight,
  ChevronLeft,
  Lightbulb,
  HelpCircle,
  Award,
  AlertCircle,
  FileCheck,
  Zap,
  Lock,
  Eye,
  RotateCcw,
} from 'lucide-react';
import { Lesson, ExecutionResult, Track } from '../types';
import { CodeEditor } from './CodeEditor';
import { runCode } from '../services/codeRunner';
import {
  getLessonCodeDraft,
  saveLessonCodeDraft,
  clearLessonCodeDraft,
} from '../services/storage';

interface LessonIDEProps {
  lesson: Lesson;
  allLessons: Lesson[];
  activeTrack: Track;
  onSelectLesson: (lessonId: string) => void;
  onCompleteLesson: (lessonId: string, xpEarned: number) => void;
  onBackToDashboard: () => void;
}

export const LessonIDE: React.FC<LessonIDEProps> = ({
  lesson,
  allLessons,
  activeTrack,
  onSelectLesson,
  onCompleteLesson,
  onBackToDashboard,
}) => {
  const [code, setCode] = useState(lesson.starterCode);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<'tests' | 'console' | 'preview'>('tests');
  const [mobileTab, setMobileTab] = useState<'guide' | 'editor' | 'tests'>('editor');
  const [showHint, setShowHint] = useState<number | null>(null);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [hasCompletedCurrent, setHasCompletedCurrent] = useState(!!lesson.completed);

  const isWebTrack = lesson.trackId === 'html' || lesson.trackId === 'css';

  // Update local code when lesson changes (loads saved background draft if available)
  useEffect(() => {
    const savedDraft = getLessonCodeDraft(lesson.id);
    setCode(savedDraft !== null ? savedDraft : lesson.starterCode);
    setExecutionResult(null);
    setHasCompletedCurrent(!!lesson.completed);
    setShowHint(null);
    setMobileTab('editor');
  }, [lesson.id]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    saveLessonCodeDraft(lesson.id, newCode);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    try {
      const result = await runCode(code, lesson);
      setExecutionResult(result);

      // If all tests passed and not previously marked, complete lesson
      if (result.allPassed && !hasCompletedCurrent) {
        setHasCompletedCurrent(true);
        onCompleteLesson(lesson.id, lesson.xpReward);
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsRunning(false);
    }
  };

  const handleResetCode = () => {
    clearLessonCodeDraft(lesson.id);
    setCode(lesson.starterCode);
    setExecutionResult(null);
  };

  const currentIndex = allLessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  return (
    <div id="lesson-ide-container" className="flex flex-col h-[calc(100dvh-3.5rem)] sm:h-[calc(100dvh-4rem)] bg-slate-950 text-slate-100 overflow-hidden">
      {/* Sub-header Navigation Bar */}
      <div className="h-11 sm:h-12 border-b border-slate-800 bg-slate-900/90 px-2.5 sm:px-4 flex items-center justify-between gap-2 select-none shrink-0">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            onClick={onBackToDashboard}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-white px-1.5 sm:px-2 py-1 rounded hover:bg-slate-800 transition-colors shrink-0"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden xs:inline">Trilhas</span>
          </button>
          <span className="text-slate-700 hidden xs:inline">|</span>
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span
              className="text-[9px] sm:text-[10px] uppercase font-bold px-1.5 py-0.2 rounded border shrink-0"
              style={{
                borderColor: `${activeTrack.accentColor}50`,
                backgroundColor: `${activeTrack.accentColor}15`,
                color: activeTrack.accentColor,
              }}
            >
              {activeTrack.name}
            </span>
            <span className="text-xs font-semibold text-slate-200 truncate max-w-[130px] xs:max-w-[200px] sm:max-w-md">
              {lesson.title}
            </span>
          </div>
        </div>

        {/* Lesson selector & Progress buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <div className="hidden sm:flex items-center gap-1 text-xs text-slate-400 mr-2">
            <span className="text-amber-400 font-semibold flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 fill-amber-400" />+{lesson.xpReward} XP
            </span>
            <span className="text-slate-600">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-500" />
              {lesson.estimatedMinutes} min
            </span>
          </div>

          <div className="flex items-center border border-slate-800 rounded-lg overflow-hidden bg-slate-900">
            <button
              disabled={!prevLesson}
              onClick={() => prevLesson && onSelectLesson(prevLesson.id)}
              className="p-1 sm:p-1.5 hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent text-slate-300 transition-colors"
              title="Lição Anterior"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <span className="text-[10px] sm:text-[11px] px-1.5 sm:px-2 text-slate-400 font-mono">
              {currentIndex + 1}/{allLessons.length}
            </span>
            <button
              disabled={!nextLesson}
              onClick={() => nextLesson && onSelectLesson(nextLesson.id)}
              className="p-1 sm:p-1.5 hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent text-slate-300 transition-colors"
              title="Próxima Lição"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Panel Segmented Tabs Bar (Visible on mobile/tablet screens) */}
      <div className="lg:hidden flex items-center bg-slate-900 border-b border-slate-800 px-2 py-1 gap-1 shrink-0 select-none">
        <button
          id="mobile-tab-guide"
          onClick={() => setMobileTab('guide')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-semibold transition-colors min-h-[38px] ${
            mobileTab === 'guide'
              ? 'bg-slate-800 text-cyan-400 border border-slate-700 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileCheck className="w-3.5 h-3.5" />
          <span>Guia</span>
        </button>

        <button
          id="mobile-tab-editor"
          onClick={() => setMobileTab('editor')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-semibold transition-colors min-h-[38px] ${
            mobileTab === 'editor'
              ? 'bg-slate-800 text-cyan-400 border border-slate-700 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Editor</span>
        </button>

        <button
          id="mobile-tab-tests"
          onClick={() => setMobileTab('tests')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-semibold transition-colors min-h-[38px] relative ${
            mobileTab === 'tests'
              ? 'bg-slate-800 text-cyan-400 border border-slate-700 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Testes</span>
          {executionResult && (
            <span
              className={`text-[9px] px-1 py-0.2 rounded-full font-bold ${
                executionResult.allPassed
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              }`}
            >
              {executionResult.testResults.filter((t) => t.passed).length}/{executionResult.testResults.length}
            </span>
          )}
        </button>
      </div>

      {/* MOBILE CONTENT CONTAINER (1 full screen panel at a time) */}
      <div className="flex-1 min-h-0 overflow-hidden flex flex-col lg:hidden p-1.5">
        {mobileTab === 'guide' && (
          <div className="flex-1 min-h-0 bg-slate-900/90 border border-slate-800/80 rounded-xl flex flex-col overflow-hidden shadow-sm">
            <div className="px-3.5 py-2.5 border-b border-slate-800 bg-slate-900 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-cyan-400" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Guia da Lição
                </h2>
              </div>
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded uppercase ${
                  lesson.level === 'iniciante'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : lesson.level === 'intermediario'
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                }`}
              >
                {lesson.level}
              </span>
            </div>

            <div className="flex-1 p-3.5 overflow-y-auto space-y-4 text-xs leading-relaxed text-slate-300">
              <div>
                <p className="text-[11px] text-cyan-400 font-semibold">{lesson.moduleTitle}</p>
                <h1 className="text-base font-bold text-white mt-0.5">{lesson.title}</h1>
              </div>

              <div className="border-b border-slate-800/80 pb-3">
                <div className="whitespace-pre-line text-slate-300 leading-relaxed font-sans text-xs">
                  {lesson.theory}
                </div>
              </div>

              <div className="space-y-2 border-b border-slate-800/80 pb-3">
                <h3 className="text-xs font-bold uppercase tracking-wide text-slate-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Objetivos
                </h3>
                <ul className="space-y-1 text-xs text-slate-300">
                  {lesson.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-1.5 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                <h3 className="text-xs font-bold uppercase tracking-wide text-amber-400 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                  Desafio Prático
                </h3>
                <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line">
                  {lesson.instructions}
                </p>
              </div>

              {lesson.hints.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <h4 className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-300" />
                    Dicas ({lesson.hints.length})
                  </h4>
                  <div className="space-y-1">
                    {lesson.hints.map((hint, idx) => (
                      <div
                        key={idx}
                        className="border border-slate-800 rounded-lg overflow-hidden bg-slate-900/60 text-xs"
                      >
                        <button
                          onClick={() => setShowHint(showHint === idx ? null : idx)}
                          className="w-full text-left px-3 py-1.5 flex items-center justify-between text-slate-300 hover:text-white transition-colors"
                        >
                          <span>Dica #{idx + 1}</span>
                          <span className="text-[10px] text-cyan-400">
                            {showHint === idx ? 'Ocultar' : 'Revelar'}
                          </span>
                        </button>
                        {showHint === idx && (
                          <div className="p-2.5 bg-slate-950/70 border-t border-slate-800 text-slate-300 text-xs">
                            {hint}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => setMobileTab('editor')}
                className="w-full mt-2 py-2.5 px-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-cyan-600/20"
              >
                <span>Ir para o Editor de Código</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {mobileTab === 'editor' && (
          <div className="flex-1 min-h-0 flex flex-col">
            <CodeEditor
              code={code}
              onChange={handleCodeChange}
              language={lesson.trackId}
              onReset={handleResetCode}
              onRun={handleRunCode}
            />
          </div>
        )}

        {mobileTab === 'tests' && (
          <div className="flex-1 min-h-0 bg-slate-900/90 border border-slate-800/80 rounded-xl flex flex-col overflow-hidden shadow-sm">
            {/* Tabs bar */}
            <div className="px-3 py-2 border-b border-slate-800 bg-slate-900 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('tests')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                    activeTab === 'tests'
                      ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Testes</span>
                  {executionResult && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        executionResult.allPassed
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-rose-500/20 text-rose-400'
                      }`}
                    >
                      {executionResult.testResults.filter((t) => t.passed).length}/
                      {executionResult.testResults.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('console')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                    activeTab === 'console'
                      ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Console</span>
                </button>

                {isWebTrack && (
                  <button
                    onClick={() => setActiveTab('preview')}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                      activeTab === 'preview'
                        ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Visualização</span>
                  </button>
                )}
              </div>

              <button
                disabled={isRunning}
                onClick={handleRunCode}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs disabled:opacity-50"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>{isRunning ? 'Rodando...' : 'Executar'}</span>
              </button>
            </div>

            {/* Panel content */}
            <div className="flex-1 p-3 overflow-y-auto font-mono text-xs">
              {isRunning ? (
                <div className="flex flex-col items-center justify-center h-48 text-slate-400 gap-2">
                  <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs">Executando sandbox isolado...</span>
                </div>
              ) : activeTab === 'tests' ? (
                <div className="space-y-3">
                  {/* Result header banner */}
                  {executionResult && (
                    <div
                      className={`p-3 rounded-lg border flex items-start gap-2.5 ${
                        executionResult.allPassed
                          ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                          : 'bg-rose-950/40 border-rose-500/30 text-rose-300'
                      }`}
                    >
                      {executionResult.allPassed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <div className="font-bold text-xs">
                          {executionResult.allPassed
                            ? '🎉 Todos os Testes Passaram!'
                            : 'Falha na Validação dos Testes'}
                        </div>
                        <div className="text-[11px] opacity-80 mt-0.5 flex items-center gap-3">
                          <span>Tempo: {executionResult.executionTimeMs}ms</span>
                          <span>Memória: {(executionResult.memoryKb / 1024).toFixed(1)}MB</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Individual Test Cases list */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-sans uppercase font-bold">
                      <span>Casos de Teste Automatizados</span>
                      <span className="text-[10px] text-slate-500">
                        {lesson.testCases.length} Casos
                      </span>
                    </div>

                    {lesson.testCases.map((tc, index) => {
                      const resultItem = executionResult?.testResults.find(
                        (r) => r.testId === tc.id
                      );
                      const isPass = resultItem?.passed;

                      return (
                        <div
                          key={tc.id}
                          className={`p-2.5 rounded-lg border transition-colors ${
                            resultItem
                              ? isPass
                                ? 'bg-emerald-950/20 border-emerald-500/20 text-slate-200'
                                : 'bg-rose-950/20 border-rose-500/20 text-slate-200'
                              : 'bg-slate-950/60 border-slate-800 text-slate-400'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5 truncate">
                              {resultItem ? (
                                isPass ? (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                ) : (
                                  <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                                )
                              ) : (
                                <span className="w-3 h-3 rounded-full border border-slate-600 inline-block shrink-0" />
                              )}
                              <span className="font-semibold text-xs truncate">
                                Teste #{index + 1}: {tc.description}
                              </span>
                            </div>

                            {tc.isHidden && (
                              <span
                                title="Teste oculto com casos de borda"
                                className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-amber-400 border border-amber-500/20"
                              >
                                <Lock className="w-2.5 h-2.5" />
                                Oculto
                              </span>
                            )}
                          </div>

                          {/* Details for failed test */}
                          {resultItem && !isPass && (
                            <div className="mt-2 pt-2 border-t border-rose-500/20 text-[11px] space-y-1">
                              <div>
                                <span className="text-slate-500">Entrada: </span>
                                <span className="text-slate-300">{tc.input}</span>
                              </div>
                              <div>
                                <span className="text-slate-500">Esperado: </span>
                                <span className="text-emerald-400 font-mono">
                                  {tc.expectedOutput}
                                </span>
                              </div>
                              <div>
                                <span className="text-slate-500">Obtido: </span>
                                <span className="text-rose-400 font-mono">
                                  {resultItem.actualOutput}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Completion CTA */}
                  {hasCompletedCurrent && nextLesson && (
                    <button
                      onClick={() => onSelectLesson(nextLesson.id)}
                      className="w-full mt-3 py-2 px-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-cyan-600/20 transition-colors"
                    >
                      <span>Avançar para Próxima Lição</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ) : activeTab === 'preview' ? (
                /* Live HTML/CSS Preview Tab */
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-[11px]">
                    <span className="flex items-center gap-1.5 font-semibold text-cyan-400">
                      <Eye className="w-3.5 h-3.5" />
                      Visualização ao Vivo (Preview)
                    </span>
                    <span className="text-[10px] text-slate-500">Renderização Real</span>
                  </div>
                  <div className="bg-white rounded-lg p-2 border border-slate-700 min-h-[200px] overflow-hidden">
                    <iframe
                      title="mobile-preview"
                      srcDoc={
                        lesson.trackId === 'html'
                          ? code
                          : `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${code}</style></head><body style="font-family: system-ui, sans-serif; padding: 12px; margin: 0;"><div class="card flex-container grid-dashboard galeria-cards container"><h1 class="titulo">Demonstração Visual</h1><p>Parágrafo estilizado pelo seu código CSS.</p><button class="btn">Botão Teste</button></div></body></html>`
                      }
                      className="w-full h-56 border-0"
                      sandbox="allow-same-origin"
                    />
                  </div>
                </div>
              ) : (
                /* Console Output Tab */
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-slate-500 text-[11px]">
                    <span>Saída Padrão (STDOUT / STDERR)</span>
                    {executionResult && (
                      <span>Código de saída: {executionResult.exitCode}</span>
                    )}
                  </div>

                  <div className="bg-black/80 rounded-lg p-3 border border-slate-800/80 min-h-[160px] text-xs font-mono text-slate-200 overflow-x-auto whitespace-pre-wrap">
                    {executionResult ? (
                      <>
                        {executionResult.stdout && (
                          <div className="text-emerald-400">{executionResult.stdout}</div>
                        )}
                        {executionResult.stderr && (
                          <div className="text-rose-400 mt-1">{executionResult.stderr}</div>
                        )}
                        {!executionResult.stdout && !executionResult.stderr && (
                          <div className="text-slate-500 italic">
                            O programa foi executado mas não gerou saída no console.
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-slate-600 italic">
                        Clique em "Rodar Código" para ver a saída da compilação e execução aqui.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* MOBILE STICKY BOTTOM ACTION BAR (Ensures 1-tap run and feedback on phones) */}
      <div className="lg:hidden shrink-0 bg-slate-900 border-t border-slate-800/90 px-3 py-2 pb-safe flex items-center justify-between gap-2 shadow-2xl">
        <div className="flex items-center gap-1 text-xs">
          {executionResult ? (
            <button
              onClick={() => setMobileTab('tests')}
              className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-semibold border ${
                executionResult.allPassed
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
              }`}
            >
              {executionResult.allPassed ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : (
                <XCircle className="w-3.5 h-3.5" />
              )}
              <span>{executionResult.allPassed ? 'Passou!' : 'Ver Erro'}</span>
            </button>
          ) : (
            <span className="text-[11px] text-amber-400 font-semibold flex items-center gap-0.5">
              <Zap className="w-3 h-3 fill-amber-400" />+{lesson.xpReward} XP
            </span>
          )}
        </div>

        <button
          id="mobile-run-code-btn"
          disabled={isRunning}
          onClick={handleRunCode}
          className="flex-1 max-w-[220px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-500/25 active:scale-98 transition-all disabled:opacity-50 cursor-pointer min-h-[42px]"
        >
          {isRunning ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Executando...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Rodar Código</span>
            </>
          )}
        </button>

        <div className="flex items-center gap-1">
          {hasCompletedCurrent && nextLesson ? (
            <button
              onClick={() => onSelectLesson(nextLesson.id)}
              className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow transition-colors min-h-[42px]"
              title="Próxima lição"
            >
              <span className="hidden xs:inline">Próxima</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleResetCode}
              title="Resetar código"
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 min-h-[42px] min-w-[42px] flex items-center justify-center"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* DESKTOP 3-PANEL CONTENT AREA (Preserved for lg+ widescreen) */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-2 p-2 flex-1 min-h-0 overflow-hidden">
        {/* PANEL 1: LEFT (Theory, Objectives, Challenge Instructions) - 4 cols */}
        <div
          id="panel-instructions"
          className="lg:col-span-4 bg-slate-900/90 border border-slate-800/80 rounded-xl flex flex-col overflow-hidden shadow-sm"
        >
          <div className="px-4 py-3 border-b border-slate-800 bg-slate-900 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-cyan-400" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Guia da Lição
              </h2>
            </div>
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded uppercase ${
                lesson.level === 'iniciante'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : lesson.level === 'intermediario'
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              }`}
            >
              {lesson.level}
            </span>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-5 text-sm leading-relaxed text-slate-300">
            {/* Title & Module */}
            <div>
              <p className="text-xs text-cyan-400 font-semibold">{lesson.moduleTitle}</p>
              <h1 className="text-lg font-bold text-white mt-0.5">{lesson.title}</h1>
            </div>

            {/* Theory Explanation */}
            <div className="prose prose-invert prose-sm max-w-none border-b border-slate-800/80 pb-4">
              <div className="whitespace-pre-line text-slate-300 leading-relaxed font-sans text-xs sm:text-sm">
                {lesson.theory}
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="space-y-2 border-b border-slate-800/80 pb-4">
              <h3 className="text-xs font-bold uppercase tracking-wide text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Objetivos de Aprendizagem
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {lesson.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Practical Challenge Instructions */}
            <div className="space-y-2 bg-slate-950/60 p-3.5 rounded-lg border border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wide text-amber-400 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                Desafio Prático
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line">
                {lesson.instructions}
              </p>
            </div>

            {/* Hints System */}
            {lesson.hints.length > 0 && (
              <div className="space-y-2 pt-1">
                <h4 className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-300" />
                  Dicas da Lição ({lesson.hints.length})
                </h4>
                <div className="space-y-1.5">
                  {lesson.hints.map((hint, idx) => (
                    <div
                      key={idx}
                      className="border border-slate-800 rounded-lg overflow-hidden bg-slate-900/60 text-xs"
                    >
                      <button
                        onClick={() => setShowHint(showHint === idx ? null : idx)}
                        className="w-full text-left px-3 py-2 flex items-center justify-between text-slate-300 hover:text-white transition-colors"
                      >
                        <span>Dica #{idx + 1}</span>
                        <span className="text-[10px] text-cyan-400">
                          {showHint === idx ? 'Ocultar' : 'Revelar'}
                        </span>
                      </button>
                      {showHint === idx && (
                        <div className="p-3 bg-slate-950/70 border-t border-slate-800 text-slate-300 text-xs">
                          {hint}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* PANEL 2: CENTER (Integrated Code Editor) - 5 cols */}
        <div
          id="panel-editor"
          className="lg:col-span-5 flex flex-col h-full overflow-hidden"
        >
          <CodeEditor
            code={code}
            onChange={handleCodeChange}
            language={lesson.trackId}
            onReset={handleResetCode}
            onRun={handleRunCode}
          />
        </div>

        {/* PANEL 3: RIGHT/BOTTOM (Terminal & Automated Test Validator) - 3 cols */}
        <div
          id="panel-console-tests"
          className="lg:col-span-3 bg-slate-900/90 border border-slate-800/80 rounded-xl flex flex-col overflow-hidden shadow-sm"
        >
          {/* Tabs bar */}
          <div className="px-3 py-2 border-b border-slate-800 bg-slate-900 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <button
                id="tab-tests-btn"
                onClick={() => setActiveTab('tests')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                  activeTab === 'tests'
                    ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Testes</span>
                {executionResult && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      executionResult.allPassed
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-rose-500/20 text-rose-400'
                    }`}
                  >
                    {executionResult.testResults.filter((t) => t.passed).length}/
                    {executionResult.testResults.length}
                  </span>
                )}
              </button>

              <button
                id="tab-console-btn"
                onClick={() => setActiveTab('console')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                  activeTab === 'console'
                    ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Console</span>
              </button>

              {isWebTrack && (
                <button
                  id="tab-preview-btn"
                  onClick={() => setActiveTab('preview')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                    activeTab === 'preview'
                      ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Visualização</span>
                </button>
              )}
            </div>

            {/* Run button */}
            <button
              id="run-code-btn"
              disabled={isRunning}
              onClick={handleRunCode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-500/20 disabled:opacity-50 transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isRunning ? 'Executando...' : 'Rodar Código'}</span>
            </button>
          </div>

          {/* Panel content */}
          <div className="flex-1 p-3 overflow-y-auto font-mono text-xs">
            {isRunning ? (
              <div className="flex flex-col items-center justify-center h-48 text-slate-400 gap-2">
                <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                <span className="text-xs">Executando sandbox isolado...</span>
              </div>
            ) : activeTab === 'tests' ? (
              <div className="space-y-3">
                {/* Result header banner */}
                {executionResult && (
                  <div
                    className={`p-3 rounded-lg border flex items-start gap-2.5 ${
                      executionResult.allPassed
                        ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                        : 'bg-rose-950/40 border-rose-500/30 text-rose-300'
                    }`}
                  >
                    {executionResult.allPassed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="font-bold text-xs">
                        {executionResult.allPassed
                          ? '🎉 Todos os Testes Passaram!'
                          : 'Falha na Validação dos Testes'}
                      </div>
                      <div className="text-[11px] opacity-80 mt-0.5 flex items-center gap-3">
                        <span>Tempo: {executionResult.executionTimeMs}ms</span>
                        <span>Memória: {(executionResult.memoryKb / 1024).toFixed(1)}MB</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Individual Test Cases list */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-sans uppercase font-bold">
                    <span>Casos de Teste Automatizados</span>
                    <span className="text-[10px] text-slate-500">
                      {lesson.testCases.length} Casos
                    </span>
                  </div>

                  {lesson.testCases.map((tc, index) => {
                    const resultItem = executionResult?.testResults.find(
                      (r) => r.testId === tc.id
                    );
                    const isPass = resultItem?.passed;

                    return (
                      <div
                        key={tc.id}
                        className={`p-2.5 rounded-lg border transition-colors ${
                          resultItem
                            ? isPass
                              ? 'bg-emerald-950/20 border-emerald-500/20 text-slate-200'
                              : 'bg-rose-950/20 border-rose-500/20 text-slate-200'
                            : 'bg-slate-950/60 border-slate-800 text-slate-400'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 truncate">
                            {resultItem ? (
                              isPass ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              ) : (
                                <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                              )
                            ) : (
                              <span className="w-3 h-3 rounded-full border border-slate-600 inline-block shrink-0" />
                            )}
                            <span className="font-semibold text-xs truncate">
                              Teste #{index + 1}: {tc.description}
                            </span>
                          </div>

                          {tc.isHidden && (
                            <span
                              title="Teste oculto com casos de borda"
                              className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-amber-400 border border-amber-500/20"
                            >
                              <Lock className="w-2.5 h-2.5" />
                              Oculto
                            </span>
                          )}
                        </div>

                        {/* Details for failed test */}
                        {resultItem && !isPass && (
                          <div className="mt-2 pt-2 border-t border-rose-500/20 text-[11px] space-y-1">
                            <div>
                              <span className="text-slate-500">Entrada: </span>
                              <span className="text-slate-300">{tc.input}</span>
                            </div>
                            <div>
                              <span className="text-slate-500">Esperado: </span>
                              <span className="text-emerald-400 font-mono">
                                {tc.expectedOutput}
                              </span>
                            </div>
                            <div>
                              <span className="text-slate-500">Obtido: </span>
                              <span className="text-rose-400 font-mono">
                                {resultItem.actualOutput}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Completion CTA */}
                {hasCompletedCurrent && nextLesson && (
                  <button
                    onClick={() => onSelectLesson(nextLesson.id)}
                    className="w-full mt-3 py-2 px-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-cyan-600/20 transition-colors"
                  >
                    <span>Avançar para Próxima Lição</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            ) : activeTab === 'preview' ? (
              /* Live HTML/CSS Preview Tab */
              <div className="space-y-3 h-full flex flex-col">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span className="flex items-center gap-1.5 font-bold text-cyan-400">
                    <Eye className="w-4 h-4" />
                    Visualização ao Vivo (Preview)
                  </span>
                  <span className="text-[11px] text-slate-500">Renderização Real no Navegador</span>
                </div>
                <div className="flex-1 bg-white rounded-xl border border-slate-700 overflow-hidden shadow-inner min-h-[300px]">
                  <iframe
                    title="desktop-preview"
                    srcDoc={
                      lesson.trackId === 'html'
                        ? code
                        : `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${code}</style></head><body style="font-family: system-ui, sans-serif; padding: 20px; margin: 0;"><div class="card flex-container grid-dashboard galeria-cards container"><h1 class="titulo">Demonstração Visual</h1><p>Este parágrafo está sendo renderizado com as propriedades CSS do seu editor.</p><button class="btn">Botão Teste</button></div></body></html>`
                    }
                    className="w-full h-full min-h-[320px] border-0"
                    sandbox="allow-same-origin"
                  />
                </div>
              </div>
            ) : (
              /* Console Output Tab */
              <div className="space-y-2">
                <div className="flex items-center justify-between text-slate-500 text-[11px]">
                  <span>Saída Padrão (STDOUT / STDERR)</span>
                  {executionResult && (
                    <span>Código de saída: {executionResult.exitCode}</span>
                  )}
                </div>

                <div className="bg-black/80 rounded-lg p-3 border border-slate-800/80 min-h-[160px] text-xs font-mono text-slate-200 overflow-x-auto whitespace-pre-wrap">
                  {executionResult ? (
                    <>
                      {executionResult.stdout && (
                        <div className="text-emerald-400">{executionResult.stdout}</div>
                      )}
                      {executionResult.stderr && (
                        <div className="text-rose-400 mt-1">{executionResult.stderr}</div>
                      )}
                      {!executionResult.stdout && !executionResult.stderr && (
                        <div className="text-slate-500 italic">
                          O programa foi executado mas não gerou saída no console.
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-slate-600 italic">
                      Clique em "Rodar Código" para ver a saída da compilação e execução aqui.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
