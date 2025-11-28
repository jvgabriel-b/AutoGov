import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Debug: Log environment variables
console.log('=== SIGCOP Debug Info ===');
console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL ? '✓ Configurado' : '✗ NÃO configurado');
console.log('VITE_SUPABASE_ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY ? '✓ Configurado' : '✗ NÃO configurado');
console.log('Environment:', import.meta.env.MODE);
console.log('========================');

const rootElement = document.getElementById('root');
if (!rootElement) {
  document.body.innerHTML = '<div style="padding: 20px; color: red; font-family: monospace;"><h1>Erro: Elemento root não encontrado!</h1></div>';
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
