import Jokes from '@/components/Jokes';
import { LeaderBoardItem } from '@/types/leader-board';
import React, { useEffect, useState } from 'react';
import { Alert, Card, Col, Container, ListGroup, Row, Spinner } from 'react-bootstrap';

const HomePage = () => {

  return (
    <>
      <Container style={{ marginTop: '50px' }}>
        <Row className="mb-4">
          <Col md={{ offset: 3, span: 6 }}>
            <Card bg="dark" text='white'>
              <Card.Header>Home</Card.Header>
              <Card.Img variant="top" src="/robot.png" alt="Home Page Card" width={300} height={200} style={{ padding: '5px' }} />
              <Card.Body>
                <Jokes />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <LeaderBoard />
    </>

  );
};

export default HomePage;

const LeaderBoard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [leaderBoardItems, setLeaderBoardItems] = useState<LeaderBoardItem[]>([]);

  useEffect(() => {
    fetchRequeueItems();
  }, []);

  const fetchRequeueItems = async () => {
    const limit = 5;
    try {
  
      setIsLoading(true);
      setSuccessMessage('');
      setErrorMessage('');
      const response = await fetch(`/api/leader-board?limit=${limit}`);

      if (!response.ok) {
        throw new Error('Failed to fetch leader board items');
      }

      const data = await response.json();
      setLeaderBoardItems(data || []);

    } catch (error) {
      setErrorMessage('Failed to fetch leader board items');
      setLeaderBoardItems([]);
    }
    finally {
      setIsLoading(false);
    }
  };


  return (
    <Container style={{ marginTop: '50px' }}>
      <Row className="mb-4">
        <Col md={{ offset: 3, span: 6 }}>
          <Card className={`cardBackgroundCustom cardShadowCustom`}>
            <Card.Header>Leader Board  {isLoading && <Spinner className="spinnerCustomRight m1-2" animation="border" size="sm" />} </Card.Header>
            <Alert variant="danger" show={errorMessage !== ''}>
              <p style={{ fontSize: 10, fontWeight: "bold" }}>{errorMessage}</p>
            </Alert>
            <Alert variant="success" show={successMessage !== ''}>
              <p style={{ fontSize: 10, fontWeight: "bold" }}>{successMessage}</p>
            </Alert>
            <Card.Body>
              <ListGroup>
                {leaderBoardItems.length > 0 ? (
                  leaderBoardItems.map(item => (
                    <ListGroup.Item key={item.name}>
                      <div>{item.name}</div>
                      <div style={{ fontSize: 10, fontWeight: "bold" }}>{item.voteCount}</div>
                      <div style={{ fontSize: 10, fontWeight: "bold" }}>{item.Title}</div>
                      <div style={{ fontSize: 10, fontWeight: "bold" }}>{item.HID}</div>
                      <div style={{ fontSize: 10, fontWeight: "bold" }}>{item.imagefilename}</div>
                    </ListGroup.Item>
                  ))
                ) : (
                  <ListGroup.Item>No items to display</ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}