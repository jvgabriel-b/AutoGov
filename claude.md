Reaproveite o código atual apenas como base estrutural
(layout, componentes, padrão de pastas, rotas, etc.)

Adapte tudo para o novo contexto e especificações que vou enviar.
Isso inclui:

Renomear módulos

Criar novos módulos

Excluir o que não faz mais sentido

Reescrever textos, labels e fluxos

Implementar telas novas

Atualizar lógicas conforme o novo funcionamento

Ajustar a UX e deixar consistente com o novo sistema

Aplique as mudanças diretamente no código, sem rodeios:

Apague o que precisar apagar

Modifique o que precisar ser modificado

Implemente o que faltar

Reorganize quando necessário

Sempre mantenha a estrutura organizada e coerente, seguindo boas práticas de frontend.

Agora, com base nisso, quero que você adapte o template COMPLETO para o novo sistema conforme as observações a seguir:

Quero que você atue como arquiteto de soluções públicas, especialista em licitações, Lei 14.133/2021 e automação governamental. E tambem sera um desenvolvedor frontend

Você deve usar como referência fixa os dois documentos anexados:

Especificação Técnica Padrão (módulos, requisitos técnicos, funcionais e de negócio)

Especificacao_Tecnica_Padrao_v2

Documento de Funcionamento da Licitação e Fluxo do AutoGov (fases da licitação e papel pós-disputa)

SISTEMA AUTOMACAO LICITACOES

📌 CONTEXTUALIZAÇÃO GERAL — SISTEMA AUTO GOV

O AutoGov é uma plataforma completa de automação, conformidade e acompanhamento de licitações e contratos, construída para atender integralmente os preceitos da Lei 14.133/2021.

Ele possui duas funções principais:

1️⃣ AutoGov ETP — Construção do ETP (Módulo 1 – Planejamento e Publicação)

(utiliza o Módulo 1 da especificação + fase 1 do documento da licitação)

O AutoGov fornece ao órgão público um ambiente completo para:

criar, revisar e aprovar ETPs

com editor estruturado, checklists automáticos, logs, versionamento e validação de dados

permitindo que cada setor participe de forma colaborativa

O órgão preenche:

setor responsável

produto/serviço

justificativas

anuências

análises comparativas

estimativas de custos

riscos

alternativas

Conforme o documento da licitação, nesta fase o AutoGov atua antes do edital, garantindo planejamento adequado e rastreável.

Após aprovado, o ETP pode ser:

exportado (PDF/XML)

enviado via API ao PNCP

vinculado ao futuro edital

Objetivo: garantir que toda licitação comece corretamente, tecnicamente fundamentada e juridicamente segura.

2️⃣ AutoGov Compliance — Entrada a partir da Fase 5 da Licitação

(Baseado no documento de licitação: fases 5 a 11 + módulos 3 a 10 da Especificação)

O AutoGov NÃO executa a fase competitiva (propostas e lances).
Essas fases (2, 3 e 4) ocorrem externamente.

Conforme

SISTEMA AUTOMACAO LICITACOES

, o AutoGov entra após a fase de disputa, começando na Fase 5 – Aceitabilidade da Proposta.

A seguir estão os módulos oficiais da Especificação Técnica e como eles se alinham às fases reais da licitação:

🔷 Módulo 3 – Negociação e Aceitabilidade

📌 Correspondência real: FASE 5 da licitação

O sistema realiza:

validação da assinatura digital

conferência do catálogo técnico com o fabricante

verificação do representante legal (contrato social, procuração, Junta Comercial)

comparação entre proposta inicial x final

checklist automático de conformidade com o edital

análise técnica do produto/serviço

Objetivo: garantir que somente propostas válidas, assinadas por quem tem poderes legais, sigam para habilitação.

🔷 Módulo 4 – Habilitação e Julgamento

📌 Correspondência real: FASE 6 e início da FASE 7

O AutoGov executa as análises exigidas em

SISTEMA AUTOMACAO LICITACOES

:

consulta a penalidades (CEIS, CNEP, SICAF, TCU)

checagem de validade de certidões

OCR para identificar adulteração

análise fiscal, trabalhista, jurídica, econômica e técnica

conferência dos índices do balanço

validação dos CATs e atestados com NF

verificação de compatibilidade CNAE x objeto

Depois disso, inicia o julgamento:

IA faz pesquisa de preços em tempo real

classifica risco (verde, amarelo, vermelho)

identifica indícios de inexequibilidade

🔷 Módulo 5 – Recursos e Contrarrazões

📌 Correspondência real: FASE 8

Conforme o documento:

recebimento eletrônico

validação da assinatura

controle automático de prazos

pré-julgamento com IA

registro completo de interações

relatório cronológico por fornecedor

Objetivo: segurança jurídica, rastreabilidade e prevenção de erros processuais.

🔷 Módulo 6 – Adjudicação e Formalização

📌 Correspondência real: FASE 9 e FASE 10

O AutoGov faz:

check-up final de conformidade antes da homologação

análise documental completa

emissão de minutas contratuais

integração com assinatura digital ICP-Brasil

trilha de auditoria de todos os atos

validação de poderes de assinatura

Objetivo: impedir homologações irregulares e garantir que somente documentos válidos sejam utilizados.

🔷 Módulo 7 – Gestão Contratual

📌 Correspondência real: FASE 11 (acompanhamento completo do contrato)

Conforme

SISTEMA AUTOMACAO LICITACOES

, o AutoGov acompanha:

prazos de entrega

emissão de empenho

ocorrência e fiscalização

notificações automáticas por e-mail/WhatsApp

penalidades

aditivos

execução física e financeira

encerramento com checklist

rastreabilidade total

Objetivo: garantir execução contratual correta, evitar penalidades e aumentar eficiência da gestão.

🔷 Módulo 8 – Inteligência e Auditoria

Atua transversalmente em todas as fases (5 a 11), oferecendo:

análise de risco

deteção de padrões suspeitos

auditoria preventiva

relatórios de conformidade

mapas de calor de irregularidades

comparação de preços por histórico, região, setor

🔷 Módulo 9 – Integrações Externas

Integrações diretas com:

SICAF

CEIS

CNEP

Receita Federal

PNCP

FGTS

INSS

TST

Com:

consulta automática

atualização de dados

histórico de integrações

🔷 Módulo 10 – Segurança e Infraestrutura

Plataforma baseada em:

criptografia AES-256

MFA

Kubernetes + Docker

LGPD

logs completos

controle de acesso granular

alta disponibilidade

🧩 RESUMO DA LÓGICA OPERACIONAL DO AUTOGOV
Fase 1 – Órgão cria o ETP dentro do AutoGov

✔ AutoGov ETP (Módulo 1)

Fases 2, 3 e 4 – Propostas, sessão pública e lances

❌ AutoGov NÃO atua aqui.

A partir da Fase 5 – AutoGov assume o processo

✔ Aceitabilidade (Módulo 3)
✔ Habilitação (Módulo 4)
✔ Julgamento (Módulo 4 + IA)
✔ Recursos (Módulo 5)
✔ Adjudicação (Módulo 6)
✔ Formalização (Módulo 6)
✔ Gestão Contratual (Módulo 7)
✔ Inteligência e Auditoria (Módulo 8)
✔ Integrações (Módulo 9)
✔ Segurança (Módulo 10)
----------------------------------

Quero que você agora atue como especialista em UX/UI, Product Designer Sênior e Arquiteto de Software Governamental, e melhore cada módulo do AutoGov com foco em:

usabilidade prática

experiência intuitiva

automação inteligente

redução de cliques

telas mais claras

componentes reutilizáveis

jornadas mais rápidas

minimização de erros humanos

acessibilidade

governança e rastreabilidade

interface moderna e responsiva

Use como referência fixa toda a arquitetura e módulos já estabelecidos anteriormente (ETP + Compliance + Gestão Contratual), incluindo os dois documentos oficiais:

Especificação Técnica Padrão (módulos e requisitos)

Documento de funcionamento real da licitação (fases 1 a 11 e onde o AutoGov entra)

📌 Sua missão agora é EVOLUIR o AutoGov módulo por módulo:

Para cada módulo (1 a 10), quero que você:

1. Aprimore as funcionalidades

sugira automações

elimine etapas manuais

reorganize fluxos

adicione ferramentas úteis ao gestor

traga recursos mais modernos

reduza retrabalho

aumente eficiência

2. Recrie a experiência (UX)

torne a jornada mais fluida

elimine “pontos de fricção”

use boas práticas de heurísticas de Nielsen

crie fluxos visuais lineares, com foco e contexto

facilite o trabalho do pregoeiro, fiscal, gestor e jurídico

3. Proponha melhorias de UI

Com base em padrões modernos (GovBR, Material UI, Tailwind, Design System):

dashboards

componentes

formulários inteligentes

etiquetas, cores, estados

tabelas avançadas com filtros inteligentes

cartões de processos

visão 360º para cada licitação e contrato

4. Reestruture a jornada completa

do ETP → aceitabilidade → habilitação → julgamento → recursos → adjudicação → formalização → gestão contratual

sempre com foco em clareza, automação e velocidade

5. Sugira funcionalidades novas

Sem mudar o escopo legal, mas melhorando a eficiência, como:

preenchimento inteligente via IA

análise automática do PDF em tempo real

assistente de decisão para o pregoeiro

pontos de atenção destacados automaticamente

timeline visual do processo licitatório

relatórios autoexplicativos para auditoria

painel personalizável para cada usuário

📌 Entregue no formato:

Para cada módulo (1 a 10), quero:

Resumo do módulo (1 frase)

Objetivo real dentro da Lei 14.133 e dentro da jornada do AutoGov

Melhorias funcionais

Melhorias de UX

Melhorias de UI
------------
Quero que você implemente o AutoGov seguindo exatamente a estrutura funcional dividida em duas partes principais, conforme definido abaixo, garantindo clareza operacional, modularidade e total aderência à Lei 14.133/2021.

Use como base os dois documentos oficiais já anexados anteriormente (Especificação Técnica Padrão e Funcionamento Real da Licitação), e estruture o sistema em duas camadas centrais, sendo:

🟦 PARTE 1 — CRIAÇÃO DO ETP (FASE INTERNA)

O objetivo desta parte é permitir que o órgão público crie, revise, valide e publique o ETP de forma totalmente guiada e automatizada.

Implemente os seguintes comportamentos e funcionalidades:
🔹 Funcionalidades Principais

Editor estruturado de ETP

Campos obrigatórios: setor, objeto, justificativas, anuências, alternativas, riscos, estimativas

Revisão colaborativa (fluxo jurídico/técnico/planejamento)

Validação automática de conformidade legal e técnica

Checklist baseado na 14.133

Versionamento e logs

Exportação em PDF e XML

Envio via API para PNCP e anexos internos

🔹 Jornada UX

Criar novo ETP

Preencher campos obrigatórios

Sistema valida automaticamente

Revisão colaborativa

Aprovação formal

Gerar PDF/XML

Concluir fase de planejamento

🔹 Objetivo Geral

Garantir planejamento sólido, eliminação de erros, criação de ETPs completos e padronizados, e preparação do processo para seguir para a fase externa.

🟩 PARTE 2 — ANÁLISE COMPLETA APÓS A LICITAÇÃO (FASES 5 a 11)

O AutoGov entra somente após a fase competitiva, atuando a partir da Aceitabilidade da Proposta.

Implemente os módulos da forma integrada e sequencial abaixo:

📌 MÓDULO 3 — Negociação e Aceitabilidade (FASE 5)

Validar assinatura digital ICP-Brasil

Conferir catálogo técnico via comparação oficial

Verificar poderes de assinatura (contrato social/procuração)

Comparação proposta inicial x final

Análise de conformidade técnica

📌 MÓDULO 4 — Habilitação e Julgamento (FASE 6 e 7)
Habilitação:

Checagem CEIS, CNEP, SICAF, TCU

Verificação de validade de certidões

OCR + hash para detectar adulterações

Análise fiscal, trabalhista, econômica e técnica

Análise de CAT + confronto com NF

Julgamento:

IA para pesquisa de preços

Avaliação de exequibilidade

Classificação de risco (verde/laranja/vermelho)

📌 MÓDULO 5 — Recursos e Contrarrazões (FASE 8)

Protocolo eletrônico

Validação de assinatura

Controle automático de prazos

Pré-julgamento por IA

Linha do tempo do recurso

Relatório completo

📌 MÓDULO 6 — Adjudicação e Formalização (FASE 9 e 10)

Check-up geral pré-homologação

Emissão de minuta contratual

Integração com ICP-Brasil

Logs e trilha de auditoria

Validação de poderes

📌 MÓDULO 7 — Gestão Contratual (FASE 11)

Controle da execução

Notificações automáticas (e-mail/WhatsApp)

Registro de entregas, fiscalizações e ocorrências

Penalidades e aditivos

Execução física e financeira

Encerramento com checklist

📌 MÓDULO 8 — Inteligência e Auditoria

IA para identificar riscos

Web scraping de preços

Mapas de calor de irregularidades

Análises comparativas e relatórios

📌 MÓDULO 9 — Integrações

SICAF

CEIS

CNEP

Receita Federal

PNCP

FGTS

INSS

TST

📌 MÓDULO 10 — Segurança e Infraestrutura

AES-256

MFA

Controle de acesso granular

Monitoramento


LGPD

Logs completos

🎯 O QUE QUERO QUE VOCÊ FAÇA AGORA (CLARO E DIRETO)

Com base nessa divisão em DUAS GRANDES PARTES:

1. Organize toda a arquitetura do AutoGov em dois blocos: ETP e Análise Pós-Licitação.
2. Evolua e refine os módulos dentro desses blocos.
3. Melhore a UX/UI das duas partes como se fosse um produto premium de governo digital.
4. Crie fluxos, telas, jornadas e componentes para cada etapa.
