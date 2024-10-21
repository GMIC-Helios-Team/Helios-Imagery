import React from 'react';
import { useRouter } from 'next/router';
import Image from 'react-bootstrap/Image';
import img404 from '@/public/err-404.png';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useTheme } from '@/contexts/theme-context';

const Custom404 = () => {
  const router = useRouter();
  const { isDarkTheme } = useTheme();

  const handleGoBack = () => {
    router.push('/');
  };

  return (

    <Container style={{ marginTop: '50px' }}>
      <Row className="mb-4">
        <Col md={{ offset: 3, span: 6 }}>
          <Card className={`cardBackgroundCustom cardShadowCustom ${isDarkTheme ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
            <Card.Header>
              Not Found
              <Button className="buttonCustomRight" onClick={handleGoBack} variant="link">Home</Button>
            </Card.Header>
            <Card.Body>
            <Image
                  src={img404.src}
                  className="imageBeveled"
                  fluid
                  alt="Generated Image"
                />
              <Card.Text className="cardTextCustom">
              Yarr! Our robo-pirates searched every corner of the digital seas, but the page has gone overboard! Maybe it walked the plank? Sail back to safer waters.

              </Card.Text>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Custom404;