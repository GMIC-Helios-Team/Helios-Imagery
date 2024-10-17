import React from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { useRouter } from 'next/router';
import style from '@/styles/404.module.css';

const Custom404 = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/');
  };

  return (
    
    <Container style={{ marginTop: '50px', textAlign: 'center' }}>
      <Row className="mb-4">
        <Col md={{ offset: 3, span: 6 }}>
          <h1>404 - Page Not Found</h1>
          <p>Yarr! Our robo-pirates searched every corner of the digital seas, but the page has gone overboard! Maybe it walked the plank? Sail back to safer waters.</p>
          <Image
            src="/err-404.png"
            className={style.imageBeveled}
            fluid
            alt="Generated Image"
          />
          <Button onClick={handleGoBack} variant="link">Home</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Custom404;