# NutriAI - Setup & Deployment Guide

## Backend Setup

### 1. PostgreSQL

**Opción A: Local (con Homebrew)**
```bash
brew install postgresql@16
brew services start postgresql@16

# Crear database
createdb nutriai

# Crear usuario (opcional)
psql postgres
CREATE USER nutriai WITH PASSWORD 'nutriai';
GRANT ALL PRIVILEGES ON DATABASE nutriai TO nutriai;
\q
```

**Opción B: Docker**
```bash
docker run -d \
  --name nutriai-postgres \
  -e POSTGRES_DB=nutriai \
  -e POSTGRES_USER=nutriai \
  -e POSTGRES_PASSWORD=nutriai \
  -p 5432:5432 \
  postgres:16-alpine
```

**Opción C: Supabase (Cloud)**
1. Crear proyecto en https://supabase.com
2. Copiar connection string
3. Actualizar `.env` con la URL

---

### 2. Backend Dependencies

```bash
cd ~/projects/nutriai/backend
npm install
```

### 3. Environment Variables

Editar `.env` y configurar:
- `DATABASE_URL` con tu PostgreSQL
- `OPENAI_API_KEY` con tu API key de OpenAI

### 4. Run Migrations

```bash
npm run db:migrate
```

### 5. Start Development Server

```bash
npm run dev
```

Backend disponible en: http://localhost:3000

---

## Android Setup

### 1. Abrir en Android Studio

```bash
open -a "Android Studio" ~/projects/nutriai/android
```

### 2. Configurar `local.properties`

Crear archivo `android/local.properties`:
```properties
sdk.dir=/Users/edwarbechara/Library/Android/sdk
backend.url=http://10.0.2.2:3000/api
```

> **Nota:** `10.0.2.2` es la IP del host desde el emulador Android.
> Para dispositivo físico, usar IP local (ej: `192.168.1.100`)

### 3. Sync Gradle

En Android Studio: `File → Sync Project with Gradle Files`

### 4. Run App

Seleccionar emulador o dispositivo y presionar ▶️ (Run)

---

## Deploy

### Backend (Fly.io)

```bash
# Instalar Fly CLI
brew install flyctl

# Login
flyctl auth login

# Deploy
cd ~/projects/nutriai/backend
flyctl launch
flyctl secrets set OPENAI_API_KEY=sk-...
flyctl deploy
```

### Android (Google Play)

1. Generar keystore:
```bash
keytool -genkey -v -keystore nutriai-release.keystore \
  -alias nutriai -keyalg RSA -keysize 2048 -validity 10000
```

2. Configurar `android/app/build.gradle` con signing config
3. Build release:
```bash
./gradlew assembleRelease
```

4. Subir APK/AAB a Play Console

---

## Testing

### Backend API
```bash
# Health check
curl http://localhost:3000/health

# Register user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}'
```

### Android (Emulator)
```bash
# List running emulators
adb devices

# View logs
adb logcat | grep NutriAI
```

---

## Troubleshooting

### Backend no arranca
- Verificar PostgreSQL: `psql -U nutriai -d nutriai`
- Check logs: `npm run dev`

### Android build falla
- Sync Gradle: Android Studio → File → Invalidate Caches
- Clean build: `./gradlew clean build`

### Database errors
- Rerun migrations: `npm run db:migrate`
- Check `.env` DATABASE_URL

---

**Next Steps:**
1. Implementar autenticación JWT
2. Integrar OpenAI API
3. Diseñar UI en Figma (opcional)
4. Construir onboarding flow
