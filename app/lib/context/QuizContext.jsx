'use client';

/* eslint-disable no-unused-vars */
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from './UserContext';
import { databases } from '../appwrite';

// Environment variable checks
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const QUESTION_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_QUESTION_COLLECTION_ID;

// Log environment variables (without sensitive values)
console.log('🔍 Appwrite Configuration:', {
    hasDatabaseId: !!DATABASE_ID,
    hasQuestionCollectionId: !!QUESTION_COLLECTION_ID,
    environment: process.env.NODE_ENV
});



const QuizContext = createContext(null);

export const QuizProvider = ({ children }) => {
    const router = useRouter();
    const { userAge } = useUser();

    const [score, setScore] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [weights, setWeights] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState();
    const [quizLength, setQuizLength] = useState(0);
    const [finalScore, setFinalScore] = useState(0);
    const [gif_URLs, setGIF_URLS] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Category score state variables
    const [readingScore, setReadingScore] = useState(0);
    const [writingScore, setWritingScore] = useState(0);
    const [organisationalScore, setOrganisationalScore] = useState(0);
    const [memoryScore, setMemoryScore] = useState(0);
    const [examResultsScore, setExamResultsScore] = useState(0);

    const [email, setEmail] = useState(''); 

    // Monitor quiz-related state changes
    useEffect(() => {
        console.log('📊 Quiz State Update:', {
            currentIndex,
            quizLength,
            score,
            finalScore,
            currentQuestion: currentQuestion ? {
                id: currentQuestion.$id,
                section: currentQuestion.Section,
                question: currentQuestion.Question
            } : null,
            questionsCount: questions.length,
            gifURLsCount: gif_URLs?.length || 0
        });
    }, [currentIndex, quizLength, score, finalScore, currentQuestion, questions, gif_URLs]);

    // Monitor category score changes
    useEffect(() => {
        console.log('📈 Category Scores Update:', {
            reading: readingScore,
            writing: writingScore,
            organisation: organisationalScore,
            memory: memoryScore,
            exams: examResultsScore,
            totalScore: score
        });
    }, [readingScore, writingScore, organisationalScore, memoryScore, examResultsScore, score]);

    useEffect(() => {
        console.log('🔄 QuizContext: Initializing quiz data fetch');
        const fetchQuestions = async () => {
            try {
                setIsLoading(true);
                setError(null);
                
                if (!DATABASE_ID || !QUESTION_COLLECTION_ID) {
                    throw new Error('Missing required Appwrite configuration');
                }

                console.log('📥 QuizContext: Fetching questions from Appwrite');
                console.log('🔗 Appwrite Connection Details:', {
                    databaseId: DATABASE_ID,
                    collectionId: QUESTION_COLLECTION_ID
                });

                const response = await databases.listDocuments(DATABASE_ID, QUESTION_COLLECTION_ID);
                console.log('📦 Appwrite Response:', {
                    total: response.total,
                    documentsCount: response.documents?.length
                });

                if (!response.documents || response.documents.length === 0) {
                    throw new Error('No questions found in the collection');
                }

                const documents = response.documents;
                console.log(`📊 QuizContext: Retrieved ${documents.length} questions`);
                setQuestions(documents);
                
                const gifURLS = documents.map(doc => doc.GIF_URL);
                console.log(`🖼️ QuizContext: Extracted ${gifURLS.length} GIF URLs`);
                setGIF_URLS(gifURLS);
                
                console.log('🎯 QuizContext: Setting first question');
                setCurrentQuestion(documents[0]);
                setQuizLength(documents.length);
            } catch (error) {
                console.error('❌ QuizContext: Error fetching questions:', error);
                setError(error.message);
                // Log the full error for debugging
                console.error('Full error details:', {
                    name: error.name,
                    message: error.message,
                    stack: error.stack
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    const calculateScore = async (answer) => {
        if (!currentQuestion || answer === 'noop') {
            console.log('⏭️ QuizContext: Skipping score calculation - no question or noop answer');
            return;
        }

        console.log(`🎯 QuizContext: Calculating score for answer: ${answer}`);
        const { 
            adult_yes_weight, 
            adult_no_weight, 
            adult_maybe_weight, 
            child_maybe_weight, 
            child_no_weight, 
            child_yes_weight,
            Section 
        } = currentQuestion;

        console.log(`📊 QuizContext: Current section: ${Section}`);

        const updateScoreCategory = (type, score) => {
            console.log(`📈 QuizContext: Updating ${type} score by ${score}`);
            const scoreSetters = {
                reading: setReadingScore,
                writing: setWritingScore,
                organisation: setOrganisationalScore,
                memory: setMemoryScore,
                exams: setExamResultsScore
            };

            const key = type.trim().toLowerCase();
            const scoreSetter = scoreSetters[key];

            if (scoreSetter) {
                scoreSetter(prevScore => prevScore + score);
            }
        };

        if (userAge === 'adult') {
            console.log('👤 QuizContext: Calculating score for adult');
            if (answer === 'yes') {
                setScore(prevScore => prevScore + adult_yes_weight);
                updateScoreCategory(Section, adult_yes_weight);
            } else if (answer === 'sometimes') {
                setScore(prevScore => prevScore + adult_maybe_weight);
                updateScoreCategory(Section, adult_maybe_weight);
            }
        } else {
            console.log('👶 QuizContext: Calculating score for child');
            if (answer === 'yes') {
                setScore(prevScore => prevScore + child_yes_weight);
                updateScoreCategory(Section, child_yes_weight);
            } else if (answer === 'sometimes') {
                setScore(prevScore => prevScore + child_maybe_weight);
                updateScoreCategory(Section, child_maybe_weight);
            }
        }
    };

    const handleAnswer = async (answer) => {
        console.log(`🎯 QuizContext: Handling answer: ${answer}`);
        const question = questions[currentIndex];
        setCurrentQuestion(question);
        await calculateScore(answer);

        if (currentIndex < quizLength - 1) {
            console.log(`📝 QuizContext: Moving to next question (${currentIndex + 1}/${quizLength})`);
            setCurrentIndex(prevIndex => prevIndex + 1);
        } else {
            console.log('🏁 QuizContext: Quiz completed, setting final score');
            setFinalScore(score);
            router.push('/email-permissions');
        }
    };

    return (
        <QuizContext.Provider value={{
            currentIndex,
            handleAnswer,
            questions,
            currentQuestion,
            quizLength,
            finalScore,
            score,
            memoryScore,
            writingScore,
            readingScore,
            examResultsScore,
            organisationalScore,
            gif_URLs,
            email, 
            setEmail,
            isLoading,
            error
        }}>
            {children}
        </QuizContext.Provider>
    );
};

export const useQuiz = () => {
    const context = useContext(QuizContext);
    if (!context) {
        console.error('❌ QuizContext: useQuiz must be used within QuizProvider');
        throw new Error("useQuiz must be used within QuizProvider");
    }
    return context;
};