import Image from 'next/image';
import q from '../Styles/Quiz.module.css';

const QuizCard = ({ 
    questionText, 
    audio_URL, 
    Section, 
    currentIMG,
    currentQuestion 
}) => {

    console.log("Rendering QuizCard with the following props:");
    console.log("Question Text:", questionText);
    console.log("Audio URL:", audio_URL);
    console.log("Section:", Section);
    console.log("Current Image:", currentIMG);
    console.log("Current Question:", currentQuestion);


    return (

        <>
        <article className={q.card}>
            <div className={q.cardCategoryColorContainer} style={{outline: '0px solid red'}}>
                {audio_URL && (
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

            {questionText && (
                <div className={q.questionTextContainer} style={{outline: '0px solid red', color: 'black', position: 'relative', zIndex: '9999', marginTop: '1em', marginBottom: '5rem'}} >
                    <h2 className={q.questionText}>
                        {questionText}
                        <span>
                            {currentQuestion?.questionText}
                        </span>
                    </h2>
                </div>
            )}
            
            <div className={q.imageSectionContainer}>
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
                                marginTop: '-2rem',
                                objectFit: 'contain'
                            }}
                        />
                    )}
                </div>
            </div>
                    
            <article className={q.card} id={q.cardThree}></article>
            <article className={q.card} id={q.cardTwo}></article>
            <article className={q.card} id={q.cardFour}></article>
        </article>
        </>
    );
};

export default QuizCard; 