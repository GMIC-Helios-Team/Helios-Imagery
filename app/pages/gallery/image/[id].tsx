import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Image, Card } from 'react-bootstrap';
import { fetchImage } from '@/helpers/get-generated-image-api';
import { GetGeneratedImage } from '@/types/generation-response';
import style from '@/styles/gallery-image.module.css';

const GalleryImage = () => {
  const [data, setData] = useState<GetGeneratedImage | null>(null);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!id) return;

    const retrieveImage = async () => {
      console.log('Issuing API request');
      try {
        const generatedImage = await fetchImage(id as string);
        generatedImage.imagefilename = `${process.env.NEXT_PUBLIC_HELIOS_GALLERY}/${generatedImage.imagefilename}`
        setData(generatedImage);
      } catch (error) {
        const errImage: GetGeneratedImage = {
          imagefilename: '/images/error.jpg',
          prompt: "Error Prompt",
          name: "Error Name",
          email: "Error Email",
          HID: "Error HID",
          imageThumbnailfilename: "/images/error.jpg"
        }
        setData(errImage);
      }
    };

    retrieveImage();

  }, [id, router]);

  return (
    <Container style={{ marginTop: '50px' }}>
      <Row className="mb-4">
        <Col md={{ offset: 3, span: 6 }}>
          <Card className={style.cardBackgroundCustom}>
            <Card.Header>Gallery Image</Card.Header>
            <Card.Body>
              <Card.Title>{data?.name}</Card.Title>
              <Image
                src={data?.imagefilename}
                fluid
                className={style.imageBeveled}
                alt="Generated Image"
              />
              <Card.Text className={style.cardTextCustom}>{data?.prompt}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default GalleryImage;