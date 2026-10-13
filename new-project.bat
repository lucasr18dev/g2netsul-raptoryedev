@echo off
setlocal
chcp 65001 > nul
title FalconLens - Novo Projeto

echo ==================================================
echo   FalconLens - Gerador de Novo Projeto
echo ==================================================
echo.

set /p "folder=Digite o nome da pasta do NOVO projeto: "
if not defined folder (
    echo [!] Nome invalido. Operacao cancelada.
    pause
    exit /b 1
)

for %%I in ("%~dp0.") do set "source=%%~fI"
for %%I in ("%~dp0..") do set "parent=%%~fI"
set "destination=%parent%\%folder%"

if /i "%folder%"=="." (
    echo [!] Use um nome de pasta, nao um caminho.
    pause
    exit /b 1
)
if /i "%folder%"==".." (
    echo [!] Use um nome de pasta, nao um caminho.
    pause
    exit /b 1
)
if /i "%folder%"==".git" (
    echo [!] Esse nome e reservado para os dados do Git.
    pause
    exit /b 1
)
if exist "%destination%" (
    echo [!] O destino ja existe: "%destination%"
    echo     Nada foi alterado. Escolha outro nome.
    pause
    exit /b 1
)

echo.
echo [+] Copiando os arquivos locais do projeto, sem o historico Git...
robocopy "%source%" "%destination%" /E /XJ /XD .git node_modules .astro dist /XF .git
if errorlevel 8 (
    echo [X] Falha ao copiar os arquivos. Codigo do Robocopy: %errorlevel%
    pause
    exit /b 1
)

echo.
echo [+] Inicializando um repositorio Git novo, sem remoto...
git -C "%destination%" init
if errorlevel 1 (
    echo [X] Nao foi possivel inicializar o novo repositorio.
    pause
    exit /b 1
)
git -C "%destination%" branch -M main
if errorlevel 1 (
    echo [X] Nao foi possivel definir a branch main.
    pause
    exit /b 1
)

echo.
set /p "install=Deseja rodar npm install agora? (S/N) [Padrao: S]: "
if not defined install set "install=S"
if /i "%install%"=="S" (
    echo.
    echo [+] Instalando dependencias...
    pushd "%destination%"
    call npm install
    if errorlevel 1 echo [!] npm install terminou com erro.
    popd
)

echo.
set /p "vscode=Deseja abrir no VS Code agora? (S/N) [Padrao: S]: "
if not defined vscode set "vscode=S"
if /i "%vscode%"=="S" (
    echo [+] Abrindo no VS Code...
    code "%destination%"
)

echo.
echo ==================================================
echo  Projeto "%folder%" criado em "%destination%"
echo  O repositorio original nao foi alterado.
echo ==================================================
echo.
pause