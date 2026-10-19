# Identidade visual

Logos, mascote, fonte, cores, cenário, animações e ícones do GamificaPampa. O site do hub e os recursos pedagógicos carregam estes arquivos pelo caminho `/identidade-visual/`, publicado pelo GitHub Pages.

A página [gamificapampa.github.io/identidade-visual](https://gamificapampa.github.io/identidade-visual/) mostra tudo funcionando, com o código para copiar. Quando algo mudar aqui, mude também nela ([index.html](index.html)).

| Pasta                            | Conteúdo                                                                                           |
| -------------------------------- | -------------------------------------------------------------------------------------------------- |
| [logos](logos)                   | Logo horizontal, ícone, ícone invertido e avatar da org no GitHub                                  |
| [mascote](mascote)               | Bit, o robô que aparece no site, nos jogos e nos slides, com uma pose para cada momento (veja abaixo) |
| [fontes/fredoka](fontes/fredoka) | Fonte Fredoka em `woff2`, sob a SIL Open Font License ([OFL.txt](fontes/fredoka/OFL.txt))          |
| [css](css)                       | Os arquivos de estilo, explicados abaixo                                                           |
| [js](js)                         | `bit.js`, que põe o Bit falando num canto da tela, e `icones.js`, os ícones desenhados (veja abaixo) |

| Arquivo | O que tem |
| --- | --- |
| `css/fontes.css` | O `@font-face` da Fredoka |
| `css/cores.css` | As cores e as medidas do estilo de jogo |
| `css/componentes.css` | Fundo de céu, título com contorno (`.loud`), cartão (`.card`), botão em 3D com uma cor por ação (`.btn`), etiqueta (`.pill`) e balão de fala (`.bubble`) |
| `css/cenario.css` | Céu (`.ceu`) ou noite (`.noite`) com nuvens (`.nuvem`), símbolos de código (`.simbolo`), estrelas (`.estrela`) e morros (`.morros`), sem imagem nem script |
| `css/animacoes.css` | Classes `.anima-<nome>`: `flutuar`, `pular`, `respirar`, `balancar`, `brilhar`, `girar`, `piscar`, `pulsar` e `letras`, que não param, e `surgir`, `subir`, `saltar`, `tremer`, `pontos` e `balao`, que tocam uma vez |

`cenario.css` e `animacoes.css` usam nomes em português para não bater com o `.sky`, o `.cloud` e as animações que as páginas antigas definem por conta própria.

## Cores dos botões

Cada ação tem uma cor e um ícone, iguais em todas as páginas da org. Assim, quem usa sabe o que o botão faz antes de ler.

| Classe | Cor | Ícone | Quando usar |
| --- | --- | --- | --- |
| `.btn--jogar` | Verde | Triângulo | Abrir um jogo ou uma atividade para a turma |
| `.btn--conhecer` | Amarelo | Lupa | Abrir algo para ler ou ver: projeto, aula, oficina, ficha |
| `.btn--falar` | Rosa | Balão | Falar com a equipe: contato, formulário, enviar mensagem |
| `.btn--compartilhar` | Roxo | Pontos ligados | Mandar o link por WhatsApp, Classroom ou outro app |
| `.btn--baixar` | Laranja | Seta para baixo | Baixar um arquivo: kit, PDF, imagem |
| `.btn` | Branco | Nenhum | Ação secundária: voltar, copiar o link, tentar de novo |

O código dos ícones está na [vitrine](https://gamificapampa.github.io/identidade-visual/#componentes), no quadro do botão. Não use a cor de uma ação em outra. As cores soltas `.btn--yellow`, `.btn--mint` e `.btn--pink` continuam funcionando nas páginas antigas, mas numa página nova use o nome da ação.

O botão é em 3D: brilho no alto, sombra embaixo e um reflexo que atravessa quando o mouse passa. `.btn--small` e `.btn--big` mudam o tamanho, e `--drop-y` guarda a altura da sombra. Quem mudar a sombra na página deve mudar `--drop-y`, e não o `box-shadow`, para não perder o brilho.

## Poses do Bit

| Arquivo | Quando usar |
| --- | --- |
| `mascote/bit.svg` | Apresentação e começo das páginas |
| `mascote/bit-acenando.svg` | Boas-vindas, quando o Bit dá oi |
| `mascote/bit-pensando.svg` | Dicas e perguntas, quando a pessoa precisa decidir |
| `mascote/bit-feliz.svg` | Acerto de uma jogada ou de um passo |
| `mascote/bit-comemorando.svg` | Fim de fase, fim de jogo e prompt pronto |
| `mascote/bit-ops.svg` | Erro: o Bit explica o que deu errado, sem bronca |
| `mascote/bit-formatura.svg` | Professores, certificado e fim da oficina |

Todas têm o mesmo tamanho (100 × 100), menos a de formatura, que tem 100 × 110 por causa do capelo. O Bit sempre fala num balão (`.bubble`), com frases curtas.

## Ícones

`js/icones.js` traz os desenhos que substituem os emojis nos jogos e nas páginas: interface (som, casa, estrela, troféu, medalhas, setas), jogos (bug, glitch, disquete, poderes, peça de código), o app da escola do Caça aos Bugs, bichos e pessoas. Todos têm o contorno escuro e as cores da paleta, num quadro de 32 × 32.

```html
<script src="/identidade-visual/js/icones.js"></script>
<script>
  botao.innerHTML = Icones.svg('play') + ' Jogar'; // no HTML
  Icones.desenhar(ctx, 'bug', x, y, 48); // no canvas, com o centro em x e y
</script>
```

`Icones.svg` devolve o `<svg>` com a classe `icone`, para o tamanho vir do CSS da página. A lista com os nomes está na [vitrine](https://gamificapampa.github.io/identidade-visual/#icones), e `Icones.nomes` e `Icones.grupos` trazem os mesmos nomes no código. Para criar um ícone, desenhe no mesmo estilo e ponha no grupo certo: a vitrine mostra sozinha.

## Como usar

```html
<link rel="stylesheet" href="/identidade-visual/css/fontes.css" />
<link rel="stylesheet" href="/identidade-visual/css/cores.css" />
<link rel="stylesheet" href="/identidade-visual/css/componentes.css" />
<link rel="stylesheet" href="/identidade-visual/css/cenario.css" />
<link rel="stylesheet" href="/identidade-visual/css/animacoes.css" />
<img
  src="/identidade-visual/logos/gamificapampa-horizontal.svg"
  alt="GamificaPampa"
/>
```

Carregue só o que a página usa, nesta ordem. No `equipe`, que abre direto do disco, troque `/identidade-visual/` por `https://gamificapampa.github.io/identidade-visual/`.

O kit sem internet do `recursos-pedagogicos` copia daqui a fonte e as pastas `css`, `js` e `mascote`. Uma página do kit que passar a usar outra pasta precisa que o `.github/scripts/kit_sem_internet.py` a copie também.

As cores de `cores.css` são as mesmas do `styles.css` do site. Quando uma cor mudar, mude aqui e no site.
