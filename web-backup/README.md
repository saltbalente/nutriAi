# NutriAI Web (Next.js PWA)

**App web progresiva** que funciona en cualquier navegador y se puede instalar como app nativa.

## 🚀 Quick Start

```bash
cd web
npm install
npm run dev    # Desarrollo en http://localhost:3001
npm run build  # Build de producción
npm start      # Servidor de producción
```

## 📱 Características

- ✅ **PWA (Progressive Web App)**: Instalable en móvil/escritorio
- ✅ **Responsive**: Diseño móvil-first con Tailwind CSS
- ✅ **Offline-ready**: Caché de assets y API
- ✅ **Auth**: Login/Register con JWT
- ✅ **Dashboard**: Vista principal con quick actions
- ✅ **TypeScript**: Type-safe con Next.js 15
- ✅ **State Management**: Zustand para auth global
- ✅ **API Client**: Axios con interceptors JWT

## 🏗️ Estructura

```
web/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── page.tsx        # Login/Register
│   │   ├── dashboard/      # Dashboard principal
│   │   ├── layout.tsx      # Layout global
│   │   └── globals.css     # Tailwind global
│   ├── lib/
│   │   └── api.ts          # API client (axios)
│   └── store/
│       └── authStore.ts    # Zustand auth store
├── public/
│   ├── manifest.json       # PWA manifest
│   ├── icon-192.png        # App icon 192x192
│   └── icon-512.png        # App icon 512x512
└── .env.local              # Environment vars
```

## 🔌 API Integration

Conecta con el backend Node.js en `http://localhost:3000/api`:

- `POST /auth/register` - Crear cuenta
- `POST /auth/login` - Iniciar sesión
- `GET /users/profile` - Obtener perfil
- `PUT /users/profile` - Actualizar perfil
- `POST /nutrition/generate-plan` - Generar plan nutricional
- `POST /vision/analyze-body` - Análisis corporal con IA
- `POST /measurements` - Crear medición
- `GET /measurements` - Listar mediciones

## 📱 Instalar como PWA

### En Móvil (Chrome/Safari)

1. Abre la app en tu navegador
2. Menú → "Añadir a pantalla de inicio"
3. La app aparecerá como nativa

### En Escritorio (Chrome/Edge)

1. Icono de instalación en la barra de direcciones
2. Click en "Instalar"
3. La app se abrirá en ventana independiente

## 🎨 Páginas Implementadas

### ✅ Login/Register (`/`)
- Formulario de auth con toggle login/register
- Validación de campos
- Toast notifications
- Hint de instalación PWA

### ✅ Dashboard (`/dashboard`)
- Header con logout
- Tarjeta de bienvenida con datos del usuario
- 4 Quick Actions:
  - 📸 Análisis Corporal
  - 🍎 Plan Nutricional
  - 📊 Mediciones
  - ⚙️ Mi Perfil
- Stats de metabolismo (TMB, objetivo)

### 🚧 Pendientes
- `/profile` - Editar perfil
- `/onboarding` - Setup inicial
- `/camera` - Captura y análisis
- `/nutrition` - Generador de planes
- `/measurements` - Historial de progreso

## 🔐 Auth Flow

1. Usuario registra o inicia sesión
2. Backend devuelve `{ user, token }`
3. Token se guarda en `localStorage`
4. Zustand persiste estado de auth
5. Axios interceptor agrega token a requests
6. Protected routes redirigen a `/` si no autenticado

## 🌐 Deploy

### Vercel (Recomendado)

```bash
npm install -g vercel
vercel --prod
```

Variables de entorno:
```
NEXT_PUBLIC_API_URL=https://tu-api.com/api
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]
```

## 📊 Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: Tailwind CSS
- **State**: Zustand
- **HTTP**: Axios
- **Forms**: React Hook Form (pendiente)
- **Notifications**: React Hot Toast
- **PWA**: next-pwa (pendiente full setup)

## 🔧 Desarrollo

```bash
# Dev server con hot reload
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint

# Build + Start
npm run build && npm start
```

## ✅ Testing Local

1. **Backend:** `cd backend && npm run dev` (puerto 3000)
2. **Web:** `cd web && npm run dev` (puerto 3001)
3. **Navega:** http://localhost:3001

## 📱 Diferencias vs Android Native

| Feature | Android App | Web App (PWA) |
|---------|-------------|---------------|
| Instalación | APK manual | Browser install |
| Permisos | Requiere aceptar | Solicita on-demand |
| Cámara | CameraX nativo | Web API (browser) |
| Notificaciones | FCM | Web Push |
| Offline | Full | Service Worker |
| Tamaño | 9.5MB APK | ~2MB inicial |
| Updates | Manual APK | Auto (deploy) |

## 🎯 Ventajas de la PWA

✅ **No requiere instalación manual**  
✅ **Funciona en cualquier dispositivo**  
✅ **Sin problemas de firma/permisos**  
✅ **Updates instantáneos**  
✅ **SEO-friendly**  
✅ **Menor tamaño de descarga**  
✅ **Cross-platform (iOS, Android, Desktop)**

---

**Próximos pasos:**

1. Implementar páginas pendientes (camera, nutrition, profile)
2. Agregar Service Worker para offline
3. Configurar Web Push notifications
4. Deploy a Vercel con dominio custom
