#!/bin/bash

# Caminho do arquivo de commit message
commit_message_file=$1

# Data do commit
current_date=$(date +"%Y-%m-%d")

# Função para fazer perguntas e capturar respostas
ask_questions() {
  echo "Por favor, preencha as seguintes informações antes de confirmar o commit:"
  
  read -p "Título da mudança: " title
  read -p "Descrição detalhada da mudança: " description
  read -p "Número da issue relacionada (se houver): " issue_number
  read -p "Tipo de mudança (feature, change, fix, docs): " change_type

  # Verifica se a seção da data atual já existe no changelog
  if ! grep -q "## [$current_date]" changelog.md; then
    echo -e "\n## [$current_date]" >> changelog.md
  fi

  # Adicionar a mudança ao grupo correto no changelog
  case $change_type in
    feature)
      if ! grep -q "### Features" changelog.md; then
        echo -e "\n### Features" >> changelog.md
      fi
      echo "- $title (Issue: #$issue_number)" >> changelog.md
      ;;
    change)
      if ! grep -q "### Changes" changelog.md; then
        echo -e "\n### Changes" >> changelog.md
      fi
      echo "- $title (Issue: #$issue_number)" >> changelog.md
      ;;
    fix)
      if ! grep -q "### Fixes" changelog.md; then
        echo -e "\n### Fixes" >> changelog.md
      fi
      echo "- $title (Issue: #$issue_number)" >> changelog.md
      ;;
    *)
      echo "Tipo de mudança não reconhecido."
      exit 1
      ;;
  esac

  # Adicionar título e descrição ao commit message
  echo "$title" >> $commit_message_file
  echo "$description" >> $commit_message_file
}

# Executar perguntas e adicionar ao changelog
ask_questions