// components/HeroSection.js
import React from 'react';
import styles from '@/styles/HeroSection.module.css';

const HeroSection = () => {
  return (
    <div className={styles.heroContainer}>
      <video
        className={styles.heroVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source
          src="https://cdn.helios.gallery/Helios-Hero-Video/helios-hero-image.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className={styles.videoOverlay}></div>
      <div className={styles.overlayText}>
        <h1>HELIOS & DEP</h1>
        <p>Brilliance Meets Whimsy</p>
      </div>
    </div>
  );
};

export default HeroSection;
