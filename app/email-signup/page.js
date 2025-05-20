'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../lib/context/UserContext';
import { useQuiz } from '../lib/context/QuizContext';
import { databases } from '../lib/appwrite';


import q from '../Styles/Quiz.module.css'; 
import QuizCard from '../Components/QuizCard';
import UserEmailInput from '../Components/UserEmailInput'; 


const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_RESULTS_COLLECTION_ID;


export default function EmailSignup() {


    const {sound } = useUser(); 


    return (
        <section style={{color: 'white'}}>
            <main className={q.quizComponentContainer} id='quizElement'>
                <section className={q.cardContainer}>
                    <QuizCard 
                        questionText="Enter your email to receive your results"
                        Section="Results"
                        currentQuestion={{
                            questionText: "We'll send your detailed results to your email"
                        }}
                        // No audio for this page
                        audio_URL={sound ? "https://dyslexiaquizapp.s3.eu-west-2.amazonaws.com/audio+doodles/receive+email-v1.mp3" : null}
                        currentIMG="https://fra.cloud.appwrite.io/v1/storage/buckets/dood_gifs/files/682bb4430038bc15a801/view?project=test-domain&mode=admin"
                    />
                    
                    <UserEmailInput/>
                
                </section>

            </main>
        </section>
    );
} 