import express from 'express' // Importando o Express
import mongoose from 'mongoose' // Importando o Mongoose
import bodyParser from 'body-parser' // Importando o BodyParser
import bcrypt from "bcrypt" // Importando bcrypt (hash de senha)
import session from "express-session" //Importando gerador de sessões express
import clientService from './services/clientService.js'
import cursoService from './services/cursoService.js'
import Auth from "./middleware/Auth.js"


const app = express();// Iniciando o Express

// Decodifica os dados recebidos por formulários
app.use(bodyParser.urlencoded({ extended: false }));

// Permite a utilização de dados via json
app.use(bodyParser.json());

const uri = "mongodb+srv://Onaitsirc:7qqR0HTx9fHdd0tf@iconcell.il7szxn.mongodb.net/liberty";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conexão com o MongoDB Atlas estabelecida com sucesso!');
    })
    .catch(err => {
        console.error('Erro ao conectar ao MongoDB Atlas:', err);
    });

// Define o EJS como Renderizador de páginas
app.set('view engine', 'ejs');

// Define o uso da pasta "public" para uso de arquivos estáticos
app.use(express.static('./public'));

app.use(session({
    secret: "lojasecret",
    cookie: { maxAge: 200000 },
    saveUninitialized: false,
    resave: false
}));

// Rota principal
app.get("/", function (req, res) {
    res.render("index");
});

app.get("/login", function (req, res) {
    res.render("login");
});

// ROTA DE LOGOUT
app.get("/logout", (req, res) => {
    req.session.user = undefined
    res.redirect("/");
});

app.get("/curso", Auth, function (req, res) {
    res.render("curso");
})
    ;
app.get("/editar", function (req, res) {
    res.render("editar");
});

app.get("/cadastro", function (req, res) {
    res.render("cadastro");
});

// ROTA DE CRIAÇÃO DE USUÁRIO NO BANCO
app.post("/createUser", (req, res) => {
    // COLETANDO INFORMAÇÕES DO CORPO DA REQUISIÇÃO
    const email = req.body.email
    const password = req.body.password

    UserService.GetOne(email).then(user => {
        if (user == undefined) {
            // AQUI SERÁ FEITO O CADASTRO
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            UserService.Create(email, hash);
            res.redirect("/login");
            // CASO JÁ TENHA USUÁRIO CADASTRADO
        } else {
            res.send(`Usuário já cadastrado!`);
        }
    });
});

// ROTA DE AUTENTICAÇÃO
app.post("/authenticate", (req, res) => {
    const email = req.body.email
    const password = req.body.password

    UserService.GetOne(email).then(user => {
        if (user != undefined) { //Se o usuário existe
            // Validar senha
            const correct = bcrypt.compareSync(password, user.password);
            if (correct) {
                // Autorizar o login
                req.session.user = {
                    id: user._id,
                    email: user.email
                }
                res.redirect("/");
            } else {
                // Informar senha incorreta
                res.send(`Você digitou a sen;ha incorretamente.`)
            }
        } else {
            // Informa usuário incorreto
            res.send(`Usuário não existe.`);
        }
    });
});

app.get("/loading", function (req, res) {
    res.render("loading");
});

app.get("/home", function (req, res) {
    res.render("home",);
});

app.get("/perfil", function (req, res) {
    res.render("perfil");
});

app.post("/createClient", (req, res) => {
    clientService.Create(
        req.body.nome, 
        req.body.rg, 
        req.body.email, 
        req.body.senha, 
        req.body.confSenha
        );
    res.redirect("/login");
});

app.get("/editarCurso", (req, res) => {
    cursoService.GetAll().then(cursos => {
        res.render("editarCurso", {
            cursos: cursos
        });
    });
});


app.post("/createCurso", (req, res) => {
    cursoService.Create(
        req.body.nome,
        req.body.carga,
        req.body.preco
    );
    res.redirect("/editarCurso");
});


app.get("/deleteCurso/:id", (req, res) => {
    const id = req.params.id;
    cursoService.Delete(id);
    res.redirect("/editarCurso");
});


app.get("/findCurso/:id", (req, res) => {
    const id = req.params.id;
    cursoService.GetOne(id).then((curso) => {
        res.render("dadosCurso", {
            curso: curso
        });
    });
});

app.post("/updateCurso/:id", (req, res) => {
    const { id, nome, carga, preco } = req.body;
    cursoService.Update(id, nome, carga, preco);
    res.redirect("/editarCurso");
});

/*app.post("/updateCurso/:id",  (req, res) => {
    cursoService.Update(
        req.body.id,
        req.body.nome,
        req.body.cargaHoraria,
        req.body.preco
    );
    res.redirect("/editarCurso");
});*/

// Iniciando o servidor na pora 8080
app.listen(8080, function (erro) {
    if (erro) {
        console.log("Ocorreu um erro!");

    } else {
        console.log("Servidor iniciado com sucesso!");
    }
});