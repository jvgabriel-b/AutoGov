// Tipos para Módulos de Compliance (Fases 5-11 da Licitação)

// ============================================
// TIPOS COMUNS
// ============================================

export type StatusVerificacao = 'pendente' | 'em_analise' | 'aprovado' | 'reprovado' | 'alerta';

export type NivelRisco = 'baixo' | 'medio' | 'alto' | 'critico';

export interface ResultadoVerificacao {
  status: StatusVerificacao;
  dataVerificacao: string;
  observacoes?: string;
  documentoAnexo?: string;
}

export interface Fornecedor {
  id: string;
  cnpj: string;
  razaoSocial: string;
  nomeFantasia?: string;
  endereco: string;
  cidade: string;
  uf: string;
  cep: string;
  telefone?: string;
  email?: string;
  representanteLegal: string;
  cpfRepresentante: string;
}

// ============================================
// FASE 5 - ACEITABILIDADE DA PROPOSTA
// ============================================

export type StatusProposta = 'recebida' | 'em_analise' | 'aceita' | 'recusada' | 'diligencia';

export interface AssinaturaDigital {
  valida: boolean;
  certificado?: string;
  dataAssinatura?: string;
  cpfAssinante?: string;
  nomeAssinante?: string;
  cadeiaCertificacao?: string;
  verificadoEm: string;
  observacoes?: string;
}

export interface VerificacaoCatalogo {
  conforme: boolean;
  fabricanteInformado: string;
  fabricanteOficial?: string;
  modeloInformado: string;
  especificacoesConferem: boolean;
  divergencias?: string[];
  verificadoEm: string;
}

export interface VerificacaoPoderes {
  possuiPoderes: boolean;
  tipoDocumento: 'contrato_social' | 'procuracao' | 'estatuto' | 'outro';
  documentoAnexo?: string;
  dataVerificacao: string;
  observacoes?: string;
}

export interface PropostaComercial {
  id: string;
  numeroProcesso: string;
  fornecedor: Fornecedor;
  valorInicial: number;
  valorFinal: number;
  descontoPercentual: number;
  dataEnvio: string;
  arquivoPDF?: string;

  // Verificações
  assinaturaDigital: AssinaturaDigital;
  verificacaoCatalogo: VerificacaoCatalogo;
  verificacaoPoderes: VerificacaoPoderes;

  // Comparativo
  comparativoPropostaInicial: {
    modeloConfere: boolean;
    marcaConfere: boolean;
    especificacoesConferem: boolean;
    divergencias?: string[];
  };

  status: StatusProposta;
  observacoesGerais?: string;
  analisadoPor?: string;
  dataAnalise?: string;
}

// ============================================
// FASE 6 - HABILITAÇÃO
// ============================================

export type StatusHabilitacao = 'pendente' | 'em_analise' | 'habilitado' | 'inabilitado' | 'diligencia';

export interface ConsultaPenalidade {
  sistema: 'CEIS' | 'CNEP' | 'SICAF' | 'TCU';
  consultadoEm: string;
  possuiRestricao: boolean;
  detalhes?: string;
  linkConsulta?: string;
}

export interface CertidaoFiscal {
  tipo: 'federal' | 'estadual' | 'municipal' | 'fgts' | 'inss' | 'trabalhista';
  nome: string;
  numero?: string;
  dataEmissao: string;
  dataValidade: string;
  valida: boolean;
  arquivoAnexo?: string;
  verificadaEm?: string;
  observacoes?: string;
}

export interface AnaliseDocumento {
  tipo: string;
  nomeArquivo: string;
  hashOriginal?: string;
  hashVerificado?: string;
  integridadeOk: boolean;
  possivelAdulteracao: boolean;
  dataAnalise: string;
  detalhesOCR?: string;
}

export interface QualificacaoEconomica {
  balancoPatrimonial: {
    exercicio: string;
    ativoTotal: number;
    passivoTotal: number;
    patrimonioLiquido: number;
    arquivoAnexo?: string;
  };
  indicesFinanceiros: {
    liquidezGeral: number;
    liquidezCorrente: number;
    solvenciaGeral: number;
    atendeMinimoEdital: boolean;
  };
  certidaoFalencia: {
    possui: boolean;
    dataEmissao?: string;
    arquivoAnexo?: string;
  };
  capitalSocialMinimo?: {
    exigido: number;
    apresentado: number;
    atende: boolean;
  };
}

