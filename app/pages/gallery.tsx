import Jokes from '@/components/Jokes';
import React from 'react';
import { Container, Row } from 'react-bootstrap';

const GalleryPage = () => {

  return (
    <>
      <Container>
        <Row className="mb-4">
        </Row>
        <Jokes jokeType='Spooky' heading='Gallery'/>
      </Container>

    </>

  );
};

export default GalleryPage;