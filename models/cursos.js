import mongoose from 'mongoose'

const curso = new mongoose.Schema({
    nome: String,
    carga: String,
    preco: String,
})

export default curso