export interface QualificacaoTecnica {
  atestados: {
    id: string;
    emissor: string;
    cnpjEmissor: string;
    objetoAtestado: string;
    dataEmissao: string;
    notaFiscalVinculada?: string;
    valorContrato?: number;
    arquivoAnexo?: string;
    validado: boolean;
    observacoes?: string;
  }[];
  registroProfissional?: {
    conselho: string; // CREA, CAU, CRM, etc.
    numero: string;
    valido: boolean;
    arquivoAnexo?: string;
  };
  cnaeCompativel: {
    cnaeExigido: string[];
    cnaeEmpresa: string[];
    compativel: boolean;
  };
}

export interface Habilitacao {
  id: string;
  propostaId: string;
  fornecedor: Fornecedor;

  // Habilitação Jurídica
  habilitacaoJuridica: {
    contratoSocial: ResultadoVerificacao;
    cartaoCNPJ: ResultadoVerificacao;
    certidaoJuntaComercial: ResultadoVerificacao;
    documentosSocios: ResultadoVerificacao;
    procuracao?: ResultadoVerificacao;
  };

  // Consultas de Penalidades
  consultasPenalidades: ConsultaPenalidade[];

  // Certidões Fiscais e Trabalhistas
  certidoesFiscais: CertidaoFiscal[];

  // Análise de Integridade de Documentos
  analisesDocumentos: AnaliseDocumento[];

  // Qualificação Econômico-Financeira
  qualificacaoEconomica: QualificacaoEconomica;

  // Qualificação Técnica
  qualificacaoTecnica: QualificacaoTecnica;

  // Declarações
  declaracoes: {
    trabalhoMenor: ResultadoVerificacao;
    idoneidade: ResultadoVerificacao;
    nepotismo: ResultadoVerificacao;
    meEpp?: ResultadoVerificacao;
  };

  status: StatusHabilitacao;
  parecerFinal?: string;
  analisadoPor?: string;
  dataAnalise?: string;
}

// ============================================
// FASE 7 - JULGAMENTO
// ============================================

export type StatusJulgamento = 'pendente' | 'em_analise' | 'classificado' | 'desclassificado';

export interface PesquisaPreco {
  fonte: string;
  url?: string;
  precoEncontrado: number;
  dataConsulta: string;
  produtoReferencia: string;
}

export interface AnaliseExequibilidade {
  precoOfertado: number;
  precoMedioMercado: number;
  percentualAbaixoMedia: number;
  custosEstimados?: {
    produto: number;
    impostos: number;
    frete: number;
    outros: number;
    total: number;
  };
  nivelRisco: NivelRisco;
  exequivel: boolean;
  justificativa?: string;
}

export interface Julgamento {
  id: string;
  propostaId: string;
  habilitacaoId: string;
  fornecedor: Fornecedor;

  // Pesquisa de Preços
  pesquisasPrecos: PesquisaPreco[];
  precoMedioCalculado: number;

  // Análise de Exequibilidade
  analiseExequibilidade: AnaliseExequibilidade;

  // Classificação
  posicaoClassificacao: number;
  pontuacaoTecnica?: number; // Se for técnica e preço
  pontuacaoPreco: number;
  pontuacaoFinal: number;

  status: StatusJulgamento;
  motivoDesclassificacao?: string;
  analisadoPor?: string;
  dataAnalise?: string;
}

// ============================================
// FASE 8 - RECURSOS E CONTRARRAZÕES
// ============================================

export type StatusRecurso = 'protocolado' | 'em_analise' | 'deferido' | 'indeferido' | 'desistencia';

export type TipoRecurso = 'recurso' | 'contrarrazao' | 'impugnacao';

export interface Recurso {
  id: string;
  processoId: string;
  tipo: TipoRecurso;
  fornecedor: Fornecedor;

  // Protocolo
  dataProtocolo: string;
  prazoLegal: string; // 3 dias úteis
  dentroPrazo: boolean;

  // Documento
  arquivoPDF?: string;
  assinaturaDigital: AssinaturaDigital;
  verificacaoPoderes: VerificacaoPoderes;

  // Conteúdo
  resumoAlegacoes: string;
  fundamentacaoLegal?: string;

  // Análise
  preJulgamentoIA?: {
    probabilidadeProvimento: number;
    pontosFortes: string[];
    pontosFracos: string[];
    sugestaoResposta?: string;
  };

  // Decisão
  status: StatusRecurso;
  parecerFinal?: string;
  fundamentacaoDecisao?: string;
  analisadoPor?: string;
  dataDecisao?: string;

  // Linha do tempo
  historico: {
    data: string;
    acao: string;
    responsavel?: string;
    observacao?: string;
  }[];
}

// ============================================
// FASE 9 - ADJUDICAÇÃO E HOMOLOGAÇÃO
// ============================================

