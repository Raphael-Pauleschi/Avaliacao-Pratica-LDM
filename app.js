const express = require("express");
const app = express();
const handlebars = require("express-handlebars").engine;
const bodyParser = require("body-parser");
const post = require("./models/post");


app.engine(
    "handlebars",
    handlebars({
      defaultLayout: "main",})
  );
  app.set("view engine", "handlebars");
  
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  
  app.listen(8081, function () {
    console.log("Servidor Ativo!");
  });
  
  app.get("/", function (req, res) {
    res.render("index");
  });

  app.post("/cadastrar", function (req, res) {
    post
      .create({
        nome: req.body.nome,
        endereco: req.body.endereco,
        bairro:req.body.bairro,
        cep:req.body.cep,
        cidade:req.body.cidade,
        estado:req.body.estado,
        telefone:req.body.telefone,
    
    })
      .then(function () {
        console.log("Cliente cadastrado com sucesso!");
      })
      .catch(function (erro) {
        console.log("Erro: Cliente não cadastrado!" + erro);
      });
    res.render("index");
  });

  app.get("/consulta", function (req, res) {
    post
      .findAll()
      .then(function (post) {
        res.render("consulta", { post: post });
      })
      .catch(function (erro) {
        console.log("Erro: Nenhum Cliente encontrado", erro);
      });
  });

  
app.get("/editar/:id", function (req, res) {
    post
      .findAll({ where: { id: req.params.id } })
      .then(function (post) {
        res.render("editar", { post: post });
      })
      .catch(function (erro) {
        console.log("Erro: Cliente não encontrado!", +erro);
      });
  });
  
  app.post("/editar", function (req, res) {
    post
      .update(
        {
            nome: req.body.nome,
            endereco: req.body.endereco,
            bairro:req.body.bairro,
            cep:req.body.cep,
            cidade:req.body.cidade,
            estado:req.body.estado,
            telefone:req.body.telefone,
        },
        { where: { id: req.body.id } }
      )
      .then(function () {
        console.log("Cliente atualizado com sucesso!");
      })
      .catch(function (erro) {
        console.log("Erro: Cliente não atualizado!" + erro);
      });
    post
      .findAll()
      .then(function (post) {
        res.render("consulta", { post: post });
      })
      .catch(function (erro) {
        console.log("Erro: Nenhum Cliente encontrado" + erro);
      });
  });
  
  app.get("/excluir/:id", function (req, res) {
    post
      .destroy({ where: { id: req.params.id } })
      .then(function () {
        post
          .findAll()
          .then(function (post) {
            res.render("consulta", { post: post });
          })
          .catch(function (erro) {
            console.log("Erro: Nenhum Cliente encontrado", erro);
          });
        console.log("Cliente excluido com sucesso!");
      })
      .catch(function (erro) {
        console.log("Erro: Cliente não excluido!" + erro);
      });
  });