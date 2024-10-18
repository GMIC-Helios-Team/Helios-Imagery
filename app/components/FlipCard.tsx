// components/FlipCard.tsx
import React, { useState } from 'react';
import style from '@/styles/FlipCard.module.css';
import { Profile } from '@/types/profile';
import { Card, Container, Image } from "react-bootstrap";
interface FlipCardProps {
  profile: Profile | null | undefined;
}

const FlipCard: React.FC<FlipCardProps> = ({ profile }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Container fluid>
      <div className={`${style.flipCard} ${isFlipped ? style.flipped : ''}`} onClick={handleFlip}>
        <div className={` ${style.flipCardInner} ${style.cardTextCustom}`}>
          <Card className={`${style.flipCardFront}`}>
            <Card.Body>
              <Card.Title>{profile?.front.name}</Card.Title>
              <Image src={profile?.front.image} alt={profile?.front.name} fluid width={300} height={300} />
              <Card.Title>{profile?.front.position}</Card.Title>
              <Card.Text style={{ marginTop: '10px' }}>{profile?.front.bio}</Card.Text>
            </Card.Body>
          </Card>
          <Card className={`${style.flipCardBack}`}>
            <Card.Body>
              <Card.Title>{profile?.back.name}</Card.Title>
              <Image src={profile?.back.image} alt={profile?.back.name} fluid width={300} height={300} />
              <Card.Title>{profile?.back.position}</Card.Title>
              <Card.Text style={{ marginTop: '10px' }}>{profile?.back.bio}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default FlipCard;