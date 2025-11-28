import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { ChangePassword } from './components/ChangePassword';
import { useEffect, useState } from 'react';

function AppContent() {
  const { user, loading, requiresPasswordChange } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Log para diagnosticar
    console.log('AppContent - user:', user);
    console.log('AppContent - loading:', loading);
    console.log('AppContent - requiresPasswordChange:', requiresPasswordChange);
  }, [user, loading, requiresPasswordChange]);

  if (error) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-8 max-w-md text-center">
          <h1 className="text-red-600 font-bold text-xl mb-2">Erro</h1>
          <p className="text-slate-700 mb-4">{error}</p>
          <button
            onClick={() => {
              setError(null);
              window.location.reload();
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Recarregar
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-slate-600 mb-4">Carregando...</div>
          <div className="inline-block">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return <Dashboard />;
}

function App() {
  const [appError, setAppError] = useState<string | null>(null);

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Global error:', event.error);
      setAppError(event.error?.message || 'Erro desconhecido');
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled rejection:', event.reason);
      setAppError(event.reason?.message || 'Erro ao carregar aplicação');
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  if (appError) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-8 max-w-md text-center">
          <h1 className="text-red-600 font-bold text-xl mb-2">Erro na Aplicação</h1>
          <p className="text-slate-700 mb-4 text-sm">{appError}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Recarregar Página
          </button>
        </div>
      </div>
    );
  }

  console.log('App rendering...');

  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
