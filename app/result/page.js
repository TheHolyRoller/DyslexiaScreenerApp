        'use client';

        import { Suspense } from 'react';
        import { useUser } from '../lib/context/UserContext';
        import { useQuiz } from '../lib/context/QuizContext';
        import { useSearchParams } from 'next/navigation';
        import r from '../Styles/Results.module.css'; 
        import { useRouter } from 'next/navigation'; 


        function ResultContent() {
            const searchParams = useSearchParams();
            const { name } = useUser();
            const router = useRouter(); 


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
                        Overview 

                    </h1>


                </div>

                {/*  Add in the main master score section here  */}
                <section className={r.mainScoreSectionContainer}>

                <div className={r.mainScoreSubContainer}>
                
                {/* Add in the main score Element here  */}
                <h2 className={r.mainScoreElement} >

                {/* Score */}
                {/* 82 */}
                {finalScore}

                </h2>

                {/* Add in the circle background here  */}
                <div className={r.circle}>
                    `
                </div>
                </div>
                </section>

                <div className={r.scoreSupportingTextContainer}>
                <div className={r.mainQuizSupportingText} >

                <h3 className={r.scoreIntroText}>
                Improve your score 
                </h3>
                </div>
                </div>

                <section className={r.mainScoreBoardContainer}>
                <div className={r.scoreBoardSubContainer}>

                        <ul className={r.scoreBoardList}>

                        <li className={r.scoreBoardListItem}>
        <div className={r.scoreTitleContainer}>
        <div className={r.scoreTitle}>
            Reading Score 
        </div>

        <div className={r.scoreSupportText}>

        </div>
        </div>

        <div className={r.scoreNumberContainer}>
            <div className={r.scoreNumber}>
            <div className={r.scoreNumSubContainer}>
            {readingScore}
            </div>
        </div>
        </div>
        </li> 

        <li className={r.scoreBoardListItem}>
        <div className={r.scoreTitleContainer}>
        <div className={r.scoreTitle}>
            Memory Score 
        </div>


        <div className={r.scoreSupportText}>
            Slightly Impacted 
        </div>
        </div>

        <div className={r.scoreNumberContainer}>
        <div className={r.scoreNumber}>
            <div className={r.scoreNumSubContainer}>
            {memoryScore}
            </div>
        </div>
        </div>
        </li>


        <li className={r.scoreBoardListItem}>
        <div className={r.scoreTitleContainer}>
        <div className={r.scoreTitle}>
            Writing Score 
        </div>
        <div className={r.scoreSupportText}>

            Slightly Impacted 
        </div>
        </div>


        <div className={r.scoreNumberContainer}>

        <div className={r.scoreNumber}>
            <div className={r.scoreNumSubContainer}>
            {writingScore}
            </div>
        </div>
        </div>
        </li>

        <li className={r.scoreBoardListItem}>
        <div className={r.scoreTitleContainer}>
        <div className={r.scoreTitle}>
            Organisational Score 

        </div>
        <div className={r.scoreSupportText}>

            Slightly Impacted 
        </div>
        </div>

        <div className={r.scoreNumberContainer}>
        <div className={r.scoreNumber}>
            <div className={r.scoreNumSubContainer}>
            {organisationalScore}
            </div>
        </div>
        </div>
        </li>


        <li className={r.scoreBoardListItem}>
        <div className={r.scoreTitleContainer}>
        <div className={r.scoreTitle}>
            Exam Score 
        </div>
        <div className={r.scoreSupportText}>
            Slightly Impacted 
        </div>
        </div>


        <div className={r.scoreNumberContainer}>

        <div className={r.scoreNumber}>
            <div className={r.scoreNumSubContainer}>
                {examResultsScore}
            </div>
        </div>
        </div>
        </li>
        </ul>
        </div>
        </section>

                <section className={r.learnMoreCTAContainer}>
                <div className={r.learnMoreCTASubContainer}>
                <div className={r.CTATextContainer}>
                    <div className={r.CTATextSubContainer}>
                        <h4 className={r.CTAText}>
                        {/* Take Quiz  */}

                        </h4>
                    </div>
                </div>
                <article className={r.CTAButtonContainer}>
                    <div className={r.CTAButtonSubContainer}>
                        <button className={r.CTAButton} onClick={() => router.push('/')}  >

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