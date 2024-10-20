import React from 'react';
import { Container, Row, Col, Button, Image, Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import style from '@/styles/404.module.css';
import { useTheme } from '@/contexts/theme-context';

const Custom404 = () => {
  const { isDarkTheme } = useTheme();
  const router = useRouter();

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
                <Button className={style.buttonCustomRight} onClick={handleGoBack} variant="link">Home</Button>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <Image
                  src="/err-404.png"
                  className={style.imageBeveled}
                  fluid
                  alt="Generated Image"
                />
                
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Custom404;