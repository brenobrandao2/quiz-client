import { base_url_db } from "../utils/baseUrls" 

export const createContact = async (name, email, id_quiz) => {
    const opt = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            email,
            id_quiz
        })
    }
    
    try {
        fetch(`${base_url_db}/contacts/create`, opt).then(async response => console.log(await response.json()))
    } catch (error) {
        console.log(error)
    }
}