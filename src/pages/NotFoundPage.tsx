import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-9xl font-black text-blue-600 mb-4">404</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Page introuvable</h1>
        <p className="text-gray-500 mb-8">
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <div className="flex items-center justify-center space-x-4">
          <button onClick={() => window.history.back()} className="flex items-center space-x-2 px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors">
            <ArrowLeft size={18} />
            <span>Retour</span>
          </button>
          <Link to="/" className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
            <Home size={18} />
            <span>Accueil</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
