'use client';

import { useRouter } from 'next/navigation';
import { useUser } from '../lib/context/UserContext';
import q from '../Styles/Quiz.module.css'; 

import QuizCard from '../Components/QuizCard';
import {QuizAnswer} from '../Components/QuizAnswer'; 
import AudioControls from '../Components/AudioControls';


export default function SoundPage() {
    const router = useRouter();
    const { setUserSound, sound } = useUser();

    const handleSoundChoice = (soundEnabled) => {
        setUserSound(soundEnabled);
        router.push('/type');
    };

    console.log('this is the sound gif url https://fra.cloud.appwrite.io/v1/storage/buckets/dood_gifs/files/68251a980026fec5e869/view?project=test-domain&mode=admin')

    return (
        <section style={{color: 'white'}}>
            <main className={q.quizComponentContainer} id='quizElement'>
            <QuizCard 
                        questionText="Hi I'm 'Dood'. I'll quiz you on the signs of dyslexia. Can I turn on the audio so I can speak to you?"
                        Section="Details"
                        currentQuestion={{
                            questionText: ""
                        }}
                        audio_URL="https://dyslexiaquizapp.s3.eu-west-2.amazonaws.com/audio+doodles/intro+dood-v1.mp3"
                        currentIMG='https://fra.cloud.appwrite.io/v1/storage/buckets/dood_gifs/files/68251a980026fec5e869/view?project=test-domain&mode=admin'
                    />

                <div style={{outline: '0px solid red'}} >

                {/* <QuizAnswer/> */}
                <AudioControls/>
                </div>

            </main>
        </section>
    );
} 