# NutriAI Android

Aplicación Android nativa construida con Kotlin y Jetpack Compose.

## Requisitos

- Android Studio Hedgehog (2023.1.1) o superior
- JDK 17+
- Kotlin 2.0+
- Android SDK 34
- Dispositivo/emulador con Android 8.0+ (API 26+)

## Estructura

```
android/
├── app/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/nutriai/
│   │   │   │   ├── ui/           # Composables
│   │   │   │   ├── viewmodels/   # ViewModels
│   │   │   │   ├── data/         # Repositories, API
│   │   │   │   ├── models/       # Data classes
│   │   │   │   └── utils/        # Helpers
│   │   │   ├── res/              # Resources
│   │   │   └── AndroidManifest.xml
│   │   └── test/
│   └── build.gradle.kts
└── build.gradle.kts
```

## Setup

1. Abrir el proyecto en Android Studio
2. Sync Gradle
3. Configurar `local.properties`:
```properties
sdk.dir=/Users/edwarbechara/Library/Android/sdk
backend.url=http://10.0.2.2:3000/api
```

## Features por Implementar

### Fase 1: Auth & Onboarding
- [ ] Splash screen
- [ ] Login/Register
- [ ] Onboarding wizard (4-5 pantallas)

### Fase 2: Computer Vision
- [ ] CameraX integration
- [ ] Overlay de guías visuales
- [ ] Captura 3 ángulos
- [ ] Upload y análisis

### Fase 3: Tracker
- [ ] Input de medidas antropométricas
- [ ] Visualización de progreso
- [ ] Gráficas de evolución

### Fase 4: Dashboard
- [ ] Plan nutricional actual
- [ ] Recetas del día
- [ ] Lista de compras
- [ ] Macros tracker

## Dependencias Principales

```kotlin
// Jetpack Compose
androidx.compose.ui
androidx.compose.material3

// Navigation
androidx.navigation:navigation-compose

// Networking
com.squareup.retrofit2:retrofit
com.squareup.okhttp3:okhttp

// Camera
androidx.camera:camera-camera2
androidx.camera:camera-view

// Image loading
io.coil-kt:coil-compose

// Local storage
androidx.room:room-runtime
androidx.datastore:datastore-preferences
```

## Run

```bash
# Debug build
./gradlew assembleDebug

# Release build (firmado)
./gradlew assembleRelease
```

---

**Status:** 🚧 En construcción
