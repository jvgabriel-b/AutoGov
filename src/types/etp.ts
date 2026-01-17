// Tipos para o Módulo 1 - ETP (Estudo Técnico Preliminar)

export type ETPStatus =
  | 'rascunho'
  | 'elaboracao'
  | 'revisao_tecnica'
  | 'revisao_juridica'
  | 'revisao_financeira'
  | 'anuencia'
  | 'aprovado'
  | 'publicado'
  | 'cancelado';

export type ModalidadeLicitacao =
  | 'pregao_eletronico'
  | 'pregao_presencial'
  | 'concorrencia'
  | 'tomada_preco'
  | 'convite'
  | 'dispensa'
  | 'inexigibilidade';

export type TipoAnuencia =
  | 'juridica'
  | 'financeira'
  | 'tecnica'
  | 'conformidade';

export interface Anuencia {
  tipo: TipoAnuencia;
  aprovado: boolean;
  responsavel?: string;
  dataAprovacao?: string;
  observacoes?: string;
}

export interface Risco {
  id: string;
  descricao: string;
  probabilidade: 'baixa' | 'media' | 'alta';
  impacto: 'baixo' | 'medio' | 'alto';
  mitigacao: string;
}

export interface Alternativa {
  id: string;
  descricao: string;
  vantagens: string;
  desvantagens: string;
  motivoDescarte?: string;
}

export interface HistoricoVersao {
  versao: string;
  autor: string;
  data: string;
  acao: string;
  tipo: 'criacao' | 'modificacao' | 'aprovacao' | 'comentario' | 'rejeicao';
}

export interface Comentario {
  id: string;
  autor: string;
  data: string;
  texto: string;
  etapa: string;
}

export interface ETP {
  id: string;
  numero: string;

  // Informações Básicas
  setorResponsavel: string;
  objeto: string;
  descricaoDetalhada: string;

  // Valores
  valorEstimado: number;
  valorEstimadoFormatado: string;

  // Licitação
  modalidade: ModalidadeLicitacao | '';

  // Justificativas
  justificativaTecnica: string;
  justificativaNegocio: string;

  // Análises
  analiseComparativaPrecos: string;
  fontePesquisaPrecos: string[];

  // Riscos
  riscos: Risco[];

  // Alternativas
  alternativas: Alternativa[];

  // Anuências
  anuencias: Anuencia[];

  // Status e Controle
  status: ETPStatus;
  progresso: number;

  // Metadados
  criadoPor: string;
  criadoEm: string;
  atualizadoEm: string;
  revisorAtual?: string;

  // Histórico
  historico: HistoricoVersao[];
  comentarios: Comentario[];
}

// Estado inicial para nova ETP
export const criarNovaETP = (numero: string, criadoPor: string): ETP => ({
  id: crypto.randomUUID(),
  numero,
  setorResponsavel: '',
  objeto: '',
  descricaoDetalhada: '',
  valorEstimado: 0,
  valorEstimadoFormatado: '',
  modalidade: '',
  justificativaTecnica: '',
  justificativaNegocio: '',
  analiseComparativaPrecos: '',
  fontePesquisaPrecos: [],
  riscos: [],
  alternativas: [],
  anuencias: [
    { tipo: 'juridica', aprovado: false },
    { tipo: 'financeira', aprovado: false },
    { tipo: 'tecnica', aprovado: false },
    { tipo: 'conformidade', aprovado: false },
  ],
  status: 'rascunho',
  progresso: 0,
  criadoPor,
  criadoEm: new Date().toISOString(),
  atualizadoEm: new Date().toISOString(),
  historico: [{
    versao: 'v1.0',
    autor: criadoPor,
    data: new Date().toISOString(),
    acao: 'Criação inicial da ETP',
    tipo: 'criacao'
  }],
  comentarios: []
});

// Labels para exibição
export const statusLabels: Record<ETPStatus, string> = {
  rascunho: 'Rascunho',
  elaboracao: 'Em Elaboração',
  revisao_tecnica: 'Revisão Técnica',
  revisao_juridica: 'Revisão Jurídica',
  revisao_financeira: 'Revisão Financeira',
  anuencia: 'Aguardando Anuência',
  aprovado: 'Aprovado',
  publicado: 'Publicado',
  cancelado: 'Cancelado'
};

export const modalidadeLabels: Record<ModalidadeLicitacao, string> = {
  pregao_eletronico: 'Pregão Eletrônico',
  pregao_presencial: 'Pregão Presencial',
  concorrencia: 'Concorrência',
  tomada_preco: 'Tomada de Preço',
  convite: 'Convite',
  dispensa: 'Dispensa de Licitação',
  inexigibilidade: 'Inexigibilidade'
};

export const statusColors: Record<ETPStatus, { bg: string; text: string; border: string }> = {
  rascunho: { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200' },
  elaboracao: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200' },
  revisao_tecnica: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
  revisao_juridica: { bg: 'bg-indigo-100', text: 'text-indigo-700', border: 'border-indigo-200' },
  revisao_financeira: { bg: 'bg-cyan-100', text: 'text-cyan-700', border: 'border-cyan-200' },
  anuencia: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200' },
  aprovado: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' },
  publicado: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200' },
  cancelado: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' }
};
