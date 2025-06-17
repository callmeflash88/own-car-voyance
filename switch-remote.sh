#!/bin/bash

# Скрипт переключения origin между личным и орг-репозиторием
# Настройки
PERSONAL_REMOTE="git@github.com-comeback:callmeflash88/own-car-voyance.git"
ORG_REMOTE="git@github.com-comeback:CBA-React/car-voyance.git"

# Проверка аргумента
if [ "$1" = "personal" ]; then
  git remote set-url origin $PERSONAL_REMOTE
  echo "✅ Переключено на ЛИЧНЫЙ репозиторий:"
  echo "$PERSONAL_REMOTE"

elif [ "$1" = "org" ]; then
  git remote set-url origin $ORG_REMOTE
  echo "✅ Переключено на ОРГАНИЗАЦИОННЫЙ репозиторий:"
  echo "$ORG_REMOTE"

else
  echo "❌ Неверный аргумент."
  echo "Используй: ./switch-remote.sh [personal|org]"
  exit 1
fi
