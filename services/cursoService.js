import curso from "../models/cursos.js"
import mongoose from "mongoose"

const Curso = mongoose.model("Curso", curso)

class cursoService {
    Create(nome, carga, preco) {
        const newCurso = new Curso({
            nome: nome,
            carga: carga,
            preco: preco
        })
        newCurso.save()
    }
    
    GetAll() {
        const cursos = Curso.find()
        return cursos
    }

    GetOne(id) {
        const curso = Curso.findOne({_id: id})
        return curso
    }

    Delete(id) {
        Curso.findByIdAndDelete(id).then(() => {
            console.log(`Curso com a id: ${id} foi deletado.`)
        }).catch(err => {
            console.log(err)
        })
    }

    Update(id, nome, carga, preco) {
        Curso.findByIdAndUpdate(id, {
            nome: nome,
            carga: carga,
            preco: preco
        }).then(() => {
            console.log(`Dados do curso com id: ${id} alterados com sucesso.`)
        }).catch(err => {
            console.log(err)
        })
    }
}

export default new cursoService()