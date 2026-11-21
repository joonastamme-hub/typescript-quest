import type { Question } from './questions';

export interface GameState {
  questionIndex: number;
  score: number;
  selectedIndex: number | null;
  finished: boolean;
}

export function createGame(): GameState {
  return { questionIndex: 0, score: 0, selectedIndex: null, finished: false };
}

export function answerQuestion(state: GameState, selectedIndex: number, questions: readonly Question[]): GameState {
  if (state.finished || state.selectedIndex !== null || !Number.isInteger(selectedIndex) || selectedIndex < 0 || selectedIndex > 3) {
    return state;
  }
  const question = questions[state.questionIndex];
  if (!question) return state;
  return {
    ...state,
    selectedIndex,
    score: state.score + (selectedIndex === question.correctIndex ? 1 : 0),
  };
}

export function nextQuestion(state: GameState, totalQuestions: number): GameState {
  if (state.finished || state.selectedIndex === null || totalQuestions <= 0) return state;
  if (state.questionIndex >= totalQuestions - 1) return { ...state, finished: true };
  return { ...state, questionIndex: state.questionIndex + 1, selectedIndex: null };
}

export function scorePercentage(score: number, totalQuestions: number): number {
  return totalQuestions === 0 ? 0 : Math.round((score / totalQuestions) * 100);
}
