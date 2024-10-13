import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import { Joke } from '@/types/joke';
import { Col, Row, ButtonGroup, ToggleButton, Card } from 'react-bootstrap';

interface JokesProps {
  jokeType: string;
  heading: string
}

const Jokes: React.FC<JokesProps> = ({jokeType, heading}) => {

  const [data, setData] = useState<Joke | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [radioValue, setRadioValue] = useState(jokeType);
  const [url, setUrl] = useState<string>(`${process.env.NEXT_PUBLIC_JOKE_URL}/Programming?safe-mode`);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleRadioChange = (value: string) => {
    setRadioValue(value);
    setUrl(`${process.env.NEXT_PUBLIC_JOKE_URL}/${value}?safe-mode`);

  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
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
    finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isClient && url) {
      fetchData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
              <Card.Header>Joke - {heading}</Card.Header>
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
                  {isLoading ? (
                    <p>Loading...</p>
                  ) : error ? (
                    <ErrorMessage message={error} />
                  ) : data ? (
                    <JokeDisplay data={data} />
                  ) : (
                    <p>No Joke Loaded</p>
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

export default Jokes;

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <p><strong>Error:</strong> {message}</p>
);

const JokeDisplay: React.FC<{ data: Joke }> = ({ data }) => (
  <>
    {data.error ? (
      <p><strong>Error:</strong> {data.message}</p>
    ) : (
      <>
        <p><strong>Category:</strong> {data.category}</p>
        {data.type === 'single' ? (
          <p><strong>Joke:</strong> {data.joke}</p>
        ) : (
          <>
            <p><strong>Setup:</strong> {data.setup}</p>
            <p><strong>Delivery:</strong> {data.delivery}</p>
          </>
        )}
      </>
    )}
  </>
);
