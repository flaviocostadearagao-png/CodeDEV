import { UserStats, Lesson, Track } from '../types';

const STORAGE_KEYS = {
  USER_STATS: 'devdozero_user_stats_v1',
  COMPLETED_LESSONS: 'devdozero_completed_lessons_v1',
  TRACKS_PROGRESS: 'devdozero_tracks_progress_v1',
  ACTIVE_TRACK: 'devdozero_active_track_v1',
  ACTIVE_LESSON: 'devdozero_active_lesson_v1',
  CODE_DRAFT_PREFIX: 'devdozero_draft_',
  LAST_SAVED: 'devdozero_last_saved_timestamp',
};

export interface StoredData {
  userStats?: UserStats;
  completedLessonIds?: string[];
  trackProgressMap?: Record<string, number>;
  activeTrackId?: string;
  activeLessonId?: string;
  lastSavedAt?: number;
}

/**
 * Carrega todos os dados persistidos em segundo plano
 */
export function loadBackgroundData(): StoredData {
  try {
    const statsStr = localStorage.getItem(STORAGE_KEYS.USER_STATS);
    const completedStr = localStorage.getItem(STORAGE_KEYS.COMPLETED_LESSONS);
    const tracksStr = localStorage.getItem(STORAGE_KEYS.TRACKS_PROGRESS);
    const activeTrackId = localStorage.getItem(STORAGE_KEYS.ACTIVE_TRACK) || undefined;
    const activeLessonId = localStorage.getItem(STORAGE_KEYS.ACTIVE_LESSON) || undefined;
    const lastSavedStr = localStorage.getItem(STORAGE_KEYS.LAST_SAVED);

    return {
      userStats: statsStr ? JSON.parse(statsStr) : undefined,
      completedLessonIds: completedStr ? JSON.parse(completedStr) : undefined,
      trackProgressMap: tracksStr ? JSON.parse(tracksStr) : undefined,
      activeTrackId,
      activeLessonId,
      lastSavedAt: lastSavedStr ? Number(lastSavedStr) : undefined,
    };
  } catch (err) {
    console.warn('[DevDoZero Storage] Falha ao ler dados locais:', err);
    return {};
  }
}

/**
 * Salva o progresso das estatísticas em segundo plano
 */
export function saveUserStats(stats: UserStats): void {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_STATS, JSON.stringify(stats));
    localStorage.setItem(STORAGE_KEYS.LAST_SAVED, Date.now().toString());
  } catch (err) {
    console.warn('[DevDoZero Storage] Falha ao salvar estatísticas:', err);
  }
}

/**
 * Salva o estado das lições concluídas
 */
export function saveCompletedLessons(completedLessonIds: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.COMPLETED_LESSONS, JSON.stringify(completedLessonIds));
    localStorage.setItem(STORAGE_KEYS.LAST_SAVED, Date.now().toString());
  } catch (err) {
    console.warn('[DevDoZero Storage] Falha ao salvar lições concluídas:', err);
  }
}

/**
 * Salva o progresso das trilhas
 */
export function saveTracksProgress(tracks: Track[]): void {
  try {
    const map: Record<string, number> = {};
    tracks.forEach((t) => {
      map[t.id] = t.completedLessons;
    });
    localStorage.setItem(STORAGE_KEYS.TRACKS_PROGRESS, JSON.stringify(map));
    localStorage.setItem(STORAGE_KEYS.LAST_SAVED, Date.now().toString());
  } catch (err) {
    console.warn('[DevDoZero Storage] Falha ao salvar progresso das trilhas:', err);
  }
}

/**
 * Salva a trilha e lição ativas atuais
 */
export function saveActiveNavigation(trackId: string, lessonId: string): void {
  try {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_TRACK, trackId);
    localStorage.setItem(STORAGE_KEYS.ACTIVE_LESSON, lessonId);
  } catch (err) {
    console.warn('[DevDoZero Storage] Falha ao salvar navegação ativa:', err);
  }
}

/**
 * Salva o rascunho de código do usuário para uma lição específica
 */
export function saveLessonCodeDraft(lessonId: string, code: string): void {
  try {
    localStorage.setItem(`${STORAGE_KEYS.CODE_DRAFT_PREFIX}${lessonId}`, code);
  } catch (err) {
    console.warn('[DevDoZero Storage] Falha ao salvar rascunho de código:', err);
  }
}

/**
 * Recupera o rascunho de código de uma lição (se houver)
 */
export function getLessonCodeDraft(lessonId: string): string | null {
  try {
    return localStorage.getItem(`${STORAGE_KEYS.CODE_DRAFT_PREFIX}${lessonId}`);
  } catch (err) {
    return null;
  }
}

/**
 * Remove o rascunho de código de uma lição (ao reiniciar o código original)
 */
export function clearLessonCodeDraft(lessonId: string): void {
  try {
    localStorage.removeItem(`${STORAGE_KEYS.CODE_DRAFT_PREFIX}${lessonId}`);
  } catch (err) {
    console.warn('[DevDoZero Storage] Falha ao remover rascunho:', err);
  }
}

/**
 * Limpa todo o progresso do usuário para reiniciar do zero
 */
export function resetAllStoredProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.USER_STATS);
    localStorage.removeItem(STORAGE_KEYS.COMPLETED_LESSONS);
    localStorage.removeItem(STORAGE_KEYS.TRACKS_PROGRESS);
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_TRACK);
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_LESSON);
    localStorage.removeItem(STORAGE_KEYS.LAST_SAVED);

    // Limpar rascunhos de código
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(STORAGE_KEYS.CODE_DRAFT_PREFIX)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
  } catch (err) {
    console.warn('[DevDoZero Storage] Falha ao reiniciar dados:', err);
  }
}
