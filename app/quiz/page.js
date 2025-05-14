'use client';

import { useQuiz } from '../lib/context/QuizContext';
import { useUser } from '../lib/context/UserContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import q from '../Styles/Quiz.module.css';
import Image from 'next/image';
import { QuizAnswer } from '../Components/QuizAnswer';


import QuizCard from '../Components/QuizCard';

// Mock data for testing when Appwrite data isn't available
const mockQuestion = {
  questionText: 'Do you find it difficult to read out loud?',
  Section: 'Reading',
  audio_URL: '',
  GIF_URL: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDdtM2JrY2ZlOHQyeGxxNmVxbXd1aWZxcnBnNHd3MWx0ZnIyaWx6eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKTDn976rzVgky4/giphy.gif'
};

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

    // Debug data availability
    useEffect(() => {
        console.log('DEBUG - Quiz Data:', {
            hasQuestions: Boolean(questions?.length),
            hasCurrentQuestion: Boolean(currentQuestion),
            hasGifURLs: Boolean(gif_URLs?.length),
            currentIndex,
            quizLength
        });
        
        if (currentQuestion) {
            console.log('DEBUG - Current Question Data:', {
                id: currentQuestion.$id,
                text: currentQuestion.questionText,
                section: currentQuestion.Section,
                gifUrl: currentQuestion.GIF_URL
            });
        } else {
            console.log('DEBUG - No current question available');
        }
        
        if (gif_URLs?.length) {
            console.log('DEBUG - GIF URLs:', gif_URLs.slice(0, 3), '...');
        } else {
            console.log('DEBUG - No GIF URLs available');
        }
    }, [questions, currentQuestion, gif_URLs, currentIndex]);

    // Initialize currentQuestion properties safely
    const questionText = currentQuestion?.questionText || mockQuestion.questionText;
    const audio_URL = sound ? (currentQuestion?.audio_URL || mockQuestion.audio_URL) : '';
    const Section = currentQuestion?.Section || mockQuestion.Section;
    const Type = currentQuestion?.Type || '';
    const GIF_URL = currentQuestion?.GIF_URL || mockQuestion.GIF_URL;
    const currentIMG = gif_URLs?.[currentIndex] || mockQuestion.GIF_URL;

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
        <section className={q.quizMainSection} style={{color: 'white', outline: '0px solid lime'}}>
            <main className={q.quizComponentContainer} id='quizElement' style={{outline: '0px solid lime', position: 'relative', zIndex: '9999999'}}>
            <QuizCard 
             style={{outline: '0px solid lime', position: 'relative', zIndex: '9999999'}}
                        questionText={questionText}
                        Section={Section}
                        audio_URL={audio_URL}
                        currentIMG={currentIMG}
                    />

               
                <QuizAnswer/> 
                
            </main>
        </section>
    );
} 