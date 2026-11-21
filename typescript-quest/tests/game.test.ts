import { describe, expect, it } from 'vitest';
import { answerQuestion, createGame, nextQuestion, scorePercentage } from '../src/game';
import { questions } from '../src/questions';

describe('TypeScript Quest', () => {
  it('alustab nullpunktist ja esimesest küsimusest', () => {
    expect(createGame()).toEqual({ questionIndex: 0, score: 0, selectedIndex: null, finished: false });
  });

  it('annab õige vastuse eest ühe punkti', () => {
    const state = answerQuestion(createGame(), questions[0].correctIndex, questions);
    expect(state.score).toBe(1);
  });

  it('ei anna vale vastuse eest punkte', () => {
    const wrongIndex = (questions[0].correctIndex + 1) % 4;
    const state = answerQuestion(createGame(), wrongIndex, questions);
    expect(state.score).toBe(0);
  });

  it('ei lase samale küsimusele kaks korda vastata', () => {
    const once = answerQuestion(createGame(), questions[0].correctIndex, questions);
    const twice = answerQuestion(once, questions[0].correctIndex, questions);
    expect(twice).toBe(once);
  });

  it('ei lase enne vastamist edasi liikuda', () => {
    const initial = createGame();
    expect(nextQuestion(initial, questions.length)).toBe(initial);
  });

  it('liigub vastamise järel järgmisele küsimusele', () => {
    const answered = answerQuestion(createGame(), 0, questions);
    const next = nextQuestion(answered, questions.length);
    expect(next.questionIndex).toBe(1);
    expect(next.selectedIndex).toBeNull();
  });

  it('lõpetab mängu viimase küsimuse järel', () => {
    const last = { ...createGame(), questionIndex: questions.length - 1 };
    const answered = answerQuestion(last, questions[questions.length - 1].correctIndex, questions);
    expect(nextQuestion(answered, questions.length).finished).toBe(true);
  });

  it('arvutab tulemuse protsendi õigesti', () => {
    expect(scorePercentage(12, 15)).toBe(80);
    expect(scorePercentage(0, 0)).toBe(0);
  });

  it('sisaldab 15 küsimust, igal tasemel 5', () => {
    expect(questions).toHaveLength(15);
    for (const level of [1, 2, 3]) {
      expect(questions.filter(q => q.level === level)).toHaveLength(5);
    }
  });

  it('sisaldab iga küsimuse jaoks korrektset vastuseindeksit ja selgitust', () => {
    for (const question of questions) {
      expect(question.answers).toHaveLength(4);
      expect(question.correctIndex).toBeGreaterThanOrEqual(0);
      expect(question.correctIndex).toBeLessThan(4);
      expect(question.explanation.length).toBeGreaterThan(10);
    }
  });
});
