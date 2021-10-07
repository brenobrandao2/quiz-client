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
        await fetch('http://137.184.132.242:3002/contacts/create', opt).then(async response => console.log(await response.json()))
    } catch (error) {
        console.log(error)
    }
}