import './style.css';
import { answerQuestion, createGame, nextQuestion, scorePercentage } from './game';
import { levelNames, questions } from './questions';

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('Rakenduse juurelement #app puudub.');

let state = createGame();
let screen: 'welcome' | 'quiz' | 'results' = 'welcome';
const letters = ['A', 'B', 'C', 'D'];

function element<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string, text?: string): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function button(text: string, className: string, onClick: () => void): HTMLButtonElement {
  const node = element('button', className, text);
  node.type = 'button';
  node.addEventListener('click', onClick);
  return node;
}

function frame(): { shell: HTMLDivElement; body: HTMLElement } {
  const shell = element('div', 'shell');
  const header = element('header', 'site-header');
  const brand = element('div', 'brand');
  brand.append(element('span', 'brand-icon', '</>'), element('span', '', 'TypeScript Quest'));
  const badge = element('span', 'header-badge', 'ÕPI · PROOVI · ARENE');
  header.append(brand, badge);
  const body = element('main', 'card');
  const footer = element('footer', 'footer', 'TypeScript Quest · õppemäng · 2026');
  shell.append(header, body, footer);
  return { shell, body };
}

function renderWelcome(body: HTMLElement): void {
  const eyebrow = element('p', 'eyebrow', 'INTERAKTIIVNE ÕPIMÄNG');
  const title = element('h1', 'hero-title');
  title.append('Õpi TypeScripti ', element('span', 'gradient-text', 'mängides.'));
  const intro = element('p', 'intro', 'Vasta küsimustele, leia koodist vigu ja ennusta programmide tulemusi. Iga vastusega saad targemaks.');
  const levels = element('div', 'level-grid');
  const meta = [
    ['01', 'Põhitõed', 'Muutujad, tüübid ja liidesed'],
    ['02', 'Leia viga', 'Tunne ära tüübivead'],
    ['03', 'Koodi tulemus', 'Mõtle nagu kompilaator'],
  ];
  for (const [number, name, detail] of meta) {
    const card = element('div', 'level-card');
    card.append(element('span', 'level-number', number), element('strong', '', name), element('span', 'level-detail', detail));
    levels.append(card);
  }
  const actions = element('div', 'hero-actions');
  actions.append(button('Alusta mängu →', 'button primary', () => {
    state = createGame();
    answerHistory = [];
    screen = 'quiz';
    render();
  }), element('span', 'muted', '15 küsimust · 3 taset · tasuta'));
  body.append(eyebrow, title, intro, levels, actions);
}

function renderQuiz(body: HTMLElement): void {
  const question = questions[state.questionIndex];
  const answered = state.selectedIndex !== null;
  const info = element('div', 'quiz-topline');
  info.append(element('span', 'pill', `TASE ${question.level} · ${levelNames[question.level]}`), element('span', 'score', `★ ${state.score} punkti`));
  const progressLabel = element('div', 'progress-label');
  progressLabel.append(element('span', '', `Küsimus ${state.questionIndex + 1} / ${questions.length}`), element('span', '', `${Math.round((state.questionIndex / questions.length) * 100)}% läbitud`));
  const track = element('div', 'progress-track');
  const fill = element('div', 'progress-fill');
  fill.style.width = `${(state.questionIndex / questions.length) * 100}%`;
  track.append(fill);
  const title = element('h1', 'question-title', question.title);
  body.append(info, progressLabel, track, title);

  if (question.code) body.append(element('pre', 'code-block', question.code));
  const answers = element('div', 'answers');
  question.answers.forEach((answer, index) => {
    const answerButton = element('button', 'answer-button');
    answerButton.type = 'button';
    answerButton.append(element('span', 'answer-letter', letters[index]), element('span', 'answer-text', answer));
    if (answered) {
      answerButton.disabled = true;
      if (index === question.correctIndex) answerButton.classList.add('correct');
      else if (index === state.selectedIndex) answerButton.classList.add('incorrect');
    }
    answerButton.addEventListener('click', () => {
      selectAnswer(index);
    });
    answers.append(answerButton);
  });
  body.append(answers);

  if (answered) {
    const correct = state.selectedIndex === question.correctIndex;
    const feedback = element('section', `feedback ${correct ? 'feedback-correct' : 'feedback-incorrect'}`);
    feedback.setAttribute('role', 'status');
    feedback.append(element('strong', '', correct ? '✓ Õige vastus!' : '✕ Seekord mitte.'), element('p', '', question.explanation));
    body.append(feedback);
    body.append(button(state.questionIndex === questions.length - 1 ? 'Vaata tulemust →' : 'Järgmine küsimus →', 'button primary next-button', () => {
      state = nextQuestion(state, questions.length);
      if (state.finished) screen = 'results';
      render();
    }));
  } else {
    body.append(element('p', 'hint', 'Vali üks vastus. Õige vastuse selgitus ilmub kohe pärast valimist.'));
  }
}

function renderResults(body: HTMLElement): void {
  const percentage = scorePercentage(state.score, questions.length);
  const title = percentage >= 80 ? 'Suurepärane töö!' : percentage >= 50 ? 'Tubli algus!' : 'Harjutamine teeb meistriks!';
  body.append(element('p', 'eyebrow', 'MÄNG LÄBITUD'), element('div', 'result-icon', '🏆'), element('h1', 'result-title', title));
  body.append(element('p', 'result-score', `${state.score} / ${questions.length}`));
  body.append(element('p', 'result-summary', `Vastasid õigesti ${percentage}% küsimustest.`));
  const breakdown = element('div', 'results-breakdown');
  ([1, 2, 3] as const).forEach(level => {
    const levelQuestions = questions.filter(question => question.level === level);
    // Iga taseme täpse tulemuse jaoks kasutatakse vastuste ajalugu.
    const correct = answerHistory.filter(entry => entry.level === level && entry.correct).length;
    const line = element('div', 'result-row');
    line.append(element('span', '', `${level}. ${levelNames[level]}`), element('strong', '', `${correct} / ${levelQuestions.length}`));
    breakdown.append(line);
  });
  body.append(breakdown, button('Mängi uuesti ↻', 'button primary', () => {
    state = createGame();
    answerHistory = [];
    screen = 'quiz';
    render();
  }));
}

interface AnswerRecord { level: 1 | 2 | 3; correct: boolean }
let answerHistory: AnswerRecord[] = [];

function render(): void {
  if (!app) return;
  const { shell, body } = frame();
  if (screen === 'welcome') renderWelcome(body);
  else if (screen === 'quiz') renderQuiz(body);
  else renderResults(body);
  app.replaceChildren(shell);
}

// Vastuste ajaloo uuendamine toimub ainult ühe korra iga küsimuse kohta.
// Kasutame ühe delegaatkuulaja asemel wrapper-funktsiooni, et tulemus jääks täpseks.
function selectAnswer(index: number): void {
  if (state.selectedIndex !== null || state.finished) return;
  const question = questions[state.questionIndex];
  state = answerQuestion(state, index, questions);
  answerHistory.push({ level: question.level, correct: index === question.correctIndex });
  render();
}

// Klahvidega vastamine: 1–4. Delegatsioon ühes kohas, et vältida korduvaid kuulajaid.
document.addEventListener('keydown', event => {
  if (screen !== 'quiz' || state.selectedIndex !== null || event.altKey || event.ctrlKey || event.metaKey) return;
  const index = Number(event.key) - 1;
  if (Number.isInteger(index) && index >= 0 && index < 4) selectAnswer(index);
});

render();
