/* QR desta página: na oficina, o formador projeta a página e a turma de professores abre a mesma página no celular.
   O botão redondo da barra abre uma tela com o QR grande e o link curto (gamificapampa.github.io/raio-x), com Copiar.
   Usa os QR prontos dos links curtos (gerados pelo qr.py e conferidos pelo testar_site.py): nada vem de fora.
   Só aparece nas páginas que têm link curto, e não aparece no kit sem internet.

   A barra do topo (barra.js) carrega este arquivo sozinha. Numa página sem a barra:
   <script src="/identidade-visual/js/qr-da-pagina.js" defer></script>, e depois
   QrDaPagina.pronto.then((botao) => botao && lugar.append(botao))

   QrDaPagina.pronto     promessa com o botão pronto, ou null quando a página não tem link curto
   QrDaPagina.abrir()    abre a tela do QR */
(() => {
  if (window.QrDaPagina) return;
  const I = '#2f2a4a';
  const SITE = 'https://gamificapampa.github.io';

  const estilo = document.createElement('style');
  estilo.textContent = `
    .gp-qr { display: inline-grid; place-items: center; flex: none; width: 44px; height: 44px; padding: 0; background: #fff; border: 3px solid ${I}; border-radius: 50%; box-shadow: 0 4px 0 ${I}; cursor: pointer; }
    .gp-qr:hover { transform: translateY(2px); box-shadow: 0 2px 0 ${I}; }
    .gp-qr:focus-visible, .gp-qr-tela button:focus-visible { outline: 4px solid #ff5f8f; outline-offset: 2px; }
    .gp-qr svg { width: 24px; height: 24px; }
    .gp-qr-tela { width: min(680px, 100% - 24px); max-height: calc(100% - 24px); padding: clamp(18px, 4vw, 36px); background: #fff; color: ${I}; border: 5px solid ${I}; border-radius: 28px; box-shadow: 0 10px 0 ${I}; font-family: "Fredoka", "Trebuchet MS", system-ui, sans-serif; text-align: center; }
    .gp-qr-tela::backdrop { background: rgb(18 15 44 / .72); }
    .gp-qr-tela h2 { margin: 0 0 6px; text-align: center; font-size: clamp(22px, 3.2vw, 30px); }
    .gp-qr-tela p { margin: 0; font-weight: 600; }
    .gp-qr-tela img { display: block; width: min(56vmin, 380px); height: auto; margin: 16px auto; }
    .gp-qr-tela .gp-qr-link { display: block; margin: 0 auto 18px; font-size: clamp(22px, 4.2vw, 40px); font-weight: 700; overflow-wrap: anywhere; }
    .gp-qr-tela .gp-qr-link span { color: #8c73ff; }
    .gp-qr-acoes { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; }
    .gp-qr-acoes button { min-height: 48px; padding: 4px 22px; background: #fff; color: ${I}; border: 3px solid ${I}; border-radius: 999px; box-shadow: 0 4px 0 ${I}; font: 600 18px "Fredoka", "Trebuchet MS", sans-serif; cursor: pointer; }
    .gp-qr-acoes button.gp-qr-copiar { background: #a08bff; }
    @media print { .gp-qr, .gp-qr-tela { display: none !important; } }
  `;
  document.head.append(estilo);

  const desenho = `<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="4" y="4" width="10" height="10" rx="2" fill="#fff" stroke="${I}" stroke-width="2.6"/><rect x="18" y="4" width="10" height="10" rx="2" fill="#fff" stroke="${I}" stroke-width="2.6"/><rect x="4" y="18" width="10" height="10" rx="2" fill="#fff" stroke="${I}" stroke-width="2.6"/><rect x="7.5" y="7.5" width="3" height="3" fill="${I}"/><rect x="21.5" y="7.5" width="3" height="3" fill="${I}"/><rect x="7.5" y="21.5" width="3" height="3" fill="${I}"/><path d="M18 18h4v4h-4zM24 22h4v6h-6v-3" fill="#8c73ff" stroke="${I}" stroke-width="2" stroke-linejoin="round"/></svg>`;
  const limpo = (caminho) => decodeURI(caminho).replace(/index\.html$/, '').replace(/\/?$/, '/');

  // Os links curtos moram no hub (atalhos.js, que lê o jogos.js): carrega os dois se a página ainda não tem
  const carregar = (src) => new Promise((ok) => {
    const s = Object.assign(document.createElement('script'), { src, onload: ok, onerror: ok });
    document.head.append(s);
  });
  const lista = async () => {
    if (typeof ATALHOS === 'undefined') {
      if (!window.JOGOS) await carregar('/jogos.js');
      await carregar('/atalhos.js');
    }
    return typeof ATALHOS === 'undefined' ? {} : ATALHOS; // eslint-disable-line no-undef
  };

  let achado = null;
  const abrir = () => {
    if (!achado) return;
    let tela = document.querySelector('.gp-qr-tela');
    if (!tela) {
      tela = Object.assign(document.createElement('dialog'), { className: 'gp-qr-tela' });
      // Papel: a noite (ceu.js) não escurece esta tela, que precisa do branco para o QR ser lido
      tela.dataset.papel = '';
      tela.setAttribute('aria-labelledby', 'gp-qr-titulo');
      tela.innerHTML = `<h2 id="gp-qr-titulo"></h2><p>Aponte a câmera do celular para o código, ou escreva o endereço.</p><img alt=""><strong class="gp-qr-link"></strong><div class="gp-qr-acoes"><button type="button" class="gp-qr-copiar">Copiar o link</button><button type="button" class="gp-qr-fechar">Fechar</button></div>`;
      tela.querySelector('.gp-qr-fechar').addEventListener('click', () => tela.close());
      tela.addEventListener('click', (e) => { if (e.target === tela) tela.close(); });
      tela.querySelector('.gp-qr-copiar').addEventListener('click', async (e) => {
        const botao = e.currentTarget;
        try { await navigator.clipboard.writeText(`${SITE}/${achado.nome}`); botao.textContent = 'Copiado'; } catch { botao.textContent = 'Não deu: escreva o endereço'; }
        setTimeout(() => { botao.textContent = 'Copiar o link'; }, 2500);
      });
      document.body.append(tela);
    }
    tela.querySelector('h2').textContent = achado.rotulo;
    const img = tela.querySelector('img');
    img.src = achado.qr;
    img.alt = `QR code de gamificapampa.github.io/${achado.nome}`;
    tela.querySelector('.gp-qr-link').innerHTML = `gamificapampa.github.io/<span></span>`;
    tela.querySelector('.gp-qr-link span').textContent = achado.nome;
    if (tela.showModal) tela.showModal(); else tela.setAttribute('open', '');
  };

  const pronto = (async () => {
    if (location.protocol === 'file:') return null;
    const atalhos = await lista();
    const aqui = limpo(location.pathname);
    for (const [nome, [, rotulo, destino, qr]] of Object.entries(atalhos)) {
      if (!rotulo || !String(destino).startsWith(SITE + '/')) continue;
      const alvo = new URL(destino);
      if (alvo.search || limpo(alvo.pathname) !== aqui) continue;
      achado = { nome, rotulo, qr: qr || `/atalhos/qr/${nome}.svg` };
      break;
    }
    if (!achado) return null;
    const botao = Object.assign(document.createElement('button'), { type: 'button', className: 'gp-qr' });
    botao.innerHTML = desenho;
    botao.setAttribute('aria-label', `Mostrar o QR e o link curto desta página (gamificapampa.github.io/${achado.nome})`);
    botao.title = 'QR desta página, para abrir no celular';
    botao.addEventListener('click', abrir);
    return botao;
  })();

  window.QrDaPagina = { pronto, abrir };
})();
