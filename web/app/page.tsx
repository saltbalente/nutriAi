'use client';

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-600">🥗 NutriAI</h1>
          <p className="text-gray-600 mt-2">
            Tu nutricionista personal con inteligencia artificial
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full bg-emerald-600 text-white py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            Entrar al Dashboard
          </button>
          
          <div className="grid grid-cols-2 gap-3">
            <QuickAction
              icon="📸"
              title="Análisis"
              onClick={() => alert('📸 Análisis corporal con IA\n\n🚧 Próximamente disponible')}
            />
            <QuickAction
              icon="🍎"
              title="Nutrición"
              onClick={() => alert('🍎 Plan nutricional personalizado\n\n🚧 Próximamente disponible')}
            />
            <QuickAction
              icon="📊"
              title="Mediciones"
              onClick={() => alert('📊 Registro de progreso\n\n🚧 Próximamente disponible')}
            />
            <QuickAction
              icon="⚙️"
              title="Perfil"
              onClick={() => alert('⚙️ Configuración\n\n🚧 Próximamente disponible')}
            />
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          💡 Instala esta app en tu móvil usando "Añadir a pantalla de inicio"
        </div>
      </div>
    </div>
  );
}

function QuickAction({
  icon,
  title,
  onClick,
}: {
  icon: string;
  title: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-xl hover:shadow-md transition-shadow text-center"
    >
      <div className="text-3xl mb-2">{icon}</div>
      <p className="text-sm font-semibold text-gray-700">{title}</p>
    </button>
  );
}
