import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ChangePasswordPage } from './ChangePasswordPage';
import {
  LogOut, User, Server, Target, Map,
  Activity, Menu, X, Search,
  FileSignature, Wallet, FileCheck,
  BarChart3, Bell, Lock, TrendingUp, Shield,
  Download, QrCode, CheckCircle, AlertCircle as AlertIcon, Clock, Users as UsersIcon,
  ArrowUpRight, Eye, Download as DownloadIcon, FileText, Zap, Briefcase,
  DollarSign, Percent, MapPin, Settings, CheckCircle2
} from 'lucide-react';

type ModulePage =
  | 'dashboard'
  | 'central'
  | 'cadastro'
  | 'planejamento'
  | 'execucao'
  | 'financeiro'
  | 'aditivos'
  | 'fiscalizacao'
  | 'comunicacao'
  | 'indicadores'
  | 'changePassword';

// Dados simulados dos Serviços - AutoGov Módulos (Organizados por PARTES)
const modulosParte1 = [
  {
    id: 'central',
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
    id: 'cadastro',
    numero: 3,
    title: 'Negociação e Aceitabilidade',
    desc: 'Validação de propostas',
    detalhes: 'Assinatura digital, catálogo técnico, representante legal, conformidade',
    icon: FileCheck,
    color: 'text-teal-700',
    bg: 'bg-teal-50',
    parte: 2
  },
  {
    id: 'planejamento',
    numero: 4,
    title: 'Habilitação e Julgamento',
    desc: 'Análise de habilitação e classificação de risco',
    detalhes: 'CEIS, CNEP, SICAF, TCU, OCR, análises técnicas e financeiras',
    icon: CheckCircle,
    color: 'text-sky-700',
    bg: 'bg-sky-50',
    parte: 2
  },
  {
    id: 'execucao',
    numero: 5,
    title: 'Recursos e Contrarrazões',
    desc: 'Gerenciamento de recursos e contrarrazões',
    detalhes: 'Protocolo eletrônico, validação de assinatura, controle de prazos, pré-julgamento IA',
    icon: TrendingUp,
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    parte: 2
  },
  {
    id: 'financeiro',
    numero: 6,
    title: 'Adjudicação e Formalização',
    desc: 'Homologação e assinatura digital',
    detalhes: 'Check-up pré-homologação, minutas contratuais, ICP-Brasil, trilha de auditoria',
    icon: FileSignature,
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    parte: 2
  },
  {
    id: 'aditivos',
    numero: 7,
    title: 'Gestão Contratual',
    desc: 'Acompanhamento completo do contrato',
    detalhes: 'Entregas, metas, cronogramas, ocorrências, penalidades, aditivos, encerramento',
    icon: Briefcase,
    color: 'text-indigo-700',
    bg: 'bg-indigo-50',
    parte: 2
  },
  {
    id: 'fiscalizacao',
    numero: 8,
    title: 'Inteligência e Auditoria',
    desc: 'Análise de risco e auditoria preventiva',
    detalhes: 'IA para riscos, web scraping de preços, mapas de calor, análises comparativas',
    icon: Shield,
    color: 'text-rose-700',
    bg: 'bg-rose-50',
    parte: 2
  },
  {
    id: 'comunicacao',
    numero: 9,
    title: 'Integrações Externas',
    desc: 'Conexão com sistemas governamentais',
    detalhes: 'SICAF, CEIS, CNEP, Receita Federal, PNCP, FGTS, INSS, TST',
    icon: Zap,
    color: 'text-blue-700',
    bg: 'bg-blue-50',
    parte: 2
  },
  {
    id: 'indicadores',
    numero: 10,
    title: 'Segurança e Infraestrutura',
    desc: 'Criptografia AES-256, MFA, LGPD',
    detalhes: 'AES-256, MFA, RBAC, Kubernetes, Docker, LGPD, logs completos, monitoramento',
    icon: Lock,
    color: 'text-slate-700',
    bg: 'bg-slate-50',
    parte: 2
  }
];

const quickServices = [...modulosParte1, ...modulosParte2];

const pageMap: ModulePage[] = [
  'central', 'cadastro', 'planejamento', 'execucao', 'financeiro',
  'aditivos', 'fiscalizacao', 'comunicacao', 'indicadores'
];

