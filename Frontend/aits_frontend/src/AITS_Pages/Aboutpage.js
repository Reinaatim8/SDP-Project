 import React  from "react"
 import "./Aboutpage.css";
 import { Link } from "react-router-dom";
 import { useNavigate } from "react-router-dom";

 const Aboutpage = () => {
const navigate = useNavigate();
 
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
    <Link to="/Aboutpage" className="nav-link">CONTACT US</Link>
  </div>
</nav>
</div>


  <div className="about-content">
    <div className="aboutcard">
    <button onClick={() => navigate(-1)} className="back-button" style={{  backgroundColor: "#f0a500",
    color: "black",
    padding: "0", /* Use rem for padding */
    textDecoration: "none",
    borderRadius: "0px",
   fontWeight:" bolder"}}>
   ← Back to Continue...
    </button>
    <h1 style={{textAlign: 'center', textShadow:'black',color:'#f0a500'}}>ABOUT AITS</h1>
    <p className="about-paragraph">Academic Issue Tracking System (AITS) is a web-based platform designed to streamline academic issue reporting and resolution processes. AITS enables students to report academic concerns, track the progress of their issues, and receive timely feedback from lecturers.</p> 
    <p className="about-paragraph">Our goal is to provide a transparent and efficient system that enhances communication between students and lecturers, ensuring that academic issues are resolved promptly.</p>

    <img  className='logo2'src="../images/nobgmaklogo.png" alt='Muk logo' />

  </div>
   <br></br>
  <div className="contactcard">

    <h1 style={{textAlign: 'center',textDecoration: 'none',color:'#f0a500'}}>CONTACT US </h1>
    <p className="about-paragraph">For inquiries or assistance, please contact our support team:</p>
    <p className="about-paragraph" style={{fontWeight:'bold'}}>Email: makerereaits@gmail.com</p>
    <p className="about-paragraph" style={{fontWeight:'bold'}}> Telephone no.: 080090045</p>
    <p className="about-paragraph" style={{fontWeight:'bold'}}> Address: Makerere University, Kampala, Uganda</p>
    

  </div>
  </div>
  
  {/* <footer className="footer">
    <p>&copy; 2025 AITS. All rights reserved.</p>
  </footer> */}
  </div>


 );
};
export default Aboutpage;