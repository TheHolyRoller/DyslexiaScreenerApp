'use client';

import { useQuiz } from '../lib/context/QuizContext';
import { useUser } from '../lib/context/UserContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import q from '../Styles/Quiz.module.css';
import Image from 'next/image';

export default function Quiz() {
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
    const audio_URL = currentQuestion?.audio_URL || '';
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

    return (
        <section className={q.quizMainSection} style={{color: 'white', outline: '4px solid lime'}}>
            <main className={q.quizComponentContainer} id='quizElement' style={{outline: '4px solid lime'}}>
                <section className={q.cardContainer}>
                    <article className={q.card}>
                        <article className={q.card} id={q.cardOne}></article>
                        <article className={q.card} id={q.cardTwo}></article>
                        <article className={q.card} id={q.cardThree}></article>
                        <article className={q.card} id={q.cardFour}></article>

                        <div className={q.cardCategoryColorContainer}>
                            {sound === true && audio_URL && (
                                <audio 
                                    key={audio_URL} 
                                    controls 
                                    autoPlay 
                                    style={{ opacity: '0', position: 'absolute' }}
                                    onPlay={() => console.log('🎵 Audio Started Playing:', audio_URL)}
                                    onError={(e) => console.error('❌ Audio Error:', e)}
                                >
                                    <source src={audio_URL} type="audio/mp3" />
                                </audio>
                            )}

                            <div className={q.categoryLabelContainer}>
                                <label className={q.categoryLabel}>
                                    {Section}
                                </label>
                            </div>
                        </div>

                        <div className={q.questionTextContainer}>
                            <h2 className={q.questionText}>
                                {questionText}
                                <span>
                                    {currentQuestion?.questionText}
                                </span>
                            </h2>
                        </div>
                        
                        <div className={q.doodleContainer} style={{outline: '0px solid lime', margin: '0 auto'}}>
                            {currentIMG && (
                                <Image 
                                    src={currentIMG}
                                    alt='quiz illustration'
                                    width={300}
                                    height={300}
                                    unoptimized
                                    onLoad={() => console.log('🖼️ Image Loaded:', currentIMG)}
                                    onError={(e) => console.error('❌ Image Error:', e)}
                                    style={{
                                        margin: '0 auto',
                                        objectFit: 'contain'
                                    }}
                                />
                            )}
                        </div>
                    </article>
                </section>

                <section className={q.answerSectionContainer} style={{outline: '5px solid red'}} >
                    <aside className={q.buttonsContainer}>
                        <div className={q.noButtonContainer}>
                            <button 
                                className={q.noButton} 
                                onClick={() => handleClick('no')}
                                onMouseEnter={() => console.log('🖱️ Hovering No Button')}
                            >
                                No 
                            </button>
                        </div>       

                        <div className={q.sometimesButtonContainer}>
                            <button 
                                className={q.sometimesButton} 
                                onClick={() => handleClick('sometimes')}
                                onMouseEnter={() => console.log('🖱️ Hovering Sometimes Button')}
                            >
                                Sometimes   
                            </button>
                        </div>  
                        

                        <div className={q.yesButtonContainer}>
                            <button 
                                className={q.yesButton} 
                                onClick={() => handleClick('yes')}
                                onMouseEnter={() => console.log('🖱️ Hovering Yes Button')}
                            >
                                Yes 
                            </button>
                        </div>
                    </aside>
                </section>
            </main>
        </section>
    );
} 