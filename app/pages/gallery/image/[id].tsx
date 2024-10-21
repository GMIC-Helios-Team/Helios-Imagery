import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Image, Card, Spinner } from 'react-bootstrap';
import { fetchImage } from '@/helpers/get-generated-image-api';
import { GetGeneratedImage } from '@/types/generation-response';


const GalleryImage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<GetGeneratedImage | null>(null);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!id) return;

    const retrieveImage = async () => {
      try {
        setIsLoading(true);
        const generatedImage = await fetchImage(id as string);
        generatedImage.imagefilename = `${process.env.NEXT_PUBLIC_HELIOS_GALLERY}/${generatedImage.imagefilename}`
        setData(generatedImage);
      } catch (error) {
        const errImage: GetGeneratedImage = {
          imagefilename: '/err-pirate.png',
          prompt: "Yarr! Our robo-pirates searched every corner of the digital seas, but the image has gone overboard! Maybe it walked the plank? Sail back to safer waters",
          name: "Lost at Sea-Bot: Image Not Found",
          email: "",
          HID: "",
          imageThumbnailfilename: ""
        }
        setData(errImage);
      }
      finally {
        setIsLoading(false);
      }
    };

    retrieveImage();

  }, [id, router]);

  return (
    <Container style={{ marginTop: '50px' }}>
      <Row className="mb-4">
        <Col md={{ offset: 3, span: 6 }}>
          <Card className={`${".cardBackgroundCustom"} ${".cardShadowCustom"}`}>
            <Card.Header>Gallery Image {isLoading && <Spinner style={{float:"right"}} animation="border" size="sm" className="ml-2"/>}</Card.Header>
            <Card.Body>
              {isLoading ?
                (
                  <p>Loading...</p>) :
                (
                  <GalleryImageDetail data={data} />
                )
              }
            </Card.Body>
          </Card>

        </Col>
      </Row>
    </Container>
  );
}

export default GalleryImage;

interface GalleryImageDetailProps {
  data: GetGeneratedImage | null;
}

const GalleryImageDetail: React.FC<GalleryImageDetailProps> = ({ data }) => {
  return (
    <>
      <Card.Title>{data?.name}</Card.Title>
      <Image
        src={data?.imagefilename}
        fluid
        className={".imageBeveled"}
        alt="Generated Image"
      />
      <Card.Text className={".cardTextCustom"}>{data?.prompt}</Card.Text>
    </>
  )

}