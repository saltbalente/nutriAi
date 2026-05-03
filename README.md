# NutriAI 🥗

**Tu nutricionista personal con inteligencia artificial**

App de recomposición corporal que combina IA avanzada (GPT-4 + Vision) con planes nutricionales personalizados.

[![Deploy Backend](https://img.shields.io/badge/deploy-fly.io-blueviolet)](https://fly.io)
[![Deploy Frontend](https://img.shields.io/badge/deploy-vercel-black)](https://vercel.com)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## 🚀 Quick Start

### Backend (API + PostgreSQL)

```bash
cd backend
npm install
npm run dev    # http://localhost:3000/api
```

### Frontend (Next.js PWA)

```bash
cd web
npm install
npm run dev    # http://localhost:3001
```

### Android (Kotlin + Jetpack Compose)

```bash
cd android
./gradlew assembleRelease
```

---

## ✨ Características

### 🤖 Inteligencia Artificial

- **GPT-4 Turbo**: Nutricionista IA que genera planes personalizados
- **GPT-4 Vision**: Análisis corporal desde fotos
- **Cálculo TMB**: Mifflin-St Jeor equation
- **Macronutrientes**: Distribución óptima según objetivo

### 📱 Multiplataforma

- **Web (PWA)**: Instalable en cualquier dispositivo
- **Android**: App nativa con Kotlin + Compose
- **iOS**: Próximamente (compartirá backend)

### 📊 Tracking Completo

- Mediciones corporales (peso, grasa, músculo)
- Progreso fotográfico con análisis IA
- Historial de planes nutricionales
- Gráficas de evolución

---

## 🏗️ Arquitectura

```
nutriai/
├── backend/         Node.js + Express + PostgreSQL
├── web/             Next.js 15 + React 19 + Tailwind
├── android/         Kotlin + Jetpack Compose
└── docs/            Documentación completa
```

### Backend (Node.js)

- **Framework**: Express.js
- **Database**: PostgreSQL
- **Auth**: JWT (bcrypt)
- **AI**: OpenAI API (GPT-4 Turbo + Vision)
- **ORM**: Raw SQL (optimizado)

**Endpoints principales:**

```
POST /api/auth/register        Crear cuenta
POST /api/auth/login           Iniciar sesión
GET  /api/users/profile        Obtener perfil
PUT  /api/users/profile        Actualizar perfil
POST /api/nutrition/generate-plan   Plan nutricional IA
POST /api/vision/analyze-body       Análisis corporal
POST /api/measurements          Registrar medición
GET  /api/measurements          Historial
```

### Frontend (Next.js)

- **Framework**: Next.js 15 (App Router)
- **UI**: Tailwind CSS + Headless UI
- **State**: Zustand
- **HTTP**: Axios
- **PWA**: Service Worker + Manifest

**Páginas:**

- `/` - Login/Register
- `/dashboard` - Panel principal
- `/profile` - Editar perfil
- `/camera` - Análisis corporal
- `/nutrition` - Generador de planes
- `/measurements` - Tracking

### Android (Kotlin)

- **Language**: Kotlin 2.1.0
- **UI**: Jetpack Compose + Material 3
- **Architecture**: MVVM
- **Network**: Retrofit + OkHttp
- **Camera**: CameraX
- **Database**: Room

---

## 🔧 Setup Desarrollo

### 1. Clonar repositorio

```bash
git clone https://github.com/saltbalente/nutriAi.git
cd nutriAi
```

### 2. Backend

```bash
cd backend

# Instalar dependencias
npm install

# Configurar PostgreSQL
createdb nutriai_dev

# Variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# Inicializar base de datos
npm run db:init

# Desarrollo
npm run dev
```

### 3. Web App

```bash
cd web

# Instalar dependencias
npm install

# Variables de entorno
cp .env.example .env.local

# Desarrollo
npm run dev
```

### 4. Android

```bash
cd android

# Build debug
./gradlew assembleDebug

# Build release
./gradlew assembleRelease
```

---

## 🌐 Deploy

### Backend → Fly.io

```bash
cd backend
fly launch
fly deploy
```

### Frontend → Vercel

```bash
cd web
vercel --prod
```

Variables de entorno en Vercel:

```
NEXT_PUBLIC_API_URL=https://nutriai-api.fly.dev/api
```

---

## 📚 Documentación

- [API Documentation](docs/API.md) - Endpoints detallados
- [AI Prompts](docs/PROMPTS.md) - Sistema de prompts IA
- [Setup Guide](docs/SETUP.md) - Guía de instalación completa

---

## 🔐 Seguridad

- ✅ JWT Authentication
- ✅ Password hashing (bcrypt)
- ✅ SQL injection protection
- ✅ CORS configurado
- ✅ Rate limiting (pendiente)
- ✅ HTTPS only en producción

---

## 🧪 Testing

```bash
# Backend
cd backend
npm test

# Frontend
cd web
npm test

# Android
cd android
./gradlew test
```

---

## 📱 Instalación APK (Android)

### Opción 1: Instalación directa (no funciona con Samsung Knox)

1. Descarga `NutriAI-v1.0.0-RELEASE.apk`
2. Habilita "Fuentes desconocidas"
3. Instala el APK

### Opción 2: ADB (recomendado para Samsung)

```bash
# Habilitar depuración USB en Android
# Conectar dispositivo por USB

adb install -r NutriAI-v1.0.0-RELEASE.apk
```

### Opción 3: Web App (sin instalación)

Navega a la URL desplegada y usa "Añadir a pantalla de inicio" para instalar como PWA.

---

## 🛠️ Stack Tecnológico

### Backend
- Node.js 20
- Express.js 4
- PostgreSQL 16
- OpenAI API (GPT-4)
- JWT + bcrypt
- Multer (uploads)

### Frontend
- Next.js 15
- React 19
- TypeScript 5
- Tailwind CSS 3
- Zustand
- Axios

### Android
- Kotlin 2.1.0
- Jetpack Compose
- Material 3
- Retrofit
- CameraX
- Room

---

## 🗺️ Roadmap

- [x] Backend MVP con IA
- [x] Web App (PWA)
- [x] Android App estructura
- [ ] Cámara + análisis corporal
- [ ] Generador de planes completo
- [ ] Gráficas de progreso
- [ ] Notificaciones push
- [ ] Integración con wearables
- [ ] iOS app
- [ ] Modo offline

---

## 📄 Licencia

MIT License - ver [LICENSE](LICENSE)

---

## 👨‍💻 Autor

**Edwar Bechara**
- GitHub: [@saltbalente](https://github.com/saltbalente)

---

## 🤝 Contribuciones

Contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'feat: Add AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## ⚠️ Disclaimer

Esta app es un proyecto personal de demostración. Para recomendaciones nutricionales profesionales, consulta con un nutricionista certificado.

---

**Hecho con ❤️ y ☕ en Colombia**
