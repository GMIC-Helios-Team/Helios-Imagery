import { Button, Card, Col, Container, ListGroup, Row, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { MetricResponse } from "@/types/metrics-response";

const MetricsPage = () => {

  const [metrics, setMetrics] = useState<MetricResponse[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState<boolean>(false);
 
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchAndSetMetrics = async () => {
      setLoading(true);
      const metricsData = await fetchMetrics();
      setMetrics(metricsData);
      setLoading(false);
    };

    fetchAndSetMetrics();
  }, []);

  const fetchMetricsByUser = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const metricsData = await fetchMetrics();
    setMetrics(metricsData);
    setLoading(false);
  };

  const fetchMetrics = async (): Promise<MetricResponse[] | null> => {
    try {
      const response = await fetch('/api/metrics', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error('Metrics request failed');
      }
      const data: MetricResponse[] = await response.json();
      return data;

    } catch (error) {
      console.error('Error fetching metrics:', error);
      return null;
    }
  }

  if (!isClient) {
    return null; // Render nothing on the server
  }

  return (
    <Container style={{ marginTop: '50px' }}>
      <Row className="mb-4">
        <Col md={{ offset: 3, span: 6 }}>
          <Card>
            <Card.Header>
              Metrics
              <Button
                variant="link"
                size="sm"
                style={{ float: 'right' }}
                onClick={fetchMetricsByUser}
              >
                              {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Loading...</span>
                  </>
                ) : (
                  'Refresh Metrics'
                )}
              </Button>
            </Card.Header>
            <Card.Body>
              <Card.Text>
              {metrics ? (
                metrics.map((metric, index) => (
                  <ListGroup key={index}>
                    <ListGroup.Item><strong>{metric.label}</strong> : {metric.count}</ListGroup.Item>
                  </ListGroup>
                ))
              ) : (
                <p>Loading metrics...</p>
              )}                
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default MetricsPage;