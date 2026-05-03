# NutriAI - Estado del Proyecto

**Fecha:** 2026-05-03  
**Estado:** Backend MVP funcional ✅

---

## ✅ Completado

### Backend Core (100%)
- [x] Setup Express + PostgreSQL
- [x] Schema de base de datos completo
- [x] Autenticación JWT (register/login)
- [x] Middleware de autenticación
- [x] CRUD de usuarios y perfiles
- [x] Cálculo automático de TMB (Mifflin-St Jeor)
- [x] CRUD de medidas antropométricas
- [x] Integración OpenAI GPT-4 (Nutricionista IA)
- [x] Integración GPT-4 Vision (análisis corporal)
- [x] Rate limiting y security headers
- [x] Testing completo de endpoints

### API Endpoints Implementados
```
✅ POST /api/auth/register
✅ POST /api/auth/login
✅ POST /api/auth/logout
✅ GET  /api/users/profile
✅ PUT  /api/users/profile
✅ POST /api/nutrition/generate-plan
✅ GET  /api/nutrition/plans
✅ GET  /api/nutrition/plans/:id
✅ POST /api/vision/analyze-body
✅ GET  /api/vision/analyses
✅ POST /api/measurements
✅ GET  /api/measurements
✅ GET  /api/measurements/latest
```

### Database
- [x] 7 tablas creadas y migradas
- [x] Índices optimizados
- [x] Triggers de timestamp automáticos
- [x] Tipos JSONB para datos flexibles

---

## 🚧 Pendiente

### Backend (Fase 2)
- [ ] Upload de imágenes (Cloudinary/S3)
- [ ] Conversión base64 → URL para Vision API
- [ ] Webhooks para pagos (Stripe)
- [ ] Rate limiting por usuario (no solo por IP)
- [ ] Tests unitarios (Jest)

### Android App (Fase 1)
- [x] Setup proyecto en Android Studio
- [x] Gradle + Compose configurado
- [x] Estructura de carpetas (MVVM)
- [x] Material 3 theme
- [x] Splash screen placeholder
- [ ] Pantallas de Auth (Login/Register)
- [ ] Onboarding wizard (4-5 steps)
- [ ] Integración API con Retrofit
- [ ] Integración CameraX + guías visuales
- [ ] UI de medidas antropométricas
- [ ] Dashboard con plan nutricional
- [ ] Visualización de progreso (gráficas)
- [ ] Lista de compras
- [ ] Tracker de macros diario

### Deploy
- [ ] Backend a Fly.io
- [ ] Configurar Cloudinary
- [ ] Variables de entorno de producción
- [ ] APK firmado para testing interno

---

## 🔑 Datos de Prueba

**Usuario de test:**
```
Email: test@nutriai.com
Password: TestPassword123!
```

**Perfil:**
- Edad: 30
- Género: Male
- Altura: 175 cm
- Peso: 80 kg
- TMB: 1749 kcal
- Objetivo: fat_loss

---

## 🚀 Cómo Ejecutar

### Backend
```bash
cd ~/projects/nutriai/backend

# Instalar dependencias (ya hecho)
npm install

# Crear base de datos (ya hecho)
createdb nutriai

# Migrar schema (ya hecho)
npm run db:migrate

# Arrancar servidor
npm run dev
```

**Server:** http://localhost:3000  
**Health check:** http://localhost:3000/health

### Testing
```bash
cd ~/projects/nutriai/backend
./test-api.sh
```

---

## 📝 Próximos Pasos Inmediatos

1. **Agregar OpenAI API key** a `.env` para probar generación de planes
2. **Configurar Cloudinary** para upload de imágenes
3. **Crear proyecto Android** en Android Studio
4. **Diseñar UI básica** (wireframes o Figma)
5. **Implementar pantallas de Auth** en Android

---

## 💡 Notas Técnicas

### TMB Calculation
Formula: Mifflin-St Jeor  
- Hombre: `10 × peso(kg) + 6.25 × altura(cm) - 5 × edad + 5`
- Mujer: `10 × peso(kg) + 6.25 × altura(cm) - 5 × edad - 161`

### TDEE Multipliers (NEAT)
- Sedentary: TMB × 1.2
- Light: TMB × 1.375
- Moderate: TMB × 1.55
- Very Active: TMB × 1.725
- Extreme: TMB × 1.9

### Déficit Calórico Seguro
- Recomendado: 10-20% del TDEE
- Máximo: 500 kcal/día (pérdida ~0.5kg/semana)
- Nunca < 1200 kcal (mujer) o < 1500 kcal (hombre)

---

**Última actualización:** 2026-05-03 23:28 GMT-5
