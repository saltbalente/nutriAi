'use client';

import { useRouter } from 'next/navigation';

export default function AnalysisPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-emerald-600">📸 Análisis Corporal</h1>
          <button onClick={() => router.push('/dashboard')} className="text-gray-600 hover:text-gray-800">
            ← Dashboard
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="text-8xl mb-6">🚧</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Próximamente
          </h2>
          <p className="text-gray-600 mb-6">
            La función de análisis corporal con IA estará disponible pronto.
          </p>
          <div className="text-left space-y-3 bg-emerald-50 p-6 rounded-lg">
            <h3 className="font-bold text-gray-800 mb-3">📋 Funciones planeadas:</h3>
            <div className="space-y-2">
              <p className="text-gray-700">✅ Análisis de composición corporal desde fotos</p>
              <p className="text-gray-700">✅ Estimación de grasa corporal con GPT-4 Vision</p>
              <p className="text-gray-700">✅ Recomendaciones personalizadas</p>
              <p className="text-gray-700">✅ Comparación de progreso fotográfico</p>
            </div>
          </div>
          <button
            onClick={() => router.push('/dashboard')}
            className="mt-8 w-full bg-emerald-600 text-white py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            Volver al Dashboard
          </button>
        </div>
      </main>
    </div>
  );
}
