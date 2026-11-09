// Gera todas as páginas do site comply360.com.br.
// Uso (na pasta comply360): node gerador/gerar.js
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { materias, solucoes } = require('./conteudo');

const RAIZ = path.join(__dirname, '..');
const SITE = 'https://comply360.com.br';
const NOME = 'Comply360';
const EMAIL = 'contato@comply360.com.br';
const HOJE = new Date().toISOString().slice(0, 10);

const hash = f => crypto.createHash('md5').update(fs.readFileSync(path.join(RAIZ, f))).digest('hex').slice(0, 8);
const V_CSS = hash('assets/css/style.css');
const V_JS = hash('assets/js/main.js');

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const dataBR = d => new Date(d + 'T12:00:00').toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
// Mais recentes primeiro; na mesma data, vale a ordem do conteudo.js
const ordenadas = materias.map((m, i) => ({ ...m, i })).sort((a, b) => b.data.localeCompare(a.data) || a.i - b.i);
const porSlug = slug => ordenadas.find(m => m.slug === slug);

// Fotos com versão WebP (gerada à parte em <nome>-<largura>.webp) e JPG de reserva.
const LARGURAS = {
  'hero.jpg': [800, 1536], 'gestao-conformidade.jpg': [600, 1200], 'plataforma.jpg': [600, 1200],
  'lgpd.jpg': [600, 1200], 'iso27002.jpg': [600, 1200]
};
function foto(arquivo, alt, largura, altura, { carregar = 'lazy', sizes = '(max-width: 760px) 100vw, 600px', classe = '', extra = '' } = {}) {
  const img = `<img${classe ? ` class="${classe}"` : ''} src="/assets/img/${arquivo}" alt="${esc(alt)}" width="${largura}" height="${altura}"${carregar === 'eager' ? ' fetchpriority="high"' : ' loading="lazy"'}${extra}>`;
  const ws = LARGURAS[arquivo];
  if (!ws) return img;
  const base = arquivo.replace(/\.jpg$/, '');
  return `<picture><source type="image/webp" srcset="${ws.map(w => `/assets/img/${base}-${w}.webp ${w}w`).join(', ')}" sizes="${sizes}">${img}</picture>`;
}

const svg = d => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const icones = {
  escudo: svg('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>'),
  alerta: svg('<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>'),
  camadas: svg('<path d="m12 2 10 5-10 5L2 7l10-5z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>'),
  pessoas: svg('<circle cx="9" cy="7" r="4"/><path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2M16 3.1a4 4 0 0 1 0 7.8M22 21v-2a4 4 0 0 0-3-3.9"/>'),
  lupa: svg('<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>'),
  grafico: svg('<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 6-6"/><path d="M16 8h4v4"/>'),
  lista: svg('<path d="M9 6h11M9 12h11M9 18h11"/><path d="m3 6 1 1 2-2M3 12l1 1 2-2M3 18l1 1 2-2"/>'),
  caneta: svg('<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>'),
  chave: svg('<circle cx="7.5" cy="15.5" r="4.5"/><path d="m10.7 12.3 9.3-9.3M17 6l3 3M14 9l2 2"/>'),
  email: svg('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>'),
  mapa: svg('<path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>'),
  relogio: svg('<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>')
};

const MENU = [
  ['/', 'Início'],
  ['/solucoes/', 'Soluções'],
  ['/normas-e-frameworks/', 'Normas'],
  ['/sobre/', 'Sobre'],
  ['/blog/', 'Blog'],
];

function pagina({ caminho, titulo, tituloSEO, descricao, conteudo, imagem = 'og.jpg', tipo = 'website', jsonld = [], semIndex = false, preload = '' }) {
  const url = SITE + caminho;
  // O Google corta títulos por volta de 60 caracteres: só acrescenta a marca se couber
  const base = tituloSEO || titulo;
  const tituloCompleto = caminho === '/' || `${base} | ${NOME}`.length > 60 ? base : `${base} | ${NOME}`;
  const menu = MENU.map(([href, txt]) => {
    const atual = href === '/' ? caminho === '/' : caminho.startsWith(href);
    return `<li><a href="${href}"${atual ? ' aria-current="page"' : ''}>${txt}</a></li>`;
  }).join('\n          ');
  const ld = jsonld.map(o => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n  ');
  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(tituloCompleto)}</title>
  <meta name="description" content="${esc(descricao)}">
  <link rel="canonical" href="${url}">
  ${semIndex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
  <meta name="theme-color" content="#071427">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:site_name" content="${NOME}">
  <meta property="og:type" content="${tipo}">
  <meta property="og:title" content="${esc(titulo)}">
  <meta property="og:description" content="${esc(descricao)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${SITE}/assets/img/${imagem}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(titulo)}">
  <meta name="twitter:description" content="${esc(descricao)}">
  <meta name="twitter:image" content="${SITE}/assets/img/${imagem}">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png">
  <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
  <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600&family=Inter:wght@400;500;600;700&display=swap">
  ${preload}<link rel="stylesheet" href="/assets/css/style.css?v=${V_CSS}">
  ${ld}
</head>
<body>
  <a class="pular" href="#conteudo">Pular para o conteúdo</a>
  <header class="topo">
    <div class="container">
      <a class="marca" href="/" aria-label="${NOME}, página inicial">
        <img src="/assets/img/logo.png" alt="" width="54" height="54">
        <span>Comply360</span>
      </a>
      <button class="botao-menu" aria-expanded="false" aria-controls="menu">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg> Menu
      </button>
      <nav class="menu" id="menu" aria-label="Principal">
        <ul>
          ${menu}
          <li><a class="cta-menu" href="/contato/"${caminho.startsWith('/contato/') ? ' aria-current="page"' : ''}>Fale conosco</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main id="conteudo">
${conteudo}
  </main>

  <footer class="rodape">
    <div class="container">
      <div class="colunas">
        <div>
          <img class="logo-rodape" src="/icon-192.png" alt="Símbolo da Comply360" width="72" height="72" loading="lazy">
          <p>Gestão de conformidade com visão 360: normas, leis, frameworks, riscos, fornecedores e auditorias em um só lugar.</p>
        </div>
        <div>
          <h2>Navegação</h2>
          <ul>
            <li><a href="/solucoes/">Soluções</a></li>
            <li><a href="/normas-e-frameworks/">Normas e frameworks</a></li>
            <li><a href="/sobre/">Sobre a Comply360</a></li>
            <li><a href="/blog/">Blog</a></li>
            <li><a href="/contato/">Contato</a></li>
          </ul>
        </div>
        <div>
          <h2>Contato</h2>
          <ul>
            <li><a href="mailto:${EMAIL}">${EMAIL}</a></li>
            <li><a href="/privacidade/">Política de privacidade</a></li>
            <li><a href="/aviso-legal/">Aviso legal</a></li>
          </ul>
        </div>
      </div>
      <div class="base">
        <span>© <span id="ano">${new Date().getFullYear()}</span> Comply360. Todos os direitos reservados.</span>
        <span>Gestão de conformidade</span>
      </div>
    </div>
  </footer>
  <script src="/assets/js/main.js?v=${V_JS}" defer></script>
</body>
</html>
`;
}

function trilha(itens) {
  const lis = itens.map(([href, txt], i) => i === itens.length - 1
    ? `<li aria-current="page">${esc(txt)}</li>`
    : `<li><a href="${href}">${esc(txt)}</a></li>`).join('');
  const ld = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: itens.map(([href, txt], i) => ({ '@type': 'ListItem', position: i + 1, name: txt, item: SITE + href }))
  };
  return { html: `<nav class="trilha" aria-label="Você está em"><ol>${lis}</ol></nav>`, ld };
}

function placa(m, classe = '') {
  return `<div class="placa${classe}" aria-hidden="true"><div><small>${esc(m.tema)}</small><strong>${esc(m.titulo.split(':')[0])}</strong></div></div>`;
}

function cartaoMateria(m) {
  const midia = m.imagem
    ? foto(m.imagem, m.imagemAlt, 1200, 800, { sizes: '(max-width: 760px) 100vw, 380px' })
    : placa(m);
  return `<article class="cartao" data-tema="${esc(m.tema)}">
        <div class="midia">${midia}</div>
        <div class="corpo">
          <span class="tag">${esc(m.tema)}</span>
          <h3><a href="/blog/${m.slug}/">${esc(m.titulo)}</a></h3>
          <p>${esc(m.descricao)}</p>
          <span class="meta"><time datetime="${m.data}">${dataBR(m.data)}</time></span>
        </div>
      </article>`;
}

const ORG = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': SITE + '/#organizacao',
  name: NOME,
  url: SITE + '/',
  logo: SITE + '/icon-512.png',
  image: SITE + '/assets/img/og.jpg',
  email: EMAIL,
  description: 'Solução de gestão de conformidade: aderência a normas, leis e frameworks, gestão de riscos e controles, avaliação de fornecedores e auditorias.',
  areaServed: { '@type': 'Country', name: 'Brasil' },
  knowsAbout: ['Gestão de conformidade', 'Compliance', 'LGPD', 'ISO 27001', 'ISO 27002', 'ISO 27701', 'ISO 22301', 'ISO 31000', 'ISO 37301', 'Gestão de riscos', 'Avaliação de fornecedores', 'Auditoria']
};

// Recursos da solução: [ícone, nome, texto]
const RECURSOS = [
  ['escudo', 'Gestão de conformidade', 'Visão da aderência a normas, leis, frameworks e auditorias, por área, processo ou empresa avaliada.'],
  ['alerta', 'Gestão de riscos', 'Riscos mapeados e ligados aos requisitos e controles, para priorizar o que mais importa.'],
  ['camadas', 'Padronização de controles', 'Um mesmo controle e uma mesma evidência aproveitados em várias normas.'],
  ['pessoas', 'Avaliação de fornecedores e parceiros', 'Classificação de risco, questionários ISO e LGPD, evidências e aprovação formal.'],
  ['lupa', 'Auditorias internas e externas', 'Evidências organizadas e rastreáveis para auditorias, clientes e reguladores.'],
  ['grafico', 'Indicadores de conformidade', 'Índices de conformidade e não conformidade e SLA de correção por período.'],
  ['lista', 'Questionários customizados', 'Questionários de clientes e parceiros ou criados conforme a necessidade da empresa.'],
  ['caneta', 'Assinatura digital', 'Assinatura com valor jurídico por plataformas de mercado, com autenticidade, integridade e trilha de auditoria.'],
  ['chave', 'Gestão de acessos', 'Menor privilégio, perfis de acesso, aprovação formal, registros de atividade e revisões periódicas.'],
];
const paginaSolucao = nome => solucoes.find(s => s.nome === nome);
const recursoHTML = ([ic, titulo, texto]) => {
  const sp = paginaSolucao(titulo);
  return `<div class="servico">
            <div class="icone">${icones[ic]}</div>
            <h3>${sp ? `<a href="/solucoes/${sp.slug}/">${titulo}</a>` : titulo}</h3>
            <p>${texto}</p>${sp ? `\n            <p class="servico-link"><a href="/solucoes/${sp.slug}/" aria-hidden="true" tabindex="-1">Saiba mais →</a></p>` : ''}
          </div>`;
};

// Normas e frameworks: [sigla, nome, para que serve, link de solução]
const NORMAS = [
  ['ISO/IEC 27001 e 27002', 'Segurança da informação', 'Requisitos do sistema de gestão de segurança da informação e guia de implementação dos 93 controles do Anexo A.', '/solucoes/iso-27001/'],
  ['ISO/IEC 27701', 'Privacidade', 'Extensão da ISO 27001 para gestão da privacidade da informação, útil para demonstrar conformidade com a LGPD.'],
  ['LGPD (Lei 13.709/2018)', 'Proteção de dados', 'Lei brasileira que regula o tratamento de dados pessoais, fiscalizada pela ANPD.', '/solucoes/lgpd/'],
  ['ISO 22301', 'Continuidade de negócios', 'Requisitos do sistema de gestão de continuidade de negócios, para manter a operação durante e após incidentes.'],
  ['ISO 31000', 'Gestão de riscos', 'Princípios e diretrizes para identificar, analisar, avaliar e tratar riscos em qualquer organização.'],
  ['ISO 37301', 'Compliance', 'Requisitos do sistema de gestão de compliance, com foco em cultura, obrigações e controles.'],
  ['ISO/IEC 38500', 'Governança de TI', 'Princípios para a governança corporativa do uso da tecnologia da informação pela alta direção.'],
  ['ISO/IEC 20000', 'Serviços de TI', 'Requisitos do sistema de gestão de serviços de TI, alinhado às práticas do ITIL.'],
  ['NIST Cybersecurity Framework', 'Cibersegurança', 'Framework do instituto norte-americano NIST para organizar e medir a maturidade em cibersegurança.'],
  ['CIS Controls', 'Controles de segurança', 'Conjunto priorizado de controles técnicos de segurança mantido pelo Center for Internet Security.'],
  ['ITIL', 'Gestão de serviços', 'Boas práticas de gestão de serviços de TI, de incidentes e mudanças à melhoria contínua.'],
  ['Questionários e auditorias', 'Clientes e parceiros', 'Questionários de clientes e parceiros, auditorias internas e externas e questionários customizados.', '/solucoes/avaliacao-de-fornecedores/'],
];

const FAQ = [
  ['O que é a Comply360?', 'A Comply360 é uma solução para apoiar a visão completa da conformidade da sua empresa ou de terceiros, por área, norma, framework, avaliação de fornecedores, processos, auditorias ou questionários customizados.'],
  ['Quais normas e leis a Comply360 cobre?', 'Normas ISO como 27001, 27002, 27701, 22301, 31000, 37301, 38500 e 20000, a LGPD, o NIST Cybersecurity Framework, CIS Controls, ITIL e questionários customizados.'],
  ['A Comply360 serve para avaliar fornecedores?', 'Sim. A avaliação de parceiros e clientes inclui classificação de risco, questionários ISO e LGPD, evidências, aprovação e assinatura digital.'],
  ['Como conhecer a Comply360?', 'Envie uma mensagem pela página de contato ou para contato@comply360.com.br contando a necessidade da sua empresa. Retornamos para marcar uma conversa.'],
];

// ---------- Páginas ----------
const paginas = {};

// Início
paginas['index.html'] = pagina({
  caminho: '/',
  titulo: 'Comply360 | Gestão de conformidade, LGPD e ISO 27001',
  descricao: 'Gestão de conformidade com visão 360: LGPD, ISO 27001 e outras normas, riscos, controles, avaliação de fornecedores e auditorias em um só lugar.',
  preload: '<link rel="preload" as="image" type="image/webp" imagesrcset="/assets/img/hero-800.webp 800w, /assets/img/hero-1536.webp 1536w" imagesizes="100vw">\n  ',
  jsonld: [ORG, {
    '@context': 'https://schema.org', '@type': 'WebSite', '@id': SITE + '/#site', url: SITE + '/', name: NOME, inLanguage: 'pt-BR', publisher: { '@id': SITE + '/#organizacao' }
  }, {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))
  }],
  conteudo: `
    <section class="hero">
      ${foto('hero.jpg', '', 1536, 1024, { carregar: 'eager', sizes: '100vw' })}
      <div class="container">
        <span class="sobretitulo">Gestão de conformidade</span>
        <h1>A conformidade da sua empresa com <span class="destaque">visão 360</span></h1>
        <p>Normas, leis, frameworks, riscos, fornecedores e auditorias em um só lugar. A Comply360 mostra a aderência da sua empresa e de terceiros e apoia decisões estratégicas e táticas.</p>
        <div class="acoes">
          <a class="botao botao-destaque" href="/contato/">Fale conosco</a>
          <a class="botao botao-claro" href="/solucoes/">Conhecer as soluções</a>
        </div>
        <ul class="pontos"><li>LGPD</li><li>ISO 27001</li><li>Riscos e controles</li><li>Fornecedores</li></ul>
      </div>
    </section>

    <section class="secao" aria-labelledby="solucoes-titulo">
      <div class="container">
        <div class="secao-cabeca">
          <span class="sobretitulo">O que a Comply360 faz</span>
          <h2 id="solucoes-titulo">Tudo o que a conformidade exige, organizado</h2>
          <p>Nos pilares de tecnologia, governança, riscos, privacidade, segurança da informação e continuidade de negócios.</p>
        </div>
        <div class="grade grade-3">
          ${RECURSOS.slice(0, 6).map(recursoHTML).join('\n          ')}
        </div>
        <p style="margin-top:28px"><a class="botao botao-contorno" href="/solucoes/">Ver todas as soluções</a></p>
      </div>
    </section>

    <section class="secao faixa" aria-labelledby="fluxo-titulo">
      <div class="container">
        <div class="secao-cabeca">
          <span class="sobretitulo">Como funciona</span>
          <h2 id="fluxo-titulo">Do requisito à auditoria, em um fluxo contínuo</h2>
          <p>Cada requisito vira risco avaliado, controle com responsável e evidência pronta para a auditoria.</p>
        </div>
        <div class="grade grade-3">
          ${solucoes[0].etapas.map(([t, x], i) => `<div class="etapa"><span class="num destaque">0${i + 1}</span><h3>${esc(t)}</h3><p>${esc(x)}</p></div>`).join('\n          ')}
        </div>
      </div>
    </section>

    <section class="secao" aria-labelledby="normas-titulo">
      <div class="container dupla">
        ${foto('plataforma.jpg', 'Ilustração de prancheta com itens de conformidade marcados sobre uma mão, em fundo digital azul', 1200, 800)}
        <div>
          <span class="sobretitulo">Normas e frameworks</span>
          <h2 id="normas-titulo">As principais referências de mercado</h2>
          <p>Acompanhe a aderência a normas ISO, à LGPD e a frameworks de cibersegurança, ou crie questionários conforme a necessidade de clientes e parceiros.</p>
          <ul class="selos">
            <li>ISO 27001/27002</li><li>ISO 27701</li><li>LGPD</li><li>ISO 22301</li><li>ISO 31000</li><li>ISO 37301</li><li>ISO 38500</li><li>ISO 20000</li><li>NIST</li><li>CIS Controls</li><li>ITIL</li>
          </ul>
          <p style="margin-top:24px"><a class="botao botao-primario" href="/normas-e-frameworks/">Conhecer as normas</a></p>
        </div>
      </div>
    </section>

    <section class="secao secao-alt" aria-labelledby="objetivos-titulo">
      <div class="container">
        <div class="secao-cabeca">
          <span class="sobretitulo">Para que serve</span>
          <h2 id="objetivos-titulo">Conformidade que apoia decisões</h2>
        </div>
        <div class="grade grade-3">
          <div class="valor"><h3>Visão de aderência</h3><p>Quanto a empresa atende de cada norma, lei, framework ou auditoria, por área e por período.</p></div>
          <div class="valor"><h3>Riscos sob controle</h3><p>Riscos mapeados e tratados com controles padronizados e responsáveis definidos.</p></div>
          <div class="valor"><h3>Terceiros avaliados</h3><p>Compartilhamento seguro com fornecedores, parceiros e clientes, com avaliação por risco.</p></div>
          <div class="valor"><h3>Evidências prontas</h3><p>Registros organizados para auditorias internas e externas e para questionários de clientes.</p></div>
          <div class="valor"><h3>Indicadores claros</h3><p>Índices de conformidade, não conformidades e prazos de correção para a diretoria.</p></div>
          <div class="valor"><h3>Investimentos certos</h3><p>Prioridades baseadas em risco para decidir onde investir em segurança e conformidade.</p></div>
        </div>
      </div>
    </section>

    <section class="secao" aria-labelledby="blog-titulo">
      <div class="container">
        <div class="secao-cabeca">
          <span class="sobretitulo">Blog</span>
          <h2 id="blog-titulo">Conteúdo sobre conformidade, LGPD e segurança</h2>
          <p>Guias práticos para quem cuida de compliance, privacidade e segurança da informação.</p>
        </div>
        <div class="grade grade-3">
      ${ordenadas.slice(0, 3).map(cartaoMateria).join('\n      ')}
        </div>
        <p style="margin-top:28px"><a class="botao botao-contorno" href="/blog/">Ver todas as matérias</a></p>
      </div>
    </section>

    <section class="secao secao-alt faq" aria-labelledby="faq-titulo">
      <div class="container" style="max-width:820px">
        <div class="secao-cabeca">
          <span class="sobretitulo">Dúvidas frequentes</span>
          <h2 id="faq-titulo">Perguntas frequentes</h2>
        </div>
        ${FAQ.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('\n        ')}
      </div>
    </section>

    <section class="secao">
      <div class="container">
        <div class="chamada">
          <div>
            <h2>Quer ver a conformidade da sua empresa com <span class="destaque">visão 360</span>?</h2>
            <p>Conte qual norma, lei ou avaliação é prioridade para você. Retornamos para marcar uma conversa.</p>
          </div>
          <a class="botao botao-destaque" href="/contato/">Fale conosco</a>
        </div>
      </div>
    </section>`
});

// Soluções
{
  const t = trilha([['/', 'Início'], ['/solucoes/', 'Soluções']]);
  paginas['solucoes/index.html'] = pagina({
    caminho: '/solucoes/',
    titulo: 'Soluções de gestão de conformidade, riscos e fornecedores',
    tituloSEO: 'Soluções de conformidade, riscos e fornecedores',
    descricao: 'Gestão de conformidade, gestão de riscos, padronização de controles, avaliação de fornecedores, auditorias, indicadores, assinatura digital e gestão de acessos.',
    jsonld: [t.ld, {
      '@context': 'https://schema.org', '@type': 'ItemList', name: 'Soluções da Comply360',
      itemListElement: RECURSOS.map(([, nome, texto], i) => ({
        '@type': 'ListItem', position: i + 1,
        item: { '@type': 'Service', name: nome, description: texto, provider: { '@id': SITE + '/#organizacao' },
          ...(paginaSolucao(nome) ? { url: `${SITE}/solucoes/${paginaSolucao(nome).slug}/` } : {}) }
      }))
    }],
    conteudo: `
    <section class="cabecalho-pagina">
      <div class="container">
        ${t.html}
        <h1>Soluções</h1>
        <p>Recursos para acompanhar a conformidade da sua empresa e de terceiros, do requisito à auditoria.</p>
      </div>
    </section>
    <section class="secao">
      <div class="container">
        <div class="grade grade-3">
          ${RECURSOS.map(recursoHTML).join('\n          ')}
        </div>
      </div>
    </section>
    <section class="secao secao-alt">
      <div class="container">
        <div class="secao-cabeca"><span class="sobretitulo">Por norma ou tema</span><h2>Soluções em destaque</h2></div>
        <div class="grade grade-2">
          ${solucoes.map(s => `<div class="servico"><h3><a href="/solucoes/${s.slug}/">${esc(s.titulo)}</a></h3><p>${esc(s.descricao)}</p><p class="servico-link"><a href="/solucoes/${s.slug}/" aria-hidden="true" tabindex="-1">Saiba mais →</a></p></div>`).join('\n          ')}
        </div>
      </div>
    </section>
    <section class="secao">
      <div class="container">
        <div class="chamada">
          <div>
            <h2>Não sabe por onde começar?</h2>
            <p>Uma conversa inicial ajuda a entender quais normas e controles são prioridade para a sua empresa.</p>
          </div>
          <a class="botao botao-destaque" href="/contato/">Fale conosco</a>
        </div>
      </div>
    </section>`
  });
}

// Páginas de cada solução principal
for (const s of solucoes) {
  const t = trilha([['/', 'Início'], ['/solucoes/', 'Soluções'], [`/solucoes/${s.slug}/`, s.nome]]);
  const relacionadas = s.materias.map(porSlug).filter(Boolean);
  paginas[`solucoes/${s.slug}/index.html`] = pagina({
    caminho: `/solucoes/${s.slug}/`,
    titulo: s.titulo,
    tituloSEO: s.tituloSEO,
    descricao: s.descricao,
    jsonld: [t.ld, {
      '@context': 'https://schema.org', '@type': 'Service', name: s.titulo, description: s.descricao, url: `${SITE}/solucoes/${s.slug}/`,
      serviceType: s.nome, provider: { '@id': SITE + '/#organizacao' }, areaServed: { '@type': 'Country', name: 'Brasil' }
    }, {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: s.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))
    }],
    conteudo: `
    <section class="cabecalho-pagina">
      <div class="container">
        ${t.html}
        <h1>${esc(s.titulo)}</h1>
        <p>${esc(s.intro)}</p>
      </div>
    </section>
    <section class="secao">
      <div class="container dupla" style="align-items:start">
        <div>
          <span class="sobretitulo">O que está incluído</span>
          <h2>Como a Comply360 ajuda</h2>
          <ul class="lista-check">
            ${s.inclui.map(i => `<li>${esc(i)}</li>`).join('\n            ')}
          </ul>
          <a class="botao botao-primario" href="/contato/?assunto=${encodeURIComponent(s.nome)}">Fale conosco</a>
        </div>
        <div>
          <span class="sobretitulo">Como funciona</span>
          <h2>Etapas</h2>
          ${s.etapas.map(([titulo, texto], i) => `<div class="valor" style="margin-bottom:18px"><h3>${i + 1}. ${esc(titulo)}</h3><p>${esc(texto)}</p></div>`).join('\n          ')}
        </div>
      </div>
    </section>
    <section class="secao secao-alt faq">
      <div class="container" style="max-width:820px">
        <div class="secao-cabeca"><span class="sobretitulo">Dúvidas frequentes</span><h2>Perguntas sobre ${esc(s.nome.replace(/^Conformidade com a /, ''))}</h2></div>
        ${s.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('\n        ')}
      </div>
    </section>
    <section class="secao">
      <div class="container">
        <div class="secao-cabeca"><span class="sobretitulo">Para ler antes</span><h2>Matérias relacionadas</h2></div>
        <div class="grade grade-3">
      ${relacionadas.map(cartaoMateria).join('\n      ')}
        </div>
      </div>
    </section>`
  });
}

// Normas e frameworks
{
  const t = trilha([['/', 'Início'], ['/normas-e-frameworks/', 'Normas e frameworks']]);
  paginas['normas-e-frameworks/index.html'] = pagina({
    caminho: '/normas-e-frameworks/',
    titulo: 'Normas, leis e frameworks de conformidade',
    tituloSEO: 'Normas e frameworks: ISO, LGPD, NIST e CIS',
    descricao: 'ISO 27001, 27002, 27701, 22301, 31000, 37301, 38500 e 20000, LGPD, NIST Cybersecurity Framework, CIS Controls e ITIL: para que serve cada referência.',
    jsonld: [t.ld, {
      '@context': 'https://schema.org', '@type': 'ItemList', name: 'Normas, leis e frameworks acompanhados pela Comply360',
      itemListElement: NORMAS.map(([sigla, area], i) => ({ '@type': 'ListItem', position: i + 1, name: `${sigla} (${area})` }))
    }],
    conteudo: `
    <section class="cabecalho-pagina">
      <div class="container">
        ${t.html}
        <h1>Normas, leis e frameworks</h1>
        <p>As referências de mercado que a Comply360 ajuda a acompanhar, e para que serve cada uma.</p>
      </div>
    </section>
    <section class="secao">
      <div class="container">
        <div class="grade grade-3">
          ${NORMAS.map(([sigla, area, texto, link]) => `<div class="servico"><span class="tag">${esc(area)}</span><h3 style="margin-top:12px">${link ? `<a href="${link}">${esc(sigla)}</a>` : esc(sigla)}</h3><p>${esc(texto)}</p></div>`).join('\n          ')}
        </div>
        <p class="legenda" style="margin-top:20px">Os nomes das normas pertencem às respectivas organizações (ISO, IEC, NIST, CIS e Axelos). A Comply360 não é um organismo certificador.</p>
      </div>
    </section>
    <section class="secao secao-alt">
      <div class="container">
        <div class="chamada">
          <div>
            <h2>Precisa atender a mais de uma norma?</h2>
            <p>Com controles padronizados, a mesma evidência atende a vários requisitos.</p>
          </div>
          <a class="botao botao-destaque" href="/contato/">Fale conosco</a>
        </div>
      </div>
    </section>`
  });
}

// Sobre
{
  const t = trilha([['/', 'Início'], ['/sobre/', 'Sobre']]);
  paginas['sobre/index.html'] = pagina({
    caminho: '/sobre/',
    titulo: 'Sobre a Comply360',
    tituloSEO: 'Sobre nós',
    descricao: 'Conheça a Comply360, solução para a visão completa da conformidade de empresas e de terceiros, com foco em riscos, controles e evidências.',
    jsonld: [t.ld, ORG],
    conteudo: `
    <section class="cabecalho-pagina">
      <div class="container">
        ${t.html}
        <h1>Sobre a Comply360</h1>
        <p>Uma solução para tornar a gestão de conformidade eficiente, acessível e baseada em evidências.</p>
      </div>
    </section>
    <section class="secao">
      <div class="container dupla">
        <div>
          <span class="sobretitulo">Quem somos</span>
          <h2>Conformidade com visão 360</h2>
          <p>A Comply360 é uma solução para apoiar a <strong>visão completa da conformidade</strong> da sua empresa ou de terceiros: por área, normas ou frameworks de mercado, avaliação de fornecedores, processos, auditorias internas e externas ou questionários customizados.</p>
          <p>A visão 360 de aderência e de mapeamento de riscos cobre os pilares de tecnologia, governança, riscos, privacidade, segurança da informação e continuidade de negócios, para apoiar decisões estratégicas e táticas.</p>
          <a class="botao botao-primario" href="/contato/">Fale conosco</a>
        </div>
        ${foto('gestao-conformidade.jpg', 'Ilustração de prancheta com itens marcados, lupa, escudo e cadeado representando gestão de conformidade', 1200, 800)}
      </div>
    </section>
    <section class="secao secao-alt">
      <div class="container">
        <div class="secao-cabeca"><span class="sobretitulo">No que acreditamos</span><h2>Nossos valores</h2></div>
        <div class="grade grade-3">
          <div class="servico"><div class="icone">${icones.grafico}</div><h3>Inovação</h3><p>Soluções que tornam a conformidade mais simples, com menos planilhas e mais visibilidade.</p></div>
          <div class="servico"><div class="icone">${icones.escudo}</div><h3>Transparência</h3><p>Atuamos com integridade, e a conformidade só vale quando pode ser comprovada.</p></div>
          <div class="servico"><div class="icone">${icones.relogio}</div><h3>Dedicação</h3><p>Compromisso com a segurança e a continuidade dos negócios dos nossos clientes.</p></div>
        </div>
      </div>
    </section>`
  });
}

// Contato
{
  const t = trilha([['/', 'Início'], ['/contato/', 'Contato']]);
  paginas['contato/index.html'] = pagina({
    caminho: '/contato/',
    titulo: 'Contato',
    descricao: 'Fale com a Comply360 sobre gestão de conformidade, LGPD, ISO 27001, avaliação de fornecedores ou auditorias. E-mail: contato@comply360.com.br.',
    jsonld: [t.ld, { '@context': 'https://schema.org', '@type': 'ContactPage', url: SITE + '/contato/', about: { '@id': SITE + '/#organizacao' } }],
    conteudo: `
    <section class="cabecalho-pagina">
      <div class="container">
        ${t.html}
        <h1>Contato</h1>
        <p>Conte qual norma, lei ou avaliação é prioridade para a sua empresa. Retornamos para marcar uma conversa.</p>
      </div>
    </section>
    <section class="secao">
      <div class="container grade grade-2">
        <form class="formulario" id="form-contato" aria-label="Formulário de contato">
          <label>Nome<input name="nome" required autocomplete="name"></label>
          <label>E-mail<input name="email" type="email" required autocomplete="email"></label>
          <label>Empresa <small>(opcional)</small><input name="empresa" autocomplete="organization"></label>
          <label>Assunto
            <select name="assunto">
              ${[...solucoes.map(s => s.nome), 'Outro assunto'].map(a => `<option>${esc(a)}</option>`).join('\n              ')}
            </select>
          </label>
          <label>Mensagem<textarea name="mensagem" required></textarea></label>
          <button class="botao botao-primario" type="submit">Enviar mensagem</button>
          <small>Ao enviar, o seu programa de e-mail abre com a mensagem pronta. Seus dados são usados apenas para responder ao contato (veja a <a href="/privacidade/">política de privacidade</a>).</small>
        </form>
        <div class="contato-info">
          <div class="item"><div class="icone">${icones.email}</div><div><h3>E-mail</h3><p><a href="mailto:${EMAIL}">${EMAIL}</a></p></div></div>
          <div class="item"><div class="icone">${icones.mapa}</div><div><h3>Atendimento</h3><p>Empresas de todo o Brasil, com reuniões on-line.</p></div></div>
          <div class="item"><div class="icone">${icones.relogio}</div><div><h3>Retorno</h3><p>Respondemos as mensagens em dias úteis.</p></div></div>
        </div>
      </div>
    </section>`
  });
}

// Blog (listagem)
{
  const t = trilha([['/', 'Início'], ['/blog/', 'Blog']]);
  const temas = [...new Set(ordenadas.map(m => m.tema))];
  paginas['blog/index.html'] = pagina({
    caminho: '/blog/',
    titulo: 'Blog: conformidade, LGPD e segurança da informação',
    descricao: 'Guias práticos sobre gestão de conformidade, adequação à LGPD, ISO 27001, avaliação de fornecedores e auditorias.',
    jsonld: [t.ld, {
      '@context': 'https://schema.org', '@type': 'Blog', name: 'Blog Comply360', url: SITE + '/blog/', inLanguage: 'pt-BR',
      publisher: { '@id': SITE + '/#organizacao' },
      blogPost: ordenadas.map(m => ({ '@type': 'BlogPosting', headline: m.titulo, url: `${SITE}/blog/${m.slug}/`, datePublished: m.data }))
    }],
    conteudo: `
    <section class="cabecalho-pagina">
      <div class="container">
        ${t.html}
        <h1>Blog</h1>
        <p>Conteúdo prático sobre gestão de conformidade, privacidade e segurança da informação.</p>
      </div>
    </section>
    <section class="secao">
      <div class="container">
        <div class="filtros" role="group" aria-label="Filtrar por tema">
          <button data-filtro="todos" aria-pressed="true">Todos</button>
          ${temas.map(tm => `<button data-filtro="${esc(tm)}" aria-pressed="false">${esc(tm)}</button>`).join('\n          ')}
        </div>
        <div class="grade grade-3">
      ${ordenadas.map(cartaoMateria).join('\n      ')}
        </div>
      </div>
    </section>`
  });
}

// Matérias
for (const m of ordenadas) {
  const t = trilha([['/', 'Início'], ['/blog/', 'Blog'], [`/blog/${m.slug}/`, m.titulo]]);
  const relacionadas = [...ordenadas.filter(x => x !== m && x.tema === m.tema), ...ordenadas.filter(x => x !== m && x.tema !== m.tema)].slice(0, 3);
  paginas[`blog/${m.slug}/index.html`] = pagina({
    caminho: `/blog/${m.slug}/`,
    titulo: m.titulo,
    tituloSEO: m.tituloSEO,
    descricao: m.descricao,
    tipo: 'article',
    imagem: m.imagem || 'og.jpg',
    jsonld: [t.ld, {
      '@context': 'https://schema.org', '@type': 'BlogPosting',
      headline: m.titulo, description: m.descricao, inLanguage: 'pt-BR',
      image: `${SITE}/assets/img/${m.imagem || 'og.jpg'}`,
      datePublished: m.data, dateModified: m.atualizado || m.data,
      ...(m.fontes ? { citation: m.fontes.map(([nome, url]) => ({ '@type': 'CreativeWork', name: nome, url })) } : {}),
      mainEntityOfPage: `${SITE}/blog/${m.slug}/`,
      author: { '@type': 'Organization', name: NOME, url: SITE + '/' },
      publisher: { '@id': SITE + '/#organizacao' },
      articleSection: m.tema
    }],
    conteudo: `
    <article class="artigo">
      ${t.html}
      <span class="tag">${esc(m.tema)}</span>
      <h1 style="margin-top:12px">${esc(m.titulo)}</h1>
      <p class="meta">Publicado em <time datetime="${m.data}">${dataBR(m.data)}</time>${m.atualizado && m.atualizado !== m.data ? ` · Atualizado em <time datetime="${m.atualizado}">${dataBR(m.atualizado)}</time>` : ''} · por equipe ${NOME}</p>
      ${m.imagem ? foto(m.imagem, m.imagemAlt, 1200, 800, { carregar: 'eager', classe: 'capa', sizes: '(max-width: 780px) 100vw, 720px' }) : placa(m, ' capa')}
      ${m.corpo.trim()}${m.fontes ? `
      <section class="fontes" aria-labelledby="fontes-${m.slug}">
        <h2 id="fontes-${m.slug}">Fontes</h2>
        <ul>${m.fontes.map(([nome, url]) => `<li><a href="${url}" rel="noopener">${esc(nome)}</a></li>`).join('')}</ul>
        <p class="legenda">Links oficiais conferidos em ${dataBR(m.atualizado || m.data)}.</p>
      </section>` : ''}
      <div class="chamada" style="margin-top:40px;padding:32px">
        <div><h2 style="font-size:1.4rem">Quer organizar a conformidade da sua empresa?</h2><p>Converse com a Comply360 sobre normas, riscos, fornecedores e auditorias.</p></div>
        <a class="botao botao-destaque" href="/contato/">Fale conosco</a>
      </div>
      <section class="leia-tambem" aria-labelledby="leia-tambem">
        <h2 id="leia-tambem" style="margin-top:0">Leia também</h2>
        <div class="grade grade-3" style="grid-template-columns:repeat(auto-fit,minmax(200px,1fr))">
      ${relacionadas.map(cartaoMateria).join('\n      ')}
        </div>
      </section>
    </article>`
  });
}

// Privacidade
{
  const t = trilha([['/', 'Início'], ['/privacidade/', 'Política de privacidade']]);
  paginas['privacidade/index.html'] = pagina({
    caminho: '/privacidade/',
    titulo: 'Política de privacidade',
    descricao: 'Como a Comply360 trata os dados pessoais enviados pelo site, em conformidade com a Lei Geral de Proteção de Dados (LGPD).',
    jsonld: [t.ld],
    conteudo: `
    <article class="artigo">
      ${t.html}
      <h1>Política de privacidade</h1>
      <p class="meta">Atualizada em ${dataBR('2026-10-31')}</p>
      <p>Esta política explica como a Comply360 trata os dados pessoais de quem visita o site comply360.com.br, de acordo com a Lei Geral de Proteção de Dados (Lei 13.709/2018).</p>
      <h2>Quais dados coletamos</h2>
      <p>O site não usa cookies de rastreamento nem ferramentas de publicidade. O formulário de contato não grava dados em servidor: ele apenas abre o seu programa de e-mail com a mensagem pronta. Recebemos somente o que você decidir enviar por e-mail (nome, e-mail, empresa e mensagem).</p>
      <h2>Para que usamos</h2>
      <p>Usamos os dados apenas para responder ao seu contato e, se houver contratação, para prestar os serviços combinados. A base legal é o procedimento preliminar a um contrato, a pedido do titular (art. 7º, V, da LGPD).</p>
      <h2>Compartilhamento</h2>
      <p>Não vendemos nem compartilhamos seus dados com terceiros para fins de marketing. Eles podem ser compartilhados apenas quando necessário para a prestação do serviço ou por obrigação legal.</p>
      <h2>Por quanto tempo guardamos</h2>
      <p>As mensagens são mantidas pelo tempo necessário para o atendimento e eliminadas quando não forem mais necessárias, salvo obrigação legal de guarda.</p>
      <h2>Seus direitos</h2>
      <p>Você pode pedir a qualquer momento confirmação, acesso, correção ou eliminação dos seus dados, escrevendo para <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>
      <h2>Fontes externas</h2>
      <p>As fontes tipográficas do site são carregadas do Google Fonts, que pode registrar o endereço IP do visitante conforme a política do Google. O site é hospedado no GitHub Pages.</p>
    </article>`
  });
}

// Aviso legal
{
  const t = trilha([['/', 'Início'], ['/aviso-legal/', 'Aviso legal']]);
  paginas['aviso-legal/index.html'] = pagina({
    caminho: '/aviso-legal/',
    titulo: 'Aviso legal',
    descricao: 'Informações legais sobre o site comply360.com.br: responsável, contato, uso do conteúdo e marcas de terceiros.',
    jsonld: [t.ld],
    conteudo: `
    <article class="artigo">
      ${t.html}
      <h1>Aviso legal</h1>
      <p class="meta">Atualizado em ${dataBR('2026-10-31')}</p>
      <h2>Responsável pelo site</h2>
      <p>O site comply360.com.br é mantido pela Comply360. Contato: <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>
      <h2>Conteúdo</h2>
      <p>Os textos do site e do blog têm caráter informativo e não substituem orientação jurídica, de auditoria ou de certificação para o caso concreto de cada empresa. Leis, regulamentos e normas mudam: confira sempre a versão em vigor.</p>
      <h2>Marcas de terceiros</h2>
      <p>ISO, IEC, NIST, CIS Controls, ITIL e demais nomes de normas e frameworks citados pertencem às respectivas organizações e são mencionados apenas para identificar as referências. A Comply360 não é um organismo certificador nem tem vínculo com essas organizações.</p>
      <h2>Direitos autorais</h2>
      <p>Textos, imagens e a marca Comply360 não podem ser reproduzidos sem autorização, exceto citações curtas com indicação da fonte e link para a página original.</p>
    </article>`
  });
}

// 404
paginas['404.html'] = pagina({
  caminho: '/404.html',
  titulo: 'Página não encontrada',
  descricao: 'A página que você procurou não existe ou mudou de endereço.',
  semIndex: true,
  conteudo: `
    <section class="secao">
      <div class="container" style="max-width:640px;text-align:center">
        <h1>Página não encontrada</h1>
        <p>O endereço pode ter mudado. Que tal começar por aqui?</p>
        <p style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:24px">
          <a class="botao botao-primario" href="/">Página inicial</a>
          <a class="botao botao-contorno" href="/solucoes/">Soluções</a>
          <a class="botao botao-contorno" href="/blog/">Blog</a>
        </p>
      </div>
    </section>`
});

// Redirecionamentos dos endereços do site antigo da UOL
function redirecionar(destino) {
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Redirecionando…</title><link rel="canonical" href="${SITE}${destino}"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0; url=${destino}"></head><body><p><a href="${destino}">Clique aqui se não for redirecionado.</a></p></body></html>\n`;
}
paginas['privacy/index.html'] = redirecionar('/privacidade/');
paginas['legal-notice/index.html'] = redirecionar('/aviso-legal/');
paginas['subpage/index.html'] = redirecionar('/');
// Endereços do WordPress que existiu no domínio antes da UOL (vistos no Search Console)
paginas['index.php/category/uncategorized/index.html'] = redirecionar('/blog/');
paginas['index.php/2026/02/20/por-que-as-empresas-precisam-de-gestao-de-conformidade/index.html'] = redirecionar('/blog/por-que-empresas-precisam-de-gestao-de-conformidade/');

// ---------- Gravação ----------
for (const [arq, html] of Object.entries(paginas)) {
  const destino = path.join(RAIZ, arq);
  fs.mkdirSync(path.dirname(destino), { recursive: true });
  fs.writeFileSync(destino, html);
}

const urls = [
  ['/', '1.0'], ['/solucoes/', '0.9'], ['/normas-e-frameworks/', '0.8'], ['/blog/', '0.8'], ['/sobre/', '0.6'], ['/contato/', '0.6'],
  ['/privacidade/', '0.2'], ['/aviso-legal/', '0.2'],
  ...solucoes.map(s => [`/solucoes/${s.slug}/`, '0.9']),
  ...ordenadas.map(m => [`/blog/${m.slug}/`, '0.7', m.atualizado || m.data])
];
fs.writeFileSync(path.join(RAIZ, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map(([u, p, d]) => `  <url><loc>${SITE}${u}</loc><lastmod>${d || HOJE}</lastmod><priority>${p}</priority></url>`).join('\n') +
  `\n</urlset>\n`);
fs.writeFileSync(path.join(RAIZ, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /gerador/\n\nSitemap: ${SITE}/sitemap.xml\n`);

console.log(`${Object.keys(paginas).length} páginas geradas (css v=${V_CSS}, js v=${V_JS}).`);
