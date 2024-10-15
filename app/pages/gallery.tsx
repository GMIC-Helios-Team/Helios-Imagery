import Jokes from '@/components/Jokes';
import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

const GalleryPage = () => {

  return (
    <>
      <Container style={{ marginTop: '50px' }}>
        <Row className="mb-4">
          <Col md={{ offset: 3, span: 6 }}>
            <Card>
              <Card.Header>Gallery Image</Card.Header>
              <Card.Img variant="bottom" src="/happy-helios.png" alt="Home Page Card" width={500} height={500} style={{padding:'2px'}}/>
              <Card.Body>
                <Jokes />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

    </>

  );
};

export default GalleryPage;