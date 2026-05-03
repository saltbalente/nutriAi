# NutriAI

**Aplicación Android de Recomposición Corporal con IA**

Plataforma profesional de nutrición impulsada por IA para pérdida de grasa saludable mediante análisis visual, tracking antropométrico y planes nutricionales personalizados basados en ciencia.

---

## 🎯 MVP Core Features

### 1. Motor de Nutricionista IA (LLM)
- Integración con GPT-4/Claude via API
- Prompts sistémicos profesionales basados en literatura científica
- Generación de planes nutricionales en JSON estructurado
- Rechazo automático de dietas extremas/no saludables

### 2. Análisis Visual (Computer Vision)
- Captura estandarizada: frente, perfil, espalda
- Guías visuales (siluetas overlay) en cámara
- Estimación de % grasa corporal
- Detección de somatotipo (ecto/meso/endomorfo)

### 3. Tracker Antropométrico
- Registro de medidas zonales: cuello, pecho, cintura, cadera, brazo, muslo
- UI interactiva con mapeo corporal
- Indicadores de progreso visual
- Iteración automática de macros según estancamiento

### 4. Onboarding Inteligente
- Cálculo de TMB (Tasa Metabólica Basal)
- Registro de NEAT (actividad diaria)
- Alergias, intolerancias y restricciones
- Presupuesto y disponibilidad de alimentos

---

## 🏗️ Arquitectura

```
nutriai/
├── backend/          # Node.js + Express + PostgreSQL
├── android/          # Kotlin + Jetpack Compose
└── docs/            # Especificaciones técnicas
```

### Stack Tecnológico

**Backend:**
- Runtime: Node.js 22+
- Framework: Express.js
- Base de datos: PostgreSQL 16+ (con encriptación)
- APIs IA: OpenAI GPT-4 Turbo + GPT-4 Vision
- Autenticación: JWT + bcrypt

**Android:**
- Lenguaje: Kotlin 2.0+
- UI: Jetpack Compose
- Arquitectura: MVVM + Clean Architecture
- Networking: Retrofit + OkHttp
- Cámara: CameraX
- Storage: Room + DataStore

**Infraestructura:**
- Deploy backend: Fly.io
- Imágenes: Cloudinary / S3
- CI/CD: GitHub Actions

---

## 📊 Modelo de Datos (PostgreSQL)

### Tablas Core

```sql
users (
  id, email, password_hash, created_at
)

user_profiles (
  id, user_id, age, gender, height, weight, tmb, neat,
  allergies[], intolerances[], budget, somatotype
)

body_measurements (
  id, user_id, date, neck, chest, waist, hip, arm, thigh,
  body_fat_estimate, photos[]
)

nutrition_plans (
  id, user_id, start_date, end_date, goal_type,
  daily_calories, protein_g, carbs_g, fat_g,
  plan_json, status
)

progress_logs (
  id, user_id, date, weight, measurements_id,
  notes, mood
)
```

---

## 🚀 Roadmap de Desarrollo

### Fase 1: Setup & Core Backend (Semana 1)
- [x] Estructura de proyecto
- [ ] Setup Express + PostgreSQL
- [ ] Modelos de base de datos
- [ ] API de autenticación (register/login)
- [ ] Endpoint de onboarding (guardar perfil)

### Fase 2: IA Backend (Semana 2)
- [ ] Integración OpenAI GPT-4 (Nutricionista IA)
- [ ] Prompts sistémicos profesionales
- [ ] Endpoint `/api/nutrition/generate-plan`
- [ ] Integración GPT-4 Vision (análisis corporal)
- [ ] Endpoint `/api/vision/analyze-body`

### Fase 3: Android Core (Semana 3)
- [ ] Setup Kotlin + Compose
- [ ] Splash screen + Auth screens
- [ ] Onboarding flow (wizard)
- [ ] Integración API backend

### Fase 4: Computer Vision Android (Semana 4)
- [ ] CameraX integration
- [ ] Overlay de guías (siluetas)
- [ ] Captura estandarizada (3 ángulos)
- [ ] Upload y análisis con backend

### Fase 5: Tracker & Dashboard (Semana 5)
- [ ] UI de medidas antropométricas
- [ ] Visualización de progreso (gráficas)
- [ ] Dashboard con plan nutricional actual
- [ ] Lista de compras generada

### Fase 6: MVP Testing & Deploy (Semana 6)
- [ ] Testing E2E
- [ ] Deploy backend a Fly.io
- [ ] APK alpha release
- [ ] Documentación de usuario

---

## 🔒 Seguridad & Compliance

- Encriptación de datos biométricos (AES-256)
- Transmisión HTTPS/TLS 1.3
- Cumplimiento GDPR/CCPA (derecho al olvido)
- Consentimiento explícito para fotos
- No venta de datos a terceros
- Disclaimers médicos (no reemplaza profesional de salud)

---

## 💰 Modelo de Negocio (Post-MVP)

- Freemium: Plan básico gratuito
- Premium: Plan personalizado avanzado + coach IA 24/7
- Marketplace: Recetas premium de chefs
- Afiliados: Links a productos saludables

---

## 📝 Notas de Desarrollo

**Variables de entorno requeridas:**
```bash
OPENAI_API_KEY=sk-...
DATABASE_URL=postgresql://...
JWT_SECRET=...
CLOUDINARY_URL=...
```

**Comandos útiles:**
```bash
# Backend
cd backend && npm run dev

# Android
cd android && ./gradlew assembleDebug
```

---

## 👥 Team

- **Lead Developer:** Edwar Bechara
- **AI Assistant:** Claw ⚡

---

## 📄 License

Privado - Todos los derechos reservados
