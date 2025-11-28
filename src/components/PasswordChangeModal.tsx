import { useState } from 'react';
import { Lock, Eye, EyeOff, AlertCircle, CheckCircle2, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface PasswordChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDismiss: () => Promise<void>;
}

export function PasswordChangeModal({ isOpen, onClose, onDismiss }: PasswordChangeModalProps) {
  const [step, setStep] = useState<'options' | 'change'>('options');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { supabaseUser } = useAuth();

  const getPasswordStrength = () => {
    if (!password) return { level: 0, label: '', color: 'bg-gray-300' };
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const levels = [
      { level: 0, label: '', color: 'bg-gray-300' },
      { level: 1, label: 'Fraca', color: 'bg-red-500' },
      { level: 2, label: 'Média', color: 'bg-yellow-500' },
      { level: 3, label: 'Forte', color: 'bg-green-500' },
      { level: 4, label: 'Muito Forte', color: 'bg-green-600' }
    ];
    return levels[strength];
  };

  const passwordStrength = getPasswordStrength();
  const isValid = password.length >= 6 && password === confirmPassword;

  const handleDismiss = async (type: 'changed' | 'skip') => {
    setLoading(true);
    try {
      if (supabaseUser) {
        await supabase
          .from('users')
          .update({ requires_password_change: false })
          .eq('id', supabaseUser.id);
      }
      await onDismiss();
      onClose();
    } catch (err) {
      setError('Erro ao processar sua escolha');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isValid) {
      setError('Senhas não correspondem ou são muito fracas');
      return;
    }

    setLoading(true);
    try {
      // Update password in auth
      const { error: updateError } = await supabase.auth.updateUser({
        password: password
      });

      if (updateError) throw updateError;

      // Update user profile to mark password as changed
      if (supabaseUser) {
        const { error: profileError } = await supabase
          .from('users')
          .update({ requires_password_change: false })
          .eq('id', supabaseUser.id);

        if (profileError) throw profileError;
      }

      setSuccess(true);
      setTimeout(() => {
        onDismiss();
        onClose();
      }, 1500);
    } catch (err: unknown) {
      setError((err as Error).message || 'Erro ao alterar senha');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      {step === 'options' ? (
        // Tela de opções
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Alterar Senha</h2>
            <p className="text-slate-600 text-sm">
              Recomendamos alterar sua senha para garantir a segurança da sua conta.
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-900">
              <strong>Nota:</strong> Você pode fazer isso agora ou depois. Se pular, poderá alterar sua senha nas configurações a qualquer momento.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setStep('change')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all"
            >
              Trocar Senha Agora
            </button>
            <button
              onClick={() => handleDismiss('changed')}
              disabled={loading}
              className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 py-3 rounded-lg font-semibold transition-all disabled:opacity-50"
            >
              {loading ? 'Processando...' : 'Já Troquei'}
            </button>
            <button
              onClick={() => handleDismiss('skip')}
              disabled={loading}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 py-3 rounded-lg font-semibold transition-all disabled:opacity-50"
            >
              {loading ? 'Processando...' : 'Não Precisa'}
            </button>
          </div>
        </div>
      ) : (
        // Tela de trocar senha
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Lock className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Alterar Senha</h2>
            </div>
            <button
              onClick={() => setStep('options')}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleChangePassword} className="space-y-5">
            {/* Nova Senha */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Nova Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full pl-12 pr-12 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-900"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Força da senha */}
              {password && (
                <div className="flex gap-1.5 mt-3">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-2 flex-1 rounded-full transition-all ${
                        level <= passwordStrength.level ? passwordStrength.color : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              )}
              {password && (
                <p className="text-xs text-gray-600 mt-2">
                  Força: <span className={`font-semibold ${
                    passwordStrength.level === 1 ? 'text-red-600'
                      : passwordStrength.level === 2 ? 'text-yellow-600'
                      : passwordStrength.level === 3 ? 'text-green-600'
                      : 'text-green-700'
                  }`}>
                    {passwordStrength.label}
                  </span>
                </p>
              )}
            </div>

            {/* Confirmar Senha */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                Confirmar Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirme sua nova senha"
                  className={`w-full pl-12 pr-12 py-3 bg-gray-50 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all text-gray-900 ${
                    confirmPassword && password === confirmPassword
                      ? 'border-green-300 focus:border-green-500 focus:ring-green-200'
                      : confirmPassword && password !== confirmPassword
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="text-red-600 text-xs mt-2 font-medium">Senhas não correspondem</p>
              )}
              {confirmPassword && password === confirmPassword && (
                <p className="text-green-600 text-xs mt-2 font-medium">Senhas correspondem</p>
              )}
            </div>

            {/* Erro */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg flex gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Sucesso */}
            {success && (
              <div className="bg-green-50 border-l-4 border-green-500 text-green-700 px-4 py-3 rounded-lg flex gap-3">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Senha alterada com sucesso!</p>
                  <p className="text-xs mt-1">Fechando...</p>
                </div>
              </div>
            )}

            {/* Botões */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setStep('options')}
                disabled={loading || success}
                className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 py-2.5 rounded-lg font-semibold transition-all disabled:opacity-50"
              >
                Voltar
              </button>
              <button
                type="submit"
                disabled={loading || !isValid || success}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white py-2.5 rounded-lg font-semibold transition-all disabled:cursor-not-allowed"
              >
                {loading ? 'Alterando...' : 'Alterar Senha'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
