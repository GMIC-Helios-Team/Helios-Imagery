// components/FlipCard.tsx
import React, { useState } from 'react';
import style from '@/styles/FlipCard.module.css';

const FlipCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`${style.flipCard} ${isFlipped ? style.flipped : ''} `} onClick={handleFlip}>
      <div className={style.flipCardInner}>
        <div className={style.flipCardFront}>
          <h2>Front Side</h2>
          <p>This is the front side content.</p>
        </div>
        <div className={style.flipCardBack}>
          <h2>Back Side</h2>
          <p>This is the back side content.</p>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;