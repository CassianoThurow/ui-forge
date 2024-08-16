const fs = require('fs');
const readlineSync = require('readline-sync');

const branchName = readlineSync.question('Nome da branch: ');
const date = new Date().toISOString().split('T')[0];
const description = readlineSync.question('Descrição: ');
const userStory = readlineSync.question('User Story Relacionada (Link): ');
const impact = readlineSync.keyInYN('Existe algum impacto que pode ser causado? (Y/N) ') ? 'Sim' : 'Não';
const dependencies = readlineSync.keyInYN('Este item depende de outra feature ou hotfix? (Y/N) ') ? 'Sim' : 'Não';
const version = readlineSync.question('Este item é direcionado à qual versão? ');
const readyForQA = readlineSync.keyInYN('Pronto para QA? (Y/N) ');
const documentationUpdated = readlineSync.keyInYN('A documentação foi atualizada? (Y/N) ');

const changelogTemplate = `
[${branchName}][${date}]
Descrição: ${description}
User Story Relacionada: ${userStory}

Existe algum impacto que pode ser causado (estrutural, remoção/adição de bibliotecas, etc). Se sim, qual?
[${impact}] Sim [${!impact}] Não

Este item depende de outra feature ou hotfix? Se sim, qual?
[${dependencies}] Sim [${!dependencies}] Não

Este item é direcionado à qual versão?
${version}

Itens:
[${readyForQA}] Pronto para QA
[${documentationUpdated}] A documentação foi atualizada
`;

// Salvar changelog
fs.appendFileSync('CHANGELOG.md', changelogTemplate);

console.log('Changelog atualizado!');
