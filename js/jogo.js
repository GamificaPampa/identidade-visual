/* Peças comuns dos jogos do GamificaPampa: som guardado para todos os jogos, tela cheia, botão de voltar ao menu
   da turma, pausa ao trocar de aba, contagem 3, 2, 1 e confete. Cada jogo põe os botões no próprio topo.

   <script src="/identidade-visual/js/jogo.js"></script>

   Jogo.som.ligado              se o som está ligado. Vale para todos os jogos e fica guardado no aparelho
   Jogo.som.mudar()             liga ou desliga; Jogo.som.aoMudar(f) chama f(ligado) agora e a cada mudança
   Jogo.botao('casa')           botão que volta ao menu da turma (também 'tela-cheia' e 'som')
   Jogo.botao(nome, { classe: 'btn btn--small', texto: true }) faz o botão com o estilo da página e com texto
   Jogo.aoSairDaAba(pausar, voltar)   pausa quando a criança troca de aba e volta com a contagem
   Jogo.contagem()              mostra 3, 2, 1, Já! por cima da tela e devolve uma promessa
   Jogo.confete()               solta confete pela tela
   Jogo.acoesDoFim(jogarDeNovo) fileira da tela final: Jogar de novo (verde) e Outros jogos (branco)
   A tecla F liga e desliga a tela cheia quando a página tem o botão de tela cheia. */
(() => {
  const I = '#2f2a4a';
  const script = document.currentScript;
  const reduzido = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // No kit sem internet, o menu da turma é o index.html da raiz do kit
  const menu = (() => {
    if (location.protocol !== 'file:') return 'https://gamificapampa.github.io/turma/';
    const caminho = decodeURI(location.pathname);
    const corte = caminho.indexOf('/recursos-pedagogicos/');
    return corte >= 0 ? 'file://' + caminho.slice(0, corte + 1) + 'index.html' : 'https://gamificapampa.github.io/turma/';
  })();

  const contorno = (largura = 2.4) => `stroke="${I}" stroke-width="${largura}" stroke-linejoin="round" stroke-linecap="round"`;
  const desenhos = {
    casa: `<path d="M8 13v13h16V13" fill="#ffd23f" ${contorno()}/><path d="M5 15 16 5l11 10" fill="none" ${contorno(2.6)}/><rect x="13.5" y="18" width="5" height="8" rx="1" fill="#fff" ${contorno(2)}/>`,
    'tela-cheia': `<rect x="9" y="9" width="14" height="14" rx="2" fill="#cdeeff" ${contorno(2)}/><path d="M4 11V4h7M21 4h7v7M28 21v7h-7M11 28H4v-7" fill="none" ${contorno(3)}/>`,
    'sair-tela-cheia': `<rect x="11" y="11" width="10" height="10" rx="2" fill="#cdeeff" ${contorno(2)}/><path d="M11 4v7H4M21 4v7h7M28 21h-7v7M4 21h7v7" fill="none" ${contorno(3)}/>`,
    som: `<path d="M5 12h5l7-6v20l-7-6H5z" fill="#ffd23f" ${contorno()}/><path d="M21 11.5q3.5 4.5 0 9M24.5 8q7 8 0 16" fill="none" ${contorno()}/>`,
    mudo: `<path d="M5 12h5l7-6v20l-7-6H5z" fill="#cfcbe6" ${contorno()}/><path d="M21 12l7 8M28 12l-7 8" stroke="#ff5f8f" stroke-width="3" stroke-linecap="round"/>`,
  };
  const svg = (nome) => `<svg class="gp-jogo-icone" viewBox="0 0 32 32" aria-hidden="true" focusable="false">${desenhos[nome]}</svg>`;

  const estilo = document.createElement('style');
  estilo.textContent = `
    .gp-jogo-redondo { display: inline-grid; place-items: center; flex: none; width: 48px; height: 48px; padding: 0; background: #fff; color: ${I}; border: 3px solid ${I}; border-radius: 50%; box-shadow: 0 4px 0 ${I}; cursor: pointer; text-decoration: none; transition: transform .1s ease, box-shadow .1s ease; }
    .gp-jogo-redondo:active { transform: translateY(3px); box-shadow: 0 1px 0 ${I}; }
    .gp-jogo-redondo .gp-jogo-icone { width: 28px; height: 28px; }
    .gp-jogo-icone { width: 1.2em; height: 1.2em; flex: none; vertical-align: -.25em; }
    .gp-jogo-redondo:focus-visible, .gp-jogo-botao:focus-visible { outline: 4px solid #ff5f8f; outline-offset: 2px; }
    .gp-fim-acoes { display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; margin: 6px 0; }
    .gp-fim-acoes > * { display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-height: 56px; padding: 6px 26px; border: 4px solid ${I}; border-radius: 999px; box-shadow: 0 6px 0 ${I}; color: ${I}; font: 700 22px/1.1 "Fredoka", "Trebuchet MS", sans-serif; text-decoration: none; cursor: pointer; }
    .gp-fim-acoes > *:active { transform: translateY(4px); box-shadow: 0 2px 0 ${I}; }
    .gp-fim-jogar { background: #4fd6a6; }
    .gp-fim-outros { background: #fff; }
    .gp-contagem { position: fixed; inset: 0; z-index: 900; display: grid; place-items: center; background: rgb(255 255 255 / .55); pointer-events: none; font-family: "Fredoka", "Trebuchet MS", sans-serif; }
    .gp-contagem span { font-size: min(40vw, 40vh); font-weight: 700; line-height: 1; color: #ff8a3d; -webkit-text-stroke: .05em ${I}; paint-order: stroke fill; text-shadow: 0 .06em 0 ${I}; animation: gp-contagem .8s both; }
    @keyframes gp-contagem { 0% { transform: scale(.2); opacity: 0; } 30% { transform: scale(1.15); opacity: 1; } 100% { transform: scale(1); } }
    .gp-confete { position: fixed; top: -20px; z-index: 950; width: 12px; height: 16px; border-radius: 3px; pointer-events: none; animation: gp-confete linear forwards; }
    @keyframes gp-confete { to { transform: translateY(110vh) rotate(720deg); } }
    /* Em tela estreita, os botões com texto mostram só o desenho; o nome continua para o leitor de tela */
    @media (max-width: 420px) { .gp-jogo-botao .gp-jogo-rotulo { display: none; } }
    @media (prefers-reduced-motion: reduce) { .gp-contagem span { animation: none; } .gp-jogo-redondo { transition: none; } }
  `;
  document.head.append(estilo);

  // Som: uma chave só para todos os jogos, então quem desliga num jogo encontra o próximo sem som
  const CHAVE = 'gp-som';
  let ligado = true;
  try { ligado = localStorage.getItem(CHAVE) !== '0'; } catch {}
  const ouvintes = new Set();
  const som = {
    get ligado() { return ligado; },
    mudar(valor = !ligado) {
      ligado = Boolean(valor);
      try { localStorage.setItem(CHAVE, ligado ? '1' : '0'); } catch {}
      ouvintes.forEach((ouvinte) => ouvinte(ligado));
    },
    aoMudar(ouvinte) { ouvintes.add(ouvinte); ouvinte(ligado); },
  };

  const telaCheia = {
    pode: Boolean(document.documentElement.requestFullscreen),
    get ativa() { return Boolean(document.fullscreenElement); },
    alternar() {
      if (document.fullscreenElement) document.exitFullscreen();
      else document.documentElement.requestFullscreen?.().catch(() => {});
    },
  };

  let teclaF = false;
  const ligarTeclaF = () => {
    if (teclaF) return;
    teclaF = true;
    addEventListener('keydown', (evento) => {
      if (evento.repeat || evento.metaKey || evento.ctrlKey || evento.altKey) return;
      if (evento.key !== 'f' && evento.key !== 'F') return;
      if (evento.target.closest?.('input, textarea, select, [contenteditable]')) return;
      telaCheia.alternar();
    });
  };

  // Um botão pronto: redondo só com o desenho, ou com a classe da página e texto ao lado
  const botao = (nome, { classe = '', texto = false } = {}) => {
    const casa = nome === 'casa';
    const elemento = document.createElement(casa ? 'a' : 'button');
    if (casa) elemento.href = menu;
    else elemento.type = 'button';
    elemento.className = classe ? `${classe} gp-jogo-botao` : 'gp-jogo-redondo';
    const pintar = (desenho, rotulo) => {
      elemento.innerHTML = svg(desenho) + (texto ? ' ' : '');
      if (texto) elemento.append(Object.assign(document.createElement('span'), { className: 'gp-jogo-rotulo', textContent: rotulo }));
      elemento.setAttribute('aria-label', rotulo);
      elemento.title = rotulo;
    };
    if (casa) pintar('casa', 'Outros jogos');
    if (nome === 'tela-cheia') {
      if (!telaCheia.pode) elemento.hidden = true;
      const atualizar = () => pintar(telaCheia.ativa ? 'sair-tela-cheia' : 'tela-cheia', telaCheia.ativa ? 'Sair da tela cheia' : 'Tela cheia');
      atualizar();
      document.addEventListener('fullscreenchange', atualizar);
      elemento.addEventListener('click', () => telaCheia.alternar());
      ligarTeclaF();
    }
    if (nome === 'som') {
      som.aoMudar((agora) => {
        pintar(agora ? 'som' : 'mudo', agora ? 'Som ligado' : 'Sem som');
        elemento.setAttribute('aria-pressed', String(agora));
      });
      elemento.addEventListener('click', () => som.mudar());
    }
    return elemento;
  };

  const espera = (ms) => new Promise((pronto) => setTimeout(pronto, ms));
  let audio;
  const bipe = (frequencia, duracao) => {
    if (!ligado) return;
    try {
      audio ??= new (window.AudioContext || window.webkitAudioContext)();
      const oscilador = audio.createOscillator(), volume = audio.createGain(), agora = audio.currentTime;
      oscilador.type = 'triangle';
      oscilador.frequency.value = frequencia;
      volume.gain.setValueAtTime(0.12, agora);
      volume.gain.exponentialRampToValueAtTime(0.001, agora + duracao);
      oscilador.connect(volume).connect(audio.destination);
      oscilador.start(agora);
      oscilador.stop(agora + duracao + 0.02);
    } catch {}
  };

  const contagem = async (passos = ['3', '2', '1', 'Já!']) => {
    const tela = Object.assign(document.createElement('div'), { className: 'gp-contagem' });
    tela.setAttribute('role', 'status');
    document.body.append(tela);
    for (const [indice, passo] of passos.entries()) {
      tela.innerHTML = `<span>${passo}</span>`;
      bipe(indice < passos.length - 1 ? 523 : 784, 0.18);
      await espera(indice < passos.length - 1 ? 650 : 450);
    }
    tela.remove();
  };

  const confete = (quantos = 70) => {
    if (reduzido) return;
    const cores = ['#ff5f8f', '#ffd23f', '#4fd6a6', '#a08bff', '#ff8a3d', '#4da3ff'];
    for (let indice = 0; indice < quantos; indice++) {
      const peca = Object.assign(document.createElement('span'), { className: 'gp-confete' });
      peca.style.left = Math.random() * 100 + 'vw';
      peca.style.background = cores[indice % cores.length];
      peca.style.animationDuration = 1.6 + Math.random() * 1.8 + 's';
      peca.style.animationDelay = Math.random() * 0.5 + 's';
      peca.addEventListener('animationend', () => peca.remove());
      document.body.append(peca);
    }
  };

  // Trocar de aba pausa a rodada; ao voltar, a contagem dá tempo de a criança se preparar
  const aoSairDaAba = (pausar, voltar) => {
    let pausado = false;
    document.addEventListener('visibilitychange', async () => {
      if (document.hidden) { pausado = pausar() !== false; return; }
      if (!pausado) return;
      pausado = false;
      await contagem(['3', '2', '1']);
      voltar();
    });
  };

  // A fileira da tela final, igual em todos os jogos. Tocar no fundo da tela final não reinicia nada
  const acoesDoFim = (jogarDeNovo) => {
    const fileira = Object.assign(document.createElement('div'), { className: 'gp-fim-acoes' });
    const deNovo = Object.assign(document.createElement('button'), { type: 'button', className: 'gp-fim-jogar' });
    deNovo.innerHTML = `<svg class="gp-jogo-icone" viewBox="0 0 32 32" aria-hidden="true"><path d="M10 6l15 10-15 10z" fill="#fff" ${contorno(2.6)}/></svg> `;
    deNovo.append('Jogar de novo');
    deNovo.addEventListener('click', (evento) => { evento.stopPropagation(); jogarDeNovo(); });
    const outros = botao('casa', { classe: 'gp-fim-outros', texto: true });
    outros.addEventListener('click', (evento) => evento.stopPropagation());
    fileira.append(deNovo, outros);
    return fileira;
  };

  window.Jogo = { menu, som, telaCheia, botao, contagem, confete, aoSairDaAba, acoesDoFim };

  // Os objetos de aula no céu do jogo (objetos.js), carregados ao lado deste arquivo
  const objetos = () => {
    if (window.Objetos || !script || !document.querySelector('.cenario, .scenery')) return;
    document.head.append(Object.assign(document.createElement('script'), { src: new URL('objetos.js', script.src).href }));
  };
  if (document.readyState === 'loading') addEventListener('DOMContentLoaded', objetos);
  else objetos();
})();
