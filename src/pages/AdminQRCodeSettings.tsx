import { useQRCode } from '../context/QRCodeContext';
import { Clock, MapPin, Camera, Shield, Save } from 'lucide-react';
import { useState } from 'react';

export default function AdminQRCodeSettings() {
  const { config, updateConfig } = useQRCode();
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    updateConfig({
      arrivalTime: form.arrivalTime.value,
      lunchStartTime: form.lunchStartTime.value,
      lunchEndTime: form.lunchEndTime.value,
      departureTime: form.departureTime.value,
      lateTolerance: parseInt(form.lateTolerance.value),
      gpsRadius: parseInt(form.gpsRadius.value),
      requireSelfie: form.requireSelfie.checked,
      companyLat: parseFloat(form.companyLat.value),
      companyLng: parseFloat(form.companyLng.value),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Pointage QR Code</h2>
        <p className="text-gray-500">Configurez les horaires et la sécurité du pointage</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Horaires */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <Clock size={20} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Horaires de travail</h3>
              <p className="text-sm text-gray-500">Définissez les horaires par défaut</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Arrivée', name: 'arrivalTime', value: config.arrivalTime },
              { label: 'Pause déjeuner', name: 'lunchStartTime', value: config.lunchStartTime },
              { label: 'Retour de pause', name: 'lunchEndTime', value: config.lunchEndTime },
              { label: 'Départ', name: 'departureTime', value: config.departureTime },
            ].map(field => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                <input
                  type="time"
                  name={field.name}
                  defaultValue={field.value}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Tolérance */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center">
              <Shield size={20} className="text-yellow-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Tolérance de retard</h3>
              <p className="text-sm text-gray-500">Délai accepté après l'heure officielle</p>
            </div>
          </div>
          <select
            name="lateTolerance"
            defaultValue={config.lateTolerance}
            className="w-full max-w-xs px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            {[5, 10, 15, 20, 30].map(m => (
              <option key={m} value={m}>{m} minutes</option>
            ))}
          </select>
        </div>

        {/* GPS */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
              <MapPin size={20} className="text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Géolocalisation</h3>
              <p className="text-sm text-gray-500">Rayon de pointage autorisé autour de l'entreprise</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rayon (mètres)</label>
              <input
                type="number"
                name="gpsRadius"
                defaultValue={config.gpsRadius}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
              <input
                type="number"
                step="any"
                name="companyLat"
                defaultValue={config.companyLat}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
              <input
                type="number"
                step="any"
                name="companyLng"
                defaultValue={config.companyLng}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>

        {/* Sécurité */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <Camera size={20} className="text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Vérification faciale (Premium)</h3>
              <p className="text-sm text-gray-500">Demander un selfie après chaque scan</p>
            </div>
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="requireSelfie"
              defaultChecked={config.requireSelfie}
              className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <span className="text-gray-700">Activer la vérification par selfie</span>
          </label>
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-200"
        >
          <Save size={18} />
          {saved ? 'Configuration enregistrée ✓' : 'Enregistrer la configuration'}
        </button>
      </form>
    </div>
  );
}
