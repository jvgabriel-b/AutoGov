// Dados de exemplo para módulos de Compliance
import {
  ProcessoLicitatorio,
  PropostaComercial,
  Habilitacao,
  Julgamento,
  Recurso,
  Adjudicacao,
  Contrato,
  Fornecedor
} from '../types/compliance';

// Fornecedores de exemplo
const fornecedores: Fornecedor[] = [
  {
    id: 'forn-001',
    cnpj: '12.345.678/0001-90',
    razaoSocial: 'TechBrasil Informática Ltda',
    nomeFantasia: 'TechBrasil',
    endereco: 'Av. Paulista, 1000, Sala 501',
    cidade: 'São Paulo',
    uf: 'SP',
    cep: '01310-100',
    telefone: '(11) 3456-7890',
    email: 'comercial@techbrasil.com.br',
    representanteLegal: 'Carlos Eduardo Silva',
    cpfRepresentante: '123.456.789-00'
  },
  {
    id: 'forn-002',
    cnpj: '98.765.432/0001-10',
    razaoSocial: 'Construmax Engenharia S.A.',
    nomeFantasia: 'Construmax',
    endereco: 'Rua das Obras, 500',
    cidade: 'Brasília',
    uf: 'DF',
    cep: '70000-000',
    telefone: '(61) 3333-4444',
    email: 'licitacoes@construmax.com.br',
    representanteLegal: 'Maria Aparecida Santos',
    cpfRepresentante: '987.654.321-00'
  },
  {
    id: 'forn-003',
    cnpj: '45.678.901/0001-23',
    razaoSocial: 'LimpaTudo Serviços Especializados ME',
    nomeFantasia: 'LimpaTudo',
    endereco: 'Rua da Limpeza, 123',
    cidade: 'Rio de Janeiro',
    uf: 'RJ',
    cep: '20000-000',
    telefone: '(21) 2222-3333',
    email: 'contato@limpatudo.com.br',
    representanteLegal: 'José Roberto Mendes',
    cpfRepresentante: '456.789.012-34'
  }
];

// Processos Licitatórios de exemplo
export const processosExemplo: ProcessoLicitatorio[] = [
  {
    id: 'proc-001',
    numero: 'PE-2025-001',
    etpId: 'etp-demo-001',
    modalidade: 'Pregão Eletrônico',
    objeto: 'Aquisição de Equipamentos de Informática',
    valorEstimado: 2500000,
    faseAtual: 'habilitacao',
    propostas: [
      {
        id: 'prop-001',
        numeroProcesso: 'PE-2025-001',
        fornecedor: fornecedores[0],
        valorInicial: 2400000,
        valorFinal: 2180000,
        descontoPercentual: 12.8,
        dataEnvio: '2025-01-10T14:30:00',
        assinaturaDigital: {
          valida: true,
          certificado: 'ICP-Brasil A3',
          dataAssinatura: '2025-01-10T14:28:00',
          cpfAssinante: '123.456.789-00',
          nomeAssinante: 'Carlos Eduardo Silva',
          cadeiaCertificacao: 'AC Certisign → AC Raiz',
          verificadoEm: '2025-01-10T15:00:00'
        },
        verificacaoCatalogo: {
          conforme: true,
          fabricanteInformado: 'Dell Technologies',
          fabricanteOficial: 'Dell Technologies',
          modeloInformado: 'OptiPlex 7090',
          especificacoesConferem: true,
          verificadoEm: '2025-01-10T15:30:00'
        },
        verificacaoPoderes: {
          possuiPoderes: true,
          tipoDocumento: 'contrato_social',
          dataVerificacao: '2025-01-10T15:45:00',
          observacoes: 'Sócio administrador com plenos poderes conforme cláusula 5ª'
        },
        comparativoPropostaInicial: {
          modeloConfere: true,
          marcaConfere: true,
          especificacoesConferem: true
        },
        status: 'aceita',
        analisadoPor: 'Ana Paula Ferreira',
        dataAnalise: '2025-01-10T16:00:00'
      },
      {
        id: 'prop-002',
        numeroProcesso: 'PE-2025-001',
        fornecedor: {
          ...fornecedores[1],
          id: 'forn-004',
          cnpj: '11.222.333/0001-44',
          razaoSocial: 'InfoSystems Tecnologia Ltda',
          nomeFantasia: 'InfoSystems',
          representanteLegal: 'Pedro Henrique Costa',
          cpfRepresentante: '111.222.333-44'
        },
        valorInicial: 2450000,
        valorFinal: 2250000,
        descontoPercentual: 8.16,
        dataEnvio: '2025-01-10T14:45:00',
        assinaturaDigital: {
          valida: true,
          certificado: 'ICP-Brasil A1',
          dataAssinatura: '2025-01-10T14:43:00',
          cpfAssinante: '111.222.333-44',
          nomeAssinante: 'Pedro Henrique Costa',
          verificadoEm: '2025-01-10T15:10:00'
        },
        verificacaoCatalogo: {
          conforme: true,
          fabricanteInformado: 'Lenovo',
          fabricanteOficial: 'Lenovo',
          modeloInformado: 'ThinkCentre M90q',
          especificacoesConferem: true,
          verificadoEm: '2025-01-10T15:35:00'
        },
        verificacaoPoderes: {
          possuiPoderes: true,
          tipoDocumento: 'procuracao',
          dataVerificacao: '2025-01-10T15:50:00',
          observacoes: 'Procuração pública com poderes específicos para licitações'
        },
        comparativoPropostaInicial: {
          modeloConfere: true,
          marcaConfere: true,
          especificacoesConferem: true
        },
        status: 'aceita',
        analisadoPor: 'Ana Paula Ferreira',
        dataAnalise: '2025-01-10T16:10:00'
      }
    ],
    habilitacoes: [
      {
        id: 'hab-001',
        propostaId: 'prop-001',
        fornecedor: fornecedores[0],
        habilitacaoJuridica: {
          contratoSocial: { status: 'aprovado', dataVerificacao: '2025-01-11T09:00:00' },
          cartaoCNPJ: { status: 'aprovado', dataVerificacao: '2025-01-11T09:05:00' },
          certidaoJuntaComercial: { status: 'aprovado', dataVerificacao: '2025-01-11T09:10:00' },
          documentosSocios: { status: 'aprovado', dataVerificacao: '2025-01-11T09:15:00' }
        },
        consultasPenalidades: [
          { sistema: 'CEIS', consultadoEm: '2025-01-11T09:20:00', possuiRestricao: false },
          { sistema: 'CNEP', consultadoEm: '2025-01-11T09:21:00', possuiRestricao: false },
          { sistema: 'SICAF', consultadoEm: '2025-01-11T09:22:00', possuiRestricao: false },
          { sistema: 'TCU', consultadoEm: '2025-01-11T09:23:00', possuiRestricao: false }
        ],
        certidoesFiscais: [
          { tipo: 'federal', nome: 'CND Federal', dataEmissao: '2025-01-05', dataValidade: '2025-07-05', valida: true },
          { tipo: 'fgts', nome: 'CRF FGTS', dataEmissao: '2025-01-08', dataValidade: '2025-02-08', valida: true },
          { tipo: 'trabalhista', nome: 'CNDT', dataEmissao: '2025-01-07', dataValidade: '2025-07-07', valida: true },
          { tipo: 'estadual', nome: 'CND Estadual SP', dataEmissao: '2025-01-06', dataValidade: '2025-04-06', valida: true },
          { tipo: 'municipal', nome: 'CND Municipal SP', dataEmissao: '2025-01-04', dataValidade: '2025-07-04', valida: true }
        ],
        analisesDocumentos: [
          { tipo: 'Balanço Patrimonial', nomeArquivo: 'balanco_2024.pdf', integridadeOk: true, possivelAdulteracao: false, dataAnalise: '2025-01-11T10:00:00' },
          { tipo: 'Contrato Social', nomeArquivo: 'contrato_social.pdf', integridadeOk: true, possivelAdulteracao: false, dataAnalise: '2025-01-11T10:05:00' }
        ],
        qualificacaoEconomica: {
          balancoPatrimonial: {
            exercicio: '2024',
            ativoTotal: 15000000,
            passivoTotal: 8000000,
            patrimonioLiquido: 7000000
          },
          indicesFinanceiros: {
            liquidezGeral: 1.87,
            liquidezCorrente: 2.15,
            solvenciaGeral: 1.45,
            atendeMinimoEdital: true
          },
          certidaoFalencia: { possui: true, dataEmissao: '2025-01-03' }
        },
        qualificacaoTecnica: {
          atestados: [
            {
              id: 'atest-001',
              emissor: 'Prefeitura de Campinas',
              cnpjEmissor: '51.885.242/0001-40',
              objetoAtestado: 'Fornecimento de 300 computadores Dell OptiPlex',
              dataEmissao: '2024-08-15',
              valorContrato: 1800000,
              validado: true
            }
          ],
          cnaeCompativel: {
            cnaeExigido: ['4751-2/01', '4651-6/01'],
            cnaeEmpresa: ['4751-2/01', '4651-6/01', '6203-1/00'],
            compativel: true
          }
        },
        declaracoes: {
          trabalhoMenor: { status: 'aprovado', dataVerificacao: '2025-01-11T10:30:00' },
          idoneidade: { status: 'aprovado', dataVerificacao: '2025-01-11T10:31:00' },
          nepotismo: { status: 'aprovado', dataVerificacao: '2025-01-11T10:32:00' }
        },
        status: 'em_analise',
        analisadoPor: 'Roberto Carlos Lima',
        dataAnalise: '2025-01-11T11:00:00'
      }
    ],
    criadoPor: 'Sistema',
    criadoEm: '2025-01-05T08:00:00',
    atualizadoEm: '2025-01-11T11:00:00',
    timeline: [
      { fase: 'planejamento', dataInicio: '2024-12-01', dataFim: '2024-12-20', responsavel: 'João Silva' },
      { fase: 'proposta', dataInicio: '2025-01-05', dataFim: '2025-01-09' },
      { fase: 'disputa', dataInicio: '2025-01-10', dataFim: '2025-01-10' },
      { fase: 'aceitabilidade', dataInicio: '2025-01-10', dataFim: '2025-01-10', responsavel: 'Ana Paula Ferreira' },
      { fase: 'habilitacao', dataInicio: '2025-01-11', responsavel: 'Roberto Carlos Lima' }
    ]
  },
  {
    id: 'proc-002',
    numero: 'PE-2025-002',
    etpId: 'etp-demo-003',
    modalidade: 'Pregão Eletrônico',
    objeto: 'Aquisição de Mobiliário Escolar',
    valorEstimado: 850000,
    faseAtual: 'julgamento',
    propostas: [
      {
        id: 'prop-003',
        numeroProcesso: 'PE-2025-002',
        fornecedor: {
          id: 'forn-005',
          cnpj: '55.666.777/0001-88',
          razaoSocial: 'MobiliEscolar Indústria e Comércio Ltda',
          nomeFantasia: 'MobiliEscolar',
          endereco: 'Rod. BR-101, Km 45',
          cidade: 'Joinville',
          uf: 'SC',
          cep: '89200-000',
          telefone: '(47) 3333-5555',
          email: 'vendas@mobiliescolar.com.br',
          representanteLegal: 'Marcos Antônio Pereira',
          cpfRepresentante: '555.666.777-88'
        },
        valorInicial: 820000,
        valorFinal: 745000,
        descontoPercentual: 9.15,
        dataEnvio: '2025-01-12T10:00:00',
        assinaturaDigital: {
          valida: true,
          certificado: 'ICP-Brasil A3',
          dataAssinatura: '2025-01-12T09:55:00',
          cpfAssinante: '555.666.777-88',
          nomeAssinante: 'Marcos Antônio Pereira',
          verificadoEm: '2025-01-12T10:30:00'
        },
        verificacaoCatalogo: {
          conforme: true,
          fabricanteInformado: 'MobiliEscolar',
          modeloInformado: 'Carteira Ergonômica ME-500',
          especificacoesConferem: true,
          verificadoEm: '2025-01-12T11:00:00'
        },
        verificacaoPoderes: {
          possuiPoderes: true,
          tipoDocumento: 'contrato_social',
          dataVerificacao: '2025-01-12T11:15:00'
        },
        comparativoPropostaInicial: {
          modeloConfere: true,
          marcaConfere: true,
          especificacoesConferem: true
        },
        status: 'aceita',
        analisadoPor: 'Fernanda Costa',
        dataAnalise: '2025-01-12T11:30:00'
      }
    ],
    julgamentos: [
      {
        id: 'julg-001',
        propostaId: 'prop-003',
        habilitacaoId: 'hab-002',
        fornecedor: {
          id: 'forn-005',
          cnpj: '55.666.777/0001-88',
          razaoSocial: 'MobiliEscolar Indústria e Comércio Ltda',
          nomeFantasia: 'MobiliEscolar',
          endereco: 'Rod. BR-101, Km 45',
          cidade: 'Joinville',
          uf: 'SC',
          cep: '89200-000',
          telefone: '(47) 3333-5555',
          email: 'vendas@mobiliescolar.com.br',
          representanteLegal: 'Marcos Antônio Pereira',
          cpfRepresentante: '555.666.777-88'
        },
        pesquisasPrecos: [
          { fonte: 'Painel de Preços', precoEncontrado: 780000, dataConsulta: '2025-01-13', produtoReferencia: 'Carteira escolar ergonômica' },
          { fonte: 'Banco de Preços', precoEncontrado: 810000, dataConsulta: '2025-01-13', produtoReferencia: 'Mobiliário escolar conjunto' },
          { fonte: 'Licitações anteriores', precoEncontrado: 760000, dataConsulta: '2025-01-13', produtoReferencia: 'PE 2024-089 Prefeitura Curitiba' }
        ],
        precoMedioCalculado: 783333,
        analiseExequibilidade: {
          precoOfertado: 745000,
          precoMedioMercado: 783333,
          percentualAbaixoMedia: 4.89,
          nivelRisco: 'baixo',
          exequivel: true,
          justificativa: 'Preço dentro da margem aceitável, desconto compatível com economia de escala'
        },
        posicaoClassificacao: 1,
        pontuacaoPreco: 100,
        pontuacaoFinal: 100,
        status: 'classificado',
        analisadoPor: 'Sistema IA + Fernanda Costa',
        dataAnalise: '2025-01-13T14:00:00'
      }
    ],
    criadoPor: 'Sistema',
    criadoEm: '2025-01-08T08:00:00',
    atualizadoEm: '2025-01-13T14:00:00',
    timeline: [
      { fase: 'planejamento', dataInicio: '2024-11-15', dataFim: '2024-12-10' },
      { fase: 'proposta', dataInicio: '2025-01-08', dataFim: '2025-01-11' },
      { fase: 'disputa', dataInicio: '2025-01-12', dataFim: '2025-01-12' },
      { fase: 'aceitabilidade', dataInicio: '2025-01-12', dataFim: '2025-01-12' },
      { fase: 'habilitacao', dataInicio: '2025-01-13', dataFim: '2025-01-13' },
      { fase: 'julgamento', dataInicio: '2025-01-13' }
    ]
  },
  {
    id: 'proc-003',
    numero: 'PE-2024-045',
    modalidade: 'Pregão Eletrônico',
    objeto: 'Contratação de Serviços de Limpeza Predial',
    valorEstimado: 1200000,
    faseAtual: 'contrato',
    recursos: [
      {
        id: 'rec-001',
        processoId: 'proc-003',
        tipo: 'recurso',
        fornecedor: {
          id: 'forn-006',
          cnpj: '77.888.999/0001-11',
          razaoSocial: 'CleanMax Serviços Ltda',
          endereco: 'Av. das Américas, 500',
          cidade: 'Rio de Janeiro',
          uf: 'RJ',
          cep: '22640-100',
          representanteLegal: 'Ana Carolina Mendes',
          cpfRepresentante: '777.888.999-00'
        },
        dataProtocolo: '2024-10-16T14:30:00',
        prazoLegal: '2024-10-21',
        dentroPrazo: true,
        assinaturaDigital: {
          valida: true,
          certificado: 'ICP-Brasil A3',
          dataAssinatura: '2024-10-16T14:25:00',
          cpfAssinante: '777.888.999-00',
          nomeAssinante: 'Ana Carolina Mendes',
          verificadoEm: '2024-10-16T14:35:00'
        },
        verificacaoPoderes: {
          possuiPoderes: true,
          tipoDocumento: 'procuracao',
          dataVerificacao: '2024-10-16T14:40:00'
        },
        resumoAlegacoes: 'A recorrente alega que a empresa vencedora não comprovou capacidade técnica suficiente para execução do objeto, uma vez que os atestados apresentados não contemplam a totalidade das atividades previstas no edital, especificamente no que tange aos serviços de jardinagem e conservação de áreas verdes.',
        fundamentacaoLegal: 'Art. 67, II da Lei 14.133/2021 c/c item 8.4.3 do Edital',
        preJulgamentoIA: {
          probabilidadeProvimento: 25,
          pontosFortes: [
            'Argumentação jurídica bem fundamentada',
            'Recurso protocolado dentro do prazo'
          ],
          pontosFracos: [
            'Atestados da vencedora contemplam serviços similares',
            'Edital não exigia atestado específico para jardinagem',
            'Precedente da CGU em caso análogo'
          ],
          sugestaoResposta: 'Recomenda-se o indeferimento do recurso, considerando que o edital não exigiu comprovação específica para serviços de jardinagem, e os atestados apresentados pela vencedora contemplam serviços de limpeza e conservação predial em área superior à exigida.'
        },
        status: 'indeferido',
        parecerFinal: 'Recurso INDEFERIDO. Os atestados de capacidade técnica apresentados pela empresa LimpaTudo Serviços Especializados ME atendem integralmente às exigências editalícias. O item 8.4.3 do Edital exige comprovação de experiência em serviços de limpeza e conservação predial, sem especificação de serviços de jardinagem como item obrigatório. Mantém-se a decisão de habilitação da empresa vencedora.',
        fundamentacaoDecisao: 'Art. 165, §1º da Lei 14.133/2021',
        analisadoPor: 'Dr. Ricardo Alves - Assessor Jurídico',
        dataDecisao: '2024-10-23T16:00:00',
        historico: [
          { data: '2024-10-16T14:30:00', acao: 'Recurso protocolado', responsavel: 'Sistema' },
          { data: '2024-10-16T14:40:00', acao: 'Validação de assinatura e poderes concluída', responsavel: 'Sistema' },
          { data: '2024-10-17T09:00:00', acao: 'Recurso distribuído para análise', responsavel: 'Comissão de Licitação' },
          { data: '2024-10-18T10:00:00', acao: 'Análise preditiva IA concluída', responsavel: 'Sistema IA' },
          { data: '2024-10-21T14:00:00', acao: 'Prazo para contrarrazões encerrado', responsavel: 'Sistema' },
          { data: '2024-10-23T16:00:00', acao: 'Recurso julgado - INDEFERIDO', responsavel: 'Dr. Ricardo Alves' }
        ]
      },
      {
        id: 'rec-002',
        processoId: 'proc-003',
        tipo: 'contrarrazao',
        fornecedor: fornecedores[2],
        dataProtocolo: '2024-10-19T11:00:00',
        prazoLegal: '2024-10-21',
        dentroPrazo: true,
        assinaturaDigital: {
          valida: true,
          certificado: 'ICP-Brasil A3',
          dataAssinatura: '2024-10-19T10:55:00',
          cpfAssinante: '456.789.012-34',
          nomeAssinante: 'José Roberto Mendes',
          verificadoEm: '2024-10-19T11:05:00'
        },
        verificacaoPoderes: {
          possuiPoderes: true,
          tipoDocumento: 'contrato_social',
          dataVerificacao: '2024-10-19T11:10:00'
        },
        resumoAlegacoes: 'Em contrarrazões, a empresa LimpaTudo demonstra que seus atestados de capacidade técnica comprovam experiência em área total de 45.000m², superior aos 30.000m² exigidos no edital, abrangendo todos os serviços previstos no objeto licitado.',
        status: 'deferido',
        parecerFinal: 'Contrarrazões ACOLHIDAS. Os argumentos apresentados demonstram conformidade da habilitação.',
        analisadoPor: 'Dr. Ricardo Alves - Assessor Jurídico',
        dataDecisao: '2024-10-23T16:00:00',
        historico: [
          { data: '2024-10-19T11:00:00', acao: 'Contrarrazões protocoladas', responsavel: 'Sistema' },
          { data: '2024-10-19T11:10:00', acao: 'Validação concluída', responsavel: 'Sistema' },
          { data: '2024-10-23T16:00:00', acao: 'Contrarrazões acolhidas', responsavel: 'Dr. Ricardo Alves' }
        ]
      }
    ],
    adjudicacao: {
      id: 'adj-001',
      processoId: 'proc-003',
      fornecedorVencedor: fornecedores[2],
      valorAdjudicado: 1080000,
      checkUp: {
        id: 'chk-001',
        processoId: 'proc-003',
        dataRealizacao: '2024-10-28T10:00:00',
        verificacoes: [
          { item: 'Regularidade do processo licitatório', categoria: 'processual', status: 'ok' },
          { item: 'Conformidade do edital com a Lei 14.133/2021', categoria: 'juridica', status: 'ok' },
          { item: 'Publicações legais realizadas', categoria: 'processual', status: 'ok' },
          { item: 'Habilitação do fornecedor vencedor', categoria: 'juridica', status: 'ok' },
          { item: 'Certidões fiscais válidas', categoria: 'fiscal', status: 'ok' },
          { item: 'Qualificação técnica comprovada', categoria: 'tecnica', status: 'ok' },
          { item: 'Recursos julgados', categoria: 'processual', status: 'ok' },
          { item: 'Preço dentro da estimativa', categoria: 'fiscal', status: 'ok' }
        ],
        irregularidadesEncontradas: [],
        aprovadoParaHomologacao: true,
        parecerFinal: 'Processo apto para adjudicação e homologação. Todas as verificações foram realizadas sem identificação de irregularidades. O preço final representa economia de 10% em relação ao valor estimado.',
        responsavel: 'Maria Helena Souza - Pregoeira'
      },
      dataAdjudicacao: '2024-10-30T14:00:00',
      responsavelAdjudicacao: 'Maria Helena Souza - Pregoeira',
      dataHomologacao: '2024-11-15T10:00:00',
      responsavelHomologacao: 'Secretário de Administração',
      termoAdjudicacao: 'termo_adjudicacao_pe2024045.pdf',
      termoHomologacao: 'termo_homologacao_pe2024045.pdf',
      status: 'homologado',
      trilhaAuditoria: [
        { data: '2024-10-28T10:00:00', acao: 'Check-up pré-homologação iniciado', responsavel: 'Maria Helena Souza' },
        { data: '2024-10-28T16:00:00', acao: 'Check-up concluído - Aprovado', responsavel: 'Maria Helena Souza' },
        { data: '2024-10-30T14:00:00', acao: 'Objeto adjudicado à LimpaTudo Serviços Especializados ME', responsavel: 'Maria Helena Souza' },
        { data: '2024-10-30T14:05:00', acao: 'Termo de adjudicação gerado', responsavel: 'Sistema' },
        { data: '2024-11-10T09:00:00', acao: 'Processo encaminhado para homologação', responsavel: 'Maria Helena Souza' },
        { data: '2024-11-15T10:00:00', acao: 'Processo homologado', responsavel: 'Secretário de Administração' },
        { data: '2024-11-15T10:05:00', acao: 'Termo de homologação gerado', responsavel: 'Sistema' }
      ]
    },
    contrato: {
      id: 'cont-001',
      numero: 'CT-2024-089',
      processoId: 'proc-003',
      adjudicacaoId: 'adj-001',
      fornecedor: fornecedores[2],
      objeto: 'Prestação de serviços de limpeza e conservação predial',
      valorTotal: 1080000,
      dataAssinatura: '2024-11-20',
      dataInicioVigencia: '2024-12-01',
      dataFimVigencia: '2025-11-30',
      verificacaoPenalidades: [
        { sistema: 'CEIS', consultadoEm: '2024-11-18', possuiRestricao: false },
        { sistema: 'CNEP', consultadoEm: '2024-11-18', possuiRestricao: false }
      ],
      condicoesHabilitacaoMantidas: true,
      assinaturaDigitalContratante: {
        valida: true,
        certificado: 'ICP-Brasil A3',
        nomeAssinante: 'Secretário de Administração',
        verificadoEm: '2024-11-20T10:00:00'
      },
      assinaturaDigitalContratada: {
        valida: true,
        certificado: 'ICP-Brasil A3',
        nomeAssinante: 'José Roberto Mendes',
        verificadoEm: '2024-11-20T10:05:00'
      },
      verificacaoPoderesAssinatura: {
        possuiPoderes: true,
        tipoDocumento: 'contrato_social',
        dataVerificacao: '2024-11-19'
      },
      empenhos: [
        {
          id: 'emp-001',
          numero: '2024NE001234',
          dataEmissao: '2024-11-25',
          valor: 1080000,
          tipo: 'global',
          dotacaoOrcamentaria: '04.122.0001.2001.339039'
        }
      ],
      entregas: [
        { id: 'ent-001', numero: 1, descricao: 'Dezembro/2024', quantidadePrevista: 1, quantidadeEntregue: 1, dataPrevista: '2024-12-31', dataEntrega: '2024-12-31', status: 'entregue', valorParcela: 90000 },
        { id: 'ent-002', numero: 2, descricao: 'Janeiro/2025', quantidadePrevista: 1, quantidadeEntregue: 1, dataPrevista: '2025-01-31', dataEntrega: '2025-01-31', status: 'entregue', valorParcela: 90000 },
        { id: 'ent-003', numero: 3, descricao: 'Fevereiro/2025', quantidadePrevista: 1, quantidadeEntregue: 0, dataPrevista: '2025-02-28', status: 'pendente', valorParcela: 90000 }
      ],
      ocorrencias: [
        {
          id: 'oc-001',
          tipo: 'fiscalizacao',
          data: '2025-01-15',
          descricao: 'Fiscalização mensal - Serviços executados conforme contrato',
          responsavel: 'Maria Helena Souza'
        }
      ],
      penalidades: [],
      aditivos: [],
      fiscalContrato: 'Maria Helena Souza',
      gestorContrato: 'Paulo Ricardo Santos',
      notificacoesEnviadas: [
        {
          id: 'not-001',
          tipo: 'email',
          destinatario: 'contato@limpatudo.com.br',
          assunto: 'Confirmação de Início de Vigência',
          dataEnvio: '2024-11-28T08:00:00',
          status: 'entregue'
        }
      ],
      valorExecutado: 180000,
      percentualExecutado: 16.67,
      saldoContratual: 900000,
      status: 'vigente',
      trilhaAuditoria: [
        { data: '2024-11-20T10:00:00', acao: 'Assinatura do contrato', responsavel: 'Sistema' },
        { data: '2024-12-01T00:00:00', acao: 'Início da vigência', responsavel: 'Sistema' },
        { data: '2024-12-31T16:00:00', acao: 'Ateste parcela 1', responsavel: 'Maria Helena Souza' },
        { data: '2025-01-31T16:00:00', acao: 'Ateste parcela 2', responsavel: 'Maria Helena Souza' }
      ]
    },
    criadoPor: 'Sistema',
    criadoEm: '2024-09-15T08:00:00',
    atualizadoEm: '2025-01-15T16:00:00',
    timeline: [
      { fase: 'planejamento', dataInicio: '2024-08-01', dataFim: '2024-08-30' },
      { fase: 'proposta', dataInicio: '2024-09-15', dataFim: '2024-09-25' },
      { fase: 'disputa', dataInicio: '2024-09-30', dataFim: '2024-09-30' },
      { fase: 'aceitabilidade', dataInicio: '2024-09-30', dataFim: '2024-10-01' },
      { fase: 'habilitacao', dataInicio: '2024-10-02', dataFim: '2024-10-10' },
      { fase: 'julgamento', dataInicio: '2024-10-11', dataFim: '2024-10-15' },
      { fase: 'recursos', dataInicio: '2024-10-16', dataFim: '2024-10-25' },
      { fase: 'adjudicacao', dataInicio: '2024-10-28', dataFim: '2024-11-15' },
      { fase: 'contrato', dataInicio: '2024-11-20' }
    ]
  }
];

// Função para carregar dados de exemplo
const STORAGE_KEY = 'autogov_processos';
const DATA_VERSION = 'v2'; // Incrementar para forçar atualização dos dados

export const carregarProcessosExemplo = (): void => {
  const versionKey = `${STORAGE_KEY}_version`;
  const currentVersion = localStorage.getItem(versionKey);

  // Recarregar se versão mudou ou dados não existem
  if (currentVersion !== DATA_VERSION) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(processosExemplo));
    localStorage.setItem(versionKey, DATA_VERSION);
  }
};

export const loadProcessos = (): ProcessoLicitatorio[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveProcessos = (processos: ProcessoLicitatorio[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(processos));
};
