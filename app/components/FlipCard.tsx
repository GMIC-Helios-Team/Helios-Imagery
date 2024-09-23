// components/FlipCard.tsx
import React, { useState } from 'react';
import './FlipCard.css'; // Import the CSS file for styling

const FlipCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`flip-card ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <h2>Front Side</h2>
          <p>This is the front side content.</p>
        </div>
        <div className="flip-card-back">
          <h2>Back Side</h2>
          <p>This is the back side content.</p>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;