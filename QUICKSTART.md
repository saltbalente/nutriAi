# NutriAI - Quick Start

**App de recomposición corporal con IA profesional**

---

## 🚀 Estado Actual

### ✅ Backend (100%)
- REST API completa (13 endpoints)
- Autenticación JWT
- Integración OpenAI (GPT-4 + Vision)
- PostgreSQL con 7 tablas
- Testing completo

### 🚧 Android (20%)
- Estructura de proyecto lista
- Gradle + Compose configurado
- Splash screen placeholder

---

## 📦 Setup Rápido

### Backend
```bash
cd ~/projects/nutriai/backend

# 1. Instalar dependencias
npm install

# 2. Crear base de datos
createdb nutriai

# 3. Migrar schema
npm run db:migrate

# 4. Arrancar servidor
npm run dev
```

**Server:** http://localhost:3000

### Testing
```bash
cd ~/projects/nutriai/backend
./test-api.sh
```

### Android
```bash
# Abrir en Android Studio
open -a "Android Studio" ~/projects/nutriai/android
```

O directamente: `File → Open → ~/projects/nutriai/android`

---

## 📚 Documentación

- **[STATUS.md](STATUS.md)** - Estado detallado del proyecto
- **[docs/API.md](docs/API.md)** - Especificación completa de endpoints
- **[docs/PROMPTS.md](docs/PROMPTS.md)** - System prompts de IA
- **[docs/SETUP.md](docs/SETUP.md)** - Guía completa de instalación y deploy

---

## 🔑 Credenciales de Test

```
Email: test@nutriai.com
Password: TestPassword123!
```

---

## 🏗️ Arquitectura

```
nutriai/
├── backend/          # Node.js + Express + PostgreSQL
│   ├── src/
│   │   ├── server.js
│   │   ├── db/       # Schema + migraciones
│   │   ├── routes/   # Auth, Users, Nutrition, Vision, Measurements
│   │   ├── services/ # Lógica de negocio + OpenAI
│   │   └── middleware/
│   └── package.json
│
├── android/          # Kotlin + Jetpack Compose
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── java/com/nutriai/
│   │   │   └── AndroidManifest.xml
│   │   └── build.gradle.kts
│   └── settings.gradle.kts
│
└── docs/             # Documentación técnica
    ├── API.md
    ├── PROMPTS.md
    └── SETUP.md
```

---

## ⚡ Next Steps

1. **Agregar OpenAI API key** a `backend/.env`
2. **Test generación de planes:**
   ```bash
   curl -X POST http://localhost:3000/api/nutrition/generate-plan \
     -H "Authorization: Bearer <token>" \
     -H "Content-Type: application/json" \
     -d '{"duration_weeks": 4}'
   ```

3. **Desarrollar Android:**
   - Auth screens (Login/Register)
   - Onboarding wizard
   - Camera + Computer Vision
   - Dashboard con plan nutricional

4. **Deploy:**
   - Backend a Fly.io
   - Android APK firmado

---

## 💡 Features MVP

### Nutricionista IA
- Planes personalizados basados en TMB/TDEE
- Recetas con macros calculados
- Lista de compras automática
- Consideración de alergias e intolerancias

### Computer Vision
- Análisis de composición corporal
- Estimación de % grasa
- Detección de somatotipo
- Guías visuales para fotos estandarizadas

### Tracker
- Medidas antropométricas zonales
- Gráficas de progreso
- Historial de peso y medidas
- Fotos de evolución

---

**Desarrollado por:** Edwar Bechara  
**Stack:** Node.js + PostgreSQL + Kotlin + Jetpack Compose  
**IA:** OpenAI GPT-4 Turbo + GPT-4 Vision

---

**Última actualización:** 2026-05-03
