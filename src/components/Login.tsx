import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Check, FileText, CheckCircle2, BarChart3 } from 'lucide-react';

export function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [fullNameValid, setFullNameValid] = useState(false);
  const [organizationValid, setOrganizationValid] = useState(false);
  const { signIn, signUp } = useAuth();

  const validateEmail = (value: string) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setEmailError(!isValid && value ? 'Email inválido' : '');
    setEmailValid(isValid && value.length > 0);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordValid(value.length >= 6);
  };

  const handleFullNameChange = (value: string) => {
    setFullName(value);
    setFullNameValid(value.trim().length > 0);
  };

  const handleOrganizationChange = (value: string) => {
    setOrganization(value);
    setOrganizationValid(value.trim().length > 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (emailError || !email) {
      setError('Por favor, verifique seu email');
      return;
    }

    if (!password) {
      setError('Digite sua senha');
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) throw error;
      } else {
        if (!fullName.trim()) throw new Error('Nome completo é obrigatório');
        if (!organization.trim()) throw new Error('Organização é obrigatória');
        const { error } = await signUp(email, password, fullName, organization);
        if (error) throw error;
      }
    } catch (err: unknown) {
      setError((err as Error).message || 'Ocorreu um erro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setFullName('');
    setOrganization('');
    setError('');
    setEmailError('');
  };

  return (
    <div className="min-h-screen flex">
      {/* Painel Esquerdo */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-blue-950 shadow-2xl overflow-hidden relative">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>

        {/* Conteúdo Principal */}
        <div className="relative z-10 pt-48 pl-16">
          {/* Título Principal */}
          <div className="mb-5">
            <h1 className="text-5xl font-bold text-white leading-tight" style={{ fontFamily: '"Poppins", "Inter", "Roboto", sans-serif' }}>
              Gestão de Contratos
            </h1>
          </div>

          {/* Subtítulo */}
          <p className="text-lg text-white/80 max-w-md leading-relaxed mb-16" style={{ fontWeight: 400 }}>
            Plataforma completa para automação, conformidade e acompanhamento de licitações públicas
          </p>

          {/* Lista de Benefícios */}
          <div className="space-y-7">
            {/* Benefício 1 */}
            <div className="flex gap-5 items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="flex items-center justify-center h-6 w-6 rounded-full border-2 border-white/60">
                  <FileText className="h-3.5 w-3.5 text-white/60" strokeWidth={2.5} />
                </div>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">ETP Estruturado</h3>
                <p className="text-white/80 text-sm leading-relaxed">Crie especificações técnicas com validação automática e checklists integrados</p>
              </div>
            </div>

            {/* Benefício 2 */}
            <div className="flex gap-5 items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="flex items-center justify-center h-6 w-6 rounded-full border-2 border-white/60">
                  <CheckCircle2 className="h-3.5 w-3.5 text-white/60" strokeWidth={2.5} />
                </div>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">Análise Automática</h3>
                <p className="text-white/80 text-sm leading-relaxed">Processe aceitabilidade, habilitação e julgamento de forma inteligente</p>
              </div>
            </div>

            {/* Benefício 3 */}
            <div className="flex gap-5 items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="flex items-center justify-center h-6 w-6 rounded-full border-2 border-white/60">
                  <BarChart3 className="h-3.5 w-3.5 text-white/60" strokeWidth={2.5} />
                </div>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">Rastreabilidade Total</h3>
                <p className="text-white/80 text-sm leading-relaxed">Trilha de auditoria completa em todas as fases da licitação</p>
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé */}
        <div className="relative z-10 pb-10 pl-16">
          <p className="text-sm text-white/50" style={{ fontSize: '13px' }}>
            © 2025 AutoGov. Todos os direitos reservados.
          </p>
        </div>
      </div>

      {/* Painel Direito */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-white p-6 sm:p-8">
        <div className="w-full max-w-sm">
          <div className="mb-12 flex flex-col items-center lg:items-start gap-4">
            <div className="flex items-center gap-3">
              <img src="/logoBG.png" alt="AutoGov Logo" className="h-16 object-contain" />
              <h1 className="text-4xl font-black text-slate-900">AutoGov</h1>
            </div>
          </div>

          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {isLogin ? 'Acesse sua Conta' : 'Criar Nova Conta'}
            </h2>
            <p className="text-gray-600 text-sm">
              {isLogin ? 'Acesse sua conta com suas credenciais' : 'Preencha os dados para criar sua conta'}
            </p>
          </div>

          {/* Abas */}
          <div className="inline-flex bg-slate-100 p-1 rounded-lg mb-8 gap-2 w-full">
            <button
              type="button"
              onClick={() => {
                setIsLogin(true);
                resetForm();
              }}
              className={`flex-1 px-6 py-2.5 rounded-md font-semibold transition-all ${
                isLogin ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Entrar
            </button>
            <button
              type="button"
              onClick={() => {
                setIsLogin(false);
                resetForm();
              }}
              className={`flex-1 px-6 py-2.5 rounded-md font-semibold transition-all ${
                !isLogin ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cadastrar
            </button>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Campos de Cadastro */}
            {!isLogin && (
              <>
                <div>
                  <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Nome Completo
                  </label>
                  <div className="relative">
                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => handleFullNameChange(e.target.value)}
                      placeholder="João da Silva"
                      className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-lg focus:outline-none transition-all text-gray-900 ${
                        fullNameValid ? 'border-green-300 focus:ring-2 focus:ring-green-200' : 'border-gray-200 focus:ring-2 focus:ring-blue-200'
                      }`}
                      required={!isLogin}
                    />
                    {fullNameValid && (
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <div className="flex items-center justify-center h-5 w-5 rounded-full bg-green-100">
                          <Check className="h-3 w-3 text-green-600" strokeWidth={3} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="organization" className="block text-sm font-semibold text-gray-700 mb-2">
                    Organização
                  </label>
                  <div className="relative">
                    <input
                      id="organization"
                      type="text"
                      value={organization}
                      onChange={(e) => handleOrganizationChange(e.target.value)}
                      placeholder="Secretaria de Finanças"
                      className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-lg focus:outline-none transition-all text-gray-900 ${
                        organizationValid ? 'border-green-300 focus:ring-2 focus:ring-green-200' : 'border-gray-200 focus:ring-2 focus:ring-blue-200'
                      }`}
                      required={!isLogin}
                    />
                    {organizationValid && (
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <div className="flex items-center justify-center h-5 w-5 rounded-full bg-green-100">
                          <Check className="h-3 w-3 text-green-600" strokeWidth={3} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validateEmail(e.target.value);
                  }}
                  onBlur={() => validateEmail(email)}
                  placeholder="seu@email.com"
                  className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all text-gray-900 ${
                    emailError ? 'border-red-300 focus:ring-red-200' : emailValid ? 'border-green-300 focus:ring-green-200' : 'border-gray-200 focus:ring-blue-200'
                  }`}
                  required
                />
                {emailValid && !emailError && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="flex items-center justify-center h-5 w-5 rounded-full bg-green-100">
                      <Check className="h-3 w-3 text-green-600" strokeWidth={3} />
                    </div>
                  </div>
                )}
              </div>
              {emailError && <p className="text-red-600 text-xs mt-1">{emailError}</p>}
            </div>

            {/* Senha */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 pr-12 bg-gray-50 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all text-gray-900 ${
                    passwordValid ? 'border-green-300 focus:ring-green-200' : 'border-gray-200 focus:ring-blue-200'
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Erro */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg">
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Botão */}
            <button
              type="submit"
              disabled={loading || !!emailError || !email || !password || (!isLogin && (!fullName || !organization))}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white py-3 rounded-lg font-semibold transition-all disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  {isLogin ? 'Entrando...' : 'Cadastrando...'}
                </>
              ) : isLogin ? (
                'Entrar'
              ) : (
                'Criar Conta'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
