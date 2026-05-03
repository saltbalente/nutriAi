# NutriAI Web - Next.js

✅ **Web app funcional** en http://localhost:3001

## Estado Actual

- ✅ Backend: http://localhost:3000/api
- ✅ Frontend: http://localhost:3001
- ✅ Auth: Login/Register
- ✅ Dashboard: Vista principal
- ✅ API Integration: Axios + Zustand
- ✅ Responsive: Tailwind CSS

## Testing

1. **Inicia backend:**
```bash
cd backend
npm run dev
```

2. **Inicia frontend:**
```bash
cd web
npm run dev
```

3. **Navega:** http://localhost:3001

## Deployment

### Vercel (Recomendado)

```bash
cd web
vercel --prod
```

Variables de entorno en Vercel:
```
NEXT_PUBLIC_API_URL=https://tu-backend.fly.dev/api
```

## APKs Generados (Android fallback)

Si necesitas la versión Android nativa:

- `NutriAI-v1.0.0-RELEASE.apk` (9.5MB) - Producción
- `NutriAI-aligned.apk` (13MB) - Debug optimizado
- `NutriAI-verified.apk` (13MB) - Debug firmado

**Instalación APK:** Requiere ADB con USB por bloqueo de Samsung Knox

## Ventajas de la Web App

✅ **Sin problemas de instalación**
✅ **Funciona en cualquier dispositivo**
✅ **Updates automáticos**
✅ **Instalable como PWA**
✅ **Cross-platform**

---

**Stack completo:**
- Backend: Node.js + Express + PostgreSQL
- Frontend: Next.js 15 + React 19 + Tailwind CSS
- Estado: Zustand
- HTTP: Axios
- Notificaciones: React Hot Toast
