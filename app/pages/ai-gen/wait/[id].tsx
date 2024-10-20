import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Jokes from '@/components/Jokes';
import { Alert, Button, Card, Col, Container, Row } from 'react-bootstrap';
import { fetchImage } from '@/helpers/get-generated-image-api';
import style from '@/styles/wait.module.css';
import { useTheme } from '@/contexts/theme-context';

const Wait = () => {

  const [isTimeout, setIsTimeout] = useState<boolean>(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    let elapsedTime = 0;
    const interval = 10000; // 10 seconds
    const maxTime = 60000; // 60 seconds

    const intervalId = setInterval(async () => {
      if (elapsedTime >= maxTime) {
        clearInterval(intervalId);
        setIsTimeout(true);
        return;
      }

      try {
        const generatedImage = await fetchImage(id as string);
        if (generatedImage.imagefilename) {
          clearInterval(intervalId);
          router.push(`/gallery/image/${id}`);
        }
      } catch (error) {
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

const TimeoutImage = () => {

  const { isDarkTheme } = useTheme();

  const router = useRouter();
  const navigateHome = () => {
    router.push('/');
  };

  return (
    <Card className={`${style.cardBackgroundCustom} ${style.cardShadowCustom} ${isDarkTheme ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <Card.Header>Sorry for the delay
        <Button
          className={style.buttonCustomRight}
          onClick={navigateHome}
          variant="link">Home</Button>
      </Card.Header>
      <Card.Body>
        <Card.Img variant="top"
          src="/ImageGenerationTimeout.png"
          className={style.imageBeveled}
          alt="Image Generation Timeout" width={500} height={500} />
        <Card.Text>
          <Alert variant="warning">
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>
              Our robo-engineers are tightening the bolts and oiling the gears. Hang tight, we&apos;ll be back in a jiffy!
            </p>
          </Alert>

        </Card.Text>
      </Card.Body>
    </Card>
  )
}

const LaughWhileYouWait = () => {

  return (
    <Card bg="dark" text="white" className={`${style.cardBackgroundCustom} ${style.cardShadowCustom}`}>
      <Card.Header>Laugh while you wait</Card.Header>
      <Card.Img variant="top" src="/wait-comedy.png" alt="Wait for Image Generation" width={500} height={300} style={{ padding: '5px' }} />
      <Card.Body>
        <Card.Text>
          <Jokes />
        </Card.Text>
      </Card.Body>
    </Card>
  )
}