// Mock data para contratos
const mockContratos = [
  { id: 1, numero: 'CT-2024-001', descricao: 'Fornecimento de Equipamentos de TI', valor: 150000, status: 'Ativo', dataInicio: '2024-01-15', dataFim: '2025-01-15', convenente: 'Secretaria de Educação' },
  { id: 2, numero: 'CT-2024-002', descricao: 'Serviços de Consultoria', valor: 75000, status: 'Ativo', dataInicio: '2024-02-01', dataFim: '2024-12-31', convenente: 'Secretaria de Saúde' },
  { id: 3, numero: 'CT-2023-045', descricao: 'Obras de Infraestrutura', valor: 500000, status: 'Em Execução', dataInicio: '2023-06-01', dataFim: '2025-06-01', convenente: 'Secretaria de Obras' },
  { id: 4, numero: 'CT-2024-003', descricao: 'Manutenção Predial', valor: 45000, status: 'Finalizado', dataInicio: '2024-01-10', dataFim: '2024-06-10', convenente: 'Secretaria de Patrimônio' },
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                {modulosParte1.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setCurrentPage('central')}
                    className="bg-white rounded-2xl border-2 border-blue-200 shadow-md hover:shadow-xl hover:border-blue-400 transition-all text-left group relative overflow-hidden cursor-pointer hover:scale-105 duration-300"
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
                <h4 className="text-lg font-bold text-slate-900">ANÁLISE COMPLETA — Pós-Licitação</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {modulosParte2.map((service, index) => {
                  const colorMap: { [key: string]: { border: string; bg: string; gradient: string; icon: string; text: string } } = {
                    'text-teal-700': { border: 'border-teal-200', bg: 'bg-teal-50', gradient: 'from-teal-600 to-cyan-600', icon: 'text-teal-700', text: 'text-teal-700' },
                    'text-sky-700': { border: 'border-sky-200', bg: 'bg-sky-50', gradient: 'from-sky-600 to-blue-600', icon: 'text-sky-700', text: 'text-sky-700' },
                    'text-amber-700': { border: 'border-amber-200', bg: 'bg-amber-50', gradient: 'from-amber-600 to-orange-600', icon: 'text-amber-700', text: 'text-amber-700' },
                    'text-emerald-700': { border: 'border-emerald-200', bg: 'bg-emerald-50', gradient: 'from-emerald-600 to-teal-600', icon: 'text-emerald-700', text: 'text-emerald-700' },
                    'text-indigo-700': { border: 'border-indigo-200', bg: 'bg-indigo-50', gradient: 'from-indigo-600 to-blue-600', icon: 'text-indigo-700', text: 'text-indigo-700' },
                    'text-rose-700': { border: 'border-rose-200', bg: 'bg-rose-50', gradient: 'from-rose-600 to-pink-600', icon: 'text-rose-700', text: 'text-rose-700' },
                    'text-blue-700': { border: 'border-blue-200', bg: 'bg-blue-50', gradient: 'from-blue-600 to-cyan-600', icon: 'text-blue-700', text: 'text-blue-700' },
                    'text-slate-700': { border: 'border-slate-200', bg: 'bg-slate-50', gradient: 'from-slate-600 to-slate-700', icon: 'text-slate-700', text: 'text-slate-700' },
                  };
                  const colors = colorMap[service.color] || colorMap['text-blue-700'];
                  return (
                    <button
                      key={service.id}
                      onClick={() => setCurrentPage(pageMap[index + 1])}
                      className={`bg-white rounded-2xl border-2 ${colors.border} shadow-md hover:shadow-xl transition-all text-left group relative overflow-hidden cursor-pointer hover:scale-105 duration-300`}
                    >
                      <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
                      <div className={`absolute -right-12 -top-12 w-32 h-32 ${service.bg} rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />

                      <div className="p-6 relative z-10">
                        <div className="flex items-start gap-4">
                          <div className={`bg-gradient-to-br ${service.bg} p-3.5 rounded-xl group-hover:shadow-md transition-all flex-shrink-0`}>
                            <service.icon className={`w-6 h-6 ${service.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="inline-block mb-2">
                              <span className={`text-xs font-bold text-white bg-gradient-to-r ${colors.gradient} px-3 py-1.5 rounded-full`}>MÓDULO {service.numero}</span>
                            </div>
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

    // Conteúdo dos Módulos Internos
    // MÓDULO 1: ETP - Planejamento e Publicação (Completo)
    const ContratosTable = () => {
      const [activeTab, setActiveTab] = useState<'dashboard' | 'editor' | 'versioning' | 'reviews'>('dashboard');

      const handleExport = (format: 'pdf' | 'xml' | 'docx') => {
        const etpData = {
          numero: 'ETP-2024-001',
          setor: 'Secretaria de TI',
          objeto: 'Fornecimento de Equipamentos de TI',
          valor: 'R$ 150.000,00',
          data: new Date().toLocaleDateString('pt-BR'),
          status: 'Em Elaboração'
        };

        if (format === 'pdf') {
          console.log('Exportando ETP em PDF:', etpData);
          alert('✓ Exportação em PDF iniciada: ETP-2024-001.pdf');
        } else if (format === 'xml') {
          console.log('Exportando ETP em XML:', etpData);
          alert('✓ Exportação em XML iniciada: ETP-2024-001.xml');
        } else if (format === 'docx') {
          console.log('Exportando ETP em DOCX:', etpData);
          alert('✓ Exportação em Word iniciada: ETP-2024-001.docx');
        }
      };

      const handleSave = () => {
        alert('💾 ETP salva como rascunho com sucesso!');
      };

      const handleSubmitForReview = () => {
        alert('✓ ETP enviada para revisão colaborativa!');
      };

      return (
        <div className="space-y-6">
          {/* KPIs Principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-blue-100 text-sm font-medium mb-1">Em Elaboração</p>
                  <p className="text-4xl font-bold">12</p>
                </div>
                <FileText className="w-8 h-8 opacity-50" />
              </div>
              <div className="mt-3 pt-3 border-t border-blue-400/30">
                <p className="text-xs text-blue-100">Estudos Técnicos Preliminares</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-green-100 text-sm font-medium mb-1">Aprovados</p>
                  <p className="text-4xl font-bold">28</p>
                </div>
                <CheckCircle className="w-8 h-8 opacity-50" />
              </div>
              <div className="mt-3 pt-3 border-t border-green-400/30">
                <p className="text-xs text-green-100">Prontos para publicação</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-amber-100 text-sm font-medium mb-1">Em Revisão</p>
                  <p className="text-4xl font-bold">5</p>
                </div>
                <AlertIcon className="w-8 h-8 opacity-50" />
              </div>
              <div className="mt-3 pt-3 border-t border-amber-400/30">
                <p className="text-xs text-amber-100">Aguardando feedback</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-purple-100 text-sm font-medium mb-1">Valor Total</p>
                  <p className="text-3xl font-bold">R$ 45.2M</p>
                </div>
                <DollarSign className="w-8 h-8 opacity-50" />
              </div>
              <div className="mt-3 pt-3 border-t border-purple-400/30">
                <p className="text-xs text-purple-100">Estimado nas ETPs</p>
              </div>
            </div>
          </div>

          {/* Abas de Navegação */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-md">
            <div className="flex flex-wrap border-b border-slate-200">
              {[
                { id: 'dashboard', label: 'Dashboard' },
                { id: 'editor', label: 'Editor de ETP' },
                { id: 'reviews', label: 'Revisões Colaborativas' },
                { id: 'versioning', label: 'Versionamento & Logs' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-6 py-3 font-medium text-sm transition-all ${
                    activeTab === tab.id
                      ? 'text-blue-700 border-b-2 border-blue-600'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6">
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  {/* Ações Rápidas e Filtros */}
                  <div className="flex flex-col md:flex-row gap-3 md:items-center">
                    <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold flex items-center gap-2 whitespace-nowrap">
                      <span>+</span> Nova ETP
                    </button>
                    <input
                      type="text"
                      placeholder="Buscar ETP por número ou título..."
                      className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                    <select className="px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all">
                      <option>Todos os status</option>
                      <option>Em Elaboração</option>
                      <option>Em Revisão</option>
                      <option>Aprovado</option>
                    </select>
                  </div>

                  {/* ETPs em Andamento */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-700" />
                      ETPs em Andamento
                    </h3>
                    <div className="space-y-3">
                      {[
                        { titulo: 'ETP-2024-001', descricao: 'Fornecimento de Equipamentos TI', status: 'Em Revisão', progresso: 65, revisor: 'Ana Silva', setor: 'Secretaria de TI' },
                        { titulo: 'ETP-2024-002', descricao: 'Serviços de Consultoria Fiscal', status: 'Anuência', progresso: 80, revisor: 'João Santos', setor: 'Secretaria de Finanças' },
                        { titulo: 'ETP-2024-003', descricao: 'Obras de Infraestrutura', status: 'Elaboração', progresso: 40, revisor: 'Maria Costa', setor: 'Secretaria de Obras' },
                      ].map((etp, idx) => (
                        <button key={idx} className="w-full text-left border border-slate-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50/40 transition-all group">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-bold text-slate-900">{etp.titulo}</p>
                                <span className={`text-xs px-2.5 py-1 rounded-full font-semibold whitespace-nowrap ${
                                  etp.status === 'Em Revisão' ? 'bg-blue-100 text-blue-700' :
                                  etp.status === 'Anuência' ? 'bg-amber-100 text-amber-700' :
                                  'bg-purple-100 text-purple-700'
                                }`}>
                                  {etp.status}
                                </span>
                              </div>
                              <p className="text-sm text-slate-600">{etp.descricao}</p>
                              <p className="text-xs text-slate-500 mt-1">{etp.setor} • Revisor: {etp.revisor}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex-1">
                              <div className="bg-slate-200 rounded-full h-2.5 overflow-hidden">
                                <div
                                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all"
                                  style={{ width: `${etp.progresso}%` }}
                                ></div>
                              </div>
                            </div>
                            <p className="text-sm font-bold text-slate-700 w-12 text-right">{etp.progresso}%</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* ETPs Aprovadas */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-700" />
                      ETPs Aprovadas e Publicadas (28 total)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                      {[
                        { numero: 'ETP-2023-045', valor: 'R$ 1.2M', data: '15/11/2024' },
                        { numero: 'ETP-2023-046', valor: 'R$ 850K', data: '14/11/2024' },
                        { numero: 'ETP-2023-047', valor: 'R$ 2.5M', data: '13/11/2024' },
                        { numero: 'ETP-2023-048', valor: 'R$ 1.8M', data: '12/11/2024' },
                      ].map((item, idx) => (
                        <div key={idx} className="bg-green-50 border border-green-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer group">
                          <div className="flex items-start justify-between mb-2">
                            <p className="font-bold text-slate-900">{item.numero}</p>
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 group-hover:scale-110 transition-transform" />
                          </div>
                          <p className="text-sm font-semibold text-blue-700">{item.valor}</p>
                          <p className="text-xs text-slate-500 mt-2">Publicado: {item.data}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'editor' && (
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-900"><strong>Criando novo ETP:</strong> Preencha todos os campos obrigatórios abaixo. O sistema validará automaticamente conforme você avança.</p>
                  </div>

                  {/* Campos Obrigatórios do ETP */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Setor Responsável */}
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-2">
                        🏢 Setor Responsável <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="ex: Secretaria de Educação"
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>

                    {/* Objeto da Licitação */}
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-2">
                        📦 Objeto/Produto/Serviço <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="ex: Fornecimento de Equipamentos de TI"
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>

                    {/* Estimativa de Valor */}
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-2">
                        💰 Estimativa de Valor <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="ex: R$ 150.000,00"
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>

                    {/* Modalidade de Licitação */}
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-2">
                        ⚖️ Modalidade de Licitação <span className="text-red-600">*</span>
                      </label>
                      <select className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all">
                        <option>Selecione...</option>
                        <option>Pregão (Eletrônico ou Presencial)</option>
                        <option>Concorrência</option>
                        <option>Tomada de Preço</option>
                        <option>Convite</option>
                      </select>
                    </div>
                  </div>

                  {/* Justificativas */}
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">
                      📋 Justificativa Técnica e de Negócio <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      placeholder="Descreva a necessidade, importância estratégica, e impacto da aquisição..."
                      rows={4}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  {/* Anuências e Pareceres */}
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-3">
                      ✓ Anuências Necessárias <span className="text-red-600">*</span>
                    </label>
                    <div className="space-y-2">
                      {['Anuência Jurídica', 'Anuência Financeira', 'Anuência Técnica', 'Parecer de Conformidade'].map((item, idx) => (
                        <label key={idx} className="flex items-center gap-3 p-2 rounded hover:bg-slate-50 cursor-pointer">
                          <input type="checkbox" className="w-4 h-4 rounded border-slate-300" />
                          <span className="text-sm text-slate-700">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Análises Comparativas */}
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">
                      📊 Análise Comparativa de Preços <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      placeholder="Descreva a análise de mercado realizada, preços benchmarking, e justificativa do valor estimado..."
                      rows={3}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  {/* Riscos Identificados */}
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">
                      ⚠️ Riscos Identificados e Mitigação <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      placeholder="Identifique riscos operacionais, financeiros, jurídicos, e descreva planos de mitigação..."
                      rows={3}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  {/* Alternativas Avaliadas */}
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">
                      🔄 Alternativas Avaliadas <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      placeholder="Descreva outras soluções consideradas e por que esta foi escolhida..."
                      rows={3}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  {/* Ações */}
                  <div className="flex gap-3 pt-4 flex-wrap">
                    <button onClick={handleSave} className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                      💾 Salvar Rascunho
                    </button>
                    <button onClick={handleSubmitForReview} className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold">
                      ✓ Enviar para Revisão
                    </button>
                    <div className="flex gap-2">
                      <button onClick={() => handleExport('pdf')} className="px-4 py-2.5 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors font-semibold text-sm">
                        📄 PDF
                      </button>
                      <button onClick={() => handleExport('xml')} className="px-4 py-2.5 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors font-semibold text-sm">
                        📋 XML
                      </button>
                      <button onClick={() => handleExport('docx')} className="px-4 py-2.5 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors font-semibold text-sm">
                        📑 Word
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-slate-900">Fluxo de Revisão Colaborativa</h3>
                  <div className="space-y-4">
                    {[
                      { etapa: 'Elaboração', responsavel: 'Ana Silva (TI)', status: 'Concluído', data: '25/11/2024' },
                      { etapa: 'Análise Técnica', responsavel: 'João Santos (Técnico)', status: 'Em Progresso', data: '-' },
                      { etapa: 'Parecer Jurídico', responsavel: 'Maria Costa (Jurídico)', status: 'Pendente', data: '-' },
                      { etapa: 'Aprovação Financeira', responsavel: 'Pedro Silva (Finanças)', status: 'Pendente', data: '-' },
                    ].map((rev, idx) => (
                      <div key={idx} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-bold text-slate-900">{rev.etapa}</p>
                            <p className="text-sm text-slate-600 mt-1">{rev.responsavel}</p>
                          </div>
                          <span className={`text-xs px-3 py-1.5 rounded-full font-semibold whitespace-nowrap ${
                            rev.status === 'Concluído' ? 'bg-green-100 text-green-700' :
                            rev.status === 'Em Progresso' ? 'bg-blue-100 text-blue-700' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {rev.status}
                          </span>
                        </div>
                        {rev.data !== '-' && <p className="text-xs text-slate-500 mt-2">Concluído em: {rev.data}</p>}
                      </div>
                    ))}
                  </div>

                  {/* Formulário de Comentário */}
                  <div className="border-t border-slate-200 pt-4">
                    <label className="block text-sm font-bold text-slate-900 mb-2">Adicionar Comentário/Feedback</label>
                    <textarea
                      placeholder="Deixe seu comentário ou feedback para melhorias..."
                      rows={3}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all mb-3"
                    />
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold">
                      📤 Enviar Comentário
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'versioning' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-slate-900">Histórico de Versões e Logs</h3>
                  <div className="space-y-3">
                    {[
                      { versao: 'v2.1', autor: 'Ana Silva', data: '25/11/2024 14:30', acao: 'Atualização de campos e validação', tipo: 'modificação' },
                      { versao: 'v2.0', autor: 'João Santos', data: '24/11/2024 10:15', acao: 'Aprovação técnica e feedback incorporado', tipo: 'aprovação' },
                      { versao: 'v1.5', autor: 'Maria Costa', data: '23/11/2024 16:45', acao: 'Parecer jurídico solicitando ajustes', tipo: 'comentário' },
                      { versao: 'v1.0', autor: 'Ana Silva', data: '20/11/2024 09:00', acao: 'Criação inicial da ETP', tipo: 'criação' },
                    ].map((log, idx) => (
                      <div key={idx} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-bold text-slate-900">{log.versao}</p>
                            <p className="text-sm text-slate-600">Autor: {log.autor}</p>
                          </div>
                          <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                            log.tipo === 'aprovação' ? 'bg-green-100 text-green-700' :
                            log.tipo === 'modificação' ? 'bg-blue-100 text-blue-700' :
                            log.tipo === 'comentário' ? 'bg-amber-100 text-amber-700' :
                            'bg-purple-100 text-purple-700'
                          }`}>
                            {log.tipo}
                          </span>
                        </div>
                        <p className="text-sm text-slate-700 mb-2">{log.acao}</p>
                        <p className="text-xs text-slate-500">{log.data}</p>
                        <button className="text-xs text-blue-600 hover:text-blue-700 mt-2 font-semibold">Ver diferenças →</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Checklist de Conformidade Lei 14.133 */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Checklist Automático
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { item: 'Justificativa Técnica Completa', done: true },
                { item: 'Setor Responsável Identificado', done: true },
                { item: 'Análise de Custos Realizada', done: true },
                { item: 'Anuências Jurídicas Obtidas', done: false },
                { item: 'Conformidade Legal Verificada', done: true },
                { item: 'Documentação de Alternativas Avaliadas', done: true },
                { item: 'Análise de Risco Completa', done: false },
                { item: 'Validação Final Concluída', done: false },
              ].map((check, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-blue-100 hover:border-blue-300 transition-colors">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs ${
                    check.done ? 'bg-green-600 text-white' : 'bg-slate-300 text-white'
                  }`}>
                    {check.done ? '✓' : '○'}
                  </div>
                  <span className={`text-sm font-medium ${check.done ? 'text-slate-600' : 'text-slate-800'}`}>
                    {check.item}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-700">Progresso de Conformidade</span>
                <span className="text-lg font-bold text-blue-700">62.5%</span>
              </div>
              <div className="bg-slate-200 rounded-full h-3 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full" style={{width: '62.5%'}}></div>
              </div>
            </div>
          </div>
        </div>
      );
    };

    // MÓDULO 3: Negociação e Aceitabilidade (Fase 5)
    const CadastroForm = () => (
      <div className="space-y-6">
        {/* KPIs de Aceitabilidade - Melhorado */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-green-100 text-sm font-medium mb-1">Aceitas</p>
                <p className="text-4xl font-bold">18</p>
              </div>
              <CheckCircle className="w-8 h-8 opacity-50" />
            </div>
            <div className="mt-3 pt-3 border-t border-green-400/30">
              <p className="text-xs text-green-100">Validadas e conformes</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-red-100 text-sm font-medium mb-1">Rejeitadas</p>
                <p className="text-4xl font-bold">3</p>
              </div>
              <AlertIcon className="w-8 h-8 opacity-50" />
            </div>
            <div className="mt-3 pt-3 border-t border-red-400/30">
              <p className="text-xs text-red-100">Não conformes</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-100 text-sm font-medium mb-1">Em Análise</p>
                <p className="text-4xl font-bold">5</p>
              </div>
              <Clock className="w-8 h-8 opacity-50" />
            </div>
            <div className="mt-3 pt-3 border-t border-blue-400/30">
              <p className="text-xs text-blue-100">Aguardando validação</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-purple-100 text-sm font-medium mb-1">Taxa Aceitação</p>
                <p className="text-4xl font-bold">85.7%</p>
              </div>
              <BarChart3 className="w-8 h-8 opacity-50" />
            </div>
            <div className="mt-3 pt-3 border-t border-purple-400/30">
              <p className="text-xs text-purple-100">Meta: 80% ✓</p>
            </div>
          </div>
        </div>

        {/* Propostas em Andamento - Card Detalhado */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-md">
          <h3 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
            <FileText className="w-5 h-5 text-green-700" />
            Propostas em Análise
          </h3>

          <div className="space-y-3">
            {[
              { fornecedor: 'Fornecedor A', proposta: 'PROP-2024-089', status: 'Aceita', validade: '✓ Validade OK', dataAnalise: '25/11/2024' },
              { fornecedor: 'Fornecedor B', proposta: 'PROP-2024-090', status: 'Análise', validade: '⚠ Vence em 3 dias', dataAnalise: '24/11/2024' },
              { fornecedor: 'Fornecedor C', proposta: 'PROP-2024-091', status: 'Rejeitada', validade: '✗ Assinatura inválida', dataAnalise: '23/11/2024' },
            ].map((item, idx) => (
              <button key={idx} className="w-full text-left border border-slate-200 rounded-lg p-4 hover:border-green-300 hover:bg-green-50/30 transition-all group">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-slate-900">{item.fornecedor}</p>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold whitespace-nowrap ${
                        item.status === 'Aceita' ? 'bg-green-100 text-green-700' :
                        item.status === 'Análise' ? 'bg-blue-100 text-blue-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">{item.proposta}</p>
                    <p className="text-xs text-slate-500 mt-1">{item.dataAnalise}</p>
                  </div>
                  <span className="text-xs font-medium whitespace-nowrap ml-2">{item.validade}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Análises Automáticas e Documentação */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Checklist de Análises */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Análises de Conformidade
            </h3>

            <div className="space-y-2">
              {[
                { item: 'Assinatura Digital', status: 'Automático', done: true },
                { item: 'Catálogo Técnico', status: 'Verificado', done: true },
                { item: 'Representante Legal', status: 'Conferido', done: true },
                { item: 'Comparação de Propostas', status: 'Verificado', done: true },
                { item: 'Conformidade Edital', status: 'Validado', done: true },
              ].map((check, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-white/60 hover:bg-white transition-colors">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                    check.done ? 'bg-green-600 border-green-600' : 'border-slate-300'
                  }`}>
                    {check.done && <span className="text-white text-xs">✓</span>}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">{check.item}</p>
                    <p className="text-xs text-slate-500">{check.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Documentação Obrigatória */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-md">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-700" />
              Documentação Obrigatória
            </h3>

            <div className="space-y-2">
              {[
                { doc: 'Contrato Social', fornecedor: 'Fornecedor A', data: '20/11/2024', validado: true },
                { doc: 'Procuração', fornecedor: 'Fornecedor B', data: '19/11/2024', validado: true },
                { doc: 'RG do Representante', fornecedor: 'Fornecedor C', data: '18/11/2024', validado: false },
                { doc: 'Proposta Assinada', fornecedor: 'Fornecedor A', data: '17/11/2024', validado: true },
              ].map((doc, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-blue-50 transition-colors">
                  {doc.validado ? (
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  ) : (
                    <AlertIcon className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">{doc.doc}</p>
                    <p className="text-xs text-slate-500">{doc.fornecedor} • {doc.data}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );

    // MÓDULO 4: Habilitação e Julgamento (Fases 6-7)
    const PlanejamentoContent = () => (
      <div className="space-y-6">
        {/* KPIs de Habilitação e Julgamento */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-purple-100 text-sm font-medium mb-1">Habilitados</p>
                <p className="text-3xl font-bold">12</p>
              </div>
              <CheckCircle className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-purple-100 mt-3">Risco Verde</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-yellow-100 text-sm font-medium mb-1">Atenção</p>
                <p className="text-3xl font-bold">4</p>
              </div>
              <AlertIcon className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-yellow-100 mt-3">Risco Amarelo</p>
          </div>
          <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-red-100 text-sm font-medium mb-1">Bloqueados</p>
                <p className="text-3xl font-bold">2</p>
              </div>
              <AlertIcon className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-red-100 mt-3">Risco Vermelho</p>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-100 text-sm font-medium mb-1">Taxa Aprovação</p>
                <p className="text-3xl font-bold">85.7%</p>
              </div>
              <BarChart3 className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-blue-100 mt-3">Meta: 80%</p>
          </div>
        </div>

        {/* Consultas em Base de Dados */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Consultas em Bases de Dados</h3>
            <div className="space-y-3">
              {[
                { consulta: 'CEIS - Cadastro de Empresas Inidôneas', status: 'Verificado', tempo: '2.3s' },
                { consulta: 'CNEP - Cadastro Nacional de Empresas Punidas', status: 'Verificado', tempo: '1.8s' },
                { consulta: 'SICAF - Cadastro de Fornecedores', status: 'Verificado', tempo: '3.1s' },
                { consulta: 'TCU - Tribunal de Contas', status: 'Verificado', tempo: '2.7s' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-purple-50 transition-colors">
                  <div>
                    <p className="font-medium text-slate-800 text-sm">{item.consulta}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Tempo: {item.tempo}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <p className="text-xs font-medium text-green-700">{item.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Análises Realizadas</h3>
            <div className="space-y-3">
              {[
                { analise: 'Validação de Certificado Digital', status: 'Aprovado', tipo: 'Automático' },
                { analise: 'Detecção de Adulteração (OCR)', status: 'Aprovado', tipo: 'Automático' },
                { analise: 'Análise de Preço (IA)', status: 'Aprovado', tipo: 'Automático' },
                { analise: 'Compatibilidade CNAE', status: 'Aprovado', tipo: 'Automático' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-green-50 transition-colors">
                  <div>
                    <p className="font-medium text-slate-800 text-sm">{item.analise}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{item.tipo}</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Análises Técnicas e Financeiras */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Análises Técnicas, Financeiras e Jurídicas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              { tipo: 'Análise Técnica', status: '28/32', percent: 87 },
              { tipo: 'Análise Financeira', status: '26/32', percent: 81 },
              { tipo: 'Análise Jurídica', status: '30/32', percent: 94 },
              { tipo: 'Análise Fiscal', status: '29/32', percent: 91 },
              { tipo: 'Análise Trabalhista', status: '25/32', percent: 78 },
            ].map((item, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-sm font-medium text-slate-800 mb-2">{item.tipo}</p>
                <p className="text-2xl font-bold text-purple-700 mb-2">{item.percent}%</p>
                <div className="w-full bg-slate-300 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-full rounded-full" style={{ width: `${item.percent}%` }}></div>
                </div>
                <p className="text-xs text-slate-600 mt-2">{item.status} analisadas</p>
              </div>
            ))}
          </div>
        </div>

        {/* Classificação de Risco */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Classificação de Risco por Fornecedor</h3>
            <div className="space-y-3">
              {[
                { fornecedor: 'Empresa A Ltda', risco: 'Verde', indices: 'Saudáveis', inexecutavel: false },
                { fornecedor: 'Serviços B S/A', risco: 'Amarelo', indices: 'Atenção', inexecutavel: false },
                { fornecedor: 'Consultoria C Eireli', risco: 'Verde', indices: 'Saudáveis', inexecutavel: false },
                { fornecedor: 'Comércio D Ltda', risco: 'Vermelho', indices: 'Crítico', inexecutavel: true },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800">{item.fornecedor}</p>
                    <p className="text-xs text-slate-600 mt-1">Índices: {item.indices}{item.inexecutavel && ' • ⚠️ INEXECUTÁVEL'}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold whitespace-nowrap ${
                      item.risco === 'Verde' ? 'bg-green-100 text-green-700' :
                      item.risco === 'Amarelo' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {item.risco}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200 p-4">
              <h4 className="font-semibold text-slate-800 mb-3 text-sm">Índices de Solvência</h4>
              <div className="space-y-2">
                {[
                  { indice: 'Liquidez Corrente', valor: '2.45' },
                  { indice: 'Solvência Geral', valor: '1.89' },
                  { indice: 'ROE', valor: '18.5%' },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 bg-white rounded-lg border border-green-100">
                    <p className="text-xs font-medium text-slate-700">{item.indice}</p>
                    <p className="text-xs font-bold text-green-700">{item.valor}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <button className="w-full px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                Gerar Parecer de Habilitação
              </button>
            </div>
          </div>
        </div>

        {/* Validações Obrigatórias */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-200 p-6">
          <h3 className="font-semibold text-slate-800 mb-4">Validações Obrigatórias (CAT, Atestados, NF)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { validacao: 'CAT - Cadastro de Arrecadação Tributária', status: 'OK', comparacao: 'Alinhado' },
              { validacao: 'Atestados de Capacidade Técnica', status: 'OK', comparacao: 'Verificado' },
              { validacao: 'Notas Fiscais de Referência', status: 'OK', comparacao: 'Conferido' },
              { validacao: 'Inscrição CNAE com Objeto', status: 'OK', comparacao: 'Compatível' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 border border-purple-200 rounded-lg bg-white hover:bg-purple-50/50 transition-colors">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-slate-800 text-sm">{item.validacao}</p>
                  <p className="text-xs text-slate-600 mt-1">{item.comparacao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

    // MÓDULO 5: Recursos e Contrarrazões (Fase 8)
    const ExecucaoContent = () => (
      <div className="space-y-6">
        {/* KPIs de Recursos e Contrarrazões */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-orange-100 text-sm font-medium mb-1">Recursos Recebidos</p>
                <p className="text-3xl font-bold">8</p>
              </div>
              <FileText className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-orange-100 mt-3">Aguardando análise</p>
          </div>
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-green-100 text-sm font-medium mb-1">Processados</p>
                <p className="text-3xl font-bold">24</p>
              </div>
              <CheckCircle className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-green-100 mt-3">Com parecer emitido</p>
          </div>
          <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-red-100 text-sm font-medium mb-1">Prazos Expirados</p>
                <p className="text-3xl font-bold">2</p>
              </div>
              <AlertIcon className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-red-100 mt-3">Requerem ação urgente</p>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-100 text-sm font-medium mb-1">Taxa Processamento</p>
                <p className="text-3xl font-bold">75%</p>
              </div>
              <BarChart3 className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-blue-100 mt-3">Meta: 80%</p>
          </div>
        </div>

        {/* Recebimento e Validação de Assinatura */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Recursos Recebidos (Eletrônicos)</h3>
            <div className="space-y-3">
              {[
                { id: 'REC-001', fornecedor: 'Empresa A', dataRecebimento: '20/11/2024 10:35', status: 'Aguardando', assinatura: 'Válida' },
                { id: 'REC-002', fornecedor: 'Serviços B', dataRecebimento: '19/11/2024 14:22', status: 'Análise IA', assinatura: 'Válida' },
                { id: 'REC-003', fornecedor: 'Consultoria C', dataRecebimento: '18/11/2024 09:15', status: 'Processado', assinatura: 'Válida' },
              ].map((recurso, idx) => (
                <div key={idx} className="border border-slate-200 rounded-lg p-4 hover:border-orange-300 hover:bg-orange-50/30 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-slate-800">{recurso.id} - {recurso.fornecedor}</p>
                      <p className="text-xs text-slate-500 mt-1">Recebido: {recurso.dataRecebimento}</p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold whitespace-nowrap ${
                      recurso.status === 'Aguardando' ? 'bg-orange-100 text-orange-700' :
                      recurso.status === 'Análise IA' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {recurso.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <p className="text-xs text-slate-600">Assinatura Digital: {recurso.assinatura}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Controle de Prazos</h3>
            <div className="space-y-3">
              {[
                { contrato: 'CT-2024-001', prazoFinal: '25/11/2024', diasRestantes: 2, status: 'Crítico' },
                { contrato: 'CT-2024-002', prazoFinal: '30/11/2024', diasRestantes: 7, status: 'Atenção' },
                { contrato: 'CT-2023-045', prazoFinal: '05/12/2024', diasRestantes: 12, status: 'Normal' },
              ].map((item, idx) => (
                <div key={idx} className="p-4 border rounded-lg flex items-center justify-between hover:bg-blue-50 transition-colors">
                  <div className="flex-1">
                    <p className="font-medium text-slate-800 text-sm">{item.contrato}</p>
                    <p className="text-xs text-slate-600 mt-1">Vence: {item.prazoFinal}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${
                      item.status === 'Crítico' ? 'text-red-600' :
                      item.status === 'Atenção' ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>{item.diasRestantes}d</p>
                    <p className="text-xs text-slate-600 mt-1">{item.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Análise Prévia por IA */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Pré-Análise por Inteligência Artificial</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { recurso: 'REC-001', sentimento: 'Procedente', confiança: 92, recomendacao: 'Aprovar' },
              { recurso: 'REC-002', sentimento: 'Parcialmente Procedente', confiança: 78, recomendacao: 'Análise Manual' },
              { recurso: 'REC-003', sentimento: 'Improcedente', confiança: 85, recomendacao: 'Rejeitar' },
            ].map((item, idx) => (
              <div key={idx} className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200">
                <p className="font-medium text-slate-800 text-sm mb-3">{item.recurso}</p>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Sentimento IA</p>
                    <p className="text-sm font-semibold text-slate-800">{item.sentimento}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Confiança</p>
                    <div className="w-full bg-slate-300 rounded-full h-2 overflow-hidden">
                      <div className="bg-blue-600 h-full rounded-full" style={{ width: `${item.confiança}%` }}></div>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 text-right">{item.confiança}%</p>
                  </div>
                  <div className="pt-2 border-t border-slate-300">
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold inline-block ${
                      item.recomendacao === 'Aprovar' ? 'bg-green-100 text-green-700' :
                      item.recomendacao === 'Rejeitar' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {item.recomendacao}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline de Interações */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Timeline de Interações (Cronológico por Fornecedor)</h3>
          <div className="space-y-2">
            {[
              { timestamp: '20/11/2024 10:35', tipo: 'Recebimento', fornecedor: 'Empresa A', descricao: 'Recurso REC-001 recebido' },
              { timestamp: '20/11/2024 10:40', tipo: 'Validação', fornecedor: 'Empresa A', descricao: 'Assinatura digital validada' },
              { timestamp: '19/11/2024 14:22', tipo: 'Recebimento', fornecedor: 'Serviços B', descricao: 'Recurso REC-002 recebido' },
              { timestamp: '19/11/2024 14:45', tipo: 'IA', fornecedor: 'Serviços B', descricao: 'Pré-análise concluída (78% confiança)' },
              { timestamp: '18/11/2024 09:15', tipo: 'Recebimento', fornecedor: 'Consultoria C', descricao: 'Recurso REC-003 recebido' },
              { timestamp: '18/11/2024 16:30', tipo: 'Processamento', fornecedor: 'Consultoria C', descricao: 'Parecer emitido - Improcedente' },
            ].map((evento, idx) => (
              <div key={idx} className="flex gap-4 relative pb-4">
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full ${
                    evento.tipo === 'Recebimento' ? 'bg-orange-500' :
                    evento.tipo === 'Validação' ? 'bg-blue-500' :
                    evento.tipo === 'IA' ? 'bg-purple-500' :
                    'bg-green-500'
                  }`}></div>
                  {idx < 5 && <div className="w-0.5 h-12 bg-slate-300 mt-2"></div>}
                </div>
                <div className="flex-1 pt-0.5">
                  <p className="text-xs text-slate-500">{evento.timestamp}</p>
                  <p className="font-medium text-slate-800 text-sm">{evento.descricao}</p>
                  <p className="text-xs text-slate-600">{evento.fornecedor}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

    // MÓDULO 6: Adjudicação e Formalização (Fases 9-10)
    const FinanceiroContent = () => (
      <div className="space-y-6">
        {/* KPIs de Adjudicação */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-emerald-100 text-sm font-medium mb-1">Homologados</p>
                <p className="text-3xl font-bold">18</p>
              </div>
              <CheckCircle className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-emerald-100 mt-3">Prontos para assinatura</p>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-100 text-sm font-medium mb-1">Assinados</p>
                <p className="text-3xl font-bold">28</p>
              </div>
              <FileSignature className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-blue-100 mt-3">Com ICP-Brasil</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-yellow-100 text-sm font-medium mb-1">Em Análise</p>
                <p className="text-3xl font-bold">5</p>
              </div>
              <AlertIcon className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-yellow-100 mt-3">Conformidade final</p>
          </div>
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-purple-100 text-sm font-medium mb-1">Valor Total</p>
                <p className="text-2xl font-bold">R$ 2.34M</p>
              </div>
              <DollarSign className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-purple-100 mt-3">Contratos formalizados</p>
          </div>
        </div>

        {/* Verificação de Conformidade Final */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Checklist Final de Conformidade</h3>
            <div className="space-y-3">
              {[
                { item: 'Análise Completa de Habilitação', status: 'Aprovado', verif: 'Automático' },
                { item: 'Documentação de Habilitação Completa', status: 'Aprovado', verif: 'Manual' },
                { item: 'Análise Técnica Finalizada', status: 'Aprovado', verif: 'Manual' },
                { item: 'Análise Financeira Finalizada', status: 'Aprovado', verif: 'Automático' },
                { item: 'Parecer Jurídico Emitido', status: 'Aprovado', verif: 'Manual' },
                { item: 'Nenhuma Restrição em Bases Externas', status: 'Aprovado', verif: 'Automático' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg hover:bg-green-50 transition-colors">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-slate-800 text-sm">{item.item}</p>
                    <p className="text-xs text-slate-600 mt-1">{item.verif} - {item.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Minutas de Contrato</h3>
            <div className="space-y-3">
              {[
                { contrato: 'CT-2024-001', status: 'Assinada', dataAssina: '20/11/2024', certificado: 'ICP-Brasil' },
                { contrato: 'CT-2024-002', status: 'Assinada', dataAssina: '18/11/2024', certificado: 'ICP-Brasil' },
                { contrato: 'CT-2023-045', status: 'Pronta', dataAssina: 'Aguardando', certificado: 'A assinar' },
                { contrato: 'CT-2024-003', status: 'Em Revisão', dataAssina: 'Pendente', certificado: 'A preparar' },
              ].map((minuta, idx) => (
                <div key={idx} className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50/30 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-slate-800">{minuta.contrato}</p>
                      <p className="text-xs text-slate-600 mt-1">Certificado: {minuta.certificado}</p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold whitespace-nowrap ${
                      minuta.status === 'Assinada' ? 'bg-green-100 text-green-700' :
                      minuta.status === 'Pronta' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {minuta.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{minuta.status === 'Assinada' ? 'Assinado em: ' : 'Prazo: '}{minuta.dataAssina}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Análise Completa de Documentos */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Análise Completa de Documentação</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { doc: 'Editais e Termos', analisados: '32/32', status: 'Completo' },
              { doc: 'Propostas Técnicas', analisados: '28/28', status: 'Completo' },
              { doc: 'Propostas Financeiras', analisados: '28/28', status: 'Completo' },
              { doc: 'Documentação Habilitação', analisados: '18/18', status: 'Completo' },
            ].map((item, idx) => (
              <div key={idx} className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg border border-emerald-200">
                <p className="text-sm font-medium text-slate-800 mb-2">{item.doc}</p>
                <p className="text-2xl font-bold text-emerald-700">{item.analisados}</p>
                <p className="text-xs text-slate-600 mt-2">{item.status}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Auditoria e Trilha Digital */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Trilha de Auditoria Completa (Audit Trail)</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {[
              { timestamp: '20/11/2024 14:30', ator: 'Admin Sistema', acao: 'Contrato CT-2024-001 assinado digitalmente', certificado: 'ICP-Brasil válido' },
              { timestamp: '20/11/2024 14:25', ator: 'Gestor Jurídico', acao: 'Parecer de conformidade aprovado', resultado: 'Aprovado' },
              { timestamp: '20/11/2024 13:45', ator: 'Analista Técnico', acao: 'Análise técnica finalizada', resultado: 'Conforme' },
              { timestamp: '20/11/2024 10:15', ator: 'Gestor Financeiro', acao: 'Análise financeira concluída', resultado: 'Conforme' },
              { timestamp: '19/11/2024 16:30', ator: 'Sistema Automático', acao: 'Verificação em CEIS, CNEP, SICAF realizada', resultado: 'OK' },
              { timestamp: '18/11/2024 09:00', ator: 'Coordenador Geral', acao: 'Minuta do contrato importada para análise', arquivo: 'CT-2024-001-v3.pdf' },
            ].map((evento, idx) => (
              <div key={idx} className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-medium text-slate-800">{evento.acao}</p>
                  <p className="text-xs text-slate-500">{evento.timestamp}</p>
                </div>
                <p className="text-xs text-slate-600">Por: {evento.ator}</p>
                {evento.resultado && <p className="text-xs text-green-700 mt-1">✓ {evento.resultado}</p>}
                {evento.certificado && <p className="text-xs text-blue-700 mt-1">🔒 {evento.certificado}</p>}
                {evento.arquivo && <p className="text-xs text-slate-600 mt-1">📄 {evento.arquivo}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Integração com Certificado Digital */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-4">
            <h4 className="font-semibold text-slate-800 mb-3">Informações do Certificado ICP-Brasil</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <p className="text-slate-600">Certificadora:</p>
                <p className="font-medium text-slate-800">Certisign</p>
              </div>
              <div className="flex justify-between">
                <p className="text-slate-600">Tipo:</p>
                <p className="font-medium text-slate-800">e-CPF A1 (Entidade)</p>
              </div>
              <div className="flex justify-between">
                <p className="text-slate-600">Validade:</p>
                <p className="font-medium text-green-700">Até 15/11/2025</p>
              </div>
              <div className="flex justify-between">
                <p className="text-slate-600">Algoritmo:</p>
                <p className="font-medium text-slate-800">SHA-256</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium mb-2">
              📋 Assinador Digital (Certificado Ativo)
            </button>
            <button className="w-full px-4 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors text-sm font-medium">
              📊 Gerar Certificado de Entrega
            </button>
          </div>
        </div>
      </div>
    );

    // MÓDULO 7: Gestão Contratual (Fase 11 - Execução e Formalização)
    const AditivosContent = () => (
      <div className="space-y-6">
        {/* KPIs de Gestão Contratual */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-indigo-100 text-sm font-medium mb-1">Contratos Ativos</p>
                <p className="text-3xl font-bold">18</p>
              </div>
              <Briefcase className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-indigo-100 mt-3">Em execução</p>
          </div>
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-green-100 text-sm font-medium mb-1">Adimplentes</p>
                <p className="text-3xl font-bold">16</p>
              </div>
              <CheckCircle className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-green-100 mt-3">88.9% conformidade</p>
          </div>
          <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-red-100 text-sm font-medium mb-1">Inadimplências</p>
                <p className="text-3xl font-bold">2</p>
              </div>
              <AlertIcon className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-red-100 mt-3">Ações registradas</p>
          </div>
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-purple-100 text-sm font-medium mb-1">Multas Registradas</p>
                <p className="text-2xl font-bold">R$ 45k</p>
              </div>
              <DollarSign className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-purple-100 mt-3">Total acumulado</p>
          </div>
        </div>

        {/* Acompanhamento de Prazos e Entregas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Rastreamento de Entregas e Prazos</h3>
            <div className="space-y-3">
              {[
                { contrato: 'CT-2024-001', prazo: '15/01/2025', diasRestantes: 49, execucao: 62, status: 'No Prazo' },
                { contrato: 'CT-2024-002', prazo: '31/12/2024', diasRestantes: 34, execucao: 78, status: 'No Prazo' },
                { contrato: 'CT-2023-045', prazo: '30/06/2025', diasRestantes: 215, execucao: 45, status: 'No Prazo' },
                { contrato: 'CT-2024-003', prazo: '10/11/2024', diasRestantes: -17, execucao: 92, status: 'Atraso' },
              ].map((item, idx) => (
                <div key={idx} className="border border-slate-200 rounded-lg p-4 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-slate-800">{item.contrato}</p>
                      <p className="text-xs text-slate-600 mt-1">Prazo: {item.prazo}</p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold ${item.status === 'No Prazo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="w-full bg-slate-300 rounded-full h-2 overflow-hidden mb-2">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: `${item.execucao}%` }}></div>
                  </div>
                  <p className="text-xs text-slate-600">{item.execucao}% executado • {item.diasRestantes > 0 ? `${item.diasRestantes}d restantes` : `${Math.abs(item.diasRestantes)}d atrasado`}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Gerenciamento de Aditivos</h3>
            <div className="space-y-3">
              {[
                { contrato: 'CT-2024-001', tipo: 'Extensão de Prazo', modificacao: '+60 dias', status: 'Aprovado', data: '20/11/2024' },
                { contrato: 'CT-2023-045', tipo: 'Aumento de Valor', modificacao: '+R$ 125k', status: 'Aprovado', data: '18/11/2024' },
                { contrato: 'CT-2024-002', tipo: 'Alteração de Escopo', modificacao: 'Revisado', status: 'Pendente', data: '05/11/2024' },
              ].map((aditivo, idx) => (
                <div key={idx} className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex justify-between items-center">
                  <div className="flex-1">
                    <p className="font-medium text-slate-800 text-sm">{aditivo.contrato} - {aditivo.tipo}</p>
                    <p className="text-xs text-slate-600 mt-0.5">{aditivo.modificacao}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold ${aditivo.status === 'Aprovado' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {aditivo.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Emissão de Orçamentos e Eventos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Emissão de Orçamentos (Empenhos)</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {[
                { numero: 'EMP-2024-001', contrato: 'CT-2024-001', valor: 45000, data: '20/11/2024', status: 'Liberado' },
                { numero: 'EMP-2024-002', contrato: 'CT-2024-002', valor: 28500, data: '19/11/2024', status: 'Liberado' },
                { numero: 'EMP-2024-003', contrato: 'CT-2023-045', valor: 125000, data: '18/11/2024', status: 'Processando' },
              ].map((emp, idx) => (
                <div key={idx} className="p-2 border border-slate-200 rounded-lg text-sm flex justify-between items-center">
                  <div>
                    <p className="font-medium text-slate-800">{emp.numero}</p>
                    <p className="text-xs text-slate-600">{emp.contrato}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-800">R$ {(emp.valor/1000).toFixed(1)}k</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${emp.status === 'Liberado' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                      {emp.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Eventos e Inspeções</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {[
                { evento: 'Inspeção Técnica', contrato: 'CT-2024-001', data: '20/11/2024', resultado: 'Conforme' },
                { evento: 'Fiscalização Financeira', contrato: 'CT-2024-002', data: '19/11/2024', resultado: 'Conforme' },
                { evento: 'Auditoria Contábil', contrato: 'CT-2023-045', data: '15/11/2024', resultado: 'Não-Conforme' },
              ].map((evento, idx) => (
                <div key={idx} className="p-2 border border-slate-200 rounded-lg text-sm">
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-slate-800">{evento.evento}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${evento.resultado === 'Conforme' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {evento.resultado}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{evento.contrato} • {evento.data}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Checklist de Encerramento */}
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg border border-indigo-200 p-6">
          <h3 className="font-semibold text-slate-800 mb-4">Checklist de Encerramento (Closeout)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { item: 'Todas as Entregas Realizadas', status: 'OK' },
              { item: 'Documentação Completa', status: 'OK' },
              { item: 'Pagamentos Finalizados', status: 'OK' },
              { item: 'Prestação de Contas Aprovada', status: 'OK' },
              { item: 'Auditoria Final Realizada', status: 'Pendente' },
              { item: 'Termo de Encerramento Assinado', status: 'Pendente' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 border border-indigo-200 rounded-lg bg-white hover:bg-indigo-50/50 transition-colors">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${item.status === 'OK' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                  <span className={`text-xs font-bold ${item.status === 'OK' ? 'text-green-700' : 'text-yellow-700'}`}>
                    {item.status === 'OK' ? '✓' : '○'}
                  </span>
                </div>
                <p className="text-sm text-slate-800">{item.item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

    // MÓDULO 8: Inteligência e Auditoria (Transversal)
    const FiscalizacaoContent = () => (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-red-100 text-sm font-medium mb-1">Riscos Detectados</p>
                <p className="text-3xl font-bold">8</p>
              </div>
              <AlertIcon className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-red-100 mt-3">Alto risco</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-yellow-100 text-sm font-medium mb-1">Atenção</p>
                <p className="text-3xl font-bold">12</p>
              </div>
              <AlertIcon className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-yellow-100 mt-3">Médio risco</p>
          </div>
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-green-100 text-sm font-medium mb-1">Conformes</p>
                <p className="text-3xl font-bold">28</p>
              </div>
              <CheckCircle className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-green-100 mt-3">Baixo risco</p>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-100 text-sm font-medium mb-1">Taxa Conformidade</p>
                <p className="text-3xl font-bold">77.8%</p>
              </div>
              <BarChart3 className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-blue-100 mt-3">Meta: 85%</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Análise de Padrões Suspeitos</h3>
            <div className="space-y-3">
              {[
                { contrato: 'CT-2024-001', padrão: 'Variação atípica de preços', confiança: 92, status: 'Investigado' },
                { contrato: 'CT-2024-002', padrão: 'Fornecedor vinculado', confiança: 87, status: 'Análise' },
                { contrato: 'CT-2023-045', padrão: 'Documentos duplicados', confiança: 78, status: 'Identificado' },
              ].map((item, idx) => (
                <div key={idx} className="p-3 border border-slate-200 rounded-lg hover:bg-red-50 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-medium text-slate-800 text-sm">{item.padrão}</p>
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${item.confiança > 90 ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {item.confiança}%
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{item.contrato} • {item.status}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Audit Preventiva (IA)</h3>
            <div className="space-y-3">
              {[
                { area: 'Conformidade Fiscal', score: 89 },
                { area: 'Conformidade Trabalhista', score: 92 },
                { area: 'Conformidade Ambiental', score: 76 },
                { area: 'Conformidade Contratual', score: 85 },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-medium text-slate-800">{item.area}</p>
                    <p className="text-sm font-bold text-slate-800">{item.score}%</p>
                  </div>
                  <div className="w-full bg-slate-300 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-full" style={{ width: `${item.score}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg border border-red-200 p-6">
          <h3 className="font-semibold text-slate-800 mb-4">Alertas de Risco (Heat Map)</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {[
              { contrato: 'CT-2024-001', risco: 'Crítico' },
              { contrato: 'CT-2024-002', risco: 'Alto' },
              { contrato: 'CT-2023-045', risco: 'Médio' },
              { contrato: 'CT-2024-003', risco: 'Baixo' },
              { contrato: 'CT-2024-004', risco: 'Baixo' },
            ].map((item, idx) => (
              <div key={idx} className={`p-3 rounded-lg text-center font-medium text-sm ${
                item.risco === 'Crítico' ? 'bg-red-200 text-red-800' :
                item.risco === 'Alto' ? 'bg-orange-200 text-orange-800' :
                item.risco === 'Médio' ? 'bg-yellow-200 text-yellow-800' :
                'bg-green-200 text-green-800'
              }`}>
                <p className="font-bold text-xs mb-1">{item.contrato}</p>
                {item.risco}
              </div>
            ))}
          </div>
        </div>
      </div>
    );

    // MÓDULO 9: Integrações Externas
    const ComunicacaoContent = () => (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-cyan-600 to-cyan-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-cyan-100 text-sm font-medium mb-1">APIs Conectadas</p>
                <p className="text-3xl font-bold">7</p>
              </div>
              <Zap className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-cyan-100 mt-3">Ativas e operacionais</p>
          </div>
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-green-100 text-sm font-medium mb-1">Consultas Hoje</p>
                <p className="text-3xl font-bold">342</p>
              </div>
              <CheckCircle className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-green-100 mt-3">Sucesso</p>
          </div>
          <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-red-100 text-sm font-medium mb-1">Erros</p>
                <p className="text-3xl font-bold">2</p>
              </div>
              <AlertIcon className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-red-100 mt-3">Timeout CNEP</p>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-100 text-sm font-medium mb-1">Taxa Disponibilidade</p>
                <p className="text-3xl font-bold">99.4%</p>
              </div>
              <BarChart3 className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-blue-100 mt-3">Este mês</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Integrações Governamentais</h3>
            <div className="space-y-3">
              {[
                { api: 'SICAF - Cadastro de Fornecedores', status: 'Online', tempo: '2.1s', consultas: '89 hoje' },
                { api: 'CEIS - Empresas Inidôneas', status: 'Online', tempo: '1.8s', consultas: '92 hoje' },
                { api: 'CNEP - Empresas Punidas', status: 'Warning', tempo: '4.5s', consultas: '45 hoje' },
                { api: 'TCU - Tribunal de Contas', status: 'Online', tempo: '2.3s', consultas: '67 hoje' },
              ].map((item, idx) => (
                <div key={idx} className="p-3 border border-slate-200 rounded-lg flex justify-between items-center hover:bg-cyan-50">
                  <div className="flex-1">
                    <p className="font-medium text-slate-800 text-sm">{item.api}</p>
                    <p className="text-xs text-slate-600 mt-0.5">Tempo resposta: {item.tempo}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${item.status === 'Online' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {item.status}
                    </span>
                    <p className="text-xs text-slate-600 mt-1">{item.consultas}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Integrações Financeiras</h3>
            <div className="space-y-3">
              {[
                { api: 'PNCP - Portal Nacional', status: 'Online', sincronizacao: '3 min atrás' },
                { api: 'Receita Federal', status: 'Online', sincronizacao: '15 min atrás' },
                { api: 'FGTS - Consultas', status: 'Online', sincronizacao: '24 min atrás' },
                { api: 'INSS - Contribuições', status: 'Online', sincronizacao: '1 hora atrás' },
              ].map((item, idx) => (
                <div key={idx} className="p-3 border border-slate-200 rounded-lg flex justify-between items-center hover:bg-cyan-50">
                  <div className="flex-1">
                    <p className="font-medium text-slate-800 text-sm">{item.api}</p>
                    <p className="text-xs text-slate-600 mt-0.5">Última sinc: {item.sincronizacao}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full font-semibold bg-green-100 text-green-700">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg border border-cyan-200 p-6">
          <h3 className="font-semibold text-slate-800 mb-4">Log de Sincronizações (últimas 24h)</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {[
              { timestamp: '27/11 23:45', api: 'SICAF', resultado: 'Sucesso', registros: '1.234' },
              { timestamp: '27/11 23:30', api: 'CEIS', resultado: 'Sucesso', registros: '856' },
              { timestamp: '27/11 23:15', api: 'CNEP', resultado: 'Erro', registros: '0' },
              { timestamp: '27/11 23:00', api: 'PNCP', resultado: 'Sucesso', registros: '432' },
            ].map((log, idx) => (
              <div key={idx} className="p-2 border border-slate-200 rounded-lg text-xs flex justify-between">
                <div>
                  <p className="font-medium text-slate-800">{log.api}</p>
                  <p className="text-slate-600">{log.timestamp}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-0.5 rounded-full font-semibold ${log.resultado === 'Sucesso' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {log.resultado}
                  </span>
                  <p className="text-slate-600 mt-1">{log.registros} registros</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

    // MÓDULO 10: Segurança e Infraestrutura
    const IndicadoresContent = () => (
      <div className="space-y-6">
        {/* Security KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-green-100 text-sm font-medium mb-1">Uptime</p>
                <p className="text-3xl font-bold">99.98%</p>
              </div>
              <CheckCircle className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-green-100 mt-3">Alta disponibilidade</p>
          </div>
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-purple-100 text-sm font-medium mb-1">Logs Auditados</p>
                <p className="text-3xl font-bold">847.2K</p>
              </div>
              <FileText className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-purple-100 mt-3">Este mês</p>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-100 text-sm font-medium mb-1">MFA Ativo</p>
                <p className="text-3xl font-bold">98%</p>
              </div>
              <Lock className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-blue-100 mt-3">Usuários protegidos</p>
          </div>
          <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-red-100 text-sm font-medium mb-1">Vulnerabilidades</p>
                <p className="text-3xl font-bold">0</p>
              </div>
              <Shield className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-red-100 mt-3">Críticas bloqueadas</p>
          </div>
        </div>

        {/* Encryption & Security Protocols */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Criptografia e Protocolos</h3>
            <div className="space-y-3">
              {[
                { item: 'Criptografia de Dados em Repouso', protocolo: 'AES-256', status: 'Ativo' },
                { item: 'Criptografia em Trânsito', protocolo: 'TLS 1.3', status: 'Ativo' },
                { item: 'Autenticação Multifator (MFA)', protocolo: 'TOTP + SMS', status: 'Ativo' },
                { item: 'Conformidade LGPD', protocolo: 'Lei 13.709', status: 'Completo' },
              ].map((item, idx) => (
                <div key={idx} className="p-3 border border-slate-200 rounded-lg hover:bg-green-50 transition-colors flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-slate-800 text-sm">{item.item}</p>
                    <p className="text-xs text-slate-600 mt-1">{item.protocolo}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full font-semibold bg-green-100 text-green-700">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Infraestrutura (Kubernetes + Docker)</h3>
            <div className="space-y-3">
              {[
                { componente: 'API Gateway', status: 'Online', pods: '6/6', cpu: '32%' },
                { componente: 'Database Cluster', status: 'Online', pods: '3/3', cpu: '45%' },
                { componente: 'Cache Layer (Redis)', status: 'Online', pods: '2/2', cpu: '18%' },
                { componente: 'Message Queue', status: 'Online', pods: '4/4', cpu: '28%' },
              ].map((item, idx) => (
                <div key={idx} className="p-3 border border-slate-200 rounded-lg hover:bg-blue-50 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-medium text-slate-800 text-sm">{item.componente}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-semibold">
                      {item.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-600 mt-2">
                    <p>Pods: {item.pods}</p>
                    <p>CPU: {item.cpu}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Access Control & Audit Logs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Controle de Acesso Granular (RBAC)</h3>
            <div className="space-y-2">
              {[
                { role: 'Administrador', users: '3', permissions: '∞', status: 'Ativo' },
                { role: 'Gestor de Contratos', users: '12', permissions: '28', status: 'Ativo' },
                { role: 'Auditor', users: '7', permissions: '15', status: 'Ativo' },
                { role: 'Consultor (Leitura)', users: '24', permissions: '8', status: 'Ativo' },
              ].map((item, idx) => (
                <div key={idx} className="p-2 border border-slate-200 rounded-lg text-sm flex justify-between">
                  <div>
                    <p className="font-medium text-slate-800">{item.role}</p>
                    <p className="text-xs text-slate-600">{item.users} usuários</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-700">{item.permissions} permissões</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Atividades Suspeitas (Últimas 24h)</h3>
            <div className="space-y-2">
              {[
                { usuario: 'user_admin_01', acao: 'Tentativa login falha (3x)', tempo: '2h atrás', alerta: 'Bloqueado' },
                { usuario: 'auditor_02', acao: 'Acesso fora do horário', tempo: '14h atrás', alerta: 'Monitorado' },
                { usuario: 'gestor_45', acao: 'Exportação de dados (5GB)', tempo: '1d atrás', alerta: 'Normal' },
              ].map((item, idx) => (
                <div key={idx} className="p-2 border border-slate-200 rounded-lg text-xs">
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-slate-800">{item.usuario}</p>
                    <span className={`px-2 py-0.5 rounded-full font-semibold ${
                      item.alerta === 'Bloqueado' ? 'bg-red-100 text-red-700' :
                      item.alerta === 'Monitorado' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {item.alerta}
                    </span>
                  </div>
                  <p className="text-slate-600 mt-1">{item.acao}</p>
                  <p className="text-slate-500 mt-0.5">{item.tempo}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Compliance & SLA */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-200 p-6">
          <h3 className="font-semibold text-slate-800 mb-4">Conformidade Regulatória & SLA</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { compliance: 'Conformidade Legal', status: '✓ Conforme' },
              { compliance: 'LGPD (Lei 13.709)', status: '✓ Conforme' },
              { compliance: 'ISO 27001', status: '✓ Certificado' },
              { compliance: 'SLA 99.9%', status: '✓ Cumprido' },
            ].map((item, idx) => (
              <div key={idx} className="p-3 border border-purple-200 rounded-lg bg-white hover:shadow-md transition-shadow">
                <p className="font-medium text-slate-800 text-sm">{item.compliance}</p>
                <p className="text-xs text-green-700 font-semibold mt-2">{item.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );


    const moduleContent: any = {
      central: { title: 'Módulo 1 - ETP: Planejamento e Publicação', icon: Target, content: <ContratosTable /> },
      cadastro: { title: 'Módulo 3 - Negociação e Aceitabilidade', icon: FileCheck, content: <CadastroForm /> },
      planejamento: { title: 'Módulo 4 - Habilitação e Julgamento', icon: CheckCircle, content: <PlanejamentoContent /> },
      execucao: { title: 'Módulo 5 - Recursos e Contrarrazões', icon: TrendingUp, content: <ExecucaoContent /> },
      financeiro: { title: 'Módulo 6 - Adjudicação e Formalização', icon: FileSignature, content: <FinanceiroContent /> },
      aditivos: { title: 'Módulo 7 - Gestão Contratual', icon: Briefcase, content: <AditivosContent /> },
      fiscalizacao: { title: 'Módulo 8 - Inteligência e Auditoria', icon: Shield, content: <FiscalizacaoContent /> },
      comunicacao: { title: 'Módulo 9 - Integrações Externas', icon: Zap, content: <ComunicacaoContent /> },
      indicadores: { title: 'Módulo 10 - Segurança e Infraestrutura', icon: Lock, content: <IndicadoresContent /> }
    };

    // PÁGINA: Trocar Senha
    if (currentPage === 'changePassword') {
      return <ChangePasswordPage onBack={() => setCurrentPage('dashboard')} />;
    }

    const currentModule = moduleContent[currentPage] || { title: 'Módulo', icon: Server, content: null };
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
                <p className="text-blue-100 text-xs font-medium">Automação de Licitações</p>
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
                {/* PARTE 1 */}
                <div>
                  <div className="px-3 text-xs font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    Planejamento
                  </div>
                  <div className="space-y-2">
                    {modulosParte1.map((service, index) => (
                      <button
                        key={service.id}
                        onClick={() => { setCurrentPage(pageMap[index]); setIsSidebarOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
                          currentPage === pageMap[index]
                            ? 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-white border border-blue-400/30 shadow-lg shadow-blue-500/10'
                            : 'text-slate-300 hover:bg-slate-700/40 hover:text-white'
                        }`}
                      >
                        <div className={`p-2 rounded-lg transition-all ${
                          currentPage === pageMap[index]
                            ? 'bg-blue-500/30'
                            : 'bg-slate-700/50 group-hover:bg-blue-500/20'
                        }`}>
                          <service.icon className={`w-4 h-4 ${
                            currentPage === pageMap[index] ? 'text-blue-300' : 'text-slate-400 group-hover:text-blue-400'
                          }`} />
                        </div>
                        <span className="flex-1 text-left text-xs font-semibold">{service.title}</span>
                        {currentPage === pageMap[index] && <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* PARTE 2 */}
                <div>
                  <div className="px-3 text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                    Análise Pós-Licitação
                  </div>
                  <div className="space-y-2">
                    {modulosParte2.map((service, index) => (
                      <button
                        key={service.id}
                        onClick={() => { setCurrentPage(pageMap[index + 1]); setIsSidebarOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
                          currentPage === pageMap[index + 1]
                            ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-white border border-emerald-400/30 shadow-lg shadow-emerald-500/10'
                            : 'text-slate-300 hover:bg-slate-700/40 hover:text-white'
                        }`}
                      >
                        <div className={`p-2 rounded-lg transition-all ${
                          currentPage === pageMap[index + 1]
                            ? 'bg-emerald-500/30'
                            : 'bg-slate-700/50 group-hover:bg-emerald-500/20'
                        }`}>
                          <service.icon className={`w-4 h-4 ${
                            currentPage === pageMap[index + 1] ? 'text-emerald-300' : 'text-slate-400 group-hover:text-emerald-400'
                          }`} />
                        </div>
                        <span className="flex-1 text-left text-xs font-semibold">{service.title}</span>
                        {currentPage === pageMap[index + 1] && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>}
                      </button>
                    ))}
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
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Automação de Licitações</p>
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