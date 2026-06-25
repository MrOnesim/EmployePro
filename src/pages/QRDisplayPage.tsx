import { useNavigate } from 'react-router-dom';
import QRDisplay from '../components/QRDisplay';
import { ArrowLeft } from 'lucide-react';

export default function QRDisplayPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col">
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm">Retour</span>
        </button>
      </div>
      <QRDisplay />
    </div>
  );
}
