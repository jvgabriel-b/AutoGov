import { useState } from 'react';
import { Mail, User, Building2, Plus, AlertCircle, CheckCircle2, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserCreated: () => void;
}

export function AdminCreateUser({ isOpen, onClose, onUserCreated }: CreateUserModalProps) {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');

  const validateEmail = (value: string) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setEmailError(!isValid && value ? 'Email inválido' : '');
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (emailError || !email) {
      setError('Email inválido');
      return;
    }

    if (!fullName.trim()) {
      setError('Nome completo é obrigatório');
      return;
    }

    setLoading(true);
    try {
      // Update user profile in database
      const { error: updateError } = await supabase
        .from('users')
        .update({
          full_name: fullName,
          organization: organization || 'Sem Organização',
          requires_password_change: true,
        })
        .eq('email', email);

      if (updateError) throw updateError;

      setSuccess(true);
      setTimeout(() => {
        resetForm();
        onUserCreated();
      }, 2000);
    } catch (err: unknown) {
      const errorMsg = (err as any).message || 'Erro ao atualizar usuário. Certifique-se de que o email existe.';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setFullName('');
    setOrganization('');
    setError('');
    setSuccess(false);
    setEmailError('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Plus className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Atualizar Perfil</h2>
          </div>
          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-900">
            <strong>Instruções:</strong> Preencha o email do usuário já criado no Supabase para atualizar seu perfil. O usuário será forçado a trocar a senha no primeiro login.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleCreateUser} className="space-y-4">
          {/* Nome Completo */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
              Nome Completo *
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="João Silva"
                className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-900"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email *
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
                onBlur={() => validateEmail(email)}
                placeholder="usuario@exemplo.com"
                className={`w-full pl-12 pr-4 py-2.5 bg-gray-50 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all text-gray-900 ${
                  emailError
                    ? 'border-red-300 focus:ring-red-200'
                    : email
                    ? 'border-green-300 focus:ring-green-200'
                    : 'border-gray-200 focus:ring-blue-200'
                }`}
                required
              />
            </div>
            {emailError && <p className="text-red-600 text-xs mt-1">{emailError}</p>}
          </div>

          {/* Organização */}
          <div>
            <label htmlFor="organization" className="block text-sm font-semibold text-gray-700 mb-2">
              Organização
            </label>
            <div className="relative">
              <Building2 className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="organization"
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="Secretaria de Finanças"
                className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-900"
              />
            </div>
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
                <p className="text-sm font-medium">Perfil atualizado com sucesso!</p>
                <p className="text-xs mt-1">Fechando modal...</p>
              </div>
            </div>
          )}

          {/* Botões */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 py-2.5 rounded-lg font-semibold transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || success || !email || !fullName}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white py-2.5 rounded-lg font-semibold transition-all disabled:cursor-not-allowed"
            >
              {loading ? 'Atualizando...' : 'Atualizar Perfil'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
