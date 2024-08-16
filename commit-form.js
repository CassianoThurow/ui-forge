import fs from 'fs';
import readline from 'readline';
import process from 'process';

async function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => rl.question(query, (answer) => {
    rl.close();
    resolve(answer);
  }));
}

async function run() {
  const type = await askQuestion('Qual o tipo de commit? (feat, fix, docs, etc.): ');
  const scope = await askQuestion('Qual o escopo do commit? (opcional): ');
  const message = await askQuestion('Escreva a mensagem do commit: ');
  const body = await askQuestion('Escreva a descrição detalhada (opcional): ');
  const isBreaking = await askQuestion('Este commit introduz mudanças quebradoras? (yes/no): ');

  const commitMessage = `${type}${scope ? `(${scope})` : ''}: ${message}\n\n${body}\n${isBreaking.toLowerCase() === 'yes' ? 'BREAKING CHANGE: ' : ''}`;

  fs.writeFileSync('.git/COMMIT_EDITMSG', commitMessage);
}

run();
