import HeroSection from '@/components/HeroImage';
import React from 'react';
import { Card, Col, Container, Row} from 'react-bootstrap';

const HomePage = () => {

  return (
    <>
      <Container
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          marginTop: '50px',
          padding: 0,
        }}>             
        <HeroSection />
      </Container>

    </>

  );
};

export default HomePage;