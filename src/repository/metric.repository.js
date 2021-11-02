import { base_url_db } from "../utils/baseUrls"

export const registerAccess = async (_id) => {
    console.log(new Date(), ' - Registrando acesso... ', _id)

    const opt = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id_quiz: _id,
            data: new Date(),
            acesso: 1,
            pergunta: '',
            resposta: '',
            lead: 0
        })
    }

    await fetch(`${base_url_db}/quiz/registerMetric`, opt).then(response => response.json())
}

export const registerAnswer = async (_id, pergunta, resposta) => {
    console.log(new Date(), ' - Registrando resposta... ', _id)

    const opt = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id_quiz: _id,
            data: new Date(),
            acesso: 0,
            pergunta: pergunta,
            resposta: resposta,
            lead: 0
        })
    }

    await fetch(`${base_url_db}/quiz/registerMetric`, opt).then(response => response.json())
}

export const registerLead = async (_id) => {
    console.log(new Date(), ' - Registrando resposta... ', _id)

    const opt = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id_quiz: _id,
            data: new Date(),
            acesso: 0,
            pergunta: '',
            resposta: '',
            lead: 1
        })
    }

    await fetch(`${base_url_db}/quiz/registerMetric`, opt).then(response => response.json())
}