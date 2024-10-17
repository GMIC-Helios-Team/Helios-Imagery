import React, { useState, useEffect } from 'react';
import FlipCard from '@/components/FlipCard';
import { Row, Col, Container, Card } from 'react-bootstrap';

const ProfilePage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Render nothing on the server
  }

  return (
    <>
      <Container style={{ marginTop: '50px' }}>
        <Row className="mb-4">
          <Col md={{ offset: 3, span: 6 }}>
            <Card>
              <Card.Header>Profiles</Card.Header>
              <Card.Body>
                <Card.Text>
                  <FlipCard />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfilePage;