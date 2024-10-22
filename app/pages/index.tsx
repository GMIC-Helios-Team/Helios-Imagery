import HeroSection from '@/components/HeroImage';
import React from 'react';
import { Container} from 'react-bootstrap';

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