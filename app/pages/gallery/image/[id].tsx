import { GetGeneratedImage } from '@/types/generation-response';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Image, Card } from 'react-bootstrap';
// import Image from 'next/image';

const GalleryImage = () => {
  const [imageUrl, setImageUrl] = useState<string>('');

  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!id) return;

    const fetchImage = async () => {
      console.log('Issuing API request');
      try {
        const url = new URL('/api/generate-image', window.location.origin);
        url.searchParams.append('HID', id as string);

        const imageReadyResponse = await fetch(url.toString(), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const imageReadyResult: GetGeneratedImage = await imageReadyResponse.json();
        if (imageReadyResult.imagefilename) {
          setImageUrl(`https://cdn.helios.gallery/${imageReadyResult.imagefilename}`);
        }
        console.log('API response:', imageReadyResult);
      } catch (error) {
        console.error('API request failed:', error);
      }
    };

    fetchImage();

  }, [id, router]);

  return (
    <Container style={{ marginTop: '50px' }}>
      <Row className="mb-4">
        <Col md={{ offset: 3, span: 6 }}>
          <Card>
            <Card.Header>Gallery Image</Card.Header>
            <Card.Body>
              <Image
                src={imageUrl}
                fluid
                // className={aigen.generatedImage}
                alt="Generated Image"
              />
            </Card.Body>
          </Card>

          {/* <Image src={imageUrl} alt="Generated Image" fluid/> */}
        </Col>
      </Row>
    </Container>
  );
}

export default GalleryImage;