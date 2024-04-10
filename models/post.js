const db = require("./banco")
const Sequelize = db.Sequelize
const sequelize = db.sequelize

const clientes = sequelize.define("clientes",{
    nome:{
        type: Sequelize.STRING
    },
    endereco:{
        type: Sequelize.STRING
    },
    bairro:{
        type: Sequelize.STRING
    },
    cep:{
        type: Sequelize.STRING
    },
    cidade:{
        type: Sequelize.STRING
    },
    estado:{
        type: Sequelize.STRING
    },
    telefone:{
        type: Sequelize.STRING
    }
})

//clientes.sync({force: true})

module.exports = clientes