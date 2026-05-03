'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { userAPI, nutritionAPI } from '@/lib/api';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
      return;
    }

    loadProfile();
  }, [isAuthenticated, router]);

  const loadProfile = async () => {
    try {
      const { data } = await userAPI.getProfile();
      setProfile(data);
    } catch (error) {
      toast.error('Error al cargar perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">🥗</span>
            <h1 className="text-xl font-bold text-gray-900">NutriAI</h1>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-600 hover:text-gray-900"
          >
            Salir
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white mb-8">
          <h2 className="text-2xl font-bold mb-2">¡Hola, {user?.name}! 👋</h2>
          <p className="text-green-100">
            {profile?.age ? `${profile.age} años · ${profile.height}cm · ${profile.weight}kg` : 'Completa tu perfil para comenzar'}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => router.push('/camera')}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-left"
          >
            <div className="text-3xl mb-2">📸</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Análisis Corporal
            </h3>
            <p className="text-gray-600 text-sm">
              Sube una foto para análisis con IA
            </p>
          </button>

          <button
            onClick={() => router.push('/nutrition')}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-left"
          >
            <div className="text-3xl mb-2">🍎</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Plan Nutricional
            </h3>
            <p className="text-gray-600 text-sm">
              Genera tu plan personalizado
            </p>
          </button>

          <button
            onClick={() => router.push('/measurements')}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-left"
          >
            <div className="text-3xl mb-2">📊</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Mediciones
            </h3>
            <p className="text-gray-600 text-sm">
              Registra tu progreso
            </p>
          </button>

          <button
            onClick={() => router.push('/profile')}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-left"
          >
            <div className="text-3xl mb-2">⚙️</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Mi Perfil
            </h3>
            <p className="text-gray-600 text-sm">
              Actualiza tus datos
            </p>
          </button>
        </div>

        {/* Stats */}
        {profile && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Tu Metabolismo
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 text-sm">TMB (Kcal/día)</p>
                <p className="text-2xl font-bold text-green-600">
                  {profile.bmr || '---'}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Objetivo</p>
                <p className="text-2xl font-bold text-gray-900">
                  {profile.goal === 'lose_weight' ? 'Perder Peso' :
                   profile.goal === 'gain_muscle' ? 'Ganar Músculo' :
                   profile.goal === 'maintain' ? 'Mantener' : '---'}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
