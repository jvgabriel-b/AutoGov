import { ETP } from '../types/etp';

// Dados de exemplo para demonstração do sistema AutoGov
export const etpsExemplo: ETP[] = [
  {
    id: 'etp-demo-001',
    numero: 'ETP-2025-001',
    setorResponsavel: 'Secretaria de Tecnologia da Informação',
    objeto: 'Aquisição de Equipamentos de Informática',
    descricaoDetalhada: 'Aquisição de 150 computadores desktop, 50 notebooks, 30 impressoras multifuncionais e 10 servidores para modernização do parque tecnológico da administração municipal. Os equipamentos devem atender às especificações técnicas mínimas estabelecidas no Termo de Referência, incluindo garantia de 36 meses on-site.',
    valorEstimado: 2500000,
    valorEstimadoFormatado: 'R$ 2.500.000,00',
    modalidade: 'pregao_eletronico',
    justificativaTecnica: 'A infraestrutura tecnológica atual da Prefeitura encontra-se obsoleta, com equipamentos com mais de 8 anos de uso, apresentando falhas frequentes e impossibilitando a execução eficiente dos serviços públicos. A modernização é essencial para: (1) Garantir a continuidade dos serviços digitais ao cidadão; (2) Atender às exigências do Gov.br e sistemas federais; (3) Reduzir custos de manutenção corretiva; (4) Aumentar a produtividade dos servidores públicos.',
    justificativaNegocio: 'Investimento estratégico para transformação digital da gestão pública municipal.',
    analiseComparativaPrecos: 'Pesquisa de preços realizada em: (1) Painel de Preços do Governo Federal - média de R$ 4.800,00 por desktop; (2) Atas de Registro de Preço vigentes de municípios da região - média de R$ 4.650,00; (3) Cotações diretas com 3 fornecedores - média de R$ 5.100,00. Valor médio adotado: R$ 4.850,00 por unidade, resultando no valor total estimado.',
    fontePesquisaPrecos: ['Painel de Preços', 'Atas de RP', 'Cotações'],
    riscos: [
      {
        id: 'risco-001',
        descricao: 'Atraso na entrega dos equipamentos por parte do fornecedor devido à escassez global de componentes eletrônicos',
        probabilidade: 'media',
        impacto: 'alto',
        mitigacao: 'Estabelecer cronograma de entregas parciais com multas contratuais progressivas e exigir comprovação de estoque ou capacidade de fornecimento na habilitação'
      },
      {
        id: 'risco-002',
        descricao: 'Incompatibilidade dos equipamentos com sistemas legados da Prefeitura',
        probabilidade: 'baixa',
        impacto: 'medio',
        mitigacao: 'Realizar testes de compatibilidade durante o período de avaliação técnica e incluir requisitos de compatibilidade no Termo de Referência'
      },
      {
        id: 'risco-003',
        descricao: 'Variação cambial impactando preços de equipamentos importados',
        probabilidade: 'media',
        impacto: 'medio',
        mitigacao: 'Prever cláusula de reequilíbrio econômico-financeiro e priorizar equipamentos com fabricação nacional'
      }
    ],
    alternativas: [
      {
        id: 'alt-001',
        descricao: 'Locação de equipamentos (outsourcing de TI)',
        vantagens: 'Menor investimento inicial, manutenção inclusa, atualização tecnológica periódica',
        desvantagens: 'Custo total maior a longo prazo (5 anos), dependência do fornecedor, equipamentos não se tornam patrimônio público',
        motivoDescarte: 'Análise de TCO (Total Cost of Ownership) demonstrou que a aquisição é 23% mais econômica em 5 anos'
      },
      {
        id: 'alt-002',
        descricao: 'Manutenção e upgrade dos equipamentos atuais',
        vantagens: 'Menor custo imediato, aproveitamento do parque existente',
        desvantagens: 'Equipamentos fora de garantia, peças de reposição escassas, desempenho insuficiente para sistemas atuais',
        motivoDescarte: 'Laudo técnico comprovou inviabilidade de upgrade - custo de manutenção superior a 60% do valor de equipamento novo'
      }
    ],
    anuencias: [
      { tipo: 'juridica', aprovado: true, responsavel: 'Dr. Carlos Mendes', dataAprovacao: '2025-01-10T14:30:00', observacoes: 'Parecer favorável - processo em conformidade com Lei 14.133/2021' },
      { tipo: 'financeira', aprovado: true, responsavel: 'Maria Santos - Controladoria', dataAprovacao: '2025-01-08T10:15:00', observacoes: 'Dotação orçamentária disponível na LOA 2025' },
      { tipo: 'tecnica', aprovado: true, responsavel: 'João Silva - Coord. TI', dataAprovacao: '2025-01-05T16:45:00', observacoes: 'Especificações técnicas adequadas às necessidades' },
      { tipo: 'conformidade', aprovado: false }
    ],
    status: 'revisao_juridica',
    progresso: 90,
    criadoPor: 'Ana Paula Ferreira',
    criadoEm: '2025-01-03T09:00:00',
    atualizadoEm: '2025-01-12T11:30:00',
    revisorAtual: 'Dr. Carlos Mendes',
    historico: [
      { versao: 'v1.0', autor: 'Ana Paula Ferreira', data: '2025-01-03T09:00:00', acao: 'Criação inicial da ETP', tipo: 'criacao' },
      { versao: 'v1.1', autor: 'Ana Paula Ferreira', data: '2025-01-04T14:20:00', acao: 'Inclusão de análise de riscos e alternativas', tipo: 'modificacao' },
      { versao: 'v2.0', autor: 'João Silva', data: '2025-01-05T16:45:00', acao: 'Aprovação técnica - especificações validadas', tipo: 'aprovacao' },
      { versao: 'v2.1', autor: 'Maria Santos', data: '2025-01-08T10:15:00', acao: 'Aprovação financeira - dotação confirmada', tipo: 'aprovacao' },
      { versao: 'v3.0', autor: 'Dr. Carlos Mendes', data: '2025-01-10T14:30:00', acao: 'Em análise jurídica - parecer em elaboração', tipo: 'comentario' }
    ],
    comentarios: [
      { id: 'com-001', autor: 'João Silva', data: '2025-01-05T16:45:00', texto: 'Especificações técnicas aprovadas. Recomendo incluir requisito de certificação EPEAT para sustentabilidade.', etapa: 'revisao_tecnica' },
      { id: 'com-002', autor: 'Maria Santos', data: '2025-01-08T10:15:00', texto: 'Dotação orçamentária confirmada. Fonte: 15.452.0012.2045 - Modernização Administrativa.', etapa: 'revisao_financeira' }
    ]
  },
  {
    id: 'etp-demo-002',
    numero: 'ETP-2025-002',
    setorResponsavel: 'Secretaria de Saúde',
    objeto: 'Contratação de Serviços de Manutenção Predial para UBS',
    descricaoDetalhada: 'Contratação de empresa especializada para execução de serviços de manutenção predial preventiva e corretiva nas 12 Unidades Básicas de Saúde do município, incluindo serviços elétricos, hidráulicos, pintura, alvenaria, serralheria e jardinagem, pelo período de 12 meses.',
    valorEstimado: 480000,
    valorEstimadoFormatado: 'R$ 480.000,00',
    modalidade: 'pregao_eletronico',
    justificativaTecnica: 'As UBS municipais necessitam de manutenção contínua para garantir condições adequadas de atendimento à população. Atualmente, os serviços são realizados de forma emergencial, gerando custos elevados e interrupções no atendimento. A contratação de manutenção preventiva reduzirá custos em aproximadamente 35% e garantirá a operação ininterrupta das unidades.',
    justificativaNegocio: 'Garantia de infraestrutura adequada para atendimento em saúde à população.',
    analiseComparativaPrecos: 'Pesquisa baseada em: (1) SINAPI - Sistema Nacional de Pesquisa de Custos; (2) Contratos similares de municípios vizinhos; (3) Cotações com empresas especializadas. Valor médio por m² de manutenção: R$ 12,50/mês.',
    fontePesquisaPrecos: ['SINAPI', 'Contratos similares', 'Cotações'],
    riscos: [
      {
        id: 'risco-001',
        descricao: 'Descoberta de problemas estruturais não previstos durante a execução',
        probabilidade: 'media',
        impacto: 'medio',
        mitigacao: 'Prever percentual de 15% para serviços emergenciais não previstos e realizar vistoria técnica prévia detalhada'
      }
    ],
    alternativas: [
      {
        id: 'alt-001',
        descricao: 'Execução dos serviços por equipe própria da Prefeitura',
        vantagens: 'Maior controle sobre a execução',
        desvantagens: 'Necessidade de contratação de pessoal, aquisição de equipamentos, custos fixos elevados',
        motivoDescarte: 'Custo estimado 40% superior à terceirização'
      }
    ],
    anuencias: [
      { tipo: 'juridica', aprovado: false },
      { tipo: 'financeira', aprovado: true, responsavel: 'Maria Santos', dataAprovacao: '2025-01-11T09:00:00' },
      { tipo: 'tecnica', aprovado: true, responsavel: 'Eng. Roberto Lima', dataAprovacao: '2025-01-09T15:30:00' },
      { tipo: 'conformidade', aprovado: false }
    ],
    status: 'elaboracao',
    progresso: 70,
    criadoPor: 'Pedro Oliveira',
    criadoEm: '2025-01-07T10:00:00',
    atualizadoEm: '2025-01-11T09:00:00',
    historico: [
      { versao: 'v1.0', autor: 'Pedro Oliveira', data: '2025-01-07T10:00:00', acao: 'Criação inicial da ETP', tipo: 'criacao' },
      { versao: 'v1.1', autor: 'Eng. Roberto Lima', data: '2025-01-09T15:30:00', acao: 'Revisão técnica aprovada', tipo: 'aprovacao' },
      { versao: 'v1.2', autor: 'Maria Santos', data: '2025-01-11T09:00:00', acao: 'Dotação orçamentária confirmada', tipo: 'aprovacao' }
    ],
    comentarios: []
  },
  {
    id: 'etp-demo-003',
    numero: 'ETP-2025-003',
    setorResponsavel: 'Secretaria de Educação',
    objeto: 'Aquisição de Mobiliário Escolar',
    descricaoDetalhada: 'Aquisição de 2.000 conjuntos de carteira e cadeira escolar, 100 mesas para professores, 50 armários e 200 estantes para as 25 escolas municipais de ensino fundamental.',
    valorEstimado: 890000,
    valorEstimadoFormatado: 'R$ 890.000,00',
    modalidade: 'pregao_eletronico',
    justificativaTecnica: 'Renovação do mobiliário escolar que se encontra deteriorado, com mais de 15 anos de uso, comprometendo o conforto e a ergonomia dos alunos. O novo mobiliário atenderá às normas da ABNT NBR 14006 e 14007.',
    justificativaNegocio: 'Melhoria das condições de ensino e aprendizagem nas escolas municipais.',
    analiseComparativaPrecos: 'Pesquisa realizada no Painel de Preços e em Atas de RP do FNDE. Valor médio do conjunto carteira+cadeira: R$ 380,00.',
    fontePesquisaPrecos: ['Painel de Preços', 'FNDE'],
    riscos: [
      {
        id: 'risco-001',
        descricao: 'Mobiliário fora das especificações técnicas ABNT',
        probabilidade: 'baixa',
        impacto: 'alto',
        mitigacao: 'Exigir laudos de conformidade e realizar inspeção de amostras antes do recebimento definitivo'
      }
    ],
    alternativas: [],
    anuencias: [
      { tipo: 'juridica', aprovado: true },
      { tipo: 'financeira', aprovado: true },
      { tipo: 'tecnica', aprovado: true },
      { tipo: 'conformidade', aprovado: true }
    ],
    status: 'aprovado',
    progresso: 100,
    criadoPor: 'Lucia Fernandes',
    criadoEm: '2024-12-15T08:30:00',
    atualizadoEm: '2025-01-05T16:00:00',
    historico: [
      { versao: 'v1.0', autor: 'Lucia Fernandes', data: '2024-12-15T08:30:00', acao: 'Criação inicial da ETP', tipo: 'criacao' },
      { versao: 'v2.0', autor: 'Comissão de Licitação', data: '2025-01-05T16:00:00', acao: 'ETP aprovada para publicação', tipo: 'aprovacao' }
    ],
    comentarios: []
  },
  {
    id: 'etp-demo-004',
    numero: 'ETP-2024-015',
    setorResponsavel: 'Secretaria de Obras',
    objeto: 'Pavimentação Asfáltica - Bairro Jardim América',
    descricaoDetalhada: 'Execução de serviços de pavimentação asfáltica em CBUQ, incluindo drenagem pluvial, sinalização horizontal e vertical, em 5,2 km de vias no Bairro Jardim América.',
    valorEstimado: 4200000,
    valorEstimadoFormatado: 'R$ 4.200.000,00',
    modalidade: 'concorrencia',
    justificativaTecnica: 'O Bairro Jardim América possui vias sem pavimentação, causando transtornos à população, dificuldade de acesso a serviços públicos e problemas de drenagem. A obra beneficiará diretamente 8.500 moradores.',
    justificativaNegocio: 'Melhoria da infraestrutura urbana e qualidade de vida da população.',
    analiseComparativaPrecos: 'Orçamento elaborado com base no SINAPI e SICRO, com BDI de 25%. Custo médio por km: R$ 807.692,30.',
    fontePesquisaPrecos: ['SINAPI', 'SICRO'],
    riscos: [
      {
        id: 'risco-001',
        descricao: 'Condições climáticas adversas atrasando a execução',
        probabilidade: 'alta',
        impacto: 'medio',
        mitigacao: 'Cronograma contemplando período de menor incidência de chuvas e cláusula de prorrogação justificada'
      },
      {
        id: 'risco-002',
        descricao: 'Interferências de redes subterrâneas não mapeadas',
        probabilidade: 'media',
        impacto: 'alto',
        mitigacao: 'Levantamento cadastral prévio junto às concessionárias e previsão de aditivo para serviços imprevistos'
      }
    ],
    alternativas: [
      {
        id: 'alt-001',
        descricao: 'Pavimentação em blocos de concreto (paver)',
        vantagens: 'Menor custo de manutenção, permeabilidade',
        desvantagens: 'Custo inicial 20% maior, menor durabilidade em vias de tráfego intenso',
        motivoDescarte: 'Via com tráfego de veículos pesados exige pavimento asfáltico'
      }
    ],
    anuencias: [
      { tipo: 'juridica', aprovado: true },
      { tipo: 'financeira', aprovado: true },
      { tipo: 'tecnica', aprovado: true },
      { tipo: 'conformidade', aprovado: true }
    ],
    status: 'publicado',
    progresso: 100,
    criadoPor: 'Eng. Marcos Souza',
    criadoEm: '2024-10-01T09:00:00',
    atualizadoEm: '2024-11-20T14:00:00',
    historico: [
      { versao: 'v1.0', autor: 'Eng. Marcos Souza', data: '2024-10-01T09:00:00', acao: 'Criação inicial da ETP', tipo: 'criacao' },
      { versao: 'v2.0', autor: 'Comissão de Licitação', data: '2024-11-15T10:00:00', acao: 'ETP aprovada', tipo: 'aprovacao' },
      { versao: 'v3.0', autor: 'Sistema PNCP', data: '2024-11-20T14:00:00', acao: 'Publicado no PNCP', tipo: 'aprovacao' }
    ],
    comentarios: []
  },
  {
    id: 'etp-demo-005',
    numero: 'ETP-2025-004',
    setorResponsavel: 'Secretaria de Administração',
    objeto: 'Contratação de Serviços de Limpeza e Conservação',
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
      { tipo: 'conformidade', aprovado: false }
    ],
    status: 'rascunho',
    progresso: 10,
    criadoPor: 'Carlos Eduardo',
    criadoEm: '2025-01-14T11:00:00',
    atualizadoEm: '2025-01-14T11:00:00',
    historico: [
      { versao: 'v1.0', autor: 'Carlos Eduardo', data: '2025-01-14T11:00:00', acao: 'Criação inicial - rascunho', tipo: 'criacao' }
    ],
    comentarios: []
  }
];

// Função para carregar dados de exemplo no localStorage
export const carregarDadosExemplo = (): void => {
  const STORAGE_KEY = 'autogov_etps';
  const dadosExistentes = localStorage.getItem(STORAGE_KEY);

  // Só carrega se não houver dados
  if (!dadosExistentes || JSON.parse(dadosExistentes).length === 0) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(etpsExemplo));
  }
};

// Função para forçar recarga dos dados de exemplo (para demonstração)
export const resetarDadosExemplo = (): void => {
  const STORAGE_KEY = 'autogov_etps';
  localStorage.setItem(STORAGE_KEY, JSON.stringify(etpsExemplo));
};
