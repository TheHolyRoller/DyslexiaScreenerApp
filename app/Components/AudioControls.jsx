'use client'
import React from 'react'
import au from '../Styles/AudioControls.module.css'; 
import { useUser } from '../lib/context/UserContext';
// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';



function AudioControls() {
  
  
    const router = useRouter();
    const { setUserSound } = useUser();

    const handleSoundChoice = (soundEnabled) => {
        setUserSound(soundEnabled);
        router.push('/type');
    };
  
  
  
    return (

    <section className={au.mainAnswerContainer}>
    <article className={au.answerSection}>
        <div className={au.buttonList}>

        <div className={au.buttonStackContainer}  onClick={() => handleSoundChoice(true)}>
        <div className={au.button} id={au.onButton} onClick={() => handleSoundChoice(true)} >

            Audio On 

        </div>

        <div className={au.buttonStack} id={au.noStackOne}></div>
        <div className={au.buttonStack} id={au.noStackTwo}></div>
        <div className={au.buttonStack} id={au.noStackThree}></div>
        <div className={au.buttonStack} id={au.noStackFour}></div>
        <div className={au.buttonStack} id={au.noStackFive}></div>
        <div className={au.buttonStack} id={au.noStackSix}></div>

        </div>


        <div className={au.buttonStackContainer}  onClick={() => handleSoundChoice(false)}>
        <div className={au.button} id={au.offButton}  onClick={() => handleSoundChoice(false)}>


            Audio Off 
            
        </div>

        <div className={au.buttonStack} id={au.yesStackOne}></div>
        <div className={au.buttonStack} id={au.yesStackTwo}></div>
        <div className={au.buttonStack} id={au.yesStackThree}></div>
        <div className={au.buttonStack} id={au.yesStackFour}></div>
        <div className={au.buttonStack} id={au.yesStackFive}></div>
        <div className={au.buttonStack} id={au.yesStackSix}></div>

        </div>
        </div>


    </article>
    </section>
  )
}

export default AudioControls