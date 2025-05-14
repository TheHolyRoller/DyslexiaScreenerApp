'use client';

import { Inter, Josefin_Sans } from "next/font/google";
import "./globals.css";
import { UserProvider } from "./lib/context/UserContext";
import { QuizProvider } from "./lib/context/QuizContext";
import Navbar from './Components/Navbar'; 
import Footer from './Components/Footer1'; 
import Start from './Components/Start'; 

  
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Add Josefin Sans font
const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin-sans",
  display: "swap",
});

export default function RootLayout({ children }) {
  
  
  
  return (
    <html lang="en">
      <head>
        <title>Dyslexia Quiz App</title>
        <meta name="description" content="A quiz application to help identify signs of dyslexia" />
      </head>
      <body className={`${inter.variable} ${josefinSans.variable} antialiased`}>
      <Navbar/>
        <UserProvider>
          <QuizProvider>
            {children}
          </QuizProvider>
        </UserProvider>
        <Footer/> 
        

      </body>
    </html>
  );
}
