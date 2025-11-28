import { useState } from 'react';
import { Lock, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export function ChangePassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user, supabaseUser } = useAuth();

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
        window.location.href = '/';
      }, 2000);
    } catch (err: unknown) {
      setError((err as Error).message || 'Erro ao alterar senha');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Alterar Senha</h1>
            <p className="text-slate-600 text-sm">
              Primeira vez aqui? Defina uma nova senha para sua conta
            </p>
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
                  <p className="text-xs mt-1">Redirecionando para o dashboard...</p>
                </div>
              </div>
            )}

            {/* Botão */}
            <button
              type="submit"
              disabled={loading || !isValid || success}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white py-3 rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed shadow-md hover:shadow-lg active:shadow-sm disabled:shadow-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Alterando senha...
                </span>
              ) : success ? (
                'Senha Alterada!'
              ) : (
                'Alterar Senha'
              )}
            </button>

            {/* Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>Dica:</strong> Use uma senha com pelo menos 8 caracteres, incluindo maiúsculas, números e símbolos especiais.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
