import { CardFinal } from "./cardFinal.repository"
import { Pergunta } from "./pergunta.repository"

export class Quiz {
    constructor(_id, nome, titulo, subtitulo, imagem, duplicidade, perguntas, cardFinal, createdAt, lastModified, fluxos) {
        this._id = _id
        this.nome = nome || ''
        this.titulo = titulo || ''
        this.subtitulo = subtitulo || ''
        this.imagem = imagem
        this.duplicidade = duplicidade || 0

        this.setPerguntas(perguntas)

        this.cardFinal = cardFinal || new CardFinal()

        this.createdAt = createdAt
        this.lastModified = lastModified
        this.fluxos = fluxos
    }

    setPerguntas(perguntas) {
        if (perguntas) this.perguntas = perguntas
        else this.perguntas = [new Pergunta()]
    }
}

export const getById = async (key) => {
    const opt = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({key})
    }
    const allQuiz = await fetch('http://137.184.132.242/:3001/quiz/getById', opt).then(response => response.json())
    
    const quiz = allQuiz[0]
    const {_id, nome, titulo, subtitulo, imagem, duplicidade, perguntas, cardFinal, createdAt, lastModified, fluxos} = quiz
    return new Quiz(_id, nome, titulo, subtitulo, imagem, duplicidade, perguntas, cardFinal, createdAt, lastModified, fluxos)

}
