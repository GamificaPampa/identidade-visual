/* Peças comuns dos jogos do GamificaPampa: som guardado para todos os jogos (começa desligado), estrelas das fases
   guardadas no aparelho, tela cheia, botão de voltar ao menu da turma, pausa ao trocar de aba, contagem 3, 2, 1 e
   confete. Cada jogo põe os botões no próprio topo.

   <script src="/identidade-visual/js/jogo.js"></script>

   Jogo.som.ligado              se o som está ligado. Começa desligado, vale para todos os jogos e a escolha fica guardada no aparelho
   Jogo.som.mudar()             liga ou desliga; Jogo.som.aoMudar(f) chama f(ligado) agora e a cada mudança
   Jogo.progresso.estrelas(fase)   as estrelas guardadas da fase (0 a 3; 0 se nenhuma). A fase é o número, como 1, 2, 3
   Jogo.progresso.guardar(fase, estrelas)   guarda as estrelas da fase, só se forem mais que as de antes; devolve as guardadas
   Jogo.progresso.total()       soma das estrelas guardadas das fases deste jogo
   Jogo.progresso.limpar()      apaga as estrelas guardadas deste jogo. A chave leva o nome da pasta do jogo (funciona por file://)
   Jogo.botao('casa')           botão que volta ao menu da turma (também 'tela-cheia', 'som', 'ouvir' e 'ler-sozinho')
   Jogo.botao(nome, { classe: 'btn btn--small', texto: true }) faz o botão com o estilo da página e com texto
   Jogo.aoSairDaAba(pausar, voltar)   pausa quando a criança troca de aba e volta com a contagem
   Jogo.contagem()              mostra 3, 2, 1, Já! por cima da tela e devolve uma promessa
   Jogo.confete()               solta confete pela tela
   Jogo.acoesDoFim(jogarDeNovo) fileira da tela final: Jogar de novo (verde) e Outros jogos (branco)
   A tecla F liga e desliga a tela cheia quando a página tem o botão de tela cheia.

   Ouvir, para quem ainda não lê bem: lê em voz alta, com a voz do navegador (speechSynthesis, pt-BR), o texto da tela.
   Sem speechSynthesis ou sem voz em português do Brasil, os botões ficam escondidos e o jogo segue igual. A leitura é
   acessibilidade: funciona mesmo com o som desligado, prefere voz que roda no aparelho (vale no kit sem internet) e
   para ao trocar de tela, ao pausar (modo professor) e ao sair da aba.
   Jogo.botao('ouvir')          botão de alto-falante: toca para ouvir a tela e toca de novo para parar
   Jogo.botao('ler-sozinho')    botão que liga e desliga o Ler sozinho (também com { classe, texto: true }). Fica guardado no aparelho:
                                ligado, cada fala nova do Bit e cada tela nova são lidas sem apertar nada
   Jogo.ouvir.textoDaTela(() => texto)   o jogo diz o que ler: a pergunta ou o desafio e, se fizer sentido, as opções, num texto
                                que soe bem em voz alta (escreva "um quarto", não "1/4"). Devolve texto ou lista de textos.
                                A última fala do Bit entra sozinha no fim. Sem isso, vale o texto dos elementos com [data-ouvir]
                                visíveis: [data-ouvir] lê o texto do elemento (ou o valor, se tiver), [data-ouvir-lista="Respostas"]
                                lê os filhos como "Respostas: a, b, c" (cada filho vale pelo próprio data-ouvir, pelo aria-label ou pelo texto, nessa ordem), [data-ouvir-nao] deixa um elemento de fora, [data-ouvir-botoes] numa área diz que os botões dentro dela
                                são texto (as frases de uma resposta, as cartas) e não comandos, e [data-ouvir-sobre] marca a tela final ou um aviso, que
                                vale sozinho enquanto aparece. Botões, fora dessas áreas, e desenhos SVG sem nome (role="img" e aria-label) não entram
   Jogo.ouvir.novaTela()        o jogo chama quando mostra uma pergunta ou tela nova: corta a leitura que estava rolando e,
                                com o Ler sozinho ligado, lê a tela nova
   Jogo.ouvir.falar(texto, ritmo) / .parar() / .ler()   fala um texto (ritmo de 0,1 a 2; o normal é 0,92), para, lê a tela agora (o que o botão faz)
   Jogo.ouvir.bit               true por padrão: a fala do Bit entra na leitura. Os jogos de reflexo põem false e leem só as instruções e o resultado
   Jogo.ouvir.disponivel / .falando / .sozinho / .alternarSozinho(valor) / .aoMudar(f)   o estado
   O Bit.diz(pose, texto) é acompanhado sozinho, seja o do bit.js, seja o que a página define em window.Bit.

   Modo professor, para quem conduz a aula no projetor. O jogo registra o que cada botão faz:
   Jogo.modoProfessor({ irParaFase(n), resposta(), pausar(), continuar() })
     irParaFase(n)   abre a fase n (de 1 em diante, como em Jogo.progresso). A barra lê as fases e a atual dos botões de #fases .fase
     resposta()      destaca a resposta certa do desafio atual e o Bit explica; não conta acerto nem dá estrelas
     pausar()        para o que o jogo tem de cronômetro ou animação; continuar() volta. As duas são opcionais
   O modo liga com ?professor no fim do endereço ou com a tecla P, e desliga com a tecla P. Aparece uma barra no canto
   com Fase anterior (A), Próxima fase (S), Mostrar resposta (R) e Pausar (E); as teclas só valem com o modo ligado,
   e não valem em campo de texto. Pausar põe uma cortina por cima do jogo, com o botão Continuar (também E ou Esc).
   Sem o modo ligado, nada muda na página.
   Jogo.modoProfessor.destacar(elemento, ...)   marca elementos HTML ou SVG como a resposta; a marca sai no próximo toque
   Jogo.modoProfessor.ligado / .pausado / .alternar(valor)   o estado e o interruptor */
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
    'prof-anterior': `<path d="M20 6 10 16l10 10" fill="none" ${contorno(4)}/>`,
    'prof-proxima': `<path d="M12 6l10 10-10 10" fill="none" ${contorno(4)}/>`,
    'prof-resposta': `<path d="M16 3.5a8.5 8.5 0 0 0-4.6 15.7V22h9.2v-2.8A8.5 8.5 0 0 0 16 3.5z" fill="#fff" ${contorno()}/><path d="M12.5 25.5h7M14 28.5h4" fill="none" ${contorno(2.6)}/>`,
    'prof-pausar': `<rect x="8" y="6" width="5.5" height="20" rx="1.5" fill="#fff" ${contorno(2.2)}/><rect x="18.5" y="6" width="5.5" height="20" rx="1.5" fill="#fff" ${contorno(2.2)}/>`,
    'prof-continuar': `<path d="M10 6l15 10-15 10z" fill="#fff" ${contorno(2.6)}/>`,
    ouvir: `<rect x="3" y="11" width="7" height="10" rx="2" fill="#4da3ff" ${contorno()}/><path d="M10 12.5 19 6v20l-9-6.5z" fill="#4da3ff" ${contorno()}/><path d="M22.5 11q2.8 5 0 10M26 8q5.5 8 0 16" fill="none" ${contorno(2.6)}/>`,
    'ouvir-parar': `<rect x="7" y="7" width="18" height="18" rx="4" fill="#ff5f8f" ${contorno()}/>`,
    'ler-sozinho': `<rect x="2.5" y="12" width="5" height="8" rx="1.6" fill="#fff" ${contorno(2.2)}/><path d="M7.5 13 14 8v16l-6.5-5z" fill="#fff" ${contorno(2.2)}/><path d="M20 12.5a5.5 5.5 0 1 1-2 3.6" fill="none" ${contorno(2.6)}/><path d="M16.8 9.8l3.6 2.2-3.6 2.6z" fill="#fff" ${contorno(2)}/>`,
    'ler-sozinho-ligado': `<rect x="2.5" y="12" width="5" height="8" rx="1.6" fill="#4fd6a6" ${contorno(2.2)}/><path d="M7.5 13 14 8v16l-6.5-5z" fill="#4fd6a6" ${contorno(2.2)}/><path d="M20 12.5a5.5 5.5 0 1 1-2 3.6" fill="none" ${contorno(2.6)}/><path d="M16.8 9.8l3.6 2.2-3.6 2.6z" fill="#4fd6a6" ${contorno(2)}/>`,
    mudo: `<path d="M5 12h5l7-6v20l-7-6H5z" fill="#cfcbe6" ${contorno()}/><path d="M21 12l7 8M28 12l-7 8" stroke="#ff5f8f" stroke-width="3" stroke-linecap="round"/>`,
  };
  const svg = (nome) => `<svg class="gp-jogo-icone" viewBox="0 0 32 32" aria-hidden="true" focusable="false">${desenhos[nome]}</svg>`;

  const estilo = document.createElement('style');
  estilo.textContent = `
    .gp-jogo-redondo { display: inline-grid; place-items: center; flex: none; width: 48px; height: 48px; padding: 0; background: #fff; color: ${I}; border: 3px solid ${I}; border-radius: 50%; box-shadow: 0 4px 0 ${I}; cursor: pointer; text-decoration: none; transition: transform .1s ease, box-shadow .1s ease; }
    .gp-jogo-redondo:active { transform: translateY(3px); box-shadow: 0 1px 0 ${I}; }
    .gp-jogo-redondo .gp-jogo-icone { width: 28px; height: 28px; }
    .gp-jogo-icone { width: 1.2em; height: 1.2em; flex: none; vertical-align: -.25em; }
    .gp-jogo-redondo[hidden], .gp-jogo-botao[hidden] { display: none !important; }
    .gp-jogo-redondo[aria-pressed="true"] { background: #d9f7ec; }
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
    /* Modo professor: a barra no canto, a cortina da pausa e a marca da resposta */
    .gp-prof { position: fixed; left: 10px; bottom: max(10px, env(safe-area-inset-bottom)); z-index: 880; display: flex; align-items: center; gap: 8px; max-width: calc(100vw - 20px); padding: 6px; background: rgb(255 255 255 / .95); border: 3px solid ${I}; border-radius: 999px; font-family: "Fredoka", "Trebuchet MS", sans-serif; color: ${I}; }
    .gp-prof[hidden] { display: none; }
    .gp-prof-rotulo { padding: 0 8px 0 12px; font-size: 15px; font-weight: 700; white-space: nowrap; }
    .gp-prof-botao { display: inline-flex; align-items: center; justify-content: center; gap: 8px; flex: none; min-width: 48px; min-height: 48px; padding: 4px 18px 4px 12px; background: #fff; color: ${I}; border: 3px solid ${I}; border-radius: 999px; box-shadow: 0 4px 0 ${I}; font: 700 17px/1.1 "Fredoka", "Trebuchet MS", sans-serif; cursor: pointer; }
    .gp-prof-botao:active:not(:disabled) { transform: translateY(3px); box-shadow: 0 1px 0 ${I}; }
    .gp-prof-botao:focus-visible { outline: 4px solid #ff5f8f; outline-offset: 2px; }
    .gp-prof-botao:disabled { opacity: .45; cursor: default; box-shadow: none; transform: translateY(4px); }
    .gp-prof-botao[data-acao="resposta"] { background: #ffd23f; }
    .gp-prof-botao .gp-jogo-icone { width: 26px; height: 26px; }
    .gp-prof-cortina { position: fixed; inset: 0; z-index: 1100; display: grid; place-items: center; padding: 16px; background: rgb(47 42 74 / .88); font-family: "Fredoka", "Trebuchet MS", sans-serif; }
    .gp-prof-cortina[hidden] { display: none; }
    .gp-prof-caixa { display: grid; justify-items: center; gap: 16px; width: min(560px, 100%); padding: 26px 22px 30px; background: #fff; color: ${I}; border: 4px solid ${I}; border-radius: 28px; text-align: center; }
    .gp-prof-caixa img { width: 112px; height: 112px; }
    .gp-prof-caixa h2 { margin: 0; font-size: clamp(26px, 5vw, 40px); font-weight: 700; line-height: 1.15; }
    .gp-prof-caixa button { display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-height: 56px; padding: 6px 28px; background: #4fd6a6; color: ${I}; border: 4px solid ${I}; border-radius: 999px; box-shadow: 0 6px 0 ${I}; font: 700 22px/1.1 "Fredoka", "Trebuchet MS", sans-serif; cursor: pointer; }
    .gp-prof-caixa button:active { transform: translateY(4px); box-shadow: 0 2px 0 ${I}; }
    .gp-prof-caixa button:focus-visible { outline: 4px solid #ff5f8f; outline-offset: 3px; }
    .gp-modo-professor body { padding-bottom: 90px; }
    .gp-pausado *, .gp-pausado *::before, .gp-pausado *::after { animation-play-state: paused !important; }
    .gp-resposta { outline: 6px solid #ff8a3d !important; outline-offset: 3px; filter: drop-shadow(0 0 3px #ff8a3d) drop-shadow(0 0 3px #ff8a3d) drop-shadow(0 0 8px #ffd23f); }
    /* Dentro de um desenho SVG o contorno sairia como um retângulo, então a marca é só o brilho */
    svg .gp-resposta { outline: none !important; filter: drop-shadow(0 0 1px #ff8a3d) drop-shadow(0 0 2px #ff8a3d) drop-shadow(0 0 3px #ff8a3d) drop-shadow(0 0 10px #ffd23f) drop-shadow(0 0 16px #ffd23f); }
    @media (max-width: 800px) { .gp-prof-rotulo, .gp-prof-botao .gp-jogo-rotulo { display: none; } .gp-prof { gap: 6px; } .gp-prof-botao { padding: 4px 10px; } }
    /* Em tela estreita, os botões com texto mostram só o desenho; o nome continua para o leitor de tela */
    @media (max-width: 420px) { .gp-jogo-botao .gp-jogo-rotulo { display: none; } }
    @media (prefers-reduced-motion: reduce) { .gp-contagem span { animation: none; } .gp-jogo-redondo { transition: none; } }
  `;
  document.head.append(estilo);

  // Som: uma chave só para todos os jogos, então quem liga num jogo encontra o próximo com som.
  // Quem nunca escolheu começa sem som; quem já tinha escolhido (1 ou 0) mantém a escolha
  const CHAVE = 'gp-som';
  let ligado = false;
  try { ligado = localStorage.getItem(CHAVE) === '1'; } catch {}
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

  // Progresso: as estrelas de cada fase, por jogo. A chave leva o nome da pasta do jogo e não a origem,
  // porque o kit sem internet abre por file:// e o mesmo jogo aparece em endereços diferentes
  const pasta = (() => {
    const partes = decodeURI(location.pathname).split('/').filter(Boolean);
    if (/\.html?$/i.test(partes[partes.length - 1] || '')) partes.pop();
    return partes.pop() || 'raiz';
  })();
  const CHAVE_ESTRELAS = `gp-estrelas:${pasta}`;
  let guardadas = null;
  const ler = () => {
    if (guardadas) return guardadas;
    guardadas = {};
    try {
      const texto = JSON.parse(localStorage.getItem(CHAVE_ESTRELAS) || '{}');
      if (texto && typeof texto === 'object') for (const [fase, n] of Object.entries(texto)) if (Number.isFinite(n)) guardadas[fase] = Math.max(0, Math.min(3, Math.round(n)));
    } catch {}
    return guardadas;
  };
  const progresso = {
    estrelas(fase) { return ler()[String(fase)] || 0; },
    guardar(fase, estrelas) {
      const novas = Math.max(0, Math.min(3, Math.round(Number(estrelas)) || 0));
      if (novas > progresso.estrelas(fase)) {
        ler()[String(fase)] = novas;
        try { localStorage.setItem(CHAVE_ESTRELAS, JSON.stringify(guardadas)); } catch {}
      }
      return progresso.estrelas(fase);
    },
    total() { return Object.values(ler()).reduce((soma, n) => soma + n, 0); },
    limpar() {
      guardadas = {};
      try { localStorage.removeItem(CHAVE_ESTRELAS); } catch {}
    },
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

  // Ouvir: a voz do navegador lê a tela. A leitura é acessibilidade, então não depende do som ligado
  const CHAVE_LER = 'gp-ler-sozinho';
  let sozinho = false;
  try { sozinho = localStorage.getItem(CHAVE_LER) === '1'; } catch {}
  const sintese = window.speechSynthesis, Enunciado = window.SpeechSynthesisUtterance;
  const ouvintesOuvir = new Set();
  let voz = null, falando = false, registro = null, bitLido = true;
  let ultimaFala = '', ultimaFalaEm = 0, telaEm = 0, fila = [], ficha = 0, adiar = 0, atual = null;
  let pendente = null, relogioAuto = 0;
  const avisarOuvir = () => ouvintesOuvir.forEach((ouvinte) => ouvinte());

  // Prefere a voz que roda no próprio aparelho: funciona sem internet e não corta frases longas
  const escolherVoz = () => {
    let vozes = [];
    try { vozes = sintese?.getVoices?.() || []; } catch {}
    const brasil = vozes.filter((v) => /^(pt[-_]br|por[-_]bra)$/i.test(v.lang));
    const lista = brasil.length ? brasil : vozes.filter((v) => /^pt$/i.test(v.lang));
    return lista.find((v) => v.localService) || lista[0] || null;
  };
  const atualizarVoz = () => {
    const antes = Boolean(voz);
    voz = sintese && Enunciado ? escolherVoz() : null;
    if (Boolean(voz) !== antes) avisarOuvir();
  };
  if (sintese && Enunciado) {
    atualizarVoz();
    sintese.addEventListener?.('voiceschanged', atualizarVoz);
    // Alguns navegadores carregam as vozes sem avisar
    for (let tentativa = 1; tentativa <= 8 && !voz; tentativa++) setTimeout(atualizarVoz, tentativa * 500);
  }

  // Fração de um algarismo por outro (1/4, 3/8) é lida como "um quarto", "três oitavos"; datas e números maiores ficam como estão
  const NUMERAIS = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'];
  const PARTES = ['', '', 'meio', 'terço', 'quarto', 'quinto', 'sexto', 'sétimo', 'oitavo', 'nono', 'décimo'];
  const fracao = (texto) => texto.replace(/(^|[^\d/.,])([1-9])\/([2-9]|10)(?![\d/.,])/g, (_, antes, cima, baixo) => `${antes}${NUMERAIS[cima]} ${PARTES[baixo]}${cima > 1 ? 's' : ''}`);
  // O que soa estranho lido letra por letra vira palavra; o resto o navegador lê bem
  const falavel = (texto) => fracao(String(texto ?? ''))
    .replace(/\s[×÷+=−–]\s/g, (m) => ({ '×': ' vezes ', '÷': ' dividido por ', '+': ' mais ', '=': ' igual a ', '−': ' menos ', '–': ' menos ' })[m.trim()])
    .replace(/(\d)\s*×(?!\s*\d)/g, '$1 vezes')
    .replace(/(\d)\s*×\s*(\d)/g, '$1 vezes $2')
    .replace(/\b([A-Za-zΩ])\s·\s([A-Za-z])\b/g, '$1 vezes $2')
    .replace(/(\d)\s:\s(\d)/g, '$1 para $2')
    .replace(/(\d)\s*÷\s*(\d)/g, '$1 dividido por $2')
    .replace(/(\d|\))\s*=\s*(\d|\?|\()/g, '$1 igual a $2')
    .replace(/(\d)\s*\+\s*(\d)/g, '$1 mais $2')
    .replace(/(\d)\s*−\s*(\d)/g, '$1 menos $2')
    .replace(/\s*[·•]\s*/g, ', ')
    .replace(/[…→←]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  // Frases curtas, uma por vez: o Chrome corta falas longas
  const pedacos = (texto) => {
    const saida = [];
    for (const frase of texto.match(/[^.!?;:]+[.!?;:]*\s*/g) || []) {
      const t = frase.trim();
      if (!t) continue;
      const anterior = saida[saida.length - 1];
      if (anterior && anterior.length + t.length < 90) saida[saida.length - 1] = `${anterior} ${t}`;
      else saida.push(t);
    }
    return saida.flatMap((t) => (t.length <= 180 ? [t] : t.match(/.{1,170}(\s|$)/g).map((x) => x.trim())));
  };

  const parar = () => {
    ficha++;
    fila = [];
    atual = null;
    clearTimeout(adiar);
    clearTimeout(relogioAuto);
    pendente = null;
    if (sintese) try { sintese.cancel(); } catch {}
    if (falando) { falando = false; avisarOuvir(); }
  };
  const proximo = (minha, ritmo) => {
    if (minha !== ficha) return;
    const parte = fila.shift();
    if (!parte) { falando = false; atual = null; avisarOuvir(); return; }
    const frase = new Enunciado(parte);
    frase.lang = 'pt-BR';
    try { frase.voice = voz; } catch {}
    frase.rate = ritmo;
    frase.onend = () => proximo(minha, ritmo);
    frase.onerror = (evento) => {
      if (minha !== ficha) return;
      // Sem toque antes na página, o navegador não deixa falar: a leitura só fica para a próxima vez
      if (evento.error === 'not-allowed') { fila = []; falando = false; avisarOuvir(); return; }
      // Outra fala tomou a vez (o jogo falando uma palavra por conta própria): esta leitura acaba aqui
      if (evento.error === 'interrupted' || evento.error === 'canceled') { fila = []; falando = false; avisarOuvir(); return; }
      proximo(minha, ritmo);
    };
    atual = frase; // guardada, senão o navegador pode descartar a fala no meio
    try { sintese.speak(frase); } catch { falando = false; avisarOuvir(); }
  };
  const falar = (texto, ritmo = 0.92) => {
    if (!sintese || !Enunciado || !voz) return false;
    const partes = pedacos(falavel(Array.isArray(texto) ? texto.filter(Boolean).join('. ') : texto));
    if (!partes.length) return false;
    parar();
    const minha = ficha;
    fila = partes;
    falando = true;
    avisarOuvir();
    // O Chrome às vezes ignora um speak() logo depois de um cancel()
    adiar = setTimeout(() => proximo(minha, ritmo), 60);
    return true;
  };

  // Lê o que se vê dentro de um elemento, uma linha por bloco. Botões, desenhos SVG e o que está escondido ficam de fora
  const linhasDe = (raiz) => {
    const linhas = [''];
    const botoesSaoTexto = Boolean(raiz.closest('[data-ouvir-botoes]'));
    const quebra = () => { if (linhas[linhas.length - 1] !== '') linhas.push(''); };
    const andar = (no) => {
      if (no.nodeType === 3) { linhas[linhas.length - 1] += no.data; return; }
      if (no.nodeType !== 1) return;
      if (no.hidden || no.getAttribute('aria-hidden') === 'true' || no.hasAttribute('data-ouvir-nao')) return;
      const css = getComputedStyle(no);
      if (css.display === 'none' || css.visibility === 'hidden') return;
      if (/^svg$/i.test(no.tagName)) {
        // Um desenho com nome (gráfico, mapa) entra pelo nome; sem nome, fica de fora
        const nome = no.getAttribute('role') === 'img' ? no.getAttribute('aria-label') : '';
        if (nome) { quebra(); linhas[linhas.length - 1] += nome; quebra(); }
        return;
      }
      if (no !== raiz && /^(script|style|select|textarea|input)$/i.test(no.tagName)) return;
      if (no !== raiz && !botoesSaoTexto && /^button$/i.test(no.tagName) && !no.closest('[data-ouvir-botoes]')) return;
      const bloco = css.display !== 'inline' && css.display !== 'contents';
      if (bloco) quebra();
      no.childNodes.forEach(andar);
      if (bloco) quebra();
    };
    andar(raiz);
    return linhas.map(falavel).filter((linha) => /[\p{L}\p{N}]/u.test(linha));
  };
  const aparece = (elemento) => !elemento.closest('[hidden]') && elemento.getClientRects().length > 0;
  const comPonto = (texto) => (/[.!?:;]$/.test(texto.trim()) ? texto.trim() : `${texto.trim()}.`);
  const emFrases = (texto) => String(texto ?? '').split(/\n+/).map(falavel).filter(Boolean).map(comPonto).join(' ');
  // [data-ouvir-sobre]: uma tela por cima do jogo (a final, um aviso); enquanto aparece, vale só ela
  // [data-ouvir]: um texto da tela (o valor, se tiver, no lugar do que está escrito)
  // [data-ouvir-lista]: as escolhas, lidas como "Respostas: a, b, c" (o valor é a palavra do começo)
  const lerSobre = () => [...document.querySelectorAll('[data-ouvir-sobre]')].filter(aparece)
    .map((e) => linhasDe(e).map(comPonto).join(' ')).filter(Boolean).join(' ');
  const lerElementos = () => {
    return [...document.querySelectorAll('[data-ouvir], [data-ouvir-lista]')].filter((e) => aparece(e) && !e.parentElement?.closest('[data-ouvir-lista]')).map((e) => {
      if (e.hasAttribute('data-ouvir-lista')) {
        const itens = [...e.children].filter(aparece).map((f) => falavel(f.dataset.ouvir || f.getAttribute('aria-label') || linhasDe(f).join(' '))).filter(Boolean);
        return itens.length ? comPonto(`${e.dataset.ouvirLista || 'Respostas'}: ${itens.join(', ')}`) : '';
      }
      return e.dataset.ouvir ? comPonto(falavel(e.dataset.ouvir)) : linhasDe(e).map(comPonto).join(' ');
    }).filter(Boolean).join(' ');
  };
  const textoDaTela = () => {
    let base = '';
    try {
      base = lerSobre();
      if (!base && registro) { base = registro(); base = (Array.isArray(base) ? base : [base]).map(emFrases).filter(Boolean).join(' '); }
      if (!base) base = lerElementos();
    } catch { base = ''; }
    const bit = bitLido && ultimaFala && ultimaFalaEm >= telaEm - 150 ? emFrases(ultimaFala) : '';
    return [base, bit].filter(Boolean).join(' ');
  };
  const lerTela = () => { const texto = textoDaTela(); return texto ? falar(texto) : false; };

  // Ler sozinho: junta o que aconteceu em meio segundo (pergunta nova e fala do Bit) numa leitura só
  const agendar = (tela) => {
    pendente = { tela: Boolean(pendente?.tela) || tela };
    clearTimeout(relogioAuto);
    relogioAuto = setTimeout(() => {
      const quando = pendente;
      pendente = null;
      if (!sozinho || !quando) return;
      if (quando.tela) lerTela();
      else if (bitLido && ultimaFala) falar(ultimaFala);
    }, 350);
  };
  const novaTela = () => {
    telaEm = performance.now();
    parar();
    if (sozinho) agendar(true);
  };
  const dizBit = (frase) => {
    if (!bitLido || !frase) return;
    ultimaFala = String(frase);
    ultimaFalaEm = performance.now();
    if (sozinho) agendar(Boolean(pendente?.tela));
  };
  // Acompanha o Bit.diz, seja o do bit.js, seja o que a página define em window.Bit, antes ou depois deste arquivo
  const acompanharBit = (bit) => {
    if (!bit || typeof bit.diz !== 'function' || bit.diz.gpOuvir) return;
    const original = bit.diz;
    bit.diz = function (pose, frase, ...resto) {
      try { dizBit(frase); } catch {}
      return original.call(this, pose, frase, ...resto);
    };
    bit.diz.gpOuvir = true;
  };
  try {
    let bitAtual = window.Bit;
    acompanharBit(bitAtual);
    Object.defineProperty(window, 'Bit', { configurable: true, get: () => bitAtual, set: (valor) => { bitAtual = valor; acompanharBit(valor); } });
  } catch {}

  if (sintese) {
    document.addEventListener('visibilitychange', () => { if (document.hidden) parar(); });
    addEventListener('pagehide', parar);
  }

  const alternarSozinho = (valor = !sozinho) => {
    sozinho = Boolean(valor);
    try { localStorage.setItem(CHAVE_LER, sozinho ? '1' : '0'); } catch {}
    avisarOuvir();
    if (sozinho) lerTela();
    else parar();
  };
  const ouvir = {
    get disponivel() { return Boolean(sintese && Enunciado && voz); },
    get falando() { return falando; },
    get sozinho() { return sozinho; },
    get bit() { return bitLido; },
    set bit(valor) { bitLido = Boolean(valor); },
    falar, parar, novaTela, alternarSozinho,
    ler: lerTela,
    texto: textoDaTela,
    textoDaTela(funcao) { registro = typeof funcao === 'function' ? funcao : null; return ouvir; },
    aoMudar(ouvinte) { ouvintesOuvir.add(ouvinte); ouvinte(); },
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
    if (nome === 'ouvir') {
      ouvir.aoMudar(() => {
        elemento.hidden = !ouvir.disponivel;
        pintar(falando ? 'ouvir-parar' : 'ouvir', falando ? 'Parar de ouvir' : 'Ouvir a tela');
      });
      elemento.addEventListener('click', () => (falando ? parar() : lerTela()));
    }
    if (nome === 'ler-sozinho') {
      ouvir.aoMudar(() => {
        elemento.hidden = !ouvir.disponivel;
        pintar(sozinho ? 'ler-sozinho-ligado' : 'ler-sozinho', 'Ler sozinho');
        elemento.setAttribute('aria-pressed', String(sozinho));
      });
      elemento.addEventListener('click', () => alternarSozinho());
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
      // Se o professor pausou, quem volta é o botão Continuar dele
      if (modoProfessor.pausado) return;
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

  // Modo professor: uma barra no canto para escolher a fase, mostrar a resposta e pausar. Só existe quando o jogo
  // registra as funções e o modo está ligado (?professor ou a tecla P)
  let prof = null, profLigado = false, profPausado = false, barra = null, cortina = null, observador = null;
  let destacados = [], bloqueados = [];
  const fasesDaPagina = () => [...document.querySelectorAll('#fases .fase')];
  const faseAtual = () => Math.max(0, fasesDaPagina().findIndex((botao) => botao.getAttribute('aria-pressed') === 'true'));

  const limparDestaque = () => {
    destacados.forEach((elemento) => elemento.classList.remove('gp-resposta'));
    destacados = [];
  };
  const destacar = (...itens) => {
    limparDestaque();
    destacados = itens.flat().filter((elemento) => elemento?.classList);
    destacados.forEach((elemento) => elemento.classList.add('gp-resposta'));
    destacados[0]?.scrollIntoView?.({ block: 'nearest', behavior: reduzido ? 'auto' : 'smooth' });
  };

  const atualizarFases = () => {
    if (!barra) return;
    const total = fasesDaPagina().length, atual = faseAtual();
    barra.querySelector('[data-acao="anterior"]').disabled = atual <= 0;
    barra.querySelector('[data-acao="proxima"]').disabled = atual >= total - 1;
  };
  const irParaFase = (numero) => {
    if (numero < 1 || numero > fasesDaPagina().length) return;
    limparDestaque();
    if (prof.irParaFase) prof.irParaFase(numero);
    else fasesDaPagina()[numero - 1]?.click();
    atualizarFases();
  };
  const pausarAula = () => {
    if (profPausado) return;
    profPausado = true;
    parar();
    limparDestaque();
    document.documentElement.classList.add('gp-pausado');
    prof.pausar?.();
    cortina.hidden = false;
    bloqueados = [...document.body.children].filter((elemento) => elemento !== cortina && !elemento.hasAttribute('inert'));
    bloqueados.forEach((elemento) => elemento.setAttribute('inert', ''));
    cortina.querySelector('button').focus();
  };
  const continuarAula = () => {
    if (!profPausado) return;
    profPausado = false;
    cortina.hidden = true;
    bloqueados.forEach((elemento) => elemento.removeAttribute('inert'));
    bloqueados = [];
    document.documentElement.classList.remove('gp-pausado');
    prof.continuar?.();
  };

  const montarProfessor = () => {
    const acoes = [
      ['anterior', 'prof-anterior', 'Fase anterior', 'A'],
      ['proxima', 'prof-proxima', 'Próxima fase', 'S'],
      ['resposta', 'prof-resposta', 'Mostrar resposta', 'R'],
      ['pausar', 'prof-pausar', 'Pausar', 'E'],
    ];
    barra = Object.assign(document.createElement('div'), { className: 'gp-prof', hidden: true });
    barra.setAttribute('role', 'toolbar');
    barra.setAttribute('aria-label', 'Modo professor');
    barra.innerHTML = '<span class="gp-prof-rotulo">Modo professor</span>';
    for (const [acao, desenho, rotulo, tecla] of acoes) {
      const botao = document.createElement('button');
      botao.type = 'button';
      botao.className = 'gp-prof-botao';
      botao.dataset.acao = acao;
      botao.innerHTML = `${svg(desenho)}<span class="gp-jogo-rotulo">${rotulo}</span>`;
      botao.setAttribute('aria-label', rotulo);
      botao.setAttribute('aria-keyshortcuts', tecla);
      botao.title = `${rotulo} (tecla ${tecla})`;
      barra.append(botao);
    }
    barra.addEventListener('click', (evento) => {
      const acao = evento.target.closest('button')?.dataset.acao;
      if (acao === 'anterior') irParaFase(faseAtual());
      if (acao === 'proxima') irParaFase(faseAtual() + 2);
      if (acao === 'resposta') prof.resposta?.();
      if (acao === 'pausar') pausarAula();
    });
    cortina = Object.assign(document.createElement('div'), { className: 'gp-prof-cortina', hidden: true });
    cortina.setAttribute('role', 'dialog');
    cortina.setAttribute('aria-modal', 'true');
    cortina.setAttribute('aria-labelledby', 'gp-prof-titulo');
    const bit = script ? new URL('../mascote/bit-pensando.svg', script.src).href : '';
    cortina.innerHTML = `<div class="gp-prof-caixa"><img src="${bit}" alt="" width="112" height="112"><h2 id="gp-prof-titulo">Pausado: o professor está explicando</h2><button type="button">${svg('prof-continuar')}<span>Continuar</span></button></div>`;
    cortina.querySelector('button').addEventListener('click', continuarAula);
    document.body.prepend(barra);
    document.body.append(cortina);
    observador = new MutationObserver(atualizarFases);
  };

  const alternarProfessor = (valor = !profLigado) => {
    if (!prof) return;
    valor = Boolean(valor);
    if (valor === profLigado) return;
    if (valor && !barra) {
      if (!document.body) return addEventListener('DOMContentLoaded', () => alternarProfessor(true), { once: true });
      montarProfessor();
    }
    profLigado = valor;
    if (!valor) { continuarAula(); limparDestaque(); }
    barra.hidden = !valor;
    document.documentElement.classList.toggle('gp-modo-professor', valor);
    const lista = document.getElementById('fases');
    if (valor && lista) observador.observe(lista, { attributes: true, attributeFilter: ['aria-pressed'], subtree: true });
    else observador.disconnect();
    if (valor) atualizarFases();
    // O endereço acompanha, para a página recarregada continuar como está
    try {
      const endereco = new URL(location.href);
      if (valor) endereco.searchParams.set('professor', '');
      else endereco.searchParams.delete('professor');
      history.replaceState(history.state, '', endereco.href.replace('professor=', 'professor'));
    } catch {}
  };

  const modoProfessor = (funcoes = {}) => {
    prof = funcoes;
    const pedido = new URLSearchParams(location.search).get('professor');
    if (pedido !== null && !['0', 'nao', 'não', 'false'].includes(pedido.toLowerCase())) alternarProfessor(true);
    return modoProfessor;
  };
  Object.defineProperties(modoProfessor, {
    ligado: { get: () => profLigado },
    pausado: { get: () => profPausado },
  });
  Object.assign(modoProfessor, { alternar: alternarProfessor, destacar });

  // A tecla P liga e desliga; com o modo ligado, A, S, R e E fazem o mesmo que os botões. Em campo de texto e com
  // Ctrl, Alt ou Cmd, nada acontece, e o jogo que não registrou o modo nem percebe a tecla
  addEventListener('keydown', (evento) => {
    if (!prof || evento.repeat || evento.isComposing || evento.metaKey || evento.ctrlKey || evento.altKey) return;
    if (evento.target.closest?.('input, textarea, select, [contenteditable]')) return;
    const tecla = evento.key.toLowerCase();
    if (tecla === 'p') return alternarProfessor();
    if (!profLigado) return;
    if (profPausado) {
      if (tecla === 'e' || tecla === 'escape') { evento.preventDefault(); continuarAula(); }
      return;
    }
    if (tecla === 'a') irParaFase(faseAtual());
    else if (tecla === 's') irParaFase(faseAtual() + 2);
    else if (tecla === 'r') prof.resposta?.();
    else if (tecla === 'e') pausarAula();
  });
  // A marca da resposta sai no próximo toque, menos nos botões do professor
  addEventListener('pointerdown', (evento) => { if (destacados.length && !evento.target.closest?.('.gp-prof')) limparDestaque(); }, true);
  addEventListener('keydown', (evento) => { if (destacados.length && (evento.key === 'Enter' || evento.key === ' ')) limparDestaque(); }, true);

  window.Jogo = { menu, som, progresso, telaCheia, ouvir, botao, contagem, confete, aoSairDaAba, acoesDoFim, modoProfessor };

  // Os objetos de aula no céu do jogo (objetos.js), carregados ao lado deste arquivo
  const objetos = () => {
    if (window.Objetos || !script || !document.querySelector('.cenario, .scenery')) return;
    document.head.append(Object.assign(document.createElement('script'), { src: new URL('objetos.js', script.src).href }));
  };
  if (document.readyState === 'loading') addEventListener('DOMContentLoaded', objetos);
  else objetos();
})();
