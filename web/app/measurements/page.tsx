'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Measurement {
  id: string;
  date: string;
  weight: number;
  bodyFat?: number;
  muscleMass?: number;
  notes?: string;
}

export default function MeasurementsPage() {
  const router = useRouter();
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    weight: '',
    bodyFat: '',
    muscleMass: '',
    notes: '',
  });

  useEffect(() => {
    const stored = localStorage.getItem('nutriai_measurements');
    if (stored) {
      setMeasurements(JSON.parse(stored));
    }
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newMeasurement: Measurement = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      weight: parseFloat(formData.weight),
      bodyFat: formData.bodyFat ? parseFloat(formData.bodyFat) : undefined,
      muscleMass: formData.muscleMass ? parseFloat(formData.muscleMass) : undefined,
      notes: formData.notes || undefined,
    };

    const updated = [newMeasurement, ...measurements];
    setMeasurements(updated);
    localStorage.setItem('nutriai_measurements', JSON.stringify(updated));

    // Update profile weight
    const profile = localStorage.getItem('nutriai_profile');
    if (profile) {
      const profileData = JSON.parse(profile);
      profileData.weight = newMeasurement.weight;
      localStorage.setItem('nutriai_profile', JSON.stringify(profileData));
    }

    setFormData({ weight: '', bodyFat: '', muscleMass: '', notes: '' });
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Eliminar esta medición?')) {
      const updated = measurements.filter((m) => m.id !== id);
      setMeasurements(updated);
      localStorage.setItem('nutriai_measurements', JSON.stringify(updated));
    }
  };

  const getProgress = () => {
    if (measurements.length < 2) return null;
    const latest = measurements[0].weight;
    const oldest = measurements[measurements.length - 1].weight;
    const diff = latest - oldest;
    return {
      diff: Math.abs(diff).toFixed(1),
      direction: diff < 0 ? 'down' : diff > 0 ? 'up' : 'same',
    };
  };

  const progress = getProgress();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-emerald-600">📊 Mediciones</h1>
          <button onClick={() => router.push('/dashboard')} className="text-gray-600 hover:text-gray-800">
            ← Dashboard
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Card */}
        {progress && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Tu Progreso</h3>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl mb-2">
                  {progress.direction === 'down' ? '📉' : progress.direction === 'up' ? '📈' : '➡️'}
                </div>
                <p className="text-3xl font-bold text-emerald-600">
                  {progress.direction === 'down' ? '-' : '+'}
                  {progress.diff} kg
                </p>
                <p className="text-gray-600 mt-2">
                  Desde tu primera medición ({measurements.length} registros)
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Add Button */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="w-full bg-emerald-600 text-white py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors mb-6"
          >
            ➕ Nueva Medición
          </button>
        )}

        {/* Add Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Nueva Medición</h3>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Peso (kg) *
                </label>
                <input
                  type="number"
                  required
                  min="30"
                  max="300"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="70.5"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Grasa corporal (%) - Opcional
                </label>
                <input
                  type="number"
                  min="5"
                  max="50"
                  step="0.1"
                  value={formData.bodyFat}
                  onChange={(e) => setFormData({ ...formData, bodyFat: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="15.5"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Masa muscular (kg) - Opcional
                </label>
                <input
                  type="number"
                  min="20"
                  max="150"
                  step="0.1"
                  value={formData.muscleMass}
                  onChange={(e) => setFormData({ ...formData, muscleMass: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="45.0"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Notas - Opcional
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  rows={3}
                  placeholder="¿Cómo te sientes hoy?"
                />
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                >
                  💾 Guardar Medición
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="w-full text-gray-600 py-2"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Measurements List */}
        <div className="space-y-4">
          {measurements.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No hay mediciones</h3>
              <p className="text-gray-600">
                Añade tu primera medición para empezar a trackear tu progreso
              </p>
            </div>
          ) : (
            measurements.map((m, index) => (
              <div key={m.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">
                        {index === 0 ? '🆕' : '📍'}
                      </span>
                      <div>
                        <p className="text-lg font-bold text-gray-800">{m.weight} kg</p>
                        <p className="text-sm text-gray-600">
                          {new Date(m.date).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>

                    {(m.bodyFat || m.muscleMass) && (
                      <div className="mt-3 flex gap-4 text-sm text-gray-600">
                        {m.bodyFat && <span>🏃 Grasa: {m.bodyFat}%</span>}
                        {m.muscleMass && <span>💪 Músculo: {m.muscleMass} kg</span>}
                      </div>
                    )}

                    {m.notes && (
                      <p className="mt-3 text-sm text-gray-700 italic">&quot;{m.notes}&quot;</p>
                    )}
                  </div>

                  <button
                    onClick={() => handleDelete(m.id)}
                    className="text-red-600 hover:text-red-800 ml-4"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
