const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, "public");

app.disable("x-powered-by");

// Arquivos estáticos. O express.static já responde a "Range requests",
// que o Safari do iPhone exige para tocar vídeo.
app.use(
  express.static(PUBLIC_DIR, {
    maxAge: "7d",
    setHeaders(res, filePath) {
      // O HTML nunca fica em cache, assim qualquer alteração aparece na hora.
      if (filePath.endsWith(".html")) res.setHeader("Cache-Control", "no-cache");
    },
  })
);

// Qualquer outro endereço volta para a página principal.
app.use((req, res) => res.sendFile(path.join(PUBLIC_DIR, "index.html")));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Mídia kit rodando em http://localhost:${PORT}`);
});
