import React, { useState } from 'react';
import './style.css';

const AnnualReportPortal = () => {
  const [activeModal, setActiveModal] = useState(null);
  
  const openModal = (modalId) => {
    setActiveModal(modalId);
  };
  
  const closeModal = () => {
    setActiveModal(null);
  };
  
  const cards = [
    { icon: 'fas fa-tachometer-alt', title: 'Dashboard', link: 'dashboard.html' },
    { icon: 'fas fa-book', title: 'Research', link: 'research.html' },
    { icon: 'fas fa-dollar-sign', title: 'Finance', link: 'finance.html' },
    { icon: 'fas fa-building', title: 'Infrastructure', link: 'infrastructure.html' },
    { icon: 'fas fa-graduation-cap', title: 'Academics', link: 'academics.html' },
    { icon: 'fas fa-users', title: 'Collaboration', link: 'collaboration.html' },
    { icon: 'fas fa-clipboard-list', title: 'Final Report', link: 'report.html' }
  ];

  return (
    <>
      <header>
        <h1>Annual Report Portal</h1>
      </header>
      
      <nav>
        <div className="nav-left">
          <a href="index.html">Home</a>
          <a href="#" onClick={(e) => { e.preventDefault(); openModal('about'); }}>About</a>
          <a href="#" onClick={(e) => { e.preventDefault(); openModal('contact'); }}>Contact</a>
          <a href="#" onClick={(e) => { e.preventDefault(); openModal('help'); }}>Help</a>   
        </div>
        <div className="nav-right">
          <a href="signin.html">Sign In</a>
          <a href="signup.html" className="signup-btn">Sign Up</a>
        </div>
      </nav>

      <div className="container">
        {cards.map((card, index) => (
          <div className="card" key={index}>
            <i className={card.icon}></i>
            <h3>{card.title}</h3>
            <a href={card.link}>View {card.title}</a>
          </div>
        ))}
      </div>

      <footer>
        <p>&copy; 2025 Institute Annual Report Portal</p>
      </footer>

      {/* Modal Components */}
      {activeModal === 'about' && (
        <div className="modal" id="about">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>About Us</h2>
            <p>Information about the institute's annual report process...</p>
          </div>
        </div>
      )}

      {activeModal === 'contact' && (
        <div className="modal" id="contact">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Contact Us</h2>
            <p>Contact information goes here...</p>
          </div>
        </div>
      )}

      {activeModal === 'help' && (
        <div className="modal" id="help">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Help</h2>
            <p>Help and support details go here...</p>
          </div>
        </div>
      )}
    </>
  );
};

export default AnnualReportPortal;