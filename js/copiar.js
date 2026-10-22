/* Copiar igual em toda parte: copia o texto, avisa numa faixa embaixo da tela e, se o navegador não deixar copiar,
   mostra o texto já selecionado para a pessoa copiar à mão. Só diz "copiado" quando o texto foi mesmo copiado.

   <script src="/identidade-visual/js/copiar.js"></script>

   await Copiar.texto(texto)                          copia e mostra "Copiado!"; devolve true ou false
   await Copiar.texto(texto, { aviso: 'Copiado! Agora cole no Gemini.' })   com outra frase
   await Copiar.texto(texto, { avisar: false })       copia sem a faixa, para a página avisar do seu jeito
   Copiar.avisar('Frase')                             mostra a faixa com qualquer frase
   Copiar.barraFixa({ observar, copiar, contador })   no celular, uma barra no pé da tela com Copiar e Abrir o Gemini
     aparece quando a área de copiar (observar) saiu da tela; o Copiar dela aperta o botão copiar da página */
(() => {
  const I = '#2f2a4a';
  const estilo = document.createElement('style');
  estilo.textContent = `
    .gp-aviso { position: fixed; left: 50%; bottom: max(18px, env(safe-area-inset-bottom)); z-index: 1100; max-width: calc(100% - 32px); padding: 10px 22px; translate: -50% 0; background: ${I}; color: #fff; border: 4px solid #fff; border-radius: 999px; box-shadow: 0 6px 0 rgb(47 42 74 / .35); font: 600 17px/1.3 "Fredoka", "Trebuchet MS", sans-serif; text-align: center; opacity: 0; pointer-events: none; transition: opacity .2s ease, transform .2s ease; transform: translateY(10px); }
    .gp-aviso.is-on { opacity: 1; transform: none; }
    .gp-copiar-mao { position: fixed; inset: 0; z-index: 1200; display: grid; place-items: center; padding: 16px; background: rgb(47 42 74 / .6); font-family: "Fredoka", "Trebuchet MS", sans-serif; }
    .gp-copiar-mao__caixa { display: grid; gap: 12px; width: min(640px, 100%); padding: 20px; background: #fff; color: ${I}; border: 5px solid ${I}; border-radius: 26px; box-shadow: 0 10px 0 ${I}; }
    .gp-copiar-mao__caixa p { margin: 0; font-weight: 600; font-size: 17px; line-height: 1.35; }
    .gp-copiar-mao__caixa textarea { width: 100%; min-height: 160px; max-height: 50vh; padding: 10px 12px; border: 3px solid ${I}; border-radius: 14px; font: 500 16px/1.4 "Fredoka", "Trebuchet MS", sans-serif; color: ${I}; resize: vertical; }
    .gp-copiar-mao__caixa button { justify-self: end; min-height: 48px; padding: 4px 24px; background: #fff; color: ${I}; border: 3px solid ${I}; border-radius: 999px; box-shadow: 0 4px 0 ${I}; font: 600 17px "Fredoka", "Trebuchet MS", sans-serif; cursor: pointer; }
    .gp-copiar-mao__caixa button:focus-visible { outline: 4px solid #ff5f8f; outline-offset: 2px; }
    .gp-barra-fixa { position: fixed; left: 0; right: 0; bottom: 0; z-index: 900; display: flex; align-items: center; gap: 10px; padding: 10px 12px max(10px, env(safe-area-inset-bottom)); background: #fff; border-top: 4px solid ${I}; box-shadow: 0 -6px 0 rgb(47 42 74 / .15); font-family: "Fredoka", "Trebuchet MS", sans-serif; transform: translateY(115%); transition: transform .2s ease; }
    .gp-barra-fixa.is-on { transform: none; }
    .gp-barra-fixa__info { flex: 1; min-width: 0; color: ${I}; font-weight: 600; font-size: 15px; line-height: 1.2; }
    .gp-barra-fixa a, .gp-barra-fixa button { display: inline-flex; align-items: center; justify-content: center; min-height: 48px; padding: 4px 18px; border: 3px solid ${I}; border-radius: 999px; box-shadow: 0 4px 0 ${I}; color: ${I}; font: 600 16px "Fredoka", "Trebuchet MS", sans-serif; text-decoration: none; white-space: nowrap; cursor: pointer; }
    .gp-barra-fixa button { background: #4fd6a6; }
    .gp-barra-fixa button:disabled { opacity: .5; cursor: default; }
    .gp-barra-fixa a { background: #fff; }
    .gp-barra-fixa :focus-visible { outline: 4px solid #ff5f8f; outline-offset: 2px; }
    body:has(.gp-barra-fixa.is-on) .bit-fala--baixo-direita, body:has(.gp-barra-fixa.is-on) .bit-fala--baixo-esquerda { bottom: 84px; }
    @media print { .gp-aviso, .gp-copiar-mao, .gp-barra-fixa { display: none !important; } }
    @media (prefers-reduced-motion: reduce) { .gp-barra-fixa { transition: none; } }
    @media (prefers-reduced-motion: reduce) { .gp-aviso { transition: none; } }
  `;
  document.head.append(estilo);

  let faixa, some;
  const avisar = (frase) => {
    if (!faixa) {
      faixa = Object.assign(document.createElement('p'), { className: 'gp-aviso' });
      faixa.setAttribute('role', 'status');
      document.body.append(faixa);
    }
    faixa.textContent = frase;
    faixa.classList.add('is-on');
    clearTimeout(some);
    some = setTimeout(() => faixa.classList.remove('is-on'), 2600);
  };

  // Quando o navegador não deixa copiar, o texto aparece selecionado, pronto para o Ctrl+C ou o toque longo
  const aMao = (texto) => {
    const fundo = Object.assign(document.createElement('div'), { className: 'gp-copiar-mao' });
    fundo.setAttribute('role', 'dialog');
    fundo.setAttribute('aria-modal', 'true');
    fundo.setAttribute('aria-label', 'Copiar à mão');
    fundo.innerHTML = '<div class="gp-copiar-mao__caixa"><p>Não deu para copiar sozinho. O texto já está selecionado: aperte Ctrl+C, ou segure o dedo em cima dele e toque em Copiar.</p><textarea readonly></textarea><button type="button">Fechar</button></div>';
    const caixa = fundo.querySelector('textarea');
    caixa.value = texto;
    const fechar = () => { fundo.remove(); document.removeEventListener('keydown', tecla); };
    const tecla = (evento) => { if (evento.key === 'Escape') fechar(); };
    fundo.querySelector('button').addEventListener('click', fechar);
    fundo.addEventListener('click', (evento) => { if (evento.target === fundo) fechar(); });
    document.addEventListener('keydown', tecla);
    document.body.append(fundo);
    caixa.focus();
    caixa.select();
  };

  const tentar = async (texto) => {
    try { await navigator.clipboard.writeText(texto); return true; } catch {}
    const campo = Object.assign(document.createElement('textarea'), { value: texto });
    campo.setAttribute('readonly', '');
    campo.style.cssText = 'position: fixed; top: 0; left: 0; opacity: 0';
    document.body.append(campo);
    campo.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch {}
    campo.remove();
    return ok;
  };

  const texto = async (conteudo, { aviso = 'Copiado!', avisar: comAviso = true } = {}) => {
    const ok = await tentar(String(conteudo));
    if (ok && comAviso) avisar(aviso);
    if (!ok) aMao(String(conteudo));
    return ok;
  };

  const barraFixa = ({ observar, copiar, contador = null, largura = 980, gemini = 'https://gemini.google.com/app' }) => {
    const barra = Object.assign(document.createElement('div'), { className: 'gp-barra-fixa' });
    barra.setAttribute('role', 'region');
    barra.setAttribute('aria-label', 'Copiar o prompt');
    const info = Object.assign(document.createElement('span'), { className: 'gp-barra-fixa__info' });
    const botao = Object.assign(document.createElement('button'), { type: 'button', textContent: 'Copiar' });
    botao.addEventListener('click', () => copiar.click());
    const link = Object.assign(document.createElement('a'), { href: gemini, target: '_blank', rel: 'noopener', textContent: 'Abrir o Gemini' });
    barra.append(info, botao, link);
    document.body.append(barra);
    const sincronizar = () => {
      botao.disabled = copiar.disabled;
      info.textContent = contador ? contador.textContent : '';
    };
    new MutationObserver(sincronizar).observe(copiar, { attributes: true });
    if (contador) new MutationObserver(sincronizar).observe(contador, { childList: true, characterData: true, subtree: true });
    sincronizar();
    const estreita = matchMedia(`(max-width: ${largura - 1}px)`);
    let aVista = true;
    const atualizar = () => barra.classList.toggle('is-on', estreita.matches && !aVista);
    new IntersectionObserver(([item]) => { aVista = item.isIntersecting; atualizar(); }).observe(observar);
    estreita.addEventListener('change', atualizar);
    return barra;
  };

  window.Copiar = { texto, avisar, barraFixa };
})();
