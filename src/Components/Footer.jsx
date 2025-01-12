import React from 'react';
import '../CSS/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
            <h4>Contact Us</h4>
        <div className="footer-content">
          {/* Contact Information Section (Left) */}
          <div className="contact-info">
            <ul className='text-start'>
              <li>Dhanesh Shetty +91 8591604650</li>
              <li>Ritesh Upadhyay +91 77100 72532</li>
              <li>Gargi Surse +91 70410 76454</li>
              <li>Kaustubh Shinde +91 91368 64492</li>
              <li>Khushi Chauhan +91 91522 09326</li>
              <li>Parth Rane (Faculty) +91 90829 13961</li>
              <li>Hrishikesh +91 70209 91887</li>

            </ul>
          </div>

          {/* Social Icons Section (Right) */}
          <div className="social-icons text-start">
            {/* <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">Twitter</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">LinkedIn</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">Instagram</a> */}
          </div>
        </div>
        
        {/* <p>&copy; 2025 Fiesta Tpoly</p> */}
      </div>
    </footer>
  );
}

export default Footer;
