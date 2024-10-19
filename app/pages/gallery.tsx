import Jokes from '@/components/Jokes';
import React from 'react';
import { Card, Col, Container, Row, Image, Alert } from 'react-bootstrap';
import { useTheme } from '../contexts/theme-context';

const GalleryPage = () => {  
  const { isDarkTheme } = useTheme();

  return (
    <>
      <Container style={{ marginTop: '50px' }}>
        <Row className="mb-4">
          <Col md={{ offset: 3, span: 6 }}>
            <Card className={`${isDarkTheme ? 'bg-dark text-light' : 'LightThemeBG text-dark'}`}>
              <Card.Header>Gallery Image</Card.Header>
              <Alert variant="light">
                <Image src="/happy-helios.png" alt="Gallery Card" fluid roundedCircle width={200} height={200} style={{ padding: '2px' }} />
              </Alert>
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