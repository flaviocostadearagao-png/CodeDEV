import React, { useState } from 'react';
import { TRACKS, SAMPLE_LESSONS, INITIAL_BADGES } from './data/curriculumData';
import { Track, Lesson, UserStats, DifficultyLevel } from './types';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { LessonIDE } from './components/LessonIDE';
import { ArchitectureSpecViewer } from './components/ArchitectureSpecViewer';

export default function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'ide' | 'architecture'>('dashboard');
  const [tracks, setTracks] = useState<Track[]>(TRACKS);
  const [activeTrack, setActiveTrack] = useState<Track>(TRACKS[1]); // Default to JavaScript
  const [lessons, setLessons] = useState<Lesson[]>(SAMPLE_LESSONS);
  const [currentLessonId, setCurrentLessonId] = useState<string>(SAMPLE_LESSONS[0].id);

  const [userStats, setUserStats] = useState<UserStats>({
    xp: 420,
    level: 2,
    streakDays: 5,
    completedLessonsCount: 3,
    totalTimeMinutes: 68,
    badges: INITIAL_BADGES,
  });

  const handleSelectTrack = (track: Track) => {
    setActiveTrack(track);
    // Select first lesson for this track if exists
    const trackLesson = lessons.find((l) => l.trackId === track.id);
    if (trackLesson) {
      setCurrentLessonId(trackLesson.id);
    }
  };

  const handleStartLesson = (lessonId: string) => {
    const target = lessons.find((l) => l.id === lessonId);
    if (target) {
      const matchTrack = tracks.find((t) => t.id === target.trackId);
      if (matchTrack) {
        setActiveTrack(matchTrack);
      }
      setCurrentLessonId(lessonId);
      setCurrentView('ide');
    }
  };

  const handleCompleteLesson = (lessonId: string, xpEarned: number) => {
    // Mark lesson as completed
    setLessons((prev) =>
      prev.map((l) => (l.id === lessonId ? { ...l, completed: true } : l))
    );

    // Update user stats
    setUserStats((prev) => {
      const newXp = prev.xp + xpEarned;
      const newLevel = Math.floor(newXp / 500) + 1;
      const newCompletedCount = prev.completedLessonsCount + 1;

      // Unlock badge if reached 4 completed
      const updatedBadges = prev.badges.map((b) => {
        if (b.id === 'b4' && !b.unlockedAt && newCompletedCount >= 4) {
          return { ...b, unlockedAt: 'Agora' };
        }
        return b;
      });

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        completedLessonsCount: newCompletedCount,
        totalTimeMinutes: prev.totalTimeMinutes + 12,
        badges: updatedBadges,
      };
    });

    // Update track completed counter
    const currentLesson = lessons.find((l) => l.id === lessonId);
    if (currentLesson) {
      setTracks((prev) =>
        prev.map((t) =>
          t.id === currentLesson.trackId
            ? { ...t, completedLessons: Math.min(t.totalLessons, t.completedLessons + 1) }
            : t
        )
      );
    }
  };

  const activeLesson =
    lessons.find((l) => l.id === currentLessonId) || lessons[0];

  const trackLessons = lessons.filter((l) => l.trackId === activeTrack.id);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30">
      {/* Top Navigation & Status Bar */}
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
        activeTrack={activeTrack}
        userStats={userStats}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {currentView === 'dashboard' && (
          <Dashboard
            tracks={tracks}
            activeTrack={activeTrack}
            lessons={lessons}
            userStats={userStats}
            onSelectTrack={handleSelectTrack}
            onStartLesson={handleStartLesson}
            onOpenArchitecture={() => setCurrentView('architecture')}
          />
        )}

        {currentView === 'ide' && (
          <LessonIDE
            lesson={activeLesson}
            allLessons={trackLessons.length > 0 ? trackLessons : lessons}
            activeTrack={activeTrack}
            onSelectLesson={(id) => setCurrentLessonId(id)}
            onCompleteLesson={handleCompleteLesson}
            onBackToDashboard={() => setCurrentView('dashboard')}
          />
        )}

        {currentView === 'architecture' && <ArchitectureSpecViewer />}
      </main>
    </div>
  );
}
