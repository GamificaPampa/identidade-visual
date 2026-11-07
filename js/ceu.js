/* Dia e noite: o céu claro de sempre ou o céu de noite, com lua, estrelas e o campo escuro, como o modo claro e o
   modo escuro. Na primeira visita segue o aparelho (modo escuro do sistema); depois do toque no botão, fica a escolha
   da pessoa, lembrada neste aparelho.

   <html data-ceu="dia-noite">
   <script src="/identidade-visual/js/ceu.js"></script>   no <head>, para a página já abrir no céu certo

   Ceu.noite             true quando o céu está de noite
   Ceu.mudar()           passa do dia para a noite e volta
   Ceu.botao({ texto })  o botão pronto, com a lua (e o texto "Noite" ao lado, para um menu)

   O cenario.css desenha a noite pela classe ceu-noite no <html>; a página escurece o que for dela (a barra, os textos
   direto no céu) pela mesma classe. */
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
  const aplicar = () => {
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
  // Sem escolha guardada, acompanha o modo escuro do aparelho
  doSistema.addEventListener('change', (evento) => { if (!escolha) { noite = evento.matches; aplicar(); } });
  aplicar();
})();
