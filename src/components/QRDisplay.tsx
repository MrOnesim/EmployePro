import { QRCodeSVG } from 'qrcode.react';
import { Clock, Sun, Coffee, Moon, Smartphone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useQRCode } from '../context/QRCodeContext';
import type { QRCodeType } from '../types';

const typeMeta: Record<QRCodeType, { label: string; time: string; icon: LucideIcon; color: string }> = {
  arrival: { label: 'Arrivée', time: '09:00', icon: Sun, color: 'bg-green-500' },
  lunch_start: { label: 'Pause déjeuner', time: '13:00', icon: Coffee, color: 'bg-yellow-500' },
  lunch_end: { label: 'Retour pause', time: '14:00', icon: Clock, color: 'bg-blue-500' },
  departure: { label: 'Départ', time: '18:00', icon: Moon, color: 'bg-purple-500' },
};

export default function QRDisplay() {
  const { config, getCodeForType } = useQRCode();
  const now = new Date();
  const today = now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const types: QRCodeType[] = ['arrival', 'lunch_start', 'lunch_end', 'departure'];
  const timeMap: Record<QRCodeType, string> = {
    arrival: config.arrivalTime,
    lunch_start: config.lunchStartTime,
    lunch_end: config.lunchEndTime,
    departure: config.departureTime,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col">
      <div className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2 border border-white/20 mb-4">
            <Smartphone size={16} className="text-blue-300" />
            <span className="text-sm font-medium text-white">Scannez pour pointer</span>
          </div>
          <h1 className="text-4xl font-black text-white mb-2">Pointage par QR Code</h1>
          <p className="text-blue-200 text-lg capitalize">{today}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {types.map(type => {
            const meta = typeMeta[type];
            const code = getCodeForType(type);
            const time = timeMap[type];
            const Icon = meta.icon;

            return (
              <div key={type} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center hover:bg-white/20 transition-all">
                <div className={`w-12 h-12 rounded-xl ${meta.color} flex items-center justify-center mx-auto mb-4`}>
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{meta.label}</h3>
                <p className="text-blue-200 text-sm mb-4">{time}</p>
                {code ? (
                  <div className="bg-white rounded-xl p-3 inline-block mx-auto">
                    <QRCodeSVG value={code} size={160} level="M" />
                  </div>
                ) : (
                  <div className="bg-white/5 rounded-xl p-3 inline-block mx-auto">
                    <div className="w-40 h-40 flex items-center justify-center text-gray-400 text-sm">
                      En attente...
                    </div>
                  </div>
                )}
                <p className="text-xs text-blue-300 mt-3 font-mono">{code || '--'}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10 text-gray-400 text-sm">
          QR Codes dynamiques — changent automatiquement chaque jour à minuit
        </div>
      </div>
    </div>
  );
}
