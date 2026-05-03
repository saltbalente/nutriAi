'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-emerald-600">🥗 NutriAI</h1>
          <button
            onClick={handleLogout}
            className="text-gray-600 hover:text-gray-800"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            ¡Hola, {user.name}! 👋
          </h2>
          <p className="text-gray-600">
            Bienvenido a tu dashboard nutricional personalizado
          </p>

          {user.weight && user.height && (
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-emerald-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Peso</p>
                <p className="text-2xl font-bold text-emerald-600">{user.weight} kg</p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Altura</p>
                <p className="text-2xl font-bold text-emerald-600">{user.height} m</p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Edad</p>
                <p className="text-2xl font-bold text-emerald-600">{user.age} años</p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">IMC</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {(user.weight / (user.height * user.height)).toFixed(1)}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <QuickAction
            icon="📸"
            title="Análisis Corporal"
            description="Toma una foto y obtén análisis IA"
            onClick={() => alert('Próximamente')}
          />
          <QuickAction
            icon="🍎"
            title="Plan Nutricional"
            description="Genera tu plan personalizado"
            onClick={() => alert('Próximamente')}
          />
          <QuickAction
            icon="📊"
            title="Mediciones"
            description="Registra tu progreso"
            onClick={() => alert('Próximamente')}
          />
          <QuickAction
            icon="⚙️"
            title="Mi Perfil"
            description="Actualiza tu información"
            onClick={() => alert('Próximamente')}
          />
        </div>
      </main>
    </div>
  );
}

function QuickAction({
  icon,
  title,
  description,
  onClick,
}: {
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-left"
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </button>
  );
}
