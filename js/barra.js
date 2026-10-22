/* Barra do topo das páginas do professor: o ícone leva ao início, "Voltar" leva à página de cima, a trilha diz
   onde a pessoa está, o botão redondo para as animações (animacoes.js) e o botão verde abre os jogos para a turma.
   Some na impressão e na tela cheia.

   <script src="/identidade-visual/js/barra.js" defer></script>

   A trilha sai do endereço da página, pelos lugares da lista abaixo, e termina no título da página (o texto antes
   de " · "). data-pagina="..." troca esse último nome. data-modo="compacta" deixa só o Voltar, num canto, para
   páginas de tela inteira como os slides. No kit sem internet, as páginas abrem do disco e a trilha leva aos
   arquivos do próprio kit.

   data-impressao="propria" diz que a página tem o seu jeito de imprimir. Sem ele, a barra põe a impressão comum:
   papel branco, sem o cenário e sem botões, e as partes fechadas (details) abertas na hora de imprimir. */
(() => {
  const script = document.currentScript;
  const compacta = script.dataset.modo === 'compacta';
  const pasta = new URL('../', script.src);

  // Os lugares com página própria, do mais alto para o mais baixo
  const LUGARES = [
    ['/', 'Início'],
    ['/recursos-pedagogicos/', 'Recursos'],
    ['/recursos-pedagogicos/professores/oficina-prompts/', 'Oficina de Prompts'],
    ['/recursos-pedagogicos/professores/aula-engenharia-de-software/', 'Aula com os jogos'],
    ['/recursos-pedagogicos/professores/medalhas/', 'Medalhas do Bit'],
    ['/maquina/', 'Máquina de prompts'],
    ['/turma/', 'Jogos para a turma'],
  ];

  // No kit, o endereço é do disco: a raiz do kit fica antes de /recursos-pedagogicos/, e o menu da turma é o index.html dela
  const local = location.protocol === 'file:';
  let caminho = decodeURI(location.pathname);
  let raiz = '/';
  if (local) {
    const corte = caminho.indexOf('/recursos-pedagogicos/');
    raiz = corte >= 0 ? caminho.slice(0, corte + 1) : caminho.replace(/[^/]*$/, '');
    caminho = '/' + caminho.slice(raiz.length);
  }
  const aqui = caminho.replace(/index\.html$/, '');
  const endereco = (lugar) => {
    if (!local) return lugar;
    if (lugar === '/' || lugar === '/turma/') return 'file://' + raiz + 'index.html';
    return 'file://' + raiz + lugar.slice(1) + 'index.html';
  };
  // No kit não há a página de recursos nem as da oficina; a trilha pula o que não veio
  const noKit = (lugar) => !local || lugar === '/' || lugar.startsWith('/recursos-pedagogicos/professores/aula-engenharia-de-software/');

  const acima = LUGARES.filter(([lugar]) => lugar !== aqui && aqui.startsWith(lugar) && noKit(lugar));
  const proprio = LUGARES.find(([lugar]) => lugar === aqui);
  const nome = script.dataset.pagina || (proprio ? proprio[1] : document.title.split(' · ')[0].trim());
  const pai = acima[acima.length - 1] || ['/', 'Início'];

  const I = '#2f2a4a';
  const seta = `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M27 16H8M15 9l-7 7 7 7" fill="none" stroke="${I}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const play = `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M10 6l15 10-15 10z" fill="#fff" stroke="${I}" stroke-width="2.6" stroke-linejoin="round"/></svg>`;

  const estilo = document.createElement('style');
  estilo.textContent = `
    .gp-barra { position: relative; z-index: 50; background: rgb(255 255 255 / .92); border-bottom: 4px solid ${I}; font-family: "Fredoka", "Trebuchet MS", system-ui, sans-serif; color: ${I}; }
    .gp-barra__dentro { display: flex; align-items: center; gap: 10px; width: min(1200px, 100% - 24px); min-height: 62px; margin: 0 auto; padding: 6px 0; }
    .gp-barra a { color: ${I}; text-decoration: none; }
    .gp-barra a:focus-visible { outline: 4px solid #ff5f8f; outline-offset: 2px; }
    .gp-barra svg { width: 22px; height: 22px; flex: none; }
    .gp-barra__logo { display: grid; place-items: center; flex: none; width: 46px; height: 46px; border-radius: 14px; }
    .gp-barra__logo img { display: block; width: 40px; height: 40px; }
    .gp-barra__botao { display: inline-flex; align-items: center; gap: 8px; min-height: 44px; padding: 4px 16px; background: #fff; border: 3px solid ${I}; border-radius: 999px; box-shadow: 0 4px 0 ${I}; font-weight: 600; font-size: 17px; white-space: nowrap; transition: transform .1s ease, box-shadow .1s ease; }
    .gp-barra__botao:hover { transform: translateY(2px); box-shadow: 0 2px 0 ${I}; }
    .gp-barra__botao span { overflow: hidden; text-overflow: ellipsis; }
    .gp-barra__voltar { min-width: 0; flex: 0 1 auto; }
    .gp-barra__turma { background: #4fd6a6; }
    .gp-barra .gp-animacoes { margin-left: auto; }
    .gp-barra__turma .gp-barra__curto { display: none; }
    .gp-barra__trilha { display: flex; flex-wrap: wrap; align-items: center; gap: 2px 6px; min-width: 0; margin: 0 0 0 6px; padding: 0; list-style: none; font-size: 16px; font-weight: 600; color: #5d5880; }
    .gp-barra__trilha li + li::before { content: "›"; margin-right: 6px; font-weight: 700; }
    .gp-barra__trilha a { text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 3px; color: #5d5880; }
    .gp-barra__trilha [aria-current] { color: ${I}; }
    .gp-barra--compacta { position: fixed; top: 10px; left: 10px; background: none; border: 0; }
    .gp-barra--compacta .gp-barra__dentro { width: auto; min-height: 0; padding: 0; }
    @media (max-width: 760px) {
      .gp-barra__trilha { display: none; }
      .gp-barra__botao { padding: 4px 12px; font-size: 16px; }
      .gp-barra__turma { flex: none; }
    }
    @media (max-width: 520px) {
      .gp-barra__turma .gp-barra__longo { display: none; }
      .gp-barra__turma .gp-barra__curto { display: inline; }
    }
    :root:fullscreen .gp-barra { display: none; }
    @media print { .gp-barra { display: none !important; } }
    @media (prefers-reduced-motion: reduce) { .gp-barra__botao { transition: none; } }
  `;
  document.head.append(estilo);

  // Impressão comum das páginas do professor: papel branco, sem o cenário e sem botões, cartões inteiros na folha
  if (script.dataset.impressao !== 'propria') {
    const impressao = document.createElement('style');
    impressao.textContent = `
      @media print {
        html, body { background: #fff !important; }
        .cenario, .sky, .clouds, .cloud, .hills, .morros, .nuvem, .simbolo, .glyph, .deco { display: none !important; }
        button, .btn, .chips, .jump-to, .nav, .gp-barra-fixa, .gp-esquecer, .bit-fala, video { display: none !important; }
        .card, .pcard, .game, .item { break-inside: avoid; box-shadow: none !important; }
        a { color: inherit; }
      }
    `;
    document.head.append(impressao);
    const fechados = [];
    addEventListener('beforeprint', () => {
      document.querySelectorAll('details:not([open])').forEach((parte) => { parte.open = true; fechados.push(parte); });
    });
    addEventListener('afterprint', () => { fechados.splice(0).forEach((parte) => { parte.open = false; }); });
  }

  const barra = document.createElement('nav');
  barra.className = 'gp-barra' + (compacta ? ' gp-barra--compacta' : '');
  barra.setAttribute('aria-label', 'Navegação do site');
  const dentro = document.createElement('div');
  dentro.className = 'gp-barra__dentro';
  barra.append(dentro);

  const link = (classe, href, conteudo, texto) => {
    const a = Object.assign(document.createElement('a'), { className: classe, href });
    a.innerHTML = conteudo;
    if (texto) a.append(Object.assign(document.createElement('span'), { textContent: texto }));
    return a;
  };

  const voltar = link('gp-barra__botao gp-barra__voltar', endereco(pai[0]), seta, pai[1]);
  voltar.setAttribute('aria-label', 'Voltar para ' + pai[1]);
  if (!compacta) {
    const logo = link('gp-barra__logo', endereco('/'), `<img src="${new URL('logos/gamificapampa-icone.svg', pasta).href}" alt="GamificaPampa, início">`);
    const trilha = document.createElement('ol');
    trilha.className = 'gp-barra__trilha';
    [...acima, ['', nome]].forEach(([lugar, rotulo], indice, lista) => {
      const item = document.createElement('li');
      if (indice === lista.length - 1) {
        item.textContent = rotulo;
        item.setAttribute('aria-current', 'page');
      } else {
        item.append(Object.assign(document.createElement('a'), { href: endereco(lugar), textContent: rotulo }));
      }
      trilha.append(item);
    });
    // Na tela estreita o nome encurta para "Jogos"; o leitor de tela ouve sempre o nome inteiro
    const turma = link('gp-barra__botao gp-barra__turma', endereco('/turma/'), play + '<span class="gp-barra__longo">Jogos para a turma</span><span class="gp-barra__curto">Jogos</span>');
    turma.setAttribute('aria-label', 'Jogos para a turma');
    dentro.append(logo, voltar, trilha, turma);
    // "Parar animações", que vale para o site todo e fica lembrado no aparelho, ao lado dos jogos
    const animacoes = () => turma.before(window.Animacoes.botao());
    if (window.Animacoes) animacoes();
    else document.head.append(Object.assign(document.createElement('script'), { src: new URL('js/animacoes.js', pasta).href, onload: animacoes }));
  } else {
    dentro.append(voltar);
  }

  const pronto = () => document.body.prepend(barra);
  if (document.body) pronto();
  else addEventListener('DOMContentLoaded', pronto);
})();
