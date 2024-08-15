const fs = require('fs');
const inquirer = require('inquirer');

const questions = [
  {
    type: 'input',
    name: 'branch',
    message: 'Branch:',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Descrição:\n[Breve descrição da mudança e do contexto.]',
  },
  {
    type: 'input',
    name: 'userStory',
    message: 'User Story Relacionada:\n[Link para a task do ClickUp.]',
  },
  {
    type: 'confirm',
    name: 'impact',
    message: 'Existe algum impacto que pode ser causado (estrutural, remoção/adição de bibliotecas, etc)?',
  },
  {
    type: 'input',
    name: 'impactDetails',
    message: 'Se sim, qual?',
    when: (answers) => answers.impact,
  },
  {
    type: 'confirm',
    name: 'dependency',
    message: 'Este item depende de outra feature ou hotfix?',
  },
  {
    type: 'input',
    name: 'dependencyDetails',
    message: 'Se sim, qual?',
    when: (answers) => answers.dependency,
  },
  {
    type: 'input',
    name: 'version',
    message: 'Este item é direcionado à qual versão?',
  },
  {
    type: 'checkbox',
    name: 'items',
    message: 'Itens:',
    choices: [
      { name: 'Pronto para QA' },
      { name: 'A documentação foi atualizada' },
    ],
  },
];

inquirer.prompt(questions).then((answers) => {
  const changelogContent = `
[${answers.branch}][${new Date().toISOString().slice(0, 10)}]
Descrição:
${answers.description}

User Story Relacionada:
${answers.userStory}

Existe algum impacto? Se sim, qual?  
${answers.impact ? 'Sim' : 'Não'} ${answers.impactDetails || ''}

Este item depende de outra feature ou hotfix? Se sim, qual?  
${answers.dependency ? 'Sim' : 'Não'} ${answers.dependencyDetails || ''}

Este item é direcionado à qual versão?  
${answers.version}

Itens:
${answers.items.includes('Pronto para QA') ? '[x]' : '[ ]'} Pronto para QA
${answers.items.includes('A documentação foi atualizada') ? '[x]' : '[ ]'} A documentação foi atualizada
  `;

  fs.appendFileSync('CHANGELOG.md', changelogContent.trim() + '\n\n', 'utf8');
  console.log('Changelog gerado com sucesso!');
});
