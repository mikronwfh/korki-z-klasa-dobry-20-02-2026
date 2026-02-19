---
name: project-setup
description: Automatyczna konfiguracja projektu. UŻYWAJ ZAWSZE gdy użytkownik otwiera sklonowany projekt po raz pierwszy lub mówi "setup", "konfiguruj", "zacznij". Prowadź krok po kroku przez cały proces.
argument-hint: "[opcjonalnie: nazwa projektu]"
user-invokable: true
disable-model-invocation: false
---

# Project Setup Automation - Full Workflow

Ten SKILL prowadzi użytkownika przez KOMPLETNĄ konfigurację nowego projektu.

## 🚨 TRIGGER - Kiedy używać

Uruchom TEN SKILL automatycznie gdy:
1. Użytkownik otwiera projekt w VS Code
2. NIE istnieje plik `.env.local` w głównym katalogu
3. Użytkownik pisze: "setup", "konfiguruj", "zacznij", "start"
4. Wykryto `package.json` ze skryptem `"setup"`

## 📋 WORKFLOW - WYKONUJ DOKŁADNIE W TEJ KOLEJNOŚCI

### ❶ POWITANIE

Wyświetl użytkownikowi:

