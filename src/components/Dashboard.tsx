import React, { useState } from 'react';
import {
  Play,
  Award,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  ArrowRight,
  Code2,
  Terminal,
  Zap,
  TrendingUp,
  Cpu,
  BookOpen,
  Filter,
  RotateCcw,
  AlertTriangle,
} from 'lucide-react';
import { Track, Lesson, UserStats, DifficultyLevel, Language } from '../types';

interface DashboardProps {
  tracks: Track[];
  activeTrack: Track;
  lessons: Lesson[];
  userStats: UserStats;
  onSelectTrack: (track: Track) => void;
  onStartLesson: (lessonId: string) => void;
  onOpenArchitecture: () => void;
  onResetStats?: () => void;
}

const getTrackAbbr = (id: string, name: string) => {
  if (id === 'html') return 'HTML';
  if (id === 'css') return 'CSS';
  if (id === 'javascript') return 'JS';
  if (id === 'typescript') return 'TS';
  if (id === 'python') return 'PY';
  if (id === 'java') return 'JAVA';
  if (id === 'csharp') return 'C#';
  return name.slice(0, 3).toUpperCase();
};

export const Dashboard: React.FC<DashboardProps> = ({
  tracks,
  activeTrack,
  lessons,
  userStats,
  onSelectTrack,
  onStartLesson,
  onOpenArchitecture,
  onResetStats,
}) => {
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<DifficultyLevel | 'all'>('all');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Filter lessons for the active track and optional level filter
  const trackLessons = lessons.filter((l) => l.trackId === activeTrack.id);
  const filteredLessons = trackLessons.filter(
    (l) => selectedLevelFilter === 'all' || l.level === selectedLevelFilter
  );

  const completedInTrack = trackLessons.filter((l) => l.completed).length;
  const trackProgressPct = trackLessons.length > 0
    ? Math.round((completedInTrack / trackLessons.length) * 100)
    : 0;

  // Level breakdowns
  const inicianteLessons = trackLessons.filter((l) => l.level === 'iniciante');
  const intermediarioLessons = trackLessons.filter((l) => l.level === 'intermediario');
  const avancadoLessons = trackLessons.filter((l) => l.level === 'avancado');

  const iniciantePct = inicianteLessons.length
    ? Math.round((inicianteLessons.filter((l) => l.completed).length / inicianteLessons.length) * 100)
    : 0;
  const intermediarioPct = intermediarioLessons.length
    ? Math.round((intermediarioLessons.filter((l) => l.completed).length / intermediarioLessons.length) * 100)
    : 0;
  const avancadoPct = avancadoLessons.length
    ? Math.round((avancadoLessons.filter((l) => l.completed).length / avancadoLessons.length) * 100)
    : 0;

  const nextIncompleteLesson = trackLessons.find((l) => !l.completed) || trackLessons[0];

  return (
    <div id="dashboard-view" className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 sm:space-y-8">
      {/* Welcome & Global Stats Banner */}
      <div className="relative rounded-xl sm:rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 border border-slate-800 p-4 sm:p-8 overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Plataforma DevDoZero · Trilha: {activeTrack.name}</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-black tracking-tight text-white">
              Do Zero ao Avançado em Programação
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Trilhas dinâmicas com teoria focada, editor integrado e validação instantânea por testes automatizados.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto">
            {nextIncompleteLesson && (
              <button
                id="resume-lesson-cta"
                onClick={() => onStartLesson(nextIncompleteLesson.id)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 transition-all active:scale-98 cursor-pointer min-h-[42px]"
              >
                <Play className="w-4 h-4 fill-current" />
                <span className="truncate">Continuar: {nextIncompleteLesson.title}</span>
              </button>
            )}

            <button
              onClick={onOpenArchitecture}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm border border-slate-700 transition-colors min-h-[42px]"
            >
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>Arquitetura do Sistema</span>
            </button>

            {onResetStats && (
              <button
                onClick={() => setShowResetConfirm(true)}
                title="Zerar todas as estatísticas e progresso para começar do zero"
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-2.5 sm:py-3 rounded-xl bg-slate-900/80 hover:bg-rose-950/40 text-slate-400 hover:text-rose-300 font-medium text-xs border border-slate-800 hover:border-rose-900/60 transition-colors min-h-[42px]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Zerar Estatísticas</span>
              </button>
            )}
          </div>
        </div>

        {/* Reset Confirmation Dialog */}
        {showResetConfirm && (
          <div className="mt-4 p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-rose-300">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>Deseja realmente zerar todo o progresso, XP e estatísticas acumuladas?</span>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  onResetStats?.();
                  setShowResetConfirm(false);
                }}
                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold"
              >
                Confirmar Zerar
              </button>
            </div>
          </div>
        )}

        {/* Global Progress Metric Bars */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-slate-900/80 p-3 sm:p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Progresso</span>
              <span className="font-bold text-cyan-400">{trackProgressPct}%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 sm:h-2 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-cyan-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${trackProgressPct}%` }}
              />
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-500 mt-1.5 flex justify-between">
              <span>{completedInTrack} concluídas</span>
              <span>{trackLessons.length} lições</span>
            </div>
          </div>

          <div className="bg-slate-900/80 p-3 sm:p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>XP Total</span>
              <span className="font-bold text-amber-400 flex items-center gap-0.5">
                <Zap className="w-3 h-3 fill-amber-400" />
                {userStats.xp}
              </span>
            </div>
            <div className="text-lg sm:text-xl font-extrabold text-white mt-1">
              Nível {userStats.level}
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-500 mt-1 truncate">
              +{500 - (userStats.xp % 500)} XP p/ Nível {userStats.level + 1}
            </div>
          </div>

          <div className="bg-slate-900/80 p-3 sm:p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Ofensiva</span>
              <span className="font-bold text-orange-400">🔥 {userStats.streakDays}d</span>
            </div>
            <div className="text-lg sm:text-xl font-extrabold text-white mt-1 truncate">
              {userStats.totalTimeMinutes} min
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-500 mt-1">
              Consistência diária
            </div>
          </div>

          <div className="bg-slate-900/80 p-3 sm:p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Conquistas</span>
              <span className="font-bold text-indigo-400">
                {userStats.badges.filter((b) => b.unlockedAt).length}/{userStats.badges.length}
              </span>
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5 mt-2 overflow-x-auto">
              {userStats.badges.map((b) => (
                <div
                  key={b.id}
                  title={`${b.title}: ${b.description}`}
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg shrink-0 flex items-center justify-center text-xs border ${
                    b.unlockedAt
                      ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                      : 'bg-slate-800/40 text-slate-600 border-slate-800'
                  }`}
                >
                  <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Language Tracks Carousel / Selection */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              Trilhas de Aprendizado Disponíveis
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Escolha entre as 7 trilhas completas: do HTML, CSS e JavaScript essenciais até TypeScript, Python, Java e C#.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7 gap-2.5 sm:gap-3">
          {tracks.map((track) => {
            const isSelected = track.id === activeTrack.id;
            return (
              <button
                key={track.id}
                onClick={() => onSelectTrack(track)}
                className={`text-left p-3 sm:p-4 rounded-xl border transition-all relative overflow-hidden flex flex-col justify-between group cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-500 ring-2 ring-cyan-500/20 shadow-lg'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <div
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-white font-bold text-[11px] sm:text-xs shadow shrink-0 tracking-tight"
                      style={{ backgroundColor: track.accentColor }}
                    >
                      {getTrackAbbr(track.id, track.name)}
                    </div>
                    {isSelected && (
                      <span className="text-[9px] sm:text-[10px] uppercase font-bold px-1.5 sm:px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                        Ativa
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-white text-xs sm:text-sm group-hover:text-cyan-400 transition-colors truncate">
                    {track.name}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 sm:mt-1 line-clamp-2 leading-relaxed">
                    {track.tagline}
                  </p>
                </div>

                <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-slate-800/80">
                  <div className="flex justify-between text-[9px] sm:text-[10px] text-slate-400 mb-1">
                    <span>Taxonomia</span>
                    <span className="font-semibold text-slate-300">{track.totalLessons} lições</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: track.accentColor,
                        width: `${Math.round((track.completedLessons / track.totalLessons) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Module Progression Breakdown: Iniciante, Intermediário, Avançado */}
      <section className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
              Progressão Pedagógica por Nível ({activeTrack.name})
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
              A taxonomia em 3 níveis garante avanço estruturado baseado em competências práticas.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5">
          {/* Nível Iniciante */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold px-2.5 py-0.5 sm:py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Nível 1 · Iniciante
                </span>
                <span className="text-xs font-bold text-emerald-400">{iniciantePct}%</span>
              </div>
              <h3 className="font-bold text-white text-sm sm:text-base">Fundamentos & Lógica Inicial</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sintaxe básica, variáveis, tipos primitivos, operadores lógicos e condicionais (if/else).
              </p>
              <div className="w-full bg-slate-800 h-1.5 sm:h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-400 h-full rounded-full transition-all"
                  style={{ width: `${iniciantePct}%` }}
                />
              </div>
            </div>
            <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>{inicianteLessons.filter((l) => l.completed).length} de {inicianteLessons.length} desafios</span>
              <span className="text-emerald-400 font-semibold">Liberado</span>
            </div>
          </div>

          {/* Nível Intermediário */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold px-2.5 py-0.5 sm:py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Nível 2 · Intermediário
                </span>
                <span className="text-xs font-bold text-amber-400">{intermediarioPct}%</span>
              </div>
              <h3 className="font-bold text-white text-sm sm:text-base">Modularização & Coleções</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Estruturas de repetição (loops), funções, manipulação de arrays/listas e introdução à POO.
              </p>
              <div className="w-full bg-slate-800 h-1.5 sm:h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-400 h-full rounded-full transition-all"
                  style={{ width: `${intermediarioPct}%` }}
                />
              </div>
            </div>
            <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>{intermediarioLessons.filter((l) => l.completed).length} de {intermediarioLessons.length} desafios</span>
              <span className="text-amber-400 font-semibold">Liberado</span>
            </div>
          </div>

          {/* Nível Avançado */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold px-2.5 py-0.5 sm:py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  Nível 3 · Avançado
                </span>
                <span className="text-xs font-bold text-purple-400">{avancadoPct}%</span>
              </div>
              <h3 className="font-bold text-white text-sm sm:text-base">Engenharia, Concorrência & Algoritmos</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Estruturas complexas, assincronismo, consumo de APIs, Design Patterns e otimização.
              </p>
              <div className="w-full bg-slate-800 h-1.5 sm:h-2 rounded-full overflow-hidden">
                <div
                  className="bg-purple-400 h-full rounded-full transition-all"
                  style={{ width: `${avancadoPct}%` }}
                />
              </div>
            </div>
            <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>{avancadoLessons.filter((l) => l.completed).length} de {avancadoLessons.length} desafios</span>
              <span className="text-purple-400 font-semibold">Liberado</span>
            </div>
          </div>
        </div>
      </section>

      {/* Lesson List / Curriculum Explorer */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
              Lições Interativas da Trilha ({activeTrack.name})
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
              Toque em qualquer lição para abrir o editor com suporte móvel completo.
            </p>
          </div>

          {/* Level Filter */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-lg text-xs overflow-x-auto max-w-full">
            {[
              { id: 'all', label: 'Todos' },
              { id: 'iniciante', label: 'Iniciante' },
              { id: 'intermediario', label: 'Intermediário' },
              { id: 'avancado', label: 'Avançado' },
            ].map((lvl) => (
              <button
                key={lvl.id}
                onClick={() => setSelectedLevelFilter(lvl.id as any)}
                className={`px-2.5 sm:px-3 py-1.5 rounded-md font-semibold whitespace-nowrap transition-colors min-h-[32px] ${
                  selectedLevelFilter === lvl.id
                    ? 'bg-slate-800 text-cyan-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {lvl.label}
              </button>
            ))}
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {filteredLessons.map((lesson) => (
            <div
              key={lesson.id}
              className={`p-4 sm:p-5 rounded-xl border bg-slate-900/90 transition-all flex flex-col justify-between group ${
                lesson.completed
                  ? 'border-emerald-500/30'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                      lesson.level === 'iniciante'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : lesson.level === 'intermediario'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                    }`}
                  >
                    {lesson.level}
                  </span>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-amber-400 font-bold flex items-center gap-0.5">
                      <Zap className="w-3 h-3 fill-amber-400" />+{lesson.xpReward} XP
                    </span>
                    {lesson.completed && (
                      <span className="flex items-center gap-1 text-emerald-400 text-xs font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Concluída
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="font-bold text-white text-sm group-hover:text-cyan-400 transition-colors">
                  {lesson.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">{lesson.moduleTitle}</p>
                <p className="text-xs text-slate-300/80 mt-1.5 line-clamp-2 leading-relaxed">
                  {lesson.instructions}
                </p>
              </div>

              <div className="mt-3.5 pt-2.5 sm:mt-4 sm:pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>{lesson.estimatedMinutes} min</span>
                  <span className="mx-1">·</span>
                  <span>{lesson.testCases.length} testes</span>
                </div>

                <button
                  onClick={() => onStartLesson(lesson.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer min-h-[36px] ${
                    lesson.completed
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                      : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-sm shadow-cyan-600/20 active:scale-98'
                  }`}
                >
                  <span>{lesson.completed ? 'Revisar' : 'Praticar'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
