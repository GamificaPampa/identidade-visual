# Identidade visual

Logos, mascote, fonte, cores, cenário e animações do GamificaPampa. O site do hub e os recursos pedagógicos carregam estes arquivos pelo caminho `/identidade-visual/`, publicado pelo GitHub Pages.

A página [gamificapampa.github.io/identidade-visual](https://gamificapampa.github.io/identidade-visual/) mostra tudo funcionando, com o código para copiar. Quando algo mudar aqui, mude também nela ([index.html](index.html)).

| Pasta                            | Conteúdo                                                                                           |
| -------------------------------- | -------------------------------------------------------------------------------------------------- |
| [logos](logos)                   | Logo horizontal, ícone, ícone invertido e avatar da org no GitHub                                  |
| [mascote](mascote)               | Bit, o robô que aparece no site, nos jogos e nos slides                                            |
| [fontes/fredoka](fontes/fredoka) | Fonte Fredoka em `woff2`, sob a SIL Open Font License ([OFL.txt](fontes/fredoka/OFL.txt))          |
| [css](css)                       | Os arquivos de estilo, explicados abaixo                                                           |

| Arquivo | O que tem |
| --- | --- |
| `css/fontes.css` | O `@font-face` da Fredoka |
| `css/cores.css` | As cores e as medidas do estilo de jogo |
| `css/componentes.css` | Fundo de céu, título com contorno (`.loud`), cartão (`.card`), botão (`.btn`), etiqueta (`.pill`) e balão de fala (`.bubble`) |
| `css/cenario.css` | Céu (`.ceu`) ou noite (`.noite`) com nuvens (`.nuvem`), símbolos de código (`.simbolo`), estrelas (`.estrela`) e morros (`.morros`), sem imagem nem script |
| `css/animacoes.css` | Classes `.anima-<nome>`: `flutuar`, `pular`, `respirar`, `balancar`, `brilhar`, `girar`, `piscar`, `pulsar` e `letras`, que não param, e `surgir`, `subir`, `saltar`, `tremer`, `pontos` e `balao`, que tocam uma vez |

`cenario.css` e `animacoes.css` usam nomes em português para não bater com o `.sky`, o `.cloud` e as animações que as páginas antigas definem por conta própria.

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

O kit sem internet do `recursos-pedagogicos` só copia a fonte daqui. Uma página do kit que passar a usar estes CSS precisa que o `.github/scripts/kit_sem_internet.py` copie os arquivos também.

As cores de `cores.css` são as mesmas do `styles.css` do site. Quando uma cor mudar, mude aqui e no site.
