export type Language = 'html' | 'css' | 'javascript' | 'typescript' | 'python' | 'java' | 'csharp';

export type DifficultyLevel = 'iniciante' | 'intermediario' | 'avancado';

export interface TestCase {
  id: string;
  description: string;
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
}

export interface Lesson {
  id: string;
  trackId: Language;
  title: string;
  level: DifficultyLevel;
  moduleTitle: string;
  order: number;
  xpReward: number;
  estimatedMinutes: number;
  theory: string;
  objectives: string[];
  instructions: string;
  hints: string[];
  starterCode: string;
  solutionCode: string;
  testCases: TestCase[];
  completed?: boolean;
}

export interface Track {
  id: Language;
  name: string;
  iconName: string;
  badgeColor: string;
  accentColor: string;
  tagline: string;
  description: string;
  totalLessons: number;
  completedLessons: number;
  inicianteCount: number;
  intermediarioCount: number;
  avancadoCount: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  category: 'progress' | 'mastery' | 'streak' | 'architect';
}

export interface UserStats {
  xp: number;
  level: number;
  streakDays: number;
  completedLessonsCount: number;
  totalTimeMinutes: number;
  badges: Badge[];
}

export interface TestResultItem {
  testId: string;
  description: string;
  passed: boolean;
  actualOutput: string;
  expectedOutput: string;
  executionTimeMs: number;
  error?: string;
}

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  executionTimeMs: number;
  memoryKb: number;
  testResults: TestResultItem[];
  allPassed: boolean;
}
