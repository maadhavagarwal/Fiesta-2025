import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import "../CSS/Home.css";
import videoFile from "../Images/Fiesta 2.mp4"; // Video file
import iicLogo from "../Images/IIC logo.png"; // IIC logo
import tpolyL from "../Images/tpolyLogo.png"; // Thakur Polytechnic logo
import nssLogo from "../Images/nssLogo.png"; // NSS logo
import gcLogo from "../Images/gcLogo.png"; // Green Club logo
import TsecLogo from "../Images/TsecLogo.png"



export default function Home() {
  const [carouselActive, setCarouselActive] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  // const carouselRef = useRef(null);
  const cardsRef = useRef(null); // Reference for the About Us cards section

  const carouselRef = useRef(null);

  const images = [
    "s1.png",
    "s2.png",
    "s3.png",
    "s4.png",
    "s5.png",
    "s6.png",
  ];

  const duplicatedImages = [...images, ...images]; // Duplicate the images

  useEffect(() => {
    const carousel = carouselRef.current;
    let scrollInterval;

    const startScroll = () => {
      scrollInterval = setInterval(() => {
        if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
          // Reset scroll to the start of the original images
          carousel.scrollLeft = 0;
        } else {
          carousel.scrollLeft += 1; // Increment scroll position
        }
      }, 20); // Adjust speed as needed
    };

    startScroll();

    // Cleanup on component unmount
    return () => {
      clearInterval(scrollInterval);
    };
  }, []);

  const navigate = useNavigate();

  // Intersection Observer for Carousel Section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCarouselActive(true);
        } else {
          setCarouselActive(false);
        }
      },
      {
        threshold: 0.5,
      }
    );
    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }
    return () => {
      if (carouselRef.current) {
        observer.unobserve(carouselRef.current);
      }
    };
  }, []);

  // Intersection Observer for About Us Cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCardsVisible(true);
        }
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is visible
      }
    );
    if (cardsRef.current) {
      observer.observe(cardsRef.current);
    }
    return () => {
      if (cardsRef.current) {
        observer.unobserve(cardsRef.current);
      }
    };
  }, []);

  return (
    <div>
      {/* Hero Section with Video Only */}
      <div className="hero-section">
        <video
          className="hero-video"
          autoPlay
          loop
          muted
        >
          <source src={videoFile} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Introduction Section */}
      <section className="Intro-us">
        <h2>Introduction</h2>
        <p>
          Welcome to the 2nd Anniversary of Fiesta!
          Fiesta is an extraordinary event that brings together business development, entrepreneurship, environmental sustainability, and social impact—all under one roof at Thakur Polytechnic.
          Fiesta 2024 builds on the success of the first edition, offering an even greater variety of opportunities for growth and collaboration. This year, the event focuses on creating synergies between business leaders, aspiring entrepreneurs, industry experts, and social activists. Participants will have access to workshops, keynote sessions, and panel discussions that address the pressing issues of our time, from building sustainable businesses to creating positive social change.
        </p>
      </section>

      {/* Last Year's Insights Section */}
      <section className="insights my-2">
        <h2 className="text-center">Last Year's Insights</h2>
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

      {/* Carousel Section for Last Year's Images */}
      <h2 className="text-center my-2">Last Year's Highlights</h2>
      <section className="carousel-section" ref={carouselRef}>
        {/* <h2>Last Year's Highlights</h2> */}
        <div className="carousel-container">
      <div className="carousel" ref={carouselRef}>
        {duplicatedImages.map((image, index) => (
          <img
            key={index}
            src={require(`../Images/${image}`)} // Adjust the path if necessary
            alt={`Image ${index + 1}`}
            className="carousel-image"
          />
        ))}
      </div>
    </div>
      </section>

      {/* About Us Section with Animation */}
      <section className="about-us" ref={cardsRef}>
        <h2>About Us</h2>
        <p>
          Thakur Polytechnic (Tpoly), established in 1998, is affiliated with MSBTE and offers AICTE-approved courses recognized by the Government of Maharashtra.
        </p>
        <div className={`about-us-cards ${cardsVisible ? "animate-cards" : ""}`}>
          <div className="about-us-card">
            <img src={tpolyL} alt="Thakur Polytechnic" />
            <h3>Thakur Polytechnic</h3>
            <p>Thakur Polytechnic is accredited by NBA and has received several awards.</p>
          </div>
          <div className="about-us-card">
            <img src={TsecLogo} alt="Thakur Polytechnic" />
            <h3>Thakur Shyamnarayan Engineering College</h3>
            {/* <p>Thakur Polytechnic is accredited by NBA and has received several awards.</p> */}
          </div>
          <div className="about-us-card">
            <img src={iicLogo} alt="IIC" />
            <h3>IIC</h3>
            <p>Thakur Polytechnic's Institution Innovation Council (IIC) fosters innovation and entrepreneurship.</p>
          </div>
          <div className="about-us-card">
            <img src={gcLogo} alt="Green Club" />
            <h3>Green Club</h3>
            <p>The Green Club promotes sustainable living and environmental awareness.</p>
          </div>
          <div className="about-us-card">
            <img src={nssLogo} alt="NSS" />
            <h3>NSS</h3>
            <p>NSS activities at Thakur Polytechnic reflect a commitment to societal well-being and positive change.</p>
          </div>
              </div>
      </section>
    </div>
  );
}
