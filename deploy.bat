@echo off
setlocal EnableExtensions
title Deploy Personal Portfolio

REM ============================================================
REM  One-click deploy: commits everything and pushes to GitHub.
REM  Vercel auto-builds from the "main" branch after the push.
REM ============================================================

set "REPO=C:\Users\harsh\OneDrive\Desktop\OneDrive\University 2nd_Year\Personal Portfolio"

cd /d "%REPO%" 2>nul
if errorlevel 1 (
    echo [ERROR] Could not open the portfolio folder:
    echo   %REPO%
    echo Edit this file and fix the REPO path if you moved the project.
    echo.
    pause
    exit /b 1
)

echo ============================================================
echo   Deploying: Personal Portfolio
echo   Folder:    %REPO%
echo ============================================================
echo.

where git >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Git is not installed or not on your PATH.
    echo Install Git for Windows from https://git-scm.com/download/win
    echo.
    pause
    exit /b 1
)

REM --- Show what changed ---
echo Changes to be deployed:
git status --short
echo.

REM --- Commit message (press Enter for an automatic one) ---
set "MSG="
set /p "MSG=Commit message (leave blank for auto): "
if not defined MSG set "MSG=Update portfolio %DATE% %TIME%"

echo.
echo ^> git add -A
git add -A

echo ^> git commit -m "%MSG%"
git commit -m "%MSG%"
if errorlevel 1 echo   (Nothing new to commit - will still push any earlier commits.)

echo.
echo ^> git push origin main
git push origin main
if errorlevel 1 (
    echo.
    echo [ERROR] Push failed.
    echo Check your internet connection and that you are signed in to GitHub,
    echo then run this file again.
    echo.
    pause
    exit /b 1
)

echo.
echo ============================================================
echo   Pushed to GitHub. Vercel will build and deploy shortly.
echo   Track it: https://vercel.com/dashboard
echo ============================================================
echo.
pause
