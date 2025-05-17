'use client';

import { Suspense } from 'react';
import { useUser } from '../lib/context/UserContext';
import { useQuiz } from '../lib/context/QuizContext';
import { useSearchParams } from 'next/navigation';
import r from '../Styles/Results.module.css'; 

function ResultContent() {
    const searchParams = useSearchParams();
    const { name } = useUser();
    const { 
        score,
        finalScore,
        memoryScore,
        writingScore,
        readingScore,
        examResultsScore,
        organisationalScore, 
        email
    } = useQuiz();

    
    // Detailed console logging with emojis
    console.log('🎯 === Quiz Results Details ===');
    console.log('👤 User Name:', name);
    console.log('📧 User Email:', email);
    console.log('🔍 Search Parameters:', Object.fromEntries(searchParams.entries()));
    console.log('📊 === Score Breakdown ===');
    console.log('🏆 Overall Score:', score);
    console.log('🎓 Final Score:', finalScore);
    console.log('🧠 Memory Score:', memoryScore);
    console.log('✍️ Writing Score:', writingScore);
    console.log('📚 Reading Score:', readingScore);
    console.log('📝 Exam Results Score:', examResultsScore);
    console.log('📋 Organisational Score:', organisationalScore);
    console.log('✨ ======================');



    return (
        <>

        <section className={r.quizResultsSection}>
        <div className={r.quizResultsSubContainer}>

        {/* Add in the main title section here  */}
        <div className={r.mainTitleContainer}>

            <h1 className={r.mainQuizTitle}>
                Results

            </h1>


        </div>

        {/*  Add in the main master score section here  */}
        <section className={r.mainScoreSectionContainer}>

        <div className={r.mainScoreSubContainer}>
        
        {/* Add in the main score Element here  */}
        <h2 className={r.mainScoreElement} >

        Score

        </h2>
        
        </div>



        </section>

        {/* Add in the score supporting text here  */}
        <div className={r.scoreSupportingTextContainer}>

        <div className={r.mainQuizSupportingText} >

        <h3 className={r.scoreIntroText}>

        Score Breakdown 

        </h3>


        </div>


        </div>

        {/* Add in the main score board container here  */}
        <section className={r.mainScoreBoardContainer}>
        <div className={r.scoreBoardSubContainer}>

                <ul className={r.scoreBoardList}>

                    <li className={r.scoreBoardListItem}>

                        <div className={r.scoreTitleContainer}>
                        <div className={r.scoreTitle}>
                            Reading Score 
                        
                           </div>
                        <div className={r.scoreSupportText}>

                            Slightly Impacted 


                        </div>

                        </div>


                        <div className={r.scoreNumberContainer}>

                        <div className={r.scoreNumber}>
                            <div className={r.scoreNumSubContainer}>
                            Num 

                            </div>
                        </div>

                        </div>



                    </li>




                </ul>
        
        
        
        
         </div>
        </section>


        {/* Add in the CTA Section here  */}
        <section className={r.learnMoreCTAContainer}>

        <div className={r.learnMoreCTASubContainer}>

            {/* Add in the main text section container here  */}
        <div className={r.CTATextContainer}>

            <div className={r.CTATextSubContainer}>

                <h4 className={r.CTAText}>
                
                Take Quiz 

                </h4>


            </div>


        </div>


        {/* Add in the button container here  */}
        <article className={r.CTAButtonContainer}>
            <div className={r.CTAButtonSubContainer}>

                <button className={r.CTAButton}>

                Learn More 

                </button>

            </div>


        </article>




        </div>
        </section>


        </div>
        </section>



     
        </>
    );
}

export default function RenderResults() {
    return (
        <Suspense fallback={<div style={{ color: 'white', textAlign: 'center', padding: '2rem' }}>Loading results...</div>}>
            <ResultContent />
        </Suspense>
    );
} 