# NutriAI - Deploy Status

## ✅ Producción

### Web App (Vercel)
**URL:** https://nutriai-wine-ten.vercel.app
**Status:** ✅ Online
**Deploy:** Vercel (auto-deploy desde GitHub)

### Backend (Pending)
**Status:** Local only (http://localhost:3000/api)
**Next:** Deploy a Fly.io o Railway

### Android App
**Status:** APK compilado (bloqueado por Samsung Knox)
**Alternativa:** Web PWA instalable

## 🚀 Próximos Pasos

1. **Deploy backend a producción:**
   ```bash
   cd backend
   fly launch
   fly deploy
   ```

2. **Configurar variable de entorno en Vercel:**
   ```
   NEXT_PUBLIC_API_URL=https://nutriai-backend.fly.dev/api
   ```

3. **Implementar páginas pendientes:**
   - Camera → Análisis corporal con IA
   - Nutrition → Generador de planes
   - Measurements → Tracking de progreso
   - Profile → Edición de perfil

## 📦 Repositorio

**GitHub:** https://github.com/saltbalente/nutriAi (público)

## 🔗 Links Rápidos

- Web App: https://nutriai-wine-ten.vercel.app
- Dashboard Vercel: https://vercel.com/saludablebela-gmailcoms-projects/nutriai
- GitHub: https://github.com/saltbalente/nutriAi
