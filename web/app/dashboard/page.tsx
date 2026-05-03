'use client';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-emerald-600">🥗 NutriAI</h1>
          <a href="/" className="text-gray-600 hover:text-gray-800">
            ← Inicio
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            ¡Bienvenido! 👋
          </h2>
          <p className="text-gray-600">
            Dashboard nutricional con inteligencia artificial
          </p>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-emerald-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Calorías</p>
              <p className="text-2xl font-bold text-emerald-600">2000</p>
              <p className="text-xs text-gray-500">kcal/día</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Proteínas</p>
              <p className="text-2xl font-bold text-emerald-600">150g</p>
              <p className="text-xs text-gray-500">recomendado</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Carbos</p>
              <p className="text-2xl font-bold text-emerald-600">200g</p>
              <p className="text-xs text-gray-500">recomendado</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Grasas</p>
              <p className="text-2xl font-bold text-emerald-600">60g</p>
              <p className="text-xs text-gray-500">recomendado</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <QuickAction
            icon="📸"
            title="Análisis Corporal"
            description="Toma una foto y obtén análisis IA"
            onClick={() => alert('📸 Análisis corporal con IA\n\n🚧 Próximamente disponible')}
          />
          <QuickAction
            icon="🍎"
            title="Plan Nutricional"
            description="Genera tu plan personalizado"
            onClick={() => alert('🍎 Plan nutricional personalizado\n\n🚧 Próximamente disponible')}
          />
          <QuickAction
            icon="📊"
            title="Mediciones"
            description="Registra tu progreso"
            onClick={() => alert('📊 Registro de progreso\n\n🚧 Próximamente disponible')}
          />
          <QuickAction
            icon="⚙️"
            title="Mi Perfil"
            description="Actualiza tu información"
            onClick={() => alert('⚙️ Configuración de perfil\n\n🚧 Próximamente disponible')}
          />
        </div>

        {/* Info Card */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            🤖 Powered by AI
          </h3>
          <p className="text-gray-600">
            Esta aplicación utiliza inteligencia artificial (GPT-4) para:
          </p>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li>✅ Análisis corporal desde fotos</li>
            <li>✅ Generación de planes nutricionales personalizados</li>
            <li>✅ Cálculo de macronutrientes óptimos</li>
            <li>✅ Recomendaciones basadas en tus objetivos</li>
          </ul>
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
