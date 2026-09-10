import React, { useRef, useEffect, useState } from 'react';
import { RotateCcw, Copy, Check, Sparkles } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  onChange: (newCode: string) => void;
  language: string;
  onReset: () => void;
  onRun: () => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  language,
  onReset,
  onRun,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [copied, setCopied] = useState(false);
  const [activeLine, setActiveLine] = useState(1);

  const lines = code.split('\n');
  const lineCount = lines.length;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl + Enter or Cmd + Enter to Run Code
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onRun();
      return;
    }

    // Handle Tab key for proper 2-space indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      const newCode = code.substring(0, start) + '  ' + code.substring(end);
      onChange(newCode);

      // Restore cursor position after insert
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const updateActiveLine = () => {
    if (!textareaRef.current) return;
    const textBeforeCursor = code.substring(0, textareaRef.current.selectionStart);
    const currentLineNumber = textBeforeCursor.split('\n').length;
    setActiveLine(currentLineNumber);
  };

  return (
    <div className="flex flex-col h-full bg-[#181a1f] text-slate-100 font-mono text-sm relative border border-slate-800 rounded-xl overflow-hidden shadow-inner">
      {/* Editor sub-toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#1f232b] border-b border-slate-800 text-xs select-none">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          <span className="ml-2 font-semibold text-slate-300 uppercase tracking-wider">
            main.{language === 'python' ? 'py' : language === 'javascript' ? 'js' : language === 'typescript' ? 'ts' : language === 'java' ? 'java' : 'cs'}
          </span>
          <span className="text-[10px] text-slate-500 px-1.5 py-0.5 rounded bg-slate-800/80">
            UTF-8
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-[11px] hidden sm:inline">
            Linha {activeLine}, Coluna 1
          </span>

          <button
            id="editor-copy-btn"
            onClick={handleCopy}
            title="Copiar código"
            className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copiado' : 'Copiar'}</span>
          </button>

          <button
            id="editor-reset-btn"
            onClick={onReset}
            title="Restaurar código inicial"
            className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Resetar</span>
          </button>
        </div>
      </div>

      {/* Editor Body with Line Numbers */}
      <div className="relative flex-1 flex overflow-hidden">
        {/* Line Numbers gutter */}
        <div
          aria-hidden="true"
          className="w-12 bg-[#16181d] text-slate-600 text-right pr-3 py-3 select-none text-xs border-r border-slate-800/60 leading-6 font-mono"
        >
          {Array.from({ length: Math.max(lineCount, 16) }).map((_, idx) => {
            const lineNum = idx + 1;
            const isCurrent = lineNum === activeLine;
            return (
              <div
                key={lineNum}
                className={isCurrent ? 'text-cyan-400 font-bold bg-cyan-950/30' : ''}
              >
                {lineNum}
              </div>
            );
          })}
        </div>

        {/* Text Area with syntax-friendly styling */}
        <div className="relative flex-1 h-full">
          <textarea
            ref={textareaRef}
            id="code-input-textarea"
            value={code}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onClick={updateActiveLine}
            onKeyUp={updateActiveLine}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            className="w-full h-full p-3 bg-transparent text-slate-100 resize-none font-mono text-xs sm:text-sm leading-6 focus:outline-none focus:ring-0 selection:bg-cyan-500/30 whitespace-pre overflow-auto"
            placeholder="// Escreva seu código aqui..."
          />
        </div>
      </div>

      {/* Footer shortcut helper */}
      <div className="px-4 py-1.5 bg-[#16181d] border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-slate-400">
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200 text-[10px] font-semibold">
              Ctrl
            </kbd>
            +
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200 text-[10px] font-semibold">
              Enter
            </kbd>
            <span className="ml-1">Executar Testes</span>
          </span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:flex items-center gap-1 text-slate-400">
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200 text-[10px] font-semibold">
              Tab
            </kbd>
            <span className="ml-1">Indentar (2 espaços)</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-500">{code.length} caracteres</span>
        </div>
      </div>
    </div>
  );
};
