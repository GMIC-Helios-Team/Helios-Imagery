import HeroSection from '@/components/HeroImage';
import React  from 'react';
import { Col, Container,  Row } from 'react-bootstrap';
import LeaderBoard from '@/components/Leaderboard';

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
        <Row className="mb-4">
          <Col >
            <HeroSection />
          </Col>
        </Row>
      </Container>
      <LeaderBoard />
    </>

  );
};

export default HomePage;
