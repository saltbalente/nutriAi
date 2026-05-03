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

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<UserProfile>>({});

  useEffect(() => {
    const stored = localStorage.getItem('nutriai_profile');
    if (stored) {
      const data = JSON.parse(stored);
      setProfile(data);
      setFormData(data);
    } else {
      router.push('/');
    }
  }, [router]);

  const handleSave = () => {
    localStorage.setItem('nutriai_profile', JSON.stringify(formData));
    setProfile(formData as UserProfile);
    setEditing(false);
  };

  const handleReset = () => {
    if (confirm('¿Estás seguro de que quieres borrar todos tus datos?')) {
      localStorage.removeItem('nutriai_profile');
      localStorage.removeItem('nutriai_measurements');
      router.push('/');
    }
  };

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-emerald-600">⚙️ Mi Perfil</h1>
          <button onClick={() => router.push('/dashboard')} className="text-gray-600 hover:text-gray-800">
            ← Dashboard
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {!editing ? (
            <>
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl text-white">
                  {profile.gender === 'male' ? '👨' : '👩'}
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
                <p className="text-gray-600">{profile.age} años</p>
              </div>

              <div className="space-y-4">
                <InfoRow label="Peso" value={`${profile.weight} kg`} />
                <InfoRow label="Altura" value={`${profile.height} cm`} />
                <InfoRow label="Género" value={profile.gender === 'male' ? 'Masculino' : 'Femenino'} />
                <InfoRow
                  label="Objetivo"
                  value={
                    profile.goal === 'lose'
                      ? '🔥 Perder peso'
                      : profile.goal === 'maintain'
                      ? '⚖️ Mantener peso'
                      : '💪 Ganar músculo'
                  }
                />
                <InfoRow
                  label="Actividad"
                  value={
                    profile.activityLevel === 'sedentary'
                      ? 'Sedentario'
                      : profile.activityLevel === 'light'
                      ? 'Ligero'
                      : profile.activityLevel === 'moderate'
                      ? 'Moderado'
                      : profile.activityLevel === 'active'
                      ? 'Activo'
                      : 'Muy activo'
                  }
                />
              </div>

              <div className="mt-8 space-y-3">
                <button
                  onClick={() => setEditing(true)}
                  className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                >
                  ✏️ Editar Perfil
                </button>
                <button
                  onClick={handleReset}
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  🗑️ Borrar Todos los Datos
                </button>
              </div>
            </>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">Editar Perfil</h3>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre</label>
                <input
                  type="text"
                  required
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Edad</label>
                <input
                  type="number"
                  required
                  min="10"
                  max="100"
                  value={formData.age || ''}
                  onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Peso (kg)</label>
                <input
                  type="number"
                  required
                  min="30"
                  max="300"
                  step="0.1"
                  value={formData.weight || ''}
                  onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Altura (cm)</label>
                <input
                  type="number"
                  required
                  min="100"
                  max="250"
                  value={formData.height || ''}
                  onChange={(e) => setFormData({ ...formData, height: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Objetivo</label>
                <select
                  required
                  value={formData.goal || ''}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value as any })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="lose">🔥 Perder peso</option>
                  <option value="maintain">⚖️ Mantener peso</option>
                  <option value="gain">💪 Ganar músculo</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nivel de actividad
                </label>
                <select
                  required
                  value={formData.activityLevel || ''}
                  onChange={(e) => setFormData({ ...formData, activityLevel: e.target.value as any })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="sedentary">Sedentario</option>
                  <option value="light">Ligero</option>
                  <option value="moderate">Moderado</option>
                  <option value="active">Activo</option>
                  <option value="very-active">Muy activo</option>
                </select>
              </div>

              <div className="space-y-3 mt-6">
                <button
                  type="submit"
                  className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                >
                  💾 Guardar Cambios
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormData(profile);
                    setEditing(false);
                  }}
                  className="w-full text-gray-600 py-2"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-gray-100">
      <span className="text-gray-600 font-medium">{label}</span>
      <span className="text-gray-800 font-semibold">{value}</span>
    </div>
  );
}
