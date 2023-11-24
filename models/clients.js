import mongoose from 'mongoose'

const client = new mongoose.Schema(
    {
        nome: String,
        rg: String,
        email: String,   
        senha: String,
        confSenha: String, 
    }
)


export default client

