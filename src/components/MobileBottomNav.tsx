import React from 'react';
import { Layers, BookOpen, FileText } from 'lucide-react';

interface MobileBottomNavProps {
  currentView: 'dashboard' | 'ide' | 'architecture';
  onViewChange: (view: 'dashboard' | 'ide' | 'architecture') => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentView,
  onViewChange,
}) => {
  return (
    <nav
      id="mobile-bottom-navigation"
      aria-label="Navegação Mobile"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800/80 px-2 py-1.5 pb-safe select-none shadow-lg"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        <button
          id="mobile-nav-dashboard"
          onClick={() => onViewChange('dashboard')}
          className={`flex-1 flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-colors min-h-[44px] ${
            currentView === 'dashboard'
              ? 'text-cyan-400 font-semibold bg-cyan-500/10'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-5 h-5 mb-0.5" />
          <span className="text-[11px]">Trilhas</span>
        </button>

        <button
          id="mobile-nav-ide"
          onClick={() => onViewChange('ide')}
          className={`flex-1 flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-colors min-h-[44px] ${
            currentView === 'ide'
              ? 'text-cyan-400 font-semibold bg-cyan-500/10'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-5 h-5 mb-0.5" />
          <span className="text-[11px]">Lição & IDE</span>
        </button>

        <button
          id="mobile-nav-arch"
          onClick={() => onViewChange('architecture')}
          className={`flex-1 flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-colors min-h-[44px] ${
            currentView === 'architecture'
              ? 'text-indigo-400 font-semibold bg-indigo-500/10'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-5 h-5 mb-0.5" />
          <span className="text-[11px]">Arquitetura</span>
        </button>
      </div>
    </nav>
  );
};
