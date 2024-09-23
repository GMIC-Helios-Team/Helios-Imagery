import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import Script from 'next/script';
import { Container, Row } from 'react-bootstrap';

const HomePage = () => {
  useEffect(() => {

    if (typeof window !== 'undefined') {
      const Holder = require('holderjs');
      Holder.run();
    }
  }, []);

  const router = useRouter();

  const navigateToProfile = () => {
    router.push('/profile');
  };

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/holder/2.9.9/holder.min.js"
        strategy="beforeInteractive"
      />
      <Container>
        <Row className="mb-4">
        </Row>
        <CardGroup>
          <Card>
            <Card.Img variant="top" src="holder.js/430x190" />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural lead-in
                to additional content. This content is a little bit longer.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Img variant="top" src="holder.js/430x190" />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This card has supporting text below as a natural lead-in to
                additional content.{' '}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Img variant="top" src="holder.js/430x190" />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural lead-in
                to additional content. This card has even longer content than the
                first to show that equal height action.
              </Card.Text>
              <Button variant="primary" onClick={navigateToProfile}>Go to profile</Button>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>
        </CardGroup>
      </Container>

    </>

  );
};

export default HomePage;