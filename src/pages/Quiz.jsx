import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import '../css/Quiz.css'
import { Quiz as QuizClass, getById } from '../repository/quiz.repository'

import { Pergunta } from '../repository/pergunta.repository';
import { createContact } from '../repository/contact.repository';

const Quiz = () => {
    const { key } = useParams()
    const [loading, setLoading] = useState(false)
    const [quiz, setQuiz] = useState(new QuizClass())
    const [perguntas, setPerguntas] = useState([new Pergunta()])
    const [perguntaAtual, setPerguntaAtual] = useState(new Pergunta())
    const [countPerguntas, setCountPerguntas] = useState(0)
    const [showCardFinal, setShowCardFinal] = useState(false)
    const [flow, setFlow] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const nextQuestion = (indexResposta) => {
        const newFlow = flow + `${countPerguntas}${indexResposta}`
        setFlow(newFlow)

        if (countPerguntas + 1 < perguntas.length) {
            const counter = countPerguntas + 1
            setCountPerguntas(counter)
            setPerguntaAtual(perguntas[counter])
        } else {
            setShowCardFinal(true)
        }
    }

    const finishQuiz = async (e) => {
        setLoading(true)
        e.preventDefault();
        const redirecionamento = quiz.fluxos[flow].redirecionamento || 'https://lifeandmoney.com.br/'
        console.log(redirecionamento)
        await createContact(name, email, quiz._id)
        window.location.href = redirecionamento
        setLoading(false)
        return false
    }

    useEffect(() => {
        const setInitialStates = (quiz) => {
            setQuiz(quiz)
            setPerguntas(quiz.perguntas)
            setPerguntaAtual(quiz.perguntas[0])
        }
        const loadQuiz = async () => {
            try {
                setLoading(true)
                const quiz = await getById(key)
                setInitialStates(quiz)
                setLoading(false)
            } catch (error) {
                console.log('Falha ao buscar dados do quiz')
            }
        }

        loadQuiz()
    },[key])

    return (
            <div className="Quiz-container">
                {!loading && !showCardFinal ?
                    <div className="Quiz-main">
                        <div className="Quiz-titleArea">
                            <p className="Quiz-title">{quiz.titulo}</p>
                            <p className="Quiz-subtitle">{quiz.subtitulo}</p>
                        </div>
                        <div className="Quiz-quizArea">
                            {quiz.imagem && <div className="Quiz-imageArea">
                                <img src={`data:${quiz.imagem.mimetype};base64,${quiz.imagem.buffer}`} alt='quiz_img' className="Quiz-image"/>
                            </div>}
                            <div className="Quiz-card">
                                <div className="Quiz-progressBar">
                                    <p className="Quiz-progressText">{countPerguntas+1} / {perguntas.length}</p>
                                </div>
                                <p className="Quiz-pergunta">{perguntaAtual.texto}</p>
                                <div className="Quiz-respostas">
                                    {
                                        perguntaAtual.respostas.map((resposta, index) => {
                                            return (
                                                <input 
                                                    key={index}
                                                    type="button"
                                                    value={resposta.texto}
                                                    className="Quiz-resposta"
                                                    onClick={() => nextQuestion(index)}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>    
                : 
                    loading ?
                        <div className="QuizList-LoaderArea">
                            <div className="QuizList-loader" />
                        </div>
                        :
                        <div className="Quiz-cardFinal">
                            <div className="Quiz-imageAreaCF">
                                {quiz.cardFinal.imagem && <img src={`data:${quiz.cardFinal.imagem.mimetype};base64,${quiz.cardFinal.imagem.buffer}`} alt='quiz_img' className="Quiz-imageCF"/>}
                            </div>
                            <div>
                                <p className="Quiz-tituloCF">{quiz.cardFinal.titulo}</p>
                                <p className="Quiz-subtituloCF">{quiz.cardFinal.subtitulo}</p>
                            </div>
                            <form onSubmit={(e) => finishQuiz(e)}>
                                <input autoComplete="on" name="name" type="text" placeholder="Insira seu nome" className="Quiz-input" required onChange={(e) => setName(e.target.value)}/>
                                <input autoComplete="on" name="email" type="email" placeholder="Insira seu melhor e-mail" className="Quiz-input" required onChange={(e) => setEmail(e.target.value)}/>
                                <input type="submit" value={quiz.cardFinal.botao} className="Quiz-finalButton" />
                            </form>
                        </div>
                }
                {!loading && <div className="Quiz-footer">
                    <p className="Quiz-direitos">LIFE + MONEY · 2020 © Todos os direitos reservados</p>
                    <div className="Quiz-footerLinks">
                        <a href="https://lifeandmoney.com.br/termos-e-condicoes/" className="Quiz-footerLink">Termos e Condições Gerais de Uso</a>
                        <a href="https://lifeandmoney.com.br/politica-de-privacidade/" className="Quiz-footerLink">Política de Privacidade</a>
                    </div>
                </div>}
            </div>
    )
}

export default Quiz;