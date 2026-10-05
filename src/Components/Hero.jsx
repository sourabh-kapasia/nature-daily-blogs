"use client";
import React from "react";

const Hero = ({ onExploreClick, onSubscribeClick }) => {
  const handleExplore = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      const section = document.getElementById("blogs-section");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-glow hero-glow-1" />
      <div className="hero-glow hero-glow-2" />

      <div className="hero-content">
        <span className="hero-tag">🌿 Nature &amp; Beyond</span>
        <h1 className="hero-title">
          Nature <span className="hero-title-accent">Daily Blogs</span>
        </h1>
        <p className="hero-subtitle">
          Thoughtful stories on Technology, Startup culture, and the art of
          living well — crafted for curious minds.
        </p>
        <div className="hero-cta-row">
          <button className="hero-btn-primary" onClick={handleExplore}>
            Explore Blogs
          </button>
          <button className="hero-btn-secondary" onClick={onSubscribeClick}>
            Subscribe Free
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

