import React, { useState, useEffect } from 'react';
import FlipCard from '../components/FlipCard';
import { Carousel, Row, Col, Container, Table, Card } from 'react-bootstrap';

const ProfilePage = () => {

  const [index, setIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSelect = (selectedIndex: React.SetStateAction<number>) => {
    setIndex(selectedIndex);
  };

  if (!isClient) {
    return null; // Render nothing on the server
  }

  return (
    <>
      <Container>
        <Row className="mb-4">
        </Row>
        <Row>
          <Col md={{ offset: 2, span: 8 }}>
            <Card>
              <Card.Header>Profiles</Card.Header>
              <Card.Body>
                <Card.Text>
                  <Row className="mb-4">
                    <Col >
                      <Carousel data-bs-theme="dark" activeIndex={index} onSelect={handleSelect}>
                        <Carousel.Item>
                          <FlipCard />
                        </Carousel.Item>
                        <Carousel.Item>
                          <FlipCard />
                        </Carousel.Item>
                        <Carousel.Item>
                          <FlipCard />
                        </Carousel.Item>
                      </Carousel>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Table striped hover size="sm">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr onClick={() => handleSelect(0)}>
                            <th scope="row">1</th>
                            <td>Neer</td>
                            <td>Patel</td>
                            <td>@ElHefe</td>
                          </tr>
                          <tr onClick={() => handleSelect(1)}>
                            <th scope="row">2</th>
                            <td>Tina</td>
                            <td>Humphries</td>
                            <td>@LaNube</td>
                          </tr>
                          <tr onClick={() => handleSelect(2)}>
                            <th scope="row">3</th>
                            <td >Kevin</td>
                            <td >Edwards</td>
                            <td>@ElHablador</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
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