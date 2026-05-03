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

interface Macros {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [macros, setMacros] = useState<Macros | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('nutriai_profile');
    if (stored) {
      const data = JSON.parse(stored);
      setProfile(data);
      setMacros(calculateMacros(data));
    } else {
      router.push('/');
    }
  }, [router]);

  if (!profile || !macros) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-600 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  const bmi = (profile.weight / Math.pow(profile.height / 100, 2)).toFixed(1);
  const bmiCategory = getBMICategory(parseFloat(bmi));

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-emerald-600">🥗 NutriAI</h1>
          <button onClick={() => router.push('/')} className="text-gray-600 hover:text-gray-800">
            ← Inicio
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Welcome Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            ¡Hola {profile.name}! 👋
          </h2>
          <p className="text-gray-600">
            {profile.goal === 'lose' && '🔥 Objetivo: Perder peso'}
            {profile.goal === 'maintain' && '⚖️ Objetivo: Mantener peso'}
            {profile.goal === 'gain' && '💪 Objetivo: Ganar músculo'}
          </p>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="IMC" value={bmi} unit={bmiCategory.emoji} />
            <StatCard label="Peso" value={profile.weight.toString()} unit="kg" />
            <StatCard label="Altura" value={profile.height.toString()} unit="cm" />
            <StatCard label="Edad" value={profile.age.toString()} unit="años" />
          </div>
        </div>

        {/* Macros Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            📊 Tus Macronutrientes
          </h3>
          <p className="text-gray-600 mb-6">
            Plan diario recomendado para tu objetivo
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MacroCard
              icon="🔥"
              label="Calorías"
              value={macros.calories}
              unit="kcal"
              color="orange"
            />
            <MacroCard
              icon="🍖"
              label="Proteínas"
              value={macros.protein}
              unit="g"
              color="red"
            />
            <MacroCard
              icon="🍞"
              label="Carbohidratos"
              value={macros.carbs}
              unit="g"
              color="yellow"
            />
            <MacroCard
              icon="🥑"
              label="Grasas"
              value={macros.fats}
              unit="g"
              color="green"
            />
          </div>

          <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
            <p className="text-sm text-gray-700">
              💡 <strong>Distribución:</strong> {Math.round((macros.protein * 4 / macros.calories) * 100)}% proteínas,{' '}
              {Math.round((macros.carbs * 4 / macros.calories) * 100)}% carbohidratos,{' '}
              {Math.round((macros.fats * 9 / macros.calories) * 100)}% grasas
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <QuickAction
            icon="📸"
            title="Análisis Corporal"
            description="Análisis con IA"
            onClick={() => router.push('/analysis')}
          />
          <QuickAction
            icon="🍎"
            title="Plan Nutricional"
            description="Recetas y comidas"
            onClick={() => router.push('/nutrition')}
          />
          <QuickAction
            icon="📊"
            title="Mediciones"
            description="Registra tu progreso"
            onClick={() => router.push('/measurements')}
          />
          <QuickAction
            icon="⚙️"
            title="Mi Perfil"
            description="Actualiza tus datos"
            onClick={() => router.push('/profile')}
          />
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="bg-emerald-50 p-4 rounded-lg">
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-2xl font-bold text-emerald-600">{value}</p>
      <p className="text-xs text-gray-500">{unit}</p>
    </div>
  );
}

function MacroCard({
  icon,
  label,
  value,
  unit,
  color,
}: {
  icon: string;
  label: string;
  value: number;
  unit: string;
  color: string;
}) {
  const colorClasses = {
    orange: 'from-orange-50 to-orange-100 text-orange-600',
    red: 'from-red-50 to-red-100 text-red-600',
    yellow: 'from-yellow-50 to-yellow-100 text-yellow-600',
    green: 'from-green-50 to-green-100 text-green-600',
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} p-6 rounded-xl`}>
      <div className="text-3xl mb-2">{icon}</div>
      <p className="text-sm font-semibold opacity-80">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-sm opacity-70">{unit}/día</p>
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

function calculateMacros(profile: UserProfile): Macros {
  const { weight, height, age, gender, goal, activityLevel } = profile;

  // Calcular TMB (Tasa Metabólica Basal) - Fórmula Mifflin-St Jeor
  let bmr: number;
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // Multiplicadores de actividad
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    'very-active': 1.9,
  };

  // Calcular TDEE (gasto calórico diario total)
  const tdee = bmr * activityMultipliers[activityLevel];

  // Ajustar calorías según objetivo
  let calories: number;
  if (goal === 'lose') {
    calories = tdee - 500; // Déficit de 500 kcal
  } else if (goal === 'gain') {
    calories = tdee + 300; // Superávit de 300 kcal
  } else {
    calories = tdee;
  }

  // Calcular macros
  const protein = weight * 2; // 2g por kg de peso corporal
  const fats = (calories * 0.25) / 9; // 25% de calorías de grasas
  const carbs = (calories - protein * 4 - fats * 9) / 4; // Resto en carbohidratos

  return {
    calories: Math.round(calories),
    protein: Math.round(protein),
    carbs: Math.round(carbs),
    fats: Math.round(fats),
  };
}

function getBMICategory(bmi: number): { category: string; emoji: string } {
  if (bmi < 18.5) return { category: 'Bajo peso', emoji: '⚠️' };
  if (bmi < 25) return { category: 'Normal', emoji: '✅' };
  if (bmi < 30) return { category: 'Sobrepeso', emoji: '⚠️' };
  return { category: 'Obesidad', emoji: '🔴' };
}
