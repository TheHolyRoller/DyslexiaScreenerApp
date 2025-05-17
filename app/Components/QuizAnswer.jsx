'use client'
import a from '../Styles/Answer.module.css'; 

// Add in the context imports here 
import { useQuiz } from '../lib/context/QuizContext';
import { useUser } from '../lib/context/UserContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';



export const QuizAnswer = () => {


    const router = useRouter();
    const { name, sound, userAge } = useUser();
    const { questions, currentQuestion, handleAnswer, currentIndex, quizLength, gif_URLs } = useQuiz();
    
    const [answer, setAnswer] = useState();


    // Log initial props and state
    useEffect(() => {
        console.log('🎯 Quiz Page Initial State:', {
            userInfo: {
                name,
                sound,
                userAge
            },
            quizState: {
                currentIndex,
                quizLength,
                questionsCount: questions?.length,
                currentQuestion: currentQuestion ? {
                    id: currentQuestion.$id,
                    section: currentQuestion.Section,
                    type: currentQuestion.Type,
                    questionText: currentQuestion.questionText
                } : null,
                gifURLsCount: gif_URLs?.length
            }
        });
    }, []);

    // Log state changes
    useEffect(() => {
        console.log('🔄 Quiz State Update:', {
            currentIndex,
            quizLength,
            questionsCount: questions?.length,
            currentQuestion: currentQuestion ? {
                id: currentQuestion.$id,
                section: currentQuestion.Section,
                type: currentQuestion.Type,
                questionText: currentQuestion.questionText
            } : null,
            gifURLsCount: gif_URLs?.length
        });
    }, [currentIndex, quizLength, questions, currentQuestion, gif_URLs]);

    // Initialize currentQuestion properties safely
    const questionText = currentQuestion?.questionText || '';
    const audio_URL = sound ? (currentQuestion?.audio_URL || '') : '';
    const Section = currentQuestion?.Section || '';
    const Type = currentQuestion?.Type || '';
    const GIF_URL = currentQuestion?.GIF_URL || '';
    const currentIMG = gif_URLs?.[currentIndex] || '';

    // Log question details
    useEffect(() => {
        console.log('📝 Current Question Details:', {
            questionText,
            audio_URL,
            Section,
            Type,
            GIF_URL,
            currentIMG,
            currentIndex,
            totalQuestions: quizLength
        });
    }, [currentQuestion, currentIndex]);

    const handleClick = async (userAnswer) => {
        console.log('🎯 Answer Selected:', {
            answer: userAnswer,
            currentIndex,
            questionId: currentQuestion?.$id,
            questionText: currentQuestion?.questionText
        });
        
        await setAnswer(userAnswer);
        handleAnswer(userAnswer);
    };




    const [counters, setCounter] = useState({

        yesNum: 0, 
        noNum: 0, 
        sometimesNum: 0 
    }); 


    const increment = (name) => {

        setCounter(prev => ({

            ...prev, 
            [name]: prev[name] + 1

        })); 

    }



    return(

        <>

        <section className={a.mainAnswerContainer} >
        <article className={a.answerSection}>
            <div className={a.buttonList}>

            <div className={a.buttonStackContainer} 
              onClick={() => handleClick('no')}
              onMouseEnter={() => console.log('🖱️ Hovering No Button')}
            >

            <div className={a.button} id={a.noButton} onClick={() => increment('noNum')} >
            
             {counters.noNum > 0 && (

                <span className={a.numSpan}>
                {counters.noNum}
                </span>

            )}
                No 

            </div>

            <div className={a.buttonStack} id={a.noStackOne}></div>
            <div className={a.buttonStack} id={a.noStackTwo}></div>
            <div className={a.buttonStack} id={a.noStackThree}></div>
            <div className={a.buttonStack} id={a.noStackFour}></div>
            <div className={a.buttonStack} id={a.noStackFive}></div>
            <div className={a.buttonStack} id={a.noStackSix}></div>

            </div>

            <div className={a.buttonStackContainer}    onClick={() => handleClick('sometimes')}
                                onMouseEnter={() => console.log('🖱️ Hovering Sometimes Button')} >

            <div className={a.button} id={a.sometimesButton} onClick={() => increment('sometimesNum')} >
             {counters.sometimesNum > 0 && (

                <span className={a.numSpan}>
                {counters.sometimesNum}
                </span>


            )}
            

                Some 
                times 

            </div>

            <div className={a.buttonStack} id={a.sometimesStackOne}></div>
            <div className={a.buttonStack} id={a.sometimesStackTwo}></div>
            <div className={a.buttonStack} id={a.sometimesStackThree}></div>
            <div className={a.buttonStack} id={a.sometimesStackFour}></div>
            <div className={a.buttonStack} id={a.sometimesStackFive}></div>
            <div className={a.buttonStack} id={a.sometimesStackSix}></div>

            </div>

            <div className={a.buttonStackContainer}   
            onClick={() => handleClick('yes')}
            onMouseEnter={() => console.log('🖱️ Hovering Yes Button')}>

            <div className={a.button} id={a.yesButton} onClick={() => increment('yesNum')}>

             {counters.yesNum > 0 && (

                <span className={a.numSpan}>
                {counters.yesNum}
                </span>

            )}

                Yes 
            </div>

            <div className={a.buttonStack} id={a.yesStackOne}></div>
            <div className={a.buttonStack} id={a.yesStackTwo}></div>
            <div className={a.buttonStack} id={a.yesStackThree}></div>
            <div className={a.buttonStack} id={a.yesStackFour}></div>
            <div className={a.buttonStack} id={a.yesStackFive}></div>
            <div className={a.buttonStack} id={a.yesStackSix}></div>

            </div>
            </div>


        </article>
        </section>

            
        </>
    )

}