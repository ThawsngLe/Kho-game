@echo off
echo === Push Kho-game len GitHub ===
echo.

cd /d "%~dp0"

git init
git add .
git commit -m "Upload san pham mau theo hoc phan"
git branch -M main
git remote add origin https://github.com/ThawsngLe/Kho-game.git
git push -u origin main

echo.
echo === Done! Check: https://github.com/ThawsngLe/Kho-game ===
pause
