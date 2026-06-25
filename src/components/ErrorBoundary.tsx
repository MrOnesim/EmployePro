import { Component } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <AlertTriangle size={32} className="text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Une erreur est survenue</h1>
          <p className="text-gray-400 mb-2">
            La page demandée n'a pas pu être chargée.
          </p>
          {this.state.error && (
            <p className="text-red-300/60 text-sm mb-6 font-mono bg-black/20 rounded-lg p-3 break-all">
              {this.state.error.message}
            </p>
          )}
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all"
          >
            <RefreshCw size={18} />
            Recharger la page
          </button>
        </div>
      </div>
    );
  }
}
