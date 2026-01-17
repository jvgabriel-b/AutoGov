import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ChangePasswordPage } from './ChangePasswordPage';
import { ModuloETP } from './ModuloETP';
import { ModuloCompliance } from './ModuloCompliance';
import { ModuloGestaoContratual } from './ModuloGestaoContratual';
import { ModuloInteligencia } from './ModuloInteligencia';
import {
  LogOut, User, Server, Target,
  Activity, Menu, X, Search,
  FileCheck, Briefcase, Brain,
  AlertCircle as AlertIcon, Clock,
  FileText,
  Settings
} from 'lucide-react';

type ModulePage = 'dashboard' | 'etp' | 'compliance' | 'gestaoContratual' | 'inteligencia' | 'changePassword';

// Dados dos Módulos principais do AutoGov
const modulosParte1 = [
  {
    id: 'etp',
    numero: 1,
    title: 'ETP: Planejamento e Publicação',
    desc: 'Construção de Estudos Técnicos Preliminares',
    detalhes: 'Editor estruturado, validação automática, versionamento, exportação PDF/XML e PNCP',
    icon: Target,
    color: 'text-blue-700',
    bg: 'bg-blue-50',
    parte: 1
  }
];

const modulosParte2 = [
  {
    id: 'compliance',
    numero: 3,
    title: 'Compliance: Análise Pós-Licitação',
    desc: 'Análise completa das fases 5 a 11',
    detalhes: 'Aceitabilidade, Habilitação, Julgamento, Recursos, Adjudicação e Formalização',
    icon: FileCheck,
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    parte: 2
  },
  {
    id: 'gestaoContratual',
    numero: 4,
    title: 'Gestão Contratual',
    desc: 'Acompanhamento completo da execução contratual',
    detalhes: 'Entregas, fiscalização, ocorrências, aditivos, notificações e encerramento',
    icon: Briefcase,
    color: 'text-orange-700',
    bg: 'bg-orange-50',
    parte: 2
  },
  {
    id: 'inteligencia',
    numero: 5,
    title: 'Inteligência Governamental',
    desc: 'Análise preditiva e auditoria com IA',
    detalhes: 'Detecção de riscos, pesquisa de preços, auditoria preventiva e relatórios',
    icon: Brain,
    color: 'text-violet-700',
    bg: 'bg-violet-50',
    parte: 2
  }
];

