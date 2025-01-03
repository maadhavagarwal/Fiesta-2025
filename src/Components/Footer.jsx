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
              <li>John Doe - +1234567890</li>
              <li>Jane Smith - +0987654321</li>
              <li>Michael Brown - +1122334455</li>
              <li>Emily Johnson - +2233445566</li>
              <li>David Wilson - +3344556677</li>
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
