#!/bin/bash

echo "Esperando S24 Ultra..."
echo ""
echo "En tu S24:"
echo "1. Ve a Ajustes → Acerca del teléfono"
echo "2. Toca 7 veces 'Número de compilación'"
echo "3. Regresa y ve a 'Opciones de desarrollador'"
echo "4. Activa 'Depuración USB'"
echo "5. Conecta el cable USB al Mac"
echo "6. Acepta el popup de autorización"
echo ""
echo "Presiona Enter cuando esté listo..."
read

echo "Detectando dispositivo..."
adb devices

if adb devices | grep -q "device$"; then
    echo ""
    echo "✅ S24 detectado. Instalando NutriAI..."
    adb install -r ~/projects/nutriai/NutriAI-v1.0.0-signed.apk
    echo ""
    echo "✅ Instalación completa!"
else
    echo ""
    echo "❌ No se detectó el S24. Verifica:"
    echo "- Cable USB conectado"
    echo "- Depuración USB activada"
    echo "- Popup de autorización aceptado"
fi
