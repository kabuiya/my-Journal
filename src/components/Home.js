import React from 'react';
import '../styles.css';
import quotes from './quotes';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


// homepage
const Home = () => {

  const [displayQuote, setQuote] = useState(quotes[1].quote);
  const isAuthenticated = !!localStorage.getItem('token');
 useEffect(() => {
    function displayRandomQuote() {
      const  randomQuote = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[ randomQuote].quote);
    }
   displayRandomQuote();

   const intervalId = setInterval(displayRandomQuote, 10000);
     return () => clearInterval(intervalId);
  }, []);

  return (
    <div className=' bg_image base_fullHeight base_flexColumn base_flexCenter'>
      <h1>My Diary</h1>
      <div className='layout_gap30 base_flexCenter'>
        {isAuthenticated ? (
          <>
            <Link className="button_primary" to="/dashboard">Go to Dashboard</Link>
          </>
        ) : (
          <>
            <Link className="button_primary" to="/login">Log in</Link>
            <Link className="button_primary" to="/register">Register</Link>
          </>
        )}
      </div>
      <div className='card_quote base_flexCenter text_lineHeight200 base_textWhite  bg_dark util_marginTop30 base_flexCenter'>
        <p>{ displayQuote}</p>
      </div>
      
    </div>
  );
};

export default Home;