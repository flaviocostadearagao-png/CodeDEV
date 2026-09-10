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
}

export const Dashboard: React.FC<DashboardProps> = ({
  tracks,
  activeTrack,
  lessons,
  userStats,
  onSelectTrack,
  onStartLesson,
  onOpenArchitecture,
}) => {
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<DifficultyLevel | 'all'>('all');

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
    <div id="dashboard-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome & Global Stats Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 border border-slate-800 p-6 sm:p-8 overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Plataforma DevDoZero · Trilha Ativa: {activeTrack.name}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Do Zero ao Avançado em Programação
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Trilhas dinâmicas com teoria focada, editor integrado e validação instantânea por testes automatizados.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {nextIncompleteLesson && (
              <button
                id="resume-lesson-cta"
                onClick={() => onStartLesson(nextIncompleteLesson.id)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Continuar Lição: {nextIncompleteLesson.title}</span>
              </button>
            )}

            <button
              onClick={onOpenArchitecture}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-colors"
            >
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>Ver Arquitetura do Sistema</span>
            </button>
          </div>
        </div>

        {/* Global Progress Metric Bars */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Progresso na Trilha</span>
              <span className="font-bold text-cyan-400">{trackProgressPct}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-cyan-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${trackProgressPct}%` }}
              />
            </div>
            <div className="text-[11px] text-slate-500 mt-1.5 flex justify-between">
              <span>{completedInTrack} concluídas</span>
              <span>{trackLessons.length} lições no currículo</span>
            </div>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>XP Acumulado</span>
              <span className="font-bold text-amber-400 flex items-center gap-1">
                <Zap className="w-3 h-3 fill-amber-400" />
                {userStats.xp} XP
              </span>
            </div>
            <div className="text-xl font-extrabold text-white mt-1">
              Nível {userStats.level}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Faltam {500 - (userStats.xp % 500)} XP para o Nível {userStats.level + 1}
            </div>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Ritmo de Estudo</span>
              <span className="font-bold text-orange-400">🔥 {userStats.streakDays} Dias</span>
            </div>
            <div className="text-xl font-extrabold text-white mt-1">
              {userStats.totalTimeMinutes} min praticados
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Consistência diária garantida
            </div>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Badges Conquistadas</span>
              <span className="font-bold text-indigo-400">
                {userStats.badges.filter((b) => b.unlockedAt).length} / {userStats.badges.length}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              {userStats.badges.map((b) => (
                <div
                  key={b.id}
                  title={`${b.title}: ${b.description}`}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs border ${
                    b.unlockedAt
                      ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                      : 'bg-slate-800/40 text-slate-600 border-slate-800'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
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
              Escolha entre as 5 linguagens principais do mercado: do zero ao domínio enterprise.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {tracks.map((track) => {
            const isSelected = track.id === activeTrack.id;
            return (
              <button
                key={track.id}
                onClick={() => onSelectTrack(track)}
                className={`text-left p-4 rounded-xl border transition-all relative overflow-hidden flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-500 ring-2 ring-cyan-500/20 shadow-lg'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow"
                      style={{ backgroundColor: track.accentColor }}
                    >
                      {track.name.slice(0, 2).toUpperCase()}
                    </div>
                    {isSelected && (
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                        Ativa
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-white text-sm group-hover:text-cyan-400 transition-colors">
                    {track.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {track.tagline}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <div className="flex justify-between text-[10px] text-slate-400 mb-1">
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
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
              Progressão Pedagógica por Nível ({activeTrack.name})
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              A taxonomia em 3 níveis garante avanço estruturado baseado em competências práticas.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Nível Iniciante */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Nível 1 · Iniciante
                </span>
                <span className="text-xs font-bold text-emerald-400">{iniciantePct}%</span>
              </div>
              <h3 className="font-bold text-white text-base">Fundamentos & Lógica Inicial</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sintaxe básica, variáveis, tipos de dados primitivos, operadores aritméticos/lógicos e condicionais (if/else).
              </p>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-400 h-full rounded-full transition-all"
                  style={{ width: `${iniciantePct}%` }}
                />
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>{inicianteLessons.filter((l) => l.completed).length} de {inicianteLessons.length} desafios</span>
              <span className="text-emerald-400 font-semibold">Liberado</span>
            </div>
          </div>

          {/* Nível Intermediário */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Nível 2 · Intermediário
                </span>
                <span className="text-xs font-bold text-amber-400">{intermediarioPct}%</span>
              </div>
              <h3 className="font-bold text-white text-base">Modularização & Coleções</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Estruturas de repetição (loops), funções, manipulação de arrays/listas, escopo léxico e introdução à POO.
              </p>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-400 h-full rounded-full transition-all"
                  style={{ width: `${intermediarioPct}%` }}
                />
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>{intermediarioLessons.filter((l) => l.completed).length} de {intermediarioLessons.length} desafios</span>
              <span className="text-amber-400 font-semibold">Liberado</span>
            </div>
          </div>

          {/* Nível Avançado */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold px-2.5 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  Nível 3 · Avançado
                </span>
                <span className="text-xs font-bold text-purple-400">{avancadoPct}%</span>
              </div>
              <h3 className="font-bold text-white text-base">Engenharia, Concorrência & Algoritmos</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Estruturas de dados complexas, assincronismo, consumo de APIs, Design Patterns e otimização de código.
              </p>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-purple-400 h-full rounded-full transition-all"
                  style={{ width: `${avancadoPct}%` }}
                />
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
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
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              Lições Interativas da Trilha ({activeTrack.name})
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Clique em qualquer lição para abrir o ambiente de 3 painéis com editor e testes.
            </p>
          </div>

          {/* Level Filter */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-lg text-xs">
            {(['all', 'iniciante', 'intermediario', 'avancado'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevelFilter(lvl)}
                className={`px-3 py-1 rounded font-semibold capitalize transition-colors ${
                  selectedLevelFilter === lvl
                    ? 'bg-slate-800 text-cyan-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {lvl === 'all' ? 'Todos os Níveis' : lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLessons.map((lesson) => (
            <div
              key={lesson.id}
              className={`p-5 rounded-xl border bg-slate-900/90 transition-all flex flex-col justify-between group ${
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
                <p className="text-xs text-slate-400 mt-1">{lesson.moduleTitle}</p>
                <p className="text-xs text-slate-300/80 mt-2 line-clamp-2 leading-relaxed">
                  {lesson.instructions}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>{lesson.estimatedMinutes} min</span>
                  <span className="mx-1">·</span>
                  <span>{lesson.testCases.length} testes</span>
                </div>

                <button
                  onClick={() => onStartLesson(lesson.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    lesson.completed
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                      : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-sm shadow-cyan-600/20'
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
