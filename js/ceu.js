/* Dia e noite: o céu claro de sempre ou o céu de noite, com lua, estrelas e o campo escuro, como o modo claro e o
   modo escuro. Na primeira visita segue o aparelho (modo escuro do sistema); depois do toque no botão, fica a escolha
   da pessoa, lembrada neste aparelho.

   <html data-ceu="dia-noite">
   <script src="/identidade-visual/js/ceu.js"></script>   no <head>, para a página já abrir no céu certo

   Ceu.noite             true quando o céu está de noite
   Ceu.mudar()           passa do dia para a noite e volta
   Ceu.botao({ texto })  o botão pronto, com a lua (e o texto "Noite" ao lado, para um menu)

   O cenario.css desenha a noite pela classe ceu-noite no <html>; a página escurece o que for dela (a barra, os textos
   direto no céu) pela mesma classe.

   Com <html data-ceu-auto> (a barra do topo põe sozinha nas páginas do professor), a noite escurece a página inteira
   sem CSS da página: os cartões brancos viram roxo escuro e o texto escuro sobre fundo escuro fica claro. Papel de
   imprimir (.sheet, .cert, [data-papel]) continua branco, e nada muda na impressão. */
(() => {
  if (window.Ceu) return;
  const CHAVE = 'gp-ceu';
  const I = '#2f2a4a';
  const raiz = document.documentElement;
  const doSistema = matchMedia('(prefers-color-scheme: dark)');
  let escolha = null;
  try { escolha = localStorage.getItem(CHAVE); } catch {}
  let noite = escolha ? escolha === 'noite' : doSistema.matches;

  const estilo = document.createElement('style');
  estilo.textContent = `
    .gp-ceu { display: inline-flex; align-items: center; justify-content: center; gap: 8px; flex: none; min-width: 44px; height: 44px; padding: 0; background: #fff; color: ${I}; border: 3px solid ${I}; border-radius: 999px; box-shadow: 0 4px 0 ${I}; font: 600 16px "Fredoka", "Trebuchet MS", sans-serif; cursor: pointer; }
    .gp-ceu--texto { padding: 0 16px 0 10px; }
    .gp-ceu:hover { transform: translateY(2px); box-shadow: 0 2px 0 ${I}; }
    .gp-ceu[aria-pressed="true"] { background: #2a2650; color: #fff; }
    .gp-ceu:focus-visible { outline: 4px solid #ff5f8f; outline-offset: 2px; }
    .gp-ceu svg { width: 24px; height: 24px; }
    @media print { .gp-ceu { display: none !important; } }
  `;
  document.head.append(estilo);

  const LUA = `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M20 4.5a12 12 0 1 0 7.5 18.6A10 10 0 0 1 20 4.5z" fill="#fff3b8" stroke="${I}" stroke-width="2.6" stroke-linejoin="round"/><circle cx="25" cy="7" r="1.6" fill="#ffd23f"/></svg>`;
  const botoes = [];
  const desenhar = (botao) => {
    botao.innerHTML = LUA + (botao.dataset.texto ? '<span>Noite</span>' : '');
    botao.setAttribute('aria-pressed', String(noite));
    botao.setAttribute('aria-label', 'Céu de noite');
    botao.title = noite ? 'Voltar para o dia' : 'Passar para a noite';
  };
  const cor = document.querySelector('meta[name="theme-color"]');
  const corDoDia = cor?.content;
  let aplicar = () => {
    raiz.classList.toggle('ceu-noite', noite);
    raiz.style.setProperty('--dia', noite ? 1 : 0);
    if (cor) cor.content = noite ? '#120f2c' : corDoDia;
    botoes.forEach(desenhar);
  };

  window.Ceu = {
    get noite() { return noite; },
    mudar() {
      noite = !noite;
      escolha = noite ? 'noite' : 'dia';
      try { localStorage.setItem(CHAVE, escolha); } catch {}
      aplicar();
    },
    botao({ texto = false } = {}) {
      const botao = Object.assign(document.createElement('button'), { type: 'button', className: 'gp-ceu' + (texto ? ' gp-ceu--texto' : '') });
      if (texto) botao.dataset.texto = '1';
      botao.addEventListener('click', () => window.Ceu.mudar());
      botoes.push(botao);
      desenhar(botao);
      return botao;
    },
  };
  // ---------- Escurecer automático (data-ceu-auto) ----------
  // Marca o que é superfície clara (vira cartão escuro) e o texto escuro que ficaria sobre fundo escuro (vira claro).
  // Lê as cores calculadas, então funciona com o CSS próprio de cada página. Roda de novo quando a página muda
  const auto = () => 'ceuAuto' in raiz.dataset;
  const marcasNoite = document.createElement('style');
  marcasNoite.textContent = `
    @media screen {
      html.ceu-noite[data-ceu-auto] body { background-color: #0e0c22; }
      /* O céu de noite do cenario.css deixa o texto branco; aqui quem clareia o texto é o escurecer, peça por peça */
      html.ceu-noite[data-ceu-auto] body.ceu, html.ceu-noite[data-ceu-auto] .ceu { color: #2f2a4a; }
      html.ceu-noite [data-gp-fundo="cartao"] { background-color: #1f1b42 !important; border-color: #000 !important; }
      html.ceu-noite [data-gp-fundo="campo"] { background-color: #16132f !important; color: #f4f1ff !important; border-color: #6d66a8 !important; }
      html.ceu-noite [data-gp-cor="texto"] { color: #f4f1ff !important; }
      html.ceu-noite [data-gp-cor="suave"] { color: #c3bde8 !important; }
      html.ceu-noite [data-gp-cor="tinta"] { color: #2f2a4a !important; }
      html.ceu-noite [data-gp-fundo="campo"]::placeholder { color: #8f88c0; }
    }
  `;
  document.head.append(marcasNoite);
  const PAPEL = '.sheet, .cert, [data-papel], .gp-barra, .gp-ceu, .gp-animacoes, svg, img, video, canvas, .btn, .carimbo';
  const TEXTO = 'h1, h2, h3, h4, h5, h6, p, li, dt, dd, span, a, b, strong, em, small, label, summary, figcaption, blockquote, td, th, legend, code, kbd, mark, i, u, cite, q, button';
  const rgba = (cor) => (cor.match(/[\d.]+/g) || []).map(Number);
  const luz = ([r, g, b]) => (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  const mexidos = new Set();
  // Duas marcas, porque o mesmo elemento pode ter o fundo e o texto trocados (um botão de filtro branco, por exemplo)
  const limpar = () => { mexidos.forEach((el) => { el.removeAttribute('data-gp-fundo'); el.removeAttribute('data-gp-cor'); }); mexidos.clear(); };
  const marcarFundo = (el, tipo) => { el.dataset.gpFundo = tipo; mexidos.add(el); };
  const marcarCor = (el, tipo) => { el.dataset.gpCor = tipo; mexidos.add(el); };
  // Branco ou quase branco, sem cor: o pastel das partes do prompt e das etiquetas continua como está
  const quaseBranco = ([r, g, b]) => luz([r, g, b]) > .86 && Math.max(r, g, b) - Math.min(r, g, b) < 26;
  // O fundo que aparece atrás do elemento: o do primeiro ancestral com fundo opaco (ou o céu escuro, se nenhum tiver)
  const fundoEscuro = (el) => {
    for (let at = el; at && at !== document.documentElement; at = at.parentElement) {
      if (at.dataset?.gpFundo) return true;
      const estilo = getComputedStyle(at);
      const [r, g, b, a = 1] = rgba(estilo.backgroundColor);
      if (a > .55) return at === document.body ? true : luz([r, g, b]) < .5;
      // Fundo com imagem (um degradê, um padrão) e sem cor: não dá para saber, então o texto fica como está
      if (estilo.backgroundImage !== 'none' && at !== document.body && !at.classList.contains('ceu') && !at.classList.contains('cena')) return false;
    }
    return true;
  };
  const escurecer = () => {
    limpar();
    if (!noite || !auto()) return;
    const papel = (el) => el.closest(PAPEL);
    // 1. Superfícies quase brancas viram cartões escuros; campos de formulário, campos escuros
    document.body.querySelectorAll('*').forEach((el) => {
      if (papel(el)) return;
      const estilo = getComputedStyle(el);
      const [r, g, b, a = 1] = rgba(estilo.backgroundColor);
      // Branco translúcido (uma pastilha de 50% sobre um cartão) também vira cartão: misturado com o escuro, daria cinza
      if (a < .3 || !quaseBranco([r, g, b]) || estilo.backgroundImage !== 'none') return;
      // A moldura branca de um logo ou de um desenho, sem texto, continua branca
      if (!el.textContent.trim() && el.querySelector('img, svg')) return;
      marcarFundo(el, el.matches('input, textarea, select') ? 'campo' : 'cartao');
    });
    // 2. Texto escuro sobre o que agora é escuro fica claro (o cinza-arroxeado vira o suave). Primeiro decide tudo,
    // depois marca: a cor marcada passa para os filhos, e a decisão tem de ler a cor de antes
    const decisoes = [];
    // Entra todo elemento de texto e também a caixa (um div) que tem texto solto dentro dela
    const temTexto = (el) => [...el.childNodes].some((no) => no.nodeType === 3 && no.textContent.trim());
    document.body.querySelectorAll('*').forEach((el) => {
      if (!(el.matches(TEXTO) || temTexto(el)) || papel(el) || el.matches('script, style, template')) return;
      const l = luz(rgba(getComputedStyle(el).color));
      if (l > .45 || !fundoEscuro(el)) return;
      decisoes.push([el, l > .28 ? 'suave' : 'texto']);
    });
    // 3. O que tem fundo claro próprio (uma bolinha pastel, um selo amarelo) dentro de um texto que clareou volta à tinta
    const clareados = new Set(decisoes.map(([el]) => el));
    const tinta = [];
    clareados.forEach((pai) => pai.querySelectorAll('*').forEach((el) => {
      if (clareados.has(el) || papel(el)) return;
      const estilo = getComputedStyle(el);
      const [r, g, b, a = 1] = rgba(estilo.backgroundColor);
      if (a > .55 && luz([r, g, b]) > .5 && luz(rgba(estilo.color)) < .45) tinta.push(el);
    }));
    decisoes.forEach(([el, tipo]) => marcarCor(el, tipo));
    tinta.forEach((el) => marcarCor(el, 'tinta'));
  };
  let pendente = 0;
  const pedirEscurecer = () => { if (!pendente) pendente = requestAnimationFrame(() => { pendente = 0; observar(false); escurecer(); observar(true); }); };
  const vigia = new MutationObserver(pedirEscurecer);
  const observar = (ligar) => { if (!auto() || !document.body) return; if (ligar) vigia.observe(document.body, { childList: true, subtree: true }); else vigia.disconnect(); };
  const aplicarTudo = aplicar;
  aplicar = () => { aplicarTudo(); if (document.body) pedirEscurecer(); };
  addEventListener('beforeprint', () => { observar(false); limpar(); });
  addEventListener('afterprint', pedirEscurecer);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => { pedirEscurecer(); addEventListener('load', pedirEscurecer); });
  else pedirEscurecer();

  // Sem escolha guardada, acompanha o modo escuro do aparelho
  doSistema.addEventListener('change', (evento) => { if (!escolha) { noite = evento.matches; aplicar(); } });
  aplicar();
})();
