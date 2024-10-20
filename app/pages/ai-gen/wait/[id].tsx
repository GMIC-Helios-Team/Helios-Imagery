import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Jokes from '@/components/Jokes';
import { Alert, Button, Card, Col, Container, Row } from 'react-bootstrap';
import { fetchImage } from '@/helpers/get-generated-image-api';

const Wait = () => {
  const [isTimeout, setIsTimeout] = useState<boolean>(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    let elapsedTime = 0;
    const interval = 10000; // 10 seconds
    const maxTime = 50000; // 50 seconds

    const intervalId = setInterval(async () => {
      if (elapsedTime >= maxTime) {
        clearInterval(intervalId);
        setIsTimeout(true);
        return;
      }

      console.log('Issuing API request');
      try {
        const generatedImage = await fetchImage(id as string);  
        if (generatedImage.imagefilename) {
          clearInterval(intervalId);
          router.push(`/gallery/image/${id}`);
        }
      } catch (error) {
        console.error('API request failed:', error);
        clearInterval(intervalId);
        router.push(`/gallery/image/${id}`);        
        return;
      }

      elapsedTime += interval;
    }, interval);

    return () => clearInterval(intervalId);
  }, [id, router]);

  return (
    <Container style={{ marginTop: '50px' }}>
      <Row className="mb-4">
        <Col md={{ offset: 3, span: 6 }}>
          {isTimeout ? (<TimeoutImage />) : (<LaughWhileYouWait />)}
        </Col>
      </Row>
    </Container>

  );
};


export default Wait;

const TimeoutImage = () => (
  <>
    <Card >
      <Card.Header>Sorry for the delay</Card.Header>
      <Card.Body>
      <Card.Img variant="top" src="/ImageGenerationTimeout.png" alt="Image Generation Timeout" width={500} height={500}  />
        <Card.Text>
          <Alert variant="light">
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>
              Change this and that and try again. Duis mollis, est non commodo
              luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
              Cras mattis consectetur purus sit amet fermentum.
            </p>            
          </Alert>
          <Button variant="link">Go somewhere</Button>
        </Card.Text>
      </Card.Body>
    </Card>
  </>
);

const LaughWhileYouWait = () => (
  <>
    <Card bg="dark" text="white">
      <Card.Header>Laugh while you wait</Card.Header>
      <Card.Img variant="top" src="/wait-comedy.png" alt="Wait for Image Generation" width={500} height={300} style={{padding:'5px'}}/>
      <Card.Body>
        <Card.Text>
          <Jokes />
        </Card.Text>
      </Card.Body>
    </Card>
  </>
)