import React from 'react';
import { Terminal, Flame, Zap, Award, BookOpen, Layers, FileText, CheckCircle2, Cloud } from 'lucide-react';
import { UserStats, Track } from '../types';

interface HeaderProps {
  currentView: 'dashboard' | 'ide' | 'architecture';
  onViewChange: (view: 'dashboard' | 'ide' | 'architecture') => void;
  activeTrack: Track;
  userStats: UserStats;
  saveStatus?: 'synced' | 'saving';
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  activeTrack,
  userStats,
  saveStatus = 'synced',
}) => {
  const currentLevelXp = userStats.xp % 500;
  const levelProgress = Math.min(100, Math.round((currentLevelXp / 500) * 100));

  return (
    <header
      id="app-header"
      className="sticky top-0 z-30 w-full bg-slate-900 border-b border-slate-800 text-white shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3 sm:gap-6 min-w-0">
          <button
            id="brand-logo-btn"
            onClick={() => onViewChange('dashboard')}
            className="flex items-center gap-2 sm:gap-3 group text-left focus:outline-none min-w-0"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform shrink-0">
              <Terminal className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-bold text-base sm:text-lg tracking-tight text-white truncate">
                  DevDoZero
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-semibold px-1.5 py-0.2 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shrink-0">
                  EdTech
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-400 hidden sm:block truncate">
                Do Absoluto Zero ao Avançado
              </p>
            </div>
          </button>

          {/* Navigation links (desktop) */}
          <nav className="hidden md:flex items-center gap-1 ml-4 border-l border-slate-800 pl-4">
            <button
              id="nav-dashboard-btn"
              onClick={() => onViewChange('dashboard')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                currentView === 'dashboard'
                  ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Layers className="w-4 h-4" />
              Dashboard & Trilhas
            </button>

            <button
              id="nav-ide-btn"
              onClick={() => onViewChange('ide')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                currentView === 'ide'
                  ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Ambiente de Lição (IDE)
            </button>

            <button
              id="nav-spec-btn"
              onClick={() => onViewChange('architecture')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                currentView === 'architecture'
                  ? 'bg-indigo-950/70 text-indigo-300 border border-indigo-500/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <FileText className="w-4 h-4" />
              Arquitetura & Especificação
            </button>
          </nav>
        </div>

        {/* User Stats & Active Track Indicator */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Background Save Indicator */}
          <div
            title="Progresso e código salvos em segundo plano continuamente"
            className="flex items-center gap-1 px-2 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-[11px] font-medium text-slate-300"
          >
            {saveStatus === 'saving' ? (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span className="hidden sm:inline text-amber-300">Salvando...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="hidden md:inline text-emerald-400 font-semibold">Salvo em 2º plano</span>
                <span className="md:hidden text-emerald-400 text-[10px]">Salvo</span>
              </>
            )}
          </div>

          {/* Active Track Pill (desktop) */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeTrack.accentColor }} />
            <span className="text-slate-400">Trilha:</span>
            <span className="font-semibold text-slate-200">{activeTrack.name}</span>
          </div>

          {/* Daily Streak */}
          <div
            title="Streak de estudos diário"
            className="flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold"
          >
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
            <span className="hidden sm:inline">{userStats.streakDays} dias</span>
            <span className="sm:hidden">{userStats.streakDays}d</span>
          </div>

          {/* XP & Level Widget */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 bg-slate-800/90 border border-slate-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl text-xs">
            <div className="flex items-center gap-1 text-cyan-400 font-bold">
              <Zap className="w-3.5 h-3.5 fill-cyan-400 shrink-0" />
              <span>{userStats.xp} <span className="hidden sm:inline">XP</span></span>
            </div>
            <div className="hidden sm:block h-4 w-[1px] bg-slate-700" />
            <div className="hidden sm:flex flex-col min-w-[70px]">
              <div className="flex items-center justify-between text-[10px] text-slate-300 mb-0.5">
                <span>Nível {userStats.level}</span>
                <span className="text-slate-400">{levelProgress}%</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-400 to-indigo-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${levelProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
