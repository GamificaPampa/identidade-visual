/* O site lembra: guarda no aparelho as escolhas que o professor faz numa página (turma, matéria, filtros, quantidades)
   e devolve na próxima visita. Nada sai do aparelho. Nunca guarde aqui nome ou dado de criança.

   <script src="/identidade-visual/js/lembrar.js"></script>

   Lembrar.ler('maquina', {})           o que foi guardado com essa chave, ou o padrão
   Lembrar.guardar('maquina', dados)    guarda (qualquer valor que vire JSON)
   Lembrar.campos('certificado', [escola, apresentador])   devolve os valores aos campos e guarda a cada mudança
   Lembrar.botaoEsquecer(lugar)         põe depois de "lugar" o botão que apaga tudo o que o site lembra neste aparelho */
(() => {
  const PREFIXO = 'gp-lembrar:';
  const ler = (chave, padrao = null) => {
    try {
      const texto = localStorage.getItem(PREFIXO + chave);
      return texto === null ? padrao : JSON.parse(texto);
    } catch { return padrao; }
  };
  const guardar = (chave, dados) => {
    try { localStorage.setItem(PREFIXO + chave, JSON.stringify(dados)); } catch {}
  };

  // Cada campo é lembrado pelo id, ou pelo nome e valor no caso de caixas de marcar e opções
  const nomeDo = (campo) => ((campo.type === 'radio' || campo.type === 'checkbox') && campo.name ? `${campo.name}=${campo.value}` : campo.id || campo.name);
  const campos = (chave, lista) => {
    const elementos = [...lista].filter((campo) => nomeDo(campo));
    const salvo = ler(chave, {});
    elementos.forEach((campo) => {
      const nome = nomeDo(campo);
      if (!(nome in salvo)) return;
      if (campo.type === 'radio' || campo.type === 'checkbox') campo.checked = Boolean(salvo[nome]);
      else if (campo.tagName !== 'SELECT' || [...campo.options].some((opcao) => opcao.value === salvo[nome])) campo.value = salvo[nome];
    });
    const anotar = () => guardar(chave, Object.fromEntries(elementos.map((campo) => [nomeDo(campo), campo.type === 'radio' || campo.type === 'checkbox' ? campo.checked : campo.value])));
    elementos.forEach((campo) => { campo.addEventListener('change', anotar); campo.addEventListener('input', anotar); });
    return { anotar };
  };

  const esquecer = () => {
    try {
      Object.keys(localStorage).filter((chave) => chave.startsWith(PREFIXO)).forEach((chave) => localStorage.removeItem(chave));
    } catch {}
  };

  const estilo = document.createElement('style');
  estilo.textContent = `
    .gp-esquecer { display: inline-flex; align-items: center; min-height: 44px; margin: 8px 0; padding: 0 4px; background: none; border: 0; color: #5d5880; font: 600 15px "Fredoka", "Trebuchet MS", sans-serif; text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 3px; cursor: pointer; }
    .gp-esquecer:focus-visible { outline: 4px solid #ff5f8f; outline-offset: 2px; }
    @media print { .gp-esquecer { display: none; } }
  `;
  document.head.append(estilo);

  const botaoEsquecer = (lugar) => {
    const botao = Object.assign(document.createElement('button'), { type: 'button', className: 'gp-esquecer', textContent: 'Esquecer as escolhas neste aparelho' });
    botao.addEventListener('click', () => {
      esquecer();
      location.reload();
    });
    lugar.after(botao);
    return botao;
  };

  window.Lembrar = { ler, guardar, campos, esquecer, botaoEsquecer };
})();
