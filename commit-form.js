import fs from 'fs';
import readline from 'readline';

async function askQuestion(query) {
  const rl = readline.createInterface({
    // eslint-disable-next-line no-undef
    input: process.stdin,
    // eslint-disable-next-line no-undef
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

  fs.writeFileSync(commitMessage);
}

run().then(() => {
  // Execute o commit automaticamente após o script rodar
  // eslint-disable-next-line no-undef
  process.exit(0);
});
