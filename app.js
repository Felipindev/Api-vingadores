import express from 'express';
import cors from 'cors';
import fs from 'fs'; //usado para ler o arquivo json

const app = express();

app.use(cors());
app.use(express.json());

//rota principal
app.get('/', (req, res) => {
    res.json('Bem-vindo à API dos Vingadores!');
});

//rota que le e retorna todas as infromações dos membros da equipe
app.get('/api/vingadores', (req, res) =>{
    try {
        //ler o arquivo json
        const data = fs.readFileSync('vingadores.json', 'utf8');
        const vingadores = JSON.parse(data);
        res.json(vingadores);

    } catch (error) {
        res.status(500).json({error: 'Erro ao ler o arquivo JSON'});
        
    }
})

app.get('/api/vingadores/identidades', (req, res) => {
    try {
        const data = fs.readFileSync('vingadores.json', 'utf8');
        const vingadores = JSON.parse(data);

        //extrair somente as identidades secretas
        const identidadesSecretas = vingadores.membros.map(membro => membro.identidadeSecreta)
        res.json(identidadesSecretas);
    } catch (error) {
        res.send(500).json({error: 'Erro ao ler identidades JSON'});
    }
})

// nova rota selecionando idade e poderes dos membros
app.get('/api/vingadores/idade-poderes', (req,res)=>{
    try {
        const data = fs.readFileSync('vingadores.json', 'utf8');
        const vingadores = JSON.parse(data);

        const idadePoderes = vingadores.membros.map(membro => ({
            nome: membro.nome,
            idade: membro.idade,
            poder: membro.poder,
        }))
        res.json({idadePoderes});
    } catch (error) {
        res.status(500).json({error: 'Erro ao ler o arquivo JSON'});
    }
})

const PORTa = 3000;
app.listen(PORTa, () => {
    console.log(`Servidor rodando em http://localhost:${PORTa}`);
});