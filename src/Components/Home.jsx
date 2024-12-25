import React from "react";
import "../CSS/Home.css";
import bgi from "../Images/tpolyb.jpg"; // Correct import

export default function Home() {
  return (
    <div>
      {/* Hero Section with Background Image */}
      <div className="hero-section" style={{ backgroundImage: `url(${bgi})`}}>
        <video
          className="hero-video"
          autoPlay
          loop
          muted
          poster={bgi} // Fallback image for video
        >
          <source src="your-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay">
          <h1>Welcome to Fiesta</h1>
          <p>Empowering Ideas, Inspiring the Future</p>
        </div>
      </div>

      {/* About Us Section */}
      <section className="Intro-us">
        <h2>Introduction</h2>
        <p>
          Welcome to the 2nd Anniversary of Fiesta, an extraordinary event that brings together business development, entrepreneurship, environmental sustainability, and social impact—all under one roof at Thakur Polytechnic.
          Fiesta is not just an event, but a platform designed to inspire and empower individuals in their professional journeys while fostering environmental awareness and community service. This year’s celebration builds on the success of the first edition, offering an even greater variety of opportunities for growth and collaboration.
        </p>
      </section>

      {/* Last Year's Insights Section */}
      <section className="insights">
        <h2>Last Year's Insights</h2>
        <div className="insight-cards">
          <div className="insight-card">
            <h3>Events Hosted</h3>
            <p>25+ events were organized, fostering innovation and learning.</p>
          </div>
          <div className="insight-card">
            <h3>Participants</h3>
            <p>Over 10,000 participants joined us last year.</p>
          </div>
          <div className="insight-card">
            <h3>Achievements</h3>
            <p>National awards and recognitions for groundbreaking projects.</p>
          </div>
        </div>
      </section>

      <section className="about-us">
        <h2>About Us</h2>
        <p>
          In 2023, Fiesta at Thakur Polytechnic successfully brought together business development, entrepreneurship, sustainability, and social impact. From innovative showcases to workshops and seminars, Fiesta empowered participants, fostered environmental awareness, and promoted community service, resulting in great success and collaboration resulting in more than 5000 in foot-fall.
        </p>
      </section>
    </div>
  );
}
