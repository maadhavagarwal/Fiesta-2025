import React from "react";
import "../CSS/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import iicLogo from "../Images/IIC logo.png";
import AICTClogo from "../Images/AICTC logo.png";
import nssLogo from "../Images/nssLogo.png";
import gcLogo from "../Images/gcLogo.png";
// import tpolyLogo from "../Images/Tpoly logo.png";
import fiestaLogo from "../Images/fiestaLogo.png";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black">
      <div className="container-fluid">
        {/* Logo Section */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          {/* <img src={fiestaLogo} alt="TPoly Logo" className="logo" />
          <img src={tpolyLogo} alt="TPoly Logo" className="logo" /> */}
          <span className="ms-2">Fiesta</span>
        </Link>

        {/* Offcanvas Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Offcanvas Menu */}
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
           
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            {/* Logos */}
            <div className="d-flex justify-content-center flex-wrap gap-2 mb-4">
              <img src={iicLogo} alt="IIC Logo" className="logo" />
              <img src={nssLogo} alt="NSS Logo" className="logo" />
              <img src={AICTClogo} alt="AICTC Logo" className="logo" />
              <img src={gcLogo} alt="GC Logo" className="logo" />
              <img src={fiestaLogo} alt="Fiesta Logo" className="logo" />
            </div>

            {/* Navigation Links */}
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <button
                  className="btn navbtn"
                  onClick={() => navigate("/")}
                  data-bs-dismiss="offcanvas"
                >
                  Home
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="btn navbtn"
                  onClick={() => navigate("/events")}
                  data-bs-dismiss="offcanvas"
                >
                  Events
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
