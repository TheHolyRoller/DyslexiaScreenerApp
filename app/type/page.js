'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import q from '../../Styles/Quiz.module.css';
import q from '../Styles/Quiz.module.css'; 
import { useUser } from '../lib/context/UserContext';

import QuizCard from '../Components/QuizCard';
import TypeControls from '../Components/TypeControls'; 


export default function UserType() {
    const router = useRouter();
    const [user, setUser] = useState();
    const { setUserType, sound } = useUser();

    const handleUserType = async (type) => {
        await setUserType(type);
        setUser(type);

        setTimeout(() => {
            router.push('/details');
        }, 210);
    };

    useEffect(() => {
        console.log('User type updated:', user);
    }, [user]);

    return (
        <section style={{color: 'white'}}>
            <main className={q.quizComponentContainer} id='quizElement'>
            <QuizCard 
                        questionText="I can quiz different people for you. who is it this time?"
                        Section="Details"
                        currentQuestion={{
                            questionText: ""
                        }}
                        audio_URL={sound ? "https://dyslexiaquizapp.s3.eu-west-2.amazonaws.com/audio+doodles/quizzer+who-v1.mp3" : null}
                        currentIMG='https://fra.cloud.appwrite.io/v1/storage/buckets/dood_gifs/files/Dude_User_Type/view?project=test-domain&mode=admin'
                    />

                <TypeControls/>

            </main>
        </section>
    );
} 