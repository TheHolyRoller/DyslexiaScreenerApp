'use client';

// import them from appwrite here 

import { Client, Databases, Account } from 'appwrite'; 

// Debug environment variables
console.log('Environment variables check:', {
  projectID: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
  databaseID: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
  questionCollectionID: process.env.NEXT_PUBLIC_APPWRITE_QUESTION_COLLECTION_ID,
});

// Use fallbacks for all required environment variables
const projectID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || 'new-quiz'; 
const databaseID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'quiz-database';
const questionCollectionID = process.env.NEXT_PUBLIC_APPWRITE_QUESTION_COLLECTION_ID || 'questions_collection';


console.log('Using Appwrite configuration:', {
  projectID,
  databaseID,
  questionCollectionID
});

if (!projectID) {
  console.error('Warning: NEXT_PUBLIC_APPWRITE_PROJECT_ID is not defined, using fallback');
}

// Create the client instance here 

const client = new Client(); 

client.setEndpoint("https://api.dyslexiaquiz.com/v1")
.setProject(projectID); 


// Work out how to fix this error 
// export const storage = new Storage(client);

export const account = new Account(client); 
console.log('this is the client object \n', client); 

export const databases = new Databases(client); 

// Export configuration for use in other files
export const appwriteConfig = {
  projectID,
  databaseID,
  questionCollectionID
};

export const verifyConnection = async () => {
  try {
    const response = await account.get();
    return response;
  } catch (error) {
    console.error('Appwrite connection error:', error);
    throw error;
  }
};