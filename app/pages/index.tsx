import Jokes from '@/components/Jokes';
import React from 'react';
import { Card, Col, Container, Row} from 'react-bootstrap';

const HomePage = () => {

  return (
    <>
      <Container style={{ marginTop: '50px' }}>
        <Row className="mb-4">
          <Col md={{ offset: 3, span: 6 }}>
            <Card bg="dark" text='white'>
              <Card.Header>Home</Card.Header>
              <Card.Img variant="top" src="/robot.png" alt="Home Page Card" width={300} height={200} style={{padding:'5px'}}/>
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

export default HomePage;