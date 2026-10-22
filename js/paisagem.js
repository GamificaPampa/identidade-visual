/* Paisagem do Pampa: troca as coxilhas simples (.morros) por um campo em camadas, com umbu, capão de mato,
   cata-vento, cerca, vacas pastando, cavalo crioulo, ovelhas, quero-quero, flores, nuvens com volume e
   pássaros. Na rolagem, as camadas andam em velocidades diferentes e o dia passa: o sol desce e a luz esquenta.

   <script src="/identidade-visual/js/paisagem.js" defer></script>
   A barra do topo (barra.js) já carrega este arquivo nas páginas do professor que têm .morros.
   Sem script, ou sem movimento, as coxilhas do cenario.css continuam no lugar. */
(() => {
  if (window.Paisagem) return;
  const I = '#2f2a4a';
  const reduzido = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const parado = () => reduzido || document.documentElement.classList.contains('gp-parado');

  // ---------- Os bichos e as coisas do campo. Cada desenho tem os pés em y = 0 ----------
  const vaca = (corpo, mancha, focinho = '#ffc6d2') => `
    <g class="pp-vaca">
      <rect x="-24" y="-20" width="7" height="20" rx="2.5" fill="${corpo}" stroke="${I}" stroke-width="2.4"/>
      <rect x="-14" y="-20" width="7" height="20" rx="2.5" fill="${corpo}" stroke="${I}" stroke-width="2.4"/>
      <rect x="12" y="-20" width="7" height="20" rx="2.5" fill="${corpo}" stroke="${I}" stroke-width="2.4"/>
      <rect x="21" y="-20" width="7" height="20" rx="2.5" fill="${corpo}" stroke="${I}" stroke-width="2.4"/>
      <g class="pp-rabo"><path d="M30 -38q9 6 6 22" fill="none" stroke="${I}" stroke-width="2.6" stroke-linecap="round"/><path d="M33 -19l5 7-8-1z" fill="${I}"/></g>
      <rect x="-30" y="-46" width="62" height="30" rx="14" fill="${corpo}" stroke="${I}" stroke-width="2.6"/>
      <path d="M-8 -46c7 4 6 13-3 15-9 2-15-6-11-15z" fill="${mancha}"/>
      <ellipse cx="17" cy="-28" rx="8" ry="6.5" fill="${mancha}"/>
      <ellipse cx="7" cy="-16" rx="5" ry="2.6" fill="${focinho}"/>
      <g class="pp-cabeca">
        <path d="M-40 -48q-3-7 2-10M-28 -48q3-7-2-10" fill="none" stroke="#efe2c4" stroke-width="3" stroke-linecap="round"/>
        <ellipse cx="-24" cy="-44" rx="7" ry="3.4" fill="${corpo}" stroke="${I}" stroke-width="2" transform="rotate(-18 -24 -44)"/>
        <rect x="-46" y="-50" width="22" height="20" rx="8" fill="${corpo}" stroke="${I}" stroke-width="2.6"/>
        <rect x="-51" y="-38" width="14" height="12" rx="5.5" fill="${focinho}" stroke="${I}" stroke-width="2.2"/>
        <circle cx="-46" cy="-32" r="1.3" fill="${I}"/><circle cx="-41" cy="-32" r="1.3" fill="${I}"/>
        <circle cx="-36" cy="-43" r="2" fill="${I}"/>
      </g>
    </g>`;

  const cavalo = `
    <g class="pp-cavalo">
      <path d="M-30 -36v30M-20 -34v32M18 -34v32M28 -36v30" stroke="${I}" stroke-width="9" stroke-linecap="round"/>
      <path d="M-30 -36v30M-20 -34v32M18 -34v32M28 -36v30" stroke="#a1603a" stroke-width="5" stroke-linecap="round"/>
      <path d="M-30 -4h0M-20 -2h0M18 -2h0M28 -4h0" stroke="${I}" stroke-width="9" stroke-linecap="round"/>
      <g class="pp-rabo"><path d="M-38 -54c-12 4-16 18-12 34 4-8 8-12 14-14-4-8-4-14-2-20z" fill="#3b2a26" stroke="${I}" stroke-width="2.2" stroke-linejoin="round"/></g>
      <path d="M-40 -50c0-14 14-20 34-20 22 0 40 2 44 16 3 12-6 22-24 22H-18c-14 0-22-6-22-18z" fill="#a8653a" stroke="${I}" stroke-width="2.6"/>
      <path d="M-16 -62c10-4 26-4 38-1" fill="none" stroke="#c4834f" stroke-width="5" stroke-linecap="round"/>
      <g class="pp-cabeca">
        <path d="M26 -62l14-30c3-6 10-8 15-4l14 16c3 4 0 9-5 8l-10-3-6 18z" fill="#a8653a" stroke="${I}" stroke-width="2.6" stroke-linejoin="round"/>
        <path d="M30 -68l12-26c2-3 6-4 8-2" fill="none" stroke="#3b2a26" stroke-width="6" stroke-linecap="round"/>
        <path d="M50 -96l2-9 6 7z" fill="#a8653a" stroke="${I}" stroke-width="2" stroke-linejoin="round"/>
        <circle cx="54" cy="-84" r="2" fill="${I}"/>
        <path d="M60 -78l7 3" stroke="#e8b893" stroke-width="5" stroke-linecap="round"/>
      </g>
    </g>`;

  const ovelha = `
    <g class="pp-ovelha">
      <path d="M-12 -12v12M-4 -12v12M8 -12v12M15 -12v12" stroke="#403852" stroke-width="4.5" stroke-linecap="round"/>
      <g fill="#f7f2e6" stroke="${I}" stroke-width="2.4"><circle cx="-12" cy="-22" r="10"/><circle cx="0" cy="-27" r="11"/><circle cx="12" cy="-23" r="10"/><circle cx="2" cy="-16" r="10"/></g>
      <g fill="#f7f2e6"><circle cx="-12" cy="-22" r="8.8"/><circle cx="0" cy="-27" r="9.8"/><circle cx="12" cy="-23" r="8.8"/><circle cx="2" cy="-16" r="8.8"/></g>
      <g class="pp-cabeca"><ellipse cx="-24" cy="-24" rx="7.5" ry="9.5" fill="#403852" stroke="${I}" stroke-width="2"/><ellipse cx="-18" cy="-30" rx="5" ry="2.6" fill="#403852" transform="rotate(20 -18 -30)"/><circle cx="-27" cy="-26" r="1.6" fill="#fff"/></g>
    </g>`;

  // Quero-quero: o passarinho que vigia o campo. Costas cinza, ombro bronze, cara e peito pretos, penacho,
  // olho e pernas vermelhos
  const queroquero = `
    <g class="pp-queroquero">
      <path d="M-2 -14l-3 14M5 -14l2 14" stroke="#e2566a" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M-12 -22C-10 -30 4 -32 16 -28L29 -24C24 -18 14 -14 2 -14-6 -14-12 -17-12 -22z" fill="#99948a" stroke="${I}" stroke-width="2"/>
      <path d="M-9 -17C-3 -13 8 -13 17 -17 12 -14 2 -12-4 -13z" fill="#fff"/>
      <path d="M1 -27C9 -29 17 -27 23 -25 15 -22 7 -22 1 -24z" fill="#a8806a"/>
      <path d="M24 -26.5l7 2.5-7 2.5z" fill="${I}"/>
      <path d="M-12.5 -23C-13 -19-11 -16-7 -15l2-6z" fill="${I}"/>
      <g class="pp-cabeca">
        <circle cx="-14" cy="-28" r="6.4" fill="#a19c92" stroke="${I}" stroke-width="2"/>
        <path d="M-20.2 -28.2C-19 -24-15.5 -21.5-11.5 -22.4L-12.4 -26.2C-15.2 -26.4-18 -27.2-20.2 -28.2z" fill="${I}"/>
        <path d="M-19.5 -31C-16.5 -34.2-12.5 -34.4-10 -32.4L-13.6 -30.2z" fill="${I}"/>
        <path d="M-12.4 -29.2C-9.6 -29.2-8.4 -27.4-8.6 -25.2" fill="none" stroke="#fff" stroke-width="1.4" stroke-linecap="round"/>
        <path d="M-11 -33.2C-6 -37.4-1 -37.6 3 -35.6" fill="none" stroke="${I}" stroke-width="1.6" stroke-linecap="round"/>
        <path d="M-20 -29l-6.5 1.2 6.5 1.4z" fill="#ef8f9a" stroke="${I}" stroke-width="1" stroke-linejoin="round"/>
        <circle cx="-15.6" cy="-29.4" r="1.8" fill="#e0485a"/><circle cx="-15.6" cy="-29.4" r=".8" fill="${I}"/>
      </g>
    </g>`;

  // Ipê-amarelo no meio do campo: a cor que salta em setembro
  const ipe = `
    <g class="pp-ipe">
      <path d="M-3 0c1-14 0-26-4-38l5-1c2 6 3 12 3 18 3-8 7-14 13-19l3 3c-8 7-12 18-12 37z" fill="#7a5a44"/>
      <g class="pp-copa">${[[-18, -46, 16], [2, -56, 20], [22, -46, 16], [-6, -40, 14], [14, -38, 13]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#f6b91f"/>`).join('')}
      ${[[-14, -52, 9], [6, -64, 11], [24, -52, 8]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffd84a"/>`).join('')}</g>
    </g>`;

  // Galpão da estância, pequeno pela distância
  const galpao = `
    <g><rect x="-26" y="-22" width="52" height="22" fill="#f6f1e6"/><path d="M-31 -21l31-17 31 17z" fill="#d6584c"/>
      <rect x="-6" y="-14" width="10" height="14" fill="#8d6b50"/><rect x="12" y="-16" width="8" height="7" fill="#9fc8e8"/><rect x="-22" y="-16" width="8" height="7" fill="#9fc8e8"/></g>`;

  const umbu = `
    <g class="pp-umbu">
      <path d="M-26 0c10-16 12-36 6-58l14-2c3 14 3 26 1 34 6-12 14-22 26-30l10 8c-14 10-22 26-22 48z" fill="#6f4c37" stroke="${I}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M-14 -40c4 8 6 18 6 30" fill="none" stroke="#8c6447" stroke-width="3" stroke-linecap="round"/>
      <g class="pp-copa">
        <g fill="${I}">${[[-56, -78, 30], [-22, -96, 38], [22, -100, 40], [62, -80, 32], [-30, -66, 30], [30, -64, 32], [4, -74, 34]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r + 3}"/>`).join('')}</g>
        <g fill="#3f8a3c">${[[-56, -78, 30], [-22, -96, 38], [22, -100, 40], [62, -80, 32], [-30, -66, 30], [30, -64, 32], [4, -74, 34]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g>
        <g fill="#55a54b">${[[-50, -86, 20], [-18, -108, 24], [24, -112, 24], [60, -88, 20], [2, -88, 22]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g>
        <g fill="#7cc463">${[[-44, -94, 9], [-12, -118, 11], [30, -122, 11], [64, -96, 8], [6, -100, 9]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g>
      </g>
    </g>`;

  // Capão de mato ao longe: árvores redondas sem contorno, mais claras pela distância
  const capao = (x, y, n, escala = 1) => {
    let s = '';
    for (let i = 0; i < n; i += 1) {
      const cx = x + i * 26 * escala + (i % 2) * 6;
      const r = (16 + ((i * 7) % 9)) * escala;
      s += `<rect x="${cx - 2}" y="${y - r * .6}" width="4" height="${r * .9}" fill="#5f7f5a"/><circle cx="${cx}" cy="${y - r * 1.2}" r="${r}" fill="#6db267"/><circle cx="${cx - r * .3}" cy="${y - r * 1.45}" r="${r * .55}" fill="#86c47a"/>`;
    }
    return s;
  };

  // Eucaliptos finos na linha do horizonte
  const eucaliptos = (x, y, n) => Array.from({ length: n }, (_, i) => {
    const cx = x + i * 13 + (i % 3) * 3, h = 34 + (i * 11) % 18;
    return `<ellipse cx="${cx}" cy="${y - h / 2}" rx="7" ry="${h / 2}" fill="#a2c9b4"/>`;
  }).join('');

  // Cata-vento de estância, com a roda girando
  const catavento = `
    <g class="pp-catavento">
      <path d="M-16 0L-3 -96M16 0L3 -96M-12 -24h24M-9 -48h18M-6 -72h12M-12 -24l18 -24M12 -24l-18 -24M-9 -48l15 -24M9 -48l-15 -24" fill="none" stroke="#6d6a80" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M2 -104l40 -6v12z" fill="#e85d5d" stroke="#6d6a80" stroke-width="2" stroke-linejoin="round"/>
      <g class="pp-roda">
        ${Array.from({ length: 12 }, (_, i) => `<path d="M0 -104l-4 -24h8z" fill="${i % 2 ? '#f3f5f8' : '#dfe5ee'}" stroke="#6d6a80" stroke-width="1.4" stroke-linejoin="round" transform="rotate(${i * 30} 0 -104)"/>`).join('')}
        <circle cx="0" cy="-104" r="5" fill="#6d6a80"/>
      </g>
    </g>`;

  const moirao = (x, y) => `<rect x="${x - 3.5}" y="${y - 30}" width="7" height="34" rx="2" fill="#8d6b50" stroke="${I}" stroke-width="2"/>`;

  const touceira = (x, y, k = 1, cor = '#4b9e3d') => `<g class="pp-capim"><path d="M${x - 9 * k} ${y}q${2 * k} ${-14 * k} ${-6 * k} ${-22 * k}q${10 * k} ${8 * k} ${10 * k} ${22 * k}zM${x - 2 * k} ${y}q${1 * k} ${-18 * k} ${4 * k} ${-28 * k}q${3 * k} ${14 * k} ${2 * k} ${28 * k}zM${x + 4 * k} ${y}q${6 * k} ${-12 * k} ${14 * k} ${-18 * k}q${-4 * k} ${10 * k} ${-6 * k} ${18 * k}z" fill="${cor}"/></g>`;

  const flor = (x, y, cor) => `<g><path d="M${x} ${y}v-9" stroke="#3f8a3c" stroke-width="2"/>${[0, 72, 144, 216, 288].map((a) => `<circle cx="${x + 3.4 * Math.cos(a * Math.PI / 180)}" cy="${y - 11 + 3.4 * Math.sin(a * Math.PI / 180)}" r="2.6" fill="${cor}"/>`).join('')}<circle cx="${x}" cy="${y - 11}" r="2" fill="#ffb12b"/></g>`;

  const em = (x, y, s, conteudo, espelho = false) => `<g transform="translate(${x} ${y}) scale(${espelho ? -s : s} ${s})">${conteudo}</g>`;

  // ---------- As camadas, num quadro de 1600 × 600 com o chão em baixo ----------
  const VB = 'viewBox="0 0 1600 640" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false"';
  const camadas = {
    longe: `<svg ${VB}><path d="M0 300C160 262 300 250 470 278S760 238 960 260 1300 232 1600 262V640H0Z" fill="#b8dcc9"/>${eucaliptos(1040, 252, 11)}${eucaliptos(160, 270, 6)}</svg>`,
    meio: `<svg ${VB}>
      <path d="M0 362C220 312 420 314 640 348S1040 302 1260 332 1500 322 1600 336V640H0Z" fill="#9dd886"/>
      <path d="M0 362C220 312 420 314 640 348S1040 302 1260 332 1500 322 1600 336" fill="none" stroke="#c0eaa6" stroke-width="3"/>
      ${capao(150, 336, 6, .9)}
      ${em(1236, 328, .9, catavento)}
      ${em(560, 344, .95, ipe)}${em(1440, 330, .9, galpao)}
      ${em(724, 346, .68, vaca('#fff', I))}${em(812, 340, .66, vaca('#b8744a', '#fff', '#f2b9a0'), true)}${em(900, 332, .64, vaca('#3b3350', '#fff', '#c9a0b0'))}${em(984, 325, .6, vaca('#fff', '#b8744a'), true)}${em(1060, 320, .58, vaca('#b8744a', '#fff', '#f2b9a0'))}
    </svg>`,
    perto: `<svg ${VB}>
      <path d="M0 448C260 398 560 402 840 436S1300 398 1600 422V640H0Z" fill="#74c75e"/>
      <path d="M0 448C260 398 560 402 840 436S1300 398 1600 422" fill="none" stroke="#98dc7f" stroke-width="4"/>
      <g>${[960, 1030, 1100, 1170, 1240, 1310, 1380, 1450, 1520, 1590].map((x, i) => moirao(x, 424 - i * 1.2 + (i > 4 ? (i - 4) * 1.5 : 0))).join('')}
        <path d="M956 406Q1270 392 1600 408M956 416Q1270 402 1600 418" fill="none" stroke="#6d6a80" stroke-width="1.6"/></g>
      ${em(330, 428, 1.15, umbu)}
      ${em(1120, 424, 1.05, cavalo)}
      ${em(590, 416, .82, ovelha)}${em(664, 424, .72, ovelha, true)}${em(752, 430, .76, ovelha)}
    </svg>`,
    frente: `<svg ${VB}>
      <path d="M0 540C300 514 600 520 900 536S1400 512 1600 526V640H0Z" fill="#5bb549"/>
      <path d="M0 540C300 514 600 520 900 536S1400 512 1600 526" fill="none" stroke="#7fcb63" stroke-width="4"/>
      ${[40, 170, 420, 560, 760, 980, 1140, 1460, 1560].map((x, i) => touceira(x, 540 - (i % 3) * 4, 1 + (i % 2) * .3)).join('')}
      ${[[90, '#fff'], [130, '#ffd23f'], [480, '#fff'], [520, '#ff8fb0'], [820, '#ffd23f'], [1060, '#fff'], [1400, '#ff8fb0'], [1500, '#fff']].map(([x, c], i) => flor(x, 538 - (i % 2) * 6, c)).join('')}
      ${em(1300, 532, 1.5, queroquero)}${em(220, 540, 1.1, queroquero, true)}
    </svg>`,
  };

  // Nuvens com volume: claras em cima, azuladas embaixo, sem contorno
  const nuvem = (escala, id) => `<svg class="pp-nuvem" viewBox="0 0 240 110" style="--escala: ${escala}" aria-hidden="true" focusable="false">
    <defs><linearGradient id="pp-n${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".62" stop-color="#f4f9fd"/><stop offset="1" stop-color="#c9dcee"/></linearGradient></defs>
    <g fill="url(#pp-n${id})"><circle cx="70" cy="66" r="34"/><circle cx="112" cy="46" r="42"/><circle cx="160" cy="60" r="34"/><circle cx="196" cy="76" r="22"/><circle cx="40" cy="80" r="22"/><rect x="30" y="70" width="190" height="32" rx="16"/></g>
    <path d="M44 96h170" stroke="#bcd2e8" stroke-width="6" stroke-linecap="round" opacity=".7"/></svg>`;
  const passaros = `<svg class="pp-bando" viewBox="0 0 120 50" aria-hidden="true" focusable="false">${[[10, 30], [34, 18], [56, 8], [44, 36], [74, 22]].map(([x, y], i) => `<g class="pp-asa" style="animation-delay: ${-i * .18}s"><path d="M${x} ${y}q4-6 8 0q4-6 8 0" fill="none" stroke="${I}" stroke-width="2.2" stroke-linecap="round"/></g>`).join('')}</svg>`;

  const montar = (morros) => {
    const cenario = morros.closest('.cenario, .scenery');
    if (!cenario || morros.dataset.paisagem === 'nao') return;
    if (morros.getBoundingClientRect().height < 100 && !cenario.classList.contains('cenario--fixo')) return;
    const paisagem = document.createElement('div');
    paisagem.className = 'paisagem' + (cenario.classList.contains('cenario--fixo') ? ' paisagem--fixa' : '');
    paisagem.setAttribute('aria-hidden', 'true');
    paisagem.innerHTML = Object.entries(camadas).map(([nome, svg]) => `<div class="paisagem__camada paisagem__camada--${nome}">${svg}</div>`).join('') + '<div class="paisagem__luz"></div>';
    const ceu = document.createElement('div');
    ceu.className = 'paisagem-ceu';
    ceu.setAttribute('aria-hidden', 'true');
    ceu.innerHTML = '<div class="paisagem-ceu__sol"></div>'
      + `<div class="paisagem-ceu__nuvens">${nuvem(1, `${montadas}a`)}${nuvem(.7, `${montadas}b`)}${nuvem(.85, `${montadas}c`)}</div>`
      + passaros;
    morros.replaceWith(paisagem);
    cenario.prepend(ceu);
    cenario.classList.add('tem-paisagem');
    montadas += 1;
    lista.push({ paisagem, ceu, fixa: paisagem.classList.contains('paisagem--fixa') });
  };

  let montadas = 0;
  const lista = [];
  const raiz = document.documentElement;
  let pedido = 0;
  // A rolagem move as camadas (a de perto mais que a de longe) e passa o dia na página
  const rolar = () => {
    pedido = 0;
    const altura = Math.max(1, raiz.scrollHeight - innerHeight);
    const dia = Math.min(1, Math.max(0, scrollY / altura));
    raiz.style.setProperty('--dia', (parado() ? .15 : dia).toFixed(3));
    lista.forEach(({ paisagem, ceu, fixa }) => {
      let k = 0;
      if (!parado()) {
        if (fixa) k = Math.min(scrollY, 1400);
        else {
          const caixa = paisagem.getBoundingClientRect();
          if (caixa.bottom < -200 || caixa.top > innerHeight + 200) return;
          k = Math.max(0, Math.min(innerHeight + caixa.height, innerHeight - caixa.top));
        }
      }
      paisagem.style.setProperty('--k', k.toFixed(1));
      ceu.style.setProperty('--k', k.toFixed(1));
    });
  };
  const pedir = () => { if (!pedido) pedido = requestAnimationFrame(rolar); };

  // Os blocos abaixo da primeira tela sobem um pouco quando aparecem. Bloco muito alto não entra: entram os de dentro
  const surgir = () => {
    if (parado() || !('IntersectionObserver' in window)) return;
    const olho = new IntersectionObserver((itens) => itens.forEach((item) => {
      if (!item.isIntersecting) return;
      item.target.classList.add('is-visivel');
      olho.unobserve(item.target);
    }), { rootMargin: '0px 0px -8% 0px' });
    let n = 0;
    document.querySelectorAll('main section, main article, body > section, .card').forEach((bloco) => {
      if (n > 160 || bloco.closest('nav, header, dialog, footer, .gp-barra, .reveal, .gp-surge, [hidden]') || bloco.classList.contains('reveal')) return;
      const caixa = bloco.getBoundingClientRect();
      if (caixa.top < innerHeight || caixa.height > innerHeight * 1.4 || !caixa.height) return;
      bloco.classList.add('gp-surge');
      olho.observe(bloco);
      n += 1;
    });
  };

  const iniciar = () => {
    document.querySelectorAll('.cenario .morros, .scenery .morros').forEach(montar);
    if (!lista.length) return;
    surgir();
    addEventListener('scroll', pedir, { passive: true });
    addEventListener('resize', pedir);
    window.Animacoes?.aoMudar?.(() => pedir());
    rolar();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();

  window.Paisagem = { atualizar: pedir };
})();
