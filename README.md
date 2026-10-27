# Mídia Kit

Site estático de uma página, servido por Node/Express. Sem login, sem banco.

## Estrutura

```
midia-kit/
├── package.json
├── server.js            # servidor (Railway usa a variável PORT)
├── .gitignore
└── public/              # tudo que vai para o ar
    ├── index.html       # textos e estrutura
    ├── css/style.css    # cores, fontes e layout (cores no topo)
    ├── js/main.js
    └── assets/
        ├── img/         # hero.jpg, retrato.jpg, foto-1..6.jpg, capa-1..4.jpg, favicon.png
        └── video/       # video-1..4.mp4
```

## Arquivos esperados

| Arquivo | Onde aparece | Dica |
|---|---|---|
| `img/hero.jpg` | Topo, tela inteira | Horizontal ou bem aberta, rosto à direita, ~2400px de largura |
| `img/retrato.jpg` | Apresentação | Vertical 4:5 |
| `img/foto-1.jpg`, `foto-2.jpg`… | Carrossel de fotos (sem limite) | foto-1 aparece maior; vertical 4:5 |
| `img/capa-1.jpg`, `capa-2.jpg`… | Capa dos vídeos (opcional) | Vertical 9:16 |
| `video/video-1.mp4`, `video-2.mp4`… | Carrossel de vídeos (sem limite) | MP4 H.264, vertical, até ~15 MB cada |
| `img/marca-1.jpg` … `marca-8.jpg` | Carrossel de marcas | Logo em quadro 3:2, fundo branco funciona melhor |
| `img/favicon.png` | Ícone da aba | Quadrado, 512×512 |

Se um arquivo não existir, o espaço mostra o nome que ele deveria ter.
Quer outro nome? Troque o `src` correspondente no `index.html`.

## Rodar no computador

```bash
npm install
npm run dev      # http://localhost:3000
```

## Subir no Cloudflare Pages (recomendado — grátis, sem servidor)

Esse site é 100% estático (não usa banco nem login), então não precisa do
`server.js`/Railway pra ficar no ar. O Cloudflare Pages serve a pasta
`public/` direto, de graça, com SSL e domínio próprio incluídos.

1. Suba o projeto pro GitHub (`git push`).
2. Em [pages.cloudflare.com](https://pages.cloudflare.com) → **Create a project** → **Connect to Git** → escolha o repositório.
3. Configuração do build:
   - **Build command**: deixe em branco
   - **Build output directory**: `public`
4. Deploy. Cada `git push` na branch principal publica de novo automaticamente.
5. Pra usar domínio próprio: no projeto → **Custom domains** → adicione o domínio (depois de registrado — veja abaixo).

`server.js`/Railway continuam funcionando se quiser rodar localmente ou noutro provedor, mas não são necessários pro Cloudflare Pages.

## Subir no Railway (alternativa, com servidor)

1. Suba a pasta para um repositório no GitHub.
2. No Railway: New Project → Deploy from GitHub repo → escolha o repositório.
3. Ele detecta o Node e roda `npm start` sozinho.
4. Settings → Networking → Generate Domain (ou conecte um domínio próprio).

Cada `git push` publica de novo automaticamente.

## Vídeos leves

O GitHub recusa arquivos acima de 100 MB, e vídeo pesado demora para abrir no
celular. Exporte em 1080×1920, H.264, ou comprima no HandBrake (preset
"Fast 1080p30" e marque "Web Optimized").
