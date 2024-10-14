import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Carousel, Table, Container } from 'react-bootstrap';
import FlipCard from '../components/FlipCard';
import { useTheme } from '../contexts/theme-context';

const Profile: React.FC = () => {
  const { isDarkTheme } = useTheme();
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  // Ensure the theme class is applied only on the client side
  const [themeClass, setThemeClass] = useState('');

  useEffect(() => {
    setThemeClass(isDarkTheme ? 'dark-theme' : 'light-theme');
  }, [isDarkTheme]);

  return (
    <>
      <div className={themeClass}>
        <Container>
          <Row>
            <Col>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Profile</Card.Title>
                  <Card.Text>
                    <Row className="mb-4">
                      <Col>
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
                              <td>Mark</td>
                              <td>Otto</td>
                              <td>@mdo</td>
                            </tr>
                            <tr onClick={() => handleSelect(1)}>
                              <th scope="row">2</th>
                              <td>Jacob</td>
                              <td>Thornton</td>
                              <td>@LaNube</td>
                            </tr>
                            <tr onClick={() => handleSelect(2)}>
                              <th scope="row">3</th>
                              <td>Kevin</td>
                              <td>Edwards</td>
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
      </div>
    </>
  );
};

export default Profile;