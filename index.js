import express from 'express' // Importando o Express
import mongoose from 'mongoose' // Importando o Mongoose
import bodyParser from 'body-parser' // Importando o BodyParser

import clientService from './services/clientService.js'
import clientModel from './models/clients.js'
import cursoService from './services/cursoService.js'

//import client from './models/clients'
//import clientService from './services/clientService.js'

const app = express() // Iniciando o Express

// Decodifica os dados recebidos por formulários
app.use(bodyParser.urlencoded({ extended: false }))

// Permite a utilização de dados via json
app.use(bodyParser.json())

const uri = "mongodb+srv://admin:9YQZCHx0tddG7Ixs@cluster0.413hior.mongodb.net/etnegocios";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conexão com o MongoDB Atlas estabelecida com sucesso!');
    })
    .catch(err => {
        console.error('Erro ao conectar ao MongoDB Atlas:', err);
    });


// Define o EJS como Renderizador de páginas
app.set('view engine', 'ejs')

// Define o uso da pasta "public" para uso de arquivos estáticos
app.use(express.static('./public'))

// Rota principal
app.get("/", function (req, res) {
    res.render("index")
})

// Rota Home
// Rota de login
app.get("/login", function (req, res) {
    const email = req.query.email;
    res.render("login", { email });
});

app.get("/home", function (req, res) {
    const nome = req.query.nome;
    res.render("home", { nome });
});

app.get("/perfil", function (req, res) {
    const email = req.query.email;
    const senha = req.query.senha;
    res.render("perfil", { email, senha });
});

app.post("/login", async (req, res) => {
    const { email, senha } = req.body;

    try {
        if (!email || !senha) {
            return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
        }

        const client = await clientService.findClient(email, senha);

        if (!client) {
            return res.status(401).json({ message: 'Usuário não encontrado.' });
        }

        res.redirect(`/home?email=${client.email}`);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro no servidor.' });
    }

});

app.get("/curso", function (req, res) {
    res.render("curso")
})
app.get("/editar", function (req, res) {
    res.render("editar")
})

app.get("/cadastro", function (req, res) {
    res.render("cadastro")
})
app.get("/loading", function (req, res) {
    res.render("loading")
})



app.post("/create", function (req, res) {
    const nome = req.body.nome;
    const rg = req.body.rg;
    const email = req.body.email;
    const senha = req.body.senha;
    const confSenha = req.body.confSenha;


    // Cria um documento JSON com os dados do formulário
    const newClient = new clientModel({
        nome,
        rg,
        email,
        senha,
        confSenha,

    });

    newClient.save()


    return res.redirect("/")

})
// ROTA CURSOS
app.get("/editarCurso", (req, res) => {
    cursoService.GetAll().then(cursos => {
        res.render("editarCurso", {
            cursos: cursos
        })
    })
})

// ROTA DE CRIAÇÃO DE CURSO
app.post("/createCurso", (req, res) => {
    cursoService.Create(
        req.body.nome,
        req.body.cargaHoraria,
        req.body.preco
    )
    res.redirect("/editarCurso")
})

// ROTA DE EXCLUSÃO DE CURSO
app.get("/deleteCurso/:id", (req, res) => {
    const id = req.params.id
    cursoService.Delete(id)
    res.redirect("/curso")
})

// ROTA DE BUSCA DE CURSO
app.get("/findCurso/:id", (req, res) => {
    const id = req.params.id
    cursoService.GetOne(id).then(Curso => {
        res.render("dadosCurso ", {
            Curso: Curso
        })
    })
})

// ROTA DE ALTERAÇÃO DE CURSO
app.post("/updateClient/:id", (req, res) => {
    cursoService.Update(
        req.body.id,
        req.body.nome,
        req.body.cargaHoraria,
        req.body.preco
    )
    res.redirect("/curso")
})




// Iniciando o servidor na pora 8080
app.listen(8080, function (erro) {
    if (erro) {
        console.log("Ocorreu um erro!")

    } else {
        console.log("Servidor iniciado com sucesso!")
    }
})