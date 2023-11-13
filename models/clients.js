import mongoose from 'mongoose'

const client = new mongoose.Schema(
    {
        nome: { type: String },
        rg: { type: String },
        email: { type: String },
        senha: { type: String }        
    }
)
const clientModel  = mongoose.model("Clients", client)

export default clientModel

