/* Parar animações: para quem acha o movimento demais, ou num notebook lento da escola, um toque para tudo
   o que se mexe na página e o site lembra a escolha neste aparelho, em todas as páginas.

   <script src="/identidade-visual/js/animacoes.js"></script>   no <head>, para a página já abrir parada

   Animacoes.paradas      true quando a pessoa parou as animações
   Animacoes.mudar()      para ou volta
   Animacoes.botao()      o botão redondo pronto, que mostra se está parado
   Animacoes.botao({ texto: true })   o mesmo botão com o texto ao lado, para um menu
   Animacoes.aoMudar(f)   chama f(paradas) agora e a cada mudança, para o que a página anima por script

   A barra do topo (barra.js) já carrega este arquivo e põe o botão nas páginas do professor. */
(() => {
  if (window.Animacoes) return;
  const CHAVE = 'gp-animacoes-paradas';
  const I = '#2f2a4a';
  let paradas = false;
  try { paradas = localStorage.getItem(CHAVE) === '1'; } catch {}

  // Parado, cada animação pula para o fim: o que entra aparece pronto e o que repete fica no lugar
  const estilo = document.createElement('style');
  estilo.textContent = `
    html.gp-parado *, html.gp-parado *::before, html.gp-parado *::after { animation-delay: 0s !important; animation-duration: 0s !important; animation-iteration-count: 1 !important; transition-duration: 0s !important; scroll-behavior: auto !important; }
    .gp-animacoes { display: inline-grid; place-items: center; flex: none; width: 44px; height: 44px; padding: 0; background: #fff; border: 3px solid ${I}; border-radius: 50%; box-shadow: 0 4px 0 ${I}; cursor: pointer; }
    .gp-animacoes:hover { transform: translateY(2px); box-shadow: 0 2px 0 ${I}; }
    .gp-animacoes[aria-pressed="true"] { background: #ffd23f; }
    .gp-animacoes:focus-visible { outline: 4px solid #ff5f8f; outline-offset: 2px; }
    .gp-animacoes svg { width: 24px; height: 24px; }
    .gp-animacoes--texto { display: inline-flex; gap: 8px; width: auto; padding: 0 16px 0 10px; border-radius: 999px; color: ${I}; font: 600 16px "Fredoka", "Trebuchet MS", sans-serif; }
    @media print { .gp-animacoes { display: none !important; } }
  `;
  document.head.append(estilo);

  const PAUSA = `<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="8" y="6" width="6" height="20" rx="2" fill="#fff" stroke="${I}" stroke-width="2.6"/><rect x="18" y="6" width="6" height="20" rx="2" fill="#fff" stroke="${I}" stroke-width="2.6"/></svg>`;
  const PLAY = `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M10 6l15 10-15 10z" fill="#4fd6a6" stroke="${I}" stroke-width="2.6" stroke-linejoin="round"/></svg>`;
  const botoes = [];
  const ouvintes = [];
  const desenhar = (botao) => {
    botao.innerHTML = (paradas ? PLAY : PAUSA) + (botao.dataset.texto ? `<span>${paradas ? 'Animar de novo' : 'Parar animações'}</span>` : '');
    botao.setAttribute('aria-pressed', String(paradas));
    botao.setAttribute('aria-label', paradas ? 'Animações paradas. Tocar para voltar a animar' : 'Parar as animações');
    botao.title = paradas ? 'Voltar a animar' : 'Parar as animações';
  };
  const aplicar = () => {
    document.documentElement.classList.toggle('gp-parado', paradas);
    botoes.forEach(desenhar);
    ouvintes.forEach((ouvinte) => ouvinte(paradas));
  };

  window.Animacoes = {
    get paradas() { return paradas; },
    mudar() {
      paradas = !paradas;
      try { localStorage.setItem(CHAVE, paradas ? '1' : '0'); } catch {}
      aplicar();
    },
    botao({ texto = false } = {}) {
      const botao = Object.assign(document.createElement('button'), { type: 'button', className: 'gp-animacoes' + (texto ? ' gp-animacoes--texto' : '') });
      if (texto) botao.dataset.texto = '1';
      botao.addEventListener('click', () => window.Animacoes.mudar());
      botoes.push(botao);
      desenhar(botao);
      return botao;
    },
    aoMudar(ouvinte) {
      ouvintes.push(ouvinte);
      ouvinte(paradas);
    },
  };
  aplicar();
})();
