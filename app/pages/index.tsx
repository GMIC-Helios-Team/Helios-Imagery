import Jokes from '@/components/Jokes';
import React from 'react';
import { Container, Row } from 'react-bootstrap';

const HomePage = () => {

  return (
    <>
      <Container>
        <Row className="mb-4">
        </Row>
          <Jokes jokeType='Programming' heading='Home'/>
      </Container>

    </>

  );
};

export default HomePage;