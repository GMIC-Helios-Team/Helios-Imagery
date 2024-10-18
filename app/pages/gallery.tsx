/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { Card, Col, Container, Row, Image, Button } from 'react-bootstrap';
import style from '@/styles/gallery-image.module.css';
import { GalleryItem } from '@/types/image-gallery';

interface GalleryListProps {
  items: GalleryItem[];
  showVote: (image: GalleryItem) => void;
  displayItems: (items: GalleryItem[]) => void;
}

interface VoteProps {
  item: GalleryItem | null;
  showGalleryList: () => void;
}
const GalleryPage = () => {

  const [vote, setVote] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);

  const showVote = (image: GalleryItem) => {
    setSelectedImage(image)
    setVote(true);
  };

  const setGalleryDisplayItems = (items: GalleryItem[]) => {
    setGalleryItems(items);
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
              (<Vote showGalleryList={showGalleryList} item={selectedImage} />)
              :
              (<GalleryList items={galleryItems} showVote={showVote} displayItems={setGalleryDisplayItems} />)
            }
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default GalleryPage;

const GalleryList: React.FC<GalleryListProps> = ({ items, showVote, displayItems }) => {

  const renderImages = (galleryItems: GalleryItem[]) => {
    return galleryItems.map((item) => (
      <Col xs={6} md={4} key={item.HID}>
        <Image src={`${process.env.NEXT_PUBLIC_HELIOS_GALLERY}/${item.imageThumbnailfilename}`} fluid thumbnail height={150} width={150} onClick={() => showVote(item)} />
      </Col>
    ));
  };
  return (
    <>
      <Card className={`${style.cardBackgroundCustom} ${style.cardShadowCustom}`}>
        <Card.Header>Gallery Image</Card.Header>
        <GalleryPaging displayItems={displayItems} />
        <Card.Body>
          <Row>
            {renderImages(items)}
          </Row>
        </Card.Body>
      </Card>
    </>
  )
}

const Vote: React.FC<VoteProps> = ({ showGalleryList, item }) => {
  const [hasVoted, setHasVoted] = useState(false);

  const handleLike = () => {
    if (!item) return
    item.voteCount = (item.voteCount || 0) + 1;
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
        <Card.Title>{item?.name}</Card.Title>
        <Image src={`${process.env.NEXT_PUBLIC_HELIOS_GALLERY}/${item?.imagefilename}`} fluid />
        <Button disabled={hasVoted} variant="link" onClick={handleLike} style={{ marginTop: '10px' }}>
          Like ({item?.voteCount || 0})
        </Button>
      </Card.Body>
    </Card>
  )
}

interface GalleryPagingProps {
  displayItems: (items: GalleryItem[]) => void;
}
const GalleryPaging: React.FC<GalleryPagingProps> = ({ displayItems }) => {
  const [totalPages, setTotalPages] = useState(100);

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8;

  useEffect(() => {
    fetchImages((currentPage - 1) * limit, limit);
  }, [currentPage]);

  const handlePrev = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const fetchImages = async (offset: number, limit: number) => {
    try {
      const response = await fetch(`/api/image-gallery?offset=${offset}&limit=${limit}`);

      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }

      const data = await response.json();
      displayItems(data.items);
      setTotalPages(Math.ceil(data.totalCount / limit));

    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  return (
    <div className="d-flex justify-content-between align-items-center mt-4">
      <Button variant="link" onClick={handlePrev} disabled={currentPage === 1}>
        Previous
      </Button>
      <span>Page {currentPage} of {totalPages}</span>
      <Button variant="link" onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </Button>
    </div>
  );
}