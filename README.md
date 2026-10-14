# Identidade visual

Logos, mascote, fonte e cores do GamificaPampa. O site do hub e os recursos pedagógicos carregam estes arquivos pelo caminho `/identidade-visual/`, publicado pelo GitHub Pages.

| Pasta                            | Conteúdo                                                                                           |
| -------------------------------- | -------------------------------------------------------------------------------------------------- |
| [logos](logos)                   | Logo horizontal, ícone, ícone invertido e avatar da org no GitHub                                  |
| [mascote](mascote)               | Bit, o robô que aparece no site, nos jogos e nos slides                                            |
| [fontes/fredoka](fontes/fredoka) | Fonte Fredoka em `woff2`, sob a SIL Open Font License ([OFL.txt](fontes/fredoka/OFL.txt))          |
| [css](css)                       | `cores.css` com as cores e medidas do estilo de jogo, e `fontes.css` com o `@font-face` da Fredoka |

## Como usar

```html
<link rel="stylesheet" href="/identidade-visual/css/fontes.css" />
<link rel="stylesheet" href="/identidade-visual/css/cores.css" />
<img
  src="/identidade-visual/logos/gamificapampa-horizontal.svg"
  alt="GamificaPampa"
/>
```

As cores de `cores.css` são as mesmas do `styles.css` do site. Quando uma cor mudar, mude aqui e no site.