export type StatusAdjudicacao = 'pendente' | 'check_up' | 'adjudicado' | 'homologado' | 'anulado' | 'revogado';

export interface CheckUpPreHomologacao {
  id: string;
  processoId: string;
  dataRealizacao: string;

  verificacoes: {
    item: string;
    categoria: 'juridica' | 'fiscal' | 'tecnica' | 'processual';
    status: 'ok' | 'alerta' | 'bloqueio';
    observacao?: string;
  }[];

  irregularidadesEncontradas: {
    descricao: string;
    gravidade: NivelRisco;
    recomendacao: string;
  }[];

  aprovadoParaHomologacao: boolean;
  parecerFinal: string;
  responsavel: string;
}

export interface Adjudicacao {
  id: string;
  processoId: string;
  fornecedorVencedor: Fornecedor;
  valorAdjudicado: number;

  // Check-up
  checkUp: CheckUpPreHomologacao;

  // Adjudicação
  dataAdjudicacao?: string;
  responsavelAdjudicacao?: string;

  // Homologação
  dataHomologacao?: string;
  responsavelHomologacao?: string;

  // Documentos
  termoAdjudicacao?: string;
  termoHomologacao?: string;

  status: StatusAdjudicacao;

  // Trilha de Auditoria
  trilhaAuditoria: {
    data: string;
    acao: string;
    responsavel: string;
    ip?: string;
    detalhes?: string;
  }[];
}

// ============================================
// FASES 10-11 - CONTRATO E ACOMPANHAMENTO
// ============================================

export type StatusContrato =
  | 'minuta'
  | 'aguardando_assinatura'
  | 'vigente'
  | 'aditivo'
  | 'suspenso'
  | 'rescindido'
  | 'encerrado';

export type TipoOcorrencia =
  | 'entrega'
  | 'notificacao'
  | 'penalidade'
  | 'aditivo'
  | 'fiscalizacao'
  | 'pagamento'
  | 'outro';

export interface Empenho {
  id: string;
  numero: string;
  dataEmissao: string;
  valor: number;
  tipo: 'global' | 'estimativo' | 'ordinario';
  dotacaoOrcamentaria: string;
  arquivoAnexo?: string;
}

export interface EntregaParcela {
  id: string;
  numero: number;
  descricao: string;
  quantidadePrevista: number;
  quantidadeEntregue: number;
  dataPrevista: string;
  dataEntrega?: string;
  status: 'pendente' | 'parcial' | 'entregue' | 'atrasada';
  notaFiscal?: string;
  valorParcela: number;
}

export interface Ocorrencia {
  id: string;
  tipo: TipoOcorrencia;
  data: string;
  descricao: string;
  responsavel: string;
  arquivosAnexos?: string[];
  acaoTomada?: string;
  prazoResposta?: string;
}

export interface Penalidade {
  id: string;
  tipo: 'advertencia' | 'multa' | 'suspensao' | 'impedimento' | 'declaracao_inidoneidade';
  motivo: string;
  fundamentacaoLegal: string;
  dataAbertura: string;
  prazoDefesa: string;
  defesaApresentada?: string;
  decisaoFinal?: string;
  dataDecisao?: string;
  valorMulta?: number;
  periodoSuspensao?: { inicio: string; fim: string };
  status: 'em_andamento' | 'aplicada' | 'arquivada';
}

export interface Aditivo {
  id: string;
  numero: number;
  tipo: 'prazo' | 'valor' | 'quantitativo' | 'supressao' | 'reequilibrio';
  justificativa: string;
  valorOriginal?: number;
  valorAditado?: number;
  prazoOriginal?: string;
  prazoAditado?: string;
  percentualAlteracao: number;
  dataAssinatura: string;
  arquivoAnexo?: string;
}

export interface Contrato {
  id: string;
  numero: string;
  processoId: string;
  adjudicacaoId: string;
  fornecedor: Fornecedor;

  // Dados Básicos
  objeto: string;
  valorTotal: number;
  dataAssinatura: string;
  dataInicioVigencia: string;
  dataFimVigencia: string;

  // Verificação Pré-Assinatura
  verificacaoPenalidades: ConsultaPenalidade[];
  condicoesHabilitacaoMantidas: boolean;

  // Assinatura
  assinaturaDigitalContratante: AssinaturaDigital;
  assinaturaDigitalContratada: AssinaturaDigital;
  verificacaoPoderesAssinatura: VerificacaoPoderes;

  // Execução
  empenhos: Empenho[];
  entregas: EntregaParcela[];
  ocorrencias: Ocorrencia[];
  penalidades: Penalidade[];
  aditivos: Aditivo[];

