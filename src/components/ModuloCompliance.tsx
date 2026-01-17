import { useState, useEffect } from 'react';
import {
  FileCheck, Shield, Scale, AlertTriangle, CheckCircle2, XCircle,
  Clock, Users, Search, Filter, Eye, ChevronRight, ChevronDown,
  FileText, Building2, CreditCard, Truck, AlertOctagon, RefreshCw,
  ExternalLink, Download, BarChart3, TrendingUp, Package, Award,
  Zap, Target, Activity, ArrowUpRight, Calendar, MapPin, Hash,
  Gavel, MessageSquare, ThumbsUp, ThumbsDown, FileSignature, BadgeCheck,
  ClipboardCheck, Stamp, Brain, Percent
} from 'lucide-react';
import {
  ProcessoLicitatorio, FaseProcesso, StatusVerificacao, NivelRisco,
  faseProcessoLabels, faseProcessoColors, statusVerificacaoColors,
  nivelRiscoColors, nivelRiscoLabels
} from '../types/compliance';
import { carregarProcessosExemplo, loadProcessos } from '../data/complianceExemplos';

// Utilitários
const formatarMoeda = (valor: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
};

const formatarData = (data: string): string => {
  return new Date(data).toLocaleDateString('pt-BR');
};

const formatarDataHora = (data: string): string => {
  return new Date(data).toLocaleString('pt-BR');
};

// Ícones por fase
const faseIcons: Record<FaseProcesso, any> = {
  planejamento: FileText,
  proposta: Package,
  disputa: TrendingUp,
  aceitabilidade: FileCheck,
  habilitacao: Shield,
  julgamento: Scale,
  recursos: AlertTriangle,
  adjudicacao: Award,
  contrato: Building2,
  encerrado: CheckCircle2
};

// Componente de Badge de Status Premium
const StatusBadgePremium = ({
  status,
  size = 'sm'
}: {
  status: FaseProcesso;
  size?: 'sm' | 'md' | 'lg'
}) => {
  const colors = faseProcessoColors[status];
  const Icon = faseIcons[status];
  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs gap-1.5',
    md: 'px-3 py-1.5 text-sm gap-2',
    lg: 'px-4 py-2 text-sm gap-2'
  };

  return (
    <span className={`inline-flex items-center font-semibold rounded-full bg-gradient-to-r ${colors.bg} ${colors.text} ${sizeClasses[size]}`}>
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
      {faseProcessoLabels[status]}
    </span>
  );
};

// Componente de Card de Verificação Premium
const VerificacaoCard = ({
  titulo,
  status,
  icone: Icone,
  detalhes,
  tempo
}: {
  titulo: string;
  status: StatusVerificacao;
  icone: any;
  detalhes?: string;
  tempo?: string;
}) => {
  const colors = statusVerificacaoColors[status];
  const StatusIcon = status === 'aprovado' ? CheckCircle2 : status === 'reprovado' ? XCircle : status === 'alerta' ? AlertTriangle : Clock;

  const gradients: Record<StatusVerificacao, string> = {
    pendente: 'from-slate-50 to-slate-100',
    em_analise: 'from-blue-50 to-indigo-50',
    aprovado: 'from-emerald-50 to-green-50',
    reprovado: 'from-red-50 to-rose-50',
    alerta: 'from-amber-50 to-yellow-50'
  };

  return (
    <div className={`relative overflow-hidden p-4 rounded-2xl border ${colors.border} bg-gradient-to-br ${gradients[status]} hover:shadow-lg transition-all duration-300 group`}>
      <div className="absolute top-0 right-0 w-20 h-20 transform translate-x-6 -translate-y-6">
        <div className={`w-full h-full rounded-full ${colors.bg} opacity-50 group-hover:opacity-70 transition-opacity`}></div>
      </div>
      <div className="relative flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className={`p-2.5 rounded-xl ${colors.bg} shadow-sm`}>
            <Icone className={`w-5 h-5 ${colors.text}`} />
          </div>
          <div>
            <h4 className={`font-semibold ${colors.text}`}>{titulo}</h4>
            {detalhes && <p className="text-xs text-slate-500 mt-0.5">{detalhes}</p>}
            {tempo && <p className="text-xs text-slate-400 mt-1">⚡ {tempo}</p>}
          </div>
        </div>
        <StatusIcon className={`w-5 h-5 ${colors.text}`} />
      </div>
    </div>
  );
};

// Componente de Timeline Premium
const ProcessoTimeline = ({ timeline }: { timeline: ProcessoLicitatorio['timeline'] }) => {
  return (
    <div className="relative">
      <div className="absolute left-5 top-3 bottom-3 w-0.5 bg-gradient-to-b from-blue-200 via-violet-200 to-emerald-200"></div>
      <div className="space-y-4">
        {timeline.map((item, index) => {
          const colors = faseProcessoColors[item.fase];
          const Icon = faseIcons[item.fase];
          const isCompleted = item.dataFim !== undefined;
          const isLast = index === timeline.length - 1;

          return (
            <div key={index} className="relative flex items-start gap-4 pl-12">
              <div className={`absolute left-2 w-6 h-6 rounded-full flex items-center justify-center ${
                isCompleted
                  ? 'bg-gradient-to-br from-emerald-400 to-emerald-500 shadow-lg shadow-emerald-500/30'
                  : isLast
                    ? 'bg-gradient-to-br from-blue-400 to-blue-500 shadow-lg shadow-blue-500/30 animate-pulse'
                    : 'bg-white border-2 border-slate-300'
              }`}>
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                ) : isLast ? (
                  <Activity className="w-3.5 h-3.5 text-white" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                )}
              </div>
              <div className={`flex-1 p-4 rounded-2xl bg-white border ${isLast ? 'border-blue-200 shadow-lg shadow-blue-500/5' : 'border-slate-200'} hover:shadow-md transition-all`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${colors.text}`} />
                    <span className={`font-semibold text-sm ${colors.text}`}>{faseProcessoLabels[item.fase]}</span>
                  </div>
                  {isCompleted && (
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Concluído
                    </span>
                  )}
                  {isLast && !isCompleted && (
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                      Em andamento
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatarData(item.dataInicio)}
                  </span>
                  {item.dataFim && (
                    <span className="flex items-center gap-1">
                      → {formatarData(item.dataFim)}
                    </span>
                  )}
                  {item.responsavel && (
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {item.responsavel}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Componente de Card de Processo Premium
const ProcessoCard = ({
  processo,
  onClick
}: {
  processo: ProcessoLicitatorio;
  onClick: () => void;
}) => {
  const faseColors = faseProcessoColors[processo.faseAtual];
  const FaseIcon = faseIcons[processo.faseAtual];
  const progressPercent = (processo.timeline.filter(t => t.dataFim).length / processo.timeline.length) * 100;

  return (
    <div
      onClick={onClick}
      className="group relative bg-white rounded-2xl border border-slate-200/60 p-6 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Barra de progresso no topo */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-500 transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Decoração de fundo */}
      <div className="absolute top-0 right-0 w-40 h-40 transform translate-x-16 -translate-y-16">
        <div className={`w-full h-full rounded-full ${faseColors.bg} opacity-30 group-hover:opacity-50 transition-opacity`}></div>
      </div>

      <div className="relative pt-2">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${faseColors.bg} shadow-sm`}>
              <FaseIcon className={`w-5 h-5 ${faseColors.text}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-slate-900">{processo.numero}</span>
              </div>
              <p className="text-sm text-slate-500">{processo.modalidade}</p>
            </div>
          </div>
          <StatusBadgePremium status={processo.faseAtual} />
        </div>

        {/* Objeto */}
        <h3 className="font-semibold text-slate-800 mb-4 line-clamp-2 group-hover:text-blue-700 transition-colors">
          {processo.objeto}
        </h3>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
            <CreditCard className="w-4 h-4 text-slate-400" />
            <div>
              <p className="text-xs text-slate-500">Valor Estimado</p>
              <p className="font-semibold text-slate-800">{formatarMoeda(processo.valorEstimado)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
            <Clock className="w-4 h-4 text-slate-400" />
            <div>
              <p className="text-xs text-slate-500">Atualizado</p>
              <p className="font-semibold text-slate-800">{formatarData(processo.atualizadoEm)}</p>
            </div>
          </div>
        </div>

        {/* Progress mini */}
        <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl">
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-500">Progresso do processo</span>
              <span className="font-semibold text-slate-700">{Math.round(progressPercent)}%</span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </div>
  );
};

// Componente de Detalhe da Proposta Premium
const DetalhesProposta = ({ processo }: { processo: ProcessoLicitatorio }) => {
  const propostas = processo.propostas || [];

  if (propostas.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Package className="w-10 h-10 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-700 mb-2">Nenhuma proposta recebida</h3>
        <p className="text-slate-500">As propostas aparecerão aqui quando forem enviadas</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {propostas.map((proposta, index) => (
        <div key={proposta.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all">
          {/* Header da Proposta */}
          <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/25">
                  {index + 1}º
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{proposta.fornecedor.razaoSocial}</h4>
                  <p className="text-sm text-slate-500">CNPJ: {proposta.fornecedor.cnpj}</p>
                </div>
              </div>
              <span className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                proposta.status === 'aceita'
                  ? 'bg-emerald-100 text-emerald-700'
                  : proposta.status === 'recusada'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-blue-100 text-blue-700'
              }`}>
                {proposta.status === 'aceita' ? '✓ Aceita' : proposta.status === 'recusada' ? '✗ Recusada' : '◉ Em Análise'}
              </span>
            </div>
          </div>

          <div className="p-6">
            {/* Valores */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-slate-50 rounded-2xl">
                <p className="text-xs text-slate-500 mb-1">Valor Inicial</p>
                <p className="text-lg font-bold text-slate-700">{formatarMoeda(proposta.valorInicial)}</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border border-emerald-100">
                <p className="text-xs text-emerald-600 mb-1">Valor Final</p>
                <p className="text-xl font-bold text-emerald-700">{formatarMoeda(proposta.valorFinal)}</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                <p className="text-xs text-blue-600 mb-1">Desconto</p>
                <p className="text-xl font-bold text-blue-700">{proposta.descontoPercentual.toFixed(1)}%</p>
              </div>
            </div>

            {/* Verificações */}
            <h5 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-slate-500" />
              Verificações Automáticas
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <VerificacaoCard
                titulo="Assinatura Digital"
                status={proposta.assinaturaDigital.valida ? 'aprovado' : 'reprovado'}
                icone={FileCheck}
                detalhes={proposta.assinaturaDigital.certificado}
                tempo="0.8s"
              />
              <VerificacaoCard
                titulo="Catálogo Técnico"
                status={proposta.verificacaoCatalogo.conforme ? 'aprovado' : 'reprovado'}
                icone={Package}
                detalhes={`${proposta.verificacaoCatalogo.fabricanteInformado}`}
                tempo="1.2s"
              />
              <VerificacaoCard
                titulo="Poderes de Assinatura"
                status={proposta.verificacaoPoderes.possuiPoderes ? 'aprovado' : 'reprovado'}
                icone={Users}
                detalhes={proposta.verificacaoPoderes.tipoDocumento.replace('_', ' ')}
                tempo="0.5s"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Componente de Detalhe da Habilitação Premium
const DetalhesHabilitacao = ({ processo }: { processo: ProcessoLicitatorio }) => {
  const habilitacoes = processo.habilitacoes || [];

  if (habilitacoes.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Shield className="w-10 h-10 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-700 mb-2">Nenhuma habilitação em análise</h3>
        <p className="text-slate-500">Os dados de habilitação aparecerão após a fase de propostas</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {habilitacoes.map((hab) => (
        <div key={hab.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4 border-b border-emerald-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg shadow-emerald-500/25">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{hab.fornecedor.razaoSocial}</h4>
                  <p className="text-sm text-slate-500">CNPJ: {hab.fornecedor.cnpj}</p>
                </div>
              </div>
              <span className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                hab.status === 'habilitado'
                  ? 'bg-emerald-100 text-emerald-700'
                  : hab.status === 'inabilitado'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-blue-100 text-blue-700'
              }`}>
                {hab.status === 'habilitado' ? '✓ Habilitado' : hab.status === 'inabilitado' ? '✗ Inabilitado' : '◉ Em Análise'}
              </span>
            </div>
          </div>

          <div className="p-6 space-y-8">
            {/* Consulta Penalidades */}
            <div>
              <h5 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <AlertOctagon className="w-5 h-5 text-slate-500" />
                Consulta de Penalidades
              </h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {hab.consultasPenalidades.map((consulta, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      consulta.possuiRestricao
                        ? 'bg-red-50 border-red-200 hover:shadow-lg hover:shadow-red-500/10'
                        : 'bg-emerald-50 border-emerald-200 hover:shadow-lg hover:shadow-emerald-500/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm">{consulta.sistema}</span>
                      {consulta.possuiRestricao ? (
                        <XCircle className="w-5 h-5 text-red-600" />
                      ) : (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      )}
                    </div>
                    <p className={`text-xs font-medium ${consulta.possuiRestricao ? 'text-red-600' : 'text-emerald-600'}`}>
                      {consulta.possuiRestricao ? 'Restrição encontrada' : 'Sem restrições'}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {formatarData(consulta.consultadoEm)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certidões */}
            <div>
              <h5 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-slate-500" />
                Certidões Fiscais e Trabalhistas
              </h5>
              <div className="bg-slate-50 rounded-2xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Certidão</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Emissão</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Validade</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {hab.certidoesFiscais.map((cert, idx) => (
                      <tr key={idx} className="hover:bg-white transition-colors">
                        <td className="px-4 py-3">
                          <span className="font-medium text-slate-800">{cert.nome}</span>
                        </td>
                        <td className="px-4 py-3 text-slate-600">{formatarData(cert.dataEmissao)}</td>
                        <td className="px-4 py-3 text-slate-600">{formatarData(cert.dataValidade)}</td>
                        <td className="px-4 py-3 text-center">
                          {cert.valida ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Válida
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                              <XCircle className="w-3.5 h-3.5" /> Vencida
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Índices Financeiros */}
            <div>
              <h5 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-slate-500" />
                Qualificação Econômico-Financeira
              </h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Liquidez Geral', value: hab.qualificacaoEconomica.indicesFinanceiros.liquidezGeral, min: 1 },
                  { label: 'Liquidez Corrente', value: hab.qualificacaoEconomica.indicesFinanceiros.liquidezCorrente, min: 1 },
                  { label: 'Solvência Geral', value: hab.qualificacaoEconomica.indicesFinanceiros.solvenciaGeral, min: 1 },
                ].map((item, idx) => (
                  <div key={idx} className={`p-4 rounded-2xl text-center ${
                    item.value >= item.min
                      ? 'bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200'
                      : 'bg-gradient-to-br from-red-50 to-rose-50 border border-red-200'
                  }`}>
                    <p className="text-xs text-slate-500 mb-1">{item.label}</p>
                    <p className={`text-2xl font-bold ${item.value >= item.min ? 'text-emerald-600' : 'text-red-600'}`}>
                      {item.value.toFixed(2)}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">Mínimo: {item.min.toFixed(2)}</p>
                  </div>
                ))}
                <div className={`p-4 rounded-2xl text-center ${
                  hab.qualificacaoEconomica.indicesFinanceiros.atendeMinimoEdital
                    ? 'bg-gradient-to-br from-emerald-100 to-green-100 border-2 border-emerald-300'
                    : 'bg-gradient-to-br from-red-100 to-rose-100 border-2 border-red-300'
                }`}>
                  <p className="text-xs text-slate-600 mb-1 font-medium">Atende Edital</p>
                  <div className="flex items-center justify-center gap-2">
                    {hab.qualificacaoEconomica.indicesFinanceiros.atendeMinimoEdital ? (
                      <>
                        <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                        <span className="text-xl font-bold text-emerald-600">SIM</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-8 h-8 text-red-600" />
                        <span className="text-xl font-bold text-red-600">NÃO</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Componente de Detalhe do Julgamento Premium
const DetalhesJulgamento = ({ processo }: { processo: ProcessoLicitatorio }) => {
  const julgamentos = processo.julgamentos || [];

  if (julgamentos.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Scale className="w-10 h-10 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-700 mb-2">Nenhum julgamento realizado</h3>
        <p className="text-slate-500">O julgamento será exibido após a fase de habilitação</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {julgamentos.map((julg) => {
        const riscoColors: Record<NivelRisco, string> = {
          baixo: 'from-emerald-500 to-green-500',
          medio: 'from-amber-500 to-yellow-500',
          alto: 'from-orange-500 to-red-500',
          critico: 'from-red-600 to-rose-600'
        };

        return (
          <div key={julg.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            {/* Header com Classificação */}
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 px-6 py-4 border-b border-indigo-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${
                    julg.posicaoClassificacao === 1
                      ? 'from-amber-400 to-amber-500 shadow-lg shadow-amber-500/30'
                      : 'from-slate-400 to-slate-500 shadow-lg shadow-slate-500/20'
                  } flex items-center justify-center`}>
                    <span className="text-white font-bold text-xl">{julg.posicaoClassificacao}º</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{julg.fornecedor.razaoSocial}</h4>
                    <p className="text-sm text-slate-500">CNPJ: {julg.fornecedor.cnpj}</p>
                  </div>
                </div>
                <span className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                  julg.status === 'classificado'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {julg.status === 'classificado' ? '✓ Classificado' : '✗ Desclassificado'}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Análise de Exequibilidade */}
              <div className={`p-6 rounded-2xl bg-gradient-to-br ${nivelRiscoColors[julg.analiseExequibilidade.nivelRisco].bg} border ${nivelRiscoColors[julg.analiseExequibilidade.nivelRisco].border}`}>
                <div className="flex items-center justify-between mb-4">
                  <h5 className="font-semibold text-slate-800 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Análise de Exequibilidade
                  </h5>
                  <span className={`px-4 py-1.5 rounded-full text-sm font-bold bg-gradient-to-r ${riscoColors[julg.analiseExequibilidade.nivelRisco]} text-white shadow-lg`}>
                    Risco {nivelRiscoLabels[julg.analiseExequibilidade.nivelRisco]}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-white/80 rounded-xl">
                    <p className="text-xs text-slate-500 mb-1">Preço Ofertado</p>
                    <p className="text-xl font-bold text-slate-800">{formatarMoeda(julg.analiseExequibilidade.precoOfertado)}</p>
                  </div>
                  <div className="text-center p-4 bg-white/80 rounded-xl">
                    <p className="text-xs text-slate-500 mb-1">Preço Médio Mercado</p>
                    <p className="text-xl font-bold text-slate-800">{formatarMoeda(julg.analiseExequibilidade.precoMedioMercado)}</p>
                  </div>
                  <div className="text-center p-4 bg-white/80 rounded-xl">
                    <p className="text-xs text-slate-500 mb-1">% Abaixo da Média</p>
                    <p className={`text-xl font-bold ${
                      julg.analiseExequibilidade.percentualAbaixoMedia > 20 ? 'text-red-600' : 'text-emerald-600'
                    }`}>
                      {julg.analiseExequibilidade.percentualAbaixoMedia.toFixed(1)}%
                    </p>
                  </div>
                </div>

                {julg.analiseExequibilidade.justificativa && (
                  <div className="mt-4 p-4 bg-white/80 rounded-xl">
                    <p className="text-sm text-slate-600">
                      <strong className="text-slate-800">Parecer IA:</strong> {julg.analiseExequibilidade.justificativa}
                    </p>
                  </div>
                )}
              </div>

              {/* Pesquisas de Preço */}
              <div>
                <h5 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Search className="w-5 h-5 text-slate-500" />
                  Pesquisas de Preços Realizadas
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {julg.pesquisasPrecos.map((pesq, idx) => (
                    <div key={idx} className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200 hover:shadow-lg transition-all">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-blue-500" />
                        <span className="font-medium text-sm text-slate-700">{pesq.fonte}</span>
                      </div>
                      <p className="text-2xl font-bold text-slate-800 mb-1">{formatarMoeda(pesq.precoEncontrado)}</p>
                      <p className="text-xs text-slate-500">{formatarData(pesq.dataConsulta)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Componente de Detalhe dos Recursos Premium
const DetalhesRecursos = ({ processo }: { processo: ProcessoLicitatorio }) => {
  const recursos = processo.recursos || [];

  if (recursos.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Gavel className="w-10 h-10 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-700 mb-2">Nenhum recurso protocolado</h3>
        <p className="text-slate-500">Os recursos serão exibidos quando forem protocolados</p>
      </div>
    );
  }

  const statusColors: Record<string, { bg: string; text: string; icon: any }> = {
    protocolado: { bg: 'bg-blue-100', text: 'text-blue-700', icon: FileText },
    em_analise: { bg: 'bg-amber-100', text: 'text-amber-700', icon: Clock },
    deferido: { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: ThumbsUp },
    indeferido: { bg: 'bg-red-100', text: 'text-red-700', icon: ThumbsDown },
    desistencia: { bg: 'bg-slate-100', text: 'text-slate-600', icon: XCircle }
  };

  const tipoLabels: Record<string, string> = {
    recurso: 'Recurso',
    contrarrazao: 'Contrarrazão',
    impugnacao: 'Impugnação'
  };

  return (
    <div className="space-y-6">
      {/* Resumo de Recursos */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-xl">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-blue-600">Total</p>
              <p className="text-2xl font-bold text-blue-700">{recursos.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-4 border border-amber-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-xl">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-amber-600">Em Análise</p>
              <p className="text-2xl font-bold text-amber-700">{recursos.filter(r => r.status === 'em_analise').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-4 border border-emerald-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-xl">
              <ThumbsUp className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-emerald-600">Deferidos</p>
              <p className="text-2xl font-bold text-emerald-700">{recursos.filter(r => r.status === 'deferido').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-4 border border-red-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-xl">
              <ThumbsDown className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-xs text-red-600">Indeferidos</p>
              <p className="text-2xl font-bold text-red-700">{recursos.filter(r => r.status === 'indeferido').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Recursos */}
      {recursos.map((recurso) => {
        const statusStyle = statusColors[recurso.status] || statusColors.protocolado;
        const StatusIcon = statusStyle.icon;

        return (
          <div key={recurso.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            {/* Header do Recurso */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-4 border-b border-amber-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow-lg shadow-amber-500/25">
                    <Gavel className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-amber-200 text-amber-800 text-xs font-semibold rounded-full">
                        {tipoLabels[recurso.tipo]}
                      </span>
                      <h4 className="font-bold text-slate-900">{recurso.fornecedor.razaoSocial}</h4>
                    </div>
                    <p className="text-sm text-slate-500">CNPJ: {recurso.fornecedor.cnpj}</p>
                  </div>
                </div>
                <span className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 ${statusStyle.bg} ${statusStyle.text}`}>
                  <StatusIcon className="w-4 h-4" />
                  {recurso.status === 'protocolado' ? 'Protocolado' :
                   recurso.status === 'em_analise' ? 'Em Análise' :
                   recurso.status === 'deferido' ? 'Deferido' :
                   recurso.status === 'indeferido' ? 'Indeferido' : 'Desistência'}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Informações de Prazo */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-slate-500" />
                    <span className="text-sm font-medium text-slate-600">Data Protocolo</span>
                  </div>
                  <p className="text-lg font-bold text-slate-800">{formatarData(recurso.dataProtocolo)}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-slate-500" />
                    <span className="text-sm font-medium text-slate-600">Prazo Legal</span>
                  </div>
                  <p className="text-lg font-bold text-slate-800">{formatarData(recurso.prazoLegal)}</p>
                </div>
                <div className={`p-4 rounded-2xl ${recurso.dentroPrazo ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className={`w-4 h-4 ${recurso.dentroPrazo ? 'text-emerald-600' : 'text-red-600'}`} />
                    <span className={`text-sm font-medium ${recurso.dentroPrazo ? 'text-emerald-600' : 'text-red-600'}`}>Status do Prazo</span>
                  </div>
                  <p className={`text-lg font-bold ${recurso.dentroPrazo ? 'text-emerald-700' : 'text-red-700'}`}>
                    {recurso.dentroPrazo ? '✓ Dentro do Prazo' : '✗ Fora do Prazo'}
                  </p>
                </div>
              </div>

              {/* Verificações */}
              <div>
                <h5 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-slate-500" />
                  Verificações do Documento
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <VerificacaoCard
                    titulo="Assinatura Digital"
                    status={recurso.assinaturaDigital.valida ? 'aprovado' : 'reprovado'}
                    icone={FileSignature}
                    detalhes={recurso.assinaturaDigital.certificado || 'Não informado'}
                    tempo="0.5s"
                  />
                  <VerificacaoCard
                    titulo="Poderes de Representação"
                    status={recurso.verificacaoPoderes.possuiPoderes ? 'aprovado' : 'reprovado'}
                    icone={BadgeCheck}
                    detalhes={recurso.verificacaoPoderes.tipoDocumento.replace('_', ' ')}
                    tempo="0.3s"
                  />
                </div>
              </div>

              {/* Resumo das Alegações */}
              <div>
                <h5 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-slate-500" />
                  Resumo das Alegações
                </h5>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <p className="text-slate-700 leading-relaxed">{recurso.resumoAlegacoes}</p>
                  {recurso.fundamentacaoLegal && (
                    <p className="mt-3 text-sm text-slate-500">
                      <strong>Fundamentação Legal:</strong> {recurso.fundamentacaoLegal}
                    </p>
                  )}
                </div>
              </div>

              {/* Pré-Julgamento IA */}
              {recurso.preJulgamentoIA && (
                <div>
                  <h5 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-violet-500" />
                    Análise Preditiva (IA)
                  </h5>
                  <div className="p-6 bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl border border-violet-200">
                    {/* Probabilidade */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-violet-700">Probabilidade de Provimento</span>
                      <span className={`text-2xl font-bold ${
                        recurso.preJulgamentoIA.probabilidadeProvimento > 60 ? 'text-emerald-600' :
                        recurso.preJulgamentoIA.probabilidadeProvimento > 30 ? 'text-amber-600' : 'text-red-600'
                      }`}>
                        {recurso.preJulgamentoIA.probabilidadeProvimento}%
                      </span>
                    </div>
                    <div className="h-3 bg-white rounded-full overflow-hidden mb-6">
                      <div
                        className={`h-full rounded-full transition-all ${
                          recurso.preJulgamentoIA.probabilidadeProvimento > 60 ? 'bg-emerald-500' :
                          recurso.preJulgamentoIA.probabilidadeProvimento > 30 ? 'bg-amber-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${recurso.preJulgamentoIA.probabilidadeProvimento}%` }}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Pontos Fortes */}
                      <div className="p-4 bg-white rounded-xl">
                        <h6 className="text-sm font-semibold text-emerald-700 mb-3 flex items-center gap-2">
                          <ThumbsUp className="w-4 h-4" />
                          Pontos Fortes
                        </h6>
                        <ul className="space-y-2">
                          {recurso.preJulgamentoIA.pontosFortes.map((ponto, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                              {ponto}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Pontos Fracos */}
                      <div className="p-4 bg-white rounded-xl">
                        <h6 className="text-sm font-semibold text-red-700 mb-3 flex items-center gap-2">
                          <ThumbsDown className="w-4 h-4" />
                          Pontos Fracos
                        </h6>
                        <ul className="space-y-2">
                          {recurso.preJulgamentoIA.pontosFracos.map((ponto, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                              <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                              {ponto}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {recurso.preJulgamentoIA.sugestaoResposta && (
                      <div className="mt-4 p-4 bg-white rounded-xl">
                        <h6 className="text-sm font-semibold text-violet-700 mb-2">Sugestão de Resposta</h6>
                        <p className="text-sm text-slate-600">{recurso.preJulgamentoIA.sugestaoResposta}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Decisão Final */}
              {recurso.parecerFinal && (
                <div className={`p-4 rounded-2xl border-2 ${
                  recurso.status === 'deferido' ? 'bg-emerald-50 border-emerald-300' :
                  recurso.status === 'indeferido' ? 'bg-red-50 border-red-300' :
                  'bg-slate-50 border-slate-300'
                }`}>
                  <h5 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                    <Stamp className="w-5 h-5" />
                    Decisão Final
                  </h5>
                  <p className="text-slate-700">{recurso.parecerFinal}</p>
                  {recurso.analisadoPor && recurso.dataDecisao && (
                    <p className="mt-2 text-sm text-slate-500">
                      Analisado por {recurso.analisadoPor} em {formatarDataHora(recurso.dataDecisao)}
                    </p>
                  )}
                </div>
              )}

              {/* Timeline do Recurso */}
              {recurso.historico && recurso.historico.length > 0 && (
                <div>
                  <h5 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-slate-500" />
                    Histórico do Recurso
                  </h5>
                  <div className="space-y-3">
                    {recurso.historico.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-3 bg-slate-50 rounded-xl">
                        <div className="w-2 h-2 rounded-full bg-amber-500 mt-2"></div>
                        <div className="flex-1">
                          <p className="font-medium text-slate-800">{item.acao}</p>
                          <p className="text-sm text-slate-500">
                            {item.responsavel && `${item.responsavel} • `}{formatarDataHora(item.data)}
                          </p>
                          {item.observacao && (
                            <p className="text-sm text-slate-600 mt-1">{item.observacao}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Componente de Detalhe da Adjudicação Premium
const DetalhesAdjudicacao = ({ processo }: { processo: ProcessoLicitatorio }) => {
  const adjudicacao = processo.adjudicacao;

  if (!adjudicacao) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Award className="w-10 h-10 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-700 mb-2">Processo não adjudicado</h3>
        <p className="text-slate-500">A adjudicação será exibida após a fase de recursos</p>
      </div>
    );
  }

  const statusColors: Record<string, { bg: string; text: string; gradient: string }> = {
    pendente: { bg: 'bg-slate-100', text: 'text-slate-700', gradient: 'from-slate-400 to-slate-500' },
    check_up: { bg: 'bg-amber-100', text: 'text-amber-700', gradient: 'from-amber-400 to-amber-500' },
    adjudicado: { bg: 'bg-blue-100', text: 'text-blue-700', gradient: 'from-blue-400 to-blue-500' },
    homologado: { bg: 'bg-emerald-100', text: 'text-emerald-700', gradient: 'from-emerald-400 to-emerald-500' },
    anulado: { bg: 'bg-red-100', text: 'text-red-700', gradient: 'from-red-400 to-red-500' },
    revogado: { bg: 'bg-orange-100', text: 'text-orange-700', gradient: 'from-orange-400 to-orange-500' }
  };

  const statusStyle = statusColors[adjudicacao.status] || statusColors.pendente;

  const statusLabels: Record<string, string> = {
    pendente: 'Pendente',
    check_up: 'Em Check-up',
    adjudicado: 'Adjudicado',
    homologado: 'Homologado',
    anulado: 'Anulado',
    revogado: 'Revogado'
  };

  return (
    <div className="space-y-6">
      {/* Card Principal */}
      <div className="relative overflow-hidden bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-700 rounded-2xl p-8 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>

        <div className="relative">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 backdrop-blur rounded-xl">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Adjudicação e Homologação</h2>
                <p className="text-teal-100">Processo {processo.numero}</p>
              </div>
            </div>
            <span className={`px-4 py-2 rounded-xl text-sm font-bold bg-white/20 backdrop-blur`}>
              {statusLabels[adjudicacao.status]}
            </span>
          </div>

          {/* Fornecedor Vencedor */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-6">
            <h3 className="text-sm text-teal-200 mb-2">Fornecedor Vencedor</h3>
            <p className="text-xl font-bold">{adjudicacao.fornecedorVencedor.razaoSocial}</p>
            <p className="text-teal-100">CNPJ: {adjudicacao.fornecedorVencedor.cnpj}</p>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <p className="text-teal-200 text-xs mb-1">Valor Adjudicado</p>
              <p className="text-xl font-bold">{formatarMoeda(adjudicacao.valorAdjudicado)}</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <p className="text-teal-200 text-xs mb-1">Data Adjudicação</p>
              <p className="text-lg font-semibold">
                {adjudicacao.dataAdjudicacao ? formatarData(adjudicacao.dataAdjudicacao) : 'Pendente'}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <p className="text-teal-200 text-xs mb-1">Data Homologação</p>
              <p className="text-lg font-semibold">
                {adjudicacao.dataHomologacao ? formatarData(adjudicacao.dataHomologacao) : 'Pendente'}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <p className="text-teal-200 text-xs mb-1">Economia</p>
              <p className="text-xl font-bold text-emerald-300">
                {((1 - adjudicacao.valorAdjudicado / processo.valorEstimado) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Check-up Pré-Homologação */}
      {adjudicacao.checkUp && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200">
            <h4 className="font-semibold text-slate-800 flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5 text-amber-600" />
              Check-up Pré-Homologação
              {adjudicacao.checkUp.aprovadoParaHomologacao ? (
                <span className="ml-auto px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                  ✓ Aprovado
                </span>
              ) : (
                <span className="ml-auto px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                  ✗ Pendências
                </span>
              )}
            </h4>
          </div>

          <div className="p-6 space-y-6">
            {/* Verificações por Categoria */}
            <div>
              <h5 className="font-medium text-slate-700 mb-4">Verificações Realizadas</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {adjudicacao.checkUp.verificacoes.map((verif, idx) => {
                  const statusBg = verif.status === 'ok' ? 'bg-emerald-50 border-emerald-200' :
                                   verif.status === 'alerta' ? 'bg-amber-50 border-amber-200' :
                                   'bg-red-50 border-red-200';
                  const statusIcon = verif.status === 'ok' ? CheckCircle2 :
                                     verif.status === 'alerta' ? AlertTriangle : XCircle;
                  const StatusIcon = statusIcon;
                  const statusColor = verif.status === 'ok' ? 'text-emerald-600' :
                                      verif.status === 'alerta' ? 'text-amber-600' : 'text-red-600';

                  const categoriaLabels: Record<string, string> = {
                    juridica: 'Jurídica',
                    fiscal: 'Fiscal',
                    tecnica: 'Técnica',
                    processual: 'Processual'
                  };

                  return (
                    <div key={idx} className={`p-4 rounded-xl border ${statusBg}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <StatusIcon className={`w-5 h-5 ${statusColor}`} />
                          <div>
                            <p className="font-medium text-slate-800">{verif.item}</p>
                            <span className="text-xs text-slate-500">{categoriaLabels[verif.categoria]}</span>
                          </div>
                        </div>
                      </div>
                      {verif.observacao && (
                        <p className="mt-2 text-sm text-slate-600 pl-8">{verif.observacao}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Irregularidades */}
            {adjudicacao.checkUp.irregularidadesEncontradas.length > 0 && (
              <div>
                <h5 className="font-medium text-red-700 mb-4 flex items-center gap-2">
                  <AlertOctagon className="w-5 h-5" />
                  Irregularidades Encontradas
                </h5>
                <div className="space-y-3">
                  {adjudicacao.checkUp.irregularidadesEncontradas.map((irreg, idx) => {
                    const riscoStyle = nivelRiscoColors[irreg.gravidade];
                    return (
                      <div key={idx} className={`p-4 rounded-xl border-2 ${riscoStyle.border} ${riscoStyle.bg}`}>
                        <div className="flex items-start justify-between mb-2">
                          <p className="font-medium text-slate-800">{irreg.descricao}</p>
                          <span className={`px-2 py-0.5 rounded text-xs font-semibold ${riscoStyle.text}`}>
                            Risco {nivelRiscoLabels[irreg.gravidade]}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600">
                          <strong>Recomendação:</strong> {irreg.recomendacao}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Parecer Final */}
            <div className={`p-4 rounded-2xl ${
              adjudicacao.checkUp.aprovadoParaHomologacao
                ? 'bg-emerald-50 border-2 border-emerald-200'
                : 'bg-amber-50 border-2 border-amber-200'
            }`}>
              <h5 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Parecer Final do Check-up
              </h5>
              <p className="text-slate-700">{adjudicacao.checkUp.parecerFinal}</p>
              <p className="mt-2 text-sm text-slate-500">
                Responsável: {adjudicacao.checkUp.responsavel} • {formatarData(adjudicacao.checkUp.dataRealizacao)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Documentos */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <FileSignature className="w-5 h-5 text-slate-500" />
          Documentos Gerados
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-4 rounded-xl border-2 ${
            adjudicacao.termoAdjudicacao ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${adjudicacao.termoAdjudicacao ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                  <Stamp className={`w-5 h-5 ${adjudicacao.termoAdjudicacao ? 'text-emerald-600' : 'text-slate-400'}`} />
                </div>
                <div>
                  <p className="font-medium text-slate-800">Termo de Adjudicação</p>
                  <p className="text-sm text-slate-500">
                    {adjudicacao.termoAdjudicacao ? 'Documento gerado' : 'Pendente'}
                  </p>
                </div>
              </div>
              {adjudicacao.termoAdjudicacao && (
                <button className="p-2 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors">
                  <Download className="w-4 h-4 text-emerald-600" />
                </button>
              )}
            </div>
          </div>

          <div className={`p-4 rounded-xl border-2 ${
            adjudicacao.termoHomologacao ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${adjudicacao.termoHomologacao ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                  <BadgeCheck className={`w-5 h-5 ${adjudicacao.termoHomologacao ? 'text-emerald-600' : 'text-slate-400'}`} />
                </div>
                <div>
                  <p className="font-medium text-slate-800">Termo de Homologação</p>
                  <p className="text-sm text-slate-500">
                    {adjudicacao.termoHomologacao ? 'Documento gerado' : 'Pendente'}
                  </p>
                </div>
              </div>
              {adjudicacao.termoHomologacao && (
                <button className="p-2 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors">
                  <Download className="w-4 h-4 text-emerald-600" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Trilha de Auditoria */}
      {adjudicacao.trilhaAuditoria && adjudicacao.trilhaAuditoria.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-slate-500" />
            Trilha de Auditoria
          </h4>
          <div className="space-y-3">
            {adjudicacao.trilhaAuditoria.slice().reverse().map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <div className="w-2 h-2 rounded-full bg-teal-500 mt-2"></div>
                <div className="flex-1">
                  <p className="font-medium text-slate-800">{item.acao}</p>
                  <p className="text-sm text-slate-500">{item.responsavel} • {formatarDataHora(item.data)}</p>
                  {item.detalhes && (
                    <p className="text-sm text-slate-600 mt-1">{item.detalhes}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Componente de Detalhe do Contrato Premium
const DetalhesContrato = ({ processo }: { processo: ProcessoLicitatorio }) => {
  const contrato = processo.contrato;

  if (!contrato) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Building2 className="w-10 h-10 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-700 mb-2">Nenhum contrato formalizado</h3>
        <p className="text-slate-500">O contrato será exibido após a homologação</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Card Principal do Contrato */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 rounded-2xl p-8 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>

        <div className="relative">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Hash className="w-5 h-5 text-emerald-200" />
                <span className="text-2xl font-bold">{contrato.numero}</span>
              </div>
              <p className="text-emerald-100">{contrato.fornecedor.razaoSocial}</p>
            </div>
            <span className={`px-4 py-2 rounded-xl text-sm font-bold ${
              contrato.status === 'vigente'
                ? 'bg-white/20 text-white'
                : 'bg-amber-400/20 text-amber-100'
            }`}>
              {contrato.status === 'vigente' ? '● Vigente' : '○ ' + contrato.status}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <p className="text-emerald-200 text-xs mb-1">Valor Total</p>
              <p className="text-xl font-bold">{formatarMoeda(contrato.valorTotal)}</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <p className="text-emerald-200 text-xs mb-1">Executado</p>
              <p className="text-xl font-bold">{formatarMoeda(contrato.valorExecutado)}</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <p className="text-emerald-200 text-xs mb-1">Vigência</p>
              <p className="text-sm font-semibold">{formatarData(contrato.dataInicioVigencia)}</p>
              <p className="text-xs text-emerald-200">até {formatarData(contrato.dataFimVigencia)}</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <p className="text-emerald-200 text-xs mb-1">Fiscal</p>
              <p className="text-sm font-semibold">{contrato.fiscalContrato}</p>
            </div>
          </div>

          {/* Barra de Execução */}
          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-emerald-100">Execução Financeira</span>
              <span className="font-bold">{contrato.percentualExecutado.toFixed(1)}%</span>
            </div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-white/80 to-white rounded-full transition-all duration-500"
                style={{ width: `${contrato.percentualExecutado}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Entregas */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
          <h4 className="font-semibold text-slate-800 flex items-center gap-2">
            <Truck className="w-5 h-5 text-slate-500" />
            Entregas / Parcelas
          </h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">#</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Descrição</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Previsão</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Entrega</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Valor</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {contrato.entregas.map((entrega) => (
                <tr key={entrega.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-4">
                    <span className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-sm font-bold text-slate-600">
                      {entrega.numero}
                    </span>
                  </td>
                  <td className="px-4 py-4 font-medium text-slate-800">{entrega.descricao}</td>
                  <td className="px-4 py-4 text-slate-600">{formatarData(entrega.dataPrevista)}</td>
                  <td className="px-4 py-4 text-slate-600">{entrega.dataEntrega ? formatarData(entrega.dataEntrega) : '—'}</td>
                  <td className="px-4 py-4 text-right font-semibold text-slate-800">{formatarMoeda(entrega.valorParcela)}</td>
                  <td className="px-4 py-4 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                      entrega.status === 'entregue'
                        ? 'bg-emerald-100 text-emerald-700'
                        : entrega.status === 'atrasada'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-slate-100 text-slate-600'
                    }`}>
                      {entrega.status === 'entregue' && <CheckCircle2 className="w-3.5 h-3.5" />}
                      {entrega.status === 'atrasada' && <AlertTriangle className="w-3.5 h-3.5" />}
                      {entrega.status === 'pendente' && <Clock className="w-3.5 h-3.5" />}
                      {entrega.status.charAt(0).toUpperCase() + entrega.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trilha de Auditoria */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-slate-500" />
          Trilha de Auditoria
        </h4>
        <div className="space-y-3">
          {contrato.trilhaAuditoria.slice(-5).reverse().map((item, idx) => (
            <div key={idx} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2"></div>
              <div className="flex-1">
                <p className="font-medium text-slate-800">{item.acao}</p>
                <p className="text-sm text-slate-500">{item.responsavel} • {formatarDataHora(item.data)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Componente Principal
interface ModuloComplianceProps {
  userName: string;
}

export function ModuloCompliance({ userName }: ModuloComplianceProps) {
  const [processos, setProcessos] = useState<ProcessoLicitatorio[]>([]);
  const [processoSelecionado, setProcessoSelecionado] = useState<ProcessoLicitatorio | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filtroFase, setFiltroFase] = useState<FaseProcesso | 'todos'>('todos');
  const [abaAtiva, setAbaAtiva] = useState<'timeline' | 'proposta' | 'habilitacao' | 'julgamento' | 'recursos' | 'adjudicacao' | 'contrato'>('timeline');

  // Carregar processos
  useEffect(() => {
    carregarProcessosExemplo();
    setProcessos(loadProcessos());
  }, []);

  // Filtrar processos
  const processosFiltrados = processos.filter(proc => {
    const matchSearch = proc.numero.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proc.objeto.toLowerCase().includes(searchQuery.toLowerCase());
    const matchFase = filtroFase === 'todos' || proc.faseAtual === filtroFase;
    return matchSearch && matchFase;
  });

  // KPIs
  const totalProcessos = processos.length;
  const emAndamento = processos.filter(p => !['encerrado', 'contrato'].includes(p.faseAtual)).length;
  const contratosVigentes = processos.filter(p => p.faseAtual === 'contrato').length;
  const valorTotal = processos.reduce((acc, p) => acc + p.valorEstimado, 0);

  return (
    <div className="space-y-6">
      {/* VIEW: Lista de Processos */}
      {!processoSelecionado ? (
        <>
          {/* Header Premium */}
          <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-800 rounded-2xl p-8 text-white">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold mb-1">Compliance Pós-Licitação</h1>
                  <p className="text-emerald-100">Análise e acompanhamento de processos licitatórios</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-xl">
                    <Activity className="w-4 h-4 text-emerald-300" />
                    <span className="text-sm font-medium">Sistema Online</span>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur rounded-xl p-4 hover:bg-white/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-emerald-100 text-xs">Total Processos</p>
                      <p className="text-2xl font-bold">{totalProcessos}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-4 hover:bg-white/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <RefreshCw className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-emerald-100 text-xs">Em Andamento</p>
                      <p className="text-2xl font-bold">{emAndamento}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-4 hover:bg-white/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-emerald-100 text-xs">Contratos Vigentes</p>
                      <p className="text-2xl font-bold">{contratosVigentes}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-4 hover:bg-white/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-emerald-100 text-xs">Valor Total</p>
                      <p className="text-lg font-bold">{formatarMoeda(valorTotal)}</p>
                    </div>
                  </div>
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
                  placeholder="Buscar por número ou objeto..."
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border-0 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-slate-400" />
                <select
                  className="px-4 py-3 bg-slate-50 border-0 rounded-xl focus:ring-2 focus:ring-emerald-500 text-sm font-medium text-slate-700 min-w-[180px]"
                  value={filtroFase}
                  onChange={(e) => setFiltroFase(e.target.value as FaseProcesso | 'todos')}
                >
                  <option value="todos">Todas as Fases</option>
                  <option value="aceitabilidade">Aceitabilidade</option>
                  <option value="habilitacao">Habilitação</option>
                  <option value="julgamento">Julgamento</option>
                  <option value="recursos">Recursos</option>
                  <option value="adjudicacao">Adjudicação</option>
                  <option value="contrato">Contrato</option>
                </select>
              </div>
            </div>
          </div>

          {/* Lista de Processos */}
          {processosFiltrados.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200/60 p-16 text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Nenhum processo encontrado</h3>
              <p className="text-slate-500">Ajuste os filtros ou aguarde novos processos</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {processosFiltrados.map((processo) => (
                <ProcessoCard
                  key={processo.id}
                  processo={processo}
                  onClick={() => setProcessoSelecionado(processo)}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        /* VIEW: Detalhes do Processo */
        <div className="space-y-6">
          {/* Header do Processo */}
          <div className="bg-white rounded-2xl border border-slate-200/60 p-6">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setProcessoSelecionado(null)}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium transition-colors"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                Voltar para lista
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium transition-colors">
                <Download className="w-4 h-4" />
                Exportar
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg shadow-emerald-500/25">
                <FileCheck className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-slate-900">{processoSelecionado.numero}</h1>
                  <StatusBadgePremium status={processoSelecionado.faseAtual} size="md" />
                </div>
                <p className="text-slate-500">{processoSelecionado.modalidade} • {formatarMoeda(processoSelecionado.valorEstimado)}</p>
              </div>
            </div>

            <p className="mt-4 text-slate-700 font-medium">{processoSelecionado.objeto}</p>
          </div>

          {/* Abas */}
          <div className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden">
            <div className="border-b border-slate-200 bg-slate-50">
              <div className="flex overflow-x-auto">
                {[
                  { id: 'timeline', label: 'Timeline', icon: Clock },
                  { id: 'proposta', label: 'Propostas', icon: FileText },
                  { id: 'habilitacao', label: 'Habilitação', icon: Shield },
                  { id: 'julgamento', label: 'Julgamento', icon: Scale },
                  { id: 'recursos', label: 'Recursos', icon: Gavel },
                  { id: 'adjudicacao', label: 'Adjudicação', icon: Award },
                  { id: 'contrato', label: 'Contrato', icon: Building2 }
                ].map((aba) => (
                  <button
                    key={aba.id}
                    onClick={() => setAbaAtiva(aba.id as any)}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                      abaAtiva === aba.id
                        ? 'border-emerald-500 text-emerald-600 bg-white'
                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-white/50'
                    }`}
                  >
                    <aba.icon className="w-4 h-4" />
                    {aba.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6">
              {abaAtiva === 'timeline' && <ProcessoTimeline timeline={processoSelecionado.timeline} />}
              {abaAtiva === 'proposta' && <DetalhesProposta processo={processoSelecionado} />}
              {abaAtiva === 'habilitacao' && <DetalhesHabilitacao processo={processoSelecionado} />}
              {abaAtiva === 'julgamento' && <DetalhesJulgamento processo={processoSelecionado} />}
              {abaAtiva === 'recursos' && <DetalhesRecursos processo={processoSelecionado} />}
              {abaAtiva === 'adjudicacao' && <DetalhesAdjudicacao processo={processoSelecionado} />}
              {abaAtiva === 'contrato' && <DetalhesContrato processo={processoSelecionado} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
