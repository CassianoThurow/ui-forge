#!/bin/bash

# Perguntas Interativas
echo "Preencha as informações para o changelog adicional:"
read -p "Título da mudança: " title
read -p "Tipo de mudança (feat, fix, chore, docs, style, refactor, test): " change_type
read -p "Descrição detalhada da mudança: " description
read -p "Número da issue relacionada (se houver): " issue_number

# Data do commit
current_date=$(date +"%Y-%m-%d")

# Verifica se a seção da data atual já existe no changelog
if ! grep -q "## \[$current_date\]" CHANGELOG.md; then
  echo -e "\n## [$current_date]" >> CHANGELOG.md
fi

# Adicionar a mudança ao grupo correto no changelog
case $change_type in
  feat)
    if ! grep -q "### Features" CHANGELOG.md; then
      echo -e "\n### Features" >> CHANGELOG.md
    fi
    echo "- $title (Issue: #$issue_number)" >> CHANGELOG.md
    ;;
  fix)
    if ! grep -q "### Fixes" CHANGELOG.md; then
      echo -e "\n### Fixes" >> CHANGELOG.md
    fi
    echo "- $title (Issue: #$issue_number)" >> CHANGELOG.md
    ;;
  chore|docs|style|refactor|test)
    if ! grep -q "### Changes" CHANGELOG.md; then
      echo -e "\n### Changes" >> CHANGELOG.md
    fi
    echo "- $title (Issue: #$issue_number)" >> CHANGELOG.md
    ;;
  *)
    echo "Tipo de mudança não reconhecido."
    exit 1
    ;;
esac

# Executar standard-version para gerar o changelog automaticamente com base nos commits
npm run release
