'use client';

// import them from appwrite here 

import { Client, Databases, Account, Storage } from 'appwrite'; 
// IMPORT THE CREDS HERE USING VITE AND THE .ENV PAGAGE 
const projectID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID; 



if (!projectID) {
  throw new Error('NEXT_PUBLIC_APPWRITE_PROJECT_ID is not defined');
  console.log('No PROJECT ID \n'); 
}

// Create the client instance here 

const client = new Client(); 

client.setEndpoint("https://api.dyslexiaquiz.com/v1")
.setProject(projectID); 


export const storage = new Storage(client);


export const account = new Account(client); 
console.log('this is the client object \n', client); 

export const databases = new Databases(client); 

export const verifyConnection = async () => {
  try {
    const response = await account.get();
    return response;
  } catch (error) {
    console.error('Appwrite connection error:', error);
    throw error;
  }
};