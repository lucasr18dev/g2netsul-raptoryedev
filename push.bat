@echo off
chcp 65001 > nul
title FalconLens - Automatic GitHub Deploy

echo ==================================================
echo   🦅 FalconLens - Enviando para o GitHub
echo ==================================================
echo.

:: 1. Exige um repositorio e remoto configurados explicitamente
if not exist .git (
    echo [!] Repositorio Git local nao encontrado. Inicialize-o primeiro.
    pause
    exit /b 1
)
git remote get-url origin > nul 2>&1
if errorlevel 1 (
    echo [!] Nenhum remoto 'origin' configurado.
    echo     Configure o URL do seu proprio repositorio antes de enviar.
    pause
    exit /b 1
)

:: Garantir que a branch principal se chame 'main'
git branch -M main

:: 2. Pede a mensagem do commit
set /p msg="Digite a mensagem do commit (ENTER para 'Update FalconLens'): "
if "%msg%"=="" set msg=Update FalconLens

echo.
echo [+] Preparando arquivos (git add .)...
git add .

echo [+] Criando o commit...
git commit -m "%msg%"

echo [+] Enviando para o GitHub (main)...
git push -u origin main

echo.
echo ==================================================
echo  🚀 FalconLens atualizado com sucesso no GitHub!
echo ==================================================
echo.
pause