/* Passaporte da Oficina: cada ferramenta da Oficina que o professor abre ganha um carimbo de Visto, com a data.
   Fica só neste aparelho (nada é enviado), junto com as outras escolhas lembradas: o Esquecer as escolhas apaga também.
   A página Meu passaporte (recursos-pedagogicos/professores/passaporte/) mostra os carimbos.

   A barra do topo (barra.js) carrega este arquivo sozinha. Numa página sem a barra:
   <script src="/identidade-visual/js/passaporte.js" defer></script>

   Passaporte.CARIMBOS        a lista: id, nome, frase, ícone, endereço e o padrão do endereço que dá o carimbo
                              (as conquistas, com conquista: true, vêm de Passaporte.marcar na própria ferramenta)
   Passaporte.ler()           { id: 'AAAA-MM-DD' } dos carimbos já ganhos
   Passaporte.marcar(id)      dá um carimbo (para uma conquista que não é só abrir a página)
   Passaporte.esquecer()      apaga todos

   Carimbo novo: uma linha em CARIMBOS. O endereço é o caminho publicado (gamificapampa.github.io/...). */
(() => {
  if (window.Passaporte) return;
  const CHAVE = 'gp-lembrar:passaporte';
  const RP = '/recursos-pedagogicos/professores/';
  const CARIMBOS = [
    { id: 'oficina', nome: 'Oficina de Prompts', frase: 'O começo: o que é um bom prompt.', icone: 'bit', href: RP + 'oficina-prompts/', padrao: /\/oficina-prompts\/(index\.html)?$/ },
    { id: 'jogo-do-prompt', nome: 'Jogo do Prompt', frase: 'Montar o pedido com as quatro peças.', icone: 'controle', href: RP + 'oficina-prompts/jogo.html', padrao: /\/oficina-prompts\/jogo\.html$/ },
    { id: 'maquina', nome: 'Máquina de prompts', frase: 'Escolher a turma e sair com o prompt pronto.', icone: 'engrenagem', href: '/maquina/', padrao: /^\/maquina\/(index\.html)?$/ },
    { id: 'raio-x', nome: 'Raio-X do prompt', frase: 'Ver o que falta num prompt antes de mandar.', icone: 'lupa', href: RP + 'oficina-prompts/raio-x.html', padrao: /\/oficina-prompts\/raio-x\.html$/ },
    { id: 'conferir', nome: 'Conferir a resposta', frase: 'Achar os erros no que a IA devolveu.', icone: 'certo', href: RP + 'oficina-prompts/conferir.html', padrao: /\/oficina-prompts\/conferir\.html$/ },
    { id: 'quiz', nome: 'Quiz na hora', frase: 'Transformar perguntas num jogo de quiz.', icone: 'quiz', href: RP + 'oficina-prompts/quiz.html', padrao: /\/oficina-prompts\/quiz\.html$/ },
    { id: 'biblioteca', nome: 'Biblioteca de prompts', frase: 'Prompts de partida por etapa e matéria.', icone: 'livros', href: RP + 'oficina-prompts/biblioteca.html', padrao: /\/oficina-prompts\/biblioteca\.html$/ },
    { id: 'assistentes', nome: 'Assistentes do Bit', frase: 'Um assistente pronto num Projeto do ChatGPT.', icone: 'balao', href: RP + 'oficina-prompts/gems.html', padrao: /\/oficina-prompts\/gems\.html$/ },
    { id: 'curso', nome: 'Curso online', frase: 'Os quatro módulos, no seu tempo.', icone: 'trofeu', href: RP + 'oficina-prompts/curso.html', padrao: /\/oficina-prompts\/curso\.html$/ },
    { id: 'publicar', nome: 'Publicar meu jogo', frase: 'O jogo da IA vira link e QR para a turma.', icone: 'foguete', href: '/publicador/', padrao: /^\/publicador\/(index\.html)?$/ },
    { id: 'turma', nome: 'Jogos para a turma', frase: 'Os jogos prontos, para o projetor ou o celular.', icone: 'jogo', href: '/turma/', padrao: /^\/turma\/(index\.html)?$/ },
    { id: 'imprimir', nome: 'Tudo para imprimir', frase: 'Os papéis da aula, com o número de folhas.', icone: 'prancheta', href: RP + 'imprimir/', padrao: /\/professores\/imprimir\/(index\.html)?$/ },
    // Conquistas: não basta abrir a página, a ferramenta dá o carimbo quando a pessoa faz a coisa (Passaporte.marcar)
    { id: 'copiou-prompt', conquista: true, nome: 'Primeiro prompt pronto', frase: 'Copiar um prompt montado na Máquina.', icone: 'estrela', href: '/maquina/' },
    { id: 'raio-x-feito', conquista: true, nome: 'Prompt no Raio-X', frase: 'Passar um prompt seu pelo Raio-X.', icone: 'lupa', href: RP + 'oficina-prompts/raio-x.html' },
    { id: 'publicou', conquista: true, nome: 'Jogo no ar', frase: 'Publicar um jogo e ganhar o link e o QR.', icone: 'foguete', href: '/publicador/' },
  ];

  const ler = () => {
    try {
      const valor = JSON.parse(localStorage.getItem(CHAVE) || '{}');
      return valor && typeof valor === 'object' && !Array.isArray(valor) ? valor : {};
    } catch { return {}; }
  };
  const marcar = (id) => {
    const carimbos = ler();
    if (carimbos[id] || !CARIMBOS.some((c) => c.id === id)) return false;
    const hoje = new Date();
    carimbos[id] = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}-${String(hoje.getDate()).padStart(2, '0')}`;
    try { localStorage.setItem(CHAVE, JSON.stringify(carimbos)); } catch { return false; }
    return true;
  };
  const esquecer = () => { try { localStorage.removeItem(CHAVE); } catch {} };

  // Abrir a página já vale o carimbo dela. No kit sem internet o caminho é outro e nada é marcado
  const caminho = location.pathname;
  CARIMBOS.forEach((c) => { if (c.padrao && c.padrao.test(caminho)) marcar(c.id); });

  window.Passaporte = { CARIMBOS, ler, marcar, esquecer };
})();
