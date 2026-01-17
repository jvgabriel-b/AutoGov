import { useState } from 'react';
import {
  Brain, TrendingUp, AlertTriangle, Shield, Search, Filter,
  BarChart3, PieChart, Activity, Zap, Target, Eye, RefreshCw,
  Download, Calendar, MapPin, Building2, DollarSign, Users,
  AlertOctagon, CheckCircle2, XCircle, Clock, FileText,
  ChevronRight, ArrowUpRight, ArrowDownRight, Percent, Scale,
  Database, Globe, Cpu, LineChart, Layers
} from 'lucide-react';

interface ModuloInteligenciaProps {
  userName: string;
}

// Tipos
interface RiscoIdentificado {
  id: string;
  tipo: 'sobrepreco' | 'conluio' | 'direcionamento' | 'fracionamento' | 'irregularidade_documental';
  severidade: 'baixo' | 'medio' | 'alto' | 'critico';
  processo: string;
  descricao: string;
  indicadores: string[];
  probabilidade: number;
  dataIdentificacao: string;
  status: 'novo' | 'em_analise' | 'confirmado' | 'descartado';
}

interface AnalisePreco {
  id: string;
  objeto: string;
  precoReferencia: number;
  precoMercado: number;
  variacao: number;
  fontes: string[];
  dataAnalise: string;
  status: 'normal' | 'atencao' | 'alerta';
}

interface IntegracaoExterna {
  id: string;
  sistema: string;
  sigla: string;
  status: 'conectado' | 'desconectado' | 'erro';
  ultimaConsulta: string;
  consultasHoje: number;
}

interface MetricaDashboard {
  titulo: string;
  valor: string | number;
  variacao?: number;
  icone: any;
  cor: string;
}

// Dados de exemplo
const riscosExemplo: RiscoIdentificado[] = [
  {
    id: 'risco-001',
    tipo: 'sobrepreco',
    severidade: 'alto',
    processo: 'PE-2024-078',
    descricao: 'Preço 45% acima da média de mercado para equipamentos de informática',
    indicadores: ['Preço histórico', 'Painel de Preços', 'Cotações recentes'],
    probabilidade: 78,
    dataIdentificacao: '2025-01-10',
    status: 'em_analise'
  },
  {
    id: 'risco-002',
    tipo: 'conluio',
    severidade: 'critico',
    processo: 'PE-2024-065',
    descricao: 'Padrão suspeito identificado: 3 empresas com mesmo endereço fiscal participando da mesma licitação',
    indicadores: ['Endereço comum', 'Sócios em comum', 'Padrão de lances similar'],
    probabilidade: 92,
    dataIdentificacao: '2025-01-08',
    status: 'confirmado'
  },
  {
    id: 'risco-003',
    tipo: 'fracionamento',
    severidade: 'medio',
    processo: 'DL-2024-089',
    descricao: 'Possível fracionamento de despesa: 4 dispensas para mesmo objeto em 60 dias',
    indicadores: ['Mesmo objeto', 'Período curto', 'Soma ultrapassa limite'],
    probabilidade: 65,
    dataIdentificacao: '2025-01-12',
    status: 'novo'
  },
  {
    id: 'risco-004',
    tipo: 'direcionamento',
    severidade: 'medio',
    processo: 'PE-2024-090',
    descricao: 'Especificação técnica restritiva: apenas 2 fabricantes atendem aos requisitos',
    indicadores: ['Especificação de marca', 'Baixa competitividade', 'Único fornecedor'],
    probabilidade: 55,
    dataIdentificacao: '2025-01-14',
    status: 'em_analise'
  }
];

const analisesPrecoExemplo: AnalisePreco[] = [
  {
    id: 'preco-001',
    objeto: 'Notebook i7 16GB RAM 512GB SSD',
    precoReferencia: 5500,
    precoMercado: 4200,
    variacao: 30.95,
    fontes: ['Painel de Preços', 'ComprasNet', 'Banco de Preços'],
    dataAnalise: '2025-01-15',
    status: 'alerta'
  },
  {
    id: 'preco-002',
    objeto: 'Serviço de Limpeza (m²/mês)',
    precoReferencia: 45,
    precoMercado: 42,
    variacao: 7.14,
    fontes: ['Contratos anteriores', 'SICAF', 'Pregões similares'],
    dataAnalise: '2025-01-15',
    status: 'normal'
  },
  {
    id: 'preco-003',
    objeto: 'Papel A4 (resma 500fls)',
    precoReferencia: 32,
    precoMercado: 28,
    variacao: 14.28,
    fontes: ['Painel de Preços', 'Atas vigentes'],
    dataAnalise: '2025-01-14',
    status: 'atencao'
  }
];

const integracoesExemplo: IntegracaoExterna[] = [
  { id: 'int-001', sistema: 'Sistema Integrado de Administração Financeira', sigla: 'SICAF', status: 'conectado', ultimaConsulta: '2025-01-15T10:30:00', consultasHoje: 45 },
  { id: 'int-002', sistema: 'Cadastro de Empresas Inidôneas e Suspensas', sigla: 'CEIS', status: 'conectado', ultimaConsulta: '2025-01-15T10:25:00', consultasHoje: 32 },
  { id: 'int-003', sistema: 'Cadastro Nacional de Empresas Punidas', sigla: 'CNEP', status: 'conectado', ultimaConsulta: '2025-01-15T10:20:00', consultasHoje: 28 },
  { id: 'int-004', sistema: 'Receita Federal do Brasil', sigla: 'RFB', status: 'conectado', ultimaConsulta: '2025-01-15T09:45:00', consultasHoje: 67 },
  { id: 'int-005', sistema: 'Portal Nacional de Contratações Públicas', sigla: 'PNCP', status: 'conectado', ultimaConsulta: '2025-01-15T10:35:00', consultasHoje: 23 },
  { id: 'int-006', sistema: 'Tribunal Superior do Trabalho', sigla: 'TST', status: 'erro', ultimaConsulta: '2025-01-15T08:00:00', consultasHoje: 5 },
  { id: 'int-007', sistema: 'Fundo de Garantia do Tempo de Serviço', sigla: 'FGTS', status: 'conectado', ultimaConsulta: '2025-01-15T10:15:00', consultasHoje: 41 },
  { id: 'int-008', sistema: 'Instituto Nacional do Seguro Social', sigla: 'INSS', status: 'conectado', ultimaConsulta: '2025-01-15T10:10:00', consultasHoje: 38 }
];

// Utilitários
const formatarMoeda = (valor: number): string => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
};

const formatarData = (data: string): string => {
  return new Date(data).toLocaleDateString('pt-BR');
};

const formatarDataHora = (data: string): string => {
  return new Date(data).toLocaleString('pt-BR');
};