export function Dashboard() {
  const { user, signOut } = useAuth();
  const [currentPage, setCurrentPage] = useState<ModulePage>('dashboard');
  const [loading, setLoading] = useState(true);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setLoading(false);
  }, []);

  const renderContent = () => {
    if (currentPage === 'dashboard') {
      return (
        <div className="space-y-8">
          {/* Header - Minimalista & Profissional */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-lg p-8 text-white shadow-lg border border-slate-700/50">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h2 className="text-3xl font-semibold">
                  Bem-vindo, {user?.full_name?.split(' ')[0]}
                </h2>
                <p className="text-slate-300 text-sm tracking-wide">
                  {searchQuery
                    ? `Resultados para "${searchQuery}"`
                    : 'Painel de Controle'}
                </p>
              </div>
              <div className="text-right text-xs text-slate-400">
                <p>AutoGov</p>
                <p className="text-slate-500 mt-1">v1.0</p>
              </div>
            </div>
          </div>

          {/* SEÇÃO 1: MÓDULOS - DESTAQUE PRINCIPAL */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <Server className="w-6 h-6 text-blue-600" />
                  Módulos
                </h3>
                <p className="text-slate-600 text-sm mt-1">Acesse os módulos principais para gerenciar licitações e conformidade</p>
              </div>
            </div>

            {/* PARTE 1: CRIAÇÃO DO ETP */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</div>
                <h4 className="text-lg font-bold text-slate-900">CRIAÇÃO DO ETP — Fase Interna de Planejamento</h4>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {modulosParte1.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setCurrentPage('etp')}
                    className="bg-white rounded-2xl border-2 border-blue-200 shadow-md hover:shadow-xl hover:border-blue-400 transition-all text-left group relative overflow-hidden cursor-pointer hover:scale-[1.02] duration-300"
                  >
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute -right-12 -top-12 w-32 h-32 bg-blue-100 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

                    <div className="p-6 relative z-10">
                      <div className="flex items-start gap-4">
                        <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-3.5 rounded-xl group-hover:from-blue-200 group-hover:to-indigo-200 transition-all flex-shrink-0">
                          <service.icon className="w-6 h-6 text-blue-700" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="inline-block mb-2">
                            <span className="text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1.5 rounded-full">MÓDULO {service.numero}</span>
                          </div>
                          <h4 className="font-bold text-slate-900 text-base leading-tight group-hover:text-blue-700 transition-colors">
                            {service.title}
                          </h4>
                          <p className="text-sm text-slate-600 mt-2 font-medium">
                            {service.desc}
                          </p>
                          <p className="text-xs text-slate-500 mt-3">
                            {service.detalhes}
                          </p>
                          <div className="mt-4 flex items-center gap-1 text-blue-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                            <span>Acessar módulo</span>
                            <span className="text-lg">→</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* PARTE 2: ANÁLISE COMPLETA PÓS-LICITAÇÃO */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</div>
                <h4 className="text-lg font-bold text-slate-900">ANÁLISE COMPLETA — Pós-Licitação (Fases 5 a 11)</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {modulosParte2.map((service) => {
                  const colorMap: Record<string, { border: string; gradient: string; bgFrom: string; bgTo: string; hoverBorder: string; text: string; tagBg: string }> = {
                    compliance: { border: 'border-emerald-200', gradient: 'from-emerald-600 to-teal-600', bgFrom: 'from-emerald-100', bgTo: 'to-teal-100', hoverBorder: 'hover:border-emerald-400', text: 'text-emerald-700', tagBg: 'bg-emerald-50' },
                    gestaoContratual: { border: 'border-orange-200', gradient: 'from-orange-600 to-amber-600', bgFrom: 'from-orange-100', bgTo: 'to-amber-100', hoverBorder: 'hover:border-orange-400', text: 'text-orange-700', tagBg: 'bg-orange-50' },
                    inteligencia: { border: 'border-violet-200', gradient: 'from-violet-600 to-purple-600', bgFrom: 'from-violet-100', bgTo: 'to-purple-100', hoverBorder: 'hover:border-violet-400', text: 'text-violet-700', tagBg: 'bg-violet-50' }
                  };
                  const colors = colorMap[service.id] || colorMap.compliance;

                  return (
                    <button
                      key={service.id}
                      onClick={() => setCurrentPage(service.id as ModulePage)}
                      className={`bg-white rounded-2xl border-2 ${colors.border} shadow-md hover:shadow-xl ${colors.hoverBorder} transition-all text-left group relative overflow-hidden cursor-pointer hover:scale-[1.02] duration-300`}
                    >
                      <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
                      <div className={`absolute -right-12 -top-12 w-32 h-32 ${colors.tagBg} rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />

                      <div className="p-6 relative z-10">
                        <div className="flex flex-col gap-4">
                          <div className="flex items-start justify-between">
                            <div className={`bg-gradient-to-br ${colors.bgFrom} ${colors.bgTo} p-3.5 rounded-xl transition-all flex-shrink-0`}>
                              <service.icon className={`w-6 h-6 ${colors.text}`} />
                            </div>
                            <span className={`text-xs font-bold text-white bg-gradient-to-r ${colors.gradient} px-3 py-1.5 rounded-full`}>
                              MÓDULO {service.numero}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className={`font-bold text-slate-900 text-base leading-tight group-hover:${colors.text} transition-colors`}>
                              {service.title}
                            </h4>
                            <p className="text-sm text-slate-600 mt-2 font-medium">
                              {service.desc}
                            </p>
                            <p className="text-xs text-slate-500 mt-3">
                              {service.detalhes}
                            </p>

                            <div className={`mt-4 flex items-center gap-1 ${colors.text} font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity`}>
                              <span>Acessar módulo</span>
                              <span className="text-lg">→</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* SEÇÃO 2: Alertas e Status Geral */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Painel de Alertas Críticos */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-lg p-7">
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <AlertIcon className="w-5 h-5 text-red-600" />
                Alertas e Ações Necessárias
              </h3>

              <div className="space-y-3">
                {/* Crítico */}
                <div className="border-l-4 border-rose-600 bg-rose-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-bold text-slate-900 text-sm">Contrato vencendo em 5 dias</p>
                        <span className="text-xs bg-rose-200 text-rose-800 px-2.5 py-1 rounded-md font-semibold">CRÍTICO</span>
                      </div>
                      <p className="text-xs text-slate-600">CT-2024-001 • Secretaria de Educação</p>
                      <p className="text-xs text-slate-600 mt-2">Ação necessária: renovação ou encerramento</p>
                    </div>
                    <AlertIcon className="w-5 h-5 text-rose-700 flex-shrink-0" />
                  </div>
                </div>

                {/* Aviso */}
                <div className="border-l-4 border-amber-600 bg-amber-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-bold text-slate-900 text-sm">Pagamento pendente de processamento</p>
                        <span className="text-xs bg-amber-200 text-amber-800 px-2.5 py-1 rounded-md font-semibold">AVISO</span>
                      </div>
                      <p className="text-xs text-slate-600">Empenho EMP-2024-45 há 3 dias</p>
                      <p className="text-xs text-slate-600 mt-2">Revisar documentação de suporte</p>
                    </div>
                    <Clock className="w-5 h-5 text-amber-700 flex-shrink-0" />
                  </div>
                </div>

                {/* Informação */}
                <div className="border-l-4 border-blue-600 bg-blue-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-bold text-slate-900 text-sm">2 documentos pendentes de análise</p>
                        <span className="text-xs bg-blue-200 text-blue-800 px-2.5 py-1 rounded-md font-semibold">INFO</span>
                      </div>
                      <p className="text-xs text-slate-600">Adjunto à Licitação LIC-2024-089</p>
                      <p className="text-xs text-slate-600 mt-2">Ver análise automática recomendada</p>
                    </div>
                    <FileText className="w-5 h-5 text-blue-700 flex-shrink-0" />
                  </div>
                </div>

                {/* Resumo */}
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 mt-4">
                  <p className="text-sm font-medium text-slate-700">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-rose-600 rounded-full"></span>
                      <span className="text-slate-900">1 crítico</span>
                    </span>
                    <span className="mx-2.5 text-slate-400">•</span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-amber-600 rounded-full"></span>
                      <span className="text-slate-900">1 aviso</span>
                    </span>
                    <span className="mx-2.5 text-slate-400">•</span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-blue-600 rounded-full"></span>
                      <span className="text-slate-900">2 pendentes</span>
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Resumo Rápido - Status Geral */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-7">
              <h3 className="font-bold text-slate-900 mb-6 text-lg">Status Geral</h3>

              <div className="space-y-5">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-700 font-medium">Conformidade</span>
                    <span className="text-lg font-bold text-emerald-700">92%</span>
                  </div>
                  <div className="bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{width: '92%'}}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-700 font-medium">Taxa de Execução</span>
                    <span className="text-lg font-bold text-blue-700">78%</span>
                  </div>
                  <div className="bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{width: '78%'}}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-700 font-medium">Capacidade Disponível</span>
                    <span className="text-lg font-bold text-slate-700">68%</span>
                  </div>
                  <div className="bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-slate-600 h-full rounded-full" style={{width: '68%'}}></div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                      <p className="font-bold text-slate-900 text-xl">45</p>
                      <p className="text-slate-600 text-xs mt-2 font-medium">Licitações</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                      <p className="font-bold text-slate-900 text-xl">32</p>
                      <p className="text-slate-600 text-xs mt-2 font-medium">Contratos</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                      <p className="font-bold text-slate-900 text-lg">R$ 245M</p>
                      <p className="text-slate-600 text-xs mt-2 font-medium">Volume</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SEÇÃO 3: Atividades Recentes */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-lg p-7">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2 text-lg">
              <Activity className="w-5 h-5 text-slate-600" />
              Atividades Recentes
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3 pb-4 border-b border-slate-100">
                <div className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0 mt-1.5"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-700"><span className="font-medium text-slate-900">Ana Silva</span> criou ETP-2024-045</p>
                  <p className="text-xs text-slate-500 mt-1">há 2 horas</p>
                </div>
              </div>
              <div className="flex items-start gap-3 pb-4 border-b border-slate-100">
                <div className="w-2 h-2 rounded-full bg-emerald-600 flex-shrink-0 mt-1.5"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-700"><span className="font-medium text-slate-900">João Santos</span> aprovou Proposta LIC-2024-089</p>
                  <p className="text-xs text-slate-500 mt-1">há 4 horas</p>
                </div>
              </div>
              <div className="flex items-start gap-3 pb-4 border-b border-slate-100">
                <div className="w-2 h-2 rounded-full bg-amber-600 flex-shrink-0 mt-1.5"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-700"><span className="font-medium text-slate-900">Maria Costa</span> solicitou revisão de documentos CT-2024-001</p>
                  <p className="text-xs text-slate-500 mt-1">há 6 horas</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-slate-600 flex-shrink-0 mt-1.5"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-700"><span className="font-medium text-slate-900">Sistema</span> completou análise de risco para 5 licitações</p>
                  <p className="text-xs text-slate-500 mt-1">há 1 dia</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      );
    }

    // PÁGINA: Trocar Senha
    if (currentPage === 'changePassword') {
      return <ChangePasswordPage onBack={() => setCurrentPage('dashboard')} />;
    }

    // Módulos
    const moduleContent: Record<string, { title: string; icon: typeof Target; content: JSX.Element }> = {
      etp: {
        title: 'Módulo 1 - ETP: Planejamento e Publicação',
        icon: Target,
        content: <ModuloETP userName={user?.full_name || 'Usuário'} />
      },
      compliance: {
        title: 'Módulo 3 - Compliance: Análise Pós-Licitação',
        icon: FileCheck,
        content: <ModuloCompliance userName={user?.full_name || 'Usuário'} />
      },
      gestaoContratual: {
        title: 'Módulo 4 - Gestão Contratual',
        icon: Briefcase,
        content: <ModuloGestaoContratual userName={user?.full_name || 'Usuário'} />
      },
      inteligencia: {
        title: 'Módulo 5 - Inteligência Governamental',
        icon: Brain,
        content: <ModuloInteligencia userName={user?.full_name || 'Usuário'} />
      }
    };

    const currentModule = moduleContent[currentPage] || { title: 'Módulo', icon: Server, content: <div /> };
    const Icon = currentModule.icon;

    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentPage('dashboard')}
            className="text-blue-700 hover:text-blue-800 font-medium flex items-center gap-1"
          >
            ← Voltar ao Início
          </button>
        </div>
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-700 to-blue-900 p-3 rounded-lg shadow-lg shadow-blue-900/20">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">{currentModule.title}</h2>
        </div>
        {currentModule.content}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
           <div className="w-12 h-12 bg-slate-300 rounded-full"></div>
           <div className="text-slate-500 font-medium">Carregando sistema...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="relative w-80 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            {/* Header */}
            <div className="p-6 flex justify-between items-center bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
              <div>
                <span className="font-bold text-white text-lg tracking-tight">AutoGov</span>
                <p className="text-blue-100 text-xs font-medium">Automação de Compras Governamentais</p>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-all duration-200 group"
              >
                <X className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              </button>
            </div>

            {/* User Info */}
            <div className="px-4 py-4 border-b border-slate-700/50">
              <div className="flex items-center gap-3 px-3 py-3 bg-slate-700/30 rounded-xl">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{user?.full_name?.charAt(0).toUpperCase() || 'A'}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{user?.full_name || 'Usuário'}</p>
                  <p className="text-xs text-slate-400 truncate">{user?.email || 'email@gov.br'}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto py-6 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
              <div className="space-y-6 px-4">
                {/* PARTE 1 - ETP */}
                <div>
                  <div className="px-3 text-xs font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    Planejamento
                  </div>
                  <div className="space-y-2">
                    {modulosParte1.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => { setCurrentPage('etp'); setIsSidebarOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
                          currentPage === 'etp'
                            ? 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-white border border-blue-400/30 shadow-lg shadow-blue-500/10'
                            : 'text-slate-300 hover:bg-slate-700/40 hover:text-white'
                        }`}
                      >
                        <div className={`p-2 rounded-lg transition-all ${
                          currentPage === 'etp'
                            ? 'bg-blue-500/30'
                            : 'bg-slate-700/50 group-hover:bg-blue-500/20'
                        }`}>
                          <service.icon className={`w-4 h-4 ${
                            currentPage === 'etp' ? 'text-blue-300' : 'text-slate-400 group-hover:text-blue-400'
                          }`} />
                        </div>
                        <span className="flex-1 text-left text-xs font-semibold">{service.title}</span>
                        {currentPage === 'etp' && <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* PARTE 2 - Análise Pós-Licitação */}
                <div>
                  <div className="px-3 text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                    Análise Pós-Licitação
                  </div>
                  <div className="space-y-2">
                    {modulosParte2.map((service) => {
                      const isActive = currentPage === service.id;
                      const colorMap: Record<string, { activeBg: string; activeText: string; hoverBg: string; hoverText: string; dot: string }> = {
                        compliance: { activeBg: 'from-emerald-500/20 to-teal-500/20', activeText: 'text-emerald-300', hoverBg: 'group-hover:bg-emerald-500/20', hoverText: 'group-hover:text-emerald-400', dot: 'bg-emerald-400' },
                        gestaoContratual: { activeBg: 'from-orange-500/20 to-amber-500/20', activeText: 'text-orange-300', hoverBg: 'group-hover:bg-orange-500/20', hoverText: 'group-hover:text-orange-400', dot: 'bg-orange-400' },
                        inteligencia: { activeBg: 'from-violet-500/20 to-purple-500/20', activeText: 'text-violet-300', hoverBg: 'group-hover:bg-violet-500/20', hoverText: 'group-hover:text-violet-400', dot: 'bg-violet-400' }
                      };
                      const colors = colorMap[service.id] || colorMap.compliance;

                      return (
                        <button
                          key={service.id}
                          onClick={() => { setCurrentPage(service.id as ModulePage); setIsSidebarOpen(false); }}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
                            isActive
                              ? `bg-gradient-to-r ${colors.activeBg} text-white border border-white/20 shadow-lg`
                              : 'text-slate-300 hover:bg-slate-700/40 hover:text-white'
                          }`}
                        >
                          <div className={`p-2 rounded-lg transition-all ${
                            isActive
                              ? 'bg-white/20'
                              : `bg-slate-700/50 ${colors.hoverBg}`
                          }`}>
                            <service.icon className={`w-4 h-4 ${
                              isActive ? colors.activeText : `text-slate-400 ${colors.hoverText}`
                            }`} />
                          </div>
                          <span className="flex-1 text-left text-xs font-semibold">{service.title}</span>
                          {isActive && <div className={`w-1.5 h-1.5 rounded-full ${colors.dot} animate-pulse`}></div>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-gradient-to-t from-slate-900 to-transparent border-t border-slate-700/50 space-y-2">
              <button
                onClick={() => {
                  setCurrentPage('changePassword');
                  setIsSidebarOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-slate-700/40 text-slate-300 text-xs font-medium transition-all duration-200 hover:bg-slate-700/60 hover:text-white"
              >
                <Settings className="w-4 h-4" />
                <span>Trocar Senha</span>
              </button>
              <button
                onClick={signOut}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-red-500/30 hover:scale-105 active:scale-95"
              >
                <LogOut className="w-4 h-4" />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="sticky top-0 z-30 bg-gradient-to-r from-white via-blue-50 to-white/95 backdrop-blur-xl shadow-lg border-b border-blue-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 gap-4">
            {/* Left Section */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2.5 -ml-2 hover:bg-blue-100/60 rounded-lg text-slate-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400/50 group"
              >
                <Menu className="w-6 h-6 group-hover:text-blue-600 transition-colors" />
              </button>

              <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2.5 rounded-xl shadow-md group-hover:shadow-lg transition-all">
                  <Server className="w-5 h-5 text-white" />
                </div>
                <div className="hidden md:block">
                  <h1 className="text-lg font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent leading-tight tracking-tight">AutoGov</h1>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Automação de Compras Governamentais</p>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-4 hidden md:block">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors duration-200" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-12 pr-4 py-2.5 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all duration-200 sm:text-sm font-medium shadow-sm hover:shadow-md"
                  placeholder="Buscar módulos ou serviços..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              <button className="md:hidden p-2.5 text-slate-600 hover:bg-blue-100/60 rounded-lg transition-all duration-200 group">
                <Search className="w-5 h-5 group-hover:text-blue-600 transition-colors" />
              </button>

              <div className="hidden sm:flex items-center gap-2.5 px-3.5 py-2 bg-white hover:bg-blue-50 transition-all duration-200 rounded-full border border-slate-200 shadow-md hover:shadow-lg cursor-pointer group">
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-1.5 rounded-full group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-200">
                  <User className="w-4 h-4 text-blue-700" />
                </div>
                <div className="pr-1">
                  <p className="text-sm font-bold text-slate-800">{user?.full_name?.split(' ')[0]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {renderContent()}
      </main>
    </div>
  );
}
