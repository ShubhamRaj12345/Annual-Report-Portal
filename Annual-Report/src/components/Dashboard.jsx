import { useState } from 'react';
import '../App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Dashboard() {
  const [activeModal, setActiveModal] = useState(null);
  
  const openModal = (modalId) => {
    setActiveModal(modalId);
  };
  
  const closeModal = () => {
    setActiveModal(null);
  };
  
  const cards = [
    { icon: 'fas fa-tachometer-alt', title: 'Dashboard', link: 'dashboard.html', action: 'Go to' },
    { icon: 'fas fa-book', title: 'Research', link: 'research.html', action: 'View' },
    { icon: 'fas fa-dollar-sign', title: 'Finance', link: 'finance.html', action: 'View' },
    { icon: 'fas fa-building', title: 'Infrastructure', link: 'infrastructure.html', action: 'View' },
    { icon: 'fas fa-graduation-cap', title: 'Academics', link: 'academics.html', action: 'View' },
    { icon: 'fas fa-users', title: 'Collaboration', link: 'collaboration.html', action: 'View' },
    { icon: 'fas fa-clipboard-list', title: 'Final Report', link: 'report.html', action: 'View' }
  ];

  return (
    <>
      <header>
        <h1>Annual Report Portal</h1>
      </header>
      
      <nav className="navbar">
        <div className="nav-left">
          <a href="index.html">Home</a>
          <a href="#" onClick={(e) => { e.preventDefault(); openModal('about'); }}>About</a>
          <a href="#" onClick={(e) => { e.preventDefault(); openModal('contact'); }}>Contact</a>
          <a href="#" onClick={(e) => { e.preventDefault(); openModal('help'); }}>Help</a>   
        </div>
        <div className="nav-right">
          <a href="signin.html">Sign In</a>
          <a href="signup.html" className="signup-btn">Sign Up</a>
          <a href="admin-login.html" className="admin-login-btn">Admin Login</a>
        </div>
      </nav>

      <div className="container">
        {cards.map((card, index) => (
          <div className="card" key={index}>
            <i className={card.icon}></i>
            <h3>{card.title}</h3>
            <a href={card.link}>{card.action} {card.title}</a>
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
}

export default Dashboard;
