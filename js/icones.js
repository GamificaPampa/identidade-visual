/* Ícones desenhados do GamificaPampa, no lugar dos emojis: contorno escuro, cores da paleta e o mesmo traço em todos.

   Icones.svg('trofeu') devolve o <svg> em texto, para pôr dentro do HTML (o tamanho vem do CSS ou do 2º argumento).
   Icones.desenhar(ctx, 'bug', x, y, tamanho) desenha no canvas, com o centro em x e y.
   <script src="/identidade-visual/js/icones.js" data-simbolos></script> no começo do <body> cria um <symbol id="icone-nome"> para cada um.
   Icones.nomes lista todos e Icones.grupos os separa por grupo. A vitrine do identidade-visual mostra cada um com o nome. */
(() => {
  const script = document.currentScript;
  const I = '#2f2a4a';
  const contorno = (largura = 2.2) => `stroke="${I}" stroke-width="${largura}" stroke-linejoin="round" stroke-linecap="round"`;
  const rosto = (cx, cy) => `<circle cx="${cx - 3.2}" cy="${cy}" r="1.4" fill="${I}"/><circle cx="${cx + 3.2}" cy="${cy}" r="1.4" fill="${I}"/><path d="M${cx - 2.6} ${cy + 3.4}q2.6 2.2 5.2 0" fill="none" ${contorno(1.5)}/>`;
  const medalha = (cor, numero) => `<path d="M9 3h5l3 8h-5z" fill="#4da3ff" ${contorno(1.8)}/><path d="M23 3h-5l-3 8h5z" fill="#ff5f8f" ${contorno(1.8)}/><circle cx="16" cy="20" r="8.5" fill="${cor}" ${contorno()}/><text x="16" y="24.2" text-anchor="middle" font-family="Fredoka, Trebuchet MS, sans-serif" font-weight="700" font-size="11" fill="${I}">${numero}</text>`;

  // Os desenhos por grupo, na ordem em que a vitrine mostra
  const grupos = {
    Interface: {
      som: `<path d="M5 12h5l7-6v20l-7-6H5z" fill="#fff" ${contorno(2.4)}/><path d="M21 11.5q3.5 4.5 0 9M24.5 8q7 8 0 16" fill="none" ${contorno(2.4)}/>`,
      mudo: `<path d="M5 12h5l7-6v20l-7-6H5z" fill="#fff" ${contorno(2.4)}/><path d="M21 12l7 8M28 12l-7 8" stroke="#ff5f8f" stroke-width="3" stroke-linecap="round"/>`,
      casa: `<path d="M8 13v13h16V13" fill="#ffd23f" ${contorno(2.4)}/><path d="M5 15 16 5l11 10" fill="none" ${contorno(2.6)}/><rect x="13.5" y="18" width="5" height="8" rx="1" fill="#fff" ${contorno(2)}/>`,
      estrela: `<path d="M16 3.5l3.8 7.9 8.6 1.2-6.3 6 1.6 8.6L16 23.1l-7.7 4.1 1.6-8.6-6.3-6 8.6-1.2z" fill="#ffd23f" ${contorno()}/>`,
      coracao: `<path d="M16 27C7 21 3.5 16.5 3.5 11.5 3.5 7.6 6.5 5 10 5c2.6 0 4.6 1.4 6 3.6C17.4 6.4 19.4 5 22 5c3.5 0 6.5 2.6 6.5 6.5C28.5 16.5 25 21 16 27z" fill="#ff5f8f" ${contorno()}/>`,
      trofeu: `<path d="M9 7H5.5a4 4 0 0 0 4.5 6M23 7h3.5a4 4 0 0 1-4.5 6" fill="none" ${contorno()}/><path d="M9 5h14v6a7 7 0 0 1-14 0z" fill="#ffd23f" ${contorno()}/><path d="M14 18h4v4h-4z" fill="#ffd23f" ${contorno(2)}/><rect x="10" y="22" width="12" height="5" rx="1.5" fill="#ff8a3d" ${contorno()}/>`,
      ouro: medalha('#ffd23f', 1),
      prata: medalha('#d6dbe6', 2),
      bronze: medalha('#e8a774', 3),
      relogio: `<rect x="13" y="3.5" width="6" height="4" rx="1.2" fill="#4fd6a6" ${contorno(2)}/><circle cx="16" cy="18" r="10" fill="#fff" ${contorno(2.4)}/><path d="M16 18v-6M16 18l4 3" fill="none" ${contorno(2.4)}/>`,
      raio: `<path d="M18 3 7 18h7l-2 11 11-15h-7z" fill="#ffd23f" ${contorno()}/>`,
      fogo: `<path d="M16 29c-6 0-9.5-4-9.5-9 0-6 5-8 6-14 3 2 5 5 5 8 1.5-1 2.5-3 2.5-5 3 3 5.5 6.5 5.5 11 0 5-3.5 9-9.5 9z" fill="#ff8a3d" ${contorno()}/><path d="M16 27c-2.6 0-4-1.8-4-4 0-2.6 2.3-3.6 3-6.5 2.5 2 5 4 5 6.6 0 2.2-1.5 3.9-4 3.9z" fill="#ffd23f"/>`,
      broto: `<path d="M16 28V15M9 28h14" fill="none" ${contorno(2.4)}/><path d="M16 16C16 10 12 7 6 7c0 6 4 9 10 9z" fill="#4fd6a6" ${contorno()}/><path d="M16 14c0-5 3-8 9-8 0 5-3 8-9 8z" fill="#8ddf6a" ${contorno()}/>`,
      foguete: `<path d="M9 18l-4 5 5 1M23 18l4 5-5 1" fill="#ff5f8f" ${contorno(2)}/><path d="M13 24c0 3 1.5 4.5 3 6 1.5-1.5 3-3 3-6" fill="#ff8a3d" ${contorno(2)}/><path d="M16 3c5 4 7 9 7 15l-3 5h-8l-3-5c0-6 2-11 7-15z" fill="#fff" ${contorno()}/><circle cx="16" cy="13" r="3" fill="#4da3ff" ${contorno(2)}/>`,
      computador: `<rect x="6" y="6" width="20" height="14" rx="2" fill="#4da3ff" ${contorno()}/><path d="M11 10.5l-2 2.5 2 2.5M21 10.5l2 2.5-2 2.5M17 9.5l-2 7" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 24h26l-2 3H5z" fill="#d6dbe6" ${contorno()}/>`,
      toque: `<path d="M9 6l2 2M23 6l-2 2M16 2.5v3" fill="none" ${contorno(2)}/><path d="M13 17V8.5a2 2 0 0 1 4 0V16l6.5 1.5c1.8.4 2.6 2 2.2 3.8L24.5 28H13.5L8.5 21.5a2 2 0 0 1 3-2.6z" fill="#ffd9b8" ${contorno()}/>`,
      'seta-direita': `<path d="M5 16h19M17 9l7 7-7 7" fill="none" ${contorno(3)}/>`,
      'seta-esquerda': `<path d="M27 16H8M15 9l-7 7 7 7" fill="none" ${contorno(3)}/>`,
      certo: `<circle cx="16" cy="16" r="12" fill="#4fd6a6" ${contorno()}/><path d="M10 16.5l4 4 8-9" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`,
      errado: `<circle cx="16" cy="16" r="12" fill="#ff5f8f" ${contorno()}/><path d="M11 11l10 10M21 11 11 21" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`,
      cadeado: `<rect x="7" y="14" width="18" height="14" rx="3.5" fill="#ff5f8f" ${contorno(2.6)}/><path d="M10.5 14V10a5.5 5.5 0 0 1 11 0v4" fill="none" ${contorno(2.6)}/><circle cx="16" cy="21" r="2.3" fill="${I}"/>`,
      chave: `<path d="M20.5 4.5a7 7 0 0 0-8 9L4.5 21.5a3 3 0 0 0 4.2 4.2l8-8a7 7 0 0 0 9-8l-4 4-4-1-1-4z" fill="#d6dbe6" ${contorno()}/>`,
      lupa: `<circle cx="13" cy="13" r="8" fill="#fff" ${contorno(2.6)}/><path d="M19 19l8 8" ${contorno(3.4)}/>`,
      engrenagem: `<path d="M14 3h4l.7 3.4 2.6 1.1 2.9-1.9 2.8 2.8-1.9 2.9 1.1 2.6L29 14v4l-3.4.7-1.1 2.6 1.9 2.9-2.8 2.8-2.9-1.9-2.6 1.1L18 29h-4l-.7-3.4-2.6-1.1-2.9 1.9-2.8-2.8 1.9-2.9-1.1-2.6L3 18v-4l3.4-.7 1.1-2.6-1.9-2.9 2.8-2.8 2.9 1.9 2.6-1.1z" fill="#d6dbe6" ${contorno(2)}/><circle cx="16" cy="16" r="4" fill="#fff" ${contorno(2)}/>`,
      maleta: `<path d="M12 10V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3" fill="none" ${contorno()}/><rect x="4" y="10" width="24" height="16" rx="3" fill="#ff8a3d" ${contorno()}/><path d="M4 17h24" ${contorno(2)}/>`,
      controle: `<rect x="3" y="10" width="26" height="13" rx="6.5" fill="#a08bff" ${contorno()}/><path d="M9 14v5M6.5 16.5h5" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/><circle cx="21" cy="15" r="1.8" fill="#ffd23f" ${contorno(1.4)}/><circle cx="24.5" cy="18.5" r="1.8" fill="#ff5f8f" ${contorno(1.4)}/>`,
      festa: `<path d="M18 9q2-4 6-3M21 13l6-2M15 6l-1-3" fill="none" ${contorno(2)}/><circle cx="25" cy="17" r="1.6" fill="#ff5f8f"/><circle cx="21" cy="3.5" r="1.6" fill="#4da3ff"/><rect x="26" y="4" width="3" height="3" rx=".6" fill="#4fd6a6"/><path d="M5 27l5-15 10 10z" fill="#ffd23f" ${contorno()}/><path d="M7.5 20l4.5 4.5M9 15.5l7.5 7.5" stroke="#ff5f8f" stroke-width="1.8"/>`,
      celular: `<rect x="9" y="3" width="14" height="26" rx="3" fill="#fff" ${contorno()}/><rect x="11.5" y="6.5" width="9" height="16" rx="1" fill="#cdeeff"/><circle cx="16" cy="25.5" r="1.3" fill="${I}"/>`,
      prancheta: `<rect x="7" y="5" width="18" height="23" rx="2" fill="#fff" ${contorno()}/><rect x="12" y="3" width="8" height="5" rx="1.5" fill="#ffd23f" ${contorno(2)}/><path d="M11 14h10M11 19h10M11 24h6" stroke="#8cc4ff" stroke-width="2.4" stroke-linecap="round"/>`,
      loja: `<rect x="6" y="13" width="20" height="14" fill="#fff" ${contorno()}/><rect x="13" y="19" width="6" height="8" fill="#4da3ff" ${contorno(1.8)}/><path d="M4 12l2-6h20l2 6q-3 3-6 0-3 3-6 0-3 3-6 0-3 3-6 0z" fill="#ff5f8f" ${contorno(2)}/>`,
      repetir: `<path d="M7.5 14a8.5 8.5 0 0 1 15-5.5l1.5 2M24.5 18a8.5 8.5 0 0 1-15 5.5l-1.5-2" fill="none" ${contorno(2.6)}/><path d="M25 5v6h-6M7 27v-6h6" fill="none" ${contorno(2.6)}/>`,
      'tela-cheia': `<rect x="9" y="9" width="14" height="14" rx="2" fill="#cdeeff" ${contorno(2)}/><path d="M4 11V4h7M21 4h7v7M28 21v7h-7M11 28H4v-7" fill="none" ${contorno(3)}/>`,
      qr: `<rect x="4" y="4" width="10" height="10" rx="1.5" fill="#fff" ${contorno(2.2)}/><rect x="18" y="4" width="10" height="10" rx="1.5" fill="#fff" ${contorno(2.2)}/><rect x="4" y="18" width="10" height="10" rx="1.5" fill="#fff" ${contorno(2.2)}/><path d="M7.5 7.5h3v3h-3zM21.5 7.5h3v3h-3zM7.5 21.5h3v3h-3zM18 18h4v4h-4zM24 24h4v4h-4zM24 18h4v3h-4zM18 25h3v3h-3z" fill="${I}"/>`,
      pausa: `<circle cx="16" cy="16" r="12" fill="#ffd23f" ${contorno()}/><path d="M13 11v10M19 11v10" fill="none" ${contorno(3.2)}/>`,
      play: `<path d="M10 6l15 10-15 10z" fill="#4fd6a6" ${contorno()}/>`,
      nota: `<path d="M13 22V7l12-3v15" fill="none" ${contorno(2.4)}/><ellipse cx="10" cy="22.5" rx="3.8" ry="3" fill="#a08bff" ${contorno(2)}/><ellipse cx="22" cy="19.5" rx="3.8" ry="3" fill="#a08bff" ${contorno(2)}/>`,
      vento: `<path d="M4 12h15a4 4 0 1 0-4-4M4 18h20a4 4 0 1 1-4 4M4 24h9" fill="none" ${contorno(2.4)}/>`,
      explosao: `<path d="M16 2l3 7.5 7.5-3-3.5 7.5 6.5 4-7.5 1.5 2 7.5-7-4.5-5.5 6v-7.5L4 20l5.5-5L5 8l7.5 2z" fill="#ff8a3d" ${contorno(2)}/><path d="M16 10l1.8 4.6 4.4-1.4-2.4 4 3.6 2.8-4.6.4.2 4.6-3-3.4-3.2 2.8.2-4.6-4.2-1.4 3.8-2.4-1.8-4.2 4.2 1.4z" fill="#ffd23f"/>`,
    },
    // Os jogos: bug, glitch, arquivo, poderes e peças
    Jogos: {
      bug: `<path d="M9 13 4 10M8 18H3M9 23l-4 3M23 13l5-3M24 18h5M23 23l4 3M13 7l-2-3.5M19 7l2-3.5" fill="none" ${contorno(2)}/><ellipse cx="16" cy="19" rx="8.5" ry="9" fill="#ff4d4d" ${contorno()}/><path d="M16 11v16.5" stroke="#b52a2a" stroke-width="1.6"/><circle cx="12.5" cy="19" r="1.6" fill="#b52a2a"/><circle cx="19.5" cy="22" r="1.8" fill="#b52a2a"/><circle cx="16" cy="10" r="5" fill="${I}"/><circle cx="14" cy="9.5" r="1.6" fill="#fff"/><circle cx="18" cy="9.5" r="1.6" fill="#fff"/>`,
      glitch: `<path d="M11 7 9 4M21 7l2-3" fill="none" ${contorno(2)}/><path d="M7 9h18v12h-3v5h-3.5v-5h-5v5H10v-5H7z" fill="#a08bff" ${contorno()}/><rect x="10.5" y="12" width="4" height="4" fill="#fff"/><rect x="17.5" y="12" width="4" height="4" fill="#fff"/><rect x="12" y="13.5" width="2" height="2" fill="${I}"/><rect x="19" y="13.5" width="2" height="2" fill="${I}"/>`,
      disquete: `<path d="M6 5h16l4 4v17a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" fill="#4da3ff" ${contorno()}/><rect x="10" y="5" width="10" height="7" fill="#fff" ${contorno(1.8)}/><rect x="9" y="17" width="14" height="10" rx="1" fill="#fff" ${contorno(1.8)}/>`,
      cafe: `<path d="M12 3.5q-2 2 0 4M16 3.5q-2 2 0 4" fill="none" ${contorno(1.8)}/><path d="M22 14h2a3 3 0 0 1 0 6h-2.5" fill="none" ${contorno()}/><path d="M6 11h16v8a7 7 0 0 1-7 7h-2a7 7 0 0 1-7-7z" fill="#fff" ${contorno()}/><path d="M7.5 15h13" stroke="#b97a4f" stroke-width="3"/>`,
      escudo: `<path d="M16 3l10 4v8c0 7-4.5 11-10 14C10.5 26 6 22 6 15V7z" fill="#4fd6a6" ${contorno()}/><path d="M11 16l4 4 6-7" fill="none" stroke="#fff" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>`,
      teste: `<path d="M13 14h6v7a3 3 0 0 1-6 0z" fill="#4fd6a6"/><path d="M11 3h10M13 3v18a3 3 0 0 0 6 0V3" fill="none" ${contorno()}/><path d="M13 14h6" ${contorno(1.6)}/>`,
      peca: `<path d="M5 9h6a3 3 0 1 1 6 0h6v6a3 3 0 1 0 0 6v6H5z" fill="#ffd23f" ${contorno()}/>`,
      espada: `<path d="M27 5l-.5 4.5L14 22l-4-4L22.5 5.5z" fill="#fff" ${contorno()}/><path d="M8 15l9 9" ${contorno(3)}/><path d="M10.5 21.5l-5 5" stroke="#a08bff" stroke-width="4" stroke-linecap="round"/><path d="M10.5 21.5l-5 5" fill="none" ${contorno(1.4)}/>`,
      esteira: `<rect x="9" y="7" width="14" height="11" rx="2" fill="#ff8a3d" ${contorno()}/><path d="M16 7v4" ${contorno(1.8)}/><rect x="3" y="19" width="26" height="7" rx="3.5" fill="#d6dbe6" ${contorno()}/><circle cx="8" cy="22.5" r="1.5" fill="${I}"/><circle cx="16" cy="22.5" r="1.5" fill="${I}"/><circle cx="24" cy="22.5" r="1.5" fill="${I}"/>`,
      bit: `<path d="M16 4v5" ${contorno(2)}/><circle cx="16" cy="4" r="2.4" fill="#ff4d4d" ${contorno(1.4)}/><rect x="5" y="9" width="22" height="16" rx="5" fill="#4da3ff" ${contorno()}/><circle cx="12" cy="16" r="3" fill="#fff"/><circle cx="20" cy="16" r="3" fill="#fff"/><circle cx="12.7" cy="16.4" r="1.4" fill="${I}"/><circle cx="20.7" cy="16.4" r="1.4" fill="${I}"/><path d="M13 21q3 2.4 6 0" fill="none" ${contorno(1.6)}/><rect x="10" y="25" width="12" height="5" rx="2" fill="#8cc4ff" ${contorno(2)}/>`,
    },
    // O app da escola no Caça aos Bugs
    'App da escola': {
      mochila: `<path d="M12 8V6a4 4 0 0 1 8 0v2" fill="none" ${contorno()}/><rect x="7" y="8" width="18" height="20" rx="5" fill="#ff5f8f" ${contorno()}/><rect x="11" y="17" width="10" height="7" rx="2" fill="#ffd23f" ${contorno(1.8)}/>`,
      livros: `<rect x="5" y="20" width="22" height="6" rx="1.5" fill="#4da3ff" ${contorno(2)}/><rect x="7" y="14" width="19" height="6" rx="1.5" fill="#ffd23f" ${contorno(2)}/><rect x="5" y="8" width="20" height="6" rx="1.5" fill="#4fd6a6" ${contorno(2)}/>`,
      prato: `<path d="M8 16q1.5-6 3.5 0 2-6 3.5 0 2-6 3.5 0 2-6 3.5 0 1.5-5 3 0" fill="#ffd23f" ${contorno(1.8)}/><circle cx="13" cy="12" r="2" fill="#ff4d4d" ${contorno(1.4)}/><path d="M4 16h24a12 10 0 0 1-24 0z" fill="#fff" ${contorno()}/>`,
      bola: `<circle cx="16" cy="16" r="12" fill="#fff" ${contorno()}/><path d="M16 10l5 3.6-1.9 5.9h-6.2L11 13.6z" fill="${I}"/><path d="M16 4v6M21 13.6l6.3-1.8M19.1 19.5l3.4 5.4M12.9 19.5l-3.4 5.4M11 13.6l-6.3-1.8" fill="none" ${contorno(1.8)}/>`,
      balao: `<path d="M5 6h22a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H14l-6 5v-5H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" fill="#fff" ${contorno()}/><circle cx="11" cy="14" r="1.6" fill="${I}"/><circle cx="16" cy="14" r="1.6" fill="${I}"/><circle cx="21" cy="14" r="1.6" fill="${I}"/>`,
      menu: `<path d="M6 9h20M6 16h20M6 23h20" ${contorno(3)}/>`,
    },
    // Bichos da Esteira de Testes (e o Bolinha, a foto do dia do Caça aos Bugs)
    Bichos: {
      gato: `<path d="M7 12 8 4l6 5M25 12l-1-8-6 5" fill="#ffb35c" ${contorno(2)}/><circle cx="16" cy="18" r="11" fill="#ffb35c" ${contorno()}/><circle cx="12" cy="17" r="1.8" fill="${I}"/><circle cx="20" cy="17" r="1.8" fill="${I}"/><path d="M14.5 21h3l-1.5 1.6z" fill="#ff8fb0" ${contorno(1)}/><path d="M16 22.6q-2 2-4 1M16 22.6q2 2 4 1M4 18.5h6M4.5 22l5.5-1.5M28 18.5h-6M27.5 22l-5.5-1.5" fill="none" ${contorno(1.3)}/>`,
      cachorro: `<ellipse cx="16" cy="18" rx="10" ry="10" fill="#d9a066" ${contorno()}/><path d="M8 9q-5 6-1 13 4-2 4-9zM24 9q5 6 1 13-4-2-4-9z" fill="#8a5a3b" ${contorno(2)}/><circle cx="12.5" cy="16" r="1.8" fill="${I}"/><circle cx="19.5" cy="16" r="1.8" fill="${I}"/><ellipse cx="16" cy="21" rx="3" ry="2.2" fill="${I}"/><path d="M16 23v2" ${contorno(1.5)}/>`,
      sapo: `<ellipse cx="16" cy="19" rx="12" ry="9" fill="#8ddf6a" ${contorno()}/><circle cx="10.5" cy="10.5" r="4.5" fill="#8ddf6a" ${contorno(2)}/><circle cx="21.5" cy="10.5" r="4.5" fill="#8ddf6a" ${contorno(2)}/><circle cx="10.5" cy="10.5" r="2" fill="${I}"/><circle cx="21.5" cy="10.5" r="2" fill="${I}"/><path d="M10 21q6 5 12 0" fill="none" ${contorno(2)}/>`,
      raposa: `<path d="M5 6l6 6h10l6-6-2 11-9 11-9-11z" fill="#ff8a3d" ${contorno()}/><path d="M9 18.5l7 9.5 7-9.5-7 2z" fill="#fff"/><circle cx="12" cy="16" r="1.6" fill="${I}"/><circle cx="20" cy="16" r="1.6" fill="${I}"/><circle cx="16" cy="25.5" r="1.6" fill="${I}"/>`,
      panda: `<circle cx="8" cy="9" r="4" fill="${I}"/><circle cx="24" cy="9" r="4" fill="${I}"/><circle cx="16" cy="18" r="11" fill="#fff" ${contorno()}/><ellipse cx="11.5" cy="17" rx="3" ry="3.8" fill="${I}"/><ellipse cx="20.5" cy="17" rx="3" ry="3.8" fill="${I}"/><circle cx="12" cy="16.5" r="1.1" fill="#fff"/><circle cx="20" cy="16.5" r="1.1" fill="#fff"/><ellipse cx="16" cy="22" rx="2" ry="1.4" fill="${I}"/>`,
      polvo: `<g fill="none" stroke-linecap="round"><path d="M10 17q-3 6-7 6M13.5 19q0 6-4 8M18.5 19q0 6 4 8M22 17q3 6 7 6" stroke="${I}" stroke-width="5.2"/><path d="M10 17q-3 6-7 6M13.5 19q0 6-4 8M18.5 19q0 6 4 8M22 17q3 6 7 6" stroke="#a08bff" stroke-width="2.4"/></g><ellipse cx="16" cy="12.5" rx="9.5" ry="9" fill="#a08bff" ${contorno()}/><circle cx="12.5" cy="12" r="1.8" fill="${I}"/><circle cx="19.5" cy="12" r="1.8" fill="${I}"/><path d="M13.5 16q2.5 2 5 0" fill="none" ${contorno(1.6)}/>`,
    },
    // Clientes da Esteira de Testes
    Pessoas: {
      menina: `<circle cx="6.5" cy="15" r="4" fill="#6b3e26" ${contorno(1.8)}/><circle cx="25.5" cy="15" r="4" fill="#6b3e26" ${contorno(1.8)}/><circle cx="16" cy="17" r="10" fill="#ffd9b8" ${contorno()}/><path d="M6.4 15.5a9.6 9.6 0 0 1 19.2 0q-6-5.5-19.2 0z" fill="#6b3e26"/>${rosto(16, 18)}`,
      menino: `<circle cx="16" cy="17" r="10" fill="#e8b48a" ${contorno()}/><path d="M6.4 15q1.6-9 9.6-9t9.6 9q-5-4.5-19.2 0z" fill="#e07a2f" ${contorno(1.8)}/>${rosto(16, 18)}`,
      astronauta: `<circle cx="16" cy="16" r="12" fill="#fff" ${contorno()}/><rect x="8" y="10" width="16" height="11" rx="5.5" fill="#4da3ff" ${contorno(2)}/><path d="M11 13q2-1.5 4-.5" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/><rect x="12" y="25" width="8" height="3" rx="1" fill="#ff5f8f" ${contorno(1.4)}/>`,
      vovo: `<circle cx="16" cy="6" r="3.5" fill="#d6dbe6" ${contorno(1.8)}/><circle cx="16" cy="17" r="10" fill="#ffd9b8" ${contorno()}/><path d="M6.4 15.5a9.6 9.6 0 0 1 19.2 0q-9.6-5-19.2 0z" fill="#d6dbe6"/><circle cx="12.8" cy="18" r="2.6" fill="none" ${contorno(1.4)}/><circle cx="19.2" cy="18" r="2.6" fill="none" ${contorno(1.4)}/><path d="M15.4 18h1.2" ${contorno(1.4)}/><circle cx="12.8" cy="18" r="1" fill="${I}"/><circle cx="19.2" cy="18" r="1" fill="${I}"/><path d="M13.4 22.5q2.6 2 5.2 0" fill="none" ${contorno(1.5)}/>`,
      chef: `<path d="M9 12a4 4 0 0 1 2-7 5 5 0 0 1 10 0 4 4 0 0 1 2 7v2H9z" fill="#fff" ${contorno(2)}/><circle cx="16" cy="21" r="8.5" fill="#c98d6a" ${contorno()}/>${rosto(16, 21)}`,
      mago: `<circle cx="16" cy="21" r="8.5" fill="#ffd9b8" ${contorno()}/><path d="M10 23.5q6 9 12 0z" fill="#fff" ${contorno(1.6)}/><circle cx="12.8" cy="19.5" r="1.4" fill="${I}"/><circle cx="19.2" cy="19.5" r="1.4" fill="${I}"/><path d="M16 2 8.5 14h15z" fill="#a08bff" ${contorno(2)}/><path d="M6 14h20" ${contorno(2.4)}/><path d="M16 6.5l.9 1.8 2 .3-1.5 1.4.4 2-1.8-1-1.8 1 .4-2-1.5-1.4 2-.3z" fill="#ffd23f"/>`,
    },
    // Os sistemas que aparecem nos desenhos da aula: o celular com o app, o servidor e o banco de dados
    Sistemas: {
      app: `<rect x="8.3" y="1.9" width="15.4" height="28.2" rx="3.2" fill="#fff" ${contorno()}/><rect x="10.6" y="5.1" width="10.9" height="18.6" rx="1.3" fill="#8cc4ff"/><circle cx="18.2" cy="9.6" r="2.2" fill="#ffd23f"/><path d="M10.6 23.7v-5.1q2.8-3.9 5.4-.7 2.6-2.5 5.4.7v5.1z" fill="#4fd6a6"/><circle cx="16" cy="26.9" r="1.3" fill="${I}"/>`,
      servidor: `<rect x="5.8" y="2.6" width="20.4" height="26.8" rx="3.2" fill="#ff8a3d" ${contorno()}/><rect x="9" y="6.4" width="14" height="4.8" rx="1.3" fill="#fff" ${contorno(1.8)}/><rect x="9" y="13.8" width="14" height="4.8" rx="1.3" fill="#fff" ${contorno(1.8)}/><rect x="9" y="21.1" width="14" height="4.8" rx="1.3" fill="#fff" ${contorno(1.8)}/><circle cx="19.8" cy="8.8" r="1.3" fill="#4fd6a6"/><circle cx="19.8" cy="16.2" r="1.3" fill="#4fd6a6"/><circle cx="19.8" cy="23.5" r="1.3" fill="#4fd6a6"/>`,
      'banco-de-dados': `<path d="M6.4 7v18a9.6 3.8 0 0 0 19.2 0V7" fill="#ffd23f" ${contorno()}/><path d="M6.4 13.1a9.6 3.8 0 0 0 19.2 0M6.4 19.2a9.6 3.8 0 0 0 19.2 0" fill="none" ${contorno(1.8)}/><ellipse cx="16" cy="7" rx="9.6" ry="3.8" fill="#fff1a6" ${contorno()}/>`,
    },
    // Os tipos de material do Construtor e da Biblioteca de prompts
    Materiais: {
      atividade: `<g transform="scale(.5)"><rect x="8" y="6" width="38" height="52" rx="5" fill="#fff" stroke="${I}" stroke-width="4"/><path d="M16 19 H38 M16 28 H38 M16 37 H30" stroke="#8cc4ff" stroke-width="4" stroke-linecap="round"/><g transform="rotate(32 48 36)"><rect x="43" y="14" width="11" height="34" rx="2" fill="#ffd23f" stroke="${I}" stroke-width="3"/><path d="M43 48 L48.5 59 L54 48 Z" fill="#ffe1b0" stroke="${I}" stroke-width="3" stroke-linejoin="round"/><rect x="43" y="9" width="11" height="7" rx="2" fill="#ff5f8f" stroke="${I}" stroke-width="3"/></g></g>`,
      jogo: `<g transform="scale(.5)"><rect x="4" y="18" width="56" height="30" rx="15" fill="#8c73ff" stroke="${I}" stroke-width="4"/><path d="M18 26 V40 M11 33 H25" stroke="#fff" stroke-width="5" stroke-linecap="round"/><circle cx="42" cy="28" r="4.5" fill="#ffd23f" stroke="${I}" stroke-width="2.5"/><circle cx="50" cy="37" r="4.5" fill="#ff5f8f" stroke="${I}" stroke-width="2.5"/></g>`,
      historia: `<g transform="scale(.5)"><path d="M32 16 Q20 8 6 12 V52 Q20 48 32 56 Q44 48 58 52 V12 Q44 8 32 16 Z" fill="#fff" stroke="${I}" stroke-width="4" stroke-linejoin="round"/><path d="M32 16 V56" stroke="${I}" stroke-width="3"/><path d="M12 24 Q19 22 26 25 M12 33 Q19 31 26 34 M38 25 Q45 22 52 24 M38 34 Q45 31 52 33" stroke="#ff5f8f" stroke-width="3" fill="none" stroke-linecap="round"/></g>`,
      plano: `<g transform="scale(.5)"><rect x="12" y="10" width="40" height="50" rx="5" fill="#fff" stroke="${I}" stroke-width="4"/><rect x="22" y="4" width="20" height="11" rx="3" fill="#ffd23f" stroke="${I}" stroke-width="3"/><path d="M19 27 l4 4 l7 -8 M19 43 l4 4 l7 -8" stroke="#4fd6a6" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M35 28 H45 M35 44 H45" stroke="#8cc4ff" stroke-width="4" stroke-linecap="round"/></g>`,
      quiz: `<g transform="scale(.5)"><path d="M6 10 H58 V42 H30 L17 55 V42 H6 Z" fill="#ff8a3d" stroke="${I}" stroke-width="4" stroke-linejoin="round"/><text x="32" y="36" text-anchor="middle" font-size="28" font-weight="700" fill="#fff" stroke="${I}" stroke-width="5" paint-order="stroke">?</text></g>`,
      adaptar: `<g transform="scale(.5)"><path d="M8 20 H24 A7 7 0 1 1 38 20 H54 V34 A7 7 0 1 0 54 48 V58 H8 V46 A7 7 0 1 0 8 32 Z" fill="#4fd6a6" stroke="${I}" stroke-width="4" stroke-linejoin="round"/></g>`,
      brincadeira: `<g transform="scale(.5)"><path d="M34 58 H62" stroke="${I}" stroke-width="4" stroke-linecap="round"/><path d="M38 57 L48 14 L58 57 Z" fill="#ff8a3d" stroke="${I}" stroke-width="4" stroke-linejoin="round"/><path d="M43 39 H53" stroke="#fff" stroke-width="5"/><circle cx="20" cy="42" r="14" fill="#4da3ff" stroke="${I}" stroke-width="4"/><path d="M9 38 Q20 46 31 38 M17 29 Q24 42 18 55" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/></g>`,
      revisar: `<g transform="scale(.5)"><rect x="6" y="6" width="36" height="48" rx="5" fill="#fff" stroke="${I}" stroke-width="4"/><path d="M13 18 H35 M13 27 H28 M13 36 H22" stroke="#8cc4ff" stroke-width="4" stroke-linecap="round"/><path d="M48 48 L58 58" stroke="${I}" stroke-width="7" stroke-linecap="round"/><circle cx="40" cy="40" r="12" fill="#fff1a8" stroke="${I}" stroke-width="4"/><path d="M33 41 q3.5 -4 7 0 t7 0" stroke="#ff5f8f" stroke-width="3" fill="none" stroke-linecap="round"/></g>`,
      familias: `<g transform="scale(.5)"><rect x="5" y="14" width="54" height="38" rx="5" fill="#fff" stroke="${I}" stroke-width="4" stroke-linejoin="round"/><path d="M7 17 L32 36 L57 17" fill="none" stroke="${I}" stroke-width="4" stroke-linejoin="round"/><path transform="translate(39 33) scale(.75)" d="M12 21 C12 21 3 14.5 3 8.5 A4.5 4.5 0 0 1 12 6.5 A4.5 4.5 0 0 1 21 8.5 C21 14.5 12 21 12 21 Z" fill="#ff5f8f" stroke="${I}" stroke-width="3.5" stroke-linejoin="round"/></g>`,
    },
  };
  const desenhos = Object.assign({}, ...Object.values(grupos));

  const completo = (nome) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">${desenhos[nome] || ''}</svg>`;
  const imagens = {};

  window.Icones = {
    nomes: Object.keys(desenhos),
    grupos: Object.fromEntries(Object.entries(grupos).map(([grupo, lista]) => [grupo, Object.keys(lista)])),
    svg(nome, tamanho, classe = 'icone') {
      const medida = tamanho ? ` width="${tamanho}" height="${tamanho}"` : '';
      return `<svg class="${classe}"${medida} viewBox="0 0 32 32" aria-hidden="true" focusable="false">${desenhos[nome] || ''}</svg>`;
    },
    imagem(nome) {
      if (!imagens[nome]) {
        imagens[nome] = new Image();
        imagens[nome].src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(completo(nome));
      }
      return imagens[nome];
    },
    // Desenha no canvas com o centro em x e y. Enquanto a imagem carrega, o quadro sai sem o ícone
    desenhar(ctx, nome, x, y, tamanho) {
      const imagem = this.imagem(nome);
      if (imagem.complete && imagem.naturalWidth) ctx.drawImage(imagem, x - tamanho / 2, y - tamanho / 2, tamanho, tamanho);
    },
  };
  Object.keys(desenhos).forEach((nome) => window.Icones.imagem(nome));

  // Com data-simbolos no <script>, cada ícone vira também um <symbol id="icone-nome">, para usar direto no HTML,
  // até dentro de um desenho maior: <svg><use href="#icone-estrela"/></svg>. Ponha o <script> logo no começo do <body>
  if (script && 'simbolos' in script.dataset) {
    const simbolos = Object.entries(desenhos).map(([nome, desenho]) => `<symbol id="icone-${nome}" viewBox="0 0 32 32">${desenho}</symbol>`).join('');
    const por = () => document.body.insertAdjacentHTML('afterbegin', `<svg width="0" height="0" style="position: absolute" aria-hidden="true">${simbolos}</svg>`);
    if (document.body) por(); else document.addEventListener('DOMContentLoaded', por);
  }
})();
