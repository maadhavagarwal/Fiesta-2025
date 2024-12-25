import React from 'react';
import '../CSS/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; 2024 Your Company</p>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">Twitter</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">LinkedIn</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">Instagram</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
