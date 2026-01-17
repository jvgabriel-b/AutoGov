import { useState, useEffect } from 'react';
import {
  FileText, CheckCircle, AlertCircle, DollarSign, Plus, Search,
  Save, Send, Download, Edit3, Trash2, Eye, Clock, Users,
  ChevronRight, ChevronDown, X, FileCheck, AlertTriangle,
  Building2, Package, Scale, FileSignature, Shield, RefreshCw,
  Target, TrendingUp, BarChart3, Calendar, ArrowRight, Filter,
  Layers, CheckCircle2, XCircle, Info, Zap, Award, Star
} from 'lucide-react';
import {
  ETP, ETPStatus, criarNovaETP, statusLabels, modalidadeLabels,
  statusColors, ModalidadeLicitacao, Risco, Alternativa
} from '../types/etp';
import { carregarDadosExemplo } from '../data/etpExemplos';

// Utilitários
const formatarMoeda = (valor: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
};

const formatarData = (data: string): string => {
  return new Date(data).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const formatarDataCompleta = (data: string): string => {
  return new Date(data).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const parseMoeda = (valor: string): number => {
  const cleaned = valor.replace(/[^\d,]/g, '').replace(',', '.');
  return parseFloat(cleaned) || 0;
};

// Storage
const STORAGE_KEY = 'autogov_etps';

const loadETPs = (): ETP[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveETPs = (etps: ETP[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(etps));
};

const gerarNumeroETP = (): string => {
  const ano = new Date().getFullYear();
  const etps = loadETPs();
  const etpsDoAno = etps.filter(e => e.numero.includes(ano.toString()));
  const proximoNumero = (etpsDoAno.length + 1).toString().padStart(3, '0');
  return `ETP-${ano}-${proximoNumero}`;
};

// Calcular progresso baseado nos campos preenchidos
const calcularProgresso = (etp: ETP): number => {
  let pontos = 0;
  let total = 10;

  if (etp.setorResponsavel) pontos++;
  if (etp.objeto) pontos++;
  if (etp.descricaoDetalhada) pontos++;
  if (etp.valorEstimado > 0) pontos++;
  if (etp.modalidade) pontos++;
  if (etp.justificativaTecnica) pontos++;
  if (etp.analiseComparativaPrecos) pontos++;
  if (etp.riscos.length > 0) pontos++;
  if (etp.alternativas.length > 0) pontos++;
  if (etp.anuencias.some(a => a.aprovado)) pontos++;

  return Math.round((pontos / total) * 100);
};

// Componente de Card de Estatística Premium
const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = 'blue'
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: any;
  trend?: { value: number; label: string };
  color?: 'blue' | 'green' | 'purple' | 'amber' | 'slate'
}) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 shadow-blue-500/25',
    green: 'from-emerald-500 to-emerald-600 shadow-emerald-500/25',
    purple: 'from-violet-500 to-violet-600 shadow-violet-500/25',
    amber: 'from-amber-500 to-amber-600 shadow-amber-500/25',
    slate: 'from-slate-600 to-slate-700 shadow-slate-500/25'
  };

  return (
    <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-200/60 p-6 hover:shadow-lg transition-all duration-300 group">
      <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8">
        <div className={`w-full h-full rounded-full bg-gradient-to-br ${colorClasses[color]} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
      </div>
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} shadow-lg`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          {trend && (
            <div className={`flex items-center gap-1 text-xs font-medium ${trend.value >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              <TrendingUp className={`w-3 h-3 ${trend.value < 0 ? 'rotate-180' : ''}`} />
              {Math.abs(trend.value)}%
            </div>
          )}
        </div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
        {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
};

// Componente de Badge de Status Premium
const StatusBadge = ({ status }: { status: ETPStatus }) => {
  const config: Record<ETPStatus, { icon: any; gradient: string; text: string }> = {
    rascunho: { icon: Edit3, gradient: 'from-slate-100 to-slate-200 text-slate-700', text: 'Rascunho' },
    elaboracao: { icon: RefreshCw, gradient: 'from-purple-100 to-purple-200 text-purple-700', text: 'Em Elaboração' },
    revisao_tecnica: { icon: Target, gradient: 'from-blue-100 to-blue-200 text-blue-700', text: 'Revisão Técnica' },
    revisao_juridica: { icon: Scale, gradient: 'from-indigo-100 to-indigo-200 text-indigo-700', text: 'Revisão Jurídica' },
    revisao_financeira: { icon: DollarSign, gradient: 'from-cyan-100 to-cyan-200 text-cyan-700', text: 'Revisão Financeira' },
    anuencia: { icon: Users, gradient: 'from-amber-100 to-amber-200 text-amber-700', text: 'Aguardando Anuência' },
    aprovado: { icon: CheckCircle, gradient: 'from-green-100 to-green-200 text-green-700', text: 'Aprovado' },
    publicado: { icon: Award, gradient: 'from-emerald-100 to-emerald-200 text-emerald-700', text: 'Publicado' },
    cancelado: { icon: XCircle, gradient: 'from-red-100 to-red-200 text-red-700', text: 'Cancelado' }
  };

  const { icon: Icon, gradient, text } = config[status];

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r ${gradient}`}>
      <Icon className="w-3.5 h-3.5" />
      {text}
    </span>
  );
};

// Componente de Card de ETP Premium
const ETPCard = ({
  etp,
  onView,
  onEdit,
  onDelete
}: {
  etp: ETP;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  const canEdit = ['rascunho', 'elaboracao'].includes(etp.status);

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/60 p-6 hover:shadow-xl hover:border-blue-200 transition-all duration-300">
      {/* Linha de progresso no topo */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100 rounded-t-2xl overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-500"
          style={{ width: `${etp.progresso}%` }}
        />
      </div>

      <div className="pt-2">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-lg font-bold text-slate-900">{etp.numero}</span>
              <StatusBadge status={etp.status} />
            </div>
            <h3 className="font-semibold text-slate-800 truncate pr-4">
              {etp.objeto || 'Objeto não definido'}
            </h3>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xl font-bold text-slate-900">{etp.progresso}%</p>
            <p className="text-xs text-slate-500">completo</p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Building2 className="w-4 h-4 text-slate-400" />
            <span className="text-slate-600 truncate">{etp.setorResponsavel || 'Não definido'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="w-4 h-4 text-slate-400" />
            <span className="text-slate-600 font-medium">{formatarMoeda(etp.valorEstimado)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="text-slate-500">{formatarData(etp.atualizadoEm)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-slate-400" />
            <span className="text-slate-500">{etp.criadoPor}</span>
          </div>
        </div>

        {/* Anuências */}
        <div className="flex items-center gap-2 mb-4 p-3 bg-slate-50 rounded-xl">
          <span className="text-xs font-medium text-slate-500">Anuências:</span>
          <div className="flex gap-1.5">
            {etp.anuencias.map((a, i) => (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-full ${a.aprovado ? 'bg-emerald-500' : 'bg-slate-300'}`}
                title={`${a.tipo}: ${a.aprovado ? 'Aprovada' : 'Pendente'}`}
              />
            ))}
          </div>
          <span className="text-xs text-slate-400 ml-auto">
            {etp.anuencias.filter(a => a.aprovado).length}/{etp.anuencias.length}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
          <button
            onClick={onView}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            <Eye className="w-4 h-4" />
            Visualizar
          </button>
          {canEdit && (
            <button
              onClick={onEdit}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl transition-all shadow-lg shadow-blue-500/25"
            >
              <Edit3 className="w-4 h-4" />
              Editar
            </button>
          )}
          <button
            onClick={onDelete}
            className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente de Etapa do Formulário
const FormStep = ({
  number,
  title,
  description,
  children,
  isOpen,
  onToggle,
  isComplete,
  isDisabled = false
}: {
  number: number;
  title: string;
  description: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  isComplete: boolean;
  isDisabled?: boolean;
}) => {
  return (
    <div className={`border rounded-2xl overflow-hidden transition-all ${isOpen ? 'border-blue-200 shadow-lg shadow-blue-500/5' : 'border-slate-200'} ${isDisabled ? 'opacity-50' : ''}`}>
      <button
        onClick={onToggle}
        disabled={isDisabled}
        className={`w-full flex items-center gap-4 p-5 text-left transition-colors ${isOpen ? 'bg-gradient-to-r from-blue-50 to-indigo-50' : 'bg-white hover:bg-slate-50'}`}
      >
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-colors ${
          isComplete
            ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white'
            : isOpen
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
              : 'bg-slate-100 text-slate-500'
        }`}>
          {isComplete ? <CheckCircle2 className="w-5 h-5" /> : number}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-slate-900">{title}</h3>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="p-6 bg-white border-t border-slate-100">
          {children}
        </div>
      )}
    </div>
  );
};

interface ModuloETPProps {
  userName: string;
}

export function ModuloETP({ userName }: ModuloETPProps) {
  const [view, setView] = useState<'list' | 'editor'>('list');
  const [etps, setETPs] = useState<ETP[]>([]);
  const [etpAtual, setETPAtual] = useState<ETP | null>(null);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filtroStatus, setFiltroStatus] = useState<ETPStatus | 'todos'>('todos');
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState<string | null>(null);
  const [openStep, setOpenStep] = useState(1);

  // Carregar ETPs
  useEffect(() => {
    carregarDadosExemplo();
    setETPs(loadETPs());
  }, []);

  // Filtrar ETPs
  const etpsFiltradas = etps.filter(etp => {
    const matchSearch = etp.numero.toLowerCase().includes(searchQuery.toLowerCase()) ||
      etp.objeto.toLowerCase().includes(searchQuery.toLowerCase()) ||
      etp.setorResponsavel.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filtroStatus === 'todos' || etp.status === filtroStatus;
    return matchSearch && matchStatus;
  });

  // Estatísticas
  const stats = {
    total: etps.length,
    rascunho: etps.filter(e => e.status === 'rascunho').length,
    elaboracao: etps.filter(e => ['elaboracao', 'revisao_tecnica', 'revisao_juridica', 'revisao_financeira'].includes(e.status)).length,
    aprovados: etps.filter(e => ['aprovado', 'publicado'].includes(e.status)).length,
    valorTotal: etps.reduce((acc, e) => acc + e.valorEstimado, 0)
  };

  // Handlers
  const handleNovaETP = () => {
    const numero = gerarNumeroETP();
    const novaEtp = criarNovaETP(numero, userName);
    setETPAtual(novaEtp);
    setModoEdicao(true);
    setView('editor');
    setOpenStep(1);
  };

  const handleEditarETP = (etp: ETP) => {
    setETPAtual({ ...etp });
    setModoEdicao(true);
    setView('editor');
    setOpenStep(1);
  };

  const handleVisualizarETP = (etp: ETP) => {
    setETPAtual({ ...etp });
    setModoEdicao(false);
    setView('editor');
    setOpenStep(1);
  };

  const handleSalvarETP = (status?: ETPStatus) => {
    if (!etpAtual) return;

    const etpAtualizada: ETP = {
      ...etpAtual,
      status: status || etpAtual.status,
      progresso: calcularProgresso(etpAtual),
      atualizadoEm: new Date().toISOString(),
      historico: [
        ...etpAtual.historico,
        {
          versao: `v${etpAtual.historico.length + 1}.0`,
          autor: userName,
          data: new Date().toISOString(),
          acao: status ? `Status alterado para ${statusLabels[status]}` : 'Rascunho salvo',
          tipo: 'modificacao'
        }
      ]
    };

    const etpsAtualizadas = etps.some(e => e.id === etpAtualizada.id)
      ? etps.map(e => e.id === etpAtualizada.id ? etpAtualizada : e)
      : [...etps, etpAtualizada];

    setETPs(etpsAtualizadas);
    saveETPs(etpsAtualizadas);
    setETPAtual(etpAtualizada);

    setShowSuccessMessage(status ? `ETP ${statusLabels[status].toLowerCase()} com sucesso!` : 'Rascunho salvo!');
    setTimeout(() => setShowSuccessMessage(null), 3000);
  };

  const handleExcluirETP = (id: string) => {
    const etpsAtualizadas = etps.filter(e => e.id !== id);
    setETPs(etpsAtualizadas);
    saveETPs(etpsAtualizadas);
    setShowDeleteModal(null);
    if (etpAtual?.id === id) {
      setETPAtual(null);
      setView('list');
    }
  };

  const handleVoltar = () => {
    setETPAtual(null);
    setModoEdicao(false);
    setView('list');
  };

  const handleExportar = () => {
    if (!etpAtual) return;
    const dados = JSON.stringify(etpAtual, null, 2);
    const blob = new Blob([dados], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${etpAtual.numero}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setShowSuccessMessage('Exportação realizada!');
    setTimeout(() => setShowSuccessMessage(null), 3000);
  };

  // Adicionar/Remover Risco
  const handleAdicionarRisco = () => {
    if (!etpAtual) return;
    setETPAtual({
      ...etpAtual,
      riscos: [...etpAtual.riscos, {
        id: crypto.randomUUID(),
        descricao: '',
        probabilidade: 'media',
        impacto: 'medio',
        mitigacao: ''
      }]
    });
  };

  const handleRemoverRisco = (id: string) => {
    if (!etpAtual) return;
    setETPAtual({
      ...etpAtual,
      riscos: etpAtual.riscos.filter(r => r.id !== id)
    });
  };

  // Adicionar/Remover Alternativa
  const handleAdicionarAlternativa = () => {
    if (!etpAtual) return;
    setETPAtual({
      ...etpAtual,
      alternativas: [...etpAtual.alternativas, {
        id: crypto.randomUUID(),
        descricao: '',
        vantagens: '',
        desvantagens: '',
        motivoDescarte: ''
      }]
    });
  };

  const handleRemoverAlternativa = (id: string) => {
    if (!etpAtual) return;
    setETPAtual({
      ...etpAtual,
      alternativas: etpAtual.alternativas.filter(a => a.id !== id)
    });
  };

  // Verificar completude das etapas
  const getStepComplete = (step: number): boolean => {
    if (!etpAtual) return false;
    switch (step) {
      case 1: return !!(etpAtual.setorResponsavel && etpAtual.objeto);
      case 2: return !!(etpAtual.descricaoDetalhada && etpAtual.justificativaTecnica);
      case 3: return etpAtual.valorEstimado > 0 && !!etpAtual.modalidade;
      case 4: return etpAtual.riscos.length > 0;
      case 5: return etpAtual.alternativas.length > 0;
      default: return false;
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast de Sucesso */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl shadow-xl shadow-emerald-500/25">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-medium">{showSuccessMessage}</span>
          </div>
        </div>
      )}

      {/* Modal de Exclusão */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-red-100 rounded-xl">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Confirmar Exclusão</h3>
                <p className="text-sm text-slate-500">Esta ação não pode ser desfeita</p>
              </div>
            </div>
            <p className="text-slate-600 mb-6">Tem certeza que deseja excluir esta ETP permanentemente?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="flex-1 px-4 py-2.5 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleExcluirETP(showDeleteModal)}
                className="flex-1 px-4 py-2.5 text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl transition-all font-medium shadow-lg shadow-red-500/25"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: Lista de ETPs */}
      {view === 'list' && (
        <>
          {/* Header com gradiente */}
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl p-8 text-white">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold mb-1">Estudos Técnicos Preliminares</h1>
                  <p className="text-blue-200">Gerencie e acompanhe todos os ETPs do órgão</p>
                </div>
                <button
                  onClick={handleNovaETP}
                  className="flex items-center gap-2 px-5 py-3 bg-white text-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-xl"
                >
                  <Plus className="w-5 h-5" />
                  Nova ETP
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                  <p className="text-blue-200 text-sm mb-1">Total</p>
                  <p className="text-3xl font-bold">{stats.total}</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                  <p className="text-blue-200 text-sm mb-1">Em Elaboração</p>
                  <p className="text-3xl font-bold">{stats.elaboracao}</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                  <p className="text-blue-200 text-sm mb-1">Aprovadas</p>
                  <p className="text-3xl font-bold">{stats.aprovados}</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                  <p className="text-blue-200 text-sm mb-1">Valor Total</p>
                  <p className="text-xl font-bold">{formatarMoeda(stats.valorTotal)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filtros */}
          <div className="bg-white rounded-2xl border border-slate-200/60 p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por número, objeto ou setor..."
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-slate-400" />
                <select
                  value={filtroStatus}
                  onChange={(e) => setFiltroStatus(e.target.value as ETPStatus | 'todos')}
                  className="px-4 py-3 bg-slate-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm font-medium text-slate-700"
                >
                  <option value="todos">Todos os Status</option>
                  {Object.entries(statusLabels).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Lista de ETPs */}
          {etpsFiltradas.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200/60 p-16 text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                {etps.length === 0 ? 'Nenhuma ETP cadastrada' : 'Nenhum resultado encontrado'}
              </h3>
              <p className="text-slate-500 mb-6 max-w-md mx-auto">
                {etps.length === 0
                  ? 'Comece criando seu primeiro Estudo Técnico Preliminar para dar início ao processo de contratação.'
                  : 'Tente ajustar os filtros ou termos de busca para encontrar o que procura.'}
              </p>
              {etps.length === 0 && (
                <button
                  onClick={handleNovaETP}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-xl shadow-blue-500/25"
                >
                  <Plus className="w-5 h-5" />
                  Criar Primeira ETP
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {etpsFiltradas.map((etp) => (
                <ETPCard
                  key={etp.id}
                  etp={etp}
                  onView={() => handleVisualizarETP(etp)}
                  onEdit={() => handleEditarETP(etp)}
                  onDelete={() => setShowDeleteModal(etp.id)}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* VIEW: Editor de ETP */}
      {view === 'editor' && etpAtual && (
        <div className="space-y-6">
          {/* Header do Editor */}
          <div className="bg-white rounded-2xl border border-slate-200/60 p-6">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={handleVoltar}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium transition-colors"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                Voltar para lista
              </button>
              <div className="flex items-center gap-3">
                {modoEdicao && (
                  <>
                    {/* Botão Salvar - sempre visível em modo edição */}
                    <button
                      onClick={() => handleSalvarETP()}
                      className="flex items-center gap-2 px-4 py-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      Salvar
                    </button>

                    {/* Botão de ação baseado no status atual */}
                    {etpAtual.status === 'rascunho' && (
                      <button
                        onClick={() => handleSalvarETP('elaboracao')}
                        className="flex items-center gap-2 px-4 py-2 text-white bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-xl font-medium transition-all shadow-lg shadow-purple-500/25"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Iniciar Elaboração
                      </button>
                    )}

                    {etpAtual.status === 'elaboracao' && (
                      <button
                        onClick={() => handleSalvarETP('revisao_tecnica')}
                        className="flex items-center gap-2 px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl font-medium transition-all shadow-lg shadow-blue-500/25"
                      >
                        <Send className="w-4 h-4" />
                        Enviar para Revisão Técnica
                      </button>
                    )}
                  </>
                )}
                <button
                  onClick={handleExportar}
                  className="flex items-center gap-2 px-4 py-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Exportar
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-500/25">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-slate-900">{etpAtual.numero}</h1>
                  <StatusBadge status={etpAtual.status} />
                </div>
                <p className="text-slate-500">
                  {modoEdicao ? 'Editando Estudo Técnico Preliminar' : 'Visualizando Estudo Técnico Preliminar'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-slate-900">{etpAtual.progresso}%</p>
                <p className="text-sm text-slate-500">progresso</p>
              </div>
            </div>

            {/* Barra de Progresso */}
            <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 transition-all duration-500"
                style={{ width: `${etpAtual.progresso}%` }}
              />
            </div>

            {/* Workflow Stepper */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">Fluxo de Aprovação</p>
              <div className="flex items-center justify-between">
                {[
                  { id: 'rascunho', label: 'Rascunho', icon: Edit3 },
                  { id: 'elaboracao', label: 'Elaboração', icon: RefreshCw },
                  { id: 'revisao_tecnica', label: 'Revisão Técnica', icon: Target },
                  { id: 'revisao_juridica', label: 'Revisão Jurídica', icon: Scale },
                  { id: 'anuencia', label: 'Anuência', icon: Users },
                  { id: 'aprovado', label: 'Aprovado', icon: CheckCircle }
                ].map((step, index, arr) => {
                  const statusOrder = ['rascunho', 'elaboracao', 'revisao_tecnica', 'revisao_juridica', 'revisao_financeira', 'anuencia', 'aprovado', 'publicado'];
                  const currentIndex = statusOrder.indexOf(etpAtual.status);
                  const stepIndex = statusOrder.indexOf(step.id);
                  const isActive = etpAtual.status === step.id;
                  const isCompleted = stepIndex < currentIndex;
                  const StepIcon = step.icon;

                  return (
                    <div key={step.id} className="flex items-center flex-1">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                          isActive
                            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                            : isCompleted
                              ? 'bg-emerald-500 text-white'
                              : 'bg-slate-100 text-slate-400'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : (
                            <StepIcon className="w-5 h-5" />
                          )}
                        </div>
                        <span className={`mt-2 text-xs font-medium text-center ${
                          isActive ? 'text-blue-600' : isCompleted ? 'text-emerald-600' : 'text-slate-400'
                        }`}>
                          {step.label}
                        </span>
                      </div>
                      {index < arr.length - 1 && (
                        <div className={`flex-1 h-1 mx-2 rounded-full ${
                          isCompleted ? 'bg-emerald-500' : 'bg-slate-200'
                        }`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Formulário em Steps */}
          <div className="space-y-4">
            {/* Step 1: Informações Básicas */}
            <FormStep
              number={1}
              title="Informações Básicas"
              description="Identifique o setor responsável e o objeto da contratação"
              isOpen={openStep === 1}
              onToggle={() => setOpenStep(openStep === 1 ? 0 : 1)}
              isComplete={getStepComplete(1)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Setor Responsável *
                  </label>
                  <input
                    type="text"
                    value={etpAtual.setorResponsavel}
                    onChange={(e) => setETPAtual({ ...etpAtual, setorResponsavel: e.target.value })}
                    disabled={!modoEdicao}
                    placeholder="Ex: Secretaria de Tecnologia da Informação"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Modalidade de Licitação
                  </label>
                  <select
                    value={etpAtual.modalidade}
                    onChange={(e) => setETPAtual({ ...etpAtual, modalidade: e.target.value as ModalidadeLicitacao })}
                    disabled={!modoEdicao}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60 transition-all"
                  >
                    <option value="">Selecione...</option>
                    {Object.entries(modalidadeLabels).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Objeto da Contratação *
                  </label>
                  <input
                    type="text"
                    value={etpAtual.objeto}
                    onChange={(e) => setETPAtual({ ...etpAtual, objeto: e.target.value })}
                    disabled={!modoEdicao}
                    placeholder="Ex: Aquisição de equipamentos de informática para modernização do parque tecnológico"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60 transition-all"
                  />
                </div>
              </div>
            </FormStep>

            {/* Step 2: Justificativas */}
            <FormStep
              number={2}
              title="Justificativas"
              description="Descreva a necessidade e justificativa técnica da contratação"
              isOpen={openStep === 2}
              onToggle={() => setOpenStep(openStep === 2 ? 0 : 2)}
              isComplete={getStepComplete(2)}
            >
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Descrição Detalhada *
                  </label>
                  <textarea
                    value={etpAtual.descricaoDetalhada}
                    onChange={(e) => setETPAtual({ ...etpAtual, descricaoDetalhada: e.target.value })}
                    disabled={!modoEdicao}
                    rows={4}
                    placeholder="Descreva detalhadamente o que será contratado, especificações técnicas, quantidades estimadas..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60 transition-all resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Justificativa Técnica *
                  </label>
                  <textarea
                    value={etpAtual.justificativaTecnica}
                    onChange={(e) => setETPAtual({ ...etpAtual, justificativaTecnica: e.target.value })}
                    disabled={!modoEdicao}
                    rows={4}
                    placeholder="Justifique tecnicamente a necessidade desta contratação..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60 transition-all resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Justificativa de Negócio
                  </label>
                  <textarea
                    value={etpAtual.justificativaNegocio}
                    onChange={(e) => setETPAtual({ ...etpAtual, justificativaNegocio: e.target.value })}
                    disabled={!modoEdicao}
                    rows={3}
                    placeholder="Descreva o impacto no negócio caso a contratação não seja realizada..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60 transition-all resize-none"
                  />
                </div>
              </div>
            </FormStep>

            {/* Step 3: Valores e Pesquisa de Preços */}
            <FormStep
              number={3}
              title="Valores e Pesquisa de Preços"
              description="Defina o valor estimado e fontes de pesquisa"
              isOpen={openStep === 3}
              onToggle={() => setOpenStep(openStep === 3 ? 0 : 3)}
              isComplete={getStepComplete(3)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Valor Estimado *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">R$</span>
                    <input
                      type="text"
                      value={etpAtual.valorEstimadoFormatado || formatarMoeda(etpAtual.valorEstimado).replace('R$', '').trim()}
                      onChange={(e) => {
                        const valor = parseMoeda(e.target.value);
                        setETPAtual({
                          ...etpAtual,
                          valorEstimado: valor,
                          valorEstimadoFormatado: e.target.value
                        });
                      }}
                      disabled={!modoEdicao}
                      placeholder="0,00"
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Fontes de Pesquisa de Preços
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['Painel de Preços', 'Banco de Preços', 'Contratos Anteriores', 'Cotações'].map((fonte) => (
                      <button
                        key={fonte}
                        type="button"
                        disabled={!modoEdicao}
                        onClick={() => {
                          const fontes = etpAtual.fontePesquisaPrecos.includes(fonte)
                            ? etpAtual.fontePesquisaPrecos.filter(f => f !== fonte)
                            : [...etpAtual.fontePesquisaPrecos, fonte];
                          setETPAtual({ ...etpAtual, fontePesquisaPrecos: fontes });
                        }}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          etpAtual.fontePesquisaPrecos.includes(fonte)
                            ? 'bg-blue-100 text-blue-700 border-2 border-blue-200'
                            : 'bg-slate-100 text-slate-600 border-2 border-transparent hover:bg-slate-200'
                        } disabled:opacity-60`}
                      >
                        {fonte}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Análise Comparativa de Preços
                  </label>
                  <textarea
                    value={etpAtual.analiseComparativaPrecos}
                    onChange={(e) => setETPAtual({ ...etpAtual, analiseComparativaPrecos: e.target.value })}
                    disabled={!modoEdicao}
                    rows={3}
                    placeholder="Descreva a metodologia e resultados da pesquisa de preços..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60 transition-all resize-none"
                  />
                </div>
              </div>
            </FormStep>

            {/* Step 4: Análise de Riscos */}
            <FormStep
              number={4}
              title="Análise de Riscos"
              description="Identifique e mitigue os riscos da contratação"
              isOpen={openStep === 4}
              onToggle={() => setOpenStep(openStep === 4 ? 0 : 4)}
              isComplete={getStepComplete(4)}
            >
              <div className="space-y-4">
                {etpAtual.riscos.map((risco, index) => (
                  <div key={risco.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-slate-700">Risco {index + 1}</span>
                      {modoEdicao && (
                        <button
                          onClick={() => handleRemoverRisco(risco.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="md:col-span-2">
                        <input
                          type="text"
                          value={risco.descricao}
                          onChange={(e) => {
                            setETPAtual({
                              ...etpAtual,
                              riscos: etpAtual.riscos.map(r => r.id === risco.id ? { ...r, descricao: e.target.value } : r)
                            });
                          }}
                          disabled={!modoEdicao}
                          placeholder="Descrição do risco"
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm disabled:opacity-60"
                        />
                      </div>
                      <select
                        value={risco.probabilidade}
                        onChange={(e) => {
                          setETPAtual({
                            ...etpAtual,
                            riscos: etpAtual.riscos.map(r => r.id === risco.id ? { ...r, probabilidade: e.target.value as any } : r)
                          });
                        }}
                        disabled={!modoEdicao}
                        className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm disabled:opacity-60"
                      >
                        <option value="baixa">Prob. Baixa</option>
                        <option value="media">Prob. Média</option>
                        <option value="alta">Prob. Alta</option>
                      </select>
                      <select
                        value={risco.impacto}
                        onChange={(e) => {
                          setETPAtual({
                            ...etpAtual,
                            riscos: etpAtual.riscos.map(r => r.id === risco.id ? { ...r, impacto: e.target.value as any } : r)
                          });
                        }}
                        disabled={!modoEdicao}
                        className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm disabled:opacity-60"
                      >
                        <option value="baixo">Impacto Baixo</option>
                        <option value="medio">Impacto Médio</option>
                        <option value="alto">Impacto Alto</option>
                      </select>
                      <div className="md:col-span-4">
                        <input
                          type="text"
                          value={risco.mitigacao}
                          onChange={(e) => {
                            setETPAtual({
                              ...etpAtual,
                              riscos: etpAtual.riscos.map(r => r.id === risco.id ? { ...r, mitigacao: e.target.value } : r)
                            });
                          }}
                          disabled={!modoEdicao}
                          placeholder="Ação de mitigação"
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm disabled:opacity-60"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {modoEdicao && (
                  <button
                    onClick={handleAdicionarRisco}
                    className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Adicionar Risco
                  </button>
                )}
              </div>
            </FormStep>

            {/* Step 5: Alternativas */}
            <FormStep
              number={5}
              title="Alternativas Consideradas"
              description="Documente as alternativas analisadas e motivos de descarte"
              isOpen={openStep === 5}
              onToggle={() => setOpenStep(openStep === 5 ? 0 : 5)}
              isComplete={getStepComplete(5)}
            >
              <div className="space-y-4">
                {etpAtual.alternativas.map((alt, index) => (
                  <div key={alt.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-slate-700">Alternativa {index + 1}</span>
                      {modoEdicao && (
                        <button
                          onClick={() => handleRemoverAlternativa(alt.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={alt.descricao}
                        onChange={(e) => {
                          setETPAtual({
                            ...etpAtual,
                            alternativas: etpAtual.alternativas.map(a => a.id === alt.id ? { ...a, descricao: e.target.value } : a)
                          });
                        }}
                        disabled={!modoEdicao}
                        placeholder="Descrição da alternativa"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm disabled:opacity-60"
                      />
                      <input
                        type="text"
                        value={alt.motivoDescarte || ''}
                        onChange={(e) => {
                          setETPAtual({
                            ...etpAtual,
                            alternativas: etpAtual.alternativas.map(a => a.id === alt.id ? { ...a, motivoDescarte: e.target.value } : a)
                          });
                        }}
                        disabled={!modoEdicao}
                        placeholder="Motivo do descarte"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm disabled:opacity-60"
                      />
                      <input
                        type="text"
                        value={alt.vantagens}
                        onChange={(e) => {
                          setETPAtual({
                            ...etpAtual,
                            alternativas: etpAtual.alternativas.map(a => a.id === alt.id ? { ...a, vantagens: e.target.value } : a)
                          });
                        }}
                        disabled={!modoEdicao}
                        placeholder="Vantagens"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm disabled:opacity-60"
                      />
                      <input
                        type="text"
                        value={alt.desvantagens}
                        onChange={(e) => {
                          setETPAtual({
                            ...etpAtual,
                            alternativas: etpAtual.alternativas.map(a => a.id === alt.id ? { ...a, desvantagens: e.target.value } : a)
                          });
                        }}
                        disabled={!modoEdicao}
                        placeholder="Desvantagens"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm disabled:opacity-60"
                      />
                    </div>
                  </div>
                ))}
                {modoEdicao && (
                  <button
                    onClick={handleAdicionarAlternativa}
                    className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Adicionar Alternativa
                  </button>
                )}
              </div>
            </FormStep>
          </div>

          {/* Histórico */}
          <div className="bg-white rounded-2xl border border-slate-200/60 p-6">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-slate-500" />
              Histórico de Alterações
            </h3>
            <div className="space-y-3">
              {etpAtual.historico.slice(-5).reverse().map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    item.tipo === 'criacao' ? 'bg-green-500' :
                    item.tipo === 'aprovacao' ? 'bg-blue-500' :
                    item.tipo === 'rejeicao' ? 'bg-red-500' : 'bg-slate-400'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-slate-700">{item.acao}</p>
                    <p className="text-xs text-slate-500">{item.autor} • {formatarDataCompleta(item.data)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
