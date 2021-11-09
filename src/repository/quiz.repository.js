import { CardFinal } from "./cardFinal.repository"
import { Pergunta } from "./pergunta.repository"
import { base_url_db } from "../utils/baseUrls"

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
    const allQuiz = await fetch(`${base_url_db}/quiz/getById`, opt).then(response => response.json())
    
    const quiz = allQuiz[0]
    const {_id, nome, titulo, subtitulo, imagem, duplicidade, perguntas, cardFinal, createdAt, lastModified, fluxos} = quiz
    return new Quiz(_id, nome, titulo, subtitulo, imagem, duplicidade, perguntas, cardFinal, createdAt, lastModified, fluxos)

}

export const getImages = async () => {
    const opt = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }

    let allImages = []
    try {
        allImages = await fetch(`${base_url_db}/quiz/getImages`, opt).then(response => response.json())
    } catch(error) {
        console.log('Falha ao buscar imagens')
    }
    
    return allImages
}