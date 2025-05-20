'use client';

import { useQuiz } from '../lib/context/QuizContext';
import { useUser } from '../lib/context/UserContext';
import { useRouter } from 'next/navigation';
// import q from '../../Styles/Quiz.module.css';
import q from '../Styles/Quiz.module.css'; 
import QuizCard from '../Components/QuizCard';
import {PermissionAnswer} from '../Components/PermissionAnswer'; 



export default function EmailPermission() {
    const router = useRouter();
    const { finalScore,  } = useQuiz();
    const { name, sound } = useUser();

    const handleYesClick = () => {
        router.push('/email-signup');
    };

    const handleNoClick = () => {
        router.push('/');
    };


    return (
        <section style={{color: 'white'}}>
            <main className={q.quizComponentContainer} id='quizElement'>
                <section className={q.cardContainer}>
                    <QuizCard 
                        questionText="Can I send your results to your email?"
                        Section="Results"
                        currentQuestion={{
                            questionText: "We'll send your detailed results to your email"
                        }}
                        // No audio for this page
                        
                        // audio_URL="https://dyslexiaquizapp.s3.eu-west-2.amazonaws.com/audio+doodles/send+email-v1.mp3"
                        audio_URL={sound ? "https://dyslexiaquizapp.s3.eu-west-2.amazonaws.com/audio+doodles/send+email-v1.mp3" : null}
                        // Optional: Add a results-related image if you have one
                        currentIMG="https://fra.cloud.appwrite.io/v1/storage/buckets/dood_gifs/files/Dude_Email_Permission/view?project=test-domain&mode=admin"
                    />
                </section>

                {/* <section className={q.answerSectionContainer}>
                    <aside className={q.buttonsContainer} style={{outline: '0px solid lime', display: 'flex', placeContent: 'center', width: '90%'}}>
                        <div className={q.noButtonContainer}>
                            <button 
                                className={q.yesButton} 
                                style={{marginRight: '1rem'}}
                                onClick={handleYesClick}
                            >
                                Yes
                            </button>
                        </div>       

                        <div className={q.sometimesButtonContainer}>
                            <button 
                                className={q.noButton}
                                onClick={handleNoClick}
                            >
                                No
                            </button>
                        </div>
                    </aside>
                </section> */}
                <PermissionAnswer/>


            </main>
        </section>
    );
} 