  // Fiscalização
  fiscalContrato?: string;
  gestorContrato?: string;

  // Notificações
  notificacoesEnviadas: {
    id: string;
    tipo: 'email' | 'whatsapp' | 'sistema';
    destinatario: string;
    assunto: string;
    dataEnvio: string;
    status: 'enviada' | 'entregue' | 'lida' | 'erro';
  }[];

  // Financeiro
  valorExecutado: number;
  percentualExecutado: number;
  saldoContratual: number;

  // Encerramento
  checklistEncerramento?: {
    item: string;
    concluido: boolean;
    observacao?: string;
  }[];
  termoRecebimentoProvisorio?: string;
  termoRecebimentoDefinitivo?: string;

  status: StatusContrato;

  // Trilha de Auditoria
  trilhaAuditoria: {
    data: string;
    acao: string;
    responsavel: string;
    detalhes?: string;
  }[];
}

// ============================================
// PROCESSO LICITATÓRIO COMPLETO
// ============================================

export type FaseProcesso =
  | 'planejamento'      // ETP
  | 'proposta'          // Fase 2 (externo)
  | 'disputa'           // Fases 3-4 (externo)
  | 'aceitabilidade'    // Fase 5
  | 'habilitacao'       // Fase 6
  | 'julgamento'        // Fase 7
  | 'recursos'          // Fase 8
  | 'adjudicacao'       // Fase 9
  | 'contrato'          // Fases 10-11
  | 'encerrado';

export interface ProcessoLicitatorio {
  id: string;
  numero: string;
  etpId?: string;
  modalidade: string;
  objeto: string;
  valorEstimado: number;

  // Controle de Fases
  faseAtual: FaseProcesso;

  // Dados de cada fase (quando aplicável)
  propostas?: PropostaComercial[];
  habilitacoes?: Habilitacao[];
  julgamentos?: Julgamento[];
  recursos?: Recurso[];
  adjudicacao?: Adjudicacao;
  contrato?: Contrato;

  // Metadados
  criadoPor: string;
  criadoEm: string;
  atualizadoEm: string;

  // Timeline
  timeline: {
    fase: FaseProcesso;
    dataInicio: string;
    dataFim?: string;
    responsavel?: string;
    observacao?: string;
  }[];
}

// ============================================
// LABELS E CORES
// ============================================

export const statusVerificacaoLabels: Record<StatusVerificacao, string> = {
  pendente: 'Pendente',
  em_analise: 'Em Análise',
  aprovado: 'Aprovado',
  reprovado: 'Reprovado',
  alerta: 'Alerta'
};

export const statusVerificacaoColors: Record<StatusVerificacao, { bg: string; text: string; border: string }> = {
  pendente: { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200' },
  em_analise: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
  aprovado: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' },
  reprovado: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' },
  alerta: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200' }
};

export const nivelRiscoLabels: Record<NivelRisco, string> = {
  baixo: 'Baixo',
  medio: 'Médio',
  alto: 'Alto',
  critico: 'Crítico'
};

export const nivelRiscoColors: Record<NivelRisco, { bg: string; text: string; border: string }> = {
  baixo: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' },
  medio: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200' },
  alto: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200' },
  critico: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' }
};

export const faseProcessoLabels: Record<FaseProcesso, string> = {
  planejamento: 'Planejamento (ETP)',
  proposta: 'Envio de Propostas',
  disputa: 'Sessão de Disputa',
  aceitabilidade: 'Aceitabilidade',
  habilitacao: 'Habilitação',
  julgamento: 'Julgamento',
  recursos: 'Recursos',
  adjudicacao: 'Adjudicação/Homologação',
  contrato: 'Gestão Contratual',
  encerrado: 'Encerrado'
};

export const faseProcessoColors: Record<FaseProcesso, { bg: string; text: string; border: string }> = {
  planejamento: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200' },
  proposta: { bg: 'bg-slate-100', text: 'text-slate-500', border: 'border-slate-200' },
  disputa: { bg: 'bg-slate-100', text: 'text-slate-500', border: 'border-slate-200' },
  aceitabilidade: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
  habilitacao: { bg: 'bg-cyan-100', text: 'text-cyan-700', border: 'border-cyan-200' },
  julgamento: { bg: 'bg-indigo-100', text: 'text-indigo-700', border: 'border-indigo-200' },
  recursos: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200' },
  adjudicacao: { bg: 'bg-teal-100', text: 'text-teal-700', border: 'border-teal-200' },
  contrato: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' },
  encerrado: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200' }
};
