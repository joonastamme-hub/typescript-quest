export type Level = 1 | 2 | 3;

export interface Question {
  id: number;
  level: Level;
  title: string;
  code?: string;
  answers: readonly [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
}

export const levelNames: Record<Level, string> = {
  1: 'Põhitõed',
  2: 'Leia viga',
  3: 'Koodi tulemus',
};

export const questions: readonly Question[] = [
  {
    id: 1, level: 1, title: 'Milline muutuja deklaratsioon on korrektne?',
    answers: ['let age: number = 25;', 'let age = number: 25;', 'number age = 25;', 'let number = age: 25;'],
    correctIndex: 0,
    explanation: 'TypeScriptis kirjutatakse tüübiannotatsioon muutuja nime järele: nimi: tüüp.',
  },
  {
    id: 2, level: 1, title: 'Milline tüüp sobib väärtusele true?',
    answers: ['string', 'number', 'boolean', 'object'],
    correctIndex: 2,
    explanation: 'boolean on tõeväärtustüüp, mille väärtused on true ja false.',
  },
  {
    id: 3, level: 1, title: 'Millise märksõnaga deklareerid muutuja, millele ei saa uut väärtust omistada?',
    answers: ['var', 'const', 'static', 'fixed'],
    correctIndex: 1,
    explanation: 'const takistab muutuja ümbermääramist (aga objekti sisu võib siiski muutuda).',
  },
  {
    id: 4, level: 1, title: 'Kuidas määratleda arvudest koosnev massiiv?',
    answers: ['let nums: string[] = [1, 2];', 'let nums: number = [1, 2];', 'let nums: boolean[] = [1, 2];', 'let nums: number[] = [1, 2];'],
    correctIndex: 3,
    explanation: 'number[] tähendab massiivi, mille iga element peab olema arv.',
  },
  {
    id: 5, level: 1, title: 'Milleks kasutatakse TypeScriptis interface-deklaratsiooni?',
    answers: ['Et määrata objekti kuju ja omaduste tüübid', 'Et käivitada HTML-leht', 'Et laadida CSS-fail', 'Et muuta kõik väärtused stringiks'],
    correctIndex: 0,
    explanation: 'interface kirjeldab näiteks, millised väljad peavad objektil olema ja mis tüüpi need on.',
  },
  {
    id: 6, level: 2, title: 'Mis on selle koodi probleem?',
    code: 'let username: string = 123;',
    answers: ['Muutuja nimi on vale', 'string-tüüpi muutujale antakse arv', 'let on keelatud', 'Viga ei ole'],
    correctIndex: 1,
    explanation: 'Arv 123 on number, kuid muutuja username on deklareeritud string-tüüpi.',
  },
  {
    id: 7, level: 2, title: 'Miks ei läbi see kood tüübikontrolli?',
    code: 'const scores: number[] = [10, "20", 30];',
    answers: ['Massiiv peab olema tühi', 'const ei sobi massiiviga', 'Üks element on string, mitte number', '30 on liiga suur arv'],
    correctIndex: 2,
    explanation: 'number[] ei luba string-tüüpi elementi "20".',
  },
  {
    id: 8, level: 2, title: 'Mis on TypeScripti tüübi seisukohast valesti?',
    code: 'function greet(name: string): string {\n  return 42;\n}',
    answers: ['Funktsioonil puudub nimi', 'Parameeter peab olema number', 'return on keelatud', 'Tagastatakse number, aga lubatud on string'],
    correctIndex: 3,
    explanation: 'Funktsiooni tagastustüüp on string, kuid return 42 tagastab arvu.',
  },
  {
    id: 9, level: 2, title: 'Milline väide selgitab siinset viga?',
    code: 'interface User {\n  name: string;\n  age: number;\n}\nconst user: User = { name: "Mari" };',
    answers: ['Objektil puudub kohustuslik age-omadus', 'interface peab olema klass', 'name peab olema number', 'Objektil ei tohi olla omadusi'],
    correctIndex: 0,
    explanation: 'Liides User nõuab nii name kui ka age omadust.',
  },
  {
    id: 10, level: 2, title: 'Miks on see omistus vigane?',
    code: 'let result: string | number = true;',
    answers: ['Union-tüübid ei ole lubatud', 'boolean ei kuulu lubatud tüüpide hulka', 'let ei sobi union-tüübiga', 'true on string'],
    correctIndex: 1,
    explanation: 'string | number lubab teksti või arvu, kuid mitte boolean-väärtust.',
  },
  {
    id: 11, level: 3, title: 'Mida väljastab see kood?',
    code: 'function add(a: number, b: number): number {\n  return a + b;\n}\nconsole.log(add(5, 3));',
    answers: ['53', 'undefined', '8', 'TypeError'],
    correctIndex: 2,
    explanation: 'Mõlemad argumendid on arvud ja 5 + 3 = 8.',
  },
  {
    id: 12, level: 3, title: 'Milline on konsooli väljund?',
    code: 'const items: string[] = ["A", "B", "C"];\nconsole.log(items.length);',
    answers: ['2', '3', 'C', 'undefined'],
    correctIndex: 1,
    explanation: 'length annab massiivi elementide arvu, antud juhul 3.',
  },
  {
    id: 13, level: 3, title: 'Mida väljastatakse?',
    code: 'const isReady: boolean = false;\nconsole.log(!isReady);',
    answers: ['true', 'false', '0', 'undefined'],
    correctIndex: 0,
    explanation: 'Loogiline eitus ! muudab false-väärtuse true-väärtuseks.',
  },
  {
    id: 14, level: 3, title: 'Mis jõuab konsooli?',
    code: 'const point = { x: 2, y: 4 };\nconsole.log(point.x * point.y);',
    answers: ['24', '6', 'NaN', '8'],
    correctIndex: 3,
    explanation: 'Objekti omadused x ja y on arvud ning 2 × 4 = 8.',
  },
  {
    id: 15, level: 3, title: 'Milline on selle koodi tulemus?',
    code: 'function label(value: string | number): string {\n  return typeof value;\n}\nconsole.log(label(42));',
    answers: ['42', 'string', 'number', 'boolean'],
    correctIndex: 2,
    explanation: 'typeof 42 annab stringi "number". Tüüpide ühendamine union-iga lubab funktsioonile nii arvu kui teksti.',
  },
];
