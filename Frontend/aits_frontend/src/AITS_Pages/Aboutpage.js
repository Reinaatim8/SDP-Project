 import React  from "react"
 import "./Aboutpage.css";
 import { Link } from "react-router-dom";

 const Aboutpage = () => {

 
 return(
  <div className="Page-about">
  <div>
 {/* Fixed Navigation Bar */}
  <nav className="navbar">
  <div className="navbar-left">
    <span className="logo"><img src='/images/AITSLOGO.png' alt='logo' style={{width:'100px'}}/>
    </span>
  </div>
  <div className="navbar-right">
    <Link to="/Aboutpage" className="nav-link">ABOUT</Link>
    <Link to="/features" className="nav-link">FEATURES</Link>
    <Link to="/Aboutpage" className="nav-link">CONTACT</Link>
  </div>
</nav>
</div>


  <div className="about-content">
    <div className="aboutcard">
    <h1 style={{textAlign: 'center', textShadow:'black',color:'#f0a500'}}>ABOUT AITS</h1>
    <p className="about-paragraph">Academic Issue Tracking System (AITS) is a web-based platform designed to streamline academic issue reporting and resolution processes. AITS enables students to report academic concerns, track the progress of their issues, and receive timely feedback from lecturers.</p> 
    <p className="about-paragraph">Our goal is to provide a transparent and efficient system that enhances communication between students and lecturers, ensuring that academic issues are resolved promptly.</p>
    <img  className='logo2'src="../images/nobgmaklogo.png" alt='Muk logo' />
    
  </div>
   <br></br>
  <div className="contactcard">

    <h1 style={{textAlign: 'center',textDecoration: 'none',color:'#f0a500'}}>CONTACT US </h1>
    <p className="about-paragraph">For inquiries or assistance, please contact our support team:</p>
    <p className="about-paragraph" style={{fontWeight:'bold'}}>Email: aits@gmail.com</p>
    <p className="about-paragraph" style={{fontWeight:'bold'}}> Telephone no.: 080090045</p>
    <p className="about-paragraph" style={{fontWeight:'bold'}}> Address: Makerere University, Kampala, Uganda</p>
    <Link to={"/"} style={{fontWeight:'bold', color:'#f0a500',textDecoration:'none'}}>Back to Continue...</Link>
  </div>
  </div>
  
  {/* <footer className="footer">
    <p>&copy; 2025 AITS. All rights reserved.</p>
  </footer> */}
  </div>


 );
};
export default Aboutpage;