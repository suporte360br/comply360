// Conteúdo do site Comply360: matérias do blog e páginas de soluções.
// Depois de editar, rode: node gerador/gerar.js (na pasta comply360)
// Matérias sem "imagem" usam a placa gráfica da marca no cartão.
// "atualizado": data da última revisão do texto (vira dateModified e "Atualizado em").
// "tituloSEO": título mais curto para a aba e o Google, quando o título passa de ~60 caracteres.
// "fontes": lista [texto, link] exibida no fim da matéria. Links conferidos em 31/10/2026.

const FONTE = {
  lgpd: ['Lei 13.709/2018 (Lei Geral de Proteção de Dados)', 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm'],
  anpd: ['Autoridade Nacional de Proteção de Dados (ANPD)', 'https://www.gov.br/anpd/pt-br'],
  iso27001: ['ISO/IEC 27001:2022 (página oficial da ISO)', 'https://www.iso.org/standard/27001'],
  iso37301: ['ISO 37301:2021 (página oficial da ISO)', 'https://www.iso.org/standard/75080.html'],
  nist: ['NIST Cybersecurity Framework', 'https://www.nist.gov/cyberframework'],
};

exports.materias = [
  {
    slug: 'por-que-empresas-precisam-de-gestao-de-conformidade',
    titulo: 'Por que as empresas precisam de gestão de conformidade',
    tituloSEO: 'Por que sua empresa precisa de gestão de conformidade',
    tema: 'Gestão de conformidade',
    data: '2026-02-26',
    atualizado: '2026-10-31',
    fontes: [FONTE.iso37301, FONTE.iso27001, FONTE.nist, FONTE.lgpd],
    descricao: 'Entenda o que é gestão de conformidade e por que ela reduz riscos legais, protege a reputação, abre portas em contratos B2B e fortalece a governança.',
    imagem: 'gestao-conformidade.jpg',
    imagemAlt: 'Ilustração de prancheta com itens marcados, lupa, escudo e cadeado representando gestão de conformidade',
    corpo: `
<p>A <strong>gestão de conformidade</strong> estabelece e monitora controles internos baseados em boas práticas e frameworks reconhecidos, buscando prevenir não conformidades, fortalecer a governança e evidenciar diligência perante clientes, reguladores e investidores.</p>
<p>Em um ambiente corporativo cada vez mais regulamentado, digital e exposto à fiscalização e a auditorias, a gestão de conformidade deixou de ser opcional.</p>

<nav class="sumario" aria-label="Nesta matéria"><strong>Nesta matéria</strong><ol>
<li><a href="#riscos">Redução de riscos legais e regulatórios</a></li>
<li><a href="#reputacao">Proteção da reputação e da marca</a></li>
<li><a href="#mercado">Exigência de mercado e competitividade</a></li>
<li><a href="#governanca">Melhoria da governança corporativa</a></li>
<li><a href="#fraudes">Prevenção de fraudes e irregularidades</a></li>
<li><a href="#seguranca">Segurança da informação e proteção de dados</a></li>
<li><a href="#continuidade">Sustentabilidade e continuidade do negócio</a></li>
</ol></nav>

<h2 id="riscos">Redução de riscos legais e regulatórios</h2>
<p>As empresas estão sujeitas a uma ampla variedade de normas, regulamentos e leis: proteção de dados (como LGPD e GDPR), anticorrupção, continuidade de negócios, tecnologia, meio ambiente, entre outras. Sem um sistema estruturado de conformidade, aumentam as chances de:</p>
<ul>
<li>perda de novos negócios, já na avaliação inicial feita por novos clientes;</li>
<li>risco de imagem;</li>
<li>multas e penalidades regulatórias;</li>
<li>processos judiciais;</li>
<li>suspensão de atividades e perda de licenças.</li>
</ul>

<h2 id="reputacao">Proteção da reputação e da marca</h2>
<p>Crises de integridade ou vazamentos de dados podem gerar danos irreversíveis à imagem institucional. No cenário digital, reputações são impactadas rapidamente por escândalos éticos, fraudes internas, incidentes de segurança da informação e não conformidade regulatória.</p>
<p>Empresas com programas robustos de compliance transmitem confiança ao mercado, a investidores e a consumidores.</p>

<h2 id="mercado">Exigência de mercado e competitividade</h2>
<p>Cada vez mais, grandes clientes e parceiros exigem comprovação de controles internos, segurança da informação e governança estruturada, com base em referências como:</p>
<ul>
<li><strong>ISO 37301</strong> (sistema de gestão de compliance);</li>
<li><strong>ISO 27001</strong> (segurança da informação);</li>
<li><strong>NIST Cybersecurity Framework</strong>;</li>
<li><strong>SOC 2</strong> (relatório de controles de prestadores de serviço).</li>
</ul>
<p>Sem conformidade estruturada, a empresa pode perder oportunidades de negócio, especialmente em contratos B2B e mercados internacionais. Os questionários de segurança enviados por clientes são um bom exemplo: veja <a href="/blog/avaliacao-de-fornecedores-questionario-de-seguranca/">como funciona a avaliação de fornecedores</a>.</p>

<h2 id="governanca">Melhoria da governança corporativa</h2>
<p>A gestão de conformidade fortalece a governança ao definir responsabilidades claras, estabelecer controles internos, integrar a gestão de riscos às decisões estratégicas e promover transparência. Empresas que operam com governança sólida tomam decisões mais seguras e sustentáveis.</p>

<h2 id="fraudes">Prevenção de fraudes e irregularidades</h2>
<p>Programas de compliance incluem mecanismos como segregação de funções, auditorias internas, canais de denúncia e monitoramento contínuo. Essas ferramentas reduzem a probabilidade de fraudes, conflitos de interesse e condutas inadequadas.</p>
<p>A prevenção é significativamente menos onerosa do que a correção de uma crise.</p>

<h2 id="seguranca">Segurança da informação e proteção de dados</h2>
<p>Uma gestão de conformidade alinhada a frameworks como ISO 27001 e NIST ajuda a identificar vulnerabilidades, implementar controles de segurança, monitorar incidentes e garantir resposta estruturada a crises. Isso é fundamental para manter a confiança dos clientes e atender às leis de privacidade, como a <a href="/blog/adequacao-lgpd-passo-a-passo/">LGPD</a>.</p>

<h2 id="continuidade">Sustentabilidade e continuidade do negócio</h2>
<p>Gestão de conformidade não é apenas evitar multas: é garantir a longevidade da empresa de forma estruturada, para antecipar riscos, reagir melhor a incidentes, manter operações estáveis e aumentar a previsibilidade. A conformidade passa a fazer parte da estratégia de crescimento sustentável.</p>

<h2>Conclusão</h2>
<p>A gestão de conformidade é uma necessidade estratégica para empresas que desejam operar com segurança, credibilidade e competitividade. Mais do que cumprir regras, trata-se de construir uma cultura organizacional baseada em integridade e responsabilidade.</p>
<p>Em um cenário de constante transformação regulatória e tecnológica, a pergunta não é se a empresa precisa de gestão de conformidade, mas <strong>o quão madura e estruturada ela está</strong> para enfrentar os desafios atuais. Veja como a <a href="/solucoes/gestao-de-conformidade/">Comply360 apoia a gestão de conformidade</a>.</p>`
  },
  {
    slug: 'adequacao-lgpd-passo-a-passo',
    titulo: 'Adequação à LGPD: passo a passo para empresas',
    tema: 'LGPD',
    data: '2026-10-31',
    fontes: [FONTE.lgpd, FONTE.anpd],
    descricao: 'Um roteiro prático de adequação à LGPD: mapeamento de dados, bases legais, encarregado, direitos dos titulares, incidentes, contratos e evidências.',
    imagem: 'lgpd.jpg',
    imagemAlt: 'Mão marcando uma caixa de seleção ao lado do texto Conformidade LGPD (imagem ilustrativa)',
    corpo: `
<p>A <strong>Lei Geral de Proteção de Dados</strong> (Lei 13.709/2018) vale para qualquer empresa que trate dados pessoais no Brasil, de clientes, funcionários, fornecedores ou visitantes do site. As sanções administrativas estão em vigor desde agosto de 2021 e são aplicadas pela <strong>Autoridade Nacional de Proteção de Dados (ANPD)</strong>.</p>
<p>Adequar-se não é um projeto de um documento só. É um conjunto de práticas que precisa ser mantido e, principalmente, <strong>comprovado</strong>. Este roteiro organiza o caminho em oito etapas.</p>

<nav class="sumario" aria-label="Nesta matéria"><strong>Nesta matéria</strong><ol>
<li><a href="#mapeamento">Mapeie os dados pessoais</a></li>
<li><a href="#bases">Defina a base legal de cada tratamento</a></li>
<li><a href="#encarregado">Nomeie o encarregado</a></li>
<li><a href="#titulares">Prepare o atendimento aos titulares</a></li>
<li><a href="#seguranca">Implemente medidas de segurança</a></li>
<li><a href="#incidentes">Tenha um plano de resposta a incidentes</a></li>
<li><a href="#terceiros">Revise contratos com operadores</a></li>
<li><a href="#evidencias">Documente e monitore</a></li>
</ol></nav>

<h2 id="mapeamento">1. Mapeie os dados pessoais</h2>
<p>Tudo começa pelo inventário: quais dados pessoais a empresa coleta, de quem, para quê, onde ficam guardados, quem acessa, com quem são compartilhados e por quanto tempo são mantidos. A LGPD exige que controlador e operador mantenham <strong>registro das operações de tratamento</strong> (art. 37).</p>
<p>Na prática, o mapeamento é feito por área (RH, vendas, marketing, financeiro, TI) e revela pontos de atenção, como planilhas com dados de clientes circulando por e-mail ou dados guardados sem necessidade.</p>

<h2 id="bases">2. Defina a base legal de cada tratamento</h2>
<p>Todo tratamento precisa se apoiar em uma das hipóteses do art. 7º, como consentimento, cumprimento de obrigação legal, execução de contrato, legítimo interesse ou exercício regular de direitos. Para <strong>dados sensíveis</strong> (saúde, biometria, origem racial, entre outros), as hipóteses são mais restritas e estão no art. 11.</p>
<p>Um erro comum é usar o consentimento para tudo. Ele pode ser revogado a qualquer momento; quando o tratamento é necessário para cumprir um contrato ou uma obrigação legal, essas bases costumam ser mais adequadas.</p>

<h2 id="encarregado">3. Nomeie o encarregado</h2>
<p>O <strong>encarregado pelo tratamento de dados</strong> (conhecido como DPO) é o canal de comunicação entre a empresa, os titulares e a ANPD (art. 41). Sua identidade e contato devem ser divulgados de forma clara, de preferência no site. A atuação do encarregado foi detalhada pela Resolução CD/ANPD nº 18/2024.</p>
<p>Agentes de tratamento de pequeno porte, como microempresas e startups, têm regras simplificadas (Resolução CD/ANPD nº 2/2022), mas ainda precisam oferecer um canal de comunicação com os titulares.</p>

<h2 id="titulares">4. Prepare o atendimento aos titulares</h2>
<p>O art. 18 garante aos titulares direitos como confirmação da existência de tratamento, acesso, correção, anonimização, portabilidade, eliminação e informação sobre compartilhamento. A empresa precisa de um processo para receber, verificar a identidade, responder e registrar esses pedidos.</p>

<h2 id="seguranca">5. Implemente medidas de segurança</h2>
<p>A lei exige medidas técnicas e administrativas aptas a proteger os dados (art. 46). Controle de acessos com o menor privilégio necessário, criptografia, cópias de segurança, registro de atividades e treinamento das equipes são a base. Normas como a <a href="/blog/iso-27001-o-que-e-como-se-preparar/">ISO 27001</a> ajudam a organizar esses controles.</p>

<h2 id="incidentes">6. Tenha um plano de resposta a incidentes</h2>
<p>Incidentes de segurança que possam acarretar risco ou dano relevante aos titulares devem ser comunicados à ANPD e aos titulares. O Regulamento de Comunicação de Incidente de Segurança (Resolução CD/ANPD nº 15/2024) fixou o prazo de <strong>três dias úteis</strong> a partir do conhecimento do incidente. Sem um plano definido com antecedência, esse prazo é muito curto.</p>

<h2 id="terceiros">7. Revise contratos com operadores</h2>
<p>Fornecedores que tratam dados em nome da empresa (como sistemas na nuvem, folha de pagamento e agências de marketing) são <strong>operadores</strong>. Os contratos devem prever instruções de tratamento, medidas de segurança, comunicação de incidentes e devolução ou eliminação dos dados ao fim da relação. Avaliar esses fornecedores antes da contratação é parte da adequação: veja <a href="/blog/avaliacao-de-fornecedores-questionario-de-seguranca/">como avaliar fornecedores</a>.</p>

<h2 id="evidencias">8. Documente e monitore</h2>
<p>Políticas, registros, treinamentos, relatórios de impacto (o RIPD, previsto no art. 38) e respostas aos titulares formam o conjunto de <strong>evidências</strong> que mostra diligência em uma fiscalização ou na avaliação de um cliente. A adequação precisa ser revisada periodicamente, sempre que surgir um novo processo, sistema ou fornecedor.</p>

<h2>Quanto custa não se adequar</h2>
<p>As sanções do art. 52 vão de advertência a multa de até <strong>2% do faturamento</strong> da empresa no Brasil, limitada a <strong>R$ 50 milhões por infração</strong>, além de publicização da infração e bloqueio ou eliminação dos dados. Na prática, a perda de negócios costuma vir antes: clientes que pedem evidências de conformidade e não as recebem escolhem outro fornecedor.</p>
<p class="aviso">Este conteúdo é informativo e não substitui a orientação jurídica para o caso concreto da sua empresa. Confira sempre a regulamentação mais recente da ANPD.</p>
<p>A Comply360 organiza requisitos, controles e evidências da LGPD em um só lugar. Conheça a <a href="/solucoes/lgpd/">solução para conformidade com a LGPD</a>.</p>`
  },
  {
    slug: 'iso-27001-o-que-e-como-se-preparar',
    titulo: 'ISO 27001: o que é e como se preparar para a certificação',
    tituloSEO: 'ISO 27001: o que é e como se preparar',
    tema: 'Segurança da informação',
    data: '2026-10-31',
    fontes: [FONTE.iso27001],
    descricao: 'O que é a ISO/IEC 27001:2022, o que mudou nos controles do Anexo A, quem deve buscar a certificação e as etapas até a auditoria.',
    imagem: 'iso27002.jpg',
    imagemAlt: 'Mão marcando uma caixa de seleção ao lado do texto Conformidade ISO 27002 (imagem ilustrativa)',
    corpo: `
<p>A <strong>ISO/IEC 27001</strong> é a norma internacional que define os requisitos de um <strong>sistema de gestão de segurança da informação (SGSI)</strong>. Ela não diz qual ferramenta usar: estabelece como a empresa identifica riscos, escolhe controles, acompanha resultados e melhora continuamente. A versão atual é a de 2022, que também tem edição brasileira publicada pela ABNT.</p>

<nav class="sumario" aria-label="Nesta matéria"><strong>Nesta matéria</strong><ol>
<li><a href="#27001-27002">ISO 27001 e ISO 27002: qual a diferença</a></li>
<li><a href="#anexo-a">Os 93 controles do Anexo A</a></li>
<li><a href="#quem">Quem deve buscar a certificação</a></li>
<li><a href="#etapas">Etapas até a certificação</a></li>
<li><a href="#auditoria">Como funciona a auditoria</a></li>
</ol></nav>

<h2 id="27001-27002">ISO 27001 e ISO 27002: qual a diferença</h2>
<p>A <strong>27001</strong> traz os requisitos que podem ser auditados e certificados (cláusulas 4 a 10: contexto, liderança, planejamento, apoio, operação, avaliação de desempenho e melhoria). A <strong>27002</strong> é um guia de boas práticas que explica, controle por controle, como implementar as medidas listadas no Anexo A da 27001. Não existe certificação ISO 27002: ela serve de apoio para atender à 27001.</p>

<h2 id="anexo-a">Os 93 controles do Anexo A</h2>
<p>Na revisão de 2022, os controles foram reorganizados de 114 em 14 domínios para <strong>93 controles em 4 temas</strong>:</p>
<ul>
<li><strong>Organizacionais (37):</strong> políticas, papéis, gestão de ativos, fornecedores, incidentes, continuidade e conformidade legal;</li>
<li><strong>Pessoas (8):</strong> seleção, conscientização, trabalho remoto, termos de confidencialidade;</li>
<li><strong>Físicos (14):</strong> perímetros, controle de entrada, proteção de equipamentos;</li>
<li><strong>Tecnológicos (34):</strong> controle de acesso, criptografia, backup, registro de eventos, desenvolvimento seguro.</li>
</ul>
<p>Entre as novidades estão controles de inteligência de ameaças, segurança em serviços de nuvem, prontidão de TIC para continuidade, prevenção de vazamento de dados e monitoramento de atividades. O prazo de transição terminou em outubro de 2025: certificados emitidos pela versão de 2013 não são mais válidos.</p>

<h2 id="quem">Quem deve buscar a certificação</h2>
<p>A certificação não é obrigatória por lei, mas tem se tornado requisito comercial. Faz sentido especialmente para:</p>
<ul>
<li>empresas de tecnologia e SaaS que atendem bancos, seguradoras e grandes corporações;</li>
<li>prestadores que tratam dados de clientes em grande volume, como centrais de atendimento, folha de pagamento e saúde;</li>
<li>empresas que querem vender para o exterior ou participar de licitações que pontuam certificações;</li>
<li>organizações que recebem muitos questionários de segurança e querem uma resposta única e reconhecida.</li>
</ul>

<h2 id="etapas">Etapas até a certificação</h2>
<ol>
<li><strong>Escopo:</strong> definir quais unidades, processos e sistemas entram no SGSI. Um escopo bem delimitado reduz custo e prazo.</li>
<li><strong>Análise de riscos:</strong> identificar ativos, ameaças e vulnerabilidades e decidir o tratamento de cada risco.</li>
<li><strong>Declaração de Aplicabilidade:</strong> documento que lista os 93 controles, indica quais se aplicam e justifica as exclusões.</li>
<li><strong>Implementação:</strong> políticas, procedimentos e controles técnicos, com responsáveis definidos.</li>
<li><strong>Operação e evidências:</strong> o sistema precisa funcionar por algum tempo, gerando registros que comprovem os controles.</li>
<li><strong>Auditoria interna e análise crítica:</strong> exigidas pela norma antes da auditoria de certificação.</li>
</ol>

<h2 id="auditoria">Como funciona a auditoria</h2>
<p>A certificação é feita por um organismo certificador acreditado (no Brasil, a acreditação é concedida pelo Inmetro). A auditoria inicial tem duas fases: a <strong>fase 1</strong> avalia a documentação e a prontidão; a <strong>fase 2</strong> verifica se os controles funcionam na prática. O certificado vale por <strong>três anos</strong>, com auditorias de manutenção anuais e recertificação ao fim do ciclo.</p>
<p>O que mais pesa na auditoria são as <strong>evidências</strong>: registros de revisões de acesso, testes de backup, treinamentos, tratamento de incidentes e avaliação de fornecedores. Organizar tudo isso ao longo do ano evita a correria antes de cada visita.</p>
<p>A Comply360 ajuda a acompanhar requisitos, controles e evidências da norma. Conheça a <a href="/solucoes/iso-27001/">solução para ISO 27001 e 27002</a>.</p>`
  },
  {
    slug: 'avaliacao-de-fornecedores-questionario-de-seguranca',
    titulo: 'Avaliação de fornecedores: como montar um processo com questionário de segurança',
    tituloSEO: 'Avaliação de fornecedores e questionário de segurança',
    tema: 'Gestão de terceiros',
    data: '2026-10-31',
    fontes: [FONTE.lgpd, FONTE.iso27001],
    descricao: 'Como avaliar fornecedores e parceiros com base em risco: classificação, questionários de segurança e LGPD, evidências, aprovação e monitoramento.',
    corpo: `
<p>Boa parte dos incidentes de segurança e vazamentos de dados começa em um <strong>terceiro</strong>: um sistema contratado, um prestador com acesso à rede, um parceiro que recebe uma base de clientes. Por isso, clientes, auditores e reguladores querem saber como a empresa escolhe e acompanha seus fornecedores.</p>
<p>Um processo de avaliação bem montado protege a empresa e, ao mesmo tempo, não trava as contratações. O segredo é <strong>proporcionalidade</strong>: o nível de exigência acompanha o risco de cada fornecedor.</p>

<nav class="sumario" aria-label="Nesta matéria"><strong>Nesta matéria</strong><ol>
<li><a href="#por-que">Por que avaliar fornecedores</a></li>
<li><a href="#classificacao">Classifique o risco</a></li>
<li><a href="#questionario">Monte o questionário</a></li>
<li><a href="#evidencias">Peça evidências</a></li>
<li><a href="#aprovacao">Aprovação e contrato</a></li>
<li><a href="#monitoramento">Monitoramento contínuo</a></li>
</ol></nav>

<h2 id="por-que">Por que avaliar fornecedores</h2>
<p>Pela LGPD, o fornecedor que trata dados pessoais em nome da empresa é um <strong>operador</strong> e deve seguir as instruções do controlador (art. 39). Se o operador descumprir a lei ou essas instruções, pode responder solidariamente pelos danos (art. 42), mas a empresa contratante continua responsável perante os titulares e a ANPD.</p>
<p>A ISO 27001:2022 dedica cinco controles do Anexo A ao tema (5.19 a 5.23), cobrindo segurança na relação com fornecedores, cláusulas contratuais, cadeia de suprimentos de TIC, monitoramento de mudanças e serviços em nuvem.</p>

<h2 id="classificacao">1. Classifique o risco</h2>
<p>Antes de enviar qualquer questionário, classifique o fornecedor com poucas perguntas: ele terá acesso a dados pessoais ou sensíveis? Acessa sistemas ou a rede da empresa? É crítico para a operação, a ponto de uma falha parar o negócio? Quantos dados e de quantos titulares?</p>
<p>Com as respostas, defina níveis, por exemplo <strong>baixo, médio e alto risco</strong>. Um fornecedor de material de escritório não precisa responder às mesmas perguntas de um provedor de nuvem que hospeda a base de clientes.</p>

<h2 id="questionario">2. Monte o questionário</h2>
<p>O questionário deve ser objetivo e baseado em referências reconhecidas, como ISO 27001, LGPD, NIST e CIS Controls. Para os fornecedores de risco alto, cubra pelo menos:</p>
<ul>
<li>políticas de segurança e responsáveis;</li>
<li>controle de acessos, autenticação em múltiplos fatores e revisões periódicas;</li>
<li>criptografia de dados em trânsito e armazenados;</li>
<li>cópias de segurança e continuidade de negócios;</li>
<li>gestão de vulnerabilidades e atualizações;</li>
<li>resposta a incidentes e prazo de comunicação ao cliente;</li>
<li>tratamento de dados pessoais: finalidade, localização, subcontratados e eliminação ao fim do contrato;</li>
<li>certificações e relatórios independentes, como ISO 27001 ou SOC 2.</li>
</ul>

<h2 id="evidencias">3. Peça evidências</h2>
<p>Resposta sem evidência vale pouco. Para os itens mais importantes, peça documentos: certificado ISO 27001 válido (e o escopo dele), relatório SOC 2, políticas, resultado de testes de intrusão ou prints de configuração. Registre tudo junto da avaliação, com data, para mostrar a um auditor depois.</p>

<h2 id="aprovacao">4. Aprovação e contrato</h2>
<p>Com as respostas e evidências, a área de segurança ou compliance emite um parecer: aprovado, aprovado com ressalvas (com plano de ação e prazo) ou reprovado. Defina quem aprova em cada nível de risco, por exemplo com uma matriz RACI em que compliance é responsável, TI executa a análise técnica e o jurídico aprova as cláusulas.</p>
<p>O contrato deve refletir o que foi avaliado: obrigações de segurança, comunicação de incidentes, direito de auditoria e devolução dos dados. A assinatura digital com trilha de auditoria facilita guardar a prova de aceite.</p>

<h2 id="monitoramento">5. Monitoramento contínuo</h2>
<p>A avaliação não termina na contratação. Reavalie periodicamente, com frequência maior para os de alto risco, e sempre que houver mudança relevante no serviço, um incidente ou o vencimento de uma certificação. Indicadores como percentual de fornecedores avaliados, pendências abertas e prazo médio de correção mostram à diretoria como o risco de terceiros está evoluindo.</p>
<p>A Comply360 reúne classificação de risco, questionários ISO e LGPD, evidências, aprovação e assinatura digital em um só fluxo. Conheça a <a href="/solucoes/avaliacao-de-fornecedores/">solução de avaliação de fornecedores e parceiros</a>.</p>`
  },
];

// Páginas próprias das soluções principais (/solucoes/<slug>/).
exports.solucoes = [
  {
    slug: 'gestao-de-conformidade',
    nome: 'Gestão de conformidade',
    titulo: 'Plataforma de gestão de conformidade',
    descricao: 'Acompanhe a aderência da empresa a normas, leis e frameworks em um só lugar: requisitos, riscos, controles, evidências, auditorias e indicadores.',
    intro: 'A visão 360 da conformidade da sua empresa e de terceiros: por área, norma, framework, processo ou questionário customizado.',
    inclui: [
      'Biblioteca de requisitos de normas, leis e frameworks de mercado',
      'Mapeamento de riscos e controles por área e processo',
      'Padronização de controles reaproveitados entre normas',
      'Registro de evidências com responsáveis e prazos',
      'Indicadores de conformidade e de não conformidade',
      'Compartilhamento seguro de informações com terceiros',
    ],
    etapas: [
      ['Requisitos', 'Selecione as normas, leis e frameworks que se aplicam à empresa.'],
      ['Riscos', 'Identifique e classifique os riscos ligados a cada requisito.'],
      ['Controles', 'Defina os controles, os responsáveis e a frequência de execução.'],
      ['Execução', 'As áreas executam os controles e anexam as evidências.'],
      ['Monitoramento', 'Indicadores mostram pendências, atrasos e não conformidades.'],
      ['Auditoria', 'Auditorias internas e externas encontram tudo organizado.'],
    ],
    faq: [
      ['O que é gestão de conformidade?', 'É o conjunto de processos e controles que garante que a empresa cumpre leis, normas e compromissos assumidos com clientes, e que consegue comprovar isso com evidências.'],
      ['Quais normas a Comply360 cobre?', 'A Comply360 trabalha com normas ISO (como 27001, 27701, 22301, 31000, 37301, 38500 e 20000), LGPD, NIST, ITIL, CIS Controls e questionários customizados conforme a necessidade da empresa.'],
      ['Um mesmo controle pode atender a várias normas?', 'Sim. A padronização de controles permite que uma única evidência, como a revisão periódica de acessos, seja aproveitada em vários requisitos de normas diferentes.'],
    ],
    materias: ['por-que-empresas-precisam-de-gestao-de-conformidade', 'adequacao-lgpd-passo-a-passo', 'iso-27001-o-que-e-como-se-preparar'],
  },
  {
    slug: 'lgpd',
    nome: 'Conformidade com a LGPD',
    titulo: 'Conformidade com a LGPD',
    descricao: 'Organize a adequação à Lei Geral de Proteção de Dados: mapeamento de dados, bases legais, direitos dos titulares, incidentes, operadores e evidências.',
    intro: 'Organize os requisitos da Lei Geral de Proteção de Dados (Lei 13.709/2018) e mantenha as evidências prontas para clientes e para a ANPD.',
    inclui: [
      'Requisitos da LGPD organizados por tema e por área',
      'Acompanhamento do mapeamento de dados e das bases legais',
      'Controles de segurança alinhados a ISO 27001 e ISO 27701',
      'Questionários LGPD para avaliar operadores e parceiros',
      'Registro de evidências, responsáveis e prazos',
      'Indicadores de conformidade para a diretoria',
    ],
    etapas: [
      ['Diagnóstico', 'Levantamento da situação atual frente aos requisitos da lei.'],
      ['Plano de ação', 'Priorização das lacunas por risco, com responsáveis e prazos.'],
      ['Implementação', 'Execução dos controles e registro das evidências.'],
      ['Monitoramento', 'Revisões periódicas e acompanhamento de novos processos e fornecedores.'],
    ],
    faq: [
      ['A LGPD vale para pequenas empresas?', 'Sim. A lei vale para qualquer empresa que trate dados pessoais. Agentes de tratamento de pequeno porte têm algumas obrigações simplificadas pela Resolução CD/ANPD nº 2/2022.'],
      ['Qual a multa da LGPD?', 'A multa simples pode chegar a 2% do faturamento da empresa no Brasil, limitada a R$ 50 milhões por infração, além de outras sanções como advertência, publicização e bloqueio ou eliminação dos dados.'],
      ['Em quanto tempo devo comunicar um incidente?', 'A Resolução CD/ANPD nº 15/2024 estabelece o prazo de três dias úteis, contados do conhecimento do incidente que possa acarretar risco ou dano relevante aos titulares.'],
    ],
    materias: ['adequacao-lgpd-passo-a-passo', 'avaliacao-de-fornecedores-questionario-de-seguranca', 'por-que-empresas-precisam-de-gestao-de-conformidade'],
  },
  {
    slug: 'iso-27001',
    nome: 'ISO 27001 e ISO 27002',
    titulo: 'ISO 27001 e ISO 27002: segurança da informação',
    descricao: 'Acompanhe os requisitos da ISO/IEC 27001:2022 e os 93 controles do Anexo A, com riscos, Declaração de Aplicabilidade, evidências e auditorias.',
    intro: 'Estruture e mantenha o sistema de gestão de segurança da informação, da análise de riscos à auditoria de certificação.',
    inclui: [
      'Requisitos das cláusulas 4 a 10 da ISO/IEC 27001:2022',
      'Os 93 controles do Anexo A, com orientação da ISO 27002',
      'Análise de riscos e apoio à Declaração de Aplicabilidade',
      'Evidências organizadas para auditorias internas e de certificação',
      'Gestão de acessos com menor privilégio, aprovação formal e revisões periódicas',
      'Indicadores e SLA de correção de não conformidades',
    ],
    etapas: [
      ['Escopo', 'Definição das unidades, processos e sistemas do SGSI.'],
      ['Riscos e controles', 'Análise de riscos e seleção dos controles aplicáveis.'],
      ['Evidências', 'Execução dos controles com registros e responsáveis.'],
      ['Auditoria', 'Auditoria interna, análise crítica e preparação para a certificação.'],
    ],
    faq: [
      ['Qual a diferença entre ISO 27001 e ISO 27002?', 'A ISO 27001 traz os requisitos certificáveis do sistema de gestão de segurança da informação. A ISO 27002 é um guia que explica como implementar cada controle do Anexo A. Só a 27001 é certificável.'],
      ['Quantos controles tem a ISO 27001:2022?', 'O Anexo A da versão 2022 tem 93 controles, organizados em quatro temas: organizacionais, pessoas, físicos e tecnológicos.'],
      ['Quanto tempo vale o certificado?', 'O certificado vale três anos, com auditorias de manutenção anuais e recertificação ao final do ciclo.'],
    ],
    materias: ['iso-27001-o-que-e-como-se-preparar', 'avaliacao-de-fornecedores-questionario-de-seguranca', 'por-que-empresas-precisam-de-gestao-de-conformidade'],
  },
  {
    slug: 'avaliacao-de-fornecedores',
    nome: 'Avaliação de fornecedores e parceiros',
    titulo: 'Avaliação de fornecedores, parceiros e clientes',
    tituloSEO: 'Avaliação de fornecedores e parceiros',
    descricao: 'Avalie fornecedores, parceiros e clientes por risco: classificação, questionários ISO e LGPD, evidências, aprovação e assinatura digital.',
    intro: 'Um fluxo único para avaliar terceiros com base em risco, do questionário à aprovação com assinatura digital.',
    inclui: [
      'Classificação de risco de cada fornecedor, parceiro ou cliente',
      'Questionários ISO, LGPD e customizados conforme o nível de risco',
      'Coleta e guarda de evidências junto da avaliação',
      'Fluxo de aprovação com responsáveis definidos',
      'Assinatura digital com valor jurídico, por plataformas de mercado',
      'Reavaliações periódicas e indicadores por fornecedor',
    ],
    etapas: [
      ['Classificação de risco', 'Perguntas iniciais definem o nível de exigência.'],
      ['Questionário', 'O terceiro responde ao questionário ISO, LGPD ou customizado.'],
      ['Evidências', 'Documentos comprovam as respostas mais importantes.'],
      ['Aprovação e assinatura', 'Parecer, aprovação formal e assinatura digital com trilha de auditoria.'],
    ],
    faq: [
      ['Por que avaliar fornecedores?', 'Porque muitos incidentes começam em terceiros e porque, pela LGPD, a empresa continua responsável pelos dados tratados por seus operadores. Clientes e auditores também pedem evidências desse processo.'],
      ['Todos os fornecedores precisam responder ao mesmo questionário?', 'Não. O ideal é classificar o risco antes e aplicar questionários proporcionais: mais completos para quem acessa dados ou sistemas críticos, mais simples para os demais.'],
      ['A assinatura digital tem valor jurídico?', 'Sim, quando feita por plataformas que garantem autenticidade, integridade, não repúdio e trilha de auditoria da assinatura.'],
    ],
    materias: ['avaliacao-de-fornecedores-questionario-de-seguranca', 'adequacao-lgpd-passo-a-passo', 'iso-27001-o-que-e-como-se-preparar'],
  },
];
