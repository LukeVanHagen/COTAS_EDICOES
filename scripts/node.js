const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware para parsear o corpo JSON
app.use(express.json());

// Rota para salvar o log
app.post('/salvar-log', (req, res) => {
    const parametros = req.body;
    const dataAtual = new Date();
    const mesAno = `${dataAtual.getMonth() + 1}-${dataAtual.getFullYear()}`;
    const pasta = path.join(__dirname, 'logs', mesAno);

    // Criar a pasta se não existir
    if (!fs.existsSync(pasta)) {
        fs.mkdirSync(pasta, { recursive: true });
    }

    // Nome do arquivo com data e hora
    const nomeArquivo = `log-${dataAtual.toISOString().slice(0, 19).replace(/[-:]/g, '').replace('T', '-')}.json`;
    const caminhoArquivo = path.join(pasta, nomeArquivo);

    // Salvar o log no arquivo
    fs.writeFileSync(caminhoArquivo, JSON.stringify(parametros, null, 2));

    res.json({ message: 'Log salvo com sucesso' });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
