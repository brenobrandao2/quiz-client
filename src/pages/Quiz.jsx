import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import '../css/Quiz.css'
import { Quiz as QuizClass, getById } from '../repository/quiz.repository'

import imagem from '../assets/card02.png'
import { Pergunta } from '../repository/pergunta.repository';

const Quiz = () => {
    const { key } = useParams()
    const [loading, setLoading] = useState(false)
    const [quiz, setQuiz] = useState(new QuizClass())
    const [perguntas, setPerguntas] = useState([new Pergunta()])
    const [perguntaAtual, setPerguntaAtual] = useState(new Pergunta())
    const [countPerguntas, setCountPerguntas] = useState(0)
    const [showCardFinal, setShowCardFinal] = useState(false)
    const [flow, setFlow] = useState('')

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

    const finishQuiz = () => {
        const redirecionamento = quiz.fluxos[flow].redirecionamento || 'https://lifeandmoney.com.br/'
        window.location.href = redirecionamento
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
                            <div className="Quiz-imageArea">
                                <img src={imagem} alt='quiz_img' className="Quiz-image"/>
                            </div>
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
                    showCardFinal ?
                        <div className="Quiz-cardFinal">
                            <div className="Quiz-imageAreaCF">
                                <img src={imagem} alt='quiz_img' className="Quiz-imageCF"/>
                            </div>
                            <div>
                                <p className="Quiz-tituloCF">{quiz.cardFinal.titulo}</p>
                                <p className="Quiz-subtituloCF">{quiz.cardFinal.subtitulo}</p>
                            </div>
                            <input type="text" placeholder="Insira seu nome" className="Quiz-input" />
                            <input type="text" placeholder="Insira seu melhor e-mail" className="Quiz-input" />
                            <input type="button" value={quiz.cardFinal.botao} className="Quiz-finalButton" onClick={() => finishQuiz()}/>
                        </div>
                    :
                        <div className="QuizList-LoaderArea">
                            <div className="QuizList-loader" />
                        </div>
                }

            </div>
    )
}

export default Quiz;