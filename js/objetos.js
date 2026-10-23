/* Objetos de aula no céu: lápis, livro, globo, frasco, paleta e outros desenhos flutuam atrás do conteúdo.
   Cada símbolo de código antigo do cenário (.simbolo e .glyph: </>, { }, if, 01) vira um objeto no mesmo lugar,
   e cada céu (.cenario e .scenery) fica com pelo menos três. Cada página sorteia os seus, sempre os mesmos.

   <script src="/identidade-visual/js/objetos.js" defer></script>
   A barra do topo (barra.js) e o kit de jogo (jogo.js) já carregam este arquivo onde há céu.
   Sem script, os símbolos continuam no lugar. Sem movimento, os objetos ficam parados. */
(() => {
  if (window.Objetos) return;
  const I = '#2f2a4a';
  const c = (largura = 3.5) => `stroke="${I}" stroke-width="${largura}" stroke-linejoin="round" stroke-linecap="round"`;

  // Os desenhos, todos num quadro de 64 por 64
  const DESENHOS = {
    lapis: `<g transform="rotate(-35 32 32)"><rect x="24" y="5" width="16" height="40" rx="2" fill="#ffd23f" ${c()}/><rect x="24" y="5" width="16" height="9" rx="2" fill="#ff8fb0" ${c()}/><path d="M24 45 L32 60 L40 45 Z" fill="#ffe1b0" ${c()}/><path d="M29.6 55.5 L32 60 L34.4 55.5 Z" fill="${I}"/><path d="M32 16 V44" stroke="#e6b400" stroke-width="3"/></g>`,
    livro: `<path d="M32 16 Q20 8 6 12 V52 Q20 48 32 56 Q44 48 58 52 V12 Q44 8 32 16 Z" fill="#fff" ${c(4)}/><path d="M32 16 V56" ${c(3)}/><path d="M12 24 Q19 22 26 25 M12 33 Q19 31 26 34 M38 25 Q45 22 52 24 M38 34 Q45 31 52 33" stroke="#ff5f8f" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    prancheta: `<rect x="12" y="10" width="40" height="50" rx="5" fill="#fff" ${c(4)}/><rect x="22" y="4" width="20" height="11" rx="3" fill="#ffd23f" ${c(3)}/><path d="M19 27 l4 4 l7 -8 M19 43 l4 4 l7 -8" stroke="#4fd6a6" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M35 28 H45 M35 44 H45" stroke="#8cc4ff" stroke-width="4" stroke-linecap="round"/>`,
    lampada: `<path d="M8 22 H3 M56 22 H61 M14 6 L10 2 M50 6 L54 2" ${c(3)}/><rect x="24" y="38" width="16" height="12" rx="3" fill="#ffd23f" ${c()}/><circle cx="32" cy="24" r="16" fill="#ffd23f" ${c()}/><path d="M27 27 L32 33 L37 27" fill="none" stroke="#ff8a3d" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><rect x="25" y="50" width="14" height="8" rx="3" fill="#cfcbe6" ${c()}/>`,
    regua: `<g transform="rotate(-22 32 32)"><rect x="5" y="24" width="54" height="17" rx="3" fill="#4fd6a6" ${c()}/><path d="M13 24 V30 M21 24 V33 M29 24 V30 M37 24 V33 M45 24 V30 M53 24 V30" ${c(3)}/></g>`,
    globo: `<rect x="21" y="54" width="22" height="6" rx="2.5" fill="#ff8a3d" ${c()}/><path d="M32 46 V54" ${c()}/><circle cx="32" cy="26" r="19" fill="#4da3ff" ${c()}/><path d="M18 16 C24 15 27 19 25 24 C23 29 29 31 31 35 C32 39 27 42 22 39 C16 35 14 25 18 16 Z M38 10 C44 11 49 16 47 21 C44 24 39 21 38 17 Z M40 32 C45 30 50 32 48 37 C46 41 40 40 40 32 Z" fill="#4fd6a6" ${c(2.5)}/>`,
    frasco: `<path d="M26 6 H38 M28 6 V22 L13 51 A5 5 0 0 0 17.5 58 H46.5 A5 5 0 0 0 51 51 L36 22 V6" fill="#fff" ${c()}/><path d="M18.5 42 H45.5 L51 51 A5 5 0 0 1 46.5 58 H17.5 A5 5 0 0 1 13 51 Z" fill="#ff5f8f" ${c()}/><circle cx="27" cy="49" r="2.6" fill="#fff"/><circle cx="36" cy="52" r="1.8" fill="#fff"/><circle cx="33" cy="34" r="2.2" fill="#ff5f8f"/>`,
    paleta: `<path d="M32 6 C15 6 5 18 5 31 C5 45 16 57 30 57 C35 57 37 53 34 49 C31 45 34 41 39 41 H45 C52 41 59 36 59 27 C59 14 47 6 32 6 Z" fill="#ffe1b0" ${c()}/><circle cx="19" cy="22" r="5" fill="#ff5f8f" ${c(2.5)}/><circle cx="32" cy="15" r="5" fill="#ffd23f" ${c(2.5)}/><circle cx="45" cy="21" r="5" fill="#4da3ff" ${c(2.5)}/><circle cx="17" cy="37" r="5" fill="#4fd6a6" ${c(2.5)}/>`,
    nota: `<path d="M24 14 L50 8 V16 L24 22 Z" fill="${I}" ${c()}/><path d="M24 46 V14 M50 40 V8" ${c(4)}/><ellipse cx="17" cy="47" rx="8.5" ry="6.5" fill="#a08bff" ${c()}/><ellipse cx="43" cy="41" rx="8.5" ry="6.5" fill="#a08bff" ${c()}/>`,
    calculadora: `<rect x="14" y="5" width="36" height="54" rx="6" fill="#4da3ff" ${c()}/><rect x="20" y="11" width="24" height="11" rx="2" fill="#e9fff5" ${c(2.5)}/>` +
      [0, 1, 2].flatMap((linha) => [0, 1, 2].map((coluna) => `<rect x="${20 + coluna * 9}" y="${28 + linha * 9}" width="6" height="6" rx="1.5" fill="${linha === 2 && coluna === 2 ? '#ff8a3d' : '#fff'}" ${c(2)}/>`)).join(''),
    maca: `<path d="M32 18 C26 12 11 13 11 30 C11 45 21 58 32 54 C43 58 53 45 53 30 C53 13 38 12 32 18 Z" fill="#ff5f8f" ${c()}/><path d="M32 18 C32 12 34 8 38 6" fill="none" ${c()}/><path d="M35 12 C39 6 47 6 50 9 C46 14 39 14 35 12 Z" fill="#4fd6a6" ${c(2.5)}/><path d="M20 28 C20 24 22 22 25 21" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`,
    capelo: `<path d="M16 30 V42 C16 46 24 50 32 50 C40 50 48 46 48 42 V30 L32 36 Z" fill="#5d5880" ${c()}/><path d="M4 24 L32 12 L60 24 L32 36 Z" fill="#4a4470" ${c()}/><path d="M32 24 L52 28 V42" fill="none" stroke="#ffd23f" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="52" cy="45" r="3.5" fill="#ffd23f" ${c(2)}/>`,
    caderno: `<rect x="14" y="7" width="40" height="52" rx="4" fill="#fff" ${c()}/><rect x="14" y="7" width="8" height="52" rx="3" fill="#ff8a3d" ${c(3)}/><path d="M28 20 H46 M28 30 H46 M28 40 H40" stroke="#8cc4ff" stroke-width="3.5" stroke-linecap="round"/><path d="M10 15 H18 M10 25 H18 M10 35 H18 M10 45 H18" ${c(3)}/>`,
    bola: `<circle cx="32" cy="32" r="23" fill="#fff" ${c()}/><path d="M32 21 L41 27.5 L37.5 38 H26.5 L23 27.5 Z" fill="${I}"/><path d="M32 21 V9 M41 27.5 L53 24 M37.5 38 L45 48 M26.5 38 L19 48 M23 27.5 L11 24" ${c(3)}/>`,
    pergunta: `<path d="M6 10 H58 V42 H30 L17 55 V42 H6 Z" fill="#ff8a3d" ${c(4)}/><path d="M25 22 C25 16 39 15 39 22 C39 27 32 27 32 32" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/><circle cx="32" cy="38" r="3" fill="#fff"/>`,
    lupa: `<path d="M39 39 L55 55" stroke="${I}" stroke-width="9" stroke-linecap="round"/><path d="M39 39 L55 55" stroke="#ff8a3d" stroke-width="4" stroke-linecap="round"/><circle cx="26" cy="26" r="17" fill="#cfe6ff" ${c(4)}/><path d="M17 22 C18 17 22 14 26 14" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/>`,
    medalha: `<path d="M22 4 L28 22 M42 4 L36 22" stroke="#4da3ff" stroke-width="7" stroke-linecap="round"/><circle cx="32" cy="38" r="19" fill="#ffd23f" ${c()}/><circle cx="32" cy="38" r="12.5" fill="none" stroke="#e6b400" stroke-width="2.5"/><path d="M32 30 L34.4 35.4 L40 35.8 L35.7 39.4 L37.1 45 L32 42 L26.9 45 L28.3 39.4 L24 35.8 L29.6 35.4 Z" fill="#fff" ${c(2)}/>`,
  };
  const NOMES = Object.keys(DESENHOS);

  const estilo = document.createElement('style');
  estilo.textContent = `
    .objeto { position: absolute; width: clamp(34px, 3.8vw, 58px); aspect-ratio: 1; pointer-events: none; rotate: var(--r, 0deg); filter: drop-shadow(0 4px 0 rgb(47 42 74 / .22)); animation: objeto-boia 8s ease-in-out var(--d, 0s) infinite; }
    .objeto svg { display: block; width: 100%; height: 100%; overflow: visible; }
    .noite .objeto, .night .objeto { opacity: .3; filter: none; }
    @keyframes objeto-boia { 50% { transform: translateY(-12px) rotate(var(--g, 6deg)); } }
    @media (max-width: 599px) { .objeto { width: 30px; opacity: .85; } }
    @media (prefers-reduced-motion: reduce) { .objeto { animation: none; } }
    .gp-parado .objeto { animation: none !important; }
  `;
  document.head.append(estilo);

  // Um sorteio que dá sempre o mesmo resultado na mesma página, para o céu não mudar a cada visita
  let semente = [...location.pathname].reduce((soma, letra) => (soma * 31 + letra.charCodeAt(0)) >>> 0, 7);
  const sorte = () => ((semente = (semente * 1664525 + 1013904223) >>> 0) / 2 ** 32);
  const fila = [];
  const proximo = () => {
    if (!fila.length) fila.push(...NOMES.map((nome) => [sorte(), nome]).sort((a, b) => a[0] - b[0]).map(([, nome]) => nome));
    return fila.shift();
  };

  const objeto = (posicao) => {
    const nome = proximo();
    const elemento = document.createElement('span');
    elemento.className = `objeto objeto--${nome}`;
    elemento.setAttribute('aria-hidden', 'true');
    Object.assign(elemento.style, posicao);
    elemento.style.setProperty('--r', `${Math.round(sorte() * 24 - 12)}deg`);
    elemento.style.setProperty('--g', `${Math.round(sorte() * 12 - 6)}deg`);
    if (!posicao['--d']) elemento.style.setProperty('--d', `${-(sorte() * 8).toFixed(1)}s`);
    elemento.innerHTML = `<svg viewBox="0 0 64 64">${DESENHOS[nome]}</svg>`;
    return elemento;
  };

  // Lugares nas beiradas do céu, longe do texto, para completar até três objetos por céu
  const VAGAS = [
    { left: '4%', top: '16%' }, { right: '5%', top: '28%' }, { left: '7%', top: '62%' },
    { right: '8%', top: '70%' }, { left: '44%', top: '5%' }, { right: '24%', top: '10%' },
  ];
  const perto = (vaga, ocupados) => ocupados.some((o) => Math.abs(o.x - vaga.x) < 14 && Math.abs(o.y - vaga.y) < 16);
  const ponto = (estilo) => ({
    x: estilo.left ? parseFloat(estilo.left) : 100 - parseFloat(estilo.right || '50'),
    y: estilo.top ? parseFloat(estilo.top) : 100 - parseFloat(estilo.bottom || '50'),
  });

  const enfeitar = () => {
    document.querySelectorAll('.cenario, .scenery').forEach((ceu) => {
      const ocupados = [];
      // Troca cada símbolo de código por um objeto no mesmo lugar e com o mesmo atraso
      ceu.querySelectorAll('.simbolo, .glyph').forEach((simbolo) => {
        const s = simbolo.style;
        const posicao = { left: s.left, right: s.right, top: s.top, bottom: s.bottom, '--d': s.getPropertyValue('--d') };
        Object.keys(posicao).forEach((chave) => { if (!posicao[chave]) delete posicao[chave]; });
        ocupados.push(ponto(posicao));
        simbolo.replaceWith(objeto(posicao));
      });
      for (const vaga of VAGAS) {
        if (ceu.querySelectorAll('.objeto, .cube-wrap').length >= 3) break;
        const lugar = ponto(vaga);
        if (perto(lugar, ocupados)) continue;
        ocupados.push(lugar);
        ceu.append(objeto(vaga));
      }
    });
  };

  // Um objeto que cairia atrás de texto, botão ou imagem some, para não atrapalhar a leitura.
  // A conta é refeita quando a tela muda de tamanho, porque o texto muda de lugar
  const TEXTO = 'h1, h2, h3, h4, p, a, button, li, label, input, select, textarea, img, dt, dd, figcaption, table, canvas, iframe, video, form, .btn, .pill, .tag, .card, .screen, .bubble, .balao, .painel, .cartao';
  const cruza = (a, b, folga = 8) => a.left < b.right + folga && b.left < a.right + folga && a.top < b.bottom + folga && b.top < a.bottom + folga;
  // Passos em volta do lugar original, do mais perto para o mais longe, para o objeto só se afastar do texto
  const PASSOS = [];
  for (const dx of [0, -40, 40, -80, 80, -130, 130, -190, 190, -260, 260]) for (const dy of [0, -30, 30, -70, 70, -120, 120]) PASSOS.push([dx, dy]);
  PASSOS.sort((a, b) => Math.hypot(...a) - Math.hypot(...b));
  const arrumar = () => {
    const textos = [...document.querySelectorAll(TEXTO)]
      .filter((t) => !t.closest('.cenario, .scenery, .objeto'))
      .map((t) => t.getBoundingClientRect())
      .filter((r) => r.width && r.height);
    const livre = (caixa, outros) => !textos.some((t) => cruza(caixa, t)) && !outros.some((o) => cruza(caixa, o, 30));
    document.querySelectorAll('.cenario, .scenery').forEach((ceu) => {
      const fundo = ceu.getBoundingClientRect();
      const postos = [...ceu.querySelectorAll('.cube-wrap')].map((p) => p.getBoundingClientRect());
      ceu.querySelectorAll('.objeto').forEach((o) => {
        // Volta ao lugar que a página deu antes de conferir, para a conta não depender da anterior
        o.style.translate = '';
        o.style.visibility = '';
        const caixa = o.getBoundingClientRect();
        const passo = PASSOS.find(([dx, dy]) => {
          const nova = new DOMRect(caixa.left + dx, caixa.top + dy, caixa.width, caixa.height);
          return nova.left > fundo.left && nova.right < fundo.right && nova.top > fundo.top && nova.bottom < fundo.bottom && livre(nova, postos);
        });
        if (!passo) { o.style.visibility = 'hidden'; return; }
        if (passo[0] || passo[1]) o.style.translate = `${passo[0]}px ${passo[1]}px`;
        postos.push(new DOMRect(caixa.left + passo[0], caixa.top + passo[1], caixa.width, caixa.height));
      });
    });
  };
  let espera;
  const depois = () => { clearTimeout(espera); espera = setTimeout(arrumar, 200); };

  const comecar = () => {
    enfeitar();
    arrumar();
    addEventListener('resize', depois);
    // A fonte e as imagens mudam o tamanho do texto depois do primeiro desenho
    addEventListener('load', arrumar);
    document.fonts?.ready.then(arrumar);
  };

  window.Objetos = { desenhos: DESENHOS, desenho: (nome) => `<svg viewBox="0 0 64 64" aria-hidden="true">${DESENHOS[nome] || ''}</svg>`, enfeitar, arrumar };
  if (document.readyState === 'loading') addEventListener('DOMContentLoaded', comecar);
  else comecar();
})();
