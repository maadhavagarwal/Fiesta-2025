import React from "react";
import "../CSS/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import iicLogo from "../Images/IIC logo.png";
import AICTClogo from "../Images/AICTC logo.png";
import nssLogo from "../Images/nssLogo.png";
import gcLogo from "../Images/gcLogo.png";
import fiestaLogo from "../Images/fiestaLogo.png";
import iicMoe from "../Images/iicMoe.png";
import TsecLogo from "../Images/TsecLogo.png";
import Moe from "../Images/MOE2.png"
import tpolyL from "../Images/tpolyLogo.png"; // 
import MoeI from "../Images/MOE1.png"
import UNI from "../Images/uni.png"

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black mb-3">
      <div className="container-fluid">
        {/* Brand Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={fiestaLogo} alt="Fiesta Logo" className="logo me-2" style={{height: "50px",width: "75px"}} />
          <span>Fiesta</span>
        </Link>
<img src={tpolyL} alt="TPO Logo" className="logo me-2" style={{height: "50px",width: "75px"}} />
<img src={TsecLogo} alt="TPO Logo" className="logo " style={{height: "70px",width: "95px"}} />

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Offcanvas */}
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              Menu
            </h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body" style={{ alignItems: "center" }}>
            {/* Logos */}
            <div className="d-flex justify-content-center flex-wrap gap-2 mb-">
              <img src={iicLogo} alt="IIC Logo" className="logo"  />
              <img src={nssLogo} alt="NSS Logo" className="logo" />
              <img src={AICTClogo} alt="AICTC Logo" className="logo" />
              <img src={gcLogo} alt="GC Logo" className="logo" />
              <img src={iicMoe} alt="iicMoe Logo" className="logo" />
              <img src={UNI} alt="iicMoe Logo" className="logo" />
              <img src={Moe} alt="iicMoe Logo" className="logo1" />
              <img src={MoeI} alt="iicMoe Logo" className="logo1" />
            </div>

            {/* Nav Links */}
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
              {/* <li className="nav-item">
                <button
                  className="btn navbtn"
                  onClick={() => navigate("/seminars")}
                  data-bs-dismiss="offcanvas"
                >
                  Seminars
                </button>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
