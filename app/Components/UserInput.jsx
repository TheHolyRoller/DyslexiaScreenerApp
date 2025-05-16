'use client'
import React from 'react'
import i from '../Styles/UserInput.module.css'; 
import { useState, useEffect } from 'react';  
import { useUser } from '../lib/context/UserContext'; 
import { useQuiz } from '../lib/context/QuizContext';
import { useReducer } from 'react';
import { useRouter } from 'next/navigation';


function UserInput() {


  const router = useRouter();
  const { handleAnswer } = useQuiz();
  const { setUserName } = useUser();
  const [userName, setName] = useState('');

  const handleChange = (e) => {
      e.preventDefault();
      setName(e.target.value);
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      setUserName(userName);
      // handleAnswer('noop');

      setTimeout(() => {
          router.push('/quiz');
      }, 210);
  };


  return (

    <section className={i.mainUserNameSection}>
    <article className={i.userNameContainer}>
    <form onSubmit={handleSubmit} className={i.detailsForm}>



    <label className={i.nameLabel} >Enter Name</label>

    <input placeholder='Enter your name'
        id="name"
        type="text"
        value={userName}
        onChange={handleChange} 
        required                                                                       
        className={i.userNameInput}
     ></input>


<aside className={i.buttonSectionContainer}>

<button type='submit' className={i.userInputButton}>

  Confirm 

</button>


</aside>

    </form>
    </article>

    {/* Add in the button section here  */}
   

    </section>


  )
}

export default UserInput