/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import { Card, Col, Container, Row, Image, Button } from 'react-bootstrap';
import style from '@/styles/gallery-image.module.css';
import { GetGeneratedImage } from '@/types/generation-response';
import { genImageList } from '@/helpers/get-generated-image-api';


interface GalleryListProps {
  images: GetGeneratedImage[];
  showVote: (image: GetGeneratedImage) => void;
}

interface VoteProps {
  image: GetGeneratedImage | null;
  showGalleryList: () => void;
}
const GalleryPage = () => {

  const [vote, setVote] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GetGeneratedImage | null>(null);

  const showVote = (image: GetGeneratedImage) => {
    setSelectedImage(image)
    setVote(true);
  };

  const showGalleryList = () => {
    setVote(false);
  };


  return (
    <>
      <Container style={{ marginTop: '50px' }}>
        <Row className="mb-4">
          <Col md={{ offset: 3, span: 6 }}>
            {vote ?
              (<Vote showGalleryList={showGalleryList} image={selectedImage} />)
              :
              (<GalleryList images={genImageList} showVote={showVote} />)
            }
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default GalleryPage;

const GalleryList: React.FC<GalleryListProps> = ({ images, showVote }) => {

  const renderImages = (images: GetGeneratedImage[]) => {
    return images.map((item) => (
      <Col xs={6} md={4} key={item.HID}>
        <Image src={item.imageThumbnailfilename} fluid thumbnail height={150} width={150} onClick={() => showVote(item)} />
      </Col>
    ));
  };
  return (
    <Card className={`${style.cardBackgroundCustom} ${style.cardShadowCustom}`}>
      <Card.Header>Gallery Image</Card.Header>
      <Card.Body>
        <Row>
          {renderImages(images)}
        </Row>
      </Card.Body>
    </Card>
  )
}


const Vote: React.FC<VoteProps> = ({ showGalleryList, image }) => {
  const [hasVoted, setHasVoted] = useState(false);

  const handleLike = () => {
    if (!image) return
    image.voteCount = (image.voteCount || 0) + 1;
    setHasVoted(true);
  };

  return (
    <Card className={`${style.cardBackgroundCustom} ${style.cardShadowCustom}`}>
      <Card.Header>Vote
        <Button variant="link" onClick={showGalleryList} style={{ float: "right" }}>
          Back
        </Button>
      </Card.Header>

      <Card.Body>
        <Card.Title>{image?.name}</Card.Title>
        <Image src={image?.imageThumbnailfilename} fluid />
        <Button disabled={hasVoted} variant="link" onClick={handleLike} style={{ marginTop: '10px' }}>
          Like ({image?.voteCount || 0})
        </Button>
      </Card.Body>
    </Card>
  )
}