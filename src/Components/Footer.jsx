import React from 'react';
import '../CSS/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Contact Information Section (Left) */}
          <div className="contact-info">
            <h4>Contact Persons</h4>
            <ul>
              <li>Dhanesh Shetty +91 8591604650</li>
              <li>Ritesh Upadhyay +91 77100 72532</li>
              <li>Gargi Surse +91 70410 76454</li>
              <li>Kaustubh Shinde +91 91368 64492</li>
              <li>Khushi Chauhan +91 91522 09326</li>
              <li>Parth Rane +91 90829 13961</li>

            </ul>
          </div>

          {/* Social Icons Section (Right) */}
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">Twitter</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">LinkedIn</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">Instagram</a>
          </div>
        </div>
        
        {/* <p>&copy; 2025 Fiesta Tpoly</p> */}
      </div>
    </footer>
  );
}

export default Footer;
