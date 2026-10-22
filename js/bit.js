/* Bit que fala: o robô do GamificaPampa num canto da tela, com um balão de fala.

   Nos jogos, a página chama Bit.diz(pose, texto) quando a criança acerta, erra ou termina:
     Bit.diz('ops', 'Bati numa pedra! Troque a seta e tente de novo.')
   O Bit aparece por alguns segundos e some sozinho. Ele não pega toque nem clique, para não atrapalhar o jogo.

   Nas páginas do professor, cada parte com data-bit-dica="..." (e, se quiser, data-bit-pose="...") vira uma dica.
   O Bit fica parado no canto, a dica muda conforme a pessoa rola a página e um toque no Bit abre e fecha o balão.

   <script src="/identidade-visual/js/bit.js" data-canto="baixo-direita" defer></script>
   Cantos: baixo-direita (o normal), baixo-esquerda, topo-direita e topo-esquerda.
   Poses: normal, acenando, pensando, feliz, comemorando, ops e formatura, as mesmas de mascote/. */
(() => {
  const script = document.currentScript;
  const pasta = new URL('../mascote/', script.src);
  const canto = script.dataset.canto || 'baixo-direita';
  const direita = canto.endsWith('direita');
  const reduzido = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const imagem = (pose) => new URL(pose === 'normal' ? 'bit.svg' : `bit-${pose}.svg`, pasta).href;

  const estilo = document.createElement('style');
  estilo.textContent = `
    .bit-fala { position: fixed; z-index: 1000; display: flex; align-items: flex-end; gap: 6px; max-width: min(380px, calc(100% - 20px)); pointer-events: none; font-family: "Fredoka", "Trebuchet MS", system-ui, sans-serif; transition: opacity .25s ease, transform .3s cubic-bezier(.34, 1.56, .64, 1); }
    .bit-fala--baixo-direita { right: 10px; bottom: max(10px, env(safe-area-inset-bottom)); flex-direction: row-reverse; }
    .bit-fala--baixo-esquerda { left: 10px; bottom: max(10px, env(safe-area-inset-bottom)); }
    .bit-fala--topo-direita { right: 10px; top: 10px; flex-direction: row-reverse; align-items: flex-start; }
    .bit-fala--topo-esquerda { left: 10px; top: 10px; align-items: flex-start; }
    .bit-fala.is-fora { opacity: 0; transform: translateY(24px) scale(.9); }
    .bit-fala__bit { flex: none; width: 66px; height: 66px; margin: 0; padding: 0; background: none; border: 0; border-radius: 50%; }
    button.bit-fala__bit { pointer-events: auto; cursor: pointer; }
    button.bit-fala__bit:focus-visible { outline: 4px solid #ff5f8f; outline-offset: 2px; }
    .bit-fala__bit img { display: block; width: 100%; height: 100%; filter: drop-shadow(0 4px 0 rgb(47 42 74 / .35)); }
    .bit-fala__bit.is-pulando img { animation: bit-fala-pula .5s cubic-bezier(.34, 1.56, .64, 1); }
    .bit-fala__balao { position: relative; margin: 0 0 16px; padding: 10px 14px; background: #fff; color: #2f2a4a; border: 4px solid #2f2a4a; border-radius: 20px; box-shadow: 0 5px 0 rgb(47 42 74 / .3); font-weight: 600; font-size: 16px; line-height: 1.3; text-align: left; }
    /* Só nas páginas do professor o balão recebe toque, por causa do botão de fechar. Nos jogos, o toque passa direto */
    .bit-fala--ajudante .bit-fala__balao { pointer-events: auto; }
    [class*="--topo"] .bit-fala__balao { margin: 16px 0 0; }
    .bit-fala__balao::before, .bit-fala__balao::after { content: ""; position: absolute; bottom: 14px; border-style: solid; border-color: transparent; }
    [class*="--topo"] .bit-fala__balao::before, [class*="--topo"] .bit-fala__balao::after { top: 14px; bottom: auto; }
    .bit-fala--baixo-esquerda .bit-fala__balao::before, .bit-fala--topo-esquerda .bit-fala__balao::before { left: -15px; border-width: 10px 12px 10px 0; border-right-color: #2f2a4a; }
    .bit-fala--baixo-esquerda .bit-fala__balao::after, .bit-fala--topo-esquerda .bit-fala__balao::after { left: -8px; margin-bottom: 3px; border-width: 7px 8px 7px 0; border-right-color: #fff; }
    [class*="-direita"] .bit-fala__balao::before { right: -15px; border-width: 10px 0 10px 12px; border-left-color: #2f2a4a; }
    [class*="-direita"] .bit-fala__balao::after { right: -8px; margin-bottom: 3px; border-width: 7px 0 7px 8px; border-left-color: #fff; }
    [class*="--topo"] .bit-fala__balao::after { margin: 3px 0 0; }
    .bit-fala__balao.is-fechado { display: none; }
    .bit-fala__balao.is-nova { animation: bit-fala-surge .35s cubic-bezier(.34, 1.56, .64, 1); }
    /* O X é desenhado com 30 px, mas o botão inteiro tem 44 px, para acertar o toque */
    .bit-fala__fechar { position: relative; isolation: isolate; float: right; display: grid; place-items: center; width: 44px; height: 44px; margin: -12px -16px 0 2px; padding: 0; background: none; color: #2f2a4a; border: 0; font: 700 16px/1 "Fredoka", sans-serif; cursor: pointer; }
    .bit-fala__fechar::before { content: ""; position: absolute; inset: 7px; z-index: -1; background: #fff; border: 3px solid #2f2a4a; border-radius: 50%; }
    .bit-fala__fechar:focus-visible { outline: none; }
    .bit-fala__fechar:focus-visible::before { outline: 4px solid #ff5f8f; outline-offset: 2px; }
    @media (max-width: 480px) {
      .bit-fala__bit { width: 54px; height: 54px; }
      .bit-fala__balao { font-size: 15px; }
    }
    @keyframes bit-fala-pula { 40% { transform: translateY(-14px) rotate(-6deg); } 70% { transform: translateY(2px) rotate(3deg); } }
    @keyframes bit-fala-surge { from { opacity: 0; transform: scale(.7); } }
    @media (prefers-reduced-motion: reduce) { .bit-fala, .bit-fala * { animation: none !important; transition: none !important; } }
    @media print { .bit-fala { display: none !important; } }
  `;
  document.head.append(estilo);

  const dicas = [...document.querySelectorAll('[data-bit-dica]')];
  const ajudante = dicas.length > 0;
  const raiz = Object.assign(document.createElement('div'), { className: `bit-fala bit-fala--${canto}${ajudante ? ' bit-fala--ajudante' : ''}` });
  const bit = document.createElement(ajudante ? 'button' : 'span');
  bit.className = 'bit-fala__bit';
  const foto = Object.assign(document.createElement('img'), { alt: '', src: imagem(ajudante ? 'acenando' : 'normal') });
  bit.append(foto);
  const balao = Object.assign(document.createElement('p'), { className: 'bit-fala__balao' });
  const texto = document.createElement('span');
  balao.append(texto);
  balao.setAttribute('role', 'status');
  raiz.append(bit, balao);

  // As poses usadas carregam antes, para a troca de pose não piscar.
  ['ops', 'feliz', 'comemorando', 'pensando', 'acenando'].forEach((pose) => { new Image().src = imagem(pose); });

  const pular = () => {
    if (reduzido) return;
    bit.classList.remove('is-pulando');
    void bit.offsetWidth;
    bit.classList.add('is-pulando');
  };
  const mostrarTexto = (pose, frase) => {
    foto.src = imagem(pose);
    texto.textContent = frase;
    balao.classList.remove('is-nova');
    void balao.offsetWidth;
    balao.classList.add('is-nova');
    pular();
  };

  let relogio;
  const fala = {
    // Nos jogos: mostra o Bit com a fala por alguns segundos. Com tempo 0, ele fica até a próxima fala.
    diz(pose, frase, tempo = 4000) {
      clearTimeout(relogio);
      raiz.classList.remove('is-fora');
      balao.classList.remove('is-fechado');
      mostrarTexto(pose, frase);
      if (tempo > 0) relogio = setTimeout(() => fala.cala(), tempo);
    },
    cala() {
      clearTimeout(relogio);
      if (ajudante) balao.classList.add('is-fechado');
      else raiz.classList.add('is-fora');
    },
  };

  if (!ajudante) {
    raiz.classList.add('is-fora');
    raiz.setAttribute('aria-live', 'polite');
  } else {
    // Nas páginas do professor: o Bit fica no canto, a dica acompanha a parte da página que está no meio da tela
    // e fecha sozinha depois de um tempo. O X guarda no aparelho que a pessoa não quer dicas abrindo sozinhas;
    // tocar no Bit continua abrindo a dica.
    const chave = 'bit-dicas-fechadas';
    let quieto = false;
    try { quieto = localStorage.getItem(chave) === '1'; } catch {}
    const fechar = Object.assign(document.createElement('button'), { type: 'button', className: 'bit-fala__fechar', textContent: '×' });
    fechar.setAttribute('aria-label', 'Fechar as dicas do Bit');
    balao.prepend(fechar);
    bit.setAttribute('aria-label', 'Dica do Bit');
    let atual = null;
    const abrir = (aberto) => {
      balao.classList.toggle('is-fechado', !aberto);
      bit.setAttribute('aria-expanded', String(aberto));
    };
    const usar = (parte, sozinho) => {
      atual = parte;
      clearTimeout(relogio);
      mostrarTexto(parte.dataset.bitPose || 'pensando', parte.dataset.bitDica);
      if (sozinho && quieto) { abrir(false); return; }
      abrir(true);
      if (sozinho) relogio = setTimeout(() => abrir(false), 9000);
    };
    bit.addEventListener('click', () => {
      const aberto = balao.classList.contains('is-fechado');
      clearTimeout(relogio);
      abrir(aberto);
      if (aberto) pular();
    });
    fechar.addEventListener('click', () => {
      quieto = true;
      try { localStorage.setItem(chave, '1'); } catch {}
      abrir(false);
      bit.focus();
    });
    // As partes que cruzam a faixa do meio da tela ficam guardadas; vale a última delas na ordem da página
    const naFaixa = new Set();
    const olho = new IntersectionObserver((itens) => {
      itens.forEach((item) => (item.isIntersecting ? naFaixa.add(item.target) : naFaixa.delete(item.target)));
      const visivel = dicas.filter((parte) => naFaixa.has(parte)).pop();
      if (visivel && visivel !== atual) usar(visivel, true);
    }, { rootMargin: '-35% 0px -55% 0px' });
    dicas.forEach((parte) => olho.observe(parte));
    usar(dicas[0], true);
  }

  window.Bit = fala;
  const pronto = () => document.body.append(raiz);
  if (document.body) pronto();
  else addEventListener('DOMContentLoaded', pronto);
})();
