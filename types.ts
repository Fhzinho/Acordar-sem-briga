export enum AppView {
  HOME = 'HOME',
  PREPARE = 'PREPARE',
  PREPARE_END = 'PREPARE_END',
  GUIDED_AWAKE = 'GUIDED_AWAKE',
  QUICK_MODE = 'QUICK_MODE',
  FULL_SEQUENCE = 'FULL_SEQUENCE',
  END_SCREEN = 'END_SCREEN'
}

export interface HistoryRecord {
  date: string; // YYYY-MM-DD
  rating: 'good' | 'medium' | 'hard';
}

export interface AppState {
  streak: number;
  lastCompleted: string | null;
  history: HistoryRecord[];
}