import { useState } from 'react';
import {
  FileText, Building2, Calendar, Clock, AlertTriangle, CheckCircle2,
  TrendingUp, DollarSign, Users, Search, Filter, Eye, ChevronRight,
  Truck, Package, Bell, Mail, MessageSquare, Edit, PlusCircle,
  FileSignature, ClipboardCheck, AlertOctagon, RefreshCw, BarChart3,
  MapPin, Phone, Percent, ArrowUpRight, ArrowDownRight, Activity
} from 'lucide-react';

interface ModuloGestaoContratualProps {
  userName: string;
}

// Tipos
interface Contrato {
  id: string;
  numero: string;
  objeto: string;
  fornecedor: {
    razaoSocial: string;
    cnpj: string;
    email: string;
    telefone: string;
  };
  valorTotal: number;
  valorExecutado: number;
  dataInicio: string;
  dataFim: string;
  status: 'vigente' | 'a_vencer' | 'vencido' | 'encerrado' | 'suspenso';
  fiscal: string;
  gestor: string;
  entregas: Entrega[];
  ocorrencias: Ocorrencia[];
  aditivos: Aditivo[];
  notificacoes: Notificacao[];
}

interface Entrega {
  id: string;
  descricao: string;
  dataPrevisao: string;
  dataEntrega?: string;
  status: 'pendente' | 'entregue' | 'atrasado' | 'parcial';
  valorParcela: number;
  notaFiscal?: string;
}

interface Ocorrencia {
  id: string;
  tipo: 'alerta' | 'irregularidade' | 'notificacao' | 'penalidade';
  descricao: string;
  data: string;
  responsavel: string;
  status: 'aberta' | 'em_analise' | 'resolvida';
}

interface Aditivo {
  id: string;
  numero: string;
  tipo: 'prazo' | 'valor' | 'escopo' | 'misto';
  valorAdicional?: number;
  prazoAdicional?: number;
  dataAssinatura: string;
  justificativa: string;
}

interface Notificacao {
  id: string;
  tipo: 'email' | 'whatsapp' | 'sistema';
  assunto: string;
  data: string;
  destinatario: string;
  status: 'enviada' | 'lida' | 'respondida';
}

// Dados de exemplo
const contratosExemplo: Contrato[] = [
  {
    id: 'cont-001',
    numero: 'CT-2024-089',
    objeto: 'Prestação de serviços de limpeza e conservação predial',
    fornecedor: {
      razaoSocial: 'LimpaTudo Serviços Especializados ME',
      cnpj: '12.345.678/0001-90',
      email: 'contato@limpatudo.com.br',
      telefone: '(11) 98765-4321'
    },
    valorTotal: 1080000,
    valorExecutado: 450000,
    dataInicio: '2024-11-20',
    dataFim: '2025-11-19',
    status: 'vigente',
    fiscal: 'Carlos Eduardo Silva',
    gestor: 'Ana Paula Mendes',
    entregas: [
      { id: 'ent-001', descricao: 'Parcela 1 - Nov/2024', dataPrevisao: '2024-11-30', dataEntrega: '2024-11-28', status: 'entregue', valorParcela: 90000, notaFiscal: 'NF-001234' },
      { id: 'ent-002', descricao: 'Parcela 2 - Dez/2024', dataPrevisao: '2024-12-30', dataEntrega: '2024-12-29', status: 'entregue', valorParcela: 90000, notaFiscal: 'NF-001345' },
      { id: 'ent-003', descricao: 'Parcela 3 - Jan/2025', dataPrevisao: '2025-01-30', status: 'pendente', valorParcela: 90000 },
      { id: 'ent-004', descricao: 'Parcela 4 - Fev/2025', dataPrevisao: '2025-02-28', status: 'pendente', valorParcela: 90000 }
    ],
    ocorrencias: [
      { id: 'oc-001', tipo: 'alerta', descricao: 'Atraso de 2 dias na entrega de materiais', data: '2024-12-15', responsavel: 'Carlos Eduardo Silva', status: 'resolvida' }
    ],
    aditivos: [],
    notificacoes: [
      { id: 'not-001', tipo: 'email', assunto: 'Confirmação de entrega Parcela 2', data: '2024-12-29', destinatario: 'fornecedor', status: 'lida' }
    ]
  },
  {
    id: 'cont-002',
    numero: 'CT-2024-045',
    objeto: 'Fornecimento de equipamentos de informática',
    fornecedor: {
      razaoSocial: 'TechMax Equipamentos Ltda',
      cnpj: '98.765.432/0001-10',
      email: 'vendas@techmax.com.br',
      telefone: '(21) 99876-5432'
    },
    valorTotal: 850000,
    valorExecutado: 850000,
    dataInicio: '2024-06-01',
    dataFim: '2025-01-31',
    status: 'a_vencer',
    fiscal: 'Roberto Almeida',
    gestor: 'Fernanda Costa',
    entregas: [
      { id: 'ent-005', descricao: 'Lote 1 - Notebooks', dataPrevisao: '2024-07-15', dataEntrega: '2024-07-14', status: 'entregue', valorParcela: 425000, notaFiscal: 'NF-002345' },
      { id: 'ent-006', descricao: 'Lote 2 - Desktops', dataPrevisao: '2024-09-15', dataEntrega: '2024-09-20', status: 'entregue', valorParcela: 425000, notaFiscal: 'NF-002456' }
    ],
    ocorrencias: [
      { id: 'oc-002', tipo: 'notificacao', descricao: 'Atraso de 5 dias no Lote 2', data: '2024-09-20', responsavel: 'Roberto Almeida', status: 'resolvida' }
    ],
    aditivos: [],
    notificacoes: []
  },
  {
    id: 'cont-003',
    numero: 'CT-2024-012',
    objeto: 'Manutenção predial preventiva e corretiva',
    fornecedor: {
      razaoSocial: 'Construserv Engenharia SA',
      cnpj: '45.678.901/0001-23',
      email: 'contratos@construserv.com.br',
      telefone: '(31) 98123-4567'
    },
    valorTotal: 2400000,
    valorExecutado: 1800000,
    dataInicio: '2024-02-01',
    dataFim: '2026-01-31',
    status: 'vigente',
    fiscal: 'Marcos Oliveira',
    gestor: 'Juliana Souza',
    entregas: [
      { id: 'ent-007', descricao: 'Serviços Q1/2024', dataPrevisao: '2024-03-31', dataEntrega: '2024-03-30', status: 'entregue', valorParcela: 300000, notaFiscal: 'NF-003456' },
      { id: 'ent-008', descricao: 'Serviços Q2/2024', dataPrevisao: '2024-06-30', dataEntrega: '2024-06-28', status: 'entregue', valorParcela: 300000, notaFiscal: 'NF-003567' },
      { id: 'ent-009', descricao: 'Serviços Q3/2024', dataPrevisao: '2024-09-30', dataEntrega: '2024-09-29', status: 'entregue', valorParcela: 300000, notaFiscal: 'NF-003678' },
      { id: 'ent-010', descricao: 'Serviços Q4/2024', dataPrevisao: '2024-12-31', dataEntrega: '2024-12-30', status: 'entregue', valorParcela: 300000, notaFiscal: 'NF-003789' },
      { id: 'ent-011', descricao: 'Serviços Q1/2025', dataPrevisao: '2025-03-31', status: 'pendente', valorParcela: 300000 }
    ],
    ocorrencias: [],
    aditivos: [
      { id: 'ad-001', numero: 'AD-001', tipo: 'valor', valorAdicional: 600000, dataAssinatura: '2024-08-15', justificativa: 'Inclusão de serviços de pintura externa' }
    ],
    notificacoes: []
  }
];

// Utilitários
const formatarMoeda = (valor: number): string => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
};

const formatarData = (data: string): string => {
  return new Date(data).toLocaleDateString('pt-BR');
};

const calcularDiasRestantes = (dataFim: string): number => {
  const hoje = new Date();
  const fim = new Date(dataFim);
  const diff = fim.getTime() - hoje.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

const statusColors: Record<Contrato['status'], { bg: string; text: string; border: string; label: string }> = {
  vigente: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', label: 'Vigente' },
  a_vencer: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', label: 'A Vencer' },
  vencido: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', label: 'Vencido' },
  encerrado: { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200', label: 'Encerrado' },
  suspenso: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', label: 'Suspenso' }
};

const entregaStatusColors: Record<Entrega['status'], { bg: string; text: string; label: string }> = {
  pendente: { bg: 'bg-slate-100', text: 'text-slate-700', label: 'Pendente' },
  entregue: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Entregue' },
  atrasado: { bg: 'bg-red-100', text: 'text-red-700', label: 'Atrasado' },
  parcial: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Parcial' }
};

// Tabs disponíveis
type TabType = 'visaoGeral' | 'entregas' | 'ocorrencias' | 'aditivos' | 'notificacoes' | 'encerramento';

export function ModuloGestaoContratual({ userName }: ModuloGestaoContratualProps) {
  const [contratos] = useState<Contrato[]>(contratosExemplo);
  const [selectedContrato, setSelectedContrato] = useState<Contrato | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('visaoGeral');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');

  const filteredContratos = contratos.filter(c => {
    const matchSearch = c.numero.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       c.objeto.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       c.fornecedor.razaoSocial.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'todos' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  // Estatísticas
  const totalContratos = contratos.length;
  const contratosVigentes = contratos.filter(c => c.status === 'vigente').length;
  const contratosAVencer = contratos.filter(c => c.status === 'a_vencer').length;
  const valorTotalContratos = contratos.reduce((acc, c) => acc + c.valorTotal, 0);
  const valorExecutado = contratos.reduce((acc, c) => acc + c.valorExecutado, 0);
  const taxaExecucao = (valorExecutado / valorTotalContratos) * 100;

  const tabs: { id: TabType; label: string; icon: any }[] = [
    { id: 'visaoGeral', label: 'Visão Geral', icon: Eye },
    { id: 'entregas', label: 'Entregas', icon: Package },
    { id: 'ocorrencias', label: 'Ocorrências', icon: AlertTriangle },
    { id: 'aditivos', label: 'Aditivos', icon: FileSignature },
    { id: 'notificacoes', label: 'Notificações', icon: Bell },
    { id: 'encerramento', label: 'Encerramento', icon: ClipboardCheck }
  ];

  // Card de Contrato
  const ContratoCard = ({ contrato }: { contrato: Contrato }) => {
    const colors = statusColors[contrato.status];
    const diasRestantes = calcularDiasRestantes(contrato.dataFim);
    const percentualExecutado = (contrato.valorExecutado / contrato.valorTotal) * 100;

    return (
      <button
        onClick={() => setSelectedContrato(contrato)}
        className={`w-full text-left p-5 rounded-2xl border-2 ${colors.border} bg-white hover:shadow-xl transition-all duration-300 group relative overflow-hidden`}
      >
        <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-16 -translate-y-16">
          <div className={`w-full h-full rounded-full ${colors.bg} opacity-50`}></div>
        </div>

        <div className="relative">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text}`}>
                {colors.label}
              </span>
              <h3 className="font-bold text-slate-900 mt-2 group-hover:text-blue-700 transition-colors">
                {contrato.numero}
              </h3>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
          </div>

          {/* Objeto */}
          <p className="text-sm text-slate-600 line-clamp-2 mb-4">{contrato.objeto}</p>

          {/* Fornecedor */}
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-700 font-medium truncate">{contrato.fornecedor.razaoSocial}</span>
          </div>

          {/* Barra de Execução */}
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-500">Execução Financeira</span>
              <span className="font-semibold text-slate-700">{percentualExecutado.toFixed(0)}%</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${percentualExecutado}%` }}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-slate-500">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatarData(contrato.dataFim)}</span>
            </div>
            <div className={`flex items-center gap-1 font-medium ${diasRestantes <= 30 ? 'text-amber-600' : diasRestantes <= 0 ? 'text-red-600' : 'text-slate-600'}`}>
              <Clock className="w-3.5 h-3.5" />
              <span>{diasRestantes > 0 ? `${diasRestantes} dias` : 'Vencido'}</span>
            </div>
          </div>
        </div>
      </button>
    );
  };

  // Renderizar conteúdo da tab
  const renderTabContent = () => {
    if (!selectedContrato) return null;

    switch (activeTab) {
      case 'visaoGeral':
        const percentualExec = (selectedContrato.valorExecutado / selectedContrato.valorTotal) * 100;
        return (
          <div className="space-y-6">
            {/* Cards de Resumo */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 rounded-xl">
                    <DollarSign className="w-5 h-5 text-blue-700" />
                  </div>
                  <span className="text-sm font-medium text-slate-600">Valor Total</span>
                </div>
                <p className="text-2xl font-bold text-blue-900">{formatarMoeda(selectedContrato.valorTotal)}</p>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-5 border border-emerald-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-emerald-100 rounded-xl">
                    <TrendingUp className="w-5 h-5 text-emerald-700" />
                  </div>
                  <span className="text-sm font-medium text-slate-600">Executado</span>
                </div>
                <p className="text-2xl font-bold text-emerald-900">{formatarMoeda(selectedContrato.valorExecutado)}</p>
              </div>

              <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-5 border border-violet-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-violet-100 rounded-xl">
                    <Percent className="w-5 h-5 text-violet-700" />
                  </div>
                  <span className="text-sm font-medium text-slate-600">% Execução</span>
                </div>
                <p className="text-2xl font-bold text-violet-900">{percentualExec.toFixed(1)}%</p>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-5 border border-amber-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-amber-100 rounded-xl">
                    <Clock className="w-5 h-5 text-amber-700" />
                  </div>
                  <span className="text-sm font-medium text-slate-600">Dias Restantes</span>
                </div>
                <p className="text-2xl font-bold text-amber-900">{calcularDiasRestantes(selectedContrato.dataFim)}</p>
              </div>
            </div>

            {/* Informações do Contrato */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Dados do Contrato */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Dados do Contrato
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-slate-100">
                    <span className="text-sm text-slate-500">Número</span>
                    <span className="font-semibold text-slate-900">{selectedContrato.numero}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-slate-100">
                    <span className="text-sm text-slate-500">Vigência</span>
                    <span className="font-semibold text-slate-900">
                      {formatarData(selectedContrato.dataInicio)} a {formatarData(selectedContrato.dataFim)}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-slate-100">
                    <span className="text-sm text-slate-500">Fiscal</span>
                    <span className="font-semibold text-slate-900">{selectedContrato.fiscal}</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-sm text-slate-500">Gestor</span>
                    <span className="font-semibold text-slate-900">{selectedContrato.gestor}</span>
                  </div>
                </div>
              </div>

              {/* Dados do Fornecedor */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-emerald-600" />
                  Fornecedor
                </h4>
                <div className="space-y-4">
                  <div className="py-3 border-b border-slate-100">
                    <span className="text-sm text-slate-500 block mb-1">Razão Social</span>
                    <span className="font-semibold text-slate-900">{selectedContrato.fornecedor.razaoSocial}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-slate-100">
                    <span className="text-sm text-slate-500">CNPJ</span>
                    <span className="font-semibold text-slate-900">{selectedContrato.fornecedor.cnpj}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-slate-100">
                    <span className="text-sm text-slate-500">E-mail</span>
                    <span className="font-semibold text-blue-600">{selectedContrato.fornecedor.email}</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-sm text-slate-500">Telefone</span>
                    <span className="font-semibold text-slate-900">{selectedContrato.fornecedor.telefone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Objeto */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5 text-violet-600" />
                Objeto do Contrato
              </h4>
              <p className="text-slate-700 leading-relaxed">{selectedContrato.objeto}</p>
            </div>
          </div>
        );

      case 'entregas':
        return (
          <div className="space-y-4">
            {/* Header - Responsivo */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <h4 className="font-bold text-slate-900">Cronograma de Entregas</h4>
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium">
                <PlusCircle className="w-4 h-4" />
                Registrar Entrega
              </button>
            </div>

            {/* Lista de Entregas - Responsiva */}
            <div className="space-y-3">
              {selectedContrato.entregas.map((entrega) => {
                const colors = entregaStatusColors[entrega.status];
                return (
                  <div key={entrega.id} className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 hover:shadow-lg transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      {/* Info da Entrega */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text}`}>
                            {colors.label}
                          </span>
                          {entrega.notaFiscal && (
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                              <FileText className="w-3 h-3" />
                              {entrega.notaFiscal}
                            </span>
                          )}
                        </div>
                        <h5 className="font-semibold text-slate-900 mb-2 text-sm sm:text-base">{entrega.descricao}</h5>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-slate-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 shrink-0" />
                            Previsão: {formatarData(entrega.dataPrevisao)}
                          </span>
                          {entrega.dataEntrega && (
                            <span className="flex items-center gap-1 text-emerald-600">
                              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                              Entregue: {formatarData(entrega.dataEntrega)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Valor - Destacado em mobile */}
                      <div className="sm:text-right pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                        <p className="text-xs text-slate-500 sm:hidden mb-1">Valor da Parcela</p>
                        <p className="font-bold text-slate-900 text-base sm:text-lg">{formatarMoeda(entrega.valorParcela)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'ocorrencias':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-slate-900">Registro de Ocorrências</h4>
              <button className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-colors text-sm font-medium">
                <PlusCircle className="w-4 h-4" />
                Nova Ocorrência
              </button>
            </div>

            {selectedContrato.ocorrencias.length === 0 ? (
              <div className="bg-slate-50 rounded-2xl p-8 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <p className="text-slate-600 font-medium">Nenhuma ocorrência registrada</p>
                <p className="text-sm text-slate-500 mt-1">O contrato está sendo executado sem problemas</p>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedContrato.ocorrencias.map((ocorrencia) => (
                  <div key={ocorrencia.id} className="bg-white rounded-2xl border border-slate-200 p-5">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-xl ${
                        ocorrencia.tipo === 'penalidade' ? 'bg-red-100' :
                        ocorrencia.tipo === 'irregularidade' ? 'bg-orange-100' :
                        ocorrencia.tipo === 'alerta' ? 'bg-amber-100' : 'bg-blue-100'
                      }`}>
                        <AlertTriangle className={`w-5 h-5 ${
                          ocorrencia.tipo === 'penalidade' ? 'text-red-700' :
                          ocorrencia.tipo === 'irregularidade' ? 'text-orange-700' :
                          ocorrencia.tipo === 'alerta' ? 'text-amber-700' : 'text-blue-700'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold uppercase text-slate-500">{ocorrencia.tipo}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            ocorrencia.status === 'resolvida' ? 'bg-emerald-100 text-emerald-700' :
                            ocorrencia.status === 'em_analise' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {ocorrencia.status === 'resolvida' ? 'Resolvida' : ocorrencia.status === 'em_analise' ? 'Em Análise' : 'Aberta'}
                          </span>
                        </div>
                        <p className="text-slate-900 font-medium mb-2">{ocorrencia.descricao}</p>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatarData(ocorrencia.data)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {ocorrencia.responsavel}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'aditivos':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-slate-900">Termos Aditivos</h4>
              <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-colors text-sm font-medium">
                <PlusCircle className="w-4 h-4" />
                Novo Aditivo
              </button>
            </div>

            {selectedContrato.aditivos.length === 0 ? (
              <div className="bg-slate-50 rounded-2xl p-8 text-center">
                <FileSignature className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <p className="text-slate-600 font-medium">Nenhum aditivo registrado</p>
                <p className="text-sm text-slate-500 mt-1">O contrato não possui termos aditivos</p>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedContrato.aditivos.map((aditivo) => (
                  <div key={aditivo.id} className="bg-white rounded-2xl border border-violet-200 p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="text-xs font-semibold text-violet-600 uppercase">{aditivo.tipo}</span>
                        <h5 className="font-bold text-slate-900 mt-1">{aditivo.numero}</h5>
                      </div>
                      {aditivo.valorAdicional && (
                        <div className="text-right">
                          <span className="text-xs text-slate-500">Valor Adicional</span>
                          <p className="font-bold text-violet-700">{formatarMoeda(aditivo.valorAdicional)}</p>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{aditivo.justificativa}</p>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Calendar className="w-3 h-3" />
                      Assinado em {formatarData(aditivo.dataAssinatura)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'notificacoes':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-slate-900">Central de Notificações</h4>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium">
                  <Mail className="w-4 h-4" />
                  Enviar E-mail
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors text-sm font-medium">
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp
                </button>
              </div>
            </div>

            {selectedContrato.notificacoes.length === 0 ? (
              <div className="bg-slate-50 rounded-2xl p-8 text-center">
                <Bell className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <p className="text-slate-600 font-medium">Nenhuma notificação enviada</p>
                <p className="text-sm text-slate-500 mt-1">Use os botões acima para enviar notificações</p>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedContrato.notificacoes.map((notificacao) => (
                  <div key={notificacao.id} className="bg-white rounded-2xl border border-slate-200 p-5">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-xl ${
                        notificacao.tipo === 'email' ? 'bg-blue-100' :
                        notificacao.tipo === 'whatsapp' ? 'bg-green-100' : 'bg-slate-100'
                      }`}>
                        {notificacao.tipo === 'email' ? <Mail className="w-5 h-5 text-blue-700" /> :
                         notificacao.tipo === 'whatsapp' ? <MessageSquare className="w-5 h-5 text-green-700" /> :
                         <Bell className="w-5 h-5 text-slate-700" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            notificacao.status === 'respondida' ? 'bg-emerald-100 text-emerald-700' :
                            notificacao.status === 'lida' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {notificacao.status === 'respondida' ? 'Respondida' : notificacao.status === 'lida' ? 'Lida' : 'Enviada'}
                          </span>
                        </div>
                        <p className="text-slate-900 font-medium">{notificacao.assunto}</p>
                        <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatarData(notificacao.data)}
                          </span>
                          <span>Para: {notificacao.destinatario}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'encerramento':
        return (
          <div className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <AlertOctagon className="w-8 h-8 text-amber-600 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-amber-900 mb-2">Checklist de Encerramento</h4>
                  <p className="text-amber-800 text-sm">
                    Antes de encerrar o contrato, verifique se todos os itens abaixo foram cumpridos.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h4 className="font-bold text-slate-900 mb-4">Verificações Necessárias</h4>
              <div className="space-y-3">
                {[
                  { item: 'Todas as entregas foram realizadas', checked: true },
                  { item: 'Notas fiscais conferidas e atestadas', checked: true },
                  { item: 'Pagamentos efetuados', checked: true },
                  { item: 'Ocorrências resolvidas', checked: true },
                  { item: 'Garantias devolvidas', checked: false },
                  { item: 'Termo de recebimento definitivo emitido', checked: false },
                  { item: 'Documentação arquivada', checked: false }
                ].map((check, index) => (
                  <div key={index} className={`flex items-center gap-3 p-3 rounded-xl ${check.checked ? 'bg-emerald-50' : 'bg-slate-50'}`}>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${check.checked ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                      {check.checked && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <span className={`text-sm ${check.checked ? 'text-emerald-800' : 'text-slate-600'}`}>{check.item}</span>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 py-3 bg-slate-200 text-slate-500 rounded-xl font-semibold cursor-not-allowed" disabled>
                Encerrar Contrato (Checklist Incompleto)
              </button>
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
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">Gestão Contratual</h2>
            <p className="text-orange-100 text-sm">
              Acompanhamento completo da execução contratual • Lei 14.133/2021
            </p>
          </div>
          <div className="text-right">
            <p className="text-orange-100 text-xs">Olá, {userName}</p>
            <p className="text-white font-semibold">Módulo 4</p>
          </div>
        </div>
      </div>

      {!selectedContrato ? (
        <>
          {/* Cards de Estatísticas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-100 rounded-xl">
                  <FileText className="w-5 h-5 text-blue-700" />
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-900">{totalContratos}</p>
              <p className="text-sm text-slate-500 mt-1">Total de Contratos</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-emerald-100 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                </div>
              </div>
              <p className="text-3xl font-bold text-emerald-700">{contratosVigentes}</p>
              <p className="text-sm text-slate-500 mt-1">Contratos Vigentes</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-amber-100 rounded-xl">
                  <AlertTriangle className="w-5 h-5 text-amber-700" />
                </div>
              </div>
              <p className="text-3xl font-bold text-amber-700">{contratosAVencer}</p>
              <p className="text-sm text-slate-500 mt-1">A Vencer (30 dias)</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-violet-100 rounded-xl">
                  <BarChart3 className="w-5 h-5 text-violet-700" />
                </div>
              </div>
              <p className="text-3xl font-bold text-violet-700">{taxaExecucao.toFixed(0)}%</p>
              <p className="text-sm text-slate-500 mt-1">Taxa de Execução</p>
            </div>
          </div>

          {/* Barra de Busca e Filtros */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar por número, objeto ou fornecedor..."
                  className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select
                className="px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="todos">Todos os Status</option>
                <option value="vigente">Vigentes</option>
                <option value="a_vencer">A Vencer</option>
                <option value="vencido">Vencidos</option>
                <option value="encerrado">Encerrados</option>
              </select>
            </div>
          </div>

          {/* Lista de Contratos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredContratos.map((contrato) => (
              <ContratoCard key={contrato.id} contrato={contrato} />
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Voltar */}
          <button
            onClick={() => setSelectedContrato(null)}
            className="flex items-center gap-2 text-orange-700 hover:text-orange-800 font-medium"
          >
            ← Voltar para lista de contratos
          </button>

          {/* Header do Contrato */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${statusColors[selectedContrato.status].bg} ${statusColors[selectedContrato.status].text}`}>
                  {statusColors[selectedContrato.status].label}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-3">{selectedContrato.numero}</h3>
                <p className="text-slate-600 mt-1">{selectedContrato.objeto}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500">Valor Total</p>
                <p className="text-2xl font-bold text-slate-900">{formatarMoeda(selectedContrato.valorTotal)}</p>
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
                      ? 'text-orange-700 border-orange-600 bg-orange-50'
                      : 'text-slate-600 border-transparent hover:text-orange-600 hover:bg-slate-50'
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
        </>
      )}
    </div>
  );
}
