import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import { Joke } from '../models/joke';
import { Col, Row, ButtonGroup, ToggleButton, Card } from 'react-bootstrap';

const JokesPage: React.FC = () => {

  const [data, setData] = useState<Joke | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [radioValue, setRadioValue] = useState('Programming');
  const [url, setUrl] = useState<string>(`${process.env.NEXT_PUBLIC_JOKE_URL}/Programming`);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleRadioChange = (value: string) => {
    setRadioValue(value);
    setUrl(`${process.env.NEXT_PUBLIC_JOKE_URL}/${value}`);

  };

  const fetchData = async () => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }
      const result: Joke = await res.json();
      setData(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  useEffect(() => {
    if (isClient && url) {
      fetchData();
    }
  }, [url, isClient]);

  const radios = [
    { name: 'Programming', value: '1' },
    { name: 'Spooky', value: '2' },
  ];

  if (!isClient) {
    return null; // Render nothing on the server
  }

  return (
    <>

      <Container>
        <Row className="mb-4"></Row>

        <Row className="mb-4">
          <Col md={{ offset: 2, span: 8 }}>

            <Card>
              <Card.Header>Joke</Card.Header>
              <Card.Body>
                <Card className="mb-4">
                  <Card.Header>Category</Card.Header>
                  <Card.Body>
                    <ButtonGroup>
                      {radios.map((radio, idx) => (
                        <ToggleButton
                          key={idx}
                          id={`radio-${idx}`}
                          type="radio"
                          variant={idx % 2 ? 'outline-secondary' : 'outline-primary'}
                          name="radio"
                          value={radio.name}
                          checked={radioValue === radio.name}
                          onChange={(e) => handleRadioChange(e.currentTarget.value)}
                        >
                          {radio.name}
                        </ToggleButton>
                      ))}
                    </ButtonGroup>
                  </Card.Body>
                </Card>
                <Card.Subtitle className="mb-4">
                  <Button variant="link" onClick={fetchData} >Next Joke</Button>
                </Card.Subtitle>
                <Card.Text>
                  {error ? (
                    <p><strong>Error:</strong> {error}</p>
                  ) : data ? (
                    <>
                      {data.error ? (
                        <p><strong>Error:</strong> {data.message}</p>
                      ) :
                        (
                          <>
                            <p><strong>Category:</strong> {data.category}</p>
                            {data.type === 'single' ? (
                              <>
                                <p><strong>Joke:</strong> {data.joke}</p>
                              </>
                            ) : (
                              <>
                                <p><strong>Setup:</strong> {data.setup}</p>
                                <p><strong>Delivery:</strong> {data.delivery}</p>
                              </>
                            )}
                          </>
                        )}
                    </>) : (
                    <p>Loading...</p>
                  )}
                </Card.Text>

              </Card.Body>
            </Card>

          </Col>

        </Row >


      </Container >
    </>
  );
};

export default JokesPage;