import React from 'react';
import { Link } from 'react-router-dom';
import './Welcomepage.css';

const Welcomepage = () => {
  return (

    <div className='Welcome-container'>

    {/*left side of the page*/}
    <div className='left'>
      <img src="/images/MAK.png"alt="MUK LOGO" />
      <h4 className='university'>MAKERERE UNIVERSITY</h4>

      {/*AITS WELCOME TITLE*/}
      <div className= 'card'>
        <h1 className= 'title'>AITS</h1>
        <h2 className= 'semi-title'>ACADEMIC ISSUE TRACKING SYSTEM</h2>
        <p className= ' motto'>
          "Streamline your Academic concerns with our efficient issue tracking system. Submit, track and resolve your Academic matters seamlessly."
        </p>
        <h3>Get Started Today!</h3>
        </div>

        {/*Buttons for the user to navigate to the login page or the signup page*/}    
        <div className= 'buttons'>
          <Link to='/signup' className= 'btn'>REGISTER TO START</Link>
          <Link to='/login' className= 'btn'>LOGIN TO YOUR ACCOUNT</Link> 
        </div>

        {/*Footer at the bottom of the page */}
        <footer>
          <p> &copy; 2025 AITS. All rights reserved.</p>
          </footer>
         </div>
         {/*right side of the page */}
         <div className= 'right' style={{ backgroundImage: 'url("/images/pic.jpg")' }}></div> 
         </div>

  );
}
export default Welcomepage;