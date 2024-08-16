const fs = require('fs');
const readlineSync = require('readline-sync');

// Verificar se o arquivo CHANGELOG.md existe, se não, criar um arquivo vazio
const changelogFilePath = 'CHANGELOG.md';
if (!fs.existsSync(changelogFilePath)) {
    fs.writeFileSync(changelogFilePath, '');
}

// Perguntas interativas
const branchName = readlineSync.question('Nome da branch: ');
const date = new Date().toISOString().split('T')[0];
const description = readlineSync.question('Descrição: ');
const userStory = readlineSync.question('User Story Relacionada (Link): ');

// Template do changelog
const changelogTemplate = `
[${branchName}][${date}]
Descrição: ${description}
User Story Relacionada: ${userStory}
`;

// Salvar changelog
fs.appendFileSync(changelogFilePath, changelogTemplate);

// Gerar a mensagem automática do commit
const commitMessage = `Changelog atualizado: ${description} em ${date}`;

// Salvar a mensagem do commit em um arquivo para ser usado no --amend
fs.writeFileSync('.husky/.commitmsg', commitMessage);

console.log('Changelog atualizado!');
