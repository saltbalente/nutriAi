'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface UserProfile {
  name: string;
  age: number;
  weight: number;
  height: number;
  gender: 'male' | 'female';
  goal: 'lose' | 'maintain' | 'gain';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
}

export default function HomePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('nutriai_profile');
    if (stored) {
      setProfile(JSON.parse(stored));
    } else {
      setShowOnboarding(true);
    }
  }, []);

  if (showOnboarding) {
    return <Onboarding onComplete={(data) => {
      localStorage.setItem('nutriai_profile', JSON.stringify(data));
      setProfile(data);
      setShowOnboarding(false);
    }} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-600">🥗 NutriAI</h1>
          <p className="text-gray-600 mt-2">
            {profile ? `¡Hola ${profile.name}!` : 'Tu nutricionista personal con IA'}
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full bg-emerald-600 text-white py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            Ver Dashboard
          </button>
          
          <div className="grid grid-cols-2 gap-3">
            <QuickAction
              icon="📸"
              title="Análisis"
              onClick={() => router.push('/analysis')}
            />
            <QuickAction
              icon="🍎"
              title="Nutrición"
              onClick={() => router.push('/nutrition')}
            />
            <QuickAction
              icon="📊"
              title="Mediciones"
              onClick={() => router.push('/measurements')}
            />
            <QuickAction
              icon="⚙️"
              title="Perfil"
              onClick={() => router.push('/profile')}
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

function Onboarding({ onComplete }: { onComplete: (data: UserProfile) => void }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Partial<UserProfile>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete(data as UserProfile);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-600">🥗 NutriAI</h1>
          <p className="text-gray-600 mt-2">Paso {step} de 3</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  ¿Cómo te llamas?
                </label>
                <input
                  type="text"
                  required
                  value={data.name || ''}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Edad
                </label>
                <input
                  type="number"
                  required
                  min="10"
                  max="100"
                  value={data.age || ''}
                  onChange={(e) => setData({ ...data, age: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="25"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Género
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setData({ ...data, gender: 'male' })}
                    className={`py-3 rounded-lg font-semibold transition-colors ${
                      data.gender === 'male'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    👨 Masculino
                  </button>
                  <button
                    type="button"
                    onClick={() => setData({ ...data, gender: 'female' })}
                    className={`py-3 rounded-lg font-semibold transition-colors ${
                      data.gender === 'female'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    👩 Femenino
                  </button>
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Peso actual (kg)
                </label>
                <input
                  type="number"
                  required
                  min="30"
                  max="300"
                  step="0.1"
                  value={data.weight || ''}
                  onChange={(e) => setData({ ...data, weight: parseFloat(e.target.value) })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="70.5"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Altura (cm)
                </label>
                <input
                  type="number"
                  required
                  min="100"
                  max="250"
                  value={data.height || ''}
                  onChange={(e) => setData({ ...data, height: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="175"
                />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  ¿Cuál es tu objetivo?
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'lose', label: '🔥 Perder peso', color: 'orange' },
                    { value: 'maintain', label: '⚖️ Mantener peso', color: 'blue' },
                    { value: 'gain', label: '💪 Ganar músculo', color: 'green' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setData({ ...data, goal: opt.value as any })}
                      className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                        data.goal === opt.value
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nivel de actividad
                </label>
                <select
                  required
                  value={data.activityLevel || ''}
                  onChange={(e) => setData({ ...data, activityLevel: e.target.value as any })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">Selecciona</option>
                  <option value="sedentary">Sedentario (poco o sin ejercicio)</option>
                  <option value="light">Ligero (1-3 días/semana)</option>
                  <option value="moderate">Moderado (3-5 días/semana)</option>
                  <option value="active">Activo (6-7 días/semana)</option>
                  <option value="very-active">Muy activo (2x día)</option>
                </select>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            {step < 3 ? 'Continuar' : 'Empezar'}
          </button>

          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="w-full text-gray-600 py-2"
            >
              ← Atrás
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
