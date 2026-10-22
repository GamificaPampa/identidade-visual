# Identidade visual

Logos, mascote, fonte, cores, cenário, animações e ícones do GamificaPampa. O site do hub e os recursos pedagógicos carregam estes arquivos pelo caminho `/identidade-visual/`, publicado pelo GitHub Pages.

A página [gamificapampa.github.io/identidade-visual](https://gamificapampa.github.io/identidade-visual/) mostra tudo funcionando, com o código para copiar. Quando algo mudar aqui, mude também nela ([index.html](index.html)).

| Pasta                            | Conteúdo                                                                                           |
| -------------------------------- | -------------------------------------------------------------------------------------------------- |
| [logos](logos)                   | Logo horizontal, ícone, ícone invertido e avatar da org no GitHub                                  |
| [mascote](mascote)               | Bit, o robô que aparece no site, nos jogos e nos slides, com uma pose para cada momento (veja abaixo) |
| [fontes/fredoka](fontes/fredoka) | Fonte Fredoka em `woff2`, sob a SIL Open Font License ([OFL.txt](fontes/fredoka/OFL.txt))          |
| [css](css)                       | Os arquivos de estilo, explicados abaixo                                                           |
| [js](js)                         | As peças com script: o Bit que fala, os ícones, a barra do topo, o kit de jogo, o copiar e o site que lembra (veja abaixo) |

| Arquivo | O que tem |
| --- | --- |
| `css/fontes.css` | O `@font-face` da Fredoka |
| `css/cores.css` | As cores e as medidas do estilo de jogo |
| `css/componentes.css` | Fundo de céu, título com contorno (`.loud`), cartão (`.card`), botão (traz o `botoes.css`), etiqueta (`.pill`), balão de fala (`.bubble`), opção de filtro (`.filtro-opcao`), partes do prompt (`.prompt-parte`), aviso de privacidade (`.privacidade`) e rodapé (`.rodape-gp`) |
| `css/botoes.css` | Só o botão em 3D com uma cor por ação (`.btn`), para a página que tem o próprio layout |
| `css/cenario.css` | Céu do Pampa (`.ceu`, com sol e grão de papel) ou noite (`.noite`), nuvens (`.nuvem`), símbolos de código (`.simbolo`), estrelas (`.estrela`) e as coxilhas (`.morros`) em três camadas com um umbu. Sem script, é isso que aparece. Também tem o estilo da paisagem do `paisagem.js` |
| `css/animacoes.css` | Classes `.anima-<nome>`: `flutuar`, `pular`, `respirar`, `balancar`, `brilhar`, `girar`, `piscar`, `pulsar` e `letras`, que não param, e `surgir`, `subir`, `saltar`, `tremer`, `pontos` e `balao`, que tocam uma vez |

| Script | O que faz |
| --- | --- |
| `js/barra.js` | A barra do topo das páginas do professor: logo, Voltar, a trilha de onde a pessoa está e o botão dos jogos para a turma. Põe também a impressão comum |
| `js/jogo.js` | O kit de jogo: voltar ao menu da turma, tela cheia, som guardado para todos os jogos, pausa ao trocar de aba, contagem, confete e a fileira da tela final |
| `js/copiar.js` | Copiar com aviso, que só diz "copiado" quando copiou, e a barra de Copiar e Abrir o Gemini no pé da tela do celular |
| `js/lembrar.js` | Guarda no aparelho as escolhas do professor e devolve na próxima visita. Nunca guarde nome ou dado de criança |
| `js/paisagem.js` | Troca as coxilhas (`.morros`) por uma paisagem do Pampa em camadas: umbu, ipê-amarelo, capão de mato, cata-vento, galpão, cerca, vacas pastando, cavalo crioulo, ovelhas, quero-quero, flores, nuvens com volume e pássaros. Na rolagem, as camadas andam em velocidades diferentes (paralaxe), o dia passa até o fim da tarde e os blocos abaixo da primeira tela sobem ao aparecer. A barra do topo já carrega o arquivo; o hub e a vitrine têm a tag. Com "Parar animações" ou movimento reduzido, tudo fica parado |
| `js/animacoes.js` | O botão "Parar animações": para tudo o que se mexe na página e o site lembra a escolha no aparelho. A barra do topo e o hub já põem o botão |
| `js/bit.js` | O Bit que fala num canto da tela (veja abaixo) |
| `js/icones.js` | Os ícones desenhados no lugar dos emojis (veja abaixo) |

A vitrine mostra cada peça funcionando, na seção [Peças das páginas](https://gamificapampa.github.io/identidade-visual/#pecas), com o código para copiar.

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

Três ações do professor seguem as mesmas cores:

- **Copiar** um prompt ou instruções é verde quando é a ação principal da página, e branco quando vem ao lado de outra ação principal.
- **Abrir o Gemini** é verde quando está sozinho. Ao lado do Copiar, fica branco.
- **Imprimir** é laranja, como baixar.

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

`js/icones.js` traz os desenhos que substituem os emojis nos jogos e nas páginas: interface (som, casa, estrela, troféu, medalhas, setas, cadeado), jogos (bug, glitch, disquete, poderes, peça de código), o app da escola do Caça aos Bugs, bichos, pessoas, os sistemas da aula (app, servidor e banco de dados) e os tipos de material da Oficina. Todos têm o contorno escuro e as cores da paleta, num quadro de 32 × 32.

```html
<script src="/identidade-visual/js/icones.js"></script>
<script>
  botao.innerHTML = Icones.svg('play') + ' Jogar'; // no HTML
  Icones.desenhar(ctx, 'bug', x, y, 48); // no canvas, com o centro em x e y
</script>
```

Para usar um ícone direto no HTML, inclusive dentro de um desenho maior, carregue o script com `data-simbolos` logo no começo do `<body>`. Ele cria um `<symbol id="icone-nome">` para cada ícone:

```html
<script src="/identidade-visual/js/icones.js" data-simbolos></script>
<svg width="32" height="32" aria-hidden="true"><use href="#icone-estrela" /></svg>
```

O Bit não é ícone: numa ilustração, use o arquivo do `mascote/` com `<image href="/identidade-visual/mascote/bit.svg" width="100" height="100" />`. A exceção é o certificado da aula, que vira imagem para o PDF e por isso leva os desenhos dentro dele.

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

O kit sem internet do `recursos-pedagogicos` copia daqui a fonte e as pastas `css`, `js`, `mascote` e `logos`. Uma página do kit que passar a usar outra pasta precisa que o `.github/scripts/kit_sem_internet.py` a copie também.

O hub, o menu da turma, a máquina de prompts e as páginas do professor carregam o `cores.css`: quando uma cor mudar, mude aqui. O Robô, o Ninja, a Dupla, o Conecta, o Caça aos Bugs e as telas de estande ainda têm as cores deles.
