import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const authAPI = {
  register: (data: { email: string; password: string; name: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
};

// User Profile
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data: any) => api.put('/users/profile', data),
};

// Nutrition
export const nutritionAPI = {
  generatePlan: (data: any) => api.post('/nutrition/generate-plan', data),
};

// Vision
export const visionAPI = {
  analyzeBody: (formData: FormData) =>
    api.post('/vision/analyze-body', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};

// Measurements
export const measurementsAPI = {
  create: (data: any) => api.post('/measurements', data),
  getAll: () => api.get('/measurements'),
};
