import { GalleryItem } from "@/types/image-gallery";
import React, { useState, useEffect } from "react";
import { Alert, Button, Card, Col, Container, ListGroup, Row, Spinner } from "react-bootstrap";

const Requeue = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [requeueItems, setRequeueItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    fetchRequeueItems();
  }, []);

  const fetchRequeueItems = async () => {
    try {
      console.log('fetching requeue items');
      setIsLoading(true);
      setSuccessMessage('');
      setErrorMessage('');
      const response = await fetch(`/api/requeue`);

      if (!response.ok) {
        throw new Error('Failed to fetch requeue items');
      }

      const data = await response.json();
      setRequeueItems(data || []);

    } catch (error) {
      setErrorMessage('Failed to fetch requeue items');
      setRequeueItems([]);
    }
    finally {
      setIsLoading(false);
    }
  };

  const postItemForRequeue = async (HID: string) => {

    try {
      setIsLoading(true);
      setErrorMessage('');
      setSuccessMessage('');

      const queueResponse = await fetch('/api/requeue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ HID }),
      });

      if (!queueResponse.ok) {
        throw new Error(`Failed to requeue item with HID: ${HID}`);
      }

      setSuccessMessage(`Successfully requeued item with HID: ${HID}`);

    }
    catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unknown error occurred');
      }
    }
    finally {
      setIsLoading(false);
    }
  }
  return (
    <Container style={{ marginTop: '50px' }}>
      <Row className="mb-4">
        <Col md={{ offset: 3, span: 6 }}>
          <Card className={`cardBackgroundCustom cardShadowCustom`}>
            <Card.Header>Requeue Image Generation {isLoading && <Spinner className="spinnerCustomRight m1-2" animation="border" size="sm" />} </Card.Header>
            <Alert variant="danger" show={errorMessage !== ''}>
              <p  style={{ fontSize: 10, fontWeight: "bold" }}>{errorMessage}</p>
            </Alert>
            <Alert variant="success" show={successMessage !== ''}>
              <p  style={{ fontSize: 10, fontWeight: "bold" }}>{successMessage}</p>
            </Alert>            
            <Card.Body>
              <ListGroup>
                {requeueItems.length > 0 ? (
                  requeueItems.map(item => (
                    <ListGroup.Item key={item.name}>
                      <Button style={{ float: 'right', fontSize: 11, fontWeight: "bold"  }} variant="link" onClick={() => postItemForRequeue(item.HID)}>requeue</Button>
                      <Row>{item.name}</Row>
                      <Row style={{ fontSize: 10, fontWeight: "bold" }}>{item.HID}</Row>
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

export default Requeue;