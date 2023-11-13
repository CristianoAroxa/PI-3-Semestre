import mongoose from 'mongoose'

const cusro = new mongoose.Schema({
    nome: String,
    cargaHoraria: String,
    preco: String,
})

export default cusro