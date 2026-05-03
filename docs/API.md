# NutriAI API Documentation

## Base URL
```
Development: http://localhost:3000/api
Production: https://nutriai-api.fly.dev/api
```

## Authentication

Todos los endpoints (excepto `/auth/*`) requieren JWT en header:
```
Authorization: Bearer <token>
```

---

## Endpoints

### Auth

#### `POST /auth/register`
Registrar nuevo usuario.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response:** `201 Created`
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  },
  "token": "jwt_token_here"
}
```

---

#### `POST /auth/login`
Iniciar sesión.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response:** `200 OK`
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  },
  "token": "jwt_token_here"
}
```

---

### Users

#### `GET /users/profile`
Obtener perfil del usuario autenticado.

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "profile": {
    "age": 30,
    "gender": "male",
    "height_cm": 175,
    "weight_kg": 80,
    "tmb": 1800,
    "neat": "moderate",
    "allergies": ["peanuts"],
    "intolerances": ["lactose"],
    "budget": "medium",
    "somatotype": "mesomorph",
    "goal": "fat_loss"
  }
}
```

---

#### `PUT /users/profile`
Actualizar perfil (onboarding).

**Request:**
```json
{
  "age": 30,
  "gender": "male",
  "height_cm": 175,
  "weight_kg": 80,
  "neat": "moderate",
  "allergies": ["peanuts"],
  "intolerances": [],
  "budget": "medium",
  "goal": "fat_loss"
}
```

**Response:** `200 OK`
```json
{
  "profile": { /* updated profile */ }
}
```

---

### Nutrition

#### `POST /nutrition/generate-plan`
Generar plan nutricional con IA.

**Request:**
```json
{
  "goal": "fat_loss",
  "duration_weeks": 4,
  "preferences": {
    "meals_per_day": 4,
    "cooking_time": "moderate",
    "cuisine": ["mexican", "mediterranean"]
  }
}
```

**Response:** `201 Created`
```json
{
  "plan": {
    "id": "uuid",
    "start_date": "2026-05-03",
    "end_date": "2026-05-31",
    "daily_calories": 1800,
    "macros": {
      "protein_g": 150,
      "carbs_g": 150,
      "fat_g": 60
    },
    "meals": [
      {
        "name": "Desayuno",
        "time": "08:00",
        "recipes": [
          {
            "title": "Avena con frutas",
            "ingredients": ["50g avena", "100ml leche", "1 plátano"],
            "instructions": "...",
            "macros": {
              "protein": 10,
              "carbs": 40,
              "fat": 5,
              "calories": 240
            }
          }
        ]
      }
      // ... más comidas
    ],
    "shopping_list": [
      { "item": "Avena integral", "quantity": "500g" },
      { "item": "Plátanos", "quantity": "7 unidades" }
    ]
  }
}
```

---

#### `GET /nutrition/plans`
Listar planes del usuario.

**Response:** `200 OK`
```json
{
  "plans": [
    {
      "id": "uuid",
      "start_date": "2026-05-03",
      "status": "active",
      "daily_calories": 1800
    }
  ]
}
```

---

### Vision

#### `POST /vision/analyze-body`
Analizar foto corporal con Computer Vision.

**Request:**
```json
{
  "image": "base64_encoded_image_or_url",
  "angle": "front" // front, side, back
}
```

**Response:** `200 OK`
```json
{
  "analysis": {
    "body_fat_estimate": 18.5,
    "somatotype": "mesomorph",
    "confidence": 0.82,
    "recommendations": [
      "Good muscle definition visible",
      "Focus on lower body fat for more definition"
    ]
  }
}
```

---

### Measurements

#### `POST /measurements`
Registrar medidas corporales.

**Request:**
```json
{
  "date": "2026-05-03",
  "weight_kg": 78.5,
  "neck_cm": 38,
  "chest_cm": 102,
  "waist_cm": 85,
  "hip_cm": 98,
  "arm_cm": 35,
  "thigh_cm": 58,
  "photos": {
    "front": "url",
    "side": "url",
    "back": "url"
  }
}
```

**Response:** `201 Created`
```json
{
  "measurement": {
    "id": "uuid",
    "date": "2026-05-03",
    /* ... datos completos */
  }
}
```

---

#### `GET /measurements?limit=10`
Historial de medidas.

**Response:** `200 OK`
```json
{
  "measurements": [
    {
      "id": "uuid",
      "date": "2026-05-03",
      "weight_kg": 78.5,
      "waist_cm": 85
      /* ... */
    }
  ]
}
```

---

## Error Responses

Todos los errores siguen este formato:

```json
{
  "error": "Error message here"
}
```

**Status codes:**
- `400` Bad Request - Datos inválidos
- `401` Unauthorized - Token inválido o faltante
- `403` Forbidden - Acceso denegado
- `404` Not Found - Recurso no existe
- `429` Too Many Requests - Rate limit excedido
- `500` Internal Server Error - Error del servidor

---

## Rate Limiting

- 100 requests / 15 minutos por IP
- Header de respuesta: `X-RateLimit-Remaining`

---

**Última actualización:** 2026-05-03