const severidadeColors: Record<RiscoIdentificado['severidade'], { bg: string; text: string; border: string; label: string }> = {
  baixo: { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200', label: 'Baixo' },
  medio: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200', label: 'Médio' },
  alto: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200', label: 'Alto' },
  critico: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200', label: 'Crítico' }
};

const tipoRiscoLabels: Record<RiscoIdentificado['tipo'], string> = {
  sobrepreco: 'Sobrepreço',
  conluio: 'Conluio',
  direcionamento: 'Direcionamento',
  fracionamento: 'Fracionamento',
  irregularidade_documental: 'Irregularidade Documental'
};

// Tabs
type TabType = 'dashboard' | 'riscos' | 'precos' | 'auditoria' | 'integracoes' | 'relatorios';

export function ModuloInteligencia({ userName }: ModuloInteligenciaProps) {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [selectedRisco, setSelectedRisco] = useState<RiscoIdentificado | null>(null);
  const [filtroSeveridade, setFiltroSeveridade] = useState<string>('todos');

  const tabs: { id: TabType; label: string; icon: any }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'riscos', label: 'Análise de Riscos', icon: AlertTriangle },
    { id: 'precos', label: 'Pesquisa de Preços', icon: DollarSign },
    { id: 'auditoria', label: 'Auditoria Preventiva', icon: Shield },
    { id: 'integracoes', label: 'Integrações', icon: Database },
    { id: 'relatorios', label: 'Relatórios', icon: FileText }
  ];

  // Estatísticas para o dashboard
  const riscosAtivos = riscosExemplo.filter(r => r.status !== 'descartado').length;
  const riscosCriticos = riscosExemplo.filter(r => r.severidade === 'critico').length;
  const integracoesAtivas = integracoesExemplo.filter(i => i.status === 'conectado').length;
  const totalConsultas = integracoesExemplo.reduce((acc, i) => acc + i.consultasHoje, 0);

  const metricas: MetricaDashboard[] = [
    { titulo: 'Riscos Identificados', valor: riscosAtivos, icone: AlertTriangle, cor: 'amber' },
    { titulo: 'Alertas Críticos', valor: riscosCriticos, icone: AlertOctagon, cor: 'red' },
    { titulo: 'Integrações Ativas', valor: `${integracoesAtivas}/${integracoesExemplo.length}`, icone: Database, cor: 'emerald' },
    { titulo: 'Consultas Hoje', valor: totalConsultas, icone: Activity, cor: 'blue' }
  ];

  const filteredRiscos = riscosExemplo.filter(r =>
    filtroSeveridade === 'todos' || r.severidade === filtroSeveridade
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Cards de Métricas */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {metricas.map((metrica, index) => (
                <div key={index} className={`bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg transition-all`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-xl bg-${metrica.cor}-100`}>
                      <metrica.icone className={`w-5 h-5 text-${metrica.cor}-700`} />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-slate-900">{metrica.valor}</p>
                  <p className="text-sm text-slate-500 mt-1">{metrica.titulo}</p>
                </div>
              ))}
            </div>

            {/* Gráficos e Análises */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Mapa de Calor de Riscos */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-violet-600" />
                  Mapa de Calor - Riscos por Categoria
                </h4>
                <div className="space-y-3">
                  {Object.entries(tipoRiscoLabels).map(([tipo, label]) => {
                    const count = riscosExemplo.filter(r => r.tipo === tipo).length;
                    const maxCount = 5;
                    const percentage = (count / maxCount) * 100;
                    const intensity = count === 0 ? 'bg-slate-100' :
                                     count === 1 ? 'bg-amber-200' :
                                     count === 2 ? 'bg-orange-300' : 'bg-red-400';

                    return (
                      <div key={tipo} className="flex items-center gap-3">
                        <div className="w-32 text-sm text-slate-600 truncate">{label}</div>
                        <div className="flex-1 h-8 bg-slate-100 rounded-lg overflow-hidden">
                          <div
                            className={`h-full ${intensity} transition-all duration-500 flex items-center justify-end pr-3`}
                            style={{ width: `${Math.max(percentage, 10)}%` }}
                          >
                            <span className="text-xs font-bold text-white drop-shadow">{count}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status das Integrações */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Database className="w-5 h-5 text-blue-600" />
                  Status das Integrações
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {integracoesExemplo.slice(0, 6).map((integracao) => (
                    <div key={integracao.id} className={`p-3 rounded-xl border ${
                      integracao.status === 'conectado' ? 'border-emerald-200 bg-emerald-50' :
                      integracao.status === 'erro' ? 'border-red-200 bg-red-50' : 'border-slate-200 bg-slate-50'
                    }`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-900">{integracao.sigla}</span>
                        <div className={`w-2 h-2 rounded-full ${
                          integracao.status === 'conectado' ? 'bg-emerald-500' :
                          integracao.status === 'erro' ? 'bg-red-500 animate-pulse' : 'bg-slate-400'
                        }`} />
                      </div>
                      <p className="text-xs text-slate-500">{integracao.consultasHoje} consultas</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Alertas Recentes */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-600" />
                Alertas Recentes da IA
              </h4>
              <div className="space-y-3">
                {riscosExemplo.slice(0, 3).map((risco) => {
                  const colors = severidadeColors[risco.severidade];
                  return (
                    <div key={risco.id} className={`p-4 rounded-xl border ${colors.border} ${colors.bg}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${colors.bg} ${colors.text}`}>
                              {colors.label}
                            </span>
                            <span className="text-xs text-slate-500">{risco.processo}</span>
                          </div>
                          <p className="text-sm font-medium text-slate-900">{risco.descricao}</p>
                          <p className="text-xs text-slate-500 mt-1">{formatarData(risco.dataIdentificacao)}</p>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${colors.text}`}>{risco.probabilidade}%</div>
                          <p className="text-xs text-slate-500">confiança</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 'riscos':
        return (
          <div className="space-y-6">
            {/* Filtros */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFiltroSeveridade('todos')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    filtroSeveridade === 'todos' ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Todos
                </button>
                {Object.entries(severidadeColors).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => setFiltroSeveridade(key)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      filtroSeveridade === key ? `${value.bg} ${value.text} ring-2 ring-offset-2` : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {value.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Lista de Riscos */}
            <div className="space-y-4">
              {filteredRiscos.map((risco) => {
                const colors = severidadeColors[risco.severidade];
                return (
                  <div key={risco.id} className={`bg-white rounded-2xl border-2 ${colors.border} p-6 hover:shadow-xl transition-all`}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${colors.bg} ${colors.text}`}>
                            {colors.label.toUpperCase()}
                          </span>
                          <span className="text-sm font-semibold text-violet-700 bg-violet-50 px-3 py-1 rounded-full">
                            {tipoRiscoLabels[risco.tipo]}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            risco.status === 'confirmado' ? 'bg-red-100 text-red-700' :
                            risco.status === 'em_analise' ? 'bg-amber-100 text-amber-700' :
                            risco.status === 'novo' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {risco.status === 'confirmado' ? 'Confirmado' :
                             risco.status === 'em_analise' ? 'Em Análise' :
                             risco.status === 'novo' ? 'Novo' : 'Descartado'}
                          </span>
                        </div>
                        <p className="text-sm text-slate-500">Processo: <span className="font-semibold text-slate-700">{risco.processo}</span></p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <Brain className={`w-5 h-5 ${colors.text}`} />
                          <span className={`text-2xl font-bold ${colors.text}`}>{risco.probabilidade}%</span>
                        </div>
                        <p className="text-xs text-slate-500">Probabilidade IA</p>
                      </div>
                    </div>

                    <p className="text-slate-900 font-medium mb-4">{risco.descricao}</p>

                    <div className="mb-4">
                      <p className="text-xs text-slate-500 mb-2">Indicadores utilizados:</p>
                      <div className="flex flex-wrap gap-2">
                        {risco.indicadores.map((ind, idx) => (
                          <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-lg">
                            {ind}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <span className="text-xs text-slate-500">
                        Identificado em {formatarData(risco.dataIdentificacao)}
                      </span>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors">
                          Descartar
                        </button>
                        <button className="px-4 py-2 text-sm font-medium text-white bg-violet-600 rounded-xl hover:bg-violet-700 transition-colors">
                          Analisar Detalhes
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'precos':
        return (
          <div className="space-y-6">
            {/* Barra de Pesquisa */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Pesquisar preços de produtos ou serviços..."
                    className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400"
                  />
                </div>
                <button className="px-6 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Pesquisar com IA
                </button>
              </div>
            </div>

            {/* Resultados de Análise */}
            <div className="space-y-4">
              {analisesPrecoExemplo.map((analise) => (
                <div key={analise.id} className={`bg-white rounded-2xl border-2 p-6 ${
                  analise.status === 'alerta' ? 'border-red-200' :
                  analise.status === 'atencao' ? 'border-amber-200' : 'border-emerald-200'
                }`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          analise.status === 'alerta' ? 'bg-red-100 text-red-700' :
                          analise.status === 'atencao' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {analise.status === 'alerta' ? 'ALERTA' : analise.status === 'atencao' ? 'ATENÇÃO' : 'NORMAL'}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900">{analise.objeto}</h4>
                    </div>
                    <div className={`flex items-center gap-1 text-lg font-bold ${
                      analise.variacao > 20 ? 'text-red-600' :
                      analise.variacao > 10 ? 'text-amber-600' : 'text-emerald-600'
                    }`}>
                      {analise.variacao > 0 ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                      {analise.variacao.toFixed(1)}%
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="text-xs text-slate-500 mb-1">Preço de Referência</p>
                      <p className="text-xl font-bold text-slate-900">{formatarMoeda(analise.precoReferencia)}</p>
                    </div>
                    <div className="p-4 bg-emerald-50 rounded-xl">
                      <p className="text-xs text-slate-500 mb-1">Preço de Mercado (IA)</p>
                      <p className="text-xl font-bold text-emerald-700">{formatarMoeda(analise.precoMercado)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Fontes consultadas:</p>
                      <div className="flex gap-2">
                        {analise.fontes.map((fonte, idx) => (
                          <span key={idx} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                            {fonte}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button className="px-4 py-2 text-sm font-medium text-violet-700 bg-violet-50 rounded-xl hover:bg-violet-100 transition-colors">
                      Ver Detalhes
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'auditoria':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Shield className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Auditoria Preventiva com IA</h3>
                  <p className="text-violet-100 text-sm">
                    Sistema de detecção automática de irregularidades e padrões suspeitos
                  </p>
                </div>
              </div>
            </div>

            {/* Indicadores de Auditoria */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-emerald-100 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                  </div>
                  <span className="text-sm font-medium text-slate-600">Processos Conformes</span>
                </div>
                <p className="text-3xl font-bold text-emerald-700">87%</p>
                <div className="mt-3 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '87%' }} />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-amber-100 rounded-xl">
                    <AlertTriangle className="w-5 h-5 text-amber-700" />
                  </div>
                  <span className="text-sm font-medium text-slate-600">Com Ressalvas</span>
                </div>
                <p className="text-3xl font-bold text-amber-700">10%</p>
                <div className="mt-3 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '10%' }} />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-red-100 rounded-xl">
                    <XCircle className="w-5 h-5 text-red-700" />
                  </div>
                  <span className="text-sm font-medium text-slate-600">Irregulares</span>
                </div>
                <p className="text-3xl font-bold text-red-700">3%</p>
                <div className="mt-3 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: '3%' }} />
                </div>
              </div>
            </div>

            {/* Verificações Automáticas */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-violet-600" />
                Verificações Automáticas Realizadas
              </h4>
              <div className="space-y-3">
                {[
                  { check: 'Validação de CNPJs e situação cadastral', total: 156, aprovados: 154, icon: Building2 },
                  { check: 'Consulta a impedimentos (CEIS/CNEP)', total: 156, aprovados: 155, icon: Shield },
                  { check: 'Verificação de vínculos societários', total: 89, aprovados: 86, icon: Users },
                  { check: 'Análise de padrão de preços', total: 45, aprovados: 41, icon: DollarSign },
                  { check: 'Validação de certidões fiscais', total: 312, aprovados: 308, icon: FileText }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-slate-500" />
                      <span className="font-medium text-slate-700">{item.check}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-slate-500">{item.aprovados}/{item.total}</span>
                      <div className={`w-3 h-3 rounded-full ${item.aprovados === item.total ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'integracoes':
        return (
          <div className="space-y-6">
            {/* Status Geral */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-600" />
                  Integrações Externas
                </h4>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                  <RefreshCw className="w-4 h-4" />
                  Sincronizar Todos
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {integracoesExemplo.map((integracao) => (
                  <div key={integracao.id} className={`p-5 rounded-2xl border-2 ${
                    integracao.status === 'conectado' ? 'border-emerald-200 bg-emerald-50/50' :
                    integracao.status === 'erro' ? 'border-red-200 bg-red-50/50' : 'border-slate-200 bg-slate-50/50'
                  }`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h5 className="font-bold text-slate-900">{integracao.sigla}</h5>
                        <p className="text-xs text-slate-500 mt-0.5">{integracao.sistema}</p>
                      </div>
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        integracao.status === 'conectado' ? 'bg-emerald-100 text-emerald-700' :
                        integracao.status === 'erro' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          integracao.status === 'conectado' ? 'bg-emerald-500' :
                          integracao.status === 'erro' ? 'bg-red-500 animate-pulse' : 'bg-slate-500'
                        }`} />
                        {integracao.status === 'conectado' ? 'Conectado' : integracao.status === 'erro' ? 'Erro' : 'Desconectado'}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-slate-500">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{formatarDataHora(integracao.ultimaConsulta)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-600 font-medium">
                        <Activity className="w-3.5 h-3.5" />
                        <span>{integracao.consultasHoje} consultas</span>
                      </div>
                    </div>

                    {integracao.status === 'erro' && (
                      <button className="w-full mt-3 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-xl hover:bg-red-200 transition-colors">
                        Tentar Reconectar
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'relatorios':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-violet-600" />
                Relatórios Disponíveis
              </h4>

              <div className="space-y-3">
                {[
                  { nome: 'Relatório de Conformidade Mensal', tipo: 'PDF', tamanho: '2.4 MB', data: '2025-01-15' },
                  { nome: 'Análise de Riscos - Janeiro/2025', tipo: 'PDF', tamanho: '1.8 MB', data: '2025-01-14' },
                  { nome: 'Mapa de Calor de Irregularidades', tipo: 'PDF', tamanho: '3.1 MB', data: '2025-01-12' },
                  { nome: 'Comparativo de Preços Regional', tipo: 'XLSX', tamanho: '856 KB', data: '2025-01-10' },
                  { nome: 'Auditoria Preventiva - Q4/2024', tipo: 'PDF', tamanho: '4.2 MB', data: '2025-01-05' }
                ].map((relatorio, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-xl ${relatorio.tipo === 'PDF' ? 'bg-red-100' : 'bg-emerald-100'}`}>
                        <FileText className={`w-5 h-5 ${relatorio.tipo === 'PDF' ? 'text-red-700' : 'text-emerald-700'}`} />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{relatorio.nome}</p>
                        <p className="text-xs text-slate-500">{relatorio.tipo} • {relatorio.tamanho} • {formatarData(relatorio.data)}</p>
                      </div>
                    </div>
                    <button className="p-2 text-slate-500 hover:text-violet-600 hover:bg-violet-50 rounded-xl transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Gerar Novo Relatório */}
            <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl border border-violet-200 p-6">
              <h4 className="font-bold text-slate-900 mb-4">Gerar Novo Relatório</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['Conformidade', 'Riscos', 'Preços', 'Auditoria'].map((tipo) => (
                  <button key={tipo} className="p-4 bg-white rounded-xl border border-violet-200 text-center hover:shadow-lg hover:border-violet-400 transition-all">
                    <BarChart3 className="w-6 h-6 text-violet-600 mx-auto mb-2" />
                    <span className="text-sm font-medium text-slate-700">{tipo}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1 flex items-center gap-3">
              <Brain className="w-8 h-8" />
              Inteligência Governamental
            </h2>
            <p className="text-violet-100 text-sm">
              Análise preditiva, detecção de riscos e auditoria automatizada com IA
            </p>
          </div>
          <div className="text-right">
            <p className="text-violet-100 text-xs">Olá, {userName}</p>
            <p className="text-white font-semibold">Módulo 5</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="flex overflow-x-auto border-b border-slate-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${
                activeTab === tab.id
                  ? 'text-violet-700 border-violet-600 bg-violet-50'
                  : 'text-slate-600 border-transparent hover:text-violet-600 hover:bg-slate